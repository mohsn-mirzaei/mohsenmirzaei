import { courseProviders } from "@/lib/courses";
import { Reveal } from "@/components/anim/Reveal";
import { StatCounter } from "@/components/anim/StatCounter";
import { SectionHeading } from "@/components/layout/SectionHeading";

const allCourses = courseProviders.flatMap((p) => p.courses);
const totalHours = Math.round(allCourses.reduce((sum, c) => sum + c.hours, 0));
const inProgressCount = allCourses.filter((c) => c.inProgress).length;

const courseStats = [
  { value: `${allCourses.length}`, label: "Courses taken" },
  { value: `${totalHours}+`, label: "Hours of training" },
  { value: `${inProgressCount}`, label: "In progress now" },
];

export function Courses() {
  return (
    <section id="courses" className="section-px scroll-mt-24 py-28 md:py-40">
      <SectionHeading
        index="05"
        eyebrow="Courses"
        title={
          <>
            Learning stays a habit, <span className="font-serif-it">not an event</span>.
          </>
        }
      />

      <Reveal
        as="p"
        className="mt-6 max-w-2xl text-sm leading-relaxed text-muted"
      >
        Self-directed study, tracked honestly — none of these are accredited
        certificates, just hours logged outside of work.
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
        {courseStats.map((s) => (
          <div key={s.label} className="bg-ink p-6">
            <StatCounter
              value={s.value}
              className="font-display text-3xl font-semibold text-accent md:text-4xl"
            />
            <div className="mt-2 text-xs leading-relaxed text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 columns-1 gap-6 lg:columns-2">
        {courseProviders.map((provider, pi) => (
          <Reveal
            key={provider.name}
            delay={pi * 0.08}
            className="mb-6 break-inside-avoid rounded-2xl border border-line bg-ink-soft/40 p-7 md:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-lg font-semibold">{provider.name}</h3>
              <a
                href={provider.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-muted transition-colors hover:text-accent"
              >
                visit →
              </a>
            </div>

            <ul className="mt-4 flex flex-col divide-y divide-line">
              {provider.courses.map((c) => (
                <li key={c.title} className="py-4">
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-fg transition-colors group-hover:text-accent">
                        {c.title}
                      </p>
                      {(c.free || c.inProgress) && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {c.inProgress && (
                            <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.65rem] uppercase tracking-wide text-accent">
                              In progress
                            </span>
                          )}
                          {c.free && (
                            <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.65rem] uppercase tracking-wide text-muted">
                              Free
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="shrink-0 font-mono text-xs text-muted">
                      {c.hours % 1 === 0 ? c.hours : c.hours.toFixed(1)}h
                    </span>
                  </a>
                  {c.highlights && (
                    <ul className="mt-3 space-y-1.5">
                      {c.highlights.map((h) => (
                        <li key={h} className="flex gap-2 text-xs leading-relaxed text-muted">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
