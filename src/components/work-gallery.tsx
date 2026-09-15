"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/data";
import { ProjectEntry } from "@/components/project-entry";
import { Reveal } from "@/components/ui/reveal";

export function WorkGallery({ initial }: { initial: Project[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(initial.map((p) => p.category)))],
    [initial]
  );
  const [active, setActive] = useState("All");

  const list = useMemo(
    () =>
      active === "All"
        ? initial
        : initial.filter((p) => p.category === active),
    [active, initial]
  );

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-24 md:px-10 md:pb-36">
      <div className="flex flex-wrap items-center justify-between gap-6 border-y border-line py-7">
        <p className="text-xs uppercase tracking-[0.2em] text-secondary/60">
          Filter by category
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3" role="tablist" aria-label="Project categories">
          {categories.map((category, index) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active === category}
              onClick={() => setActive(category)}
              className={`text-[0.8rem] uppercase tracking-[0.2em] transition-colors duration-300 ${
                active === category
                  ? "text-accent"
                  : "text-secondary hover:text-primary"
              }`}
            >
              <span className="mr-2 text-[0.65rem] text-secondary/50">
                {String(index).padStart(2, "0")}
              </span>
              {category}
            </button>
          ))}
        </div>
      </div>

      <Reveal key={active}>
        <div className="mt-6">
          {list.map((project, index) => (
            <ProjectEntry
              key={project.number}
              project={project}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}