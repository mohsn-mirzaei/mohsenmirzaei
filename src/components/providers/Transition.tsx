"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type TransitionContextValue = {
  /** Navigate with the curtain transition (falls back to instant nav). */
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
});

export const usePageTransition = () => useContext(TransitionContext);

/**
 * Route transitions: a curtain sweeps up over the old page, the router swaps
 * routes underneath, then the curtain lifts off the new one. Browser
 * back/forward skips the sweep-in but still gets a clean reveal.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const covering = useRef(false);
  const lastPath = useRef(pathname);

  const navigate = useCallback(
    (href: string) => {
      if (prefersReducedMotion() || !curtainRef.current) {
        router.push(href);
        return;
      }
      if (covering.current) return;
      covering.current = true;

      globalThis.__lenis?.stop();
      // GSAP owns the curtain's position exclusively (see the JSX comment):
      // establish the start state and unhide in one set, then sweep up.
      gsap.set(curtainRef.current, { yPercent: 100, visibility: "visible" });
      gsap.to(curtainRef.current, {
        yPercent: 0,
        duration: 0.55,
        ease: "power4.inOut",
        onComplete: () => router.push(href),
      });
    },
    [router],
  );

  // New route mounted: reset scroll, then lift the curtain (if it's down).
  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;

    const lenis = globalThis.__lenis;
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();

    const reveal = () => {
      if (!covering.current || !curtainRef.current) return;
      gsap.to(curtainRef.current, {
        yPercent: -100,
        duration: 0.65,
        ease: "power4.inOut",
        delay: 0.1,
        onComplete: () => {
          covering.current = false;
          gsap.set(curtainRef.current, { yPercent: 100, visibility: "hidden" });
          lenis?.start();
        },
      });
    };

    // Deep links like /#work: jump there instantly while the curtain still
    // covers the page, so the lift reveals the right section. The reveal
    // must wait for this jump to land first — it previously ran on its own
    // 350ms timeout while the lift started after only 100ms, so the curtain
    // was already rising over the wrong scroll position before the jump fired.
    // `force: true` — lenis is stopped until the curtain finishes.
    const hash = window.location.hash.slice(1);
    if (hash) {
      // Pins shift offsets as they register; wait a couple frames so
      // ScrollTrigger has settled numbers before measuring and revealing.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(hash);
          ScrollTrigger.refresh();
          if (el) {
            if (lenis) lenis.scrollTo(el, { immediate: true, force: true });
            else el.scrollIntoView();
            ScrollTrigger.update();
          }
          reveal();
        });
      });
    } else {
      reveal();
    }
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={curtainRef}
        aria-hidden
        // GSAP owns this element's position exclusively; CSS must not set an
        // initial offset. Tailwind v4's `translate-y-full` writes the separate
        // native `translate` property (stacks on top of GSAP's transform), and
        // an inline `transform: translateY(100%)` is read back by GSAP as a
        // pixel offset (computed matrices lose % units) that then shifts every
        // yPercent tween by a full viewport. `invisible` sidesteps both — the
        // curtain is unhidden by navigate() right before it sweeps in.
        className="invisible fixed inset-0 z-[85] bg-ink-soft will-change-transform"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-accent" />
        <div className="flex h-full items-center justify-center">
          <span className="eyebrow animate-pulse">Mohsen Mirzaei</span>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

/** Anchor that routes through the curtain transition. */
export function TransitionLink({
  href,
  children,
  className,
  ariaLabel,
  dataCursorLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  dataCursorLabel?: string;
}) {
  const { navigate } = usePageTransition();
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      data-cursor-label={dataCursorLabel}
      className={className}
      onClick={(e) => {
        // Let modified clicks (new tab etc.) behave natively.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}
