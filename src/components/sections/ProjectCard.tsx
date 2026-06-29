"use client";

import { useRef } from "react";
import type { Project } from "@/lib/data";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(ref.current, {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 90%" },
      });
    },
    { scope: ref },
  );

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const href = project.link ?? project.repo;

  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft/50 p-7 transition-colors duration-500 hover:border-line-strong md:p-9"
      data-cursor
    >
      {/* pointer spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), rgba(214,255,63,0.10), transparent 60%)",
        }}
      />

      <div className="relative flex items-center justify-between">
        <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
        <span className="font-mono text-xs text-muted">{project.year}</span>
      </div>

      <div className="relative mt-8 flex flex-1 flex-col">
        <p className="eyebrow">{project.category}</p>
        <h3 className="mt-3 font-display text-2xl font-semibold leading-tight md:text-3xl">
          {project.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-fg-dim">{project.description}</p>

        <ul className="mt-5 flex flex-col gap-2">
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
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
          className="absolute inset-0"
          aria-label={`Open ${project.title}`}
        />
      )}
    </article>
  );
}
