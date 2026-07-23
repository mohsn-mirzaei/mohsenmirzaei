import { config } from "dotenv";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { experiences } from "./seed-data/experiences";
import { projects } from "./seed-data/projects";
import { caseStudies } from "./seed-data/case-studies";
import { articles } from "./seed-data/articles";
import { testimonials } from "./seed-data/testimonials";

// tsx runs this file standalone (not through the Prisma CLI's own env
// loading via prisma.config.ts), so DATABASE_URL needs loading explicitly.
config({ path: ".env.local" });

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const LOCALE = "en" as const;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function seedExperiences() {
  for (const [index, experience] of experiences.entries()) {
    const slug = slugify(experience.company);
    const data = {
      slug,
      locale: LOCALE,
      company: experience.company,
      role: experience.role,
      period: experience.period,
      summary: experience.summary,
      highlights: experience.highlights,
      metrics: experience.metrics ?? undefined,
      stack: experience.stack,
      link: experience.link,
      order: index,
    };
    await prisma.experience.upsert({
      where: { slug_locale: { slug, locale: LOCALE } },
      create: data,
      update: data,
    });
  }
}

async function seedProjects() {
  for (const [index, project] of projects.entries()) {
    const data = {
      slug: project.slug,
      locale: LOCALE,
      title: project.title,
      category: project.category,
      year: project.year,
      description: project.description,
      bullets: project.bullets,
      stack: project.stack,
      mediaImage: project.media.image,
      mediaAlt: project.media.alt,
      mediaVideo: project.media.video,
      link: project.link,
      repo: project.repo,
      caseStudy: project.caseStudy ?? false,
      featured: project.featured ?? false,
      order: index,
    };
    await prisma.project.upsert({
      where: { slug_locale: { slug: project.slug, locale: LOCALE } },
      create: data,
      update: data,
    });
  }
}

async function seedCaseStudies() {
  for (const [index, caseStudy] of caseStudies.entries()) {
    const data = {
      slug: caseStudy.slug,
      locale: LOCALE,
      title: caseStudy.title,
      eyebrow: caseStudy.eyebrow,
      year: caseStudy.year,
      role: caseStudy.role,
      timeline: caseStudy.timeline,
      team: caseStudy.team,
      intro: caseStudy.intro,
      heroMediaSrc: caseStudy.heroMedia.src,
      heroMediaAlt: caseStudy.heroMedia.alt,
      heroMediaCaption: caseStudy.heroMedia.caption,
      heroMediaVideo: caseStudy.heroMedia.video,
      metrics: caseStudy.metrics,
      stack: caseStudy.stack,
      liveUrl: caseStudy.liveUrl,
      repoUrl: caseStudy.repoUrl,
      order: index,
    };
    const row = await prisma.caseStudy.upsert({
      where: { slug_locale: { slug: caseStudy.slug, locale: LOCALE } },
      create: data,
      update: data,
    });

    // Sections have no natural key beyond (caseStudyId, order) — delete +
    // recreate is simpler and equally idempotent as a per-row upsert.
    await prisma.caseStudySection.deleteMany({ where: { caseStudyId: row.id } });
    await prisma.caseStudySection.createMany({
      data: caseStudy.sections.map((section, sectionIndex) => ({
        caseStudyId: row.id,
        order: sectionIndex,
        kicker: section.kicker,
        heading: section.heading,
        body: section.body,
        bullets: section.bullets ?? [],
        mediaSrc: section.media?.src,
        mediaAlt: section.media?.alt,
        mediaCaption: section.media?.caption,
        mediaVideo: section.media?.video,
      })),
    });
  }
}

async function seedArticles() {
  for (const [index, article] of articles.entries()) {
    const data = {
      slug: article.slug,
      locale: LOCALE,
      title: article.title,
      description: article.description,
      date: new Date(article.date),
      readingTime: article.readingTime,
      tags: article.tags,
      blocks: article.blocks,
      order: index,
    };
    await prisma.article.upsert({
      where: { slug_locale: { slug: article.slug, locale: LOCALE } },
      create: data,
      update: data,
    });
  }
}

async function seedTestimonials() {
  for (const [index, testimonial] of testimonials.entries()) {
    const slug = slugify(testimonial.name);
    const data = {
      slug,
      locale: LOCALE,
      quote: testimonial.quote,
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      link: testimonial.link,
      avatar: testimonial.avatar,
      order: index,
    };
    await prisma.testimonial.upsert({
      where: { slug_locale: { slug, locale: LOCALE } },
      create: data,
      update: data,
    });
  }
}

async function main() {
  await seedExperiences();
  await seedProjects();
  await seedCaseStudies();
  await seedArticles();
  await seedTestimonials();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
