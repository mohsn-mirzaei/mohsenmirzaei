import { ArticleForm } from "@/components/admin/ArticleForm";
import { articleFields } from "@/lib/admin/models";
import { createArticle } from "@/lib/admin/actions/article";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-fg">New article</h1>
      <div className="mt-8">
        <ArticleForm
          fields={articleFields}
          defaultValues={{}}
          initialBlocks={[]}
          action={createArticle}
          submitLabel="Create"
        />
      </div>
    </div>
  );
}
