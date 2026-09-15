"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

function HeroLine({
  children,
  active,
  delayClass,
}: {
  children: string;
  active: boolean;
  delayClass?: string;
}) {
  const motion = delayClass ?? "hero-line-delay-1";
  // Barebone class merge
  const cls = `hero-line ${motion} ${active ? "is-visible" : ""}`;
  return (
    <span className={cls}>
      <span>{children}</span>
    </span>
  );
}

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="top"
      className="flex min-h-svh flex-col justify-between px-6 pb-12 pt-32 md:px-10 md:pt-40"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
        <p
          className={`mb-8 flex items-center gap-3 text-[0.8rem] uppercase tracking-[0.3em] text-secondary transition-opacity duration-700 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="gold-dot" aria-hidden="true" />
          {profile.location}
        </p>

        <h1 className="text-primary">
          <span className="block text-[clamp(3.25rem,12vw,9rem)] leading-[0.98] font-bold tracking-tight">
            <HeroLine active={mounted} delayClass="hero-line-delay-1">
              {profile.name}
            </HeroLine>
          </span>
          <span className="mt-3 block text-[clamp(1.6rem,5vw,4.25rem)] leading-[1.08] font-medium tracking-tight">
            <HeroLine active={mounted} delayClass="hero-line-delay-2">
              Digital Experiences
            </HeroLine>{" "}
            <HeroLine active={mounted} delayClass="hero-line-delay-3">
              &amp; Software.
            </HeroLine>
          </span>
        </h1>

        <p
          className={`mt-12 max-w-xl text-base leading-relaxed text-secondary [transition:opacity_.7s_linear_.7s] md:text-lg ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          {profile.intro}
        </p>
      </div>

      <div
        className={`mx-auto flex w-full max-w-6xl items-end justify-between [transition:all_.7s_cubic-bezier(.16,1,.3,1)_.9s] ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <a
            href="#work"
            className="inline-flex items-center justify-center border border-border px-8 py-4 text-[0.8rem] font-medium uppercase tracking-[0.25em] text-primary transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 border-b border-border pb-1 text-[0.8rem] font-medium uppercase tracking-[0.25em] text-secondary transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            Contact
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </div>

        <p
          className="hidden items-center gap-3 text-[0.7rem] uppercase tracking-[0.3em] text-secondary md:flex"
          aria-hidden="true"
        >
          Scroll
          <span className="animate-pulse">&darr;</span>
        </p>
      </div>
    </section>
  );
}