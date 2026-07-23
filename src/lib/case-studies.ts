/**
 * Types for deep-dive case studies rendered at /work/[slug].
 *
 * The data itself moved to the database as of Part 2 of the backend rollout
 * — see src/lib/content/queries.ts (getCaseStudy/getCaseStudies/getNextCaseStudy).
 */

export type CaseMedia = {
  src: string;
  alt: string;
  caption?: string;
  /** Optional screen recording; when set, `src` is used as the poster. */
  video?: string;
};

export type CaseSection = {
  kicker: string;
  heading: string;
  body: string[];
  bullets?: string[];
  media?: CaseMedia;
};

export type CaseStudy = {
  slug: string;
  title: string;
  eyebrow: string;
  year: string;
  role: string;
  timeline: string;
  team: string;
  intro: string;
  heroMedia: CaseMedia;
  metrics: { value: string; label: string }[];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  sections: CaseSection[];
};
