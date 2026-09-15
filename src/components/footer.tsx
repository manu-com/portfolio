import { profile, socials } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-6 py-12 md:flex-row md:px-10">
        <a
          href="#top"
          className="text-sm font-bold tracking-[0.35em] text-primary transition-colors duration-300 hover:text-accent"
        >
          MANU
        </a>

        <p className="text-xs text-secondary/70">
          &copy; {year} {profile.name}. All rights reserved.
        </p>

        <nav aria-label="Social" className="flex items-center gap-8">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="link-underline text-[0.75rem] uppercase tracking-[0.2em] text-secondary transition-colors duration-300 hover:text-primary"
            >
              {social.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}