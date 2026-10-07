/**
 * Self-directed courses — not credentials. None of these grant an accredited
 * certificate; they're tracked here as evidence of continuous, hands-on
 * learning outside of work.
 *
 * Data now lives in the DB (CourseProvider/Course, seeded from
 * prisma/seed-data/courses.ts) — see src/lib/content/queries.ts. Only the
 * types remain here, matching the shape components already render.
 */

export type Course = {
  title: string;
  hours: number;
  url: string;
  free?: boolean;
  inProgress?: boolean;
  highlights?: string[];
};

export type CourseProvider = {
  name: string;
  url: string;
  courses: Course[];
};
