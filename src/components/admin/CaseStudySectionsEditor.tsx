"use client";

import { useState } from "react";
import { TextField, TextAreaField } from "@/components/admin/ControlledFields";

export interface CaseStudySectionDraft {
  kicker: string;
  heading: string;
  /** Newline-separated — one paragraph per line, matching the site's other list-field convention. */
  body: string;
  /** Newline-separated, optional. */
  bullets: string;
  mediaSrc: string;
  mediaAlt: string;
  mediaCaption: string;
  mediaVideo: string;
}

const EMPTY_SECTION: CaseStudySectionDraft = {
  kicker: "",
  heading: "",
  body: "",
  bullets: "",
  mediaSrc: "",
  mediaAlt: "",
  mediaCaption: "",
  mediaVideo: "",
};

export function CaseStudySectionsEditor({
  name,
  initialSections,
}: {
  name: string;
  initialSections: CaseStudySectionDraft[];
}) {
  const [sections, setSections] = useState<CaseStudySectionDraft[]>(
    initialSections.length > 0 ? initialSections : [{ ...EMPTY_SECTION }],
  );

  function update(index: number, patch: Partial<CaseStudySectionDraft>) {
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  }

  function add() {
    setSections((prev) => [...prev, { ...EMPTY_SECTION }]);
  }

  function remove(index: number) {
    setSections((prev) => prev.filter((_, i) => i !== index));
  }

  function move(index: number, direction: "up" | "down") {
    setSections((prev) => {
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Serialized on every change so the surrounding <form>'s single submit carries the whole array. */}
      <input type="hidden" name={name} value={JSON.stringify(sections)} readOnly />

      {sections.map((section, index) => (
        <div key={index} className="flex flex-col gap-4 rounded-2xl border border-line p-6">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Section {index + 1}</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => move(index, "up")}
                disabled={index === 0}
                className="rounded px-2 py-1 text-sm text-fg-dim transition-colors hover:text-fg disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, "down")}
                disabled={index === sections.length - 1}
                className="rounded px-2 py-1 text-sm text-fg-dim transition-colors hover:text-fg disabled:opacity-30"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                disabled={sections.length === 1}
                className="rounded px-2 py-1 text-sm text-fg-dim transition-colors hover:text-accent disabled:opacity-30"
              >
                Remove
              </button>
            </div>
          </div>

          <TextField
            label="Kicker"
            value={section.kicker}
            onChange={(v) => update(index, { kicker: v })}
          />
          <TextField
            label="Heading"
            value={section.heading}
            onChange={(v) => update(index, { heading: v })}
          />
          <TextAreaField
            label="Body"
            helpText="One paragraph per line."
            value={section.body}
            onChange={(v) => update(index, { body: v })}
          />
          <TextAreaField
            label="Bullets"
            optional
            helpText="One per line."
            rows={3}
            value={section.bullets}
            onChange={(v) => update(index, { bullets: v })}
          />
          <TextField
            label="Media src"
            optional
            value={section.mediaSrc}
            onChange={(v) => update(index, { mediaSrc: v })}
          />
          <TextField
            label="Media alt"
            optional
            value={section.mediaAlt}
            onChange={(v) => update(index, { mediaAlt: v })}
          />
          <TextField
            label="Media caption"
            optional
            value={section.mediaCaption}
            onChange={(v) => update(index, { mediaCaption: v })}
          />
          <TextField
            label="Media video"
            optional
            value={section.mediaVideo}
            onChange={(v) => update(index, { mediaVideo: v })}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="w-fit rounded-full border border-line px-5 py-2.5 text-sm text-fg-dim transition-colors hover:border-accent hover:text-accent"
      >
        Add section
      </button>
    </div>
  );
}
