import type { Article, CaseStudy, CourseProvider, Experience, Project, Testimonial } from "@/generated/prisma/client";

export type AdminFieldType = "text" | "textarea" | "checkbox" | "string-list" | "metric-pairs";

export interface AdminFieldConfig {
  name: string;
  label: string;
  type: AdminFieldType;
  /** Only meaningful for "string-list". */
  separator?: "," | "\n";
  optional?: boolean;
  helpText?: string;
}

export interface AdminColumnConfig<T> {
  header: string;
  accessor: (row: T) => string;
}

export const experienceFields: AdminFieldConfig[] = [
  {
    name: "slug",
    label: "Slug",
    type: "text",
    optional: true,
    helpText: "Leave blank to auto-generate from Company.",
  },
  { name: "company", label: "Company", type: "text" },
  { name: "role", label: "Role", type: "text" },
  { name: "period", label: "Period", type: "text", helpText: 'e.g. "2023 — Present"' },
  { name: "summary", label: "Summary", type: "textarea" },
  { name: "highlights", label: "Highlights", type: "string-list", separator: "\n", helpText: "One per line." },
  {
    name: "metrics",
    label: "Metrics",
    type: "metric-pairs",
    optional: true,
    helpText: 'One per line, as "value | label" — e.g. "14k+ | Users served".',
  },
  { name: "stack", label: "Stack", type: "string-list", separator: ",", helpText: "Comma-separated." },
  { name: "link", label: "Link", type: "text", optional: true },
];

export const experienceColumns: AdminColumnConfig<Experience>[] = [
  { header: "Company", accessor: (row) => row.company },
  { header: "Role", accessor: (row) => row.role },
  { header: "Period", accessor: (row) => row.period },
];

export const projectFields: AdminFieldConfig[] = [
  {
    name: "slug",
    label: "Slug",
    type: "text",
    optional: true,
    helpText: "Leave blank to auto-generate from Title.",
  },
  { name: "title", label: "Title", type: "text" },
  { name: "category", label: "Category", type: "text" },
  { name: "year", label: "Year", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "bullets", label: "Bullets", type: "string-list", separator: "\n", helpText: "One per line." },
  { name: "stack", label: "Stack", type: "string-list", separator: ",", helpText: "Comma-separated." },
  { name: "mediaImage", label: "Media image", type: "text", helpText: "Path or URL, e.g. /images/projects/x.svg" },
  { name: "mediaAlt", label: "Media alt text", type: "text" },
  { name: "mediaVideo", label: "Media video", type: "text", optional: true },
  { name: "link", label: "Live link", type: "text", optional: true },
  { name: "repo", label: "Repo link", type: "text", optional: true },
  { name: "caseStudy", label: "Has a case study at /work/[slug]", type: "checkbox" },
  { name: "featured", label: "Featured", type: "checkbox" },
];

export const projectColumns: AdminColumnConfig<Project>[] = [
  { header: "Title", accessor: (row) => row.title },
  { header: "Category", accessor: (row) => row.category },
  { header: "Year", accessor: (row) => row.year },
  { header: "Featured", accessor: (row) => (row.featured ? "Yes" : "No") },
];

export const testimonialFields: AdminFieldConfig[] = [
  {
    name: "slug",
    label: "Slug",
    type: "text",
    optional: true,
    helpText: "Leave blank to auto-generate from Name.",
  },
  { name: "name", label: "Name", type: "text" },
  { name: "role", label: "Role", type: "text" },
  { name: "company", label: "Company", type: "text" },
  { name: "quote", label: "Quote", type: "textarea" },
  { name: "link", label: "Link", type: "text", optional: true },
  { name: "avatar", label: "Avatar", type: "text", optional: true },
];

export const testimonialColumns: AdminColumnConfig<Testimonial>[] = [
  { header: "Name", accessor: (row) => row.name },
  { header: "Role", accessor: (row) => row.role },
  { header: "Company", accessor: (row) => row.company },
];

/** Scalar fields only — the sections array has its own dedicated editor, not RecordForm's config. */
export const caseStudyFields: AdminFieldConfig[] = [
  {
    name: "slug",
    label: "Slug",
    type: "text",
    optional: true,
    helpText: "Leave blank to auto-generate from Title.",
  },
  { name: "title", label: "Title", type: "text" },
  { name: "eyebrow", label: "Eyebrow", type: "text" },
  { name: "year", label: "Year", type: "text" },
  { name: "role", label: "Role", type: "text" },
  { name: "timeline", label: "Timeline", type: "text" },
  { name: "team", label: "Team", type: "text" },
  { name: "intro", label: "Intro", type: "textarea" },
  { name: "heroMediaSrc", label: "Hero media src", type: "text" },
  { name: "heroMediaAlt", label: "Hero media alt", type: "text" },
  { name: "heroMediaCaption", label: "Hero media caption", type: "text", optional: true },
  { name: "heroMediaVideo", label: "Hero media video", type: "text", optional: true },
  {
    name: "metrics",
    label: "Metrics",
    type: "metric-pairs",
    helpText: 'One per line, as "value | label" — e.g. "14k+ | Users served".',
  },
  { name: "stack", label: "Stack", type: "string-list", separator: ",", helpText: "Comma-separated." },
  { name: "liveUrl", label: "Live URL", type: "text", optional: true },
  { name: "repoUrl", label: "Repo URL", type: "text", optional: true },
];

export const caseStudyColumns: AdminColumnConfig<CaseStudy>[] = [
  { header: "Title", accessor: (row) => row.title },
  { header: "Eyebrow", accessor: (row) => row.eyebrow },
  { header: "Year", accessor: (row) => row.year },
];

/** Scalar fields only — blocks has its own dedicated editor, not RecordForm's config. */
export const articleFields: AdminFieldConfig[] = [
  {
    name: "slug",
    label: "Slug",
    type: "text",
    optional: true,
    helpText: "Leave blank to auto-generate from Title.",
  },
  { name: "title", label: "Title", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "date", label: "Date", type: "text", helpText: "YYYY-MM-DD" },
  { name: "readingTime", label: "Reading time", type: "text", helpText: 'e.g. "6 min read"' },
  { name: "tags", label: "Tags", type: "string-list", separator: ",", helpText: "Comma-separated." },
];

/** Scalar fields only — the course list has its own dedicated editor, not RecordForm's config. */
export const courseProviderFields: AdminFieldConfig[] = [
  {
    name: "slug",
    label: "Slug",
    type: "text",
    optional: true,
    helpText: "Leave blank to auto-generate from Name.",
  },
  { name: "name", label: "Name", type: "text" },
  { name: "url", label: "Provider URL", type: "text" },
];

export const courseProviderColumns: AdminColumnConfig<CourseProvider & { courses: unknown[] }>[] = [
  { header: "Name", accessor: (row) => row.name },
  { header: "URL", accessor: (row) => row.url },
  { header: "Courses", accessor: (row) => String(row.courses.length) },
];

export const articleColumns: AdminColumnConfig<Article>[] = [
  { header: "Title", accessor: (row) => row.title },
  { header: "Date", accessor: (row) => row.date.toISOString().slice(0, 10) },
  { header: "Reading time", accessor: (row) => row.readingTime },
];
