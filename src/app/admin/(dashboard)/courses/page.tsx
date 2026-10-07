import Link from "next/link";
import { prisma } from "@/lib/db/client";
import { DataTable } from "@/components/admin/DataTable";
import { courseProviderColumns } from "@/lib/admin/models";
import { removeCourseProvider, reorderCourseProvider } from "@/lib/admin/actions/course-provider";

export default async function CourseProvidersListPage() {
  const rows = await prisma.courseProvider.findMany({
    orderBy: { order: "asc" },
    include: { courses: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-fg">Courses</h1>
        <Link
          href="/admin/courses/new"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#e4ff6e]"
        >
          New
        </Link>
      </div>
      <div className="mt-8">
        <DataTable
          rows={rows}
          columns={courseProviderColumns}
          editHref={(row) => `/admin/courses/${row.id}/edit`}
          deleteAction={removeCourseProvider}
          reorderAction={reorderCourseProvider}
          emptyMessage="No course providers yet."
        />
      </div>
    </div>
  );
}
