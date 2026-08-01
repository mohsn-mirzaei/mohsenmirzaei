"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { requireAdminSession } from "@/lib/admin/auth";
import { projectSchema } from "@/lib/admin/schemas";
import { LOCALE, parseStringList, resolveSlug, type RecordActionState } from "@/lib/admin/crud-helpers";

function buildInput(formData: FormData) {
  const title = String(formData.get("title") ?? "");
  const mediaVideo = String(formData.get("mediaVideo") ?? "").trim();
  const link = String(formData.get("link") ?? "").trim();
  const repo = String(formData.get("repo") ?? "").trim();
  return {
    slug: resolveSlug(formData.get("slug"), title),
    title,
    category: String(formData.get("category") ?? ""),
    year: String(formData.get("year") ?? ""),
    description: String(formData.get("description") ?? ""),
    bullets: parseStringList(formData.get("bullets"), "\n"),
    stack: parseStringList(formData.get("stack"), ","),
    mediaImage: String(formData.get("mediaImage") ?? ""),
    mediaAlt: String(formData.get("mediaAlt") ?? ""),
    mediaVideo: mediaVideo || undefined,
    link: link || undefined,
    repo: repo || undefined,
    caseStudy: formData.get("caseStudy") === "on",
    featured: formData.get("featured") === "on",
  };
}

export async function createProject(
  _prev: RecordActionState,
  formData: FormData,
): Promise<RecordActionState> {
  await requireAdminSession();
  const parsed = projectSchema.safeParse(buildInput(formData));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const existing = await prisma.project.findFirst({
    where: { slug: parsed.data.slug, locale: LOCALE },
    select: { id: true },
  });
  if (existing) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is already in use.` };
  }

  const order = await prisma.project.count({ where: { locale: LOCALE } });
  await prisma.project.create({ data: { ...parsed.data, locale: LOCALE, order } });

  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  _prev: RecordActionState,
  formData: FormData,
): Promise<RecordActionState> {
  await requireAdminSession();
  const parsed = projectSchema.safeParse(buildInput(formData));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const existing = await prisma.project.findFirst({
    where: { slug: parsed.data.slug, locale: LOCALE, id: { not: id } },
    select: { id: true },
  });
  if (existing) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is already in use.` };
  }

  await prisma.project.update({ where: { id }, data: parsed.data });

  revalidatePath("/");
  redirect("/admin/projects");
}

export async function removeProject(id: string): Promise<void> {
  await requireAdminSession();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
}

export async function reorderProject(id: string, direction: "up" | "down"): Promise<void> {
  await requireAdminSession();
  const rows = await prisma.project.findMany({
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
    prisma.project.update({ where: { id: a.id }, data: { order: b.order } }),
    prisma.project.update({ where: { id: b.id }, data: { order: a.order } }),
  ]);

  revalidatePath("/");
}
