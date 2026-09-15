"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navLinks, profile, cta } from "@/lib/data";

export function Navigation() {
  const pathname = usePathname();
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-10">
        <Link
          href="/"
          className="text-sm font-bold tracking-[0.35em] text-primary transition-colors hover:text-accent"
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
                isActive(link.href)
                  ? "text-primary"
                  : "text-secondary hover:text-primary"
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
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-6 px-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-4xl font-bold tracking-tight transition-colors ${
                isActive(link.href)
                  ? "text-accent"
                  : "text-primary hover:text-accent"
              }`}
              style={{ transitionDelay: menuOpen ? `${index * 40}ms` : "0ms" }}
            >
              <span className="mr-4 text-xs text-secondary">{`0${index + 1}`}</span>
              {link.label}
            </Link>
          ))}
          <Link
            href={cta.href}
            onClick={() => setMenuOpen(false)}
            className="inline-flex w-fit items-center border border-accent/50 px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent/10"
          >
            {cta.label}
          </Link>
        </nav>
        <div className="flex items-center justify-between border-t border-line px-6 py-6">
          <span className="text-sm text-secondary">{profile.email}</span>
        </div>
      </div>
    </header>
  );
}