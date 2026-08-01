import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().trim().email("That doesn't look like a valid email."),
  password: z.string().min(1, "Password is required."),
});

export type AdminLoginValues = z.infer<typeof adminLoginSchema>;

/** Empty strings from optional text inputs become `undefined`, not `""`. */
const optionalString = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().trim().optional(),
);

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const slugField = z
  .string()
  .trim()
  .min(1, "Slug is required.")
  .regex(SLUG_RE, "Use lowercase letters, numbers, and hyphens only.");

export const metricSchema = z.object({
  value: z.string().trim().min(1),
  label: z.string().trim().min(1),
});

export const experienceSchema = z.object({
  slug: slugField,
  company: z.string().trim().min(1, "Company is required."),
  role: z.string().trim().min(1, "Role is required."),
  period: z.string().trim().min(1, "Period is required."),
  summary: z.string().trim().min(1, "Summary is required."),
  highlights: z.array(z.string().trim().min(1)),
  metrics: z.array(metricSchema).optional(),
  stack: z.array(z.string().trim().min(1)),
  link: optionalString,
});

export type ExperienceValues = z.infer<typeof experienceSchema>;

export const projectSchema = z.object({
  slug: slugField,
  title: z.string().trim().min(1, "Title is required."),
  category: z.string().trim().min(1, "Category is required."),
  year: z.string().trim().min(1, "Year is required."),
  description: z.string().trim().min(1, "Description is required."),
  bullets: z.array(z.string().trim().min(1)),
  stack: z.array(z.string().trim().min(1)),
  mediaImage: z.string().trim().min(1, "Media image is required."),
  mediaAlt: z.string().trim().min(1, "Media alt text is required."),
  mediaVideo: optionalString,
  link: optionalString,
  repo: optionalString,
  caseStudy: z.boolean(),
  featured: z.boolean(),
});

export type ProjectValues = z.infer<typeof projectSchema>;

export const testimonialSchema = z.object({
  slug: slugField,
  quote: z.string().trim().min(1, "Quote is required."),
  name: z.string().trim().min(1, "Name is required."),
  role: z.string().trim().min(1, "Role is required."),
  company: z.string().trim().min(1, "Company is required."),
  link: optionalString,
  avatar: optionalString,
});

export type TestimonialValues = z.infer<typeof testimonialSchema>;

export const caseStudySectionSchema = z.object({
  kicker: z.string().trim().min(1, "Kicker is required."),
  heading: z.string().trim().min(1, "Heading is required."),
  body: z.array(z.string().trim().min(1)).min(1, "Body needs at least one paragraph."),
  bullets: z.array(z.string().trim().min(1)).optional(),
  mediaSrc: optionalString,
  mediaAlt: optionalString,
  mediaCaption: optionalString,
  mediaVideo: optionalString,
});

export type CaseStudySectionValues = z.infer<typeof caseStudySectionSchema>;

export const caseStudySchema = z.object({
  slug: slugField,
  title: z.string().trim().min(1, "Title is required."),
  eyebrow: z.string().trim().min(1, "Eyebrow is required."),
  year: z.string().trim().min(1, "Year is required."),
  role: z.string().trim().min(1, "Role is required."),
  timeline: z.string().trim().min(1, "Timeline is required."),
  team: z.string().trim().min(1, "Team is required."),
  intro: z.string().trim().min(1, "Intro is required."),
  heroMediaSrc: z.string().trim().min(1, "Hero media src is required."),
  heroMediaAlt: z.string().trim().min(1, "Hero media alt is required."),
  heroMediaCaption: optionalString,
  heroMediaVideo: optionalString,
  metrics: z.array(metricSchema).min(1, "At least one metric is required."),
  stack: z.array(z.string().trim().min(1)),
  liveUrl: optionalString,
  repoUrl: optionalString,
  sections: z.array(caseStudySectionSchema).min(1, "At least one section is required."),
});

export type CaseStudyValues = z.infer<typeof caseStudySchema>;

export const articleBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("p"), text: z.string().trim().min(1) }),
  z.object({ type: z.literal("h2"), text: z.string().trim().min(1) }),
  z.object({
    type: z.literal("code"),
    lang: z.string().trim().min(1),
    code: z.string().trim().min(1),
  }),
  z.object({ type: z.literal("ul"), items: z.array(z.string().trim().min(1)).min(1) }),
  z.object({ type: z.literal("quote"), text: z.string().trim().min(1) }),
]);

export type ArticleBlockValues = z.infer<typeof articleBlockSchema>;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export const articleSchema = z.object({
  slug: slugField,
  title: z.string().trim().min(1, "Title is required."),
  description: z.string().trim().min(1, "Description is required."),
  date: z.string().trim().regex(DATE_RE, "Use YYYY-MM-DD format."),
  readingTime: z.string().trim().min(1, "Reading time is required."),
  tags: z.array(z.string().trim().min(1)),
  blocks: z.array(articleBlockSchema).min(1, "At least one block is required."),
});

export type ArticleValues = z.infer<typeof articleSchema>;

export const leadStatusSchema = z.enum(["NEW", "READ", "REPLIED", "ARCHIVED"]);
