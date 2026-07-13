"use client";

import { scrollToId } from "@/lib/lenis";
import { site } from "@/lib/site";
import { MagneticButton } from "@/components/anim/MagneticButton";

export function HeroActions() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <MagneticButton
        onClick={() => scrollToId("work")}
        ariaLabel="View selected work"
        className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-[#e4ff6e]"
      >
        View selected work
        <span className="transition-transform duration-300 group-hover:translate-x-1">↓</span>
      </MagneticButton>
      <MagneticButton
        href={site.socials.telegram}
        ariaLabel="Message Mohsen on Telegram"
        className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-[#e4ff6e]"
      >
        Message on Telegram
        <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
      </MagneticButton>
      <MagneticButton
        href={site.socials.email}
        ariaLabel="Email Mohsen"
        className="inline-flex items-center gap-3 rounded-full border border-line-strong px-7 py-3.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
      >
        Get in touch
      </MagneticButton>
      <MagneticButton
        href={site.resumeUrl}
        download="Mohsen_Mirzaei_Resume.pdf"
        ariaLabel="Download Mohsen Mirzaei resume"
        className="group inline-flex items-center gap-3 rounded-full border border-line px-7 py-3.5 text-sm font-medium text-fg-dim transition-colors hover:border-accent hover:text-accent"
      >
        Download resume
        <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
      </MagneticButton>
    </div>
  );
}
