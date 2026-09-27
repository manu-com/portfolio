import Link from "next/link";
import { profile, navLinks, cta, socials } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <Link
            href="/"
            className="tap-target inline-block text-sm font-bold tracking-[0.35em] text-primary transition-colors duration-300 hover:text-accent"
          >
            MANU
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-secondary/70">
            Digital experiences &amp; software — built to be fast, functional, and
            thoughtfully crafted.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-secondary/50">
            Navigate
          </p>
          <ul className="mt-4 flex flex-col gap-1 md:mt-5 md:gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-underline tap-target inline-block py-3 text-sm text-secondary transition-colors duration-300 hover:text-primary md:py-1.5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={cta.href}
                className="tap-target inline-block py-3 text-sm text-accent transition-colors duration-300 hover:text-accent md:py-1.5"
              >
                {cta.label}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-secondary/50">
            Find me online
          </p>
          <ul className="mt-4 flex flex-col gap-1 md:mt-5 md:gap-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="link-underline tap-target inline-block py-3 text-sm text-secondary transition-colors duration-300 hover:text-primary md:py-1.5"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-secondary/50">
            Contact
          </p>
          <div className="mt-4 flex flex-col gap-1 md:mt-5 md:gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="link-underline tap-target inline-block py-3 text-sm text-secondary transition-colors duration-300 hover:text-primary md:py-1.5"
            >
              {profile.email}
            </a>
            <a
              href="tel:+254112888460"
              className="link-underline tap-target inline-block py-3 text-sm text-secondary transition-colors duration-300 hover:text-primary md:py-1.5"
            >
              {profile.phone}
            </a>
            <a
              href="https://wa.me/254112888460?text=Hi%20Manu%2C%20I%27d%20like%20to%20discuss%20a%20website%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline tap-target inline-block py-3 text-sm text-secondary transition-colors duration-300 hover:text-primary md:py-1.5"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 pt-6 pb-[calc(1.5rem+var(--safe-bottom))] md:flex-row md:px-10 md:py-6">
          <p className="text-xs text-secondary/60">
            &copy; {year} {profile.name}. All rights reserved.
          </p>
          <p className="text-xs text-secondary/40">Built with care in the dark.</p>
        </div>
      </div>
    </footer>
  );
}