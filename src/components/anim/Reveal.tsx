"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  y?: number;
  delay?: number;
  duration?: number;
  start?: string;
};

// Polymorphic tag rendered with a ref: cast to a single concrete component type
// so the intrinsic-element union doesn't collapse children to `never` (or blow
// up into an "union too complex" error).
type PolymorphicTag = React.ComponentType<{
  ref?: React.Ref<HTMLElement>;
  className?: string;
  children?: ReactNode;
}>;

/**
 * Scroll-triggered fade/translate reveal. Content is real DOM (good for SEO);
 * GSAP only sets the hidden state on the client, so no-JS / reduced-motion
 * users always see it.
 */
export function Reveal({
  children,
  className,
  as,
  y = 28,
  delay = 0,
  duration = 0.9,
  start = "top 88%",
}: RevealProps) {
  const Tag = (as ?? "div") as unknown as PolymorphicTag;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(ref.current, {
        autoAlpha: 0,
        y,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
