import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getCaseStudies, getArticles } from "@/lib/content/queries";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [caseStudies, articles] = await Promise.all([getCaseStudies(), getArticles()]);
  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...caseStudies.map((cs) => ({
      url: `${site.url}/work/${cs.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: `${site.url}/notes/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
