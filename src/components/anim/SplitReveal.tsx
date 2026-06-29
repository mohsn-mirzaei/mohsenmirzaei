"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type SplitRevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  start?: string;
  stagger?: number;
  /** When true, animate by word for tighter control; otherwise by line. */
  byWord?: boolean;
};

type PolymorphicTag = React.ComponentType<{
  ref?: React.Ref<HTMLElement>;
  className?: string;
  children?: ReactNode;
}>;

/**
 * Masked, line-by-line heading reveal using GSAP's (now free) SplitText.
 * Text stays in the DOM verbatim, so crawlers read the full heading.
 */
export function SplitReveal({
  children,
  className,
  as,
  start = "top 85%",
  stagger = 0.1,
  byWord = false,
}: SplitRevealProps) {
  const Tag = (as ?? "h2") as unknown as PolymorphicTag;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const type = byWord ? "words" : "lines";
      const split = new SplitText(ref.current, {
        type,
        mask: type,
      });
      const targets = byWord ? split.words : split.lines;
      gsap.from(targets, {
        yPercent: 115,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger,
        scrollTrigger: { trigger: ref.current, start },
      });
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
