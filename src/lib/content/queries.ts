import { prisma } from "@/lib/db/client";
import type { Experience, Project, Testimonial } from "@/lib/data";
import type { CaseStudy, CaseSection } from "@/lib/case-studies";
import type { Article } from "@/lib/articles";
import type { CourseProvider } from "@/lib/courses";

/**
 * The only place that talks to Prisma for content. Every function returns
 * data shaped exactly like the app already expects it (the types in
 * src/lib/data.ts, case-studies.ts, articles.ts), so components written
 * against the old static arrays don't need to change.
 */

const LOCALE = "en" as const;

export async function getExperiences(): Promise<Experience[]> {
  const rows = await prisma.experience.findMany({
    where: { locale: LOCALE },
    orderBy: { order: "asc" },
  });
  return rows.map((row) => ({
    company: row.company,
    role: row.role,
    period: row.period,
    summary: row.summary,
    highlights: row.highlights,
    metrics: (row.metrics as Experience["metrics"]) ?? undefined,
    stack: row.stack,
    link: row.link ?? undefined,
  }));
}

export async function getProjects(): Promise<Project[]> {
  const rows = await prisma.project.findMany({
    where: { locale: LOCALE },
    orderBy: { order: "asc" },
  });
  return rows.map((row) => ({
    title: row.title,
    slug: row.slug,
    category: row.category,
    year: row.year,
    description: row.description,
    bullets: row.bullets,
    stack: row.stack,
    media: {
      image: row.mediaImage,
      alt: row.mediaAlt,
      video: row.mediaVideo ?? undefined,
    },
    link: row.link ?? undefined,
    repo: row.repo ?? undefined,
    caseStudy: row.caseStudy,
    featured: row.featured,
  }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await prisma.testimonial.findMany({
    where: { locale: LOCALE },
    orderBy: { order: "asc" },
  });
  return rows.map((row) => ({
    quote: row.quote,
    name: row.name,
    role: row.role,
    company: row.company,
    link: row.link ?? undefined,
    avatar: row.avatar ?? undefined,
  }));
}

function toCaseStudy(
  row: Awaited<ReturnType<typeof prisma.caseStudy.findFirstOrThrow>> & {
    sections: Array<{
      order: number;
      kicker: string;
      heading: string;
      body: string[];
      bullets: string[];
      mediaSrc: string | null;
      mediaAlt: string | null;
      mediaCaption: string | null;
      mediaVideo: string | null;
    }>;
  },
): CaseStudy {
  return {
    slug: row.slug,
    title: row.title,
    eyebrow: row.eyebrow,
    year: row.year,
    role: row.role,
    timeline: row.timeline,
    team: row.team,
    intro: row.intro,
    heroMedia: {
      src: row.heroMediaSrc,
      alt: row.heroMediaAlt,
      caption: row.heroMediaCaption ?? undefined,
      video: row.heroMediaVideo ?? undefined,
    },
    metrics: row.metrics as CaseStudy["metrics"],
    stack: row.stack,
    liveUrl: row.liveUrl ?? undefined,
    repoUrl: row.repoUrl ?? undefined,
    sections: row.sections
      .sort((a, b) => a.order - b.order)
      .map(
        (section): CaseSection => ({
          kicker: section.kicker,
          heading: section.heading,
          body: section.body,
          bullets: section.bullets.length > 0 ? section.bullets : undefined,
          media: section.mediaSrc
            ? {
                src: section.mediaSrc,
                alt: section.mediaAlt ?? "",
                caption: section.mediaCaption ?? undefined,
                video: section.mediaVideo ?? undefined,
              }
            : undefined,
        }),
      ),
  };
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const rows = await prisma.caseStudy.findMany({
    where: { locale: LOCALE },
    orderBy: { order: "asc" },
    include: { sections: true },
  });
  return rows.map(toCaseStudy);
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const row = await prisma.caseStudy.findUnique({
    where: { slug_locale: { slug, locale: LOCALE } },
    include: { sections: true },
  });
  return row ? toCaseStudy(row) : null;
}

/** Next case study in the cycle, for the bottom-of-page handoff nav. */
export async function getNextCaseStudy(slug: string): Promise<CaseStudy> {
  const caseStudies = await getCaseStudies();
  const index = caseStudies.findIndex((c) => c.slug === slug);
  return caseStudies[(index + 1) % caseStudies.length];
}

export async function getArticles(): Promise<Article[]> {
  const rows = await prisma.article.findMany({
    where: { locale: LOCALE },
    orderBy: { order: "asc" },
  });
  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    description: row.description,
    date: row.date.toISOString().slice(0, 10),
    readingTime: row.readingTime,
    tags: row.tags,
    blocks: row.blocks as Article["blocks"],
  }));
}

/** English-only — no `locale` column on CourseProvider/Course, see schema.prisma. */
export async function getCourseProviders(): Promise<CourseProvider[]> {
  const rows = await prisma.courseProvider.findMany({
    orderBy: { order: "asc" },
    include: { courses: { orderBy: { order: "asc" } } },
  });
  return rows.map((row) => ({
    name: row.name,
    url: row.url,
    courses: row.courses.map((course) => ({
      title: course.title,
      hours: course.hours,
      url: course.url,
      free: course.free,
      inProgress: course.inProgress,
      highlights: course.highlights.length > 0 ? course.highlights : undefined,
    })),
  }));
}

export async function getArticle(slug: string): Promise<Article | null> {
  const row = await prisma.article.findUnique({
    where: { slug_locale: { slug, locale: LOCALE } },
  });
  if (!row) return null;
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    date: row.date.toISOString().slice(0, 10),
    readingTime: row.readingTime,
    tags: row.tags,
    blocks: row.blocks as Article["blocks"],
  };
}
