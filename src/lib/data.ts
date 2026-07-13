/**
 * Structured portfolio content, derived from Mohsen's resume.
 *
 * This is the single source of truth for the site. Everything here is rendered
 * server-side so search engines and AI crawlers (which usually don't run JS)
 * see the full text in the initial HTML.
 *
 * NOTE: `period` values reflect resume dates (last updated Jul 2026).
 * NOTE: media under /images/projects/ are PLACEHOLDER mockups — swap each
 *       for a real screenshot (jpg/png/webp) or screen recording (mp4/webm)
 *       with the same path, no code changes needed.
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

export type ProjectMedia = {
  /** Poster / screenshot. PLACEHOLDER SVG mockups for now. */
  image: string;
  alt: string;
  /** Optional screen recording (mp4/webm). None shipped yet — drop a file in
   *  /public/videos and set the path here to upgrade a card to video. */
  video?: string;
};

export type Project = {
  title: string;
  slug: string;
  category: string;
  year: string;
  description: string;
  bullets: string[];
  stack: string[];
  media: ProjectMedia;
  /** Live product URL. PLACEHOLDER where marked — replace with real links. */
  link?: string;
  repo?: string;
  /** Has a full case study at /work/[slug]. */
  caseStudy?: boolean;
  featured?: boolean;
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  link?: string;
  avatar?: string;
};

export const experiences: Experience[] = [
  {
    company: "Restaurant Reservation Platform",
    role: "Full-Stack Engineer · Freelance, Part-Time",
    period: "Sep 2025 – Present",
    summary:
      "US-client reservation platform unifying event hall, catering, and table bookings into a 4-app monorepo with self-service booking flows and production observability.",
    highlights: [
      "Unified 3 booking channels into a 4-app monorepo with 21 customer/admin screens, replacing phone-based intake with self-service flows.",
      "Designed the reservation core — an 8-state lifecycle with transactional slot locking — preventing double-bookings and invalid transitions.",
      "Enforced single-source API contracts via 77 shared Zod schemas and 72 automated tests across auth, booking, and audit paths.",
      "Set up async BullMQ notifications (Twilio/Resend) off the HTTP path and a 9-service observability stack targeting p95 <500 ms.",
    ],
    metrics: [
      { value: "0", label: "double-bookings under load" },
      { value: "77", label: "shared API schemas" },
      { value: "72", label: "automated tests" },
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
      "Architected the frontend platform for a pre-launch crypto exchange, from monorepo foundations to real-time Spot Trading and account-security flows.",
    highlights: [
      "Architected the frontend from scratch — Turborepo monorepo with 8 shared packages and strict Feature-Sliced Design import boundaries — authoring 61% of commits in a 3-engineer team.",
      "Delivered Spot Trading end-to-end (~9.5K LOC): order book, charts, order management, 9 REST integrations, and 3 WebSocket streams.",
      "Built a centralized WebSocket layer with ref-counted subscriptions, auto-reconnect, and 200–300ms throttled cache patching for market data.",
      "Shipped Account & Security with TOTP, WebAuthn, MFA-gated flows, RTL/LTR Storybook components, and Vitest + MSW tests in Docker CI.",
    ],
    metrics: [
      { value: "61%", label: "of frontend commits" },
      { value: "8", label: "shared packages" },
      { value: "3", label: "WebSocket streams" },
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
      "Frontend engineer on a fully RTL Persian B2B SaaS platform spanning surveys, recruitment, consultation booking, and digital commerce.",
    highlights: [
      "Engineered a 35K+ LOC, 41-page Next.js enterprise platform across 6 business modules in 4 months.",
      "Structured the data layer with 85 React Query hooks, 86 typed services, and 18 API domains, cutting new-endpoint work to one hook.",
      "Standardized 23+ production forms on 41+ Zod schemas, with hybrid SSR and tag-based revalidation across 31+ modules.",
    ],
    metrics: [
      { value: "41", label: "pages shipped" },
      { value: "86", label: "typed services" },
    ],
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
    role: "Frontend Engineer · Freelance, Part-Time",
    period: "Apr 2025 – Jul 2025",
    summary:
      "Bilingual hedge fund platform — multi-step KYC onboarding, role-based dashboards, and a support ticketing system for customer verification workflows.",
    highlights: [
      "Developed an 11-step KYC wizard with in-browser ID capture and video recording, completed in a single web session.",
      "Delivered 18 role-gated screens across public, user, and super-admin areas, integrating 36 REST endpoints via 30 typed hooks.",
      "Implemented a bilingual EN/FA interface with ~1,700 localized strings and 6 Zod-validated forms shared across auth, KYC, and ticket flows.",
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
    role: "Co-Founder & Full-Stack Engineer",
    period: "Oct 2024 – Mar 2025",
    summary:
      "Co-founded and launched an AI assistant SaaS, then rebuilt the platform end-to-end with dashboard, playground, RAG retrieval, and a Shadow DOM embed.",
    highlights: [
      "Co-founded and launched to 100+ users; rebuilt it end-to-end solo in 2026 (~25K LOC) across dashboard, playground, and Shadow DOM embed.",
      "Built a greenfield Fastify API with 7 modules, 27 Result-typed use-cases, 11 tables, public embed routes, and per-assistant OpenAI/Ollama routing.",
      "Designed 2-phase streaming chat: pgvector top-5 retrieval, token stream, then post-stream citation persistence.",
      "Implemented hybrid RAG: IVFFlat top-5 retrieval with full-context fallback, inline numbered citations, and a 5-format ingestion pipeline.",
    ],
    metrics: [
      { value: "100+", label: "users at launch" },
      { value: "25K", label: "LOC rebuilt end-to-end" },
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
    role: "Full-Stack Engineer",
    period: "Feb 2024 – Sep 2024",
    summary:
      "Led frontend delivery across three products in an on-site product team — a no-code app builder, a full-stack form builder, and an RTL markdown editor.",
    highlights: [
      "Built a drag-and-drop app builder enabling non-technical teams to ship React Native screens without engineering, cutting screen delivery from multi-day dev cycles to hours.",
      "Architected an RTL-first Markdown editor on Monaco with 24+ authoring commands.",
      "Created a schema-driven UI system with a Draft → Merge → Publish → Rollback lifecycle and a form builder with 11 field types on Next.js, Prisma, and PostgreSQL.",
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
    period: "2023 – 2024",
    summary:
      "Mobile banking PWA serving 14,000+ customers, with multi-factor auth and high-reliability financial transaction workflows.",
    highlights: [
      "Launched a production mobile-banking PWA serving 14,000+ customers, building its authentication and transaction flows.",
      "Contributed to a 40% increase in monthly loan applications, shipping PWA + Android from a single React/TypeScript codebase.",
    ],
    metrics: [
      { value: "14k+", label: "customers served" },
      { value: "40%", label: "more monthly applications" },
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
    role: "Software Engineer",
    period: "2021 – 2023",
    summary:
      "Collaborated with motion and product designers to build and publish two commercial Adobe After Effects extensions on aescripts.com.",
    highlights: [
      "Shipped 2 commercial cross-platform After Effects (CEP) extensions on aescripts.com.",
      "Reached 3,000+ downloads and 1,000+ sales by translating designer workflows into optimized extension UIs.",
    ],
    metrics: [
      { value: "3k+", label: "downloads" },
      { value: "1k+", label: "sales" },
    ],
    stack: ["JavaScript", "HTML", "CSS", "Adobe CEP", "After Effects"],
  },
];

export const projects: Project[] = [
  {
    title: "RcoinX Trading Platform",
    slug: "rcoinx",
    category: "Crypto · Real-time",
    year: "2025",
    description:
      "Pre-launch spot cryptocurrency exchange frontend built from scratch on a Turborepo monorepo with strict Feature-Sliced Design boundaries.",
    bullets: [
      "Spot Trading end-to-end (~9.5K LOC): order book, candlestick charts, order management, 9 REST integrations, and 3 WebSocket streams.",
      "8 shared packages for ui, providers, http, i18n, types, and cross-feature APIs, enabling parallel delivery across the team.",
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
    media: {
      image: "/images/projects/rcoinx.svg",
      alt: "RcoinX spot trading interface — order book, candlestick chart, and order form",
      // video: "/videos/rcoinx.mp4", // PLACEHOLDER — drop a screen recording here
    },
    // link: "https://rcoinx.com", // PLACEHOLDER — uncomment with the real URL
    caseStudy: true,
    featured: true,
  },
  {
    title: "Chatomatic — AI SaaS",
    slug: "chatomatic",
    category: "AI · Full-Stack · Co-Founder",
    year: "2024–2026",
    description:
      "AI assistant SaaS launched to 100+ users and rebuilt end-to-end with RAG retrieval, streaming chat, and an embeddable widget.",
    bullets: [
      "Greenfield Fastify API with 7 modules, 27 Result-typed use-cases, 11 tables, and public embed routes.",
      "2-phase streaming chat: pgvector top-5 retrieval, token stream, then post-stream citation persistence.",
      "Hybrid RAG with full-context fallback, inline numbered citations, 5-format ingestion, and OpenAI/Ollama routing.",
    ],
    stack: [
      "Next.js 15",
      "Fastify",
      "Vercel AI SDK",
      "pgvector",
      "Shadow DOM",
      "Rollup",
    ],
    media: {
      image: "/images/projects/chatomatic.svg",
      alt: "Chatomatic dashboard — streaming AI chat with inline citations and assistant playground",
    },
    // link: "https://chatomatic.app", // PLACEHOLDER — uncomment with the real URL
    caseStudy: true,
    featured: true,
  },
  {
    title: "Restaurant Reservation Platform",
    slug: "reservations",
    category: "Full-Stack · System Design",
    year: "2025",
    description:
      "A 4-app reservation monorepo for event halls, tables, and catering with concurrency-safe booking for a US-market launch.",
    bullets: [
      "3 booking channels unified into 21 customer/admin screens, replacing phone-based intake with self-service flows.",
      "8-state reservation lifecycle with transactional slot locking, 77 shared Zod schemas, and 72 automated tests.",
      "BullMQ notifications via Twilio/Resend and a 9-service observability stack with OpenTelemetry, Prometheus, and Loki.",
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
    media: {
      image: "/images/projects/reservations.svg",
      alt: "Reservation platform — availability calendar and booking flow for event halls and tables",
    },
    caseStudy: true,
    featured: true,
  },
  {
    title: "Fastify Observability Stack",
    slug: "fastify-observability",
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
    media: {
      image: "/images/projects/observability.svg",
      alt: "Grafana dashboard with correlated metrics, logs, and distributed traces for a Fastify API",
    },
    repo: "https://github.com/mohsn-mirzaei/fastify-observability",
    featured: true,
  },
  {
    title: "RTL Markdown Book Editor",
    slug: "rtl-markdown-editor",
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
    media: {
      image: "/images/projects/editor.svg",
      alt: "RTL markdown editor — Monaco editor pane with live preview of Persian book content",
    },
  },
  {
    title: "No-Code App & Form Builders",
    slug: "no-code-builders",
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
    media: {
      image: "/images/projects/builders.svg",
      alt: "No-code app builder — drag-and-drop canvas composing a mobile screen from components",
    },
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript (ES2022+)", "SQL", "Go (familiar)"],
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
    title: "Architecture & Quality",
    skills: [
      "Feature-Sliced Design",
      "Monorepo · Turborepo/pnpm",
      "Vitest",
      "MSW",
      "Docker",
      "CI/CD",
      "Schema-Driven UI",
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
    title: "AI & Observability",
    skills: [
      "Vercel AI SDK",
      "OpenAI SDK",
      "RAG",
      "OpenTelemetry",
      "Prometheus",
      "Loki",
      "WebSocket",
      "Streaming UI",
    ],
  },
];

/** Headline numbers used in the about / stats strip. */
export const stats: { value: string; label: string }[] = [
  { value: "4+", label: "Years building for production" },
  { value: "8", label: "Products shipped" },
  { value: "14k+", label: "Fintech users served" },
  { value: "100%", label: "Ownership, idea to deploy" },
];

/** Short "what makes me different" pillars for the About section. */
export const pillars: { title: string; body: string }[] = [
  {
    title: "Architecture-first",
    body: "Monorepos, Feature-Sliced Design, shared contracts, and clean boundaries — I build TypeScript systems that scale with the team.",
  },
  {
    title: "Real-time obsessed",
    body: "WebSocket pipelines with ref-counted subscriptions, reconnect, throttled cache patching, and production observability.",
  },
  {
    title: "End-to-end ownership",
    body: "From React interfaces to Fastify services, tests, CI/CD, and observability — I keep ownership through production.",
  },
];

/**
 * Real LinkedIn recommendations, condensed to 2–3 sentences each.
 * TODO: add `link` once the LinkedIn recommendation permalinks are in hand.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Mohsen is a highly innovative, constantly evolving programmer who strives to deliver exceptional outcomes. He has a proven track record of completing challenging projects on time and within budget, and his passion for the craft shows in his attention to detail.",
    name: "Hamid Ahmadi",
    role: "Founder & Creative Director",
    company: "MotionDesk",
    avatar: "/images/testimonials/hamid-ahmadi.jpg",
  },
  {
    quote:
      "Mohsen is one of the most hardworking and creative colleagues I've had the pleasure of working with. He combines strong technical expertise with excellent soft skills — curiosity, punctuality, and attention to detail — that make him a valuable asset to any team.",
    name: "Fariborz Shalghooni",
    role: "Senior Front-End Engineer",
    company: "Isopoll",
    avatar: "/images/testimonials/fariborz-shalghooni.jpg",
  },
  {
    quote:
      "Mohsen is one of the most creative and motivated front-end developers I know — always full of fresh ideas, and he never backs down when things get tough. Working with him, or even just talking to him, is genuinely inspiring.",
    name: "Saeed Tavazani",
    role: "Front-End Developer",
    company: "Khaneh Mobile",
    avatar: "/images/testimonials/saeed-tavazani.png",
  },
  {
    quote:
      "What stood out most about Mohsen was his persistence — he wouldn't step away from his desk until he'd solved the problem at hand. He's someone who constantly strives to improve, getting sharper every single day.",
    name: "Fatemeh Hashemi",
    role: "Backend Engineer",
    company: "Battle of Kings",
    avatar: "/images/testimonials/fatemeh-hashemi.jpg",
  },
];
