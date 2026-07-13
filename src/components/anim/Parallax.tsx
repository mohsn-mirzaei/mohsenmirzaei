"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Scroll-scrubbed parallax: the inner layer drifts vertically as the outer
 * element crosses the viewport. Wrap media in it (outer must clip overflow;
 * inner is rendered slightly oversized to hide the drift edges).
 */
export function Parallax({
  children,
  className,
  innerClassName,
  amount = 10,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Total drift in percent of the inner element's height. */
  amount?: number;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !outerRef.current || !innerRef.current) return;
      gsap.fromTo(
        innerRef.current,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: "none",
          scrollTrigger: {
            trigger: outerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: outerRef },
  );

  return (
    <div ref={outerRef} className={`overflow-hidden ${className ?? ""}`}>
      <div ref={innerRef} className={`will-change-transform ${innerClassName ?? ""}`} style={{ scale: 1 + amount / 70 }}>
        {children}
      </div>
    </div>
  );
}
