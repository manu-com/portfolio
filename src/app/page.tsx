import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { Services } from "@/components/services";
import { AboutShort } from "@/components/about-short";
import { CtaSection } from "@/components/ui/cta-section";
import { projects } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork
        list={projects.slice(0, 2)}
        showCta
        heading="Work that ships,"
        headingAccent="not just specs."
      />
      <Services compact />
      <AboutShort />
      <CtaSection />
    </>
  );
}