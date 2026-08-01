import Link from "next/link";
import { prisma } from "@/lib/db/client";
import { updateLeadStatus } from "@/lib/admin/actions/lead";

const STATUSES = ["NEW", "READ", "REPLIED", "ARCHIVED"] as const;
type LeadStatus = (typeof STATUSES)[number];

const dateFmt = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function isLeadStatus(value: string | undefined): value is LeadStatus {
  return STATUSES.includes(value as LeadStatus);
}

export default async function LeadsListPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = isLeadStatus(status) ? status : undefined;

  const leads = await prisma.lead.findMany({
    where: filter ? { status: filter } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-fg">Leads</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        <FilterLink label="All" active={!filter} href="/admin/leads" />
        {STATUSES.map((s) => (
          <FilterLink key={s} label={s} active={filter === s} href={`/admin/leads?status=${s}`} />
        ))}
      </div>

      <div className="mt-8 flex flex-col">
        {leads.length === 0 && <p className="text-sm text-fg-dim">No leads yet.</p>}
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="flex flex-col gap-3 border-t border-line py-5 last:border-b sm:flex-row sm:items-center sm:justify-between"
          >
            <Link href={`/admin/leads/${lead.id}`} className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-xs text-muted">{dateFmt.format(lead.createdAt)}</span>
                <span className="truncate font-medium text-fg">{lead.name}</span>
                <span className="truncate text-sm text-fg-dim">{lead.email}</span>
              </div>
              <p className="mt-1 line-clamp-1 text-sm text-fg-dim">{lead.message}</p>
            </Link>
            <form
              action={updateLeadStatus.bind(null, lead.id)}
              className="flex shrink-0 items-center gap-2"
            >
              <select
                name="status"
                defaultValue={lead.status}
                className="border-b border-line bg-transparent py-1 text-sm text-fg outline-none focus:border-accent"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s} className="bg-ink-soft">
                    {s}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded px-2 py-1 text-sm text-fg-dim transition-colors hover:text-accent"
              >
                Update
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterLink({ label, active, href }: { label: string; active: boolean; href: string }) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
        active ? "border-accent text-accent" : "border-line text-fg-dim hover:text-fg"
      }`}
    >
      {label}
    </Link>
  );
}
