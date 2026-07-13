import { site } from "@/lib/site";
import { Reveal } from "@/components/anim/Reveal";
import { SplitReveal } from "@/components/anim/SplitReveal";

export function Contact() {
  return (
    <section id="contact" className="section-px scroll-mt-24 py-28 md:py-40">
      <div className="flex flex-col gap-6">
        <Reveal className="flex items-center gap-4">
          <span className="font-mono text-sm text-accent">07</span>
          <span className="h-px w-10 bg-line-strong" />
          <span className="eyebrow">Contact</span>
        </Reveal>

        <SplitReveal as="h2" className="display-xl max-w-5xl text-balance">
          Let&apos;s build something{" "}
          <span className="text-accent">people remember.</span>
        </SplitReveal>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal as="p" className="max-w-xl text-lg leading-relaxed text-fg-dim">
            {site.availability}. Whether it&apos;s a real-time platform, an AI product, or a
            fintech app — I&apos;d love to hear about it.
          </Reveal>

          <Reveal>
            <a
              href={site.socials.email}
              data-cursor
              className="group mt-10 inline-flex items-center gap-4 font-display text-3xl font-semibold tracking-tight text-fg transition-colors hover:text-accent md:text-5xl"
            >
              <span className="break-all">{site.email}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:justify-self-end">
          <Reveal className="flex flex-col gap-4">
            <p className="eyebrow mb-2">Elsewhere</p>
            {[
              { label: "GitHub", href: site.socials.github },
              { label: "LinkedIn", href: site.socials.linkedin },
              { label: "X / Twitter", href: site.socials.x },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-line py-4 text-lg text-fg transition-colors hover:border-accent"
              >
                {l.label}
                <span className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent">
                  ↗
                </span>
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
