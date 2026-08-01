import { track } from "@vercel/analytics/react";

export type ClickLocation = "hero" | "header" | "footer" | "contact" | "projects" | "featured";

export function trackResumeDownload(location: ClickLocation) {
  track("resume_download", { location });
}

export function trackSocialClick(
  platform: "telegram" | "email" | "github" | "linkedin" | "x",
  location: ClickLocation,
) {
  track("social_click", { platform, location });
}

export function trackProjectLink(slug: string, kind: "live" | "repo", location: ClickLocation) {
  track("project_link_click", { slug, kind, location });
}

export function trackCaseStudyClick(slug: string, location: ClickLocation) {
  track("case_study_click", { slug, location });
}
