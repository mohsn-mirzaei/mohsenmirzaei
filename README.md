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
pnpm build    # production build (fully static)
pnpm start    # serve the production build
```

## Why it ranks (SEO + AI discoverability)

Everything a crawler needs is in the **server-rendered HTML** — the page is fully
static (`○ Static`), so non-JS bots (GPTBot, ClaudeBot, PerplexityBot, Googlebot)
see all content and structured data immediately.

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
| Experience, projects, skills, stats | `src/lib/data.ts` |
| Colors, fonts, motion tokens | `src/app/globals.css` (`@theme`) |
| Portrait photo | `public/images/mohsen-portrait.jpg` |
| AI index | `public/llms.txt` |

> **Before deploying:** update the placeholder values in `src/lib/site.ts`
> (real domain, GitHub/LinkedIn/X URLs, email) and confirm the `period` dates in
> `src/lib/data.ts`. The `sameAs` links and canonical `url` power discoverability.
> Optionally drop a CV at `public/mohsen-mirzaei-resume.pdf`.

## Deploy

Designed for Vercel (zero-config). Push to a repo and import, or:

```bash
pnpm build && pnpm start
```

After deploying, submit the domain to Google Search Console and validate the
structured data with Google's Rich Results Test and the Schema.org validator.
