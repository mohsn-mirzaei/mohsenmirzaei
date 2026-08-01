import { prisma } from "@/lib/db/client";

export type SourceBreakdownRow = { sourcePath: string; count: number };
export type DayCount = { date: string; count: number };

const UNKNOWN_SOURCE = "(unknown)";

export async function getLeadSourceBreakdown(): Promise<SourceBreakdownRow[]> {
  const rows = await prisma.lead.groupBy({
    by: ["sourcePath"],
    _count: true,
    orderBy: { _count: { sourcePath: "desc" } },
  });

  return rows
    .map((r) => ({ sourcePath: r.sourcePath ?? UNKNOWN_SOURCE, count: r._count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * All bucketing is done in UTC calendar days. Mixing local-time arithmetic
 * (setDate/setHours) with a UTC read-back (toISOString) shifts every bucket
 * by the local UTC offset, which can silently drop same-day rows whose
 * computed key falls outside the generated date range entirely.
 */
function startOfUtcDay(d: Date) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function dateKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

export async function getLeadsPerDay(days = 30): Promise<DayCount[]> {
  const since = startOfUtcDay(new Date());
  since.setUTCDate(since.getUTCDate() - (days - 1));

  const leads = await prisma.lead.findMany({
    select: { createdAt: true },
    where: { createdAt: { gte: since } },
  });

  const counts = new Map<string, number>();
  for (const { createdAt } of leads) {
    const key = dateKey(startOfUtcDay(createdAt));
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const result: DayCount[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(since);
    d.setUTCDate(d.getUTCDate() + i);
    const key = dateKey(d);
    result.push({ date: key, count: counts.get(key) ?? 0 });
  }
  return result;
}
