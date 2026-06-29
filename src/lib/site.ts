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
  role: "Frontend-Focused Full-Stack Software Engineer",
  roleLong: "Frontend-Focused Full Stack Software Engineer",
  tagline:
    "I build production-grade web platforms — real-time trading systems, AI products, and fintech apps — from architecture down to the last pixel.",
  shortBio:
    "Frontend-focused full-stack software engineer with 4+ years building production web applications across fintech, crypto exchange, and AI-powered SaaS. I architect scalable TypeScript applications, modern backend services, and real-time systems with strong ownership from design through production.",
  location: "Isfahan, Iran",
  availability:
    "Open to senior frontend & full-stack roles · Remote (GMT+3:30) · Open to relocation",
  email: "hello@mohsenmirzaei.com",
  url: "https://mohsenmirzaei.com",
  // Authoritative profiles — the SEO/AI "sameAs" graph. Replace handles.
  socials: {
    github: "https://github.com/mohsn-mirzaei",
    linkedin: "https://www.linkedin.com/in/mohsenmirzaeii/",
    x: "https://x.com/mohsenmirzaei",
    email: "mailto:hello@mohsenmirzaei.com",
  },
  // Optional: a downloadable CV placed in /public.
  resumeUrl: "/mohsen-mirzaei-resume.pdf",
  yearsExperience: 4,
  // Keywords reinforce search/AI discovery and are reused in <meta> + JSON-LD.
  keywords: [
    "Mohsen Mirzaei",
    "Mohsen Mirzaei developer",
    "Mohsen Mirzaei frontend engineer",
    "Frontend-Focused Full-Stack Software Engineer",
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
