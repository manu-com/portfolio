import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";

type ProjectEntryProps = {
  project: Project;
  reversed?: boolean;
};

export function ProjectEntry({ project, reversed = false }: ProjectEntryProps) {
  return (
    <article
      className={`project-entry grid grid-cols-1 gap-8 border-t border-line py-16 md:grid-cols-12 md:gap-10 md:py-24 ${
        reversed ? "md:grid-flow-row-dense" : ""
      }`}
    >
      {/* Visual */}
      <div
        className={`md:col-span-7 ${reversed ? "md:col-start-6" : ""}`}
      >
        <Reveal>
          <div className="group block overflow-hidden border border-line bg-surface transition-colors duration-300 hover:border-line-hover">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 768px) 85vw, 55vw"
                  className="project-thumb object-cover object-top"
                />
              ) : (
                <div
                  className={`project-thumb absolute inset-0 bg-gradient-to-br from-[#1c1c1c] to-[#0e0e0e] ${
                    reversed ? "to-45%" : ""
                  }`}
                  aria-hidden="true"
                >
                  {/* Decorative placeholder composition */}
                  <div className="absolute inset-0 opacity-[0.6]">
                    <div className="absolute left-[8%] top-[12%] h-2 w-16 bg-accent/70" />
                    <div className="absolute right-[8%] top-[12%] h-2 w-10 border border-white/10" />
                    <div className="absolute left-[8%] top-[30%] h-3 w-[46%] bg-white/90" />
                    <div className="absolute left-[8%] top-[38%] h-3 w-[36%] bg-white/60" />
                    <div className="absolute left-[8%] top-[50%] flex gap-2">
                      <span className="h-10 w-10 border border-accent/30 bg-accent/10" />
                      <span className="h-10 w-10 border border-white/10" />
                      <span className="h-10 w-10 border border-white/10" />
                    </div>
                    <div className="absolute right-[8%] top-[30%] border border-white/10 p-3">
                      <span className="block h-2 w-14 bg-white/40" />
                      <span className="mt-2 block h-2 w-20 bg-white/20" />
                      <span className="mt-2 block h-2 w-16 bg-white/20" />
                    </div>
                    <div className="absolute bottom-[10%] left-[8%] flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Copy */}
      <div
        className={`flex flex-col justify-center md:col-span-5 ${
          reversed ? "md:col-start-1 md:row-start-1" : ""
        }`}
      >
        <Reveal delay={1}>
          <p className="text-[0.75rem] uppercase tracking-[0.25em] text-accent">
            Project {project.number}
          </p>
        </Reveal>

        <Reveal delay={1}>
          <Link
            href={`/work/${project.slug}`}
            className="mt-4 inline-block text-[clamp(1.75rem,3.5vw,3rem)] font-bold tracking-tight text-primary transition-colors duration-300 hover:text-accent"
          >
            {project.name}
          </Link>
        </Reveal>

        <Reveal delay={2}>
          <p className="mt-5 max-w-md text-base leading-relaxed text-secondary">
            {project.description}
          </p>
        </Reveal>

        <Reveal delay={3}>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[0.7rem] uppercase tracking-[0.2em] text-secondary/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={3}>
          <div className="mt-8 flex items-center gap-6">
            <Link
              href={`/work/${project.slug}`}
              className="link-underline inline-flex items-center gap-2 text-[0.8rem] uppercase tracking-[0.2em] text-primary transition-colors duration-300 hover:text-accent"
            >
              Case Study
            </Link>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline group inline-flex items-center gap-2 text-[0.8rem] uppercase tracking-[0.2em] text-primary transition-colors duration-300 hover:text-accent"
              >
                Live
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  &#8599;
                </span>
              </a>
            ) : null}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-[0.8rem] uppercase tracking-[0.2em] text-secondary transition-colors duration-300 hover:text-primary"
            >
              GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </article>
  );
}