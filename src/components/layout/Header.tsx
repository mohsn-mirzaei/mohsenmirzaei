"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { scrollToId } from "@/lib/lenis";
import { site } from "@/lib/site";
import { MagneticButton } from "@/components/anim/MagneticButton";
import { usePageTransition } from "@/components/providers/Transition";
import { LocalTime } from "@/components/layout/LocalTime";
import { LogoMark } from "@/components/layout/LogoMark";

const NAV = [
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Notes", id: "notes" },
  { label: "Contact", id: "contact" },
];

export function Header() {
  const barRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { navigate } = usePageTransition();
  const onHome = pathname === "/";

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
  }, [pathname]);

  // Track which section is in view (homepage only) for the nav active state.
  useEffect(() => {
    if (!onHome) return;
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  // Fullscreen mobile menu open/close choreography.
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const lenis = globalThis.__lenis;

    if (menuOpen) {
      lenis?.stop();
      document.documentElement.classList.add("menu-open");
      const links = menu.querySelectorAll("[data-menu-link]");
      const meta = menu.querySelectorAll("[data-menu-meta]");
      const tl = gsap.timeline();
      tl.set(menu, { pointerEvents: "auto" })
        .to(menu, { autoAlpha: 1, duration: 0.35, ease: "power2.out" })
        .fromTo(
          links,
          { yPercent: 120 },
          { yPercent: 0, duration: prefersReducedMotion() ? 0 : 0.7, ease: "power4.out", stagger: 0.06 },
          "-=0.1",
        )
        .fromTo(
          meta,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.05 },
          "-=0.4",
        );
      return () => {
        tl.kill();
      };
    }
    document.documentElement.classList.remove("menu-open");
    lenis?.start();
    gsap.to(menu, { autoAlpha: 0, duration: 0.3, ease: "power2.in" });
    gsap.set(menu, { pointerEvents: "none" });
  }, [menuOpen]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    if (onHome) {
      scrollToId(id);
    } else {
      navigate(`/#${id}`);
    }
  };

  // Only meaningful on the homepage — elsewhere no section is "current".
  const currentId = onHome ? activeId : null;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled && !menuOpen ? "bg-ink/70 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div
          ref={barRef}
          // Initial scale via `transform` (not Tailwind's `scale-x-0`): in
          // Tailwind v4 that utility emits the native `scale` property, which
          // multiplies with the `transform` GSAP animates and pins this to 0.
          style={{ transform: "scaleX(0)" }}
          className="absolute inset-x-0 top-0 h-px origin-left bg-accent"
        />
        <nav className="section-px flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              if (onHome) scrollToId("top");
              else navigate("/");
            }}
            className="group relative z-[81] flex items-center gap-2 font-display text-sm font-semibold tracking-tight"
          >
            <LogoMark className="h-6 w-auto transition-transform duration-500 group-hover:scale-110" />
            {site.name}
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={onHome ? `#${item.id}` : `/#${item.id}`}
                onClick={go(item.id)}
                className={`nav-link relative px-4 py-2 text-sm transition-colors hover:text-fg ${
                  currentId === item.id ? "text-fg" : "text-fg-dim"
                }`}
                aria-current={currentId === item.id ? "true" : undefined}
              >
                {item.label}
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300 ease-out ${
                    currentId === item.id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <MagneticButton
              onClick={() => {
                setMenuOpen(false);
                if (onHome) scrollToId("contact");
                else navigate("/#contact");
              }}
              ariaLabel="Get in touch"
              className="hidden rounded-full border border-line-strong px-5 py-2 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent md:inline-flex"
            >
              Let&apos;s talk
            </MagneticButton>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative z-[81] flex h-11 w-11 items-center justify-center rounded-full border border-line-strong md:hidden"
            >
              <span
                className={`absolute h-px w-4 bg-fg transition-transform duration-300 ${
                  menuOpen ? "rotate-45" : "-translate-y-[3px]"
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-fg transition-transform duration-300 ${
                  menuOpen ? "-rotate-45" : "translate-y-[3px]"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen mobile menu */}
      <div
        ref={menuRef}
        className="pointer-events-none fixed inset-0 z-[80] flex flex-col justify-between bg-ink px-6 pb-10 pt-28 opacity-0 md:hidden"
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col gap-2">
          {NAV.map((item, i) => (
            <a
              key={item.id}
              href={onHome ? `#${item.id}` : `/#${item.id}`}
              onClick={go(item.id)}
              className="group flex items-baseline gap-4 overflow-hidden py-1"
              tabIndex={menuOpen ? 0 : -1}
            >
              <span data-menu-link className="flex items-baseline gap-4 will-change-transform">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <span className="font-display text-5xl font-semibold tracking-tight text-fg transition-colors group-active:text-accent">
                  {item.label}
                </span>
              </span>
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-6">
          <div data-menu-meta className="h-px w-full bg-line" />
          <div data-menu-meta className="flex items-center justify-between">
            <span className="eyebrow">{site.location}</span>
            <LocalTime className="font-mono text-xs text-fg-dim" />
          </div>
          <div data-menu-meta className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { label: "GitHub", href: site.socials.github },
              { label: "LinkedIn", href: site.socials.linkedin },
              { label: "X / Twitter", href: site.socials.x },
              { label: "Email", href: site.socials.email },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-fg-dim transition-colors hover:text-accent"
                tabIndex={menuOpen ? 0 : -1}
              >
                {l.label}
              </a>
            ))}
          </div>
          <p data-menu-meta className="text-xs leading-relaxed text-muted">
            {site.availability}
          </p>
        </div>
      </div>
    </>
  );
}
