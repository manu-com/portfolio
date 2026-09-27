#!/usr/bin/env python3
"""
Browser regression tests. Firefox only (see the webapp-testing skill).

These exist because a previous audit "passed" a completely non-functional
tap-target overlay: it read the pseudo-element's *computed height* instead of
hit-testing it, so `pointer-events: none` on the overlay went unnoticed. Every
geometry assertion here therefore uses `document.elementFromPoint`, never a
computed style.

Runs against its own dev server on a dedicated port so it never touches a dev
server you already have open.

    python tests/browser/smoke.py
    python tests/browser/smoke.py --base-url http://localhost:3000   # reuse one
"""
from __future__ import annotations

import argparse
import os
import signal
import socket
import subprocess
import sys
import time
import urllib.error
import urllib.request

PORT = int(os.environ.get("SMOKE_PORT", "3111"))
ROUTES = ["/", "/work", "/services", "/about", "/quote", "/contact"]

results: list[tuple[bool, str, str]] = []

# Next's dev-only HMR socket. It is framework tooling, not app code, and it
# does not exist in a production build. Everything else counts as a failure.
DEV_NOISE = ("webpack-hmr",)


def is_noise(problem: str) -> bool:
    return any(key in problem for key in DEV_NOISE)


def check(name: str, ok: bool, detail: str = "") -> None:
    results.append((ok, name, detail))
    print(f"{'PASS' if ok else 'FAIL'}  {name}{'  ' + detail if detail else ''}")


def port_open(port: int) -> bool:
    with socket.socket() as s:
        s.settimeout(0.4)
        return s.connect_ex(("127.0.0.1", port)) == 0


def start_server(prod: bool = False) -> subprocess.Popen:
    cmd = ["npm", "run", "start", "--", "-p", str(PORT)] if prod else [
        "npm", "run", "dev", "--", "-p", str(PORT)]
    proc = subprocess.Popen(
        cmd,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        start_new_session=True,  # own process group, so cleanup is contained
    )
    label = "prod" if prod else "dev"
    deadline = time.time() + 90
    while time.time() < deadline:
        if proc.poll() is not None:
            raise RuntimeError(f"{label} server exited early")
        try:
            with urllib.request.urlopen(f"http://127.0.0.1:{PORT}/", timeout=2):
                return proc
        except (urllib.error.URLError, socket.timeout, ConnectionError):
            time.sleep(0.5)
    raise RuntimeError(f"{label} server did not become ready in 90s")


def stop_server(proc: subprocess.Popen) -> None:
    if proc.poll() is not None:
        return
    try:
        os.killpg(os.getpgid(proc.pid), signal.SIGTERM)
        proc.wait(timeout=15)
    except (ProcessLookupError, subprocess.TimeoutExpired):
        try:
            os.killpg(os.getpgid(proc.pid), signal.SIGKILL)
        except ProcessLookupError:
            pass


# --- probes -------------------------------------------------------------
# Sub-44px tap targets, skipping anything inside a closed overlay.
TAP_TARGETS = """() => [...document.querySelectorAll('.tap-target')]
  .filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.height < 44; })
  .filter(e => { let n = e, inert = false;
    while (n && n !== document.body) {
      const s = getComputedStyle(n);
      if (s.pointerEvents === 'none' || n.getAttribute('aria-hidden') === 'true') { inert = true; break; }
      n = n.parentElement; }
    return !inert; })"""

# Measure the real tappable band by scanning rows, rather than guessing an offset.
MEASURE_BAND = """([i, label]) => {
  const el = [...document.querySelectorAll('.tap-target')]
    .filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; })[i];
  if (!el) return null;
  el.scrollIntoView({block: 'center', behavior: 'instant'});
  const r = el.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const hits = (y) => { const e = document.elementFromPoint(cx, y); return !!(e && (e === el || el.contains(e))); };
  const mid = r.top + r.height / 2;
  if (!hits(mid)) return { text: label, dead: true };
  let top = mid, bot = mid;
  for (let y = mid; y > 0; y -= 0.5) { if (hits(y)) top = y; else break; }
  for (let y = mid; y < innerHeight; y += 0.5) { if (hits(y)) bot = y; else break; }
  return { text: label, box: Math.round(r.height), band: Math.round(bot - top), dead: false };
}"""

OVERFLOW = """() => {
  const de = document.documentElement;
  const wide = [...document.querySelectorAll('body *')]
    .filter(e => e.getBoundingClientRect().right > de.clientWidth + 1)
    .slice(0, 4)
    .map(e => e.tagName + '.' + String(e.className).slice(0, 30));
  return { scrollW: de.scrollWidth, clientW: de.clientWidth, wide };
}"""


def run(base: str) -> None:
    from playwright.sync_api import sync_playwright

    with sync_playwright() as p:
        browser = p.firefox.launch(headless=True)

        # --- every route renders, no console errors on a settled load ---
        for route in ROUTES:
            ctx = browser.new_context(viewport={"width": 390, "height": 844},
                                      has_touch=True, is_mobile=True)
            page = ctx.new_page()
            problems: list[str] = []
            page.on("console", lambda m: problems.append(f"console {m.text}")
                    if m.type == "error" else None)
            page.on("requestfailed",
                    lambda r: problems.append(f"failed {r.url[-50:]} {r.failure}"))
            resp = page.goto(base + route, wait_until="networkidle")
            page.wait_for_timeout(1500)
            problems = [x for x in problems if not is_noise(x)]
            check(f"route {route} loads clean",
                  resp is not None and resp.status == 200 and not problems,
                  f"status={resp.status if resp else '?'} "
                  f"{'; '.join(x[:110] for x in problems[:2])}")
            ctx.close()

        # --- tap targets really are tappable (the regression that slipped through)
        ctx = browser.new_context(viewport={"width": 390, "height": 844},
                                  has_touch=True, is_mobile=True)
        page = ctx.new_page()
        for route in ["/", "/work", "/contact"]:
            page.goto(base + route, wait_until="networkidle")
            page.wait_for_timeout(1200)
            page.evaluate("() => document.fonts.ready")
            labels = page.evaluate(
                TAP_TARGETS + ".map(e => e.textContent.trim().slice(0, 18))"
            )
            short, dead = [], []
            for i, label in enumerate(labels):
                page.wait_for_timeout(140)
                r = page.evaluate(MEASURE_BAND, [i, label])
                if not r:
                    continue
                if r["dead"]:
                    dead.append(label)
                elif r["band"] < 44:
                    short.append(f"{label!r} box={r['box']} band={r['band']}")
            check(f"tap targets >=44px on {route}", not short,
                  "; ".join(short[:3]) or f"{len(labels)} targets")
            check(f"no dead tap targets on {route}", not dead, "; ".join(dead[:3]))

            ov = page.evaluate(OVERFLOW)
            check(f"no horizontal overflow on {route}",
                  ov["scrollW"] <= ov["clientW"] + 1,
                  f"scrollW={ov['scrollW']} clientW={ov['clientW']} {ov['wide'][:2]}")
        ctx.close()

        # --- the mobile menu: portal, geometry when scrolled, keyboard ---
        ctx = browser.new_context(viewport={"width": 390, "height": 844},
                                  has_touch=True, is_mobile=True)
        page = ctx.new_page()
        page.goto(base + "/", wait_until="networkidle")
        page.wait_for_timeout(800)
        page.evaluate("() => window.scrollTo(0, 600)")
        page.wait_for_timeout(400)
        page.click('button[aria-label="Open menu"]')
        page.wait_for_timeout(700)
        ov = page.evaluate("""() => {
          const o = document.querySelector('#mobile-menu');
          if (!o) return null;
          const r = o.getBoundingClientRect();
          return { h: Math.round(r.height), parent: o.parentElement.tagName,
                   top: Math.round(r.top), locked: document.body.style.overflow,
                   inHeader: !!document.querySelector('header #mobile-menu') };
        }""")
        check("menu overlay is portaled outside the blurred header",
              bool(ov) and ov["parent"] == "BODY" and not ov["inHeader"], str(ov))
        # backdrop-filter on the header makes it the containing block for fixed
        # children, which collapsed this overlay to 0px height when scrolled.
        check("menu overlay has real height when scrolled",
              bool(ov) and ov["h"] > 500, f"h={ov['h'] if ov else 'n/a'}")
        check("menu overlay sits below the header",
              bool(ov) and ov["top"] >= 60, f"top={ov['top'] if ov else 'n/a'}")
        check("body scroll is locked while the menu is open",
              bool(ov) and ov["locked"] == "hidden", str(ov["locked"] if ov else None))

        focused = page.evaluate("() => document.activeElement.tagName")
        check("focus moves into the menu on open", focused == "A", focused)
        inside = []
        for _ in range(3):
            page.keyboard.press("Tab")
            page.wait_for_timeout(80)
            inside.append(page.evaluate(
                "() => !!document.querySelector('#mobile-menu')?.contains(document.activeElement)"))
        check("tabbing stays inside the open menu", all(inside), str(inside))

        page.keyboard.press("Escape")
        page.wait_for_timeout(400)
        after = page.evaluate("""() => ({
          label: document.activeElement.getAttribute('aria-label') || '',
          overflow: document.body.style.overflow,
          closed: !!document.querySelector('button[aria-label="Open menu"]'),
        })""")
        check("Escape closes the menu and returns focus",
              after["closed"] and "Open menu" in after["label"], str(after))
        check("body scroll unlocks on close", after["overflow"] in ("", "visible"),
              repr(after["overflow"]))
        ctx.close()

        # --- form controls: 16px on mobile (no iOS zoom), 14px on desktop ---
        ctx = browser.new_context(viewport={"width": 390, "height": 844},
                                  has_touch=True, is_mobile=True)
        page = ctx.new_page()
        page.goto(base + "/contact", wait_until="networkidle")
        page.wait_for_timeout(600)
        mobile = page.evaluate(
            "() => [...document.querySelectorAll('input,textarea,select')]"
            ".map(e => parseFloat(getComputedStyle(e).fontSize))")
        check("mobile form controls are >=16px (prevents iOS focus zoom)",
              bool(mobile) and min(mobile) >= 16, f"min={min(mobile) if mobile else 'n/a'}px")
        ctx.close()

        ctx = browser.new_context(viewport={"width": 1280, "height": 900})
        page = ctx.new_page()
        page.goto(base + "/contact", wait_until="networkidle")
        page.wait_for_timeout(600)
        desktop = page.evaluate(
            "() => [...document.querySelectorAll('input,textarea,select')]"
            ".map(e => parseFloat(getComputedStyle(e).fontSize))")
        check("desktop form controls stay 14px",
              bool(desktop) and min(desktop) == 14, f"min={min(desktop) if desktop else 'n/a'}px")
        ctx.close()

        # --- skip link: the #main landmark must actually be reachable ---
        ctx = browser.new_context(viewport={"width": 1280, "height": 900})
        page = ctx.new_page()
        page.goto(base + "/", wait_until="networkidle")
        page.wait_for_timeout(500)
        skip = page.evaluate("""() => {
          const a = document.querySelector('a.skip-link');
          if (!a) return null;
          const r = a.getBoundingClientRect();
          return { href: a.getAttribute('href'),
                   firstFocusable: document.querySelector('a[href],button') === a,
                   offScreen: r.bottom <= 0,
                   mainExists: !!document.querySelector('#main') };
        }""")
        check("skip link exists and is the first focusable element",
              bool(skip) and skip["firstFocusable"] and skip["href"] == "#main",
              str(skip))
        check("skip link is off-screen until focused", bool(skip) and skip["offScreen"],
              str(skip))
        check("skip link target #main exists", bool(skip) and skip["mainExists"])
        page.keyboard.press("Tab")
        page.wait_for_timeout(300)
        revealed = page.evaluate("""() => {
          const a = document.querySelector('a.skip-link');
          const r = a.getBoundingClientRect();
          return { focused: document.activeElement === a, visible: r.top >= 0 && r.height > 0 };
        }""")
        check("first Tab reveals the skip link",
              revealed["focused"] and revealed["visible"], str(revealed))

        # --- share metadata and crawl routes ---
        html = page.content()
        for prop in ["og:image", "og:title", "og:url", "twitter:card"]:
            check(f"{prop} is present and absolute",
                  f'"{prop}"' in html and "https://" in html)

        # Fetched over HTTP rather than page.goto: robots.txt/sitemap/manifest
        # are not documents, and Firefox starts a download for the manifest.
        for path, needle in [("/robots.txt", "Sitemap:"),
                             ("/sitemap.xml", "<url>"),
                             ("/manifest.webmanifest", "short_name")]:
            resp = ctx.request.get(base + path)
            text = resp.text()
            check(f"{path} is served", resp.status == 200 and needle in text,
                  f"status={resp.status}")

        img = ctx.request.get(base + "/opengraph-image")
        body = img.body()
        check("/opengraph-image is a real PNG",
              img.status == 200
              and body[:4] == b"\x89PNG"
              and "image/png" in (img.headers.get("content-type") or ""),
              f"status={img.status} type={img.headers.get('content-type')} bytes={len(body)}")
        ctx.close()

        browser.close()


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--base-url", help="use an already-running server instead of starting one")
    ap.add_argument("--prod", action="store_true",
                    help="test a production build (npm start) instead of dev")
    args = ap.parse_args()

    proc = None
    if args.base_url:
        base = args.base_url.rstrip("/")
    else:
        if port_open(PORT):
            print(f"port {PORT} is already in use; pass --base-url or set SMOKE_PORT",
                  file=sys.stderr)
            return 2
        if args.prod and not os.path.isdir(".next"):
            print("--prod needs a build first: npm run build", file=sys.stderr)
            return 2
        kind = "production" if args.prod else "dev"
        print(f"starting {kind} server on {PORT}...")
        proc = start_server(prod=args.prod)
        base = f"http://127.0.0.1:{PORT}"

    try:
        run(base)
    finally:
        if proc is not None:
            stop_server(proc)
            print("server stopped")

    failed = [name for ok, name, _ in results if not ok]
    print(f"\n{len(results) - len(failed)}/{len(results)} checks passed")
    if failed:
        print("failed: " + "; ".join(failed))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
