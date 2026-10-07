# Mohsen Mirzaei — Portfolio

An award-worthy, interactive personal portfolio built for **maximum discoverability**
(Google + AI search) and a **cinematic, high-performance** experience.

- **Framework:** Next.js 16 (App Router) · React 19 · TypeScript
- **Styling:** Tailwind CSS v4 + a custom design-token system
- **Motion:** GSAP (ScrollTrigger + free SplitText) + Lenis smooth scroll
- **3D:** Three.js via React Three Fiber + drei (lazy-loaded WebGL hero)

## Quick start

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm test
pnpm build    # applies pending migrations, then builds
pnpm start    # serve the production build
```

Copy `example.env` to `.env.local` and fill in Postgres, Resend, admin login, and Upstash.

## Why it ranks (SEO + AI discoverability)

Everything a crawler needs is in the **server-rendered HTML**. The marketing
pages revalidate hourly, so non-JS bots (GPTBot, ClaudeBot, PerplexityBot,
Googlebot) see content and structured data without running client JavaScript.

- **JSON-LD `@graph`** (`Person` + `WebSite` + `ProfilePage`) in the initial HTML,
  with `sameAs` links — the single strongest "this is the same person" signal for
  search engines and LLMs. See `src/lib/jsonld.ts`.
- **Rich metadata**: Open Graph (`profile`), Twitter cards, canonical URL, keywords,
  and a dynamically generated OG image (`src/app/opengraph-image.tsx`).
- **`robots.ts`** explicitly welcomes the major AI crawlers.
- **`sitemap.ts`** + **`public/llms.txt`** (a curated, markdown index for AI agents).
- **Semantic HTML** with a correct `h1 → h2 → h3` hierarchy and descriptive alt text.

## Performance & accessibility

- The WebGL scene is **lazy-loaded**, skipped for reduced-motion / low-core devices,
  and its render loop is **unmounted when the hero scrolls out of view**.
- `prefers-reduced-motion` is treated as a **parallel experience**: all GSAP/Lenis
  motion is disabled and content is always visible (no JS-gated content).
- Capped DPR, adaptive DPR, and a CSS fallback gradient keep things at 60fps.

## Customize

| What | Where |
| --- | --- |
| Name, role, email, social links, domain | `src/lib/site.ts` |
| Experience, projects, case studies, articles, testimonials, courses | Admin at `/admin` (Postgres) |
| Skills, stats, about pillars | `src/lib/data.ts` |
| Colors, fonts, motion tokens | `src/app/globals.css` (`@theme`) |
| Portrait photo | `public/images/mohsen-portrait.jpg` |
| CV | `public/mohsen-mirzaei-resume.pdf` |
| AI index | `public/llms.txt` |

## Deploy

`pnpm build` runs `prisma migrate deploy` before `next build`. On Vercel, set the variables from `example.env` (Postgres is required at build time). Push to the connected repo, or:

```bash
pnpm build && pnpm start
```

After deploying, submit the domain to Google Search Console and validate the
structured data with Google's Rich Results Test and the Schema.org validator.
