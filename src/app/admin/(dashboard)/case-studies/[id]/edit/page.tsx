import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { CaseStudyForm } from "@/components/admin/CaseStudyForm";
import { caseStudyFields } from "@/lib/admin/models";
import { updateCaseStudy } from "@/lib/admin/actions/case-study";
import { stringifyList, stringifyMetricPairs } from "@/lib/admin/crud-helpers";
import type { CaseStudySectionDraft } from "@/components/admin/CaseStudySectionsEditor";

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caseStudy = await prisma.caseStudy.findUnique({
    where: { id },
    include: { sections: { orderBy: { order: "asc" } } },
  });
  if (!caseStudy) notFound();

  const defaultValues = {
    slug: caseStudy.slug,
    title: caseStudy.title,
    eyebrow: caseStudy.eyebrow,
    year: caseStudy.year,
    role: caseStudy.role,
    timeline: caseStudy.timeline,
    team: caseStudy.team,
    intro: caseStudy.intro,
    heroMediaSrc: caseStudy.heroMediaSrc,
    heroMediaAlt: caseStudy.heroMediaAlt,
    heroMediaCaption: caseStudy.heroMediaCaption ?? "",
    heroMediaVideo: caseStudy.heroMediaVideo ?? "",
    metrics: stringifyMetricPairs(
      (caseStudy.metrics as { value: string; label: string }[] | null) ?? [],
    ),
    stack: stringifyList(caseStudy.stack, ","),
    liveUrl: caseStudy.liveUrl ?? "",
    repoUrl: caseStudy.repoUrl ?? "",
  };

  const initialSections: CaseStudySectionDraft[] = caseStudy.sections.map((s) => ({
    kicker: s.kicker,
    heading: s.heading,
    body: s.body.join("\n"),
    bullets: s.bullets.join("\n"),
    mediaSrc: s.mediaSrc ?? "",
    mediaAlt: s.mediaAlt ?? "",
    mediaCaption: s.mediaCaption ?? "",
    mediaVideo: s.mediaVideo ?? "",
  }));

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-fg">Edit case study</h1>
      <div className="mt-8">
        <CaseStudyForm
          fields={caseStudyFields}
          defaultValues={defaultValues}
          initialSections={initialSections}
          action={updateCaseStudy.bind(null, caseStudy.id)}
          submitLabel="Save"
        />
      </div>
    </div>
  );
}
