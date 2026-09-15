export type Project = {
  number: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  imageAlt: string;
  image?: string;
  /* detail-page fields */
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  results: string;
};

export const profile = {
  name: "MANU",
  tagline: "DIGITAL EXPERIENCES & SOFTWARE.",
  intro:
    "I build websites, web applications, and software that are fast, functional, and thoughtfully crafted.",
  email: "hello@manu.dev",
  whatsapp: "https://wa.me/254712345678",
  github: "https://github.com/manu-com",
  linkedin: "https://linkedin.com/in/manu",
  location: "Available worldwide",
};

export const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const cta = { label: "Get a Quote", href: "/quote" };

export const projects: Project[] = [
  {
    number: "01",
    slug: "business-template",
    name: "Business Template",
    category: "Web Development",
    description:
      "A professional single-page business website built with React, Vite, and Tailwind CSS — designed for B2B companies, agencies, and service-based businesses. Includes dark mode, SEO, accessibility, and reusable components.",
    technologies: ["React", "Vite", "Tailwind CSS", "Motion"],
    liveUrl: "https://business-template-kohl.vercel.app",
    githubUrl: "https://github.com/manu-com/business-template",
    imageAlt: "Business website template interface screenshot",
    image: "/projects/business-template.png",
    overview:
      "A reusable single-page business template for B2B companies, agencies, and service-based businesses. Built as a fast, accessible starting point that can be customized for a real client site.",
    problem:
      "Service businesses often need a polished online presence quickly, and starting from a blank canvas wastes time that should go into content and conversion.",
    solution:
      "A component-based template with UI primitives that compose into page sections, so a custom site can be assembled instead of rebuilt each time.",
    features: [
      "Reusable component architecture with Button, Card, and Section primitives",
      "Mobile-first responsive design tested across viewports",
      "Dark mode support",
      "Accessibility: skip-to-content link, ARIA attributes, keyboard navigation",
      "SEO-friendly structure and metadata",
    ],
    results:
      "Published as a working live demo on Vercel, ready to be tailored for real business clients.",
  },
  {
    number: "02",
    slug: "inventory-system",
    name: "Inventory System",
    category: "Web Application",
    description:
      "A web-based inventory management application built with React and Vite — dashboard, product and category management, filtering, and a component-driven architecture.",
    technologies: ["React", "React Router", "Vite", "Tailwind CSS"],
    liveUrl: "",
    githubUrl: "https://github.com/manu-com/inventory-system",
    imageAlt: "Inventory management system interface screenshot",
    overview:
      "A web application for managing inventory — tracking products, organizing them into categories, and monitoring stock through a dashboard.",
    problem:
      "Keeping track of products, categories, and stock levels in spreadsheets gets unwieldy as inventory grows. A dedicated interface makes the data manageable and easier to act on.",
    solution:
      "A React application with distinct pages for the dashboard, products, and categories, backed by API calls and client-side filtering so the data stays responsive and easy to navigate.",
    features: [
      "Dashboard with an overview of key information",
      "Product pages and category management",
      "Filtering and search across the catalogue",
      "Modal-based interactions with animated transitions",
      "Path aliases and a component-driven layout for maintainability",
    ],
    results:
      "Actively under development. A live deployment and public demo are planned for a later stage.",
  },
];

export const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Marketing sites, portfolios, and editorial experiences — built to be fast, accessible, and conversion-focused.",
    included: [
      "Responsive, hand-coded front-ends",
      "Performance and accessibility baseline",
      "SEO structure and metadata",
      "Content management where needed",
    ],
    useCases: [
      "Company and marketing websites",
      "Portfolios and personal brands",
      "Landing pages for launches and campaigns",
    ],
  },
  {
    number: "02",
    title: "Web Applications",
    description:
      "Full-stack applications with auth, real-time features, and data handling. From product concept to production.",
    included: [
      "Front-end architecture",
      "Backend, APIs, and database design",
      "Authentication and authorization",
      "Deployment and maintenance handover",
    ],
    useCases: [
      "Dashboards and admin tools",
      "Customer portals",
      "Internal business tooling",
    ],
  },
  {
    number: "03",
    title: "Software Development",
    description:
      "Desktop and mobile software, automation scripts, and tooling that removes friction from real workflows.",
    included: [
      "Application logic and systems programming",
      "Integration with existing tools",
      "Scripts and automation",
      "Testing and reliability",
    ],
    useCases: [
      "Process automation",
      "Data processing and tooling",
      "Desktop and system software",
    ],
  },
  {
    number: "04",
    title: "UI Implementation",
    description:
      "Pixel-accurate implementation of designs into clean, maintainable interfaces with attention to every state.",
    included: [
      "Design-to-code conversion",
      "Design systems and component libraries",
      "Motion and interaction polish",
      "Cross-browser and cross-device fidelity",
    ],
    useCases: [
      "Taking Figma or Sketch designs live",
      "Building reusable component libraries",
      "Refining an existing interface",
    ],
  },
];

export const technologies = [
  { name: "HTML", note: "Structure" },
  { name: "CSS", note: "Design" },
  { name: "JavaScript", note: "Interactivity" },
  { name: "React", note: "Web applications" },
  { name: "Python", note: "Software & tooling" },
  { name: "Git", note: "Version control" },
  { name: "Linux", note: "Deployment & workflows" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/manu-com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/manu" },
  { label: "WhatsApp", href: "https://wa.me/254712345678" },
  { label: "Email", href: "mailto:hello@manu.dev" },
];