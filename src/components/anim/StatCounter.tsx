"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Counts a stat up from 0 when it scrolls into view. Handles values like
 * "14k+", "61%", "0", "100%", "~9.5K" — the numeric part animates, the
 * prefix/suffix stay put. Real value stays in the DOM for SEO/no-JS.
 */
export function StatCounter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (prefersReducedMotion() || !el) return;

      const match = value.match(/^([^0-9]*)([0-9.,]+)(.*)$/);
      if (!match) return; // non-numeric value — leave as-is
      const [, prefix, num, suffix] = match;
      const target = parseFloat(num.replace(/,/g, ""));
      if (Number.isNaN(target)) return;
      const decimals = num.includes(".") ? num.split(".")[1].length : 0;

      const state = { n: 0 };
      gsap.to(state, {
        n: target,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => {
          el.textContent = `${prefix}${state.n.toFixed(decimals)}${suffix}`;
        },
        onComplete: () => {
          el.textContent = value;
        },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
