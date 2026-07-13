import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticle, type ArticleBlock } from "@/lib/articles";
import { site } from "@/lib/site";
import { Reveal } from "@/components/anim/Reveal";
import { SplitReveal } from "@/components/anim/SplitReveal";
import { TransitionLink } from "@/components/providers/Transition";

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/notes/${article.slug}` },
    openGraph: {
      title: `${article.title} — ${site.name}`,
      description: article.description,
      url: `${site.url}/notes/${article.slug}`,
      type: "article",
      publishedTime: article.date,
      authors: [site.name],
    },
  };
}

const dateFmt = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <SplitReveal as="h2" className="mt-14 font-display text-2xl font-semibold leading-tight md:text-3xl">
          {block.text}
        </SplitReveal>
      );
    case "p":
      return (
        <Reveal as="p" className="text-base leading-relaxed text-fg-dim">
          {block.text}
        </Reveal>
      );
    case "code":
      return (
        <Reveal>
          <pre className="overflow-x-auto rounded-xl border border-line bg-ink-soft p-5 font-mono text-[0.82rem] leading-relaxed text-fg-dim">
            <code>{block.code}</code>
          </pre>
        </Reveal>
      );
    case "ul":
      return (
        <Reveal as="ul" className="flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-base leading-relaxed text-fg-dim">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </Reveal>
      );
    case "quote":
      return (
        <Reveal
          as="blockquote"
          className="border-l-2 border-accent pl-6 font-serif-it text-xl leading-snug text-fg md:text-2xl"
        >
          {block.text}
        </Reveal>
      );
  }
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const others = articles.filter((a) => a.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { "@type": "Person", name: site.name, url: site.url },
    url: `${site.url}/notes/${article.slug}`,
  };

  return (
    <main className="section-px pt-32 md:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl">
        <Reveal className="flex items-center gap-3 text-sm text-muted">
          <TransitionLink href="/#notes" className="transition-colors hover:text-fg">
            Notes
          </TransitionLink>
          <span>/</span>
          <span className="font-mono text-xs">
            {dateFmt.format(new Date(article.date))} · {article.readingTime}
          </span>
        </Reveal>

        <SplitReveal as="h1" className="mt-8 font-display text-4xl font-semibold leading-tight text-balance md:text-5xl">
          {article.title}
        </SplitReveal>

        <Reveal as="p" delay={0.1} className="mt-6 text-lg leading-relaxed text-fg-dim">
          {article.description}
        </Reveal>

        <Reveal className="mt-6 flex flex-wrap gap-2">
          {article.tags.map((t) => (
            <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
              {t}
            </span>
          ))}
        </Reveal>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-14">
          {article.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {/* Author sign-off / CTA */}
        <Reveal className="mt-20 rounded-2xl border border-line bg-ink-soft/50 p-8">
          <p className="text-base leading-relaxed text-fg-dim">
            I&apos;m {site.firstName} — a full-stack engineer building real-time platforms
            and AI products. If you&apos;re working on something in this space,{" "}
            <a href={site.socials.email} className="text-accent underline-offset-4 hover:underline">
              I&apos;d love to hear about it
            </a>
            .
          </p>
        </Reveal>
      </article>

      {/* Next note */}
      {others.length > 0 && (
        <div className="mx-auto mt-24 max-w-3xl border-t border-line py-16">
          <Reveal as="p" className="eyebrow">
            Read next
          </Reveal>
          {others.map((a) => (
            <TransitionLink
              key={a.slug}
              href={`/notes/${a.slug}`}
              dataCursorLabel="Read note →"
              className="group mt-6 block"
            >
              <span className="block font-display text-2xl font-semibold leading-tight transition-colors duration-300 group-hover:text-accent md:text-3xl">
                {a.title}
                <span className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </span>
            </TransitionLink>
          ))}
        </div>
      )}
    </main>
  );
}
