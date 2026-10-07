import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { CourseProviderForm } from "@/components/admin/CourseProviderForm";
import { courseProviderFields } from "@/lib/admin/models";
import { updateCourseProvider } from "@/lib/admin/actions/course-provider";
import type { CourseDraft } from "@/components/admin/CourseProvidersEditor";

export default async function EditCourseProviderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const provider = await prisma.courseProvider.findUnique({
    where: { id },
    include: { courses: { orderBy: { order: "asc" } } },
  });
  if (!provider) notFound();

  const defaultValues = {
    slug: provider.slug,
    name: provider.name,
    url: provider.url,
  };

  const initialCourses: CourseDraft[] = provider.courses.map((c) => ({
    title: c.title,
    hours: String(c.hours),
    url: c.url,
    free: c.free,
    inProgress: c.inProgress,
    highlights: c.highlights.join("\n"),
  }));

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-fg">Edit course provider</h1>
      <div className="mt-8">
        <CourseProviderForm
          fields={courseProviderFields}
          defaultValues={defaultValues}
          initialCourses={initialCourses}
          action={updateCourseProvider.bind(null, provider.id)}
          submitLabel="Save"
        />
      </div>
    </div>
  );
}
