import Image from "next/image";
import { site } from "@/lib/site";
import { stats, pillars } from "@/lib/data";
import { Reveal } from "@/components/anim/Reveal";
import { SectionHeading } from "@/components/layout/SectionHeading";

export function About() {
  return (
    <section id="about" className="section-px relative scroll-mt-24 py-28 md:py-40">
      <SectionHeading
        index="01"
        eyebrow="About"
        title={
          <>
            Engineer who ships <span className="font-serif-it">whole products</span>, not just
            screens.
          </>
        }
      />

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="group relative overflow-hidden rounded-2xl border border-line">
            <Image
              src="/images/mohsen-portrait.jpg"
              alt={`Portrait of ${site.name}, ${site.role}`}
              width={1024}
              height={1024}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWERIjFBkf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeXEThaqf/Z"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 60vw, 30vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          </div>
        </Reveal>

        <div className="flex flex-col gap-10 lg:col-span-8">
          <Reveal as="p" className="max-w-2xl text-2xl leading-snug text-fg text-balance md:text-3xl">
            I&apos;m {site.firstName}, a frontend-focused full-stack engineer who thinks in
            systems. Over{" "}
            {site.yearsExperience}+ years I&apos;ve built {""}
            <span className="text-accent">real-time trading platforms</span>,{" "}
            <span className="text-accent">AI products</span>, and{" "}
            <span className="text-accent">fintech apps</span> — usually owning everything from
            architecture and backend to the last pixel.
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.08}
                className="lift rounded-xl border border-line bg-ink-soft/60 p-6 hover:border-line-strong"
              >
                <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-dim">{p.body}</p>
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-ink p-6">
                <div className="font-display text-3xl font-semibold text-accent md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 text-xs leading-relaxed text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
