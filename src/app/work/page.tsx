import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { WorkGallery } from "@/components/work-gallery";
import { CtaSection } from "@/components/ui/cta-section";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A selection of websites, web applications, and software built by Manu — with live demos and full case studies.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        label="Work"
        title="Selected projects,"
        titleAccent="built end to end."
        intro="A selection of websites, web applications, and software — each with its own problem to solve and shipped with care."
      />
      <WorkGallery initial={projects} />
      <CtaSection />
    </>
  );
}