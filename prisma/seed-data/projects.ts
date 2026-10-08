import type { Project } from "../../src/lib/data";

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
      image: "/images/projects/rcoinx.png",
      alt: "RcoinX spot trading interface — order book, candlestick chart, and order form",
    },
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
      image: "/images/projects/chatomatic.png",
      alt: "Chatomatic dashboard — streaming AI chat with inline citations and assistant playground",
    },
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
