import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { caseStudies } from "@/lib/case-studies";
import { articles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
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
