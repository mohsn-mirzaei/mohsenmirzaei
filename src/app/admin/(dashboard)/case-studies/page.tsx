import Link from "next/link";
import { prisma } from "@/lib/db/client";
import { DataTable } from "@/components/admin/DataTable";
import { caseStudyColumns } from "@/lib/admin/models";
import { removeCaseStudy, reorderCaseStudy } from "@/lib/admin/actions/case-study";
import { LOCALE } from "@/lib/admin/crud-helpers";

export default async function CaseStudiesListPage() {
  const rows = await prisma.caseStudy.findMany({
    where: { locale: LOCALE },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-fg">Case studies</h1>
        <Link
          href="/admin/case-studies/new"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#e4ff6e]"
        >
          New
        </Link>
      </div>
      <div className="mt-8">
        <DataTable
          rows={rows}
          columns={caseStudyColumns}
          editHref={(row) => `/admin/case-studies/${row.id}/edit`}
          deleteAction={removeCaseStudy}
          reorderAction={reorderCaseStudy}
          emptyMessage="No case studies yet."
        />
      </div>
    </div>
  );
}
