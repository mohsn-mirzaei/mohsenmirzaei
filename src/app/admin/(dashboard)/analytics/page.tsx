import { getLeadSourceBreakdown, getLeadsPerDay } from "@/lib/admin/lead-analytics";

export default async function AnalyticsPage() {
  const [breakdown, perDay] = await Promise.all([getLeadSourceBreakdown(), getLeadsPerDay(30)]);

  const total = breakdown.reduce((sum, r) => sum + r.count, 0);
  const last7 = perDay.slice(-7).reduce((sum, d) => sum + d.count, 0);
  const last30 = perDay.reduce((sum, d) => sum + d.count, 0);
  const max = Math.max(1, ...perDay.map((d) => d.count));

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-fg">Analytics</h1>
      <p className="mt-3 text-sm text-fg-dim">Lead volume and source breakdown.</p>

      <div className="mt-10 grid grid-cols-3 gap-4">
        <SummaryCard label="Total leads" value={total} />
        <SummaryCard label="Last 7 days" value={last7} />
        <SummaryCard label="Last 30 days" value={last30} />
      </div>

      <div className="mt-12">
        <p className="eyebrow mb-4">Last 30 days</p>
        <div className="flex h-32 items-end gap-1">
          {perDay.map((d) => (
            <div
              key={d.date}
              title={`${d.date}: ${d.count}`}
              className="flex-1 rounded-t bg-accent/70"
              style={{ height: `${(d.count / max) * 100}%`, minHeight: d.count > 0 ? "2px" : "0" }}
            />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <p className="eyebrow mb-4">Leads by source page</p>
        {breakdown.length === 0 && <p className="text-sm text-fg-dim">No leads yet.</p>}
        <div className="flex flex-col">
          {breakdown.map((row) => (
            <div
              key={row.sourcePath}
              className="flex items-center justify-between border-t border-line py-3 last:border-b"
            >
              <span className="truncate font-mono text-sm text-fg">{row.sourcePath}</span>
              <span className="font-display text-lg font-semibold text-fg">{row.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-line p-6">
      <p className="font-display text-3xl font-semibold text-fg">{value}</p>
      <p className="mt-2 text-sm text-fg-dim">{label}</p>
    </div>
  );
}
