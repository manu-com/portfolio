"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/data";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-10">
        <a
          href="#top"
          className="text-sm font-bold tracking-[0.35em] text-primary"
          onClick={() => setMenuOpen(false)}
        >
          MANU
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline text-[0.8rem] uppercase tracking-[0.2em] text-secondary transition-colors duration-300 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="border border-border px-4 py-2 text-[0.8rem] uppercase tracking-[0.2em] text-primary transition-colors duration-300 hover:border-accent/60 hover:text-accent"
          >
            Let&apos;s Talk
          </a>
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
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

      <div
        className={`fixed inset-0 top-16 z-40 flex flex-col bg-background transition-all duration-500 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-8 px-6">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-4xl font-bold tracking-tight text-primary transition-colors hover:text-accent"
              style={{ transitionDelay: menuOpen ? `${index * 40}ms` : "0ms" }}
            >
              <span className="mr-4 text-xs text-secondary">{`0${index + 1}`}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-between border-t border-line px-6 py-6">
          <a
            href={`mailto:${profile.email}`}
            onClick={() => setMenuOpen(false)}
            className="text-sm text-secondary"
          >
            {profile.email}
          </a>
          <a
            href={`mailto:${profile.email}`}
            onClick={() => setMenuOpen(false)}
            className="border border-border px-5 py-3 text-xs uppercase tracking-[0.2em] text-primary"
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </header>
  );
}