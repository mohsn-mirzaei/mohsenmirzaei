import { experiences } from "@/lib/data";
import { Reveal } from "@/components/anim/Reveal";
import { SectionHeading } from "@/components/layout/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="section-px scroll-mt-24 py-28 md:py-40">
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title={
          <>
            Eight products across crypto, fintech &amp;{" "}
            <span className="font-serif-it">AI</span>.
          </>
        }
      />

      <div className="mt-16 flex flex-col">
        {experiences.map((exp, i) => (
          <Reveal key={exp.company} delay={Math.min(i * 0.04, 0.2)}>
            <article className="group grid grid-cols-1 gap-6 border-t border-line py-10 transition-colors hover:bg-ink-soft/40 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-3">
                <p className="font-mono text-xs text-muted">{exp.period}</p>
                <h3 className="mt-2 font-display text-xl font-semibold leading-tight">
                  {exp.company}
                </h3>
                <p className="mt-1 text-sm text-accent">{exp.role}</p>
              </div>

              <div className="md:col-span-6">
                <p className="text-base leading-relaxed text-fg-dim">{exp.summary}</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {exp.highlights.slice(0, 4).map((h) => (
                    <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.stack.slice(0, 7).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-line px-3 py-1 text-xs text-fg-dim transition-colors group-hover:border-line-strong"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-3">
                {exp.metrics && (
                  <div className="flex flex-row gap-6 md:flex-col md:items-end md:text-right">
                    {exp.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="font-display text-2xl font-semibold text-fg md:text-3xl">
                          {m.value}
                        </div>
                        <div className="mt-1 text-[0.7rem] leading-tight text-muted">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        ))}
        <div className="border-t border-line" />
      </div>
    </section>
  );
}
