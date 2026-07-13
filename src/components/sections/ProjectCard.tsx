"use client";

import { useRef } from "react";
import type { Project } from "@/lib/data";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { onSiteReady } from "@/lib/ready";
import { MediaFrame } from "@/components/sections/MediaFrame";

/** Compact card for the non-featured "More work" grid. */
export function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.set(ref.current, { autoAlpha: 0, y: 40 });
      const play = contextSafe!(() => {
        gsap.to(ref.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 90%" },
        });
      });
      return onSiteReady(play);
    },
    { scope: ref },
  );

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const href = project.link ?? project.repo;
  const cursorLabel = project.repo ? "Open repo ↗" : project.link ? "Visit live ↗" : undefined;

  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft/50 transition-colors duration-500 hover:border-line-strong"
      data-cursor
      data-cursor-label={cursorLabel}
    >
      {/* pointer spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), rgba(214,255,63,0.08), transparent 60%)",
        }}
      />

      <div className="relative overflow-hidden border-b border-line">
        <MediaFrame
          media={project.media}
          className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
      </div>

      <div className="relative flex flex-1 flex-col p-7 md:p-8">
        <div className="flex items-center justify-between">
          <p className="eyebrow">{project.category}</p>
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>
        <h3 className="mt-3 font-display text-2xl font-semibold leading-tight">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-fg-dim">{project.description}</p>

        <ul className="mt-4 flex flex-col gap-2">
          {project.bullets.slice(0, 2).map((b) => (
            <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 6).map((s) => (
              <span key={s} className="rounded-full border border-line px-3 py-1 text-xs text-fg-dim">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-20"
          aria-label={`Open ${project.title}`}
        />
      )}
    </article>
  );
}
