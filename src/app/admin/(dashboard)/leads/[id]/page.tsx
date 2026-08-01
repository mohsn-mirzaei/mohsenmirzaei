import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db/client";
import { updateLeadStatus } from "@/lib/admin/actions/lead";

const STATUSES = ["NEW", "READ", "REPLIED", "ARCHIVED"] as const;

const dateFmt = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeStyle: "short",
});

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) notFound();

  return (
    <div className="max-w-2xl">
      <Link href="/admin/leads" className="text-sm text-fg-dim transition-colors hover:text-fg">
        ← Leads
      </Link>

      <h1 className="mt-4 font-display text-2xl font-semibold text-fg">{lead.name}</h1>
      <p className="mt-1 text-sm text-fg-dim">{lead.email}</p>
      <p className="mt-1 font-mono text-xs text-muted">
        {dateFmt.format(lead.createdAt)}
        {lead.sourcePath && ` · from ${lead.sourcePath}`}
      </p>

      <div className="mt-8 whitespace-pre-wrap rounded-2xl border border-line bg-ink-soft/40 p-6 text-base leading-relaxed text-fg-dim">
        {lead.message}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href={`mailto:${lead.email}`}
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#e4ff6e]"
        >
          Reply by email
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>

        <form action={updateLeadStatus.bind(null, lead.id)} className="flex items-center gap-2">
          <select
            name="status"
            defaultValue={lead.status}
            className="border-b border-line bg-transparent py-2 text-sm text-fg outline-none focus:border-accent"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s} className="bg-ink-soft">
                {s}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded px-3 py-2 text-sm text-fg-dim transition-colors hover:text-accent"
          >
            Update status
          </button>
        </form>
      </div>
    </div>
  );
}
