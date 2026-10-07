"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { requireAdminSession } from "@/lib/admin/auth";
import { courseProviderSchema, type CourseProviderValues } from "@/lib/admin/schemas";
import { resolveSlug, type RecordActionState } from "@/lib/admin/crud-helpers";

interface CourseDraft {
  title?: string;
  hours?: string;
  url?: string;
  free?: boolean;
  inProgress?: boolean;
  highlights?: string;
}

function buildInput(formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const url = String(formData.get("url") ?? "");

  let courseDrafts: CourseDraft[] = [];
  try {
    courseDrafts = JSON.parse(String(formData.get("coursesJson") ?? "[]"));
  } catch {
    courseDrafts = [];
  }

  const courses = courseDrafts.map((c) => ({
    title: (c.title ?? "").trim(),
    hours: Number.parseFloat(c.hours ?? "") || 0,
    url: (c.url ?? "").trim(),
    free: c.free ?? false,
    inProgress: c.inProgress ?? false,
    highlights: (c.highlights ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
  }));

  return {
    slug: resolveSlug(formData.get("slug"), name),
    name,
    url,
    courses,
  };
}

/** Scalar upsert + delete-and-recreate courses in one transaction — same idempotent pattern as case-study.ts. */
async function persist(id: string | null, parsed: CourseProviderValues) {
  const { courses, ...scalar } = parsed;

  return prisma.$transaction(async (tx) => {
    const providerRow = id
      ? await tx.courseProvider.update({ where: { id }, data: scalar })
      : await tx.courseProvider.create({
          data: { ...scalar, order: await tx.courseProvider.count() },
        });

    await tx.course.deleteMany({ where: { providerId: providerRow.id } });
    await tx.course.createMany({
      data: courses.map((course, index) => ({
        providerId: providerRow.id,
        order: index,
        ...course,
      })),
    });

    return providerRow;
  });
}

export async function createCourseProvider(
  _prev: RecordActionState,
  formData: FormData,
): Promise<RecordActionState> {
  await requireAdminSession();
  const parsed = courseProviderSchema.safeParse(buildInput(formData));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const existing = await prisma.courseProvider.findUnique({
    where: { slug: parsed.data.slug },
    select: { id: true },
  });
  if (existing) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is already in use.` };
  }

  await persist(null, parsed.data);

  revalidatePath("/");
  redirect("/admin/courses");
}

export async function updateCourseProvider(
  id: string,
  _prev: RecordActionState,
  formData: FormData,
): Promise<RecordActionState> {
  await requireAdminSession();
  const parsed = courseProviderSchema.safeParse(buildInput(formData));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const existing = await prisma.courseProvider.findFirst({
    where: { slug: parsed.data.slug, id: { not: id } },
    select: { id: true },
  });
  if (existing) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is already in use.` };
  }

  await persist(id, parsed.data);

  revalidatePath("/");
  redirect("/admin/courses");
}

export async function removeCourseProvider(id: string): Promise<void> {
  await requireAdminSession();
  await prisma.courseProvider.delete({ where: { id } }); // cascades to Course
  revalidatePath("/");
}

export async function reorderCourseProvider(id: string, direction: "up" | "down"): Promise<void> {
  await requireAdminSession();
  const rows = await prisma.courseProvider.findMany({
    orderBy: { order: "asc" },
    select: { id: true, order: true },
  });
  const index = rows.findIndex((r) => r.id === id);
  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapIndex < 0 || swapIndex >= rows.length) return;

  const a = rows[index];
  const b = rows[swapIndex];
  await prisma.$transaction([
    prisma.courseProvider.update({ where: { id: a.id }, data: { order: b.order } }),
    prisma.courseProvider.update({ where: { id: b.id }, data: { order: a.order } }),
  ]);

  revalidatePath("/");
}
