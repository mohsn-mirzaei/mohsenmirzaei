"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { markSiteReady } from "@/lib/ready";
import { site } from "@/lib/site";

/**
 * First-visit preloader: a counter climbs to 100 while the name reveals,
 * then the curtain lifts and hands off to the hero intro (via markSiteReady).
 * Skipped for repeat visits in the same session and for reduced motion.
 */
export function Preloader() {
  const [show, setShow] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const seen = sessionStorage.getItem("preloaded") === "1";
    if (seen || prefersReducedMotion()) {
      markSiteReady();
      return;
    }
    sessionStorage.setItem("preloaded", "1");
    // sessionStorage is unreadable during SSR, so the first-visit decision has
    // to land in an effect; this single setState mounts the overlay once.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show || !rootRef.current) return;

    const root = rootRef.current;
    const counter = root.querySelector<HTMLElement>("[data-counter]")!;
    const nameEl = root.querySelector<HTMLElement>("[data-name]")!;
    const barEl = root.querySelector<HTMLElement>("[data-bar]")!;

    const lenis = globalThis.__lenis;
    lenis?.stop();
    document.documentElement.classList.add("is-loading");

    const state = { n: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.classList.remove("is-loading");
        lenis?.start();
        markSiteReady();
        setShow(false);
      },
    });

    tl.fromTo(
      nameEl,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.7, ease: "power4.out" },
      0.1,
    )
      .to(
        state,
        {
          n: 100,
          duration: 1.15,
          ease: "power2.inOut",
          onUpdate: () => {
            counter.textContent = String(Math.round(state.n)).padStart(3, "0");
          },
        },
        0.1,
      )
      .fromTo(
        barEl,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.15, ease: "power2.inOut" },
        0.1,
      )
      .to([nameEl, counter], { yPercent: -110, duration: 0.45, ease: "power3.in" }, "+=0.1")
      .to(root, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      });

    return () => {
      tl.kill();
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink px-[clamp(1.25rem,5vw,6rem)] py-10"
    >
      <div className="flex items-center justify-between">
        <span className="eyebrow">Portfolio · {new Date().getFullYear()}</span>
        <span className="eyebrow">{site.location}</span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="overflow-hidden">
          <div data-name className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
            {site.name}
            <span className="text-accent">.</span>
          </div>
        </div>
        <div className="overflow-hidden">
          <div data-counter className="font-mono text-3xl text-accent tabular-nums md:text-5xl">
            000
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-line">
        {/* scaleX via inline transform, not Tailwind's `scale-x-0` — v4 emits
            the native `scale` property, which would zero out GSAP's transform. */}
        <div data-bar style={{ transform: "scaleX(0)" }} className="h-px origin-left bg-accent" />
      </div>
    </div>
  );
}
