import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="section-px border-t border-line py-10">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-display text-sm font-semibold">{site.name}</span>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-fg-dim">
          <a className="transition-colors hover:text-fg" href={site.socials.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="transition-colors hover:text-fg" href={site.socials.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="transition-colors hover:text-fg" href={site.socials.x} target="_blank" rel="noopener noreferrer">
            X / Twitter
          </a>
          <a className="transition-colors hover:text-fg" href={site.socials.email}>
            Email
          </a>
        </nav>

        <p className="text-xs text-muted">
          © {year} · Built with Next.js, GSAP &amp; Three.js
        </p>
      </div>
    </footer>
  );
}
