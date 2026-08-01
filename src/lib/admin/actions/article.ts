"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { requireAdminSession } from "@/lib/admin/auth";
import { articleSchema, type ArticleValues } from "@/lib/admin/schemas";
import { LOCALE, parseStringList, resolveSlug, type RecordActionState } from "@/lib/admin/crud-helpers";

interface BlockDraft {
  type?: string;
  text?: string;
  lang?: string;
  code?: string;
  items?: string;
}

function normalizeBlock(draft: BlockDraft) {
  switch (draft.type) {
    case "p":
    case "h2":
    case "quote":
      return { type: draft.type, text: (draft.text ?? "").trim() };
    case "code":
      return { type: "code" as const, lang: (draft.lang ?? "").trim(), code: (draft.code ?? "").trim() };
    case "ul":
      return {
        type: "ul" as const,
        items: (draft.items ?? "")
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
      };
    default:
      return null;
  }
}

function buildInput(formData: FormData) {
  const title = String(formData.get("title") ?? "");

  let blockDrafts: BlockDraft[] = [];
  try {
    blockDrafts = JSON.parse(String(formData.get("blocksJson") ?? "[]"));
  } catch {
    blockDrafts = [];
  }
  const blocks = blockDrafts
    .map(normalizeBlock)
    .filter((b): b is NonNullable<typeof b> => b !== null);

  return {
    slug: resolveSlug(formData.get("slug"), title),
    title,
    description: String(formData.get("description") ?? ""),
    date: String(formData.get("date") ?? "").trim(),
    readingTime: String(formData.get("readingTime") ?? ""),
    tags: parseStringList(formData.get("tags"), ","),
    blocks,
  };
}

async function persist(id: string | null, parsed: ArticleValues) {
  const { date, ...rest } = parsed;
  const data = { ...rest, date: new Date(date) };

  if (id) {
    return prisma.article.update({ where: { id }, data });
  }
  const order = await prisma.article.count({ where: { locale: LOCALE } });
  return prisma.article.create({ data: { ...data, locale: LOCALE, order } });
}

/** Concrete literal paths only — see case-study.ts for why the "/notes/[slug]" pattern form doesn't work here. */
async function revalidateArticlePaths(slug: string, alsoSlug?: string) {
  revalidatePath("/");
  revalidatePath(`/notes/${slug}`);
  if (alsoSlug && alsoSlug !== slug) revalidatePath(`/notes/${alsoSlug}`);
}

export async function createArticle(
  _prev: RecordActionState,
  formData: FormData,
): Promise<RecordActionState> {
  await requireAdminSession();
  const parsed = articleSchema.safeParse(buildInput(formData));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const existing = await prisma.article.findFirst({
    where: { slug: parsed.data.slug, locale: LOCALE },
    select: { id: true },
  });
  if (existing) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is already in use.` };
  }

  await persist(null, parsed.data);

  await revalidateArticlePaths(parsed.data.slug);
  revalidatePath("/sitemap.xml");
  redirect("/admin/articles");
}

export async function updateArticle(
  id: string,
  _prev: RecordActionState,
  formData: FormData,
): Promise<RecordActionState> {
  await requireAdminSession();
  const parsed = articleSchema.safeParse(buildInput(formData));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const existing = await prisma.article.findFirst({
    where: { slug: parsed.data.slug, locale: LOCALE, id: { not: id } },
    select: { id: true },
  });
  if (existing) {
    return { ok: false, error: `Slug "${parsed.data.slug}" is already in use.` };
  }

  const before = await prisma.article.findUnique({ where: { id }, select: { slug: true } });
  await persist(id, parsed.data);

  await revalidateArticlePaths(parsed.data.slug, before?.slug);
  redirect("/admin/articles");
}

export async function removeArticle(id: string): Promise<void> {
  await requireAdminSession();
  const existing = await prisma.article.findUnique({ where: { id }, select: { slug: true } });
  await prisma.article.delete({ where: { id } });
  if (existing) await revalidateArticlePaths(existing.slug);
  revalidatePath("/sitemap.xml");
}

export async function reorderArticle(id: string, direction: "up" | "down"): Promise<void> {
  await requireAdminSession();
  const rows = await prisma.article.findMany({
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
    prisma.article.update({ where: { id: a.id }, data: { order: b.order } }),
    prisma.article.update({ where: { id: b.id }, data: { order: a.order } }),
  ]);

  revalidatePath("/"); // homepage Notes list order changed
}
