/**
 * Structured portfolio content, derived from Mohsen's resume.
 *
 * This is the single source of truth for the site. Everything here is rendered
 * server-side so search engines and AI crawlers (which usually don't run JS)
 * see the full text in the initial HTML.
 *
 * NOTE: `period` values reflect resume dates (last updated Jun 2026).
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
    company: "Restaurant Reservation",
    role: "Full-Stack Software Engineer · Client",
    period: "Sep 2025 – Dec 2025 · May 2026 – Present",
    summary:
      "Full application stack for a US-market reservation platform — marketing site, customer/admin apps, and REST API — covering event hall, catering, and table bookings.",
    highlights: [
      "Built the complete stack — Next.js marketing site, React customer/admin apps, and a Fastify REST API — translating Figma designs into production booking flows.",
      "Engineered concurrency-safe reservation logic with OTP phone authentication, admin approval workflows, menu/catalog management, and async SMS/email notifications via BullMQ.",
      "Configured observability (OpenTelemetry, Prometheus) and Docker deployment; delivered a production-ready codebase for client handoff.",
    ],
    metrics: [
      { value: "0", label: "double-bookings under load" },
      { value: "3", label: "booking product lines" },
    ],
    stack: [
      "TypeScript",
      "React",
      "Next.js",
      "Fastify",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Docker",
      "Twilio",
    ],
  },
  {
    company: "RcoinX",
    role: "Senior Frontend Software Engineer",
    period: "Aug 2025 – Apr 2026",
    summary:
      "Led frontend architecture for a pre-launch crypto exchange — monorepo platform, real-time Spot Trading UI, and a Figma-derived design system within a 3-engineer frontend team.",
    highlights: [
      "Designed a Turborepo + pnpm monorepo with shared packages (ui, providers, http, i18n, types) and enforced Feature-Sliced Design with ESLint import boundaries.",
      "Delivered core Spot Trading features — real-time order books, candlestick charts, order execution, and position management — on a resilient WebSocket pipeline synced to TanStack Query caches.",
      "Built a pixel-perfect component library in Storybook with RTL/LTR support, introduced Vitest + MSW for testing, and maintained a multi-stage Docker CI pipeline.",
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
      "Turborepo",
      "Tailwind CSS",
      "Radix UI",
      "Storybook",
      "Vitest",
      "MSW",
      "WebAuthn",
    ],
  },
  {
    company: "Isopoll",
    role: "Frontend Software Engineer",
    period: "Apr 2025 – Jul 2025",
    summary:
      "Frontend engineer on a 7-person B2B SaaS team building a platform spanning surveys, recruitment, consultation booking, and digital commerce.",
    highlights: [
      "Built a typed data layer across 80+ service modules with TanStack Query and Axios, introducing reusable query hooks and shared API patterns.",
      "Engineered an end-to-end checkout flow with basket persistence, payment gateway integration, and support for multiple payment paths.",
      "Delivered geolocation capabilities (reverse geocoding, map-based address selection) and a production-ready RTL/Persian interface with accessibility considerations.",
    ],
    metrics: [{ value: "80+", label: "service modules" }],
    stack: [
      "Next.js 15",
      "TypeScript",
      "App Router",
      "TanStack Query",
      "Zustand",
      "Zod",
      "React Hook Form",
      "Tailwind CSS",
      "Radix UI",
      "SSR",
      "Docker",
    ],
  },
  {
    company: "Propx",
    role: "Frontend Software Engineer · Client",
    period: "May 2025 – Jul 2025",
    summary:
      "Bilingual hedge fund platform — multi-step KYC onboarding, role-based dashboards, and a support ticketing system for customer verification workflows.",
    highlights: [
      "Built a multi-step KYC flow with in-browser ID capture, identity video recording, file uploads, and status-driven resubmission paths.",
      "Delivered a bilingual (EN/FA) Next.js 15 app with email OTP auth, role-based middleware, and separate user and super-admin dashboards.",
      "Implemented support tickets with image attachments and admin review tools using TanStack Query, server-side API calls, and Zod-validated forms.",
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "next-intl",
      "TanStack Query",
      "Zustand",
      "React Hook Form",
      "Zod",
      "Docker",
    ],
  },
  {
    company: "Chatomatic",
    role: "Founder & Full-Stack Engineer · Solo",
    period: "Oct 2024 – Mar 2025",
    summary:
      "Designed and shipped a bilingual AI SaaS platform solo — assistant lifecycle, knowledge training, RAG retrieval, and an embeddable chat widget.",
    highlights: [
      "Shipped a Next.js 15 dashboard using Feature-Sliced Design with a typed API client and shared UI packages covering assistants, knowledge management, and a streaming playground.",
      "Engineered a modular Fastify backend with JWT auth, multi-format document ingestion (PDF/DOCX/XLSX), and a pgvector-backed RAG pipeline injecting cited context into streamed LLM responses.",
      "Built a reusable streaming chat layer consumed by both the dashboard and a Shadow DOM embed widget, with dual LLM/embedding providers (OpenAI + Ollama) behind resolver ports.",
    ],
    metrics: [
      { value: "150+", label: "UI components" },
      { value: "1", label: "engineer, end-to-end" },
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Fastify",
      "Vercel AI SDK",
      "OpenAI SDK",
      "pgvector",
      "Shadow DOM",
      "Vite",
      "Rollup",
      "next-intl",
    ],
  },
  {
    company: "IT Barbod",
    role: "Frontend-Focused Full Stack Software Engineer",
    period: "Feb 2024 – Sep 2024",
    summary:
      "Led frontend delivery across three independent products in a small product team — a no-code app builder, a full-stack form builder, and an RTL markdown editor.",
    highlights: [
      "Architected a visual drag-and-drop app builder enabling non-technical teams to configure React Native screens and generate production builds (~217 commits as primary contributor).",
      "Designed a schema-driven UI system with a Draft → Merge → Publish → Rollback lifecycle for safe iteration and version control.",
      "Built a full-stack form builder (Next.js, Prisma, PostgreSQL) with a WYSIWYG editor and 11 field types, plus an RTL-first Markdown editor on Monaco with 24+ authoring commands.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "Radix UI",
      "dnd-kit",
      "Zod",
      "Prisma",
      "PostgreSQL",
      "Monaco Editor",
    ],
  },
  {
    company: "HeidaryHa",
    role: "Frontend Engineer · Contract",
    period: "Feb 2023 – Jan 2024",
    summary:
      "Fintech PWA for a loan fund serving 12,000+ customers, with multi-factor auth and high-reliability financial workflows.",
    highlights: [
      "Implemented a multi-factor auth pipeline: Captcha → SMS OTP → master password → biometric login.",
      "Built financial workflows: IBAN validation, beneficiary lookup, OTP-confirmed transfers and receipt generation.",
      "Shipped cross-platform from a single codebase via PWA + Capacitor (Android).",
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
    company: "Motion Desk",
    role: "Frontend Software Engineer",
    period: "Sep 2021 – Jan 2023",
    summary:
      "Collaborated with motion and product designers to build and publish two commercial Adobe After Effects extensions on aescripts.com.",
    highlights: [
      "Developed 'Flower Bloom' and 'Flip Animation' extensions with HTML/CSS/JS, integrated into the After Effects environment.",
      "Translated designer workflows into optimized extension UIs, enabling advanced animations more efficiently.",
    ],
    stack: ["JavaScript", "HTML", "CSS", "Adobe CEP", "After Effects"],
  },
];

export const projects: Project[] = [
  {
    title: "RcoinX Trading Platform",
    category: "Crypto · Real-time",
    year: "2025",
    description:
      "Pre-launch spot cryptocurrency exchange with a real-time trading interface built on a Turborepo monorepo and Figma-derived design system.",
    bullets: [
      "Live order book, candlestick charts, and order execution driven by a resilient WebSocket pipeline.",
      "Feature-Sliced Design with ESLint import boundaries and shared packages for ui, http, i18n, and providers.",
      "Storybook component library with RTL/LTR support, Vitest + MSW testing, and multi-stage Docker CI.",
    ],
    stack: [
      "React 19",
      "TypeScript",
      "WebSocket",
      "TanStack",
      "Turborepo",
      "Tailwind",
    ],
    featured: true,
  },
  {
    title: "Chatomatic — AI SaaS",
    category: "AI · Full-Stack · Solo",
    year: "2024",
    description:
      "A complete AI SaaS for building, training, and deploying custom assistants with RAG retrieval and an embeddable chat widget.",
    bullets: [
      "Modular Fastify backend with multi-format document ingestion and pgvector similarity search for cited RAG responses.",
      "Streaming AI assistant playground and reusable @workspace/chat-ui shared by dashboard and Shadow DOM embed.",
      "Dual LLM/embedding providers (OpenAI + Ollama) behind resolver ports in a 3-app pnpm monorepo.",
    ],
    stack: [
      "Next.js 15",
      "Fastify",
      "Vercel AI SDK",
      "pgvector",
      "Shadow DOM",
      "Rollup",
    ],
    featured: true,
  },
  {
    title: "Restaurant Reservation Platform",
    category: "Full-Stack · System Design",
    year: "2025",
    description:
      "An end-to-end reservation platform for event halls, tables, and catering with concurrency-safe booking for a US-market launch.",
    bullets: [
      "Next.js marketing site, React customer/admin apps, and Fastify REST API from Figma designs.",
      "OTP phone authentication, admin approval workflows, and BullMQ async notifications via Twilio.",
      "OpenTelemetry + Prometheus observability and Docker-based deployment.",
    ],
    stack: [
      "Next.js",
      "React",
      "Fastify",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Docker",
    ],
    featured: true,
  },
  {
    title: "Fastify Observability Stack",
    category: "Open Source · Observability",
    year: "2026",
    description:
      "A production-grade Fastify API with unified metrics, logs, and distributed tracing — built to debug requests end-to-end in Grafana.",
    bullets: [
      "Fastify REST API with PostgreSQL and Redis cache-aside, custom Prometheus metrics (cache hit/miss, DB latency, dependency health), and OpenTelemetry spans across routes and multi-step workflows.",
      "Full local observability stack — Prometheus, Loki, Grafana Tempo — with structured Pino logs, OTLP trace export, and trace-to-log correlation in Grafana dashboards.",
      "Production runtime patterns: Zod-validated config, liveness/readiness probes, dependency health checks, graceful shutdown, and 12 k6 load scenarios for spike, saturation, and cache-invalidation testing.",
    ],
    stack: [
      "TypeScript",
      "Fastify",
      "PostgreSQL",
      "Redis",
      "OpenTelemetry",
      "Prometheus",
      "Loki",
      "Grafana",
      "Docker",
      "k6",
    ],
    repo: "https://github.com/mohsn-mirzaei/fastify-observability",
    featured: true,
  },
  {
    title: "RTL Markdown Book Editor",
    category: "Product · Editor",
    year: "2024",
    description:
      "A Monaco-based, RTL-first markdown authoring studio with split-pane live preview and multilingual insertion workflow.",
    bullets: [
      "24+ authoring commands with split-pane live preview and TOC navigation.",
      "markdown-it rendering pipeline with anchor, footnote and media plugins.",
      "Multilingual insertion workflow optimized for RTL content structures.",
    ],
    stack: ["React", "TypeScript", "Monaco", "markdown-it", "TanStack Query"],
  },
  {
    title: "No-Code App & Form Builders",
    category: "Product · Schema-driven",
    year: "2024",
    description:
      "Drag-and-drop builders that let non-technical teams ship mobile screens and forms without engineering.",
    bullets: [
      "Schema-driven component system with Draft → Merge → Publish → Rollback lifecycle.",
      "WYSIWYG form designer with 11 configurable field types and runtime rendering.",
      "Visual app builder for React Native screen configuration and production builds.",
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "dnd-kit",
      "Prisma",
      "PostgreSQL",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript (ES2022+)", "HTML5", "CSS3"],
  },
  {
    title: "Frontend",
    skills: [
      "React 19",
      "Next.js 15",
      "Vite",
      "React Router Dom",
      "TanStack Router",
      "TanStack Query",
      "Zustand",
      "React Hook Form",
      "Framer Motion",
    ],
  },
  {
    title: "Architecture",
    skills: [
      "Feature-Sliced Design",
      "Monorepo · Turborepo/pnpm",
      "Domain-Driven Design",
      "Clean Architecture",
      "Schema-Driven UI",
      "SSR / CSR / Hybrid",
    ],
  },
  {
    title: "UI & Styling",
    skills: [
      "Tailwind CSS",
      "Radix UI",
      "shadcn/ui",
      "Storybook",
      "RTL / LTR · i18n",
      "Accessibility (a11y)",
      "Figma-to-code",
    ],
  },
  {
    title: "Backend & Data",
    skills: [
      "Node.js",
      "Fastify",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "pgvector",
      "BullMQ",
      "Zod",
    ],
  },
  {
    title: "Auth & Security",
    skills: ["WebAuthn", "JWT", "OAuth", "OTP", "RBAC", "Rate Limiting"],
  },
  {
    title: "Testing & Quality",
    skills: [
      "Vitest",
      "MSW",
      "k6",
      "ESLint (architecture rules)",
      "TypeScript strict",
      "CI/CD",
    ],
  },
  {
    title: "DevOps & AI",
    skills: [
      "Docker",
      "GitHub Actions",
      "OpenTelemetry",
      "Prometheus",
      "WebSocket",
      "Vercel AI SDK",
      "OpenAI SDK",
      "Streaming UI",
    ],
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
    body: "Monorepos, Feature-Sliced Design, and clean boundaries — I build frontends that scale with the team, not against it.",
  },
  {
    title: "Real-time obsessed",
    body: "WebSocket pipelines with reconnect, heartbeat, and cache sync powering sub-100ms trading UIs and live dashboards.",
  },
  {
    title: "End-to-end ownership",
    body: "From system design and backend to pixel-perfect UI — I've shipped multiple products solo and led frontend architecture in cross-functional teams.",
  },
];
