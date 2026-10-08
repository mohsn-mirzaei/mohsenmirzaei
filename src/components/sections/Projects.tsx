import { getProjects } from "@/lib/content/queries";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { FeaturedRail } from "@/components/sections/FeaturedRail";
import { Reveal } from "@/components/anim/Reveal";

export async function Projects() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="scroll-mt-24 py-28 md:py-40">
      <div className="section-px">
        <SectionHeading
          index="03"
          eyebrow="Selected Work"
          title={
            <>
              Things I&apos;ve <span className="font-serif-it">designed</span> &amp; engineered.
            </>
          }
        />
        <Reveal as="p" className="mt-6 max-w-md text-sm leading-relaxed text-muted">
          Featured builds — scroll sideways, or open a case study for the
          architecture behind it.
        </Reveal>
      </div>

      <div className="section-px mt-16">
        <FeaturedRail projects={featured} />
      </div>

      <div className="section-px mt-24">
        <Reveal as="p" className="eyebrow">
          More work
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
