/**
 * Central site configuration.
 *
 * Powers SEO metadata, the JSON-LD `sameAs` graph (the single strongest
 * "this is the same person" signal for Google + AI crawlers), the contact
 * section, and llms.txt.
 */
export const site = {
  name: "Mohsen Mirzaei",
  firstName: "Mohsen",
  lastName: "Mirzaei",
  role: "Full-Stack Engineer",
  roleLong: "Full-Stack Engineer · TypeScript / React / Node.js",
  tagline:
    "I build production web platforms — React/Next.js frontends, Node.js/Fastify services, real-time systems, and RAG-powered AI products.",
  shortBio:
    "Full-stack engineer with 4+ years building production web applications across fintech, crypto exchange, and AI SaaS. TypeScript across the stack — React/Next.js frontends and Node.js/Fastify/PostgreSQL services — with experience building real-time systems and RAG-powered applications. Strong ownership from architecture to production: testing, CI/CD, and observability.",
  location: "Isfahan, Iran",
  availability:
    "Open to full-stack & senior frontend roles · Remote (GMT+3:30) · Open to relocation (EU)",
  email: "mohsn.mirzaei@gmail.com",
  url: "https://mohsenmirzaei.com",
  // Authoritative profiles — the SEO/AI "sameAs" graph. Replace handles.
  socials: {
    github: "https://github.com/mohsn-mirzaei",
    linkedin: "https://www.linkedin.com/in/mohsenmirzaeii/",
    x: "https://x.com/mohsenmirzaei",
    email: "mailto:mohsn.mirzaei@gmail.com",
  },
  // Optional: a downloadable CV placed in /public.
  resumeUrl: "/mohsen-mirzaei-resume.pdf",
  yearsExperience: 4,
  // Keywords reinforce search/AI discovery and are reused in <meta> + JSON-LD.
  keywords: [
    "Mohsen Mirzaei",
    "Mohsen Mirzaei developer",
    "Mohsen Mirzaei frontend engineer",
    "Full-Stack Engineer",
    "TypeScript React Node.js engineer",
    "Frontend Engineer",
    "Full-Stack Engineer",
    "React developer",
    "Next.js developer",
    "TypeScript engineer",
    "Go familiar",
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
