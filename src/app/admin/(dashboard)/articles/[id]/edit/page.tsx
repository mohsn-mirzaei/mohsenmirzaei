import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { articleFields } from "@/lib/admin/models";
import { updateArticle } from "@/lib/admin/actions/article";
import { stringifyList } from "@/lib/admin/crud-helpers";
import type { ArticleBlockDraft } from "@/components/admin/ArticleBlocksEditor";
import type { ArticleBlock } from "@/lib/articles";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) notFound();

  const defaultValues = {
    slug: article.slug,
    title: article.title,
    description: article.description,
    date: article.date.toISOString().slice(0, 10),
    readingTime: article.readingTime,
    tags: stringifyList(article.tags, ","),
  };

  const blocks = (article.blocks as ArticleBlock[]) ?? [];
  const initialBlocks: ArticleBlockDraft[] = blocks.map((block) => {
    switch (block.type) {
      case "ul":
        return { type: "ul", items: block.items.join("\n") };
      case "code":
        return { type: "code", lang: block.lang, code: block.code };
      default:
        return { type: block.type, text: block.text };
    }
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-fg">Edit article</h1>
      <div className="mt-8">
        <ArticleForm
          fields={articleFields}
          defaultValues={defaultValues}
          initialBlocks={initialBlocks}
          action={updateArticle.bind(null, article.id)}
          submitLabel="Save"
        />
      </div>
    </div>
  );
}
