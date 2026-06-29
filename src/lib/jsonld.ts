import { site } from "@/lib/site";
import { experiences, skillGroups } from "@/lib/data";

/**
 * Builds a connected schema.org @graph (Person + WebSite + ProfilePage).
 *
 * This is rendered server-side into the initial HTML so non-JS-executing AI
 * crawlers (GPTBot, ClaudeBot, PerplexityBot) and Google can read it. `sameAs`
 * is the strongest entity-disambiguation signal — it tells engines "this is the
 * same Mohsen Mirzaei as these authoritative profiles".
 */
export function buildJsonLd() {
  const personId = `${site.url}/#person`;
  const siteId = `${site.url}/#website`;

  const knowsAbout = Array.from(
    new Set(skillGroups.flatMap((g) => g.skills)),
  );

  const worksFor = experiences.map((e) => ({
    "@type": "OrganizationRole" as const,
    roleName: e.role,
    startDate: e.period.split("—")[0]?.trim(),
    "@id": `${site.url}/#role-${slug(e.company)}`,
    worksFor: {
      "@type": "Organization",
      name: e.company.split("·")[0]?.trim(),
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        givenName: site.firstName,
        familyName: site.lastName,
        url: site.url,
        image: `${site.url}/images/mohsen-portrait.jpg`,
        jobTitle: site.roleLong,
        description: site.shortBio,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          addressCountry: "IR",
        },
        sameAs: [
          site.socials.github,
          site.socials.linkedin,
          site.socials.x,
        ],
        knowsAbout,
        knowsLanguage: ["English", "Persian"],
        hasOccupation: {
          "@type": "Occupation",
          name: "Frontend Engineer",
          occupationalCategory: "15-1254.00",
          skills: knowsAbout.join(", "),
        },
        worksFor,
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: site.url,
        name: `${site.name} — ${site.role}`,
        description: site.tagline,
        inLanguage: "en",
        publisher: { "@id": personId },
        about: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profilepage`,
        url: site.url,
        name: `${site.name} — ${site.role}`,
        isPartOf: { "@id": siteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
      },
    ],
  };
}

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/·.*/, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
