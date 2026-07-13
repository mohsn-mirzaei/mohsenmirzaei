"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  ariaLabel?: string;
  download?: string | boolean;
};

/** A button/link that subtly pulls toward the pointer (magnetic effect). */
export function MagneticButton({
  children,
  href,
  onClick,
  className,
  strength = 0.4,
  ariaLabel,
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const el = ref.current;
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1,0.4)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1,0.4)" });

      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref },
  );

  const common = { ref, className, "aria-label": ariaLabel } as const;

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto");
    return (
      <a
        {...common}
        href={href}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <button {...common} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
