import { projects } from "@/lib/data";
import { ProjectEntry } from "@/components/project-entry";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

export function SelectedWork() {
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:px-10 md:py-36">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionLabel>Selected Work</SectionLabel>
          <p className="text-xs uppercase tracking-[0.2em] text-secondary/60">
            {String(projects.length).padStart(2, "0")} Projects
          </p>
        </div>
      </Reveal>

      <Reveal delay={1}>
        <h2 className="mt-8 text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] font-bold tracking-tight text-primary">
          Work that ships,
          <br />
          <span className="text-secondary">not just specs.</span>
        </h2>
      </Reveal>

      <div className="mt-16 md:mt-24">
        {projects.map((project, index) => (
          <ProjectEntry key={project.number} project={project} reversed={index % 2 === 1} />
        ))}
      </div>
    </section>
  );
}