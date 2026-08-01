import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { RecordForm } from "@/components/admin/RecordForm";
import { projectFields } from "@/lib/admin/models";
import { updateProject } from "@/lib/admin/actions/project";
import { stringifyList } from "@/lib/admin/crud-helpers";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  const defaultValues = {
    slug: project.slug,
    title: project.title,
    category: project.category,
    year: project.year,
    description: project.description,
    bullets: stringifyList(project.bullets, "\n"),
    stack: stringifyList(project.stack, ","),
    mediaImage: project.mediaImage,
    mediaAlt: project.mediaAlt,
    mediaVideo: project.mediaVideo ?? "",
    link: project.link ?? "",
    repo: project.repo ?? "",
    caseStudy: project.caseStudy,
    featured: project.featured,
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-fg">Edit project</h1>
      <div className="mt-8">
        <RecordForm
          fields={projectFields}
          defaultValues={defaultValues}
          action={updateProject.bind(null, project.id)}
          submitLabel="Save"
        />
      </div>
    </div>
  );
}
