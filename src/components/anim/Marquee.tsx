const TECH = [
  "React 19",
  "TypeScript",
  "Next.js",
  "WebSocket",
  "Three.js",
  "GSAP",
  "TanStack Query",
  "Turborepo",
  "Feature-Sliced Design",
  "Node.js",
  "Fastify",
  "PostgreSQL",
  "Redis",
  "Tailwind CSS",
  "Zustand",
  "Zod",
  "Docker",
  "OpenTelemetry",
];

export function Marquee() {
  const items = [...TECH, ...TECH];
  return (
    <div
      aria-hidden
      className="relative flex overflow-hidden border-y border-line py-6 select-none"
    >
      <div className="marquee-track">
        {items.map((t, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-8 font-display text-2xl text-fg-dim md:text-4xl">
            {t}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
