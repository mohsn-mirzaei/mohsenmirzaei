import Link from "next/link";
import { prisma } from "@/lib/db/client";
import { LOCALE } from "@/lib/admin/crud-helpers";

export default async function AdminDashboardPage() {
  const [
    experienceCount,
    projectCount,
    caseStudyCount,
    articleCount,
    testimonialCount,
    courseCount,
    leadCounts,
  ] = await Promise.all([
    prisma.experience.count({ where: { locale: LOCALE } }),
    prisma.project.count({ where: { locale: LOCALE } }),
    prisma.caseStudy.count({ where: { locale: LOCALE } }),
    prisma.article.count({ where: { locale: LOCALE } }),
    prisma.testimonial.count({ where: { locale: LOCALE } }),
    prisma.courseProvider.count(),
    prisma.lead.groupBy({ by: ["status"], _count: true }),
  ]);

  const newLeads = leadCounts.find((l) => l.status === "NEW")?._count ?? 0;
  const totalLeads = leadCounts.reduce((sum, l) => sum + l._count, 0);

  const contentCards = [
    { label: "Experience", count: experienceCount, href: "/admin/experience" },
    { label: "Projects", count: projectCount, href: "/admin/projects" },
    { label: "Case studies", count: caseStudyCount, href: "/admin/case-studies" },
    { label: "Articles", count: articleCount, href: "/admin/articles" },
    { label: "Testimonials", count: testimonialCount, href: "/admin/testimonials" },
    { label: "Courses", count: courseCount, href: "/admin/courses" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-fg">Dashboard</h1>
      <p className="mt-3 text-sm text-fg-dim">Content and lead overview.</p>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
        {contentCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-line p-6 transition-colors hover:border-accent"
          >
            <p className="font-display text-3xl font-semibold text-fg">{card.count}</p>
            <p className="mt-2 text-sm text-fg-dim">{card.label}</p>
          </Link>
        ))}

        <Link
          href="/admin/leads"
          className="rounded-2xl border border-line p-6 transition-colors hover:border-accent"
        >
          <p className="font-display text-3xl font-semibold text-fg">{totalLeads}</p>
          <p className="mt-2 text-sm text-fg-dim">
            Leads{newLeads > 0 && <span className="ml-2 text-accent">({newLeads} new)</span>}
          </p>
        </Link>
      </div>
    </div>
  );
}
