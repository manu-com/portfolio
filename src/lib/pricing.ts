export type OptionDef = {
  id: string;
  name: string;
  price: number;
  description?: string;
};

export const pricing = {
  currency: "KSh",

  /* Base price for any website */
  base: 15000,

  /* Website types — one required selection */
  websiteTypes: [
    { id: "landing-page", name: "Landing Page", price: 0 },
    { id: "business", name: "Business Website", price: 5000 },
    { id: "portfolio", name: "Portfolio Website", price: 3000 },
    { id: "ecommerce", name: "E-commerce Website", price: 20000 },
    { id: "web-app", name: "Web Application", price: 25000 },
  ] as OptionDef[],

  /* Page counts — one required selection */
  pages: [
    { id: "1", name: "1 Page", price: 0 },
    { id: "3", name: "3 Pages", price: 3000 },
    { id: "5", name: "5 Pages", price: 5000 },
    { id: "10", name: "10+ Pages", price: 10000 },
  ] as OptionDef[],

  /* Optional features — multi-select */
  features: [
    { id: "contact-form", name: "Contact Form", price: 1500 },
    { id: "whatsapp", name: "WhatsApp Integration", price: 1000 },
    { id: "social-media", name: "Social Media Integration", price: 1500 },
    { id: "blog", name: "Blog", price: 3000 },
    { id: "booking", name: "Booking System", price: 8000 },
    { id: "auth", name: "User Authentication", price: 10000 },
    { id: "admin", name: "Admin Dashboard", price: 15000 },
    { id: "payment", name: "Payment Integration", price: 12000 },
    { id: "products", name: "E-commerce / Products", price: 15000 },
    { id: "search", name: "Search", price: 3000 },
    { id: "analytics", name: "Analytics", price: 2000 },
    { id: "database", name: "Database", price: 8000 },
    { id: "api", name: "API Integration", price: 10000 },
    { id: "custom", name: "Custom Functionality", price: 15000 },
  ] as OptionDef[],

  /* Design options — one required selection */
  design: [
    { id: "existing", name: "Existing design provided", price: 0 },
    { id: "template", name: "Template / customized design", price: 5000 },
    { id: "custom", name: "Fully custom UI/UX", price: 20000 },
  ] as OptionDef[],

  /* Additional services — multi-select */
  additionalServices: [
    { id: "domain", name: "Domain setup", price: 2000 },
    { id: "hosting", name: "Hosting setup", price: 3000 },
    { id: "seo", name: "SEO setup", price: 5000 },
    { id: "deployment", name: "Website deployment", price: 3000 },
    { id: "maintenance", name: "Maintenance", price: 5000 },
  ] as OptionDef[],
} as const;

export type WebsiteTypeId = (typeof pricing.websiteTypes)[number]["id"];
export type PageId = (typeof pricing.pages)[number]["id"];
export type FeatureId = (typeof pricing.features)[number]["id"];
export type DesignId = (typeof pricing.design)[number]["id"];
export type AdditionalServiceId =
  (typeof pricing.additionalServices)[number]["id"];

/* Format a number as professional KSh currency, e.g. 27_500 -> "KSh 27,500" */
export function formatKSh(amount: number): string {
  return `${pricing.currency} ${amount.toLocaleString("en-KE")}`;
}

export type CalculatorSelection = {
  websiteType: WebsiteTypeId | null;
  pages: PageId | null;
  features: FeatureId[];
  design: DesignId | null;
  additionalServices: AdditionalServiceId[];
};

export type QuoteLineItem = {
  label: string;
  price: number;
  group: "type" | "features" | "design" | "services";
};

/**
 * Derive the full estimate from a selection.
 * This is the single source of truth for the total — pricing comes
 * exclusively from the config above.
 */
export function calculateEstimate(
  selection: CalculatorSelection,
): { lineItems: QuoteLineItem[]; total: number } {
  const lineItems: QuoteLineItem[] = [{ label: "Base Website", price: pricing.base, group: "type" }];

  const type = pricing.websiteTypes.find((t) => t.id === selection.websiteType);
  if (type && type.price > 0) {
    lineItems.push({ label: type.name, price: type.price, group: "type" });
  }

  const page = pricing.pages.find((p) => p.id === selection.pages);
  if (page && page.price > 0) {
    lineItems.push({ label: page.name, price: page.price, group: "type" });
  }

  for (const id of selection.features) {
    const def = pricing.features.find((f) => f.id === id);
    if (def) lineItems.push({ label: def.name, price: def.price, group: "features" });
  }

  const design = pricing.design.find((d) => d.id === selection.design);
  if (design && design.price > 0) {
    lineItems.push({ label: design.name, price: design.price, group: "design" });
  }

  for (const id of selection.additionalServices) {
    const def = pricing.additionalServices.find((s) => s.id === id);
    if (def) lineItems.push({ label: def.name, price: def.price, group: "services" });
  }

  const total = lineItems.reduce((sum, item) => sum + item.price, 0);
  return { lineItems, total };
}

/* Human-readable summary of the selection, used in the quote request. */
export function describeSelection(selection: CalculatorSelection): string[] {
  const lines: string[] = [];

  const type = pricing.websiteTypes.find((t) => t.id === selection.websiteType);
  if (type) lines.push(`Website type: ${type.name}`);

  const page = pricing.pages.find((p) => p.id === selection.pages);
  if (page) lines.push(`Pages: ${page.name}`);

  const design = pricing.design.find((d) => d.id === selection.design);
  if (design) lines.push(`Design: ${design.name}`);

  const features = selection.features
    .map((id) => pricing.features.find((f) => f.id === id)?.name)
    .filter(Boolean);
  if (features.length) lines.push(`Features: ${features.join(", ")}`);

  const services = selection.additionalServices
    .map((id) => pricing.additionalServices.find((s) => s.id === id)?.name)
    .filter(Boolean);
  if (services.length) lines.push(`Additional services: ${services.join(", ")}`);

  return lines;
}