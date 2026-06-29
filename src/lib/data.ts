/**
 * Structured portfolio content, derived from Mohsen's resume.
 *
 * This is the single source of truth for the site. Everything here is rendered
 * server-side so search engines and AI crawlers (which usually don't run JS)
 * see the full text in the initial HTML.
 *
 * NOTE: `period` values are ordering placeholders — confirm/replace with your
 * real dates.
 */

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  metrics?: { value: string; label: string }[];
  stack: string[];
  link?: string;
};

export type Project = {
  title: string;
  category: string;
  year: string;
  description: string;
  bullets: string[];
  stack: string[];
  link?: string;
  repo?: string;
  featured?: boolean;
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export const experiences: Experience[] = [
  {
    company: "RcoinX",
    role: "Frontend Engineer",
    period: "2024 — Present",
    summary:
      "Built a cryptocurrency exchange from the ground up — monorepo architecture, a real-time trading UI, and a full design system.",
    highlights: [
      "Architected a pnpm + Turborepo monorepo with shared packages (ui, providers, http, i18n, types) enabling scalable cross-team development.",
      "Enforced Feature-Sliced Design with ESLint import boundaries, cutting circular dependencies and preventing cross-layer coupling.",
      "Delivered the full Spot Trading module end-to-end: market list, order book, kline charts, trade streams, order form and order management.",
      "Engineered a resilient real-time pipeline with WebSocket lifecycle management (reconnect, heartbeat, subscription routing) synced to TanStack Query caches.",
      "Shipped a pixel-perfect Figma design system with Radix UI + Tailwind CSS 4, documented in Storybook, with full RTL/LTR support.",
    ],
    metrics: [
      { value: "40%", label: "fewer circular deps" },
      { value: "<100ms", label: "market data updates" },
      { value: "60%", label: "fewer network requests" },
    ],
    stack: [
      "React 19",
      "TypeScript",
      "TanStack Router",
      "TanStack Query",
      "Zustand",
      "WebSocket",
      "Feature-Sliced Design",
      "Turborepo",
      "Tailwind CSS",
      "Radix UI",
      "Zod",
      "WebAuthn",
    ],
  },
  {
    company: "Chatomatic",
    role: "Full-Stack Engineer · Solo",
    period: "2024",
    summary:
      "Designed and shipped a full AI SaaS platform single-handedly — AI assistants, knowledge training, Instagram automation, and an embeddable chat widget.",
    highlights: [
      "Engineered the AI assistant lifecycle: creation, chat playground, thread management and streamed responses via the Vercel AI SDK.",
      "Built knowledge-training pipelines (document upload, free text, Q&A) with progress tracking, validation and retraining control.",
      "Architected a fully embeddable chat widget with Shadow DOM isolation and a custom Rollup IIFE pipeline for CDN delivery.",
      "Built a visual automation builder for Instagram DM/comment workflows using a trigger/action architecture.",
      "Delivered a 150+ component UI system, multilingual (FA/EN) with locale-aware routing and SEO metadata.",
    ],
    metrics: [
      { value: "150+", label: "UI components" },
      { value: "1", label: "engineer, end-to-end" },
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Vercel AI SDK",
      "OpenAI SDK",
      "iron-session",
      "Instagram Graph API",
      "Shadow DOM",
      "Vite",
      "Rollup",
      "next-intl",
    ],
  },
  {
    company: "Isopoll · Ideaween",
    role: "Frontend Engineer",
    period: "2023 — 2024",
    summary:
      "Sole frontend engineer on a multi-domain B2B platform combining surveys, recruitment, consultation booking and digital commerce.",
    highlights: [
      "Unified four business domains in a single Next.js App Router codebase.",
      "Built a typed data layer across 80+ service modules with TanStack Query + Axios.",
      "Engineered complex multi-step flows: CV builder lifecycle, recruitment paths and conditional consultation workflows.",
      "Built a checkout with basket persistence and payment-portal branching.",
      "Shipped geolocation features (search, reverse geocoding, map-driven address capture) via typed API routes.",
    ],
    metrics: [
      { value: "50%", label: "fewer payment errors" },
      { value: "42%", label: "more completed transactions" },
      { value: "80+", label: "service modules" },
    ],
    stack: [
      "Next.js 15",
      "TypeScript",
      "App Router",
      "TanStack Query",
      "Zustand",
      "Zod",
      "Tailwind CSS",
      "Radix UI",
      "SSR",
      "RTL",
    ],
  },
  {
    company: "Propx · Hege Found",
    role: "Frontend Engineer",
    period: "2023",
    summary:
      "Customer + admin platform for a hedge fund — KYC, role-based access control, ticketing and a clean-architecture backend blueprint.",
    highlights: [
      "Architected a role-aware platform with middleware-enforced access control and dashboard segregation (customer / admin / super-admin).",
      "Built a full KYC lifecycle: phone → ID/video → review → resubmission → admin approval.",
      "Developed a production-grade support/ticketing system with threads, status transitions and file attachments.",
      "Defined a DDD / Clean Architecture backend blueprint for future service extraction with minimal refactor risk.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "TanStack Query",
      "Zustand",
      "RBAC",
      "KYC",
      "Clean Architecture",
      "Middleware",
    ],
  },
  {
    company: "Kasra Restaurant",
    role: "Full-Stack Engineer",
    period: "2023",
    summary:
      "Full-stack reservation platform (Event Hall, Table, Catering) built solo, end-to-end, from system design to production.",
    highlights: [
      "Engineered concurrency-safe slot booking with Redis distributed locks and serializable DB transactions — zero double-bookings under load.",
      "Built an 8-step booking funnel with snapshot-based pricing and stateful progression.",
      "Automated background jobs with BullMQ + Redis for expired-reservation release and recurring slot generation.",
      "Designed a 20+ entity data model and a full admin console for reservation, slot and menu operations.",
    ],
    metrics: [
      { value: "0", label: "double-bookings under load" },
      { value: "20+", label: "domain entities" },
    ],
    stack: [
      "Next.js 15",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "TypeScript",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    company: "HeidaryHa · Loen Found",
    role: "Frontend Engineer",
    period: "2022 — 2023",
    summary:
      "Fintech PWA for a loan fund serving 12,000+ customers, with multi-factor auth and high-reliability financial workflows.",
    highlights: [
      "Implemented a multi-factor auth pipeline: Captcha → SMS OTP → master password → biometric login.",
      "Built financial workflows: IBAN validation, beneficiary lookup, OTP-confirmed transfers and receipt generation.",
      "Shipped cross-platform from a single codebase via PWA + Capacitor (Android), with 25+ custom hooks across ~21 screens.",
    ],
    metrics: [
      { value: "12k+", label: "customers served" },
      { value: "97%", label: "satisfaction score" },
      { value: "25%", label: "more monthly applications" },
    ],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "TanStack Query",
      "PWA",
      "Capacitor",
      "Zod",
      "Tailwind CSS",
    ],
  },
  {
    company: "IT Barbod",
    role: "Frontend Engineer",
    period: "2021 — 2022",
    summary:
      "Delivered three independent frontend products — a no-code app builder, a full-stack form builder, and an RTL markdown editor.",
    highlights: [
      "Architected a visual drag-and-drop app builder letting business teams configure mobile screens, replacing engineering-led releases (sole contributor, ~217 commits).",
      "Built a full-stack Form Builder (Next.js, Prisma, PostgreSQL) with a WYSIWYG designer, schema-driven runtime rendering and analytics.",
      "Engineered a Quran-aware RTL markdown editor on Monaco with 24+ authoring commands and split-pane live preview.",
    ],
    metrics: [
      { value: "80%", label: "higher satisfaction" },
      { value: "300%", label: "user acquisition growth" },
    ],
    stack: [
      "React",
      "TypeScript",
      "Next.js",
      "Vite",
      "dnd-kit",
      "Prisma",
      "PostgreSQL",
      "Monaco Editor",
    ],
  },
  {
    company: "Motion Desk",
    role: "Frontend Developer",
    period: "2020 — 2021",
    summary:
      "Built and published two commercial Adobe After Effects extensions on aescripts.com.",
    highlights: [
      "Developed 'Flower Bloom' and 'Flip Animation' extensions with HTML/CSS/JS, integrated into the After Effects environment.",
      "Optimized extension UIs and workflows, enabling motion designers to produce advanced animations more efficiently.",
    ],
    stack: ["JavaScript", "HTML", "CSS", "Adobe CEP", "After Effects"],
  },
];

export const projects: Project[] = [
  {
    title: "RcoinX Trading Platform",
    category: "Crypto · Real-time",
    year: "2024",
    description:
      "A spot & futures cryptocurrency exchange with a real-time trading interface built on a monorepo design system.",
    bullets: [
      "Live order book, kline charts and trade streams driven by a resilient WebSocket pipeline.",
      "Virtualized rendering of thousands of real-time price updates with sub-100ms latency.",
      "WebAuthn passkeys, TOTP 2FA and OAuth in an enterprise-grade auth system.",
    ],
    stack: ["React 19", "TypeScript", "WebSocket", "TanStack", "Turborepo", "Tailwind"],
    featured: true,
  },
  {
    title: "Chatomatic — AI SaaS",
    category: "AI · Full-Stack · Solo",
    year: "2024",
    description:
      "A complete AI SaaS for building, training and deploying custom chatbots, plus Instagram automation and an embeddable widget.",
    bullets: [
      "Streaming AI assistant playground built on the Vercel AI SDK.",
      "Embeddable chat widget with Shadow DOM isolation and a custom Rollup CDN pipeline.",
      "Visual trigger/action automation builder for Instagram DMs & comments.",
    ],
    stack: ["Next.js 15", "Vercel AI SDK", "OpenAI", "Shadow DOM", "Rollup", "next-intl"],
    featured: true,
  },
  {
    title: "Kasra Reservation Platform",
    category: "Full-Stack · System Design",
    year: "2023",
    description:
      "An end-to-end reservation platform for event halls, tables and catering with concurrency-safe booking.",
    bullets: [
      "Redis distributed locks + serializable transactions to eliminate double-booking.",
      "8-step booking funnel with snapshot-based pricing.",
      "BullMQ background jobs for slot generation and reservation expiry.",
    ],
    stack: ["Next.js 15", "Prisma", "PostgreSQL", "Redis", "BullMQ", "Docker"],
    featured: true,
  },
  {
    title: "Production-Ready Backend Platform",
    category: "Open Source · Backend",
    year: "2024",
    description:
      "A Fastify + TypeScript backend showcasing clean architecture, observability and reliability engineering.",
    bullets: [
      "Multi-tenant OTP system with idempotency keys and circuit-breaker-protected SMS delivery.",
      "Cart lifecycle modeled as an explicit finite-state machine with transactional integrity.",
      "Full observability: Prometheus metrics, OpenTelemetry tracing to Tempo, k6 load gates.",
    ],
    stack: ["Fastify", "TypeScript", "PostgreSQL", "Redis", "OpenTelemetry", "k6"],
    repo: "https://github.com/mohsenmirzaei",
    featured: true,
  },
  {
    title: "RTL Markdown Book Editor",
    category: "Product · Editor",
    year: "2022",
    description:
      "A Monaco-based, RTL-first markdown authoring studio with a Quran-aware insertion workflow.",
    bullets: [
      "24+ authoring commands with split-pane live preview and TOC navigation.",
      "markdown-it rendering pipeline with anchor, footnote and media plugins.",
      "Surah discovery and multi-select ayah insertion with multilingual translations.",
    ],
    stack: ["React", "TypeScript", "Monaco", "markdown-it", "TanStack Query"],
  },
  {
    title: "No-Code App & Form Builders",
    category: "Product · Schema-driven",
    year: "2021",
    description:
      "Drag-and-drop builders that let non-technical teams ship mobile screens and forms without engineering.",
    bullets: [
      "Schema-driven component system with Draft → Merge → Publish → Rollback lifecycle.",
      "WYSIWYG form designer with 11 configurable field types and runtime rendering.",
      "Typed analytics with submission reporting and conversion KPIs.",
    ],
    stack: ["React", "Next.js", "TypeScript", "dnd-kit", "Prisma", "PostgreSQL"],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript (ES2022+)", "HTML5", "CSS3", "SQL"],
  },
  {
    title: "Frameworks",
    skills: ["React 19", "Next.js 15", "Fastify", "Vite", "TanStack Router", "TanStack Query"],
  },
  {
    title: "Architecture",
    skills: [
      "Feature-Sliced Design",
      "Monorepo · Turborepo",
      "Domain-Driven Design",
      "Clean Architecture",
      "Schema-Driven UI",
      "SSR / CSR / Hybrid",
    ],
  },
  {
    title: "Real-time & Data",
    skills: ["WebSocket", "REST APIs", "Zod", "DTO-to-domain modeling", "Zustand", "Cache strategy"],
  },
  {
    title: "UI & Motion",
    skills: ["Tailwind CSS", "Radix UI", "shadcn/ui", "Storybook", "GSAP", "Three.js", "Framer Motion", "RTL / i18n"],
  },
  {
    title: "Backend & Data",
    skills: ["Node.js", "Prisma", "PostgreSQL", "Redis", "BullMQ", "RBAC", "WebAuthn", "OAuth / OTP"],
  },
  {
    title: "Observability & DevOps",
    skills: ["Docker", "GitHub Actions", "OpenTelemetry", "Prometheus", "Grafana Tempo", "k6", "CI/CD"],
  },
  {
    title: "AI & Integrations",
    skills: ["Vercel AI SDK", "OpenAI SDK", "Streaming Chat UI", "Instagram Graph API", "Analytics"],
  },
];

/** Headline numbers used in the about / stats strip. */
export const stats: { value: string; label: string }[] = [
  { value: "4+", label: "Years building for production" },
  { value: "8", label: "Products shipped" },
  { value: "12k+", label: "Users served" },
  { value: "100%", label: "Ownership, idea to deploy" },
];

/** Short "what makes me different" pillars for the About section. */
export const pillars: { title: string; body: string }[] = [
  {
    title: "Architecture-first",
    body: "Monorepos, Feature-Sliced Design, domain modeling and clean boundaries — I build frontends that scale with the team, not against it.",
  },
  {
    title: "Real-time obsessed",
    body: "WebSocket pipelines with reconnect, heartbeat and subscription routing powering sub-100ms trading UIs and live dashboards.",
  },
  {
    title: "End-to-end ownership",
    body: "From system design and backend to pixel-perfect UI — I've shipped multiple products solo, so I think product, performance and DX at once.",
  },
];
