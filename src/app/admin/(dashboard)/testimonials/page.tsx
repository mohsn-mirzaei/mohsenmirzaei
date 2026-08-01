import Link from "next/link";
import { prisma } from "@/lib/db/client";
import { DataTable } from "@/components/admin/DataTable";
import { testimonialColumns } from "@/lib/admin/models";
import { removeTestimonial, reorderTestimonial } from "@/lib/admin/actions/testimonial";
import { LOCALE } from "@/lib/admin/crud-helpers";

export default async function TestimonialsListPage() {
  const rows = await prisma.testimonial.findMany({
    where: { locale: LOCALE },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-fg">Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#e4ff6e]"
        >
          New
        </Link>
      </div>
      <div className="mt-8">
        <DataTable
          rows={rows}
          columns={testimonialColumns}
          editHref={(row) => `/admin/testimonials/${row.id}/edit`}
          deleteAction={removeTestimonial}
          reorderAction={reorderTestimonial}
          emptyMessage="No testimonials yet."
        />
      </div>
    </div>
  );
}
