"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

/**
 * Lazily mounts the WebGL scene only when it's worth it:
 *  - skips reduced-motion users and very low-core devices (static gradient fallback)
 *  - unmounts the render loop when the hero scrolls out of view (saves the GPU)
 */
export function HeroCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const [capable, setCapable] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lowPower = (navigator.hardwareConcurrency ?? 4) <= 2;
    if (lowPower) return;
    // Device capability is only knowable on the client, post-hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCapable(true);

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "150px" },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Always-present CSS fallback so there's depth even without WebGL. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 70% 35%, rgba(214,255,63,0.10), transparent 60%), radial-gradient(50% 50% at 25% 75%, rgba(255,94,58,0.08), transparent 60%)",
        }}
      />
      {capable && inView && <Scene />}
      {/* Bottom fade into the page. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
    </div>
  );
}
