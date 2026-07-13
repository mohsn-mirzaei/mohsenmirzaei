import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, nextCaseStudy, type CaseMedia } from "@/lib/case-studies";
import { site } from "@/lib/site";
import { Reveal } from "@/components/anim/Reveal";
import { SplitReveal } from "@/components/anim/SplitReveal";
import { Parallax } from "@/components/anim/Parallax";
import { StatCounter } from "@/components/anim/StatCounter";
import { TransitionLink } from "@/components/providers/Transition";

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.intro,
    alternates: { canonical: `/work/${cs.slug}` },
    openGraph: {
      title: `${cs.title} — ${site.name}`,
      description: cs.intro,
      url: `${site.url}/work/${cs.slug}`,
      type: "article",
    },
  };
}

function CaseFigure({ media }: { media: CaseMedia }) {
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl border border-line">
        <Parallax amount={6}>
          {media.video ? (
            <video
              className="w-full"
              poster={media.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={media.alt}
            >
              <source src={media.video} />
            </video>
          ) : (
            // Placeholder mockups are SVG; a plain img keeps them crisp.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={media.src} alt={media.alt} loading="lazy" className="w-full" />
          )}
        </Parallax>
      </div>
      {media.caption && (
        <figcaption className="mt-3 font-mono text-xs leading-relaxed text-muted">
          {media.caption}
        </figcaption>
      )}
    </figure>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  const next = nextCaseStudy(slug);

  return (
    <main className="section-px pt-32 md:pt-40">
      {/* Breadcrumb */}
      <Reveal className="flex items-center gap-3 text-sm text-muted">
        <TransitionLink href="/#work" className="transition-colors hover:text-fg">
          Work
        </TransitionLink>
        <span>/</span>
        <span className="text-fg-dim">{cs.eyebrow}</span>
      </Reveal>

      {/* Title */}
      <div className="mt-10 max-w-5xl">
        <SplitReveal as="h1" className="display-lg text-balance">
          {cs.title}
        </SplitReveal>
        <Reveal as="p" delay={0.1} className="mt-8 max-w-2xl text-lg leading-relaxed text-fg-dim">
          {cs.intro}
        </Reveal>
      </div>

      {/* Meta grid */}
      <Reveal className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
        {[
          ["Role", cs.role],
          ["Timeline", cs.timeline],
          ["Team", cs.team],
          ["Year", cs.year],
        ].map(([k, v]) => (
          <div key={k} className="bg-ink p-6">
            <div className="eyebrow">{k}</div>
            <div className="mt-3 text-sm leading-relaxed text-fg">{v}</div>
          </div>
        ))}
      </Reveal>

      {/* Hero media */}
      <div className="mt-14">
        <Reveal>
          <CaseFigure media={cs.heroMedia} />
        </Reveal>
      </div>

      {/* Metrics */}
      <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
        {cs.metrics.map((m) => (
          <div key={m.label} className="bg-ink p-6 md:p-8">
            <StatCounter
              value={m.value}
              className="font-display text-3xl font-semibold text-accent md:text-4xl"
            />
            <div className="mt-2 text-xs leading-relaxed text-muted">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Sections */}
      <div className="mx-auto mt-28 flex max-w-3xl flex-col gap-24 md:mt-36">
        {cs.sections.map((s) => (
          <section key={s.kicker}>
            <Reveal as="p" className="eyebrow">
              {s.kicker}
            </Reveal>
            <SplitReveal as="h2" className="mt-4 font-display text-3xl font-semibold leading-tight text-balance md:text-4xl">
              {s.heading}
            </SplitReveal>
            <div className="mt-6 flex flex-col gap-5">
              {s.body.map((p) => (
                <Reveal as="p" key={p.slice(0, 32)} className="text-base leading-relaxed text-fg-dim">
                  {p}
                </Reveal>
              ))}
            </div>
            {s.bullets && (
              <Reveal as="ul" className="mt-6 flex flex-col gap-3">
                {s.bullets.map((bl) => (
                  <li key={bl} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {bl}
                  </li>
                ))}
              </Reveal>
            )}
            {s.media && (
              <div className="mt-10">
                <Reveal>
                  <CaseFigure media={s.media} />
                </Reveal>
              </div>
            )}
          </section>
        ))}

        {/* Stack */}
        <section>
          <Reveal as="p" className="eyebrow">
            Stack
          </Reveal>
          <Reveal className="mt-6 flex flex-wrap gap-2">
            {cs.stack.map((s) => (
              <span key={s} className="rounded-full border border-line px-3 py-1 text-xs text-fg-dim">
                {s}
              </span>
            ))}
          </Reveal>
          {(cs.liveUrl || cs.repoUrl) && (
            <Reveal className="mt-8 flex gap-6">
              {cs.liveUrl && (
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-accent"
                >
                  Visit live
                  <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              )}
              {cs.repoUrl && (
                <a
                  href={cs.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-accent"
                >
                  GitHub
                  <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              )}
            </Reveal>
          )}
        </section>
      </div>

      {/* Next case handoff */}
      <div className="mt-32 border-t border-line py-20 md:mt-40">
        <Reveal as="p" className="eyebrow">
          Next case
        </Reveal>
        <TransitionLink
          href={`/work/${next.slug}`}
          dataCursorLabel="View case →"
          className="group mt-6 block"
        >
          <span className="display-lg block max-w-4xl text-balance transition-colors duration-300 group-hover:text-accent">
            {next.title}
            <span className="ml-4 inline-block transition-transform duration-300 group-hover:translate-x-3">
              →
            </span>
          </span>
        </TransitionLink>
      </div>
    </main>
  );
}
