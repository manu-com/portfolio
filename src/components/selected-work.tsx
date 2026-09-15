import { projects as allProjects, Project } from "@/lib/data";
import { ProjectEntry } from "@/components/project-entry";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import Link from "next/link";

export function SelectedWork({
  list,
  heading = "Work that ships,\nnot just specs.",
  headingAccent,
  showCta = false,
}: {
  list?: Project[];
  heading?: string;
  headingAccent?: string;
  showCta?: boolean;
}) {
  const items = list ?? allProjects;
  const [mainLine, ...rest] = heading.split("\n");

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:px-10 md:py-36">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionLabel>Selected Work</SectionLabel>
          <p className="text-xs uppercase tracking-[0.2em] text-secondary/60">
            {String(items.length).padStart(2, "0")} Projects
          </p>
        </div>
      </Reveal>

      <Reveal delay={1}>
        <h2 className="mt-8 text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] font-bold tracking-tight text-primary">
          {mainLine}
          {headingAccent && (
            <>
              <br />
              <span className="text-secondary">{headingAccent}</span>
            </>
          )}
          {rest.length > 0 && !headingAccent && (
            <>
              <br />
              <span className="text-secondary">{rest.join(" ")}</span>
            </>
          )}
        </h2>
      </Reveal>

      <div className="mt-16 md:mt-24">
        {items.map((project, index) => (
          <ProjectEntry key={project.number} project={project} reversed={index % 2 === 1} />
        ))}
      </div>

      {showCta && (
        <Reveal>
          <div className="mt-16 border-t border-line pt-10">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-[0.8rem] font-medium uppercase tracking-[0.25em] text-secondary transition-colors duration-300 hover:text-accent"
            >
              View all work
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </Reveal>
      )}
    </section>
  );
}