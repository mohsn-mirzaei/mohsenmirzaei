/**
 * Deep-dive case studies rendered at /work/[slug].
 *
 * Written as DRAFTS from resume facts — the narrative structure is final, but
 * review every number/claim and swap PLACEHOLDER media (see /images/projects/)
 * for real screenshots or screen recordings.
 */

export type CaseMedia = {
  src: string;
  alt: string;
  caption?: string;
  /** Optional screen recording; when set, `src` is used as the poster. */
  video?: string;
};

export type CaseSection = {
  kicker: string;
  heading: string;
  body: string[];
  bullets?: string[];
  media?: CaseMedia;
};

export type CaseStudy = {
  slug: string;
  title: string;
  eyebrow: string;
  year: string;
  role: string;
  timeline: string;
  team: string;
  intro: string;
  heroMedia: CaseMedia;
  metrics: { value: string; label: string }[];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  sections: CaseSection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "rcoinx",
    title: "RcoinX — Real-time Spot Trading",
    eyebrow: "Crypto Exchange · Frontend Platform",
    year: "2025–2026",
    role: "Senior Frontend Engineer",
    timeline: "9 months",
    team: "3 engineers · I authored 61% of commits",
    intro:
      "A pre-launch cryptocurrency exchange needed a frontend platform that could render live market data for thousands of concurrent users without dropping frames — starting from an empty repository.",
    heroMedia: {
      src: "/images/projects/rcoinx.svg",
      alt: "RcoinX spot trading interface — order book, candlestick chart, and order form",
      caption: "PLACEHOLDER — replace with a real screenshot of the trading screen.",
    },
    metrics: [
      { value: "~9.5K", label: "LOC of Spot Trading, end-to-end" },
      { value: "3", label: "WebSocket streams multiplexed" },
      { value: "8", label: "shared packages in the monorepo" },
      { value: "61%", label: "of team commits authored" },
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
    ],
    sections: [
      {
        kicker: "01 — Problem",
        heading: "An exchange frontend, from an empty repo",
        body: [
          "RcoinX was pre-launch: no design system, no repository structure, no data layer — but a hard requirement that Spot Trading feel instant. An order book updates many times per second; a naive render pipeline melts at that rate, and a naive architecture melts the team once three engineers work in the same codebase.",
          "The real problem was two problems: make real-time market data cheap to render, and make the codebase safe to grow. I owned both.",
        ],
      },
      {
        kicker: "02 — Constraints",
        heading: "What made it hard",
        body: [
          "Everything had to be built while the backend was still moving — API contracts changed weekly. The UI had to support RTL and LTR from day one for a bilingual market. And with a 3-engineer team, any architecture that required constant coordination would have been slower than no architecture at all.",
        ],
        bullets: [
          "Market data arrives on 3 concurrent WebSocket streams, at up to tens of messages per second per symbol.",
          "React re-renders are the enemy: an order book that re-renders on every tick is unusable.",
          "Multiple screens need the same live data — subscriptions must be shared, not duplicated.",
          "Backend contracts unstable → the frontend needed its own typed boundary and mock layer to keep shipping.",
        ],
      },
      {
        kicker: "03 — Architecture",
        heading: "A ref-counted WebSocket layer",
        body: [
          "The core decision: no component talks to a socket. A centralized WebSocket layer owns connections and exposes subscribe(topic) — the first subscriber to a topic opens the upstream subscription, the ref-count tracks consumers, and the last unsubscribe tears it down. Components mount and unmount freely; the socket layer decides what actually flows over the wire.",
          "Incoming ticks never touch React state directly. They patch a normalized cache, throttled to a 200–300ms cadence — fast enough to feel live, slow enough that the order book renders at a fixed, predictable rate. Auto-reconnect with resubscription replays the ref-count table after a drop, so a network blip never leaves a stale screen.",
        ],
        media: {
          src: "/images/projects/rcoinx-architecture.svg",
          alt: "Diagram of the ref-counted WebSocket layer: streams multiplexed into a throttled cache feeding UI slices",
          caption:
            "The WebSocket layer: 3 streams → ref-counted subscriptions → throttled cache patches → UI. PLACEHOLDER diagram — replace with a polished export.",
        },
      },
      {
        kicker: "04 — Platform",
        heading: "A monorepo the team couldn't break",
        body: [
          "I structured the codebase as a Turborepo monorepo with 8 shared packages (ui, providers, http, i18n, types, cross-feature APIs) and strict Feature-Sliced Design import boundaries enforced by ESLint. A feature can't reach into another feature's internals; a page can't import a raw API client. The linter, not code review, holds the architecture.",
          "Account & Security shipped on the same foundation: TOTP, WebAuthn, MFA-gated flows — with RTL/LTR Storybook components and Vitest + MSW contract tests running in Docker CI, so backend churn broke tests, not production.",
        ],
      },
      {
        kicker: "05 — Outcome",
        heading: "What shipped",
        body: [
          "Spot Trading shipped end-to-end (~9.5K LOC): order book, candlestick charts, order management, 9 REST integrations, 3 WebSocket streams. Three engineers shipped in parallel without stepping on each other, and the WebSocket layer hasn't needed structural changes since it landed.",
        ],
        media: {
          src: "/images/projects/rcoinx-orderbook.svg",
          alt: "Close-up of the RcoinX order book and depth visualization updating live",
          caption:
            "PLACEHOLDER — replace with a screen recording of the live order book (this is where a 10-second video earns its keep).",
        },
      },
    ],
  },
  {
    slug: "chatomatic",
    title: "Chatomatic — AI Assistant SaaS",
    eyebrow: "AI · RAG · Co-Founder",
    year: "2024–2026",
    role: "Co-Founder & Full-Stack Engineer",
    timeline: "6 months to launch · rebuilt solo in 2026",
    team: "2 co-founders · solo rebuild",
    intro:
      "Chatomatic lets businesses train an AI assistant on their own content and embed it anywhere. I co-founded it, launched to 100+ users, then rebuilt the entire platform solo — ~25K LOC across dashboard, playground, API, and an embeddable widget.",
    heroMedia: {
      src: "/images/projects/chatomatic.svg",
      alt: "Chatomatic dashboard — streaming AI chat with inline citations and assistant playground",
      caption: "PLACEHOLDER — replace with a real dashboard screenshot.",
    },
    metrics: [
      { value: "100+", label: "users at launch" },
      { value: "~25K", label: "LOC rebuilt end-to-end" },
      { value: "27", label: "Result-typed use-cases" },
      { value: "5", label: "ingestion formats" },
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
    ],
    sections: [
      {
        kicker: "01 — Problem",
        heading: "Answers people can trust",
        body: [
          "Generic chatbots hallucinate. For a business assistant, a confident wrong answer about pricing or policy is worse than no answer. The product bet: retrieval-grounded responses with visible citations, embedded on any website with one script tag.",
          "As co-founder I owned the entire technical side — architecture, API, dashboard, embed widget, and the RAG pipeline.",
        ],
      },
      {
        kicker: "02 — Retrieval",
        heading: "Hybrid RAG with a fallback",
        body: [
          "Ingestion accepts 5 formats, chunks them, and stores embeddings in PostgreSQL with pgvector under an IVFFlat index. At question time the pipeline retrieves the top-5 chunks — but small knowledge bases defeat vector search, so when retrieval confidence is low the pipeline falls back to full-context: pass everything, let the model decide.",
          "Citations are first-class: every answer carries inline numbered references back to source chunks, so users can verify instead of trusting.",
        ],
        media: {
          src: "/images/projects/chatomatic-rag.svg",
          alt: "Diagram of the two-phase streaming pipeline: retrieval, token stream, then citation persistence",
          caption:
            "Two-phase streaming: retrieve → stream tokens → persist citations after the stream closes. PLACEHOLDER diagram.",
        },
      },
      {
        kicker: "03 — Streaming",
        heading: "Two-phase streaming chat",
        body: [
          "Streaming and persistence fight each other: you want tokens on screen immediately, but citations aren't final until the stream ends. The pipeline runs in two phases — phase one retrieves and streams tokens to the client; phase two, after the stream closes, persists the message with its citation set atomically. The user sees a live answer; the database only ever sees a complete one.",
          "The API is a greenfield Fastify service: 7 modules, 27 Result-typed use-cases (no thrown business errors — every failure is a typed value), 11 tables, public embed routes, and per-assistant routing between OpenAI and Ollama.",
        ],
      },
      {
        kicker: "04 — Embed",
        heading: "A widget that survives any website",
        body: [
          "The embeddable widget renders inside Shadow DOM, so host-page CSS can't leak in and widget styles can't leak out. It's built with Vite and bundled with Rollup into a single self-contained script — one tag, any site, no iframe jank.",
        ],
        media: {
          src: "/images/projects/chatomatic-embed.svg",
          alt: "Chatomatic widget embedded on a customer website, opened over the page content",
          caption: "PLACEHOLDER — replace with a real embed screenshot on a customer site.",
        },
      },
      {
        kicker: "05 — Outcome",
        heading: "Launch, and the harder second version",
        body: [
          "V1 launched to 100+ users. The 2026 rebuild — done solo — replaced the entire stack with the architecture above (~25K LOC), turning a launched MVP into a platform: dashboard, playground, typed API, and an embed that businesses can install in a minute.",
          "Building the same product twice taught me more about system design than any job could: the second version is what the first one should have been, and I have the diff to prove it.",
        ],
      },
    ],
  },
  {
    slug: "reservations",
    title: "Reservation Platform — Zero Double-Bookings",
    eyebrow: "Full-Stack · System Design",
    year: "2025–present",
    role: "Full-Stack Engineer (freelance)",
    timeline: "Ongoing · US client",
    team: "Solo, end-to-end",
    intro:
      "A US restaurant group ran event-hall, catering, and table bookings over the phone — three intake channels, one paper-adjacent process, and regular double-bookings. I replaced it with a 4-app platform where double-booking is structurally impossible.",
    heroMedia: {
      src: "/images/projects/reservations.svg",
      alt: "Reservation platform — availability calendar and booking flow for event halls and tables",
      caption: "PLACEHOLDER — replace with a real booking-flow screenshot.",
    },
    metrics: [
      { value: "0", label: "double-bookings under load" },
      { value: "21", label: "customer/admin screens" },
      { value: "77", label: "shared Zod schemas" },
      { value: "72", label: "automated tests" },
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "Fastify",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Twilio",
      "Docker",
      "OpenTelemetry",
    ],
    sections: [
      {
        kicker: "01 — Problem",
        heading: "Three booking channels, one shared calendar",
        body: [
          "Event halls, catering, and tables compete for the same physical spaces and staff. When intake happens over the phone across three channels, conflicts are found by accident — usually by the customer, on the day. The client needed self-service booking, but self-service makes the concurrency problem worse: now two customers can race for the same slot at 2 a.m.",
        ],
      },
      {
        kicker: "02 — Core design",
        heading: "An 8-state lifecycle with transactional locking",
        body: [
          "A reservation isn't a row, it's a state machine: 8 states from draft through confirmation, fulfillment, and cancellation, with every legal transition enumerated and everything else rejected at the API boundary. Invalid transitions aren't bugs to catch in review — they're unrepresentable.",
          "Slot allocation runs inside a database transaction that locks the slot row before checking availability. Two concurrent requests for the last slot serialize at the database; the second one sees it taken. No advisory flags, no check-then-write races — the invariant lives where the data lives.",
        ],
        media: {
          src: "/images/projects/reservations-lifecycle.svg",
          alt: "State diagram of the 8-state reservation lifecycle with locking at the transition boundary",
          caption: "The reservation state machine. PLACEHOLDER diagram — replace with a polished export.",
        },
      },
      {
        kicker: "03 — Contracts",
        heading: "One schema, both sides of the wire",
        body: [
          "The monorepo shares 77 Zod schemas between the Fastify API and all frontend apps — every request validated at the edge, every response typed at the client, one definition each. 72 automated tests cover auth, booking, and audit paths, including concurrency tests that hammer the same slot from parallel connections.",
        ],
      },
      {
        kicker: "04 — Operations",
        heading: "Slow paths off the request, eyes on production",
        body: [
          "Confirmations and reminders (Twilio SMS, Resend email) run through BullMQ workers, off the HTTP path — a booking never waits on a text message, and a Twilio outage degrades notifications, not bookings.",
          "The platform ships with a 9-service observability stack — OpenTelemetry traces, Prometheus metrics, Loki logs, Grafana on top — targeting p95 under 500ms. For a solo-built system, dashboards are the second engineer.",
        ],
        media: {
          src: "/images/projects/observability.svg",
          alt: "Grafana dashboard with correlated metrics, logs, and traces for the reservation API",
          caption: "PLACEHOLDER — replace with a real Grafana screenshot.",
        },
      },
      {
        kicker: "05 — Outcome",
        heading: "Phone intake, retired",
        body: [
          "21 customer and admin screens now handle all three booking channels self-service. Under load tests hammering identical slots, double-bookings: zero. The interesting part isn't the zero — it's that the design makes any other number impossible.",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

/** Next case study in the cycle, for the bottom-of-page handoff nav. */
export function nextCaseStudy(slug: string) {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  return caseStudies[(i + 1) % caseStudies.length];
}
