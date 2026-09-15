import Link from "next/link";
import { profile } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-svh flex-col justify-between px-6 pb-12 pt-32 md:px-10 md:pt-40"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
        <p className="mb-8 flex items-center gap-3 text-[0.8rem] uppercase tracking-[0.3em] text-secondary">
          <span className="gold-dot" aria-hidden="true" />
          {profile.location}
        </p>

        <h1 className="text-primary">
          <span className="block text-[clamp(3.25rem,12vw,9rem)] leading-[0.98] font-bold tracking-tight">
            {profile.name}
          </span>
          <span className="mt-3 block text-[clamp(1.6rem,5vw,4.25rem)] leading-[1.08] font-medium tracking-tight">
            Digital Experiences &amp; Software.
          </span>
        </h1>

        <p className="mt-12 max-w-xl text-base leading-relaxed text-secondary md:text-lg">
          {profile.intro}
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-end justify-between">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <Link
            href="/work"
            className="border border-border px-8 py-4 text-[0.8rem] font-medium uppercase tracking-[0.25em] text-primary transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            View Work
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 border-b border-border pb-1 text-[0.8rem] font-medium uppercase tracking-[0.25em] text-secondary transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            Contact
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>

        <p
          className="hidden items-center gap-3 text-[0.7rem] uppercase tracking-[0.3em] text-secondary md:flex"
          aria-hidden="true"
        >
          Scroll &darr;
        </p>
      </div>
    </section>
  );
}