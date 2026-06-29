"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollToId } from "@/lib/lenis";
import { site } from "@/lib/site";
import { MagneticButton } from "@/components/anim/MagneticButton";

const NAV = [
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

export function Header() {
  const barRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (barRef.current) {
          gsap.set(barRef.current, { scaleX: self.progress });
        }
        setScrolled(self.scroll() > 40);
      },
    });
    return () => st.kill();
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-ink/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div
        ref={barRef}
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent"
      />
      <nav className="section-px flex h-16 items-center justify-between md:h-20">
        <a
          href="#top"
          onClick={go("top")}
          className="group flex items-center gap-2.5 font-display text-sm font-semibold tracking-tight"
        >
          <span className="h-2 w-2 rounded-full bg-accent transition-transform duration-500 group-hover:scale-150" />
          {site.name}
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={go(item.id)}
              className="relative px-4 py-2 text-sm text-fg-dim transition-colors hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </div>

        <MagneticButton
          onClick={() => scrollToId("contact")}
          ariaLabel="Get in touch"
          className="rounded-full border border-line-strong px-5 py-2 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
        >
          Let&apos;s talk
        </MagneticButton>
      </nav>
    </header>
  );
}
