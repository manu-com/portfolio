# Portfolio Project — Implementation Plan

> **STATUS (Sep 2026):** app is a **multi-page website**. Home is a concise
> intro; Work/About/Services/Quote/Contact are dedicated routes. The old
> single-page section plan below is kept for reference; see the
> "Multi-Page Architecture" section at the bottom for the current structure.

## Overview
Premium personal developer portfolio for "MANU".  
Design direction: **Minimal + Luxury + Modern Developer**  
Feels like a high-end creative technology studio run by one developer.

---

## Reference Analysis

### What to take from each reference:

| Reference | Take | Avoid |
|-----------|------|-------|
| **Brittany Chiang** | Developer portfolio structure, nav pattern, project layout, clean hierarchy | Generic card layouts |
| **Bruno Simon** | Small interactive touches, memorable micro-interactions | Full 3D/game experience, WebGL |
| **Awwwards** | Premium polish level, motion quality, typography scale | Over-the-top animations |
| **A1 Gallery** | Editorial typography, grid systems, whitespace, large type | Copying their specific layouts |
| **Bareblink** | Black/white/gold palette, luxury restraint, premium type treatment | Overusing gold |

---

## Design System

### Color Palette
```
Background:     #0A0A0A   (deep near-black)
Surface:        #111111   (slightly lighter, for subtle elevation)
Text Primary:   #F5F5F0   (warm off-white)
Text Secondary: #8A8A8A   (muted grey for labels/body)
Accent Gold:    #C9A84C   (warm amber/gold — used SPARINGLY)
Border:         rgba(255, 255, 255, 0.06)  (thin dividers)
Border Hover:   rgba(255, 255, 255, 0.12)
```

### Typography
- **Primary (Headlines):** Inter — clean, modern, highly legible
- **Accent (Optional serif):** Playfair Display — for select editorial headings
- **Mono:** JetBrains Mono — for labels, numbering, tech tags

### Type Scale
```
Hero Name:          clamp(3.5rem, 8vw, 8rem)    — Extra bold
Hero Subtitle:      clamp(1rem, 2vw, 1.5rem)    — Regular
Section Label:      0.75rem uppercase, letter-spacing: 0.2em
Section Heading:    clamp(2rem, 5vw, 4.5rem)    — Bold
Project Title:      clamp(1.75rem, 3.5vw, 3rem) — Bold
Body Text:          1.125rem, line-height: 1.75
Small/Caption:      0.875rem
```

### Spacing
```
Section Padding:    8rem (desktop) / 5rem (tablet) / 3rem (mobile)
Container Max:      1200px
Content Max:        900px
Grid Gap:           2rem
```

### Borders & Dividers
- 1px solid rgba(255,255,255,0.06) for section dividers
- 1px solid rgba(255,255,255,0.08) for card borders on hover
- Gold accent line: 40px wide, 2px tall, #C9A84C

---

## Architecture

### Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, body
│   ├── page.tsx                # Main page assembling all sections
│   ├── globals.css             # Design tokens, animations, base styles
│   └── not-found.tsx           # Custom 404
├── components/
│   ├── navigation.tsx          # Sticky top nav, minimal
│   ├── hero.tsx                # Hero section
│   ├── selected-work.tsx       # Project showcase container
│   ├── project-entry.tsx       # Individual project with alternating layout
│   ├── services.tsx            # Services grid
│   ├── about.tsx               # About section
│   ├── technologies.tsx        # Tech stack display
│   ├── contact.tsx             # Contact CTA
│   └── footer.tsx              # Minimal footer
├── hooks/
│   └── use-in-view.ts          # Intersection Observer hook for animations
└── lib/
    └── data.ts                 # Project data, links, content (all placeholder)
```

### No new dependencies required
Using only: next, react, react-dom, tailwindcss (all already installed).
All animations done with CSS + Intersection Observer. No framer-motion needed.

---

## Section Breakdown

### 1. Navigation
- Fixed/sticky top, transparent → solid on scroll
- Left: "MANU" logo text
- Right: Work, About, Contact (anchor links)
- Hamburger menu on mobile with slide-in overlay
- Gold underline on active section

### 2. Hero
```
MANU

DIGITAL EXPERIENCES
& SOFTWARE.

I build websites, web applications, and software
that are fast, functional, and thoughtfully crafted.

[VIEW WORK]  [CONTACT]
```
- Massive typography, generous whitespace
- Subtle text reveal animation on load
- Gold accent line or dot as decorative element
- Full viewport height

### 3. Selected Work
- Section label: "SELECTED WORK"
- Each project displayed as a large entry (not a card)
- Alternating layouts: image left/right
- Each entry contains:
  - Project number (01, 02, 03...)
  - Project name (large, bold)
  - Description (1-2 sentences)
  - Tech tags (mono font, small)
  - Large screenshot placeholder (aspect-ratio 16/10)
  - Live link + GitHub link
- Hover: subtle image scale, border glow
- Staggered reveal animation on scroll

### 4. Services
- Section label: "SERVICES"
- Four items in a clean grid:
  - WEB DEVELOPMENT
  - WEB APPLICATIONS
  - SOFTWARE DEVELOPMENT
  - UI IMPLEMENTATION
- Each with a thin border, uppercase heading, short description
- Minimal editorial treatment — no colorful cards

### 5. About
- Section label: "ABOUT"
- Two-column on desktop: text left, decorative element right
- Natural, confident tone
- Placeholder text focusing on web/software development

### 6. Technologies
- Section label: "TECHNOLOGIES"
- Technologies displayed in a clean text grid:
  HTML · CSS · JavaScript · React · Kotlin · Android · Python · Git · Linux
- Uppercase, generous letter spacing, thin borders
- No colored icons or cards

### 7. Contact
- Full-width CTA section
```
HAVE A PROJECT
IN MIND?

LET'S BUILD
SOMETHING USEFUL.
```
- Email link
- GitHub link
- LinkedIn link
- All links with hover animation (underline slide)

### 8. Footer
- Thin top border
- Left: "MANU"
- Center: "© 2026 Manu. All rights reserved."
- Right: Social links (GitHub, LinkedIn, Email)
- Minimal, clean

---

## Animations

### Implementation
- Custom `useInView` hook using IntersectionObserver
- CSS classes toggled on visibility:
  - `.reveal` — base hidden state (opacity: 0, translateY: 20px)
  - `.revealed` — visible state (opacity: 1, translateY: 0)
  - `.reveal-delay-1` through `.reveal-delay-4` — staggered delays

### Animation Types
1. **Text reveal** — clip-path or translateY on section headings
2. **Image reveal** — scale from 1.05 to 1, opacity fade
3. **Hover states** — gold underline slide, border color transition, subtle image zoom
4. **Nav** — background opacity transition on scroll
5. **Smooth scroll** — CSS `scroll-behavior: smooth`

### Motion Rules
- Duration: 600-800ms for reveals, 300ms for hovers
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for reveals
- Respect `prefers-reduced-motion: reduce` — disable all animations
- No animation on page load for hero text — use CSS animation instead

---

## Responsive Design

### Desktop (>1024px)
- Full typography scale
- Spacious layouts, 8rem section padding
- Large project images
- Asymmetric compositions in about section

### Tablet (768px - 1024px)
- Reduce heading sizes by ~20%
- Section padding: 5rem
- 2-column grids become single column where needed
- Project images remain large

### Mobile (<768px)
- Hamburger navigation with overlay
- Section padding: 3rem
- Hero name: ~3.5rem
- Project entries stack vertically
- Touch-friendly tap targets (min 44px)
- Services grid: single column

---

## Content (actual, verified against `src/lib/data.ts`)

> This section previously listed **4 placeholder projects** (E-Commerce
> Platform, Task Management App, Weather Dashboard, Portfolio Framework) and
> placeholder contacts (`hello@manu.dev`, `github.com/manu`, a LinkedIn
> profile). None of that shipped — it was initial scaffolding from the plan.
> Corrected Sep 27 2026 against the real data.

### Projects (2, both real)
1. **Business Template** — `/work/business-template`, live at
   `https://business-template-kohl.vercel.app`, `githubUrl: null` (private repo)
2. **Inventory System** — `/work/inventory-system`, live at
   `https://inventory-system-manu-co.vercel.app`, `githubUrl: null`
   (private repo, React 19 / React Router 7 / Vite / Tailwind 4)

### About text
`profile.intro`: "I build websites, web applications, and software that are
fast, functional, and thoughtfully crafted."

### Contact links (real, no LinkedIn)
- Email `e.ndereba1@gmail.com` · phone `+254 112 888 460` (`tel:+254112888460`)
- WhatsApp `https://wa.me/254112888460` · GitHub `https://github.com/manu-com`
- `socials` = GitHub, WhatsApp, Email. **LinkedIn was deliberately removed**
  everywhere and must not be reintroduced.

### Still placeholder-ish
- `business-template` is a *template* product, not a bespoke client build. It is
  listed as a case study; consider whether that framing is honest for the
  services it advertises.

---

## Implementation Order

1. Set up design system (globals.css, fonts, colors)
2. Create data.ts with all content
3. Build useInView hook
4. Build Navigation
5. Build Hero
6. Build Selected Work + Project Entry
7. Build Services
8. Build About
9. Build Technologies
10. Build Contact
11. Build Footer
12. Assemble in layout.tsx and page.tsx
13. Add animations
14. Responsive pass
15. Build, lint, verify

---

## Files to Create/Modify

### Modify
- `src/app/globals.css` — Complete rewrite with design tokens
- `src/app/layout.tsx` — Fonts, metadata, structure
- `src/app/page.tsx` — Assemble all sections

### Create
- `src/lib/data.ts`
- `src/hooks/use-in-view.ts`
- `src/components/navigation.tsx`
- `src/components/hero.tsx`
- `src/components/selected-work.tsx`
- `src/components/project-entry.tsx`
- `src/components/services.tsx`
- `src/components/about.tsx`
- `src/components/technologies.tsx`
- `src/components/contact.tsx`
- `src/components/footer.tsx`
- `src/app/not-found.tsx`

### Delete (unused default assets)
- `public/file.svg`
- `public/globe.svg`
- `public/next.svg`
- `public/vercel.svg`
- `public/window.svg`

---

## Multi-Page Architecture (current)

Refactored from one long page into a cohesive premium multi-page website.
Design system (tokens, typography, borders, animations, buttons) unchanged.

### Routes
```
/                      Home — Hero → Featured Work → What I Do (services) → Short About → CTA
/work                  All projects with category filter
/work/[slug]           Per-project case study (business-template, inventory-system)
/services              Services with "what's included" + "typical use cases" + CTA
/about                 Intro, background, skills, philosophy, technologies
/quote                 Website cost calculator (the interactive quote builder)
/contact               Contact channels (email/phone/WhatsApp/GitHub) + contact form
```

### Architecture changes
- **`layout.tsx`** now owns `Navigation` + `Footer` (global, every page).
- **`template.tsx`** provides the page transition: fast subtle
  `page-in` fade/slide (0.45s, luxury easing) + scroll-to-top on navigation.
  Respects `prefers-reduced-motion`.
- **Pages** set their own metadata via `export const metadata`
  (`template: "%s — MANU"` in root layout). Home title:
  "Manu — Web Developer & Software Developer".
- `work/[slug]/page.tsx` uses `generateStaticParams` → SSG for both projects.

### Component reuse (no duplication)
| Component | Used on |
|-----------|---------|
| `Hero` | `/` |
| `SelectedWork` (props: `list`, `showCta`) | `/` (featured 2 + "View all work") |
| `WorkGallery` (category filter, client) | `/work` |
| `ProjectEntry` (links name → case study) | `/`, `/work` |
| `Services` (`compact` prop; full = included + use cases) | `/` (compact), `/services` |
| `AboutShort` | `/` |
| `Technologies` | `/about` |
| `Calculator` (standalone, heading lives on the page) | `/quote` |
| `CtaSection` | `/`, `/services`, `/work/*` |
| `PageHeader` (label + title + intro) | `/work`, `/services`, `/about`, `/quote` |
| `ContactForm` (client) | `/contact` |

### Validation
- Build fully static, all routes render, type-check + lint clean.
- `data.ts` extended: `Project` gets `slug`/`category` + case-study fields;
  `technologies` becomes `{name, note}[]`; `services` get `included`/`useCases`.

### Contact submissions (Sep 2026)
- **Real contact details** (replace nothing): email `e.ndereba1@gmail.com`,
  phone `+254 112 888 460` (`tel:+254112888460`), WhatsApp
  `https://wa.me/254112888460`. **No LinkedIn anywhere** (removed from
  profile/socials/contact channels/footer).
- Forms submit via **FormSubmit AJAX** — `https://formsubmit.co/ajax/e466c861d0389961938e8142a8b4e1d8`
  (form-ID hash, so the email address never appears in client code)
  — no backend, no DB, no API keys in client code. Isolated entirely in
  `src/lib/contact.ts` (`sendFormEmail`, `whatsappHref`, `mailtoHref`,
  `buildQuoteSummary`, `buildContactSummary`) so a future Supabase swap only
  changes `sendFormEmail` (must keep the `{ ok } | { ok, error }` contract).
- Quote form (calculator) sends the full selection set (type, pages, design,
  features, additional services) + contact fields + `formatKSh(estimate)` with
  subject **"NEW WEBSITE QUOTE REQUEST"**; contact form sends a contact summary.
  On success both show confirmation ("Thanks! Your quote request has been
  sent." / "Thanks! Your message has been sent.") with `[EMAIL ME]`
  `[WHATSAPP ME]` buttons; on failure they surface a fallback with direct
  email. Calculator math itself is unchanged (base 15,000 → 89,500 verified).
- **Delivery:** FormSubmit is now **activated** — the hash endpoint returns
  `{"success":"true"}` and mail is delivered to the inbox. (Activation was a
  one-time email click; before activation the app showed a clear message
  instead of a generic error.)
- Favicon: `src/app/icon.png` = `~/Documents/terminals.png` (default
  `favicon.ico` removed). Browsers cache favicons — hard refresh to see it.

### Deployment & GitHub access (Sep 2026)
- **Vercel is connected.** Logged in via CLI as `manu-com`. Project
  `portfolio` (id `prj_zjnXfh6OY0PdGt2WKainRUcrxYIX`, team `manu-co`, Node 24,
  region `iad1`) → **https://portfolio-manu-co.vercel.app**
  (aliases: `manu-dev-portfolio.vercel.app`,
  `portfolio-git-main-manu-co.vercel.app`). Deployments are triggered by
  pushing `main` to GitHub (no `.vercel` link file locally — never run
  `vercel link` unless asked). The previously recorded URL
  `portfolio-liart-gamma-8is427ccfa.vercel.app` is **dead (404)** — the project
  domain was reassigned at some point, so don't trust it.
- **Vercel Authentication was silently locking the site.** The project had
  `ssoProtection: {"deploymentType": "all_except_custom_domains"}` while having
  **zero custom domains**, so the main domain and every deployment URL 302'd to
  `vercel.com/sso-api` — visitors got a Vercel login screen, not the portfolio.
  Disabled on Sep 27 2026 via
  `vercel api /v9/projects/<id> -X PATCH --input -` with `{"ssoProtection": null}`.
  Re-enable the same way if the site ever needs to be private. **Check with
  `curl` *without* `-L`** — following the redirect returns the login page's
  `200`, which makes a locked site look healthy.
- **Verifying a live deployment:** test the *production* build, not just local
  dev. Two traps that produce fake failures: navigating between routes with
  `wait_until="domcontentloaded"` aborts in-flight requests
  (`NS_BINDING_ABORTED` on images/chunks) and reports phantom font-download
  errors — load one route per fresh context and wait for `networkidle`.
  Confirmed clean on all 7 routes, and the mobile-menu portal fix, keyboard
  focus handling, safe-area tokens and 16px mobile inputs are all live.
- **Private-repo GitHub access:** the local git credential helper
  `~/.config/portfolio/git-asktoken.sh` (repo-local `--local` config)
  reads the GitHub PAT from **`~/.config/portfolio/.env`** (`gt_tk:"..."`)
  on demand, so pushes to `github.com/manu-com/portfolio` just work. The
  token is **never in the repo**. Note: token **expires ~30 days from
  Sep 16 2026** — refresh in `~/.config/portfolio/.env` when pushes start
  failing.
- **Only `portfolio` is public** on GitHub (`manu-com` has no other public
  repos). `business-template` and `inventory-system` are **private** → both
  have `githubUrl: null` and their GitHub links are hidden (conditional
  render in `project-entry.tsx` + `work/[slug]/page.tsx`). `githubUrl` is
  now `string | null` — set a URL to reveal the link later.
- **Private-repo data pulled with the token** when updating portfolio
  content (README → description/features/tech). Inventory System now uses
  real data: live URL `https://inventory-system-manu-co.vercel.app`,
  tech React 19 / React Router 7 / Vite / Tailwind CSS 4 / lucide-react,
  and screenshot `public/projects/inventory-system.png` downloaded from the
  private repo (`screenshots/dashboard.png`, 1440×900).

### Drawdown: animations reduced to minimum (Sep 2026)
- Removed all scroll/load choreography: `.reveal` + delay classes,
  `.reveal-image` mask reveal, `.hero-line` text reveal, project-thumb hover
  zoom, calculator `animate-total` flash, mobile-menu link stagger.
- `Reveal` is now a static passthrough (keeps `className` for grid cells);
  `src/hooks/use-in-view.ts` deleted. `Hero` is a server component (no client
  state), content visible instantly.
- Kept only functional motion: `link-underline` hover slide, color/border
  hover transitions on buttons/links/cards, nav scroll background, mobile
  overlay fade, and the fast `page-enter` transition. Reduced-motion block
  updated accordingly.
- Verified: all 13 QA checks pass, no console errors, calculator still
  updates (35,000 after E-commerce), nav + mobile menu work.

### Mobile UI pass (Sep 2026)
Audited with Playwright/Firefox at **320 / 390 / 430px across all 7 routes**, then
fixed what the measurements actually showed. No redesign — same design language.

**Root-cause bug (reported as "menu appears transparent, at the top of the screen"):**
`backdrop-filter` on `<header>` makes it the **containing block for
`position: fixed` descendants**. The mobile overlay was nested inside that header,
so its `fixed inset-0 top-16` resolved against the header's own 64px box instead of
the viewport → `top:64px` + `bottom:0` in a 64px box = **height 0**. Only happened
once scrolled, because `backdrop-blur-md` is only applied in the `scrolled` state —
which is why it looked like a scroll bug. **Fix: portaled the overlay to
`document.body`** via `createPortal` (guarded by a `mounted` flag). Measured
0px/64px before → 780px/268.5 centered after. Commit `6def307`.

**iOS zoom-on-focus:** all inputs/textareas were `text-sm` (14px). iOS Safari zooms
the viewport on any focused field under 16px, so the contact and quote forms
visibly jumped on iPhone. Fixed globally in `globals.css`:
`input, textarea, select { font-size: max(1rem, 16px) }`, with a
`@media (min-width: 768px)` reset to `0.875rem` so desktop is untouched.

**Tap targets:** ~20 interactive elements were 17–24px tall. Added a `.tap-target`
utility — a centred `::before` overlay that grows the hit box to 44px **without
moving the label**, so the tight editorial spacing is preserved. It must use
`::before`, **not `::after`**: `.link-underline` already claims `::after` for the
underline and silently wins the cascade (this actually happened on the first
attempt — the overlay computed to `height: 1px`). Disabled under
`@media (pointer: fine)`. Footer links additionally got real `py-3 md:py-1.5`, and
the /work filter pills `py-3`.

**`.tap-target` has two failure modes that computed style will not reveal.** The
overlay only works if it is actually the hit-test target, so verify with
`document.elementFromPoint()`, not by reading the pseudo-element's computed
height — the first version of the audit did the latter and reported a clean pass
on a completely non-functional overlay.
1. The overlay **must not** carry `pointer-events: none`. That makes hit testing
   skip the pseudo-element and fall through to the ancestor (`<li>`/`<div>`), so
   the grown area is never tappable. The pseudo-element is a child box of the
   link, so the browser reports the originating link as the event target.
2. The link must not be `overflow: hidden` — that **clips its own overlay**. The
   mobile-menu email link had `truncate` (= `overflow: hidden`) and so kept a 20px
   hit box. Fix: put `truncate` on an inner `<span>` and leave the `<a>` clean.
3. The overlay is **45px, not 44px**. Centred on an odd-height label the band
   lands on a half-pixel, so a literal 44px measures as a 43px tappable band and
   fails a 44px assertion. The extra pixel absorbs the rounding.

**Portal side effect — keyboard tab order regressed.** Rendering the overlay at
the end of `<body>` (which is what fixed the containing-block bug) moved its
links *after* every link on the page, so Tab from the hamburger walked the entire
page before reaching the menu. Fixed by focusing the first menu link on open,
closing on `Escape`, and returning focus to the toggle. Also added
`aria-controls="mobile-menu"` and an `id` on the panel.

**Sub-11px type:** `0.6rem`/`0.65rem` (9.6/10.4px) labels in
`technologies.tsx`, `services.tsx`, `calculator.tsx` raised to a `0.7rem` floor.

**Safe areas:** `--safe-top/bottom/left/right` + `--header-h`
(`calc(4rem + env(safe-area-inset-top))`) tokens added. The fixed header now pads
by the notch and the overlay aligns to `--header-h` instead of a hardcoded `top-16`.
Footer bottom bar, hero, and the calculator's mobile sticky bar clear the home
indicator. `/contact` moved from `pt-24` → `pt-32` (96px would have collided with a
59px notch + 64px header in standalone mode).

**Also:** overlay gets `aria-hidden` + `tabIndex={-1}` on its links while closed
(they were keyboard-reachable through an invisible overlay), `overscroll-contain`,
header goes solid while the menu is open, menu auto-closes via `matchMedia` when
the viewport crosses `md` (tablet rotation left it stuck), tap-highlight disabled,
and `-webkit-text-size-adjust: 100%`.

**Verified:** 7 routes × 3 widths clean for overflow / tap targets / tiny text /
input size; contrast re-audited with alpha compositing and was **already passing**
(0 failures) so no colour was touched; menu open→navigate→close, scroll lock,
desktop nav, and calculator math (15,000 base → 35,000 E-commerce, matching the
documented reference) all still pass; lint + tsc + `next build` clean, no bundle
size change.

### Test suite (added Sep 2026)
- **There is now a real test suite**, because the reason the tap-target bug
  survived is that *all* QA used to be ad-hoc scripts in `/tmp` that vanished.
  - `npm test` — 29 unit tests, `node:test` + `node:assert`, **no new
    dependencies**. Node 26 strips the TypeScript types natively;
    `tests/alias-hooks.mjs` resolves the `@/*` alias (and appends the `.ts`
    extension, which Node's ESM resolver will not infer) via `registerHooks`.
    Requires `allowImportingTsExtensions` in `tsconfig.json`.
  - `npm run test:browser` — 37 checks in `tests/browser/smoke.py` (Playwright,
    **Firefox only**). Starts and stops *its own* dev server on port 3111 in its
    own process group, so it never touches a dev server you already have open.
  - `npm run test:browser:prod` — same suite against `npm start` (needs a build
    first). Prefer this: it is what users actually get.
  - `npm run typecheck` was added too; the scanner used to report
    "typecheck: no script defined".
- Covers: pricing math (totals always equal the sum of line items, unknown ids
  ignored, max derived from config), data integrity (no placeholder content,
  no `hello@manu.dev`, **LinkedIn must not reappear**, private repos keep
  `githubUrl: null`), contact helpers, every route loading clean, tap targets,
  menu geometry/keyboard, mobile 16px vs desktop 14px inputs, skip link, and
  the OG/sitemap/robots/manifest routes.
- **Verified the suite can actually fail:** re-adding `pointer-events: none` to
  `.tap-target::before` made the measured bands collapse to the raw element box
  (20px link → 20px band) and failed 3 checks. A test that cannot fail is
  worse than none.
- Next's dev-mode HMR socket (`ws://.../_next/webpack-hmr`) logs a console
  error and is explicitly allowlisted as `DEV_NOISE`. It is framework tooling,
  not app code, and is absent in production builds. Do not widen this list
  without checking the error is not yours.

### Accessibility, SEO & metadata (Sep 2026)
- **Skip link added.** `<main id="main">` had existed with nothing pointing at
  it, so keyboard users tabbed through the nav on all 7 pages — while
  `data.ts` advertised "skip-to-content link" as a shipped feature of a case
  study, making that claim false. The link is `.skip-link` in `globals.css`:
  off-screen until focused, then pinned below the notch. `<main>` also got
  `tabIndex={-1}` so focus can land there.
- **Share preview added.** `metadataBase` + `openGraph`/`twitter` were missing
  entirely, so shared links rendered with no preview image. `opengraph-image.tsx`
  generates a 1200×630 PNG at build time in the site palette. **It has not been
  visually reviewed — a human should eyeball it.**
- `sitemap.ts` (built from `projects` so new case studies can't be missed),
  `robots.ts`, `manifest.ts` added. `SITE_URL` lives in `src/lib/site.ts` and
  honours `NEXT_PUBLIC_SITE_URL`; the default is the current Vercel domain.
  **No custom domain is configured yet** — add one and set the env var.

### Operational warnings (READ before touching this project)
- **Phone/LAN access during `next dev`:** the dev server blocks dev-only
  `/_next/*` assets for foreign origins, which caused a 500
  (`Invariant: Expected clientReferenceManifest to be defined`) when the
  phone opened the site. Fixed via `allowedDevOrigins` in
  `next.config.ts` (`192.168.0.100`, `192.168.0.*`). If the phone moves to
  another subnet, add its IP/subnet there. `next.config` changes require a
  dev-server restart to take effect.
- **Never run `next build` while the dev server is live.** Both write to the same
  `.next/` directory; the build corrupts the running dev server (500s,
  `Cannot find module './331.js'`). Validate with `next build` only when the
  dev server is stopped (check `curl -s localhost:3000` returns 000 first).
- The running dev server (nohup, port 3000) must not be killed without asking
  the user. Restart if needed: `pkill -f "npm run dev"`, `rm -rf .next`,
  then relaunch detached with `setsid bash -c 'npm run dev > /tmp/next-dev.log 2>&1 &'`.
  Use `setsid` so it survives the tool shell session.
- Dev server used to be the user's terminal process (pid 44842); it was broken
  in-session by a `next build` and re-launched detached by this session.
- **Dev server is currently STOPPED** (user closed it). Start on demand with
  the `setsid` command above; recommend `rm -rf .next` after a stop/start.

### Commit log (multi-page refactor)
- `Add a real test suite, skip link, and share metadata` — unit tests
  (`node:test`, no new deps) + 37-check Playwright browser suite; skip link for
  the previously dangling `#main`; `metadataBase`/OG image/twitter/sitemap/
  robots/manifest; `.tap-target` overlay 44px → 45px for sub-pixel rounding
- `6e28e6d` — mobile ergonomics pass (16px mobile inputs to stop iOS zoom,
  44px tap targets, safe-area insets, menu keyboard focus + Escape)
- `6def307` — fix mobile menu overlay collapsing after scroll (portal out of the
  blurred header)
- `9eaef25` — add Inventory System screenshot (from private repo dashboard)
- `de5b0fe` — update Inventory System project data with real private-repo details
- `dbdf037` — use terminals.png as site favicon
- `c02deaf` — hide GitHub links for private repos
- `bd59eb6` — allow LAN device access in dev via allowedDevOrigins
- `e15ee34` — use FormSubmit form-ID hash instead of naked email endpoint
- `4fb613d` — wire real contact details + frontend email submissions
- `8e348dc` — animations reduced to minimum; static `Reveal`, server `Hero`
- `bd142e9` — deduplicate services (extract `ServicesGrid`), /services heading once
- `04e6dff` — multi-page refactor (routes, global nav/footer, template transitions)
