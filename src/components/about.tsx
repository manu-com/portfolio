import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-36">
        <Reveal>
          <SectionLabel>About</SectionLabel>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-12 md:mt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal delay={1}>
              <h2 className="text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.15] font-bold tracking-tight text-primary">
                I build software that people{" "}
                <span className="text-secondary">actually use</span> — and keep using.
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-center">
            <Reveal delay={2}>
              <p className="text-base leading-relaxed text-secondary md:text-lg">
                I&apos;m Manu — a developer focused on web development and software
                that works well and looks good doing it. I care about clean code,
                thoughtful interfaces, and technology that serves a purpose rather
                than existing for its own sake.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <p className="mt-6 text-base leading-relaxed text-secondary md:text-lg">
                From web applications and frontends to tooling and systems-level
                software, my work is measured by one thing: whether it holds up in
                daily use. I build practical technology, and I build it carefully.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-10 items-start gap-6 border-l-2 border-accent/60 pl-6">
                <p className="text-xs uppercase tracking-[0.25em] text-secondary">
                  Currently focused on
                </p>
                <p className="mt-2 text-sm leading-relaxed text-primary">
                  Web applications &amp; practical software tools
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}