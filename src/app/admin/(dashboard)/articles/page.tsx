import Link from "next/link";
import { prisma } from "@/lib/db/client";
import { DataTable } from "@/components/admin/DataTable";
import { articleColumns } from "@/lib/admin/models";
import { removeArticle, reorderArticle } from "@/lib/admin/actions/article";
import { LOCALE } from "@/lib/admin/crud-helpers";

export default async function ArticlesListPage() {
  const rows = await prisma.article.findMany({
    where: { locale: LOCALE },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-fg">Articles</h1>
        <Link
          href="/admin/articles/new"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#e4ff6e]"
        >
          New
        </Link>
      </div>
      <div className="mt-8">
        <DataTable
          rows={rows}
          columns={articleColumns}
          editHref={(row) => `/admin/articles/${row.id}/edit`}
          deleteAction={removeArticle}
          reorderAction={reorderArticle}
          emptyMessage="No articles yet."
        />
      </div>
    </div>
  );
}
