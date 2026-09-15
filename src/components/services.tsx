import { services } from "@/lib/data";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-36">
        <Reveal>
          <SectionLabel>Services</SectionLabel>
        </Reveal>

        <Reveal delay={1}>
          <h2 className="mt-8 max-w-3xl text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] font-bold tracking-tight text-primary">
            What I build, <span className="text-secondary">end to end.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px bg-line md:mt-24 md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.number} delay={(index % 2) as 0 | 1} className="bg-background">
              <div className="group h-full border-b border-line p-8 transition-colors duration-500 last:border-b-0 hover:bg-surface md:border-r md:p-12 md:[&:nth-child(2n)]:border-r-0 md:[&:last-child]:border-b-0">
                <div className="flex items-baseline justify-between">
                  <p className="text-[0.75rem] uppercase tracking-[0.25em] text-accent">
                    {service.number}
                  </p>
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-primary transition-colors duration-300 group-hover:text-accent md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-secondary md:text-base">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}