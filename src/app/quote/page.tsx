import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Calculator } from "@/components/calculator";

export const metadata: Metadata = {
  title: "Website Cost Calculator",
  description:
    "Build your website step by step and see an instant cost estimate in KSh — choose a website type, pages, features, design, and additional services, then request a quote.",
};

export default function QuotePage() {
  return (
    <>
      <PageHeader
        label="Get a Quote"
        title="Build your website,"
        titleAccent="your way."
        intro="Select your features below to see an instant estimate. Final pricing may vary depending on project requirements."
      />
      <Calculator />
    </>
  );
}