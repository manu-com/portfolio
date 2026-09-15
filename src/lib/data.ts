export type Project = {
  number: string;
  name: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  imageAlt: string;
};

export const profile = {
  name: "MANU",
  tagline: "DIGITAL EXPERIENCES & SOFTWARE.",
  intro:
    "I build websites, web applications, and software that are fast, functional, and thoughtfully crafted.",
  email: "hello@manu.dev",
  github: "https://github.com/manu",
  linkedin: "https://linkedin.com/in/manu",
  location: "Available worldwide",
};

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const projects: Project[] = [
  {
    number: "01",
    name: "E-Commerce Platform",
    description:
      "A modern storefront with a complete checkout flow, product catalog, and real-time inventory. Built for speed and conversion.",
    technologies: ["React", "Node.js", "Stripe", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "https://github.com/manu",
    imageAlt: "E-commerce platform interface screenshot",
  },
  {
    number: "02",
    name: "Task Management App",
    description:
      "A real-time collaborative workspace with boards, assignments, and live updates across devices. Designed for teams that move fast.",
    technologies: ["TypeScript", "WebSocket", "React", "Prisma"],
    liveUrl: "#",
    githubUrl: "https://github.com/manu",
    imageAlt: "Task management application interface screenshot",
  },
  {
    number: "03",
    name: "Weather Intelligence Dashboard",
    description:
      "A data visualization tool that pulls live weather feeds into clean, interpretable views. Emphasis on clarity over clutter.",
    technologies: ["Python", "D3.js", "OpenWeather API", "React"],
    liveUrl: "#",
    githubUrl: "https://github.com/manu",
    imageAlt: "Weather data dashboard visualization screenshot",
  },
  {
    number: "04",
    name: "Static Site Framework",
    description:
      "A lightweight static site generator with markdown support, fast incremental builds, and a zero-config deployment path.",
    technologies: ["Python", "Markdown", "Jinja2", "GitHub Actions"],
    liveUrl: "#",
    githubUrl: "https://github.com/manu",
    imageAlt: "Static site framework code screenshot",
  },
];

export const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Marketing sites, portfolios, and editorial experiences — built to be fast, accessible, and conversion-focused.",
  },
  {
    number: "02",
    title: "Web Applications",
    description:
      "Full-stack applications with auth, real-time features, and data handling. From product concept to production.",
  },
  {
    number: "03",
    title: "Software Development",
    description:
      "Desktop and mobile software, automation scripts, and tooling that removes friction from real workflows.",
  },
  {
    number: "04",
    title: "UI Implementation",
    description:
      "Pixel-accurate implementation of designs into clean, maintainable interfaces with attention to every state.",
  },
];

export const technologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Kotlin",
  "Android",
  "Python",
  "Git",
  "Linux",
];

export const socials = [
  { label: "GitHub", href: "https://github.com/manu" },
  { label: "LinkedIn", href: "https://linkedin.com/in/manu" },
  { label: "Email", href: "mailto:hello@manu.dev" },
];