import Link from "next/link";
import { prisma } from "@/lib/db/client";
import { DataTable } from "@/components/admin/DataTable";
import { experienceColumns } from "@/lib/admin/models";
import { removeExperience, reorderExperience } from "@/lib/admin/actions/experience";
import { LOCALE } from "@/lib/admin/crud-helpers";

export default async function ExperienceListPage() {
  const rows = await prisma.experience.findMany({
    where: { locale: LOCALE },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-fg">Experience</h1>
        <Link
          href="/admin/experience/new"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#e4ff6e]"
        >
          New
        </Link>
      </div>
      <div className="mt-8">
        <DataTable
          rows={rows}
          columns={experienceColumns}
          editHref={(row) => `/admin/experience/${row.id}/edit`}
          deleteAction={removeExperience}
          reorderAction={reorderExperience}
          emptyMessage="No experience entries yet."
        />
      </div>
    </div>
  );
}
