import type { CaseStudy } from "../../src/lib/case-studies";

export const caseStudies: CaseStudy[] = [
  {
    slug: "alexanders-antiques",
    title: "Alexander's Antiques — A Gallery That Sells by Conversation",
    eyebrow: "Launched · Full-Stack Platform",
    year: "2026",
    role: "Lead Full-Stack Engineer · Freelance",
    timeline: "4 months · Jul–Nov 2026",
    team: "3 contributors · I authored 89% of commits",
    intro:
      "Alexander's Antiques is a gallery in Manhattan whose pieces used to live on 1stDibs. It wanted its own house: a storefront where a collector can decide from across an ocean, an inquiry instead of a checkout, and one workbench where the staff answer. I built all three — storefront, admin, and API — and it is live at alexanderantiques.com.",
    heroMedia: {
      src: "/images/projects/antiques.png",
      alt: "Lighting department on the live Alexander's Antiques catalogue — filters, 167 pieces, and opaline lustres in the first row",
      caption:
        "The live catalogue. The pointer steps through a tile's photographs, opens the blue opaline lustres, and turns the inquiry into a $4,000 offer.",
      video: "/videos/antiques-storefront.mp4",
    },
    metrics: [
      { value: "939", label: "pieces live on the site" },
      { value: "~130K", label: "LOC across web, admin, and API" },
      { value: "4,300+", label: "automated tests in one gate" },
      { value: "83/83", label: "port methods proven at cutover" },
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Drizzle",
      "Better Auth",
      "Zod",
      "TanStack Router",
      "TanStack Query",
      "Turborepo",
      "Tailwind CSS",
      "Cloudflare R2",
      "Twilio",
      "Resend",
      "OpenTelemetry",
      "Sentry",
      "Docker",
    ],
    liveUrl: "https://alexanderantiques.com",
    sections: [
      {
        kicker: "01 — Problem",
        heading: "A gallery, not a marketplace",
        body: [
          "On 1stDibs the gallery's pieces sat beside everyone else's. The house wanted its own address: every piece its own inventory, a real gallery on Second Avenue, and a sale that ends in a conversation with the people who own the piece.",
          "That rules out a cart. A collector in London looking at a $19,850 cloisonné elephant wants a shipping quote, a condition report, maybe a video call — not a checkout button. The product works when a collector reaches a confident inquiry about the right piece, and the staff can answer it from one place.",
        ],
      },
      {
        kicker: "02 — The piece",
        heading: "Decidable from a distance",
        body: [
          "The piece page carries what a remote buyer needs to judge it: the photographs, the period, the maker and whether the piece is by or attributed to them, the measurements as named dimensions, and an obvious next question. One button opens it.",
          "Photographs load because someone asked for them: the viewport arrived, a pointer settled, a thumbnail was pressed. Measured on the live site, a piece with 19 photographs fetches 9 images before the first click.",
        ],
        media: {
          src: "/images/projects/antiques-piece.png",
          alt: "Large Chinese cloisonné enamel incense burner modeled as a caparisoned elephant on its piece page, $19,850, with the inquiry action",
          caption:
            "A cloisonné elephant, $19,850. The inquiry sits under the price. The thumbnails wait for a click.",
        },
      },
      {
        kicker: "03 — Inquiry",
        heading: "Six questions instead of a checkout",
        body: [
          "The dialog offers six ways in: purchase, make an offer, request information, a condition report, a shipping quote, or a viewing — in Manhattan or by video. Each carries its own fields: an offer in cents, a destination and a postal code, in person or on a call.",
          "A verified phone is the price of entry. Collectors sign in without a password by a code to that phone, Turnstile guards the send, and the SMS consent is stored with the version of the words they agreed to. The opening submission becomes the first card of a thread, not a message.",
        ],
        media: {
          src: "/images/projects/antiques-inquiry.png",
          alt: "Admin conversation for a shipping-quote inquiry to London, with the gallery's reply and the collector's answer",
          caption:
            "A shipping quote to SW3. The submission is the first card. The house answers with a price and the finial. The collector answers back.",
        },
      },
      {
        kicker: "04 — Workbench",
        heading: "Answer from one place",
        body: [
          "Staff work a queue: new, responded, closed, closed by the collector. Opening a thread records who opened it first. A reply moves it to responded and sends the collector a letter, logged on the same page with its trace. A collector writing into a closed thread reopens it.",
          "Every status write is a guarded update, so a collector writing while staff close the thread resolves to one stored state, never two.",
        ],
        media: {
          src: "/images/projects/antiques-reply.png",
          alt: "Admin replying to a video-viewing request for the Caldwell lamps, with the status changing to Responded",
          caption:
            "A video viewing for the Caldwell lamps. The reply goes out, the badge turns to Responded, and the letter is logged with its trace.",
          video: "/videos/antiques-reply.mp4",
        },
      },
      {
        kicker: "05 — Architecture",
        heading: "One seam, proven by count",
        body: [
          "The storefront and the admin shipped first, on fixtures, behind repository ports. When the NestJS API arrived, no component changed: an HTTP adapter implemented the same 83 methods across 16 ports, parsed every response with the same Zod schemas, and mapped the API's errors back to the codes the fixtures already threw.",
          "A parity suite asserted every method by name, so cutover was a count reaching 83, not a feeling. dependency-cruiser holds the boundaries — the API may import the domain and nothing else — and OpenAPI is generated from the domain schemas, committed, and diffed in CI, so a breaking route fails the build instead of the launch.",
        ],
        media: {
          src: "/images/projects/antiques-architecture.svg",
          alt: "Diagram of the storefront and admin calling 16 ports in packages/data, with mock and HTTP adapters, the NestJS API, and the shared domain package",
          caption:
            "Two apps, one door to data. The mock and the HTTP adapter answer the same 83 methods. The domain is the only definition.",
        },
      },
      {
        kicker: "06 — Migration",
        heading: "917 pieces, and nothing invented",
        body: [
          "The catalogue came from the gallery's 1stDibs listings: 917 pieces across a four-level taxonomy of 124 categories. The model followed the data, not the other way round. 294 pieces have a diameter and five have no measurement at all, so dimensions became a named map instead of height, width, and depth. A source that says Unknown stores nothing.",
          "The import is an operator command, never a seed. It reports first, refuses to write when its counts disagree with the signed figures, is safe to run twice, and touches catalogue rows only — never an account, a session, or a setting. A piece publishes with exactly the facts its listing states.",
        ],
        media: {
          src: "/images/projects/antiques-admin.png",
          alt: "Admin products list with 917 pieces, prices, leaf categories, and published status",
          caption:
            "917 total, 37 pages. Every row is a piece the import placed in a leaf category, at the price its listing stated.",
        },
      },
      {
        kicker: "07 — Phone",
        heading: "Two columns, and an inquiry that stays",
        body: [
          "On a phone the collection is two columns, the header compacts as you scroll, and the inquiry action stays on screen while the photographs move under it.",
          "The storefront also lost weight while it gained motion. The three animations that pulled a JavaScript runtime into the first load became CSS, and home's first-load script fell from 558 KiB to 476 KiB.",
        ],
        media: {
          src: "/images/projects/antiques-mobile.png",
          alt: "Phone catalogue in two columns, then a pair of famille rose vases with the inquiry action fixed at the bottom",
          caption:
            "Asian Art on a phone. Two columns, a tap, the famille rose pair — and the yellow bar stays put while the photographs scroll.",
          video: "/videos/antiques-mobile.mp4",
        },
      },
      {
        kicker: "08 — Quality",
        heading: "A gate, not a review",
        body: [
          "Typecheck, lint, 4,300+ tests, the build, and the dependency boundaries run in that order on every change. The domain package holds a 90% coverage floor and everything else 80%. The storefront targets WCAG 2.2 AA and holds a Lighthouse accessibility score of 100 in CI.",
          "Work moved through 27 written specifications — specify, plan, tasks, implement — and shipped UI changed only under an exception signed in the roadmap. That discipline is how three people shipped this in four months without the codebase fighting back.",
        ],
      },
      {
        kicker: "09 — Outcome",
        heading: "Live, under the house's own name",
        body: [
          "alexanderantiques.com is live: 939 pieces in seven departments, a collector's portal with a wishlist and threads, the Collector's Letter with confirm-to-subscribe, and a workbench where staff publish, merchandise the home page, invite colleagues, and answer.",
          "Nothing on the site claims more than the house can stand behind. There is no provenance field, because there is no document to back one. That was a product decision, and the schema enforces it.",
        ],
      },
    ],
  },
  {
    slug: "smart-school",
    title: "Smart School — One App, Two Desks",
    eyebrow: "Mobile · PWA + Android · RTL",
    year: "2026",
    role: "Lead Frontend Engineer · Freelance",
    timeline: "6 months · Apr–Oct 2026",
    team: "Small team · I authored 93% of commits",
    intro:
      "Schools on the Maktabsoft platform reached their students through an Android app with 180,000 installs, a 3.4 rating, and reviews that said slow. We rebuilt it from zero — new design, new codebase — as one React app that is a student's school day or a teacher's desk, depending on who signs in, on the web, as a PWA, and on Android.",
    heroMedia: {
      src: "/images/projects/smart-school.png",
      alt: "Smart School student and teacher home screens side by side in Persian, dark theme",
      caption:
        "Same app, two logins. The student opens Results for Bahman, then Dey. The teacher opens grade entry for Math 1, Mehr, types 19, and taps Excellent.",
      video: "/videos/smart-school.mp4",
    },
    metrics: [
      { value: "180K", label: "installs on the app it replaces" },
      { value: "20", label: "live sections across two roles" },
      { value: "99", label: "backend methods wrapped and typed" },
      { value: "587", label: "automated tests" },
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "TanStack Router",
      "TanStack Query",
      "Zustand",
      "Zod",
      "React Hook Form",
      "Tailwind CSS",
      "Motion",
      "Capacitor",
      "PWA",
      "Docker",
      "Umami",
    ],
    sections: [
      {
        kicker: "01 — Problem",
        heading: "A rebuild, not a reskin",
        body: [
          "On paper the old app did the job: the weekly schedule, exams, grades, absences, homework, finances, messages. In practice it sat at 3.4 from 945 votes, and the reviews said it was slow and not worth installing unless the school made you.",
          "The backend stayed — Maktabsoft's school API, used by every school on the platform. Everything in front of it was ours to replace: the design, the codebase, and the release path. Persian, right to left, on whatever phone a family owns.",
        ],
      },
      {
        kicker: "02 — Roles",
        heading: "Two desks in one codebase",
        body: [
          "A student and a teacher come in through the same door, with a school code. After that the router decides. The role is checked in beforeLoad and the wrong one is redirected to its own home — never branched inside a component. Student URLs are frozen because existing users depend on them; teacher paths sit beside them and never collide.",
          "Each section is a vertical slice that exports hooks and types through a public index, and shared UI takes behaviour as props, with no if (role) inside it. Server data lives in TanStack Query, shareable state in Zod-validated search params, the rest in Zustand — and nothing lives in two places, so refresh and back restore the same screen.",
        ],
        media: {
          src: "/images/projects/smart-school-student.png",
          alt: "Three student screens: results by month, an Arabic quiz with text, file, and voice answers, and the weekly schedule by bell",
          caption:
            "The student side. Grades by month with the teacher's name, a quiz that takes text, a file, or a voice note, and the week by bell.",
        },
      },
      {
        kicker: "03 — Teacher",
        heading: "The desk the old app never had",
        body: [
          "The teacher's side is roll call by date and bell, grade entry by class, subject, and term, the points bank, discipline records, homework with a thread per student, virtual classes, surveys, and planning.",
          "A grade sheet is one card per student: present, excused, or absent; a number; a word — Excellent, Good, Average, Needs effort — then group entry and a final submit. Dates are Jalali, and the calendar refuses a day that has not happened yet.",
        ],
        media: {
          src: "/images/projects/smart-school-grades.png",
          alt: "Teacher grade sheet for Math 1 in Mehr beside the roll-call date picker on Mehr 1405 with future days disabled",
          caption:
            "Math 1, Mehr. Each student is a card with attendance, a number, and a word. Beside it, Mehr 1405: the 17th is today, and every day after it is grey.",
        },
      },
      {
        kicker: "04 — Contract",
        heading: "When the documentation is wrong",
        body: [
          "The backend had three sources of truth, and they disagreed: auto-generated method pages, backend documents, and what production actually answers. The generated student docs marked fields as required that production does without. One documented method was dead. A documented member delete failed with the documented body.",
          "So the contract became evidence. Every method that diverges is probed live, ranked — live capture over backend docs over generated docs — and recorded with its session in a contract-exceptions file. 99 methods are wrapped, one file each, and 69 mappers turn wire shapes into types the screens can trust. No component ever sees a raw response.",
        ],
      },
      {
        kicker: "05 — Motion",
        heading: "Measure the phone, then decide what moves",
        body: [
          "The design is glass and gradients, and it has to run on a four-year-old Android. Device specs lie — iOS reports four cores on every iPhone, and deviceMemory punishes 4 GB phones that render fine — so the app measures instead.",
          "Reduced motion or Save-Data selects minimal before the first frame. Everyone else starts at lite, and a 1.4-second frame-rate probe after idle promotes the phone to full at 55 fps, steps it back under 52, or drops it to minimal under 38. Three long tasks inside two seconds also step down. Components read seven permission flags, not the tier, so the look survives and only the motion changes.",
        ],
        media: {
          src: "/images/projects/smart-school-motion.svg",
          alt: "Diagram of adaptive motion: boot tier, frame-rate probe thresholds, and seven motion permissions per tier",
          caption:
            "Boot picks a floor, the probe moves it, and every animated component asks a flag. The gap between 55 and 52 keeps a borderline phone from flickering.",
        },
      },
      {
        kicker: "06 — Release",
        heading: "Deploy once, and every channel updates",
        body: [
          "The Android app is a Capacitor shell that loads the deployed web app, so a web deploy reaches it with no store release. Cafe Bazaar and Myket submissions are kept for native changes — a plugin, a permission.",
          "Every client checks the version every five minutes and whenever the app comes back to the foreground. A newer one reloads the app silently — no please-refresh prompt — and after the reload the changelog appears, written in Persian in the repository. A pending-version guard stops a stale cache from looping the reload.",
        ],
        media: {
          src: "/images/projects/smart-school-update.png",
          alt: "Student home before and after a silent reload, then the automatic update panel for version 1.6.6 with its Persian changelog",
          caption:
            "1.6.5 is on screen when 1.6.6 lands. The app reloads itself, then says what changed — eleven lines, in Persian, from the release file.",
          video: "/videos/smart-school-update.mp4",
        },
      },
      {
        kicker: "07 — Operations",
        heading: "A deploy path with no internet",
        body: [
          "Production builds on a server with no outbound internet. A push to Gitea fires a webhook, Portainer rebuilds the stack, and Docker installs from a private npm mirror with install scripts off. The team has no access to the Portainer UI, so every deploy fix ships through the repository.",
          "Analytics are self-hosted Umami beside the app. Up to five accounts can be linked on one phone, so a family sharing a phone switches between accounts without signing out and back in. Deep links resolve to a safe internal path after login and never carry a token.",
        ],
      },
      {
        kicker: "08 — Outcome",
        heading: "A school day in one app",
        body: [
          "Students get the week, exams, grades by month, attendance, the points bank, homework answered with text, files, or voice, virtual classes, surveys, planning, and finances. Teachers get the desk. Both get announcements that mark themselves read on the server, and both run on the same 60,000 lines of TypeScript behind 587 tests.",
          "Version 1.6.6 is the current release. The old app's reviews were about waiting. This one measures the phone before it animates anything.",
        ],
      },
    ],
  },
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
    year: "2025–2026",
    role: "Full-Stack Engineer (freelance)",
    timeline: "7 months · Sep 2025–Mar 2026",
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
  {
    slug: "propx",
    title: "Propex — The Challenge, Then the Desk",
    eyebrow: "Prop trading · Frontend",
    year: "2025",
    role: "Frontend Engineer · Freelance",
    timeline: "4 months",
    team: "Solo frontend, part-time",
    intro:
      "Propex sells a funded account. Before anyone trades it, three things have to exist: the rules of the challenge, proof of who is taking it, and a person who can answer when either one fails. I built that frontend — public pages, the trader's dashboard, and a super-admin desk — in English and Persian.",
    heroMedia: {
      src: "/images/projects/propx.png",
      alt: "Propex 2-step challenge with identity under review, a 4–8% profit target, 12% max drawdown, and the first rule cards",
      caption:
        "Identity is under review. Instagram is followed. Telegram is still open. Under that: 12% max drawdown, a 4–8% target, and the first rules, marked Limited.",
    },
    metrics: [
      { value: "11", label: "steps in one web session" },
      { value: "18", label: "pages across three roles" },
      { value: "30", label: "typed data hooks" },
      { value: "633", label: "strings, in each language" },
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
    ],
    sections: [
      {
        kicker: "01 — Problem",
        heading: "Three jobs, one login",
        body: [
          "A challenge, an identity check, and a support desk are easy to draw as three products. They are one. The trader who is about to miss a drawdown rule is the same person whose ID photo is in review, and the reply has to land in a thread that knows both.",
          "The shape of the work was 18 pages, two languages, and a sidebar that is a different product depending on who signed in.",
        ],
      },
      {
        kicker: "02 — Challenge",
        heading: "The account, the target, the drawdown",
        body: [
          "The free 2-step challenge is the trader's home. Three tasks gate the account. On this one, identity is already under review, Instagram is followed, and Telegram is still open.",
          "Under the tasks are the numbers that decide the account: 12% max drawdown, a profit target of 4% to 8%, a split of 50% to 100%. Then the rules, each marked Limited, Not Allowed, or Allowed. Copytrade needs an admin. A reset does not exist. The first row is the contract.",
        ],
      },
      {
        kicker: "03 — Identity",
        heading: "The camera is the browser",
        body: [
          "The wizard is 11 steps and it stays in the phone browser. Phone, profile, address, then the document: passport, driver's license, or national ID. Choosing national ID opens the camera on the same page, with a frame and a line that says to put the front of the card inside it.",
          "The card in these frames is a specimen. The name on it is Alex Sample, and it is stamped SAMPLE.",
        ],
        media: {
          src: "/images/projects/propx-kyc.png",
          alt: "Propex identity step on a phone in the dark theme, with the browser camera showing a specimen national ID for Alex Sample",
          caption:
            "The whole session, on a phone, in the dark theme. Phone, profile, address, the specimen card, the verification video, then You're All Set.",
          video: "/videos/propx-kyc.mp4",
        },
      },
      {
        kicker: "04 — Queue",
        heading: "The desk that can see both",
        body: [
          "The super-admin sidebar is the dashboard, identity review, and tickets. A thread is opened by the trader and closed by the desk, and the category on the row says whether it is about KYC, the challenge, or the account.",
          "This queue is the English pass, the same language as the challenge and the camera.",
        ],
        media: {
          src: "/images/projects/propx-tickets.png",
          alt: "Propex super-admin ticket queue in English, with open and closed threads for KYC, the challenge, and the account",
          caption:
            "Five threads. Two are closed. The category is how the desk knows the thread is about the camera, the drawdown, or the withdrawal window.",
        },
      },
      {
        kicker: "05 — Outcome",
        heading: "A path, with a desk at the end",
        body: [
          "A trader can read the rule that will fail them, prove who they are in the same tab, and open a thread the desk can close. The trader's sidebar ends at the threads they opened. The super-admin's sidebar starts at the queue.",
          "English carries the challenge, the camera, and the desk. Persian is the same interface, with the sidebar on the other side.",
        ],
      },
    ],
  },
  {
    slug: "rtl-markdown-editor",
    title: "RTL Markdown Book Editor",
    eyebrow: "Product · Editor",
    year: "2024",
    role: "Full-Stack Engineer",
    timeline: "8 months",
    team: "On-site product team · I owned the editor",
    intro:
      "The manuscript is Persian, so the studio starts from the right. Monaco holds the source, the page beside it is the same text already set, and the toolbar inserts the structures a right-to-left book actually uses — a heading, a footnote, a passage you can jump to.",
    heroMedia: {
      src: "/images/projects/editor.png",
      alt: "Persian chapter in a right-aligned Monaco pane, with the same sentences set in the live preview",
      caption:
        "The new sentence is its own line. The page on the right is that sentence, already set.",
      video: "/videos/editor-preview.mp4",
    },
    metrics: [
      { value: "24", label: "authoring commands on the toolbar" },
      { value: "6", label: "heading levels the contents follow" },
      { value: "2", label: "panes on the same passage" },
      { value: "RTL", label: "text, caret, and toolbar" },
    ],
    stack: ["React", "TypeScript", "Monaco", "markdown-it", "TanStack Query"],
    sections: [
      {
        kicker: "01 — Problem",
        heading: "A book that starts from the right",
        body: [
          "The people writing the book were not writing code. They needed headings, a footnote, a quotation, and a way to land on a later chapter without scrolling the whole manuscript by hand. A generic markdown pane gives you the syntax and leaves the direction to the browser.",
          "Persian text in a left-aligned editor is a different product from a page. The caret ends up on the wrong side of the line, the toolbar starts on the wrong side of the screen, and the preview, when there is one, is a second document you have to trust.",
        ],
      },
      {
        kicker: "02 — Commands",
        heading: "Twenty-four, and one of them is a footnote",
        body: [
          "The toolbar is the whole command set: undo and redo, the inline marks, six heading levels, three lists, a quotation, code, a table, a link, image, video, audio, and a footnote. Media asks for an address. Everything else writes the syntax around the selection.",
          "Here the selection is the last word of the sentence, انار. The footnote command wraps it and drops the note under the line. The page renders the marker and the note in the same moment — markdown-it, with the footnote plugin, not a second renderer.",
        ],
        media: {
          src: "/images/projects/editor-commands.png",
          alt: "Footnote command inserting a Persian note into Monaco and the live preview at the same time",
          caption:
            "انار stays the last word. The marker is in the source, and the page numbers it.",
          video: "/videos/editor-commands.mp4",
        },
      },
      {
        kicker: "03 — Contents",
        heading: "The list is a way of moving",
        body: [
          "A long chapter grows a third pane: فهرست مطالب, built from the same headings the preview renders. Six levels, right-aligned, the current passage a click away.",
          "The click has to move both sides. The preview scrolls the heading to the top of the page. The editor reveals that same heading in the source, caret on the line. بازگشت is the one in this recording — chosen because it starts below the fold, and both panes can still reach it.",
        ],
        media: {
          src: "/images/projects/editor-toc.png",
          alt: "Table of contents jump landing on the بازگشت section in both the editor and the preview",
          caption:
            "The pointer is on بازگشت. The heading is at the top of the page, and on line 41 of the source.",
          video: "/videos/editor-toc.mp4",
        },
      },
      {
        kicker: "04 — Outcome",
        heading: "One manuscript, two views of it",
        body: [
          "What ships is a studio for a right-to-left book: the source and the page stay on the same passage, the toolbar writes the structure in place, and the contents list is how you move through a chapter that no longer fits on one screen.",
          "The same season I also shipped the app builder and a schema-driven form builder. This one is the document: a page you can read while you are still typing it.",
        ],
      },
    ],
  },
];
