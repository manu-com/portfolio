import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { CtaSection } from "@/components/ui/cta-section";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
  };
}

function ProjectBlock({
  title,
  children,
  delay,
}: {
  title: string;
  children: React.ReactNode;
  delay?: 0 | 1 | 2 | 3;
}) {
  return (
    <Reveal delay={delay}>
      <div className="border-t border-line pt-8">
        <h2 className="text-[0.75rem] uppercase tracking-[0.25em] text-accent">
          {title}
        </h2>
        <div className="mt-5">{children}</div>
      </div>
    </Reveal>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const nextIndex = (index + 1) % projects.length;
  const nextProject = projects[nextIndex];

  return (
    <>
      <article className="mx-auto max-w-6xl px-6 pt-32 md:px-10 md:pt-40">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionLabel>{`Case Study — Project ${project.number}`}</SectionLabel>
          </Reveal>
          <Reveal delay={1}>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-secondary/60">
              {project.category}
            </p>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <h1 className="mt-8 text-[clamp(2.5rem,7vw,6rem)] leading-[1.02] font-bold tracking-tight text-primary">
            {project.name}
          </h1>
        </Reveal>

        <Reveal delay={2}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-secondary md:text-lg">
            {project.overview}
          </p>
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-accent/50 bg-accent/[0.04] px-6 py-3 text-[0.75rem] font-medium uppercase tracking-[0.25em] text-accent transition-colors duration-300 hover:bg-accent/10"
              >
                Live Demo &#8599;
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-border px-6 py-3 text-[0.75rem] font-medium uppercase tracking-[0.25em] text-primary transition-colors duration-300 hover:border-accent/60 hover:text-accent"
            >
              View on GitHub
            </a>
          </div>
        </Reveal>

        {/* Hero image */}
        <Reveal delay={2}>
          <div className="mt-16 overflow-hidden border border-line bg-surface">
            {project.image ? (
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 768px) 90vw, 70vw"
                  priority
                  className="object-cover object-top"
                />
              </div>
            ) : (
              <div className="flex aspect-[16/10] w-full items-center justify-center">
                <p className="text-xs uppercase tracking-[0.3em] text-secondary/50">
                  Screenshot soon
                </p>
              </div>
            )}
          </div>
        </Reveal>

        {/* Detail grid */}
        <div className="mt-20 grid grid-cols-1 gap-14 md:mt-28 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-14 lg:col-span-7">
            <ProjectBlock title="The Problem" delay={1}>
              <p className="text-base leading-relaxed text-secondary md:text-lg">
                {project.problem}
              </p>
            </ProjectBlock>

            <ProjectBlock title="The Solution" delay={2}>
              <p className="text-base leading-relaxed text-secondary md:text-lg">
                {project.solution}
              </p>
            </ProjectBlock>

            <ProjectBlock title="Key Features" delay={2}>
              <ul className="flex flex-col gap-3">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-base leading-relaxed text-secondary"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                    {feature}
                  </li>
                ))}
              </ul>
            </ProjectBlock>
          </div>

          <aside className="flex flex-col gap-14 lg:col-span-5">
            <Reveal delay={1}>
              <div className="border border-line bg-surface p-8">
                <h2 className="text-[0.75rem] uppercase tracking-[0.25em] text-accent">
                  Technologies
                </h2>
                <div className="mt-5 flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="border border-line px-4 py-2 text-[0.7rem] uppercase tracking-[0.2em] text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <ProjectBlock title="Result & Outcome" delay={2}>
              <p className="text-base leading-relaxed text-secondary md:text-lg">
                {project.results}
              </p>
            </ProjectBlock>
          </aside>
        </div>
      </article>

      {/* Next project */}
      <nav className="mx-auto max-w-6xl px-6 md:px-10" aria-label="Next project">
        <Reveal>
          <Link
            href={`/work/${nextProject.slug}`}
            className="group mt-24 flex items-end justify-between border-t border-line py-12 transition-colors duration-300 md:py-16"
          >
            <span className="text-[0.7rem] uppercase tracking-[0.3em] text-secondary/60">
              Next Project
            </span>
            <span className="flex flex-col items-end gap-2">
              <span className="text-[clamp(1.5rem,4vw,3rem)] font-bold tracking-tight text-primary transition-colors duration-300 group-hover:text-accent">
                {nextProject.name}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-secondary">
                {nextProject.category}
              </span>
            </span>
          </Link>
        </Reveal>
      </nav>

      <CtaSection />
    </>
  );
}