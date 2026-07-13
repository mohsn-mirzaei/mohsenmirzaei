import { articles } from "@/lib/articles";
import { Reveal } from "@/components/anim/Reveal";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { TransitionLink } from "@/components/providers/Transition";

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function Notes() {
  return (
    <section id="notes" className="section-px scroll-mt-24 py-28 md:py-40">
      <SectionHeading
        index="07"
        eyebrow="Notes"
        title={
          <>
            Writing about the <span className="font-serif-it">hard parts</span>.
          </>
        }
      />

      <div className="mt-16 flex flex-col">
        {articles.map((a, i) => (
          <Reveal key={a.slug} delay={Math.min(i * 0.05, 0.2)}>
            <TransitionLink
              href={`/notes/${a.slug}`}
              dataCursorLabel="Read note →"
              className="group grid grid-cols-1 gap-4 border-t border-line py-10 transition-colors hover:bg-ink-soft/40 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <div className="font-mono text-xs text-muted md:col-span-2">
                {dateFmt.format(new Date(a.date))} · {a.readingTime}
              </div>
              <div className="md:col-span-9">
                <h3 className="font-display text-2xl font-semibold leading-tight transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-3xl">
                  {a.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-dim">
                  {a.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {a.tags.map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden text-right text-xl text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent md:col-span-1 md:block">
                →
              </div>
            </TransitionLink>
          </Reveal>
        ))}
        <div className="border-t border-line" />
      </div>
    </section>
  );
}
