import Link from "next/link";
import { prisma } from "@/lib/db/client";
import { DataTable } from "@/components/admin/DataTable";
import { projectColumns } from "@/lib/admin/models";
import { removeProject, reorderProject } from "@/lib/admin/actions/project";
import { LOCALE } from "@/lib/admin/crud-helpers";

export default async function ProjectsListPage() {
  const rows = await prisma.project.findMany({
    where: { locale: LOCALE },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-fg">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#e4ff6e]"
        >
          New
        </Link>
      </div>
      <div className="mt-8">
        <DataTable
          rows={rows}
          columns={projectColumns}
          editHref={(row) => `/admin/projects/${row.id}/edit`}
          deleteAction={removeProject}
          reorderAction={reorderProject}
          emptyMessage="No projects yet."
        />
      </div>
    </div>
  );
}
