import { technologies } from "@/lib/data";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

export function Technologies() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionLabel>Technologies</SectionLabel>
          </Reveal>
          <Reveal delay={1}>
            <p className="hidden text-xs uppercase tracking-[0.2em] text-secondary/60 md:block">
              The tools behind the work
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3 md:mt-20">
          {technologies.map((tech, index) => (
            <Reveal key={tech} delay={(index % 3) as 0 | 1 | 2} className="bg-background">
              <div className="group flex h-28 items-center justify-center gap-3 border-b border-line transition-colors duration-500 hover:bg-surface sm:h-32 md:h-36">
                <span className="text-[0.7rem] uppercase tracking-[0.2em] text-secondary/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-semibold tracking-tight text-primary transition-colors duration-300 group-hover:text-accent md:text-xl">
                  {tech}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}