"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { requireAdminSession } from "@/lib/admin/auth";
import { experienceSchema } from "@/lib/admin/schemas";
import {
  LOCALE,
  parseStringList,
  parseMetricPairs,
  resolveSlug,
  type RecordActionState,
} from "@/lib/admin/crud-helpers";

function buildInput(formData: FormData) {
  const company = String(formData.get("company") ?? "");
  const metrics = parseMetricPairs(formData.get("metrics"));
  const link = String(formData.get("link") ?? "").trim();
  return {
    slug: resolveSlug(formData.get("slug"), company),
    company,
    role: String(formData.get("role") ?? ""),
    period: String(formData.get("period") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    highlights: parseStringList(formData.get("highlights"), "\n"),
    metrics: metrics.length > 0 ? metrics : undefined,
    stack: parseStringList(formData.get("stack"), ","),
    link: link || undefined,
  };
}

export async function createExperience(
  _prev: RecordActionState,
  formData: FormData,
): Promise<RecordActionState> {
  await requireAdminSession();
  const parsed = experienceSchema.safeParse(buildInput(formData));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const existing = await prisma.experience.findFirst({
    where: { slug: parsed.data.slug, locale: LOCALE },
    select: { id: true },
  });
  if (existing) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is already in use.` };
  }

  const order = await prisma.experience.count({ where: { locale: LOCALE } });
  await prisma.experience.create({ data: { ...parsed.data, locale: LOCALE, order } });

  revalidatePath("/");
  redirect("/admin/experience");
}

export async function updateExperience(
  id: string,
  _prev: RecordActionState,
  formData: FormData,
): Promise<RecordActionState> {
  await requireAdminSession();
  const parsed = experienceSchema.safeParse(buildInput(formData));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const existing = await prisma.experience.findFirst({
    where: { slug: parsed.data.slug, locale: LOCALE, id: { not: id } },
    select: { id: true },
  });
  if (existing) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is already in use.` };
  }

  await prisma.experience.update({ where: { id }, data: parsed.data });

  revalidatePath("/");
  redirect("/admin/experience");
}

export async function removeExperience(id: string): Promise<void> {
  await requireAdminSession();
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
}

export async function reorderExperience(id: string, direction: "up" | "down"): Promise<void> {
  await requireAdminSession();
  const rows = await prisma.experience.findMany({
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
    prisma.experience.update({ where: { id: a.id }, data: { order: b.order } }),
    prisma.experience.update({ where: { id: b.id }, data: { order: a.order } }),
  ]);

  revalidatePath("/");
}
