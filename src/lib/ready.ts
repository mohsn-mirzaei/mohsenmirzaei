/**
 * First-load coordination between the Preloader and intro animations.
 *
 * Reveal/SplitReveal defer creating their intro tweens until the preloader
 * curtain has lifted, so the choreography reads as one sequence instead of
 * animations finishing behind an overlay. On repeat visits (or reduced
 * motion) the site is ready immediately.
 */

let ready = false;
const listeners = new Set<() => void>();

export function isSiteReady() {
  return ready;
}

/**
 * Run `cb` once the site is ready (immediately if it already is).
 * Returns an unsubscribe function — call it on unmount.
 */
export function onSiteReady(cb: () => void): () => void {
  if (ready) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function markSiteReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((cb) => cb());
  listeners.clear();
}
