import Link from "next/link";
import type { AdminColumnConfig } from "@/lib/admin/models";

interface DataTableProps<T extends { id: string }> {
  rows: T[];
  columns: AdminColumnConfig<T>[];
  editHref: (row: T) => string;
  deleteAction: (id: string) => Promise<void>;
  reorderAction: (id: string, direction: "up" | "down") => Promise<void>;
  emptyMessage?: string;
}

/**
 * Server-rendered list: no client JS required. Reorder/delete are Server
 * Actions bound per-row at render time and posted via plain <form>s.
 */
export function DataTable<T extends { id: string }>({
  rows,
  columns,
  editHref,
  deleteAction,
  reorderAction,
  emptyMessage = "Nothing here yet.",
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return <p className="text-sm text-fg-dim">{emptyMessage}</p>;
  }

  return (
    <div className="flex flex-col">
      {rows.map((row, index) => (
        <div
          key={row.id}
          className="flex items-center justify-between gap-4 border-t border-line py-4 last:border-b"
        >
          <div className="flex flex-1 flex-wrap items-baseline gap-x-6 gap-y-1">
            {columns.map((col) => (
              <div key={col.header} className="text-sm text-fg-dim">
                <span className="mr-2 font-mono text-[10px] uppercase tracking-wide text-muted">
                  {col.header}
                </span>
                {col.accessor(row)}
              </div>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <form action={reorderAction.bind(null, row.id, "up")}>
              <button
                type="submit"
                disabled={index === 0}
                aria-label="Move up"
                className="rounded px-2 py-1 text-sm text-fg-dim transition-colors hover:text-fg disabled:opacity-30"
              >
                ↑
              </button>
            </form>
            <form action={reorderAction.bind(null, row.id, "down")}>
              <button
                type="submit"
                disabled={index === rows.length - 1}
                aria-label="Move down"
                className="rounded px-2 py-1 text-sm text-fg-dim transition-colors hover:text-fg disabled:opacity-30"
              >
                ↓
              </button>
            </form>
            <Link
              href={editHref(row)}
              className="rounded px-2 py-1 text-sm text-fg-dim transition-colors hover:text-accent"
            >
              Edit
            </Link>
            <form action={deleteAction.bind(null, row.id)}>
              <button
                type="submit"
                className="rounded px-2 py-1 text-sm text-fg-dim transition-colors hover:text-accent"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
