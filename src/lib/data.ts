/**
 * Shared content types for the portfolio.
 *
 * Experience/Project/Testimonial data itself moved to the database as of
 * Part 2 of the backend rollout — see src/lib/content/queries.ts. This file
 * now only holds the type contracts those queries and their consuming
 * components share, plus skillGroups/stats/pillars, which are small and
 * rarely change enough to stay static.
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

