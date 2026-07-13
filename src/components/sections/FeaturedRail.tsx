"use client";

import { useRef } from "react";
import type { Project } from "@/lib/data";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { MediaFrame } from "@/components/sections/MediaFrame";
import { TransitionLink } from "@/components/providers/Transition";
import { Reveal } from "@/components/anim/Reveal";

/**
 * Featured work as a pinned horizontal rail on desktop (scroll scrubs the
 * track sideways), falling back to a vertical stack below lg. One DOM, two
 * layouts — gsap.matchMedia owns the difference.
 */
export function FeaturedRail({ projects }: { projects: Project[] }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!pin || !track) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        const progress = progressRef.current
          ? gsap.to(progressRef.current, {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: pin,
                start: "top top",
                end: () => `+=${distance()}`,
                scrub: true,
              },
            })
          : null;
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          progress?.scrollTrigger?.kill();
          progress?.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: pinRef },
  );

  return (
    <div ref={pinRef} className="relative lg:flex lg:h-dvh lg:flex-col lg:justify-center lg:overflow-hidden">
      <div
        ref={trackRef}
        className="flex flex-col gap-20 will-change-transform lg:flex-row lg:items-stretch lg:gap-[6vw] lg:pl-[2vw] lg:pr-[16vw]"
      >
        {projects.map((p, i) => (
          <FeaturedPanel key={p.slug} project={p} index={i} />
        ))}
      </div>

      {/* Rail progress (desktop only) */}
      <div className="mt-10 hidden h-px w-full bg-line lg:block">
        {/* scaleX via inline transform, not Tailwind's `scale-x-0` — v4 emits
            the native `scale` property, which would zero out GSAP's transform. */}
        <div ref={progressRef} style={{ transform: "scaleX(0)" }} className="h-px origin-left bg-accent" />
      </div>
    </div>
  );
}

function FeaturedPanel({ project, index }: { project: Project; index: number }) {
  const href = project.caseStudy ? `/work/${project.slug}` : project.link ?? project.repo;
  const external = !!href && !project.caseStudy;
  const cursorLabel = project.caseStudy
    ? "View case →"
    : project.repo
      ? "Open repo ↗"
      : project.link
        ? "Visit live ↗"
        : undefined;

  const media = (
    <div className="group relative overflow-hidden rounded-2xl border border-line bg-ink-soft">
      <MediaFrame
        media={project.media}
        className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute left-5 top-5 rounded-full border border-line-strong bg-ink/60 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-fg-dim backdrop-blur-sm">
        {project.category}
      </span>
    </div>
  );

  return (
    <Reveal className="w-full shrink-0 lg:w-[56vw]">
      <article className="flex flex-col gap-6">
        {href ? (
          project.caseStudy ? (
            <TransitionLink
              href={href}
              ariaLabel={`Open case study: ${project.title}`}
              dataCursorLabel={cursorLabel}
            >
              {media}
            </TransitionLink>
          ) : (
            <a
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              aria-label={`Open ${project.title}`}
              data-cursor-label={cursorLabel}
            >
              {media}
            </a>
          )
        ) : (
          media
        )}

        <div className="flex items-start justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl font-semibold leading-tight md:text-3xl">
                {project.title}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-fg-dim">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.slice(0, 6).map((s) => (
                <span key={s} className="rounded-full border border-line px-3 py-1 text-xs text-fg-dim">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-3">
            <span className="font-mono text-xs text-muted">{project.year}</span>
            {project.caseStudy && (
              <TransitionLink
                href={`/work/${project.slug}`}
                className="group/link inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-accent"
              >
                Case study
                <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
              </TransitionLink>
            )}
            {!project.caseStudy && project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-accent"
              >
                GitHub
                <span className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                  ↗
                </span>
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
