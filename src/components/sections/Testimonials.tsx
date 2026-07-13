import Image from "next/image";
import { testimonials } from "@/lib/data";
import { site } from "@/lib/site";
import { Reveal } from "@/components/anim/Reveal";
import { SectionHeading } from "@/components/layout/SectionHeading";

export function Testimonials() {
  const [lead, ...rest] = testimonials;

  return (
    <section id="testimonials" className="section-px scroll-mt-24 py-28 md:py-40">
      <SectionHeading
        index="06"
        eyebrow="References"
        title={
          <>
            What people say after we <span className="font-serif-it">ship together</span>.
          </>
        }
      />

      <div className="mt-16 flex flex-col gap-6">
        {/* Lead quote — featured, full-width banner */}
        <Reveal className="rounded-2xl border border-line-strong bg-ink-soft/60 p-8 md:p-12">
          <p className="font-serif-it text-2xl leading-snug text-fg md:text-3xl lg:text-[2.25rem] lg:leading-snug">
            &ldquo;{lead.quote}&rdquo;
          </p>
          <footer className="mt-8 flex items-center gap-4">
            {lead.avatar ? (
              <Image
                src={lead.avatar}
                alt={lead.name}
                width={44}
                height={44}
                className="h-11 w-11 rounded-full border border-line-strong object-cover"
              />
            ) : (
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong font-display text-sm font-semibold text-accent">
                {lead.name.charAt(0)}
              </span>
            )}
            <div>
              <div className="text-sm font-medium text-fg">
                {lead.name}
                {lead.link && (
                  <a
                    href={lead.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-xs font-normal text-muted underline decoration-line-strong underline-offset-2 hover:text-accent"
                  >
                    LinkedIn ↗
                  </a>
                )}
              </div>
              <div className="text-xs text-muted">
                {lead.role} · {lead.company}
              </div>
            </div>
          </footer>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {rest.map((t, i) => (
            <Reveal
              key={t.company}
              delay={i * 0.08}
              className="flex flex-col justify-between rounded-2xl border border-line bg-ink-soft/40 p-8"
            >
              <p className="text-lg leading-relaxed text-fg-dim">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-8 flex items-center gap-4">
                {t.avatar ? (
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full border border-line object-cover"
                  />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line font-display text-sm font-semibold text-accent">
                    {t.name.charAt(0)}
                  </span>
                )}
                <div>
                  <div className="text-sm font-medium text-fg">
                    {t.name}
                    {t.link && (
                      <a
                        href={t.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-xs font-normal text-muted underline decoration-line-strong underline-offset-2 hover:text-accent"
                      >
                        LinkedIn ↗
                      </a>
                    )}
                  </div>
                  <div className="text-xs text-muted">
                    {t.role} · {t.company}
                  </div>
                </div>
              </footer>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex justify-center md:justify-end">
          <a
            href={`${site.socials.linkedin}details/recommendations`}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-accent"
          >
            Show more recommendations
            <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
