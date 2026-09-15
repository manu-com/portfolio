import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

export function PageHeader({
  label,
  title,
  titleAccent,
  intro,
}: {
  label: string;
  title: string;
  titleAccent?: string;
  intro?: string;
}) {
  return (
    <header className="mx-auto max-w-6xl border-t border-line px-6 pt-32 md:px-10 md:pt-40">
      <Reveal>
        <SectionLabel>{label}</SectionLabel>
      </Reveal>
      <Reveal delay={1}>
        <h1 className="mt-8 text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] font-bold tracking-tight text-primary">
          {title}
          {titleAccent && (
            <>
              <br />
              <span className="text-secondary">{titleAccent}</span>
            </>
          )}
        </h1>
      </Reveal>
      {intro && (
        <Reveal delay={2}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-secondary md:text-lg">
            {intro}
          </p>
        </Reveal>
      )}
    </header>
  );
}