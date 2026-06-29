/**
 * Central site configuration.
 *
 * NOTE FOR MOHSEN: update the placeholder links/email/domain below with your
 * real values. These power SEO metadata, the JSON-LD `sameAs` graph (the single
 * strongest "this is the same person" signal for Google + AI crawlers), the
 * contact section, and llms.txt. The more authoritative profiles you list, the
 * easier you are to find.
 */
export const site = {
  name: "Mohsen Mirzaei",
  firstName: "Mohsen",
  lastName: "Mirzaei",
  // Primary professional title. Kept honest ("Frontend Engineer") rather than
  // inflated — credibility matters more than a louder label.
  role: "Frontend Engineer",
  roleLong: "Frontend & Full-Stack Engineer",
  tagline:
    "I build production-grade web platforms — real-time trading systems, AI products, and fintech apps — from architecture down to the last pixel.",
  shortBio:
    "Frontend engineer specializing in React, TypeScript and real-time, monorepo-scale architecture. I ship end-to-end products across crypto, fintech and AI SaaS — often as the sole engineer.",
  location: "Iran",
  availability: "Open to senior frontend & full-stack roles · Remote (GMT+3:30) · Open to EU relocation",
  email: "hello@mohsenmirzaei.dev",
  // Canonical production URL. Change to your real domain before deploying.
  url: "https://mohsenmirzaei.dev",
  // Authoritative profiles — the SEO/AI "sameAs" graph. Replace handles.
  socials: {
    github: "https://github.com/mohsenmirzaei",
    linkedin: "https://www.linkedin.com/in/mohsenmirzaei",
    x: "https://x.com/mohsenmirzaei",
    email: "mailto:hello@mohsenmirzaei.dev",
  },
  // Optional: a downloadable CV placed in /public.
  resumeUrl: "/mohsen-mirzaei-resume.pdf",
  yearsExperience: 4,
  // Keywords reinforce search/AI discovery and are reused in <meta> + JSON-LD.
  keywords: [
    "Mohsen Mirzaei",
    "Mohsen Mirzaei developer",
    "Mohsen Mirzaei frontend engineer",
    "Frontend Engineer",
    "Full-Stack Engineer",
    "React developer",
    "Next.js developer",
    "TypeScript engineer",
    "Software Engineer Iran",
    "Real-time trading UI",
    "WebSocket engineer",
    "Monorepo architecture",
    "Feature-Sliced Design",
    "AI SaaS engineer",
    "Fintech frontend",
  ],
} as const;

export type Social = keyof typeof site.socials;
