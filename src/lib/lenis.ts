import type Lenis from "lenis";

declare global {
  var __lenis: Lenis | undefined;
}

/** Smoothly scroll to an element by id, falling back to native behavior. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = globalThis.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
