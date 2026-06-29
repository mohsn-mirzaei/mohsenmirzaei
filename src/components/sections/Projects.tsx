import { projects } from "@/lib/data";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="section-px scroll-mt-24 py-28 md:py-40">
      <SectionHeading
        index="03"
        eyebrow="Selected Work"
        title={
          <>
            Things I&apos;ve <span className="font-serif-it">designed</span> &amp; engineered.
          </>
        }
      />

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        {[...featured, ...rest].map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
