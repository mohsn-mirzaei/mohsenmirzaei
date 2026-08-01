import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { RecordForm } from "@/components/admin/RecordForm";
import { experienceFields } from "@/lib/admin/models";
import { updateExperience } from "@/lib/admin/actions/experience";
import { stringifyList, stringifyMetricPairs } from "@/lib/admin/crud-helpers";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = await prisma.experience.findUnique({ where: { id } });
  if (!experience) notFound();

  const defaultValues = {
    slug: experience.slug,
    company: experience.company,
    role: experience.role,
    period: experience.period,
    summary: experience.summary,
    highlights: stringifyList(experience.highlights, "\n"),
    metrics: stringifyMetricPairs(
      (experience.metrics as { value: string; label: string }[] | null) ?? [],
    ),
    stack: stringifyList(experience.stack, ","),
    link: experience.link ?? "",
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-fg">Edit experience</h1>
      <div className="mt-8">
        <RecordForm
          fields={experienceFields}
          defaultValues={defaultValues}
          action={updateExperience.bind(null, experience.id)}
          submitLabel="Save"
        />
      </div>
    </div>
  );
}
