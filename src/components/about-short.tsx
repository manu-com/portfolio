import Link from "next/link";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

export function AboutShort() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <div className="md:col-span-6">
          <Reveal>
            <SectionLabel>About</SectionLabel>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-8 text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.15] font-bold tracking-tight text-primary">
              I build software that people{" "}
              <span className="text-secondary">actually use</span> — and keep using.
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
          <Reveal delay={2}>
            <p className="text-base leading-relaxed text-secondary md:text-lg">
              I&apos;m Manu — a developer focused on web development and software
              that works well and looks good doing it. Clean code, thoughtful
              interfaces, and technology that serves a purpose rather than existing
              for its own sake.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 text-[0.8rem] font-medium uppercase tracking-[0.25em] text-secondary transition-colors duration-300 hover:text-accent"
            >
              More about me
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}