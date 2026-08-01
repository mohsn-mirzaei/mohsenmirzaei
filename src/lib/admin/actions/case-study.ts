"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { requireAdminSession } from "@/lib/admin/auth";
import { caseStudySchema, type CaseStudyValues } from "@/lib/admin/schemas";
import {
  LOCALE,
  parseStringList,
  parseMetricPairs,
  resolveSlug,
  type RecordActionState,
} from "@/lib/admin/crud-helpers";

interface SectionDraft {
  kicker?: string;
  heading?: string;
  body?: string;
  bullets?: string;
  mediaSrc?: string;
  mediaAlt?: string;
  mediaCaption?: string;
  mediaVideo?: string;
}

function buildInput(formData: FormData) {
  const title = String(formData.get("title") ?? "");
  const heroMediaCaption = String(formData.get("heroMediaCaption") ?? "").trim();
  const heroMediaVideo = String(formData.get("heroMediaVideo") ?? "").trim();
  const liveUrl = String(formData.get("liveUrl") ?? "").trim();
  const repoUrl = String(formData.get("repoUrl") ?? "").trim();

  let sectionDrafts: SectionDraft[] = [];
  try {
    sectionDrafts = JSON.parse(String(formData.get("sectionsJson") ?? "[]"));
  } catch {
    sectionDrafts = [];
  }

  const sections = sectionDrafts.map((s) => ({
    kicker: (s.kicker ?? "").trim(),
    heading: (s.heading ?? "").trim(),
    body: (s.body ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    bullets: (s.bullets ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    mediaSrc: s.mediaSrc?.trim() || undefined,
    mediaAlt: s.mediaAlt?.trim() || undefined,
    mediaCaption: s.mediaCaption?.trim() || undefined,
    mediaVideo: s.mediaVideo?.trim() || undefined,
  }));

  return {
    slug: resolveSlug(formData.get("slug"), title),
    title,
    eyebrow: String(formData.get("eyebrow") ?? ""),
    year: String(formData.get("year") ?? ""),
    role: String(formData.get("role") ?? ""),
    timeline: String(formData.get("timeline") ?? ""),
    team: String(formData.get("team") ?? ""),
    intro: String(formData.get("intro") ?? ""),
    heroMediaSrc: String(formData.get("heroMediaSrc") ?? ""),
    heroMediaAlt: String(formData.get("heroMediaAlt") ?? ""),
    heroMediaCaption: heroMediaCaption || undefined,
    heroMediaVideo: heroMediaVideo || undefined,
    metrics: parseMetricPairs(formData.get("metrics")),
    stack: parseStringList(formData.get("stack"), ","),
    liveUrl: liveUrl || undefined,
    repoUrl: repoUrl || undefined,
    sections,
  };
}

/** Scalar upsert + delete-and-recreate sections in one transaction — same idempotent pattern as prisma/seed.ts. */
async function persist(id: string | null, parsed: CaseStudyValues) {
  const { sections, ...scalar } = parsed;

  return prisma.$transaction(async (tx) => {
    const caseStudyRow = id
      ? await tx.caseStudy.update({ where: { id }, data: scalar })
      : await tx.caseStudy.create({
          data: {
            ...scalar,
            locale: LOCALE,
            order: await tx.caseStudy.count({ where: { locale: LOCALE } }),
          },
        });

    await tx.caseStudySection.deleteMany({ where: { caseStudyId: caseStudyRow.id } });
    await tx.caseStudySection.createMany({
      data: sections.map((section, index) => ({
        caseStudyId: caseStudyRow.id,
        order: index,
        ...section,
      })),
    });

    return caseStudyRow;
  });
}

/**
 * `revalidatePath("/work/[slug]", "page")` (the dynamic-segment pattern form)
 * does not actually invalidate anything on this Next 16 Turbopack build —
 * confirmed by direct testing. Concrete literal paths do, so every case
 * study's own path is revalidated individually. Cheap at this scale (a
 * handful of case studies) and correct regardless of which slug's content or
 * ordering actually changed — cross-links via getNextCaseStudy mean any
 * mutation can affect another case study's page.
 */
async function revalidateAllCaseStudyPaths(alsoSlug?: string) {
  const rows = await prisma.caseStudy.findMany({ where: { locale: LOCALE }, select: { slug: true } });
  const slugs = new Set(rows.map((r) => r.slug));
  if (alsoSlug) slugs.add(alsoSlug);
  for (const slug of slugs) {
    revalidatePath(`/work/${slug}`);
  }
}

export async function createCaseStudy(
  _prev: RecordActionState,
  formData: FormData,
): Promise<RecordActionState> {
  await requireAdminSession();
  const parsed = caseStudySchema.safeParse(buildInput(formData));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const existing = await prisma.caseStudy.findFirst({
    where: { slug: parsed.data.slug, locale: LOCALE },
    select: { id: true },
  });
  if (existing) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is already in use.` };
  }

  await persist(null, parsed.data);

  await revalidateAllCaseStudyPaths();
  revalidatePath("/sitemap.xml");
  redirect("/admin/case-studies");
}

export async function updateCaseStudy(
  id: string,
  _prev: RecordActionState,
  formData: FormData,
): Promise<RecordActionState> {
  await requireAdminSession();
  const parsed = caseStudySchema.safeParse(buildInput(formData));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const existing = await prisma.caseStudy.findFirst({
    where: { slug: parsed.data.slug, locale: LOCALE, id: { not: id } },
    select: { id: true },
  });
  if (existing) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is already in use.` };
  }

  const before = await prisma.caseStudy.findUnique({ where: { id }, select: { slug: true } });
  await persist(id, parsed.data);

  // Revalidate the old slug's path too, in case the slug itself changed.
  await revalidateAllCaseStudyPaths(before?.slug);
  redirect("/admin/case-studies");
}

export async function removeCaseStudy(id: string): Promise<void> {
  await requireAdminSession();
  const existing = await prisma.caseStudy.findUnique({ where: { id }, select: { slug: true } });
  await prisma.caseStudy.delete({ where: { id } }); // cascades to CaseStudySection
  await revalidateAllCaseStudyPaths(existing?.slug);
  revalidatePath("/sitemap.xml");
}

export async function reorderCaseStudy(id: string, direction: "up" | "down"): Promise<void> {
  await requireAdminSession();
  const rows = await prisma.caseStudy.findMany({
    where: { locale: LOCALE },
    orderBy: { order: "asc" },
    select: { id: true, order: true },
  });
  const index = rows.findIndex((r) => r.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= rows.length) return;

  const a = rows[index];
  const b = rows[swapIndex];
  await prisma.$transaction([
    prisma.caseStudy.update({ where: { id: a.id }, data: { order: b.order } }),
    prisma.caseStudy.update({ where: { id: b.id }, data: { order: a.order } }),
  ]);

  // Reordering shifts which case study is "next" on every other case study's page.
  await revalidateAllCaseStudyPaths();
}
