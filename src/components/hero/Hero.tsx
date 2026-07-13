import { site } from "@/lib/site";
import { Reveal } from "@/components/anim/Reveal";
import { SplitReveal } from "@/components/anim/SplitReveal";
import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { HeroActions } from "@/components/hero/HeroActions";
import { LocalTime } from "@/components/layout/LocalTime";

export function Hero() {
  return (
    <section id="top" className="relative min-h-dvh w-full overflow-hidden">
      <HeroCanvas />

      <div className="section-px relative z-10 flex min-h-dvh flex-col justify-between pb-10 pt-28">
        <div className="flex items-start justify-between gap-6">
          <Reveal as="p" className="eyebrow max-w-[14rem] leading-relaxed">
            {site.roleLong}
          </Reveal>
          <Reveal className="flex items-center gap-2.5 text-sm text-fg-dim">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for work
          </Reveal>
        </div>

        <div className="max-w-5xl">
          <h1 className="display-xl">
            <SplitReveal as="span" className="block" byWord>
              Mohsen
            </SplitReveal>
            <SplitReveal as="span" className="block text-accent" byWord>
              Mirzaei
            </SplitReveal>
          </h1>
          <Reveal as="p" delay={0.15} className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-fg-dim">
            {site.tagline}
          </Reveal>
          <HeroActions />
        </div>

        <div className="flex items-end justify-between">
          <Reveal className="eyebrow flex items-center gap-3">
            <span>{site.location}</span>
            <span className="h-3 w-px bg-line-strong" />
            <LocalTime />
          </Reveal>
          <div className="hidden items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted md:flex">
            Scroll
            <span className="relative block h-12 w-px overflow-hidden bg-line">
              <span className="absolute inset-x-0 top-0 h-4 w-px bg-accent [animation:scroll-hint_1.8s_ease-in-out_infinite]" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
