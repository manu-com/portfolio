import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Technologies } from "@/components/technologies";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Manu — a web and software developer who builds fast, functional, and thoughtfully crafted digital experiences.",
};

const skills = [
  "Frontend development with React",
  "Responsive, accessible interfaces",
  "Web application architecture",
  "Software & automation tooling",
  "Version control and deployment",
  "Linux-based workflows",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title="Software that people"
        titleAccent="actually use."
        intro="A short introduction to who I am, how I work, and the kind of projects I focus on."
      />

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <Reveal>
              <SectionLabel>Introduction</SectionLabel>
            </Reveal>
            <Reveal delay={1}>
              <div className="flex flex-col gap-6">
                <p className="text-lg leading-relaxed text-primary">
                  I&apos;m Manu — a developer focused on web development and
                  software that works well and looks good doing it.
                </p>
                <p className="text-base leading-relaxed text-secondary">
                  I care about clean code, thoughtful interfaces, and technology
                  that serves a purpose rather than existing for its own sake.
                  My work is measured by one thing: whether it holds up in daily
                  use.
                </p>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <SectionLabel className="mt-8">Background</SectionLabel>
            </Reveal>
            <Reveal delay={2}>
              <div className="flex flex-col gap-6">
                <p className="text-base leading-relaxed text-secondary">
                  I work across the web and beyond it — building front-ends and
                  web applications, writing software and tooling, and automating
                  the repeated parts of real workflows. That range lets me take
                  an idea from a blank page to something running in production,
                  without losing the thread between the design and the code.
                </p>
                <p className="text-base leading-relaxed text-secondary">
                  Every project starts the same way: understanding the actual
                  problem before writing any code, then building the smallest
                  thing that solves it properly.
                </p>
              </div>
            </Reveal>
          </div>

          <aside className="flex flex-col gap-12 lg:col-span-5">
            <Reveal delay={1}>
              <div className="border border-line bg-surface p-8">
                <h2 className="text-[0.75rem] uppercase tracking-[0.25em] text-accent">
                  Skills
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-start gap-3 text-sm leading-relaxed text-secondary"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div className="border border-line bg-surface p-8">
                <h2 className="text-[0.75rem] uppercase tracking-[0.25em] text-accent">
                  Development Philosophy
                </h2>
                <div className="mt-5 flex flex-col gap-6">
                  <p className="text-sm leading-relaxed text-secondary">
                    Build practical technology, and build it carefully. Fast is
                    a feature. Accessible is the baseline. Simple beats clever.
                  </p>
                  <p className="text-sm leading-relaxed text-secondary">
                    Technology should serve the people using it — not the other
                    way around.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div className="border-l-2 border-accent/60 pl-6">
                <p className="text-xs uppercase tracking-[0.25em] text-secondary">
                  What I work on
                </p>
                <p className="mt-2 text-sm leading-relaxed text-primary">
                  Web applications, marketing sites, software tooling, and
                  automation — currently focused on web applications.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-36">
          <Technologies />
        </div>
      </section>
    </>
  );
}