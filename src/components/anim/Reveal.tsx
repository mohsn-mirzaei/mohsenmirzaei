"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { onSiteReady } from "@/lib/ready";

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
 * users always see it. On first load the tween waits for the preloader
 * curtain (onSiteReady) so intros don't finish behind it.
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
    (_, contextSafe) => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.set(ref.current, { autoAlpha: 0, y });
      const play = contextSafe!(() => {
        gsap.to(ref.current, {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start },
        });
      });
      return onSiteReady(play);
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
