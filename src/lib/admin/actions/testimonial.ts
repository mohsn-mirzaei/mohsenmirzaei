"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { requireAdminSession } from "@/lib/admin/auth";
import { testimonialSchema } from "@/lib/admin/schemas";
import { LOCALE, resolveSlug, type RecordActionState } from "@/lib/admin/crud-helpers";

function buildInput(formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const link = String(formData.get("link") ?? "").trim();
  const avatar = String(formData.get("avatar") ?? "").trim();
  return {
    slug: resolveSlug(formData.get("slug"), name),
    quote: String(formData.get("quote") ?? ""),
    name,
    role: String(formData.get("role") ?? ""),
    company: String(formData.get("company") ?? ""),
    link: link || undefined,
    avatar: avatar || undefined,
  };
}

export async function createTestimonial(
  _prev: RecordActionState,
  formData: FormData,
): Promise<RecordActionState> {
  await requireAdminSession();
  const parsed = testimonialSchema.safeParse(buildInput(formData));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const existing = await prisma.testimonial.findFirst({
    where: { slug: parsed.data.slug, locale: LOCALE },
    select: { id: true },
  });
  if (existing) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is already in use.` };
  }

  const order = await prisma.testimonial.count({ where: { locale: LOCALE } });
  await prisma.testimonial.create({ data: { ...parsed.data, locale: LOCALE, order } });

  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(
  id: string,
  _prev: RecordActionState,
  formData: FormData,
): Promise<RecordActionState> {
  await requireAdminSession();
  const parsed = testimonialSchema.safeParse(buildInput(formData));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const existing = await prisma.testimonial.findFirst({
    where: { slug: parsed.data.slug, locale: LOCALE, id: { not: id } },
    select: { id: true },
  });
  if (existing) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is already in use.` };
  }

  await prisma.testimonial.update({ where: { id }, data: parsed.data });

  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function removeTestimonial(id: string): Promise<void> {
  await requireAdminSession();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
}

export async function reorderTestimonial(id: string, direction: "up" | "down"): Promise<void> {
  await requireAdminSession();
  const rows = await prisma.testimonial.findMany({
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
    prisma.testimonial.update({ where: { id: a.id }, data: { order: b.order } }),
    prisma.testimonial.update({ where: { id: b.id }, data: { order: a.order } }),
  ]);

  revalidatePath("/");
}
