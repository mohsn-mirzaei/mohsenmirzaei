"use client";

import { useState } from "react";
import { TextField, TextAreaField, CheckboxField } from "@/components/admin/ControlledFields";
import { useDragReorder } from "@/lib/admin/use-drag-reorder";

export interface CourseDraft {
  title: string;
  hours: string;
  url: string;
  free: boolean;
  inProgress: boolean;
  /** Newline-separated, optional. */
  highlights: string;
}

const EMPTY_COURSE: CourseDraft = {
  title: "",
  hours: "",
  url: "",
  free: false,
  inProgress: false,
  highlights: "",
};

/** In-editor list of a single provider's courses — reorderable, add/remove, one "Save" submits the whole array. */
export function CourseProvidersEditor({
  name,
  initialCourses,
}: {
  name: string;
  initialCourses: CourseDraft[];
}) {
  const [courses, setCourses] = useState<CourseDraft[]>(
    initialCourses.length > 0 ? initialCourses : [{ ...EMPTY_COURSE }],
  );

  function update(index: number, patch: Partial<CourseDraft>) {
    setCourses((prev) => prev.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  }

  function add() {
    setCourses((prev) => [...prev, { ...EMPTY_COURSE }]);
  }

  function remove(index: number) {
    setCourses((prev) => prev.filter((_, i) => i !== index));
  }

  function move(index: number, direction: "up" | "down") {
    setCourses((prev) => {
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  const { draggedIndex, dragHandleProps, dropTargetProps } = useDragReorder(setCourses);

  return (
    <div className="flex flex-col gap-8">
      {/* Serialized on every change so the surrounding <form>'s single submit carries the whole array. */}
      <input type="hidden" name={name} value={JSON.stringify(courses)} readOnly />

      {courses.map((course, index) => (
        <div
          key={index}
          {...dropTargetProps(index)}
          className={`flex flex-col gap-4 rounded-2xl border border-line p-6 ${draggedIndex === index ? "opacity-40" : ""}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                {...dragHandleProps(index)}
                title="Drag to reorder"
                className="cursor-grab select-none text-fg-dim hover:text-fg active:cursor-grabbing"
              >
                ⠿
              </span>
              <p className="eyebrow">Course {index + 1}</p>
            </div>
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
                disabled={index === courses.length - 1}
                className="rounded px-2 py-1 text-sm text-fg-dim transition-colors hover:text-fg disabled:opacity-30"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                disabled={courses.length === 1}
                className="rounded px-2 py-1 text-sm text-fg-dim transition-colors hover:text-accent disabled:opacity-30"
              >
                Remove
              </button>
            </div>
          </div>

          <TextField label="Title" value={course.title} onChange={(v) => update(index, { title: v })} />
          <TextField label="Hours" value={course.hours} onChange={(v) => update(index, { hours: v })} />
          <TextField label="URL" value={course.url} onChange={(v) => update(index, { url: v })} />
          <div className="flex items-center gap-6">
            <CheckboxField label="Free" checked={course.free} onChange={(v) => update(index, { free: v })} />
            <CheckboxField
              label="In progress"
              checked={course.inProgress}
              onChange={(v) => update(index, { inProgress: v })}
            />
          </div>
          <TextAreaField
            label="Highlights"
            optional
            helpText="One per line."
            rows={3}
            value={course.highlights}
            onChange={(v) => update(index, { highlights: v })}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="w-fit rounded-full border border-line px-5 py-2.5 text-sm text-fg-dim transition-colors hover:border-accent hover:text-accent"
      >
        Add course
      </button>
    </div>
  );
}
