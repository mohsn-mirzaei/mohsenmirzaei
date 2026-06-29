import { skillGroups } from "@/lib/data";
import { Reveal } from "@/components/anim/Reveal";
import { SectionHeading } from "@/components/layout/SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="section-px scroll-mt-24 py-28 md:py-40">
      <SectionHeading
        index="04"
        eyebrow="Capabilities"
        title={
          <>
            A full-stack toolkit, <span className="font-serif-it">frontend-first</span>.
          </>
        }
      />

      <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <Reveal
            key={group.title}
            delay={Math.min(i * 0.05, 0.3)}
            className="flex flex-col gap-4 bg-ink p-7 transition-colors hover:bg-ink-soft"
          >
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {group.title}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {group.skills.map((s) => (
                <li key={s} className="text-sm text-fg-dim">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
