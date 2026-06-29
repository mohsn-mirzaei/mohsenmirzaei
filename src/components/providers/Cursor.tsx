"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * A subtle custom cursor: a small dot that trails the pointer and expands over
 * interactive elements (`a`, `button`, `[data-cursor]`). Disabled on touch and
 * for reduced-motion users — the native cursor remains the source of truth.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

    let shown = false;
    const move = (e: PointerEvent) => {
      if (!shown) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
        shown = true;
      }
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const isInteractive = (el: Element | null) =>
      !!el?.closest("a, button, [data-cursor], input, textarea");

    const over = (e: PointerEvent) => {
      if (isInteractive(e.target as Element)) {
        gsap.to(ring, { scale: 2.4, borderColor: "rgba(214,255,63,0.9)", duration: 0.3 });
        gsap.to(dot, { scale: 0.4, duration: 0.3 });
      } else {
        gsap.to(ring, { scale: 1, borderColor: "rgba(245,245,240,0.4)", duration: 0.3 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border"
        style={{ borderColor: "rgba(245,245,240,0.4)" }}
      />
      <div ref={dotRef} className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent" />
    </div>
  );
}
