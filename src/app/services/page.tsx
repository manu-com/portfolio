import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Services } from "@/components/services";
import { CtaSection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "Web Development Services",
  description:
    "Web development, web applications, software development, and UI implementation — from concept to production, built to be fast, functional, and thoughtfully crafted.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Services"
        title="What I build,"
        titleAccent="end to end."
        intro="Websites, web applications, software, and polished interfaces — each service explained with what's included, when to use it, and how we'd work together."
      />
      <Services />
      <CtaSection />
    </>
  );
}