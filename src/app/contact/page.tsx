import type { Metadata } from "next";
import { profile, socials } from "@/lib/data";
import { whatsappHref, mailtoHref } from "@/lib/contact";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Manu — email, phone, WhatsApp, and GitHub, or send a message directly through the contact form.",
};

const contactChannels = [
  {
    label: "Email",
    value: profile.email,
    href: mailtoHref("Project inquiry"),
  },
  {
    label: "Phone",
    value: profile.phone,
    href: "tel:+254112888460",
  },
  {
    label: "WhatsApp",
    value: "Chat about a project",
    href: whatsappHref(),
  },
  {
    label: "GitHub",
    value: "Code and open-source work",
    href: profile.github,
  },
];

export default function ContactPage() {
  return (
    <>
      <header className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-10 md:px-10 md:pt-32">
          <Reveal>
            <SectionLabel>Contact</SectionLabel>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="mt-10 text-[clamp(2.25rem,7vw,5.5rem)] leading-[1.02] font-bold tracking-tight text-primary">
              Let&apos;s build<br />
              <span className="text-secondary">something useful.</span>
            </h1>
          </Reveal>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 md:px-10 md:py-20 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <Reveal>
            <p className="max-w-md text-base leading-relaxed text-secondary md:text-lg">
              Have a project in mind, a question about a service, or just want
              to say hello? Choose whichever channel suits you.
            </p>
          </Reveal>

          <div className="mt-4 flex flex-col gap-px bg-line">
            {contactChannels.map((channel, index) => (
              <Reveal key={channel.label} delay={(index % 4) as 0 | 1 | 2 | 3}>
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between bg-background px-6 py-6 transition-colors duration-300 hover:bg-surface"
                >
                  <span className="text-[0.75rem] uppercase tracking-[0.25em] text-accent">
                    {channel.label}
                  </span>
                  <span className="text-right text-sm text-secondary transition-colors duration-300 group-hover:text-primary">
                    {channel.value}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={3}>
            <div className="flex flex-wrap items-center gap-8 border-t border-line pt-8">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="link-underline text-[0.8rem] uppercase tracking-[0.2em] text-secondary transition-colors duration-300 hover:text-primary"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}