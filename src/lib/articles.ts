/**
 * Types for technical notes rendered at /notes/[slug].
 *
 * The data itself moved to the database as of Part 2 of the backend rollout
 * — see src/lib/content/queries.ts (getArticle/getArticles).
 */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "code"; lang: string; code: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readingTime: string;
  tags: string[];
  blocks: ArticleBlock[];
};
