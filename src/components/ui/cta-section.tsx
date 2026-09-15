import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";

export function CtaSection() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-36">
        <Reveal>
          <h2 className="text-[clamp(2rem,6vw,5rem)] leading-[1.05] font-bold tracking-tight text-primary">
            Have a project<br />
            in mind?
          </h2>
        </Reveal>

        <Reveal delay={1}>
          <h3 className="mt-6 text-[clamp(1.2rem,3vw,2.5rem)] leading-[1.1] font-semibold tracking-tight text-secondary">
            Let&apos;s build<br />
            something useful.
          </h3>
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center border border-accent/50 bg-accent/10 px-8 py-4 text-[0.8rem] font-medium uppercase tracking-[0.25em] text-accent transition-colors duration-300 hover:bg-accent/20"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 border-b border-border pb-1 text-[0.8rem] font-medium uppercase tracking-[0.25em] text-secondary transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Get in Touch
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}