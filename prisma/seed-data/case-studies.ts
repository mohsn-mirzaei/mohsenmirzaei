import type { CaseStudy } from "../../src/lib/case-studies";

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
      src: "/images/projects/rcoinx.png",
      alt: "RcoinX desktop spot terminal with the order book, chart, and order form updating live",
      caption:
        "Search SOL, open it, switch the chart to 15m, then a market order for 0.25. The book and tape keep moving underneath.",
      video: "/videos/rcoinx-terminal.mp4",
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
            "Three channels share one socket. The first subscriber opens the stream, the last unsubscribe closes it, and ticks land in a cache at 200–300ms.",
        },
      },
      {
        kicker: "04 — Platform",
        heading: "A monorepo the team couldn't break",
        body: [
          "I structured the codebase as a Turborepo monorepo with 8 shared packages (ui, providers, http, i18n, types, cross-feature APIs) and strict Feature-Sliced Design import boundaries enforced by ESLint. A feature can't reach into another feature's internals; a page can't import a raw API client. The linter, not code review, holds the architecture.",
          "RTL/LTR Storybook components and Vitest + MSW contract tests run in Docker CI, so backend churn broke tests, not production.",
        ],
      },
      {
        kicker: "05 — Security",
        heading: "The dialog opens after the session exists",
        body: [
          "Sensitive account actions never open a form first. Linking an authenticator, adding a passkey, or changing an email creates an MFA session, and the dialog mounts only after that session exists. The stepper will not move on until the code — email, TOTP, or WebAuthn — actually verifies.",
          "Which methods exist is a fact about the user, not a guess inside the component. Email, authenticator, and passkey are flags on the profile. Phone has to be set before passkey or TOTP management unlocks, so the security page cannot offer a method the account is not ready for.",
        ],
        media: {
          src: "/images/projects/rcoinx-mfa.png",
          alt: "RcoinX security settings with email, passkey, and TOTP two-factor authentication enabled",
          caption:
            "Account security: email, passkey, and TOTP, each marked set only when the profile actually has that method.",
        },
      },
      {
        kicker: "06 — In use",
        heading: "The same gate, a different title",
        body: [
          "The security page is where a method gets turned on. Everywhere else, the gate is one dialog. Password, email, phone, authenticator, and passkey each create a session first, then walk an SMS code, then a choice of email, passkey, or TOTP. The step after that — a new password, a QR code — only appears once that choice verifies.",
          "What changes is the title. The steps do not.",
        ],
        media: {
          src: "/images/projects/rcoinx-mfa-gate.png",
          alt: "Change Password dialog on RcoinX with the 2FA step open to email, passkey, or TOTP",
          caption:
            "After SMS, the gate offers email, passkey, or TOTP. The video continues through the authenticator code and the new password, and stays open until Done.",
          video: "/videos/rcoinx-mfa.mp4",
        },
      },
      {
        kicker: "07 — Outcome",
        heading: "What shipped",
        body: [
          "Spot Trading shipped end-to-end (~9.5K LOC): order book, candlestick charts, order management, 9 REST integrations, 3 WebSocket streams. Three engineers shipped in parallel without stepping on each other, and the WebSocket layer hasn't needed structural changes since it landed.",
        ],
        media: {
          src: "/images/projects/rcoinx-orderbook.png",
          alt: "Close-up of the RcoinX order book and depth visualization updating live",
          caption:
            "Order book and depth, updated from the throttled cache. Ten seconds, silent, and safe to loop.",
          video: "/videos/rcoinx-orderbook.mp4",
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
      src: "/images/projects/chatomatic.png",
      alt: "Chatomatic playground with a streamed answer, numbered citations, and the chunks retrieved for that turn",
      caption:
        "Ask about the return window. The answer streams with numbered citations, and the cursor rests under the reply.",
      video: "/videos/chatomatic-playground.mp4",
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
            "Retrieve the top chunks, stream the tokens, and write the citation set only after the stream closes.",
        },
      },
      {
        kicker: "03 — Knowledge",
        heading: "Five formats, one index",
        body: [
          "A source the assistant has not been trained on cannot be cited. PDF, DOCX, XLSX, Markdown, and FAQs land in the same index, with character counts for what is ready and what is still waiting.",
        ],
        media: {
          src: "/images/projects/chatomatic-sources.png",
          alt: "Chatomatic sources screen with trained documents and one PDF still waiting to be trained",
          caption:
            "repairs.pdf is uploaded and untrained. Until the next train, the playground cannot cite it.",
        },
      },
      {
        kicker: "04 — Streaming",
        heading: "Two-phase streaming chat",
        body: [
          "Streaming and persistence fight each other: you want tokens on screen immediately, but citations aren't final until the stream ends. The pipeline runs in two phases — phase one retrieves and streams tokens to the client; phase two, after the stream closes, persists the message with its citation set atomically. The user sees a live answer; the database only ever sees a complete one.",
          "The API is a greenfield Fastify service: 7 modules, 27 Result-typed use-cases (no thrown business errors — every failure is a typed value), 11 tables, public embed routes, and per-assistant routing between OpenAI and Ollama.",
        ],
      },
      {
        kicker: "05 — Embed",
        heading: "A widget that survives any website",
        body: [
          "The embeddable widget renders inside Shadow DOM, so host-page CSS can't leak in and widget styles can't leak out. It's built with Vite and bundled with Rollup into a single self-contained script — one tag, any site, no iframe jank.",
        ],
        media: {
          src: "/images/projects/chatomatic-embed.png",
          alt: "Chatomatic widget open on a Fieldnote product page, answering a shipping question with citations",
          caption:
            "The same assistant, on the product page. One script tag, and the host CSS never reaches the widget.",
          video: "/videos/chatomatic-embed.mp4",
        },
      },
      {
        kicker: "06 — Outcome",
        heading: "Launch, and the harder second version",
        body: [
          "V1 launched to 100+ users. The 2026 rebuild — done solo — replaced the entire stack with the architecture above (~25K LOC), turning a launched MVP into a platform: dashboard, playground, typed API, and an embed that businesses can install in a minute.",
          "Building the same product twice taught me more about system design than any job could: the second version is what the first one should have been, and I have the diff to prove it.",
        ],
      },
    ],
  },
  {
    slug: "no-code-builders",
    title: "No-Code App Builder",
    eyebrow: "Product · React Native",
    year: "2024",
    role: "Full-Stack Engineer",
    timeline: "8 months",
    team: "On-site product team · I owned the builder",
    intro:
      "The people who knew what the app should say could not ship a React Native screen. I built the studio they used instead: drop blocks on a phone, name it, pick a color, merge to production, and download the build. The Lumen home in these recordings is the data the demo opens on.",
    heroMedia: {
      src: "/images/projects/builder.png",
      alt: "App Builder with a Lumen home screen on the phone — slideshow, categories, and a product row",
      caption:
        "After the blocks land, the element panel renames the banner. New arrivals is that edit, on the phone.",
      video: "/videos/builder-canvas.mp4",
    },
    metrics: [
      { value: "10", label: "block layouts on the canvas" },
      { value: "6", label: "screens in one app" },
      { value: "2", label: "versions, develop and production" },
      { value: "3", label: "languages, direction included" },
    ],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "dnd-kit",
      "Tailwind CSS",
      "Radix UI",
      "Zod",
      "i18next",
    ],
    sections: [
      {
        kicker: "01 — Problem",
        heading: "A screen was a ticket",
        body: [
          "A new banner, a product row, a page embedded in a web view: each one waited on an engineer, and the wait was measured in days. The people editing the catalog were not the people who could open a React Native project.",
          "The studio had to be the whole path. Compose the screen, set the public name and the color, and leave with a file. If any step still needed a developer, the queue was still the product.",
        ],
      },
      {
        kicker: "02 — Canvas",
        heading: "Drop it on the phone",
        body: [
          "The canvas is a phone, not a freeform artboard. Ten layouts sit in the palette: five banners, four lists, and a web view. A drop appends a block to the screen — or inserts it above or below the block you hover. Up to six screens, each with its own blocks.",
          "Develop is the only version that accepts a drop. Switch the nav to production and the palette goes quiet: the published screen is there to look at, not to nudge.",
        ],
      },
      {
        kicker: "03 — Schema",
        heading: "What gets saved is JSON",
        body: [
          "A block is a type plus its attributes: title, display, autoplay, the module it reads from, the screen a tap opens. Save writes that list as the develop version. Merge copies develop onto production. Restore copies production back, when an edit should be thrown away.",
          "The React Native app renders the schema. The studio never emits component source, so a non-technical edit cannot fork the codebase.",
        ],
        media: {
          src: "/images/projects/builder-pipeline.svg",
          alt: "Diagram of compose, develop, and production: blocks become a schema, merge copies develop onto production, then build downloads it",
          caption:
            "Drops land in develop. Production is the copy merge makes, and the copy the build downloads.",
        },
      },
      {
        kicker: "04 — Brand",
        heading: "Name, color, light and dark",
        body: [
          "The public name is the word on the home screen, capped, and the product only allowed a change every 30 days — often enough to rebrand, not often enough to thrash a listing.",
          "Color is one palette with two shades. Picking clay writes the light primary and the darker shade the night phone uses. The preview on the settings page is that phone, so the theme is visible before anything is built.",
        ],
        media: {
          src: "/images/projects/builder-theme.png",
          alt: "App settings with the name Lumen, a clay color selected, and the same storefront previewed on a phone",
          caption:
            "Deep orange is the palette. The sheet on the right is that color on the Lumen home.",
        },
      },
      {
        kicker: "05 — Ship",
        heading: "Merge, bundle, download",
        body: [
          "Build walks the version that is allowed to ship: develop is saved, merged onto production, then bundled. Download is the other button. The file is the product a teammate can hand to a customer — no React Native install on their machine, no ticket back to engineering.",
          "The shell around the studio was itself translated, Persian, English, and Arabic, and the canvas followed the language direction. The screens here are the English, left-to-right pass.",
        ],
        media: {
          src: "/images/projects/builder-ship.png",
          alt: "Release card with develop saved, merged to production, and a React Native bundle, next to a Download button for Lumen.apk",
          caption:
            "The palette turns blue, then back. Build saves, merges, and bundles. View opens what Lumen.json contains.",
          video: "/videos/builder-ship.mp4",
        },
      },
      {
        kicker: "06 — Outcome",
        heading: "An afternoon, not a sprint",
        body: [
          "Screen work moved off the engineering queue. A catalog person could put a slideshow, a category row, and a product list on the home screen, name the app, and leave with a build the same day. What used to be a multi-day ticket became a sitting.",
          "The same season I also shipped a schema-driven form builder — eleven field types, the same instinct that a document should outlive the component that draws it. The app builder is the one you can see: a phone, filling up.",
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
      src: "/images/projects/reservations.png",
      alt: "Event hall booking — October calendar with the evening session reserved and afternoon still open",
      caption:
        "Premium plan, Saturday the 17th. Evening is taken, afternoon is open. Eighty guests, the Live Station buffet, then the phone number and the six-digit code.",
      video: "/videos/reservations-flow.mp4",
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
          caption:
            "Draft and awaiting orders belong to guest-order tables. Halls, catering, and hosted tables enter at pending. The slot row is locked before the insert.",
        },
      },
      {
        kicker: "03 — The floor",
        heading: "The month, then the decision",
        body: [
          "The admin calendar marks every day that already holds a hall booking. The table under it is the queue: pending review, confirmed, rejected, with the session and the guest count on the row.",
          "Accepting one opens the reservation, then a second dialog. The copy on that dialog is the invariant: confirm it, and the selected time slot will be locked. Decline and cancel ask for a reason. Completed is a dead end.",
        ],
        media: {
          src: "/images/projects/reservations-admin.png",
          alt: "Admin event hall calendar for October with confirmed and pending reservations in the queue",
          caption:
            "Dots are days with a booking. The recording opens the Sunday pending review and stops on the lock.",
          video: "/videos/reservations-confirm.mp4",
        },
      },
      {
        kicker: "04 — Catering",
        heading: "The menu is quoted after review",
        body: [
          "Catering is the second channel on the same lifecycle. The guest builds a tray — koobideh, joojeh, fesenjan — and the card does not show a price. The number is written later, on the admin copy of that same order.",
        ],
        media: {
          src: "/images/projects/reservations-catering.png",
          alt: "Catering menu with Chelo Kebab Koobideh and Joojeh Kebab added, prices withheld until review",
          caption:
            "One koobideh, one joojeh. Pricing provided after review, on purpose.",
        },
      },
      {
        kicker: "05 — Quote",
        heading: "Tax and delivery are typed on the order",
        body: [
          "The catalog rate is only a starting point. Three servings of koobideh at $24.99 and two of joojeh at $22.99 are already on the line. Tax and the delivery fee are what the admin adds. Send and confirm writes the total and moves the reservation to confirmed — a catering order does not confirm itself.",
        ],
        media: {
          src: "/images/projects/reservations-estimate.png",
          alt: "Send Estimate dialog pricing three koobideh and two joojeh, with 8% tax and a $45 delivery fee",
          caption:
            "8% tax, $45 to Mercer Street. The total lands at $175.63, and that button is what confirms it.",
          video: "/videos/reservations-estimate.mp4",
        },
      },
      {
        kicker: "06 — Tables",
        heading: "A table is a time, then a mode",
        body: [
          "Table booking starts on the same kind of calendar, then a time. 19:00 is the first sitting. After that the host either orders for the group, or invites guests to order on their own link — draft, then awaiting orders, then the same pending review as the hall.",
        ],
        media: {
          src: "/images/projects/reservations-table.png",
          alt: "Table reservation calendar with Saturday the 17th selected and 19:00 chosen",
          caption: "Saturday the 17th, 19:00. The next step is who orders.",
        },
      },
      {
        kicker: "07 — Phone",
        heading: "Catering, with a fingertip",
        body: [
          "The phone walk is the other channel. A delivery date, then dinner, then the dishes. Each tap leaves a ring on the control it hits. The cards still withhold the price.",
        ],
        media: {
          src: "/images/projects/reservations-mobile.png",
          alt: "Phone catering menu with koobideh and joojeh added, and a touch ring on the plus control",
          caption:
            "Dinner, two koobideh and a joojeh, then the same six-digit code. The ring is the tap.",
          video: "/videos/reservations-mobile.mp4",
        },
      },
      {
        kicker: "08 — Contracts",
        heading: "One schema, both sides of the wire",
        body: [
          "The monorepo shares 77 Zod schemas between the Fastify API and all frontend apps — every request validated at the edge, every response typed at the client, one definition each. 72 automated tests cover auth, booking, and audit paths, including concurrency tests that hammer the same slot from parallel connections.",
        ],
      },
      {
        kicker: "09 — Operations",
        heading: "Slow paths off the request, eyes on production",
        body: [
          "Confirmations and reminders (Twilio SMS, Resend email) run through BullMQ workers, off the HTTP path — a booking never waits on a text message, and a Twilio outage degrades notifications, not bookings.",
          "The platform ships with a 9-service observability stack — OpenTelemetry traces, Prometheus metrics, Loki logs, Grafana on top — targeting p95 under 500ms. For a solo-built system, dashboards are the second engineer.",
        ],
        media: {
          src: "/images/projects/observability.png",
          alt: "Grafana dashboard with per-route latency, throughput, logs, and a trace whose database span is most of the request",
          caption:
            "Seven routes, p95 under 10ms, and the trace for GET /v1/catalog/sessions. The database span is 16ms of the 17.",
          video: "/videos/observability.mp4",
        },
      },
      {
        kicker: "10 — Outcome",
        heading: "Phone intake, retired",
        body: [
          "21 customer and admin screens now handle all three booking channels self-service. Under load tests hammering identical slots, double-bookings: zero. The interesting part isn't the zero — it's that the design makes any other number impossible.",
        ],
      },
    ],
  },
];
