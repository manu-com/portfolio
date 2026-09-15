# Portfolio Project — Implementation Plan

> **STATUS (Sep 2026):** app is a **multi-page website**. Home is a concise
> intro; Work/About/Services/Quote/Contact are dedicated routes. The old
> single-page section plan below is kept for reference; see the
> "Multi-Page Architecture" section at the bottom for the current structure.

## Overview
Premium personal developer portfolio for "MANU".  
Design direction: **Minimal + Luxury + Modern Developer**  
Feels like a high-end creative technology studio run by one developer.

---

## Reference Analysis

### What to take from each reference:

| Reference | Take | Avoid |
|-----------|------|-------|
| **Brittany Chiang** | Developer portfolio structure, nav pattern, project layout, clean hierarchy | Generic card layouts |
| **Bruno Simon** | Small interactive touches, memorable micro-interactions | Full 3D/game experience, WebGL |
| **Awwwards** | Premium polish level, motion quality, typography scale | Over-the-top animations |
| **A1 Gallery** | Editorial typography, grid systems, whitespace, large type | Copying their specific layouts |
| **Bareblink** | Black/white/gold palette, luxury restraint, premium type treatment | Overusing gold |

---

## Design System

### Color Palette
```
Background:     #0A0A0A   (deep near-black)
Surface:        #111111   (slightly lighter, for subtle elevation)
Text Primary:   #F5F5F0   (warm off-white)
Text Secondary: #8A8A8A   (muted grey for labels/body)
Accent Gold:    #C9A84C   (warm amber/gold — used SPARINGLY)
Border:         rgba(255, 255, 255, 0.06)  (thin dividers)
Border Hover:   rgba(255, 255, 255, 0.12)
```

### Typography
- **Primary (Headlines):** Inter — clean, modern, highly legible
- **Accent (Optional serif):** Playfair Display — for select editorial headings
- **Mono:** JetBrains Mono — for labels, numbering, tech tags

### Type Scale
```
Hero Name:          clamp(3.5rem, 8vw, 8rem)    — Extra bold
Hero Subtitle:      clamp(1rem, 2vw, 1.5rem)    — Regular
Section Label:      0.75rem uppercase, letter-spacing: 0.2em
Section Heading:    clamp(2rem, 5vw, 4.5rem)    — Bold
Project Title:      clamp(1.75rem, 3.5vw, 3rem) — Bold
Body Text:          1.125rem, line-height: 1.75
Small/Caption:      0.875rem
```

### Spacing
```
Section Padding:    8rem (desktop) / 5rem (tablet) / 3rem (mobile)
Container Max:      1200px
Content Max:        900px
Grid Gap:           2rem
```

### Borders & Dividers
- 1px solid rgba(255,255,255,0.06) for section dividers
- 1px solid rgba(255,255,255,0.08) for card borders on hover
- Gold accent line: 40px wide, 2px tall, #C9A84C

---

## Architecture

### Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, body
│   ├── page.tsx                # Main page assembling all sections
│   ├── globals.css             # Design tokens, animations, base styles
│   └── not-found.tsx           # Custom 404
├── components/
│   ├── navigation.tsx          # Sticky top nav, minimal
│   ├── hero.tsx                # Hero section
│   ├── selected-work.tsx       # Project showcase container
│   ├── project-entry.tsx       # Individual project with alternating layout
│   ├── services.tsx            # Services grid
│   ├── about.tsx               # About section
│   ├── technologies.tsx        # Tech stack display
│   ├── contact.tsx             # Contact CTA
│   └── footer.tsx              # Minimal footer
├── hooks/
│   └── use-in-view.ts          # Intersection Observer hook for animations
└── lib/
    └── data.ts                 # Project data, links, content (all placeholder)
```

### No new dependencies required
Using only: next, react, react-dom, tailwindcss (all already installed).
All animations done with CSS + Intersection Observer. No framer-motion needed.

---

## Section Breakdown

### 1. Navigation
- Fixed/sticky top, transparent → solid on scroll
- Left: "MANU" logo text
- Right: Work, About, Contact (anchor links)
- Hamburger menu on mobile with slide-in overlay
- Gold underline on active section

### 2. Hero
```
MANU

DIGITAL EXPERIENCES
& SOFTWARE.

I build websites, web applications, and software
that are fast, functional, and thoughtfully crafted.

[VIEW WORK]  [CONTACT]
```
- Massive typography, generous whitespace
- Subtle text reveal animation on load
- Gold accent line or dot as decorative element
- Full viewport height

### 3. Selected Work
- Section label: "SELECTED WORK"
- Each project displayed as a large entry (not a card)
- Alternating layouts: image left/right
- Each entry contains:
  - Project number (01, 02, 03...)
  - Project name (large, bold)
  - Description (1-2 sentences)
  - Tech tags (mono font, small)
  - Large screenshot placeholder (aspect-ratio 16/10)
  - Live link + GitHub link
- Hover: subtle image scale, border glow
- Staggered reveal animation on scroll

### 4. Services
- Section label: "SERVICES"
- Four items in a clean grid:
  - WEB DEVELOPMENT
  - WEB APPLICATIONS
  - SOFTWARE DEVELOPMENT
  - UI IMPLEMENTATION
- Each with a thin border, uppercase heading, short description
- Minimal editorial treatment — no colorful cards

### 5. About
- Section label: "ABOUT"
- Two-column on desktop: text left, decorative element right
- Natural, confident tone
- Placeholder text focusing on web/software development

### 6. Technologies
- Section label: "TECHNOLOGIES"
- Technologies displayed in a clean text grid:
  HTML · CSS · JavaScript · React · Kotlin · Android · Python · Git · Linux
- Uppercase, generous letter spacing, thin borders
- No colored icons or cards

### 7. Contact
- Full-width CTA section
```
HAVE A PROJECT
IN MIND?

LET'S BUILD
SOMETHING USEFUL.
```
- Email link
- GitHub link
- LinkedIn link
- All links with hover animation (underline slide)

### 8. Footer
- Thin top border
- Left: "MANU"
- Center: "© 2026 Manu. All rights reserved."
- Right: Social links (GitHub, LinkedIn, Email)
- Minimal, clean

---

## Animations

### Implementation
- Custom `useInView` hook using IntersectionObserver
- CSS classes toggled on visibility:
  - `.reveal` — base hidden state (opacity: 0, translateY: 20px)
  - `.revealed` — visible state (opacity: 1, translateY: 0)
  - `.reveal-delay-1` through `.reveal-delay-4` — staggered delays

### Animation Types
1. **Text reveal** — clip-path or translateY on section headings
2. **Image reveal** — scale from 1.05 to 1, opacity fade
3. **Hover states** — gold underline slide, border color transition, subtle image zoom
4. **Nav** — background opacity transition on scroll
5. **Smooth scroll** — CSS `scroll-behavior: smooth`

### Motion Rules
- Duration: 600-800ms for reveals, 300ms for hovers
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for reveals
- Respect `prefers-reduced-motion: reduce` — disable all animations
- No animation on page load for hero text — use CSS animation instead

---

## Responsive Design

### Desktop (>1024px)
- Full typography scale
- Spacious layouts, 8rem section padding
- Large project images
- Asymmetric compositions in about section

### Tablet (768px - 1024px)
- Reduce heading sizes by ~20%
- Section padding: 5rem
- 2-column grids become single column where needed
- Project images remain large

### Mobile (<768px)
- Hamburger navigation with overlay
- Section padding: 3rem
- Hero name: ~3.5rem
- Project entries stack vertically
- Touch-friendly tap targets (min 44px)
- Services grid: single column

---

## Content (Placeholder)

### Projects (4 placeholders)
1. **E-Commerce Platform** — Modern online store with React, Node.js, Stripe
2. **Task Management App** — Real-time collaborative tool, WebSocket, TypeScript
3. **Weather Dashboard** — Data visualization, API integration, responsive design
4. **Portfolio Framework** — Static site generator, markdown support, fast builds

### About Text
"I'm Manu — a developer focused on building web applications and software that work well and look good doing it. I care about clean code, thoughtful interfaces, and technology that actually serves a purpose."

### Contact Links (placeholders)
- Email: hello@manu.dev
- GitHub: github.com/manu
- LinkedIn: linkedin.com/in/manu

---

## Implementation Order

1. Set up design system (globals.css, fonts, colors)
2. Create data.ts with all content
3. Build useInView hook
4. Build Navigation
5. Build Hero
6. Build Selected Work + Project Entry
7. Build Services
8. Build About
9. Build Technologies
10. Build Contact
11. Build Footer
12. Assemble in layout.tsx and page.tsx
13. Add animations
14. Responsive pass
15. Build, lint, verify

---

## Files to Create/Modify

### Modify
- `src/app/globals.css` — Complete rewrite with design tokens
- `src/app/layout.tsx` — Fonts, metadata, structure
- `src/app/page.tsx` — Assemble all sections

### Create
- `src/lib/data.ts`
- `src/hooks/use-in-view.ts`
- `src/components/navigation.tsx`
- `src/components/hero.tsx`
- `src/components/selected-work.tsx`
- `src/components/project-entry.tsx`
- `src/components/services.tsx`
- `src/components/about.tsx`
- `src/components/technologies.tsx`
- `src/components/contact.tsx`
- `src/components/footer.tsx`
- `src/app/not-found.tsx`

### Delete (unused default assets)
- `public/file.svg`
- `public/globe.svg`
- `public/next.svg`
- `public/vercel.svg`
- `public/window.svg`

---

## Multi-Page Architecture (current)

Refactored from one long page into a cohesive premium multi-page website.
Design system (tokens, typography, borders, animations, buttons) unchanged.

### Routes
```
/                      Home — Hero → Featured Work → What I Do (services) → Short About → CTA
/work                  All projects with category filter
/work/[slug]           Per-project case study (business-template, inventory-system)
/services              Services with "what's included" + "typical use cases" + CTA
/about                 Intro, background, skills, philosophy, technologies
/quote                 Website cost calculator (the interactive quote builder)
/contact               Contact channels (email/WhatsApp/GitHub/LinkedIn) + contact form
```

### Architecture changes
- **`layout.tsx`** now owns `Navigation` + `Footer` (global, every page).
- **`template.tsx`** provides the page transition: fast subtle
  `page-in` fade/slide (0.45s, luxury easing) + scroll-to-top on navigation.
  Respects `prefers-reduced-motion`.
- **Pages** set their own metadata via `export const metadata`
  (`template: "%s — MANU"` in root layout). Home title:
  "Manu — Web Developer & Software Developer".
- `work/[slug]/page.tsx` uses `generateStaticParams` → SSG for both projects.

### Component reuse (no duplication)
| Component | Used on |
|-----------|---------|
| `Hero` | `/` |
| `SelectedWork` (props: `list`, `showCta`) | `/` (featured 2 + "View all work") |
| `WorkGallery` (category filter, client) | `/work` |
| `ProjectEntry` (links name → case study) | `/`, `/work` |
| `Services` (`compact` prop; full = included + use cases) | `/` (compact), `/services` |
| `AboutShort` | `/` |
| `Technologies` | `/about` |
| `Calculator` (standalone, heading lives on the page) | `/quote` |
| `CtaSection` | `/`, `/services`, `/work/*` |
| `PageHeader` (label + title + intro) | `/work`, `/services`, `/about`, `/quote` |
| `ContactForm` (client) | `/contact` |

### Validation
- Build fully static, all routes render, type-check + lint clean.
- `data.ts` extended: `Project` gets `slug`/`category` + case-study fields;
  `technologies` becomes `{name, note}[]`; `services` get `included`/`useCases`;
  `profile.whatsapp` and WhatsApp social added (placeholder number — replace it).

### Pending / placeholders
- `profile.whatsapp = https://wa.me/254712345678` — replace with real number.
- Quote + contact forms log payloads to console; backend integration pending.

### Operational warnings (READ before touching this project)
- **Never run `next build` while the dev server is live.** Both write to the same
  `.next/` directory; the build corrupts the running dev server (500s,
  `Cannot find module './331.js'`). Validate with `next build` only when the
  dev server is stopped (check `curl -s localhost:3000` returns 000 first).
- The running dev server (nohup, port 3000) must not be killed without asking
  the user. Restart if needed: `pkill -f "npm run dev"`, `rm -rf .next`,
  then relaunch detached with `setsid bash -c 'npm run dev > /tmp/next-dev.log 2>&1 &'`.
  Use `setsid` so it survives the tool shell session.
- Dev server used to be the user's terminal process (pid 44842); it was broken
  in-session by a `next build` and re-launched detached by this session.

### Commit log (multi-page refactor)
- `bd142e9` — deduplicate services (extract `ServicesGrid`), /services heading once
- `04e6dff` — multi-page refactor (routes, global nav/footer, template transitions)
