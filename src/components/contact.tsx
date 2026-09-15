import { profile, socials } from "@/lib/data";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-36">
        <Reveal>
          <SectionLabel>Contact</SectionLabel>
        </Reveal>

        <Reveal delay={1}>
          <h2 className="mt-12 text-[clamp(2.5rem,8vw,7rem)] leading-[1.02] font-bold tracking-tight text-primary">
            Have a project
            <br />
            in mind?
          </h2>
        </Reveal>

        <Reveal delay={2}>
          <h3 className="mt-6 text-[clamp(1.4rem,4vw,3rem)] leading-[1.1] font-semibold tracking-tight text-secondary">
            Let&apos;s build
            <br />
            something useful.
          </h3>
        </Reveal>

        <Reveal delay={2}>
          <a
            href={`mailto:${profile.email}`}
            className="link-underline mt-12 inline-block text-2xl font-medium tracking-tight text-primary transition-colors duration-300 hover:text-accent md:text-4xl"
          >
            {profile.email}
          </a>
        </Reveal>

        <Reveal delay={3}>
          <div className="mt-16 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs uppercase tracking-[0.25em] text-secondary/60">
              Find me online
            </p>
            <div className="flex flex-wrap items-center gap-8">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="link-underline text-[0.85rem] uppercase tracking-[0.2em] text-secondary transition-colors duration-300 hover:text-primary"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}