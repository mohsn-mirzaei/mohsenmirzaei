import { slugify } from "@/lib/slugify";

/** Content models only ever read/write the "en" locale until Part 6 (bilingual). */
export const LOCALE = "en" as const;

/** Shared return shape for create/update Server Actions driving RecordForm. */
export type RecordActionState = { ok: boolean; error?: string };

function toText(raw: FormDataEntryValue | null): string {
  return typeof raw === "string" ? raw : "";
}

export function parseStringList(raw: FormDataEntryValue | null, separator: "," | "\n"): string[] {
  const parts = separator === "," ? toText(raw).split(",") : toText(raw).split("\n");
  return parts.map((p) => p.trim()).filter(Boolean);
}

export function parseMetricPairs(raw: FormDataEntryValue | null): { value: string; label: string }[] {
  return toText(raw)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [value, label] = line.split("|").map((s) => s?.trim() ?? "");
      return { value, label };
    })
    .filter((m) => m.value && m.label);
}

/** Explicit slug (if provided) wins; otherwise derive from the model's title/name field. */
export function resolveSlug(explicit: FormDataEntryValue | null, sourceValue: string): string {
  const trimmed = toText(explicit).trim();
  return slugify(trimmed || sourceValue);
}

/** Inverse of parseStringList, for populating an edit form's textarea. */
export function stringifyList(list: string[], separator: "," | "\n"): string {
  return list.join(separator === "," ? ", " : "\n");
}

/** Inverse of parseMetricPairs, for populating an edit form's textarea. */
export function stringifyMetricPairs(list: { value: string; label: string }[]): string {
  return list.map((m) => `${m.value} | ${m.label}`).join("\n");
}
