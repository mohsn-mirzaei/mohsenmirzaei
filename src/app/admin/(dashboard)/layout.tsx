import Link from "next/link";
import { getAdminSession } from "@/lib/admin/auth";
import { logoutAction } from "@/lib/admin/actions/auth";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/case-studies", label: "Case Studies" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/leads", label: "Leads" },
];

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getAdminSession();

  return (
    <div className="flex min-h-dvh">
      <aside className="flex w-56 shrink-0 flex-col border-r border-line px-6 py-8">
        <p className="eyebrow">Admin</p>
        <nav className="mt-8 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-fg-dim transition-colors hover:bg-ink-soft hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3 border-t border-line pt-6">
          {session && <p className="truncate text-xs text-muted">{session.email}</p>}
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm text-fg-dim transition-colors hover:text-accent"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="section-px flex-1 py-10">{children}</main>
    </div>
  );
}
