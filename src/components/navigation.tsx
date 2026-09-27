"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navLinks, profile, cta } from "@/lib/data";

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Rotating a tablet or resizing past the md breakpoint reveals the desktop
  // nav, so the open overlay has to be dismissed or it stays stuck on screen.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // The overlay is portaled to the end of <body>, so on the keyboard its links
  // come last in tab order. Move focus into it on open, and hand it back to
  // the toggle on Escape / close.
  useEffect(() => {
    if (!menuOpen) return;
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const header = (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[var(--safe-top)] transition-colors duration-500 ${
        scrolled || menuOpen ? "bg-background/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-10">
        <Link
          href="/"
          className="tap-target text-sm font-bold tracking-[0.35em] text-primary transition-colors hover:text-accent"
          onClick={() => setMenuOpen(false)}
        >
          MANU
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`link-underline text-[0.8rem] uppercase tracking-[0.2em] transition-colors duration-300 ${
                isActive(link.href) ? "text-primary" : "text-secondary hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={cta.href}
            className="border border-accent/50 px-4 py-2 text-[0.8rem] uppercase tracking-[0.2em] text-accent transition-colors duration-300 hover:bg-accent/10"
          >
            {cta.label}
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] md:hidden"
        >
          <span
            className={`h-px w-6 bg-primary transition-transform duration-300 ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-primary transition-transform duration-300 ${
              menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>
    </header>
  );

  const mobileMenu = (
    <div
      id="mobile-menu"
      ref={panelRef}
      className={`fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 flex flex-col overscroll-contain bg-background transition-opacity duration-500 md:hidden ${
        menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!menuOpen}
    >
      <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-2 px-6">
        {navLinks.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
            className={`flex items-center gap-4 border-b border-line/60 py-4 text-3xl font-bold tracking-tight transition-colors ${
              isActive(link.href) ? "text-accent" : "text-primary hover:text-accent"
            }`}
          >
            <span className="w-6 text-xs font-normal tracking-[0.2em] text-secondary">
              {`0${index + 1}`}
            </span>
            {link.label}
          </Link>
        ))}
        <Link
          href={cta.href}
          onClick={() => setMenuOpen(false)}
          tabIndex={menuOpen ? 0 : -1}
          className="mt-8 inline-flex w-fit items-center justify-center border border-accent/50 px-7 py-4 text-sm font-medium uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent/10"
        >
          {cta.label}
        </Link>
      </nav>
      <div className="flex items-center justify-between gap-4 border-t border-line px-6 pt-6 pb-[calc(1.5rem+var(--safe-bottom))]">
        <a
          href={`mailto:${profile.email}`}
          tabIndex={menuOpen ? 0 : -1}
          className="tap-target min-w-0 text-sm text-secondary transition-colors hover:text-primary"
        >
          {/* truncate lives on the span: overflow-hidden on the link itself
              would clip the .tap-target overlay and shrink the hit area */}
          <span className="block truncate">{profile.email}</span>
        </a>
      </div>
    </div>
  );

  return (
    <>
      {header}
      {mounted ? createPortal(mobileMenu, document.body) : null}
    </>
  );
}
