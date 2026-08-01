"use client";

import { useActionState } from "react";
import { AdminField } from "@/components/admin/AdminField";
import { CaseStudySectionsEditor, type CaseStudySectionDraft } from "@/components/admin/CaseStudySectionsEditor";
import type { AdminFieldConfig } from "@/lib/admin/models";
import type { RecordActionState } from "@/lib/admin/crud-helpers";

interface CaseStudyFormProps {
  fields: AdminFieldConfig[];
  defaultValues: Record<string, string>;
  initialSections: CaseStudySectionDraft[];
  action: (prevState: RecordActionState, formData: FormData) => Promise<RecordActionState>;
  submitLabel: string;
}

export function CaseStudyForm({
  fields,
  defaultValues,
  initialSections,
  action,
  submitLabel,
}: CaseStudyFormProps) {
  const [state, formAction, isPending] = useActionState<RecordActionState, FormData>(action, {
    ok: true,
  });

  return (
    <form action={formAction} className="flex max-w-3xl flex-col gap-6">
      {fields.map((field) => (
        <AdminField key={field.name} field={field} defaultValue={defaultValues[field.name]} />
      ))}

      <div className="mt-4 border-t border-line pt-8">
        <p className="eyebrow mb-6">Sections</p>
        <CaseStudySectionsEditor name="sectionsJson" initialSections={initialSections} />
      </div>

      {!state.ok && state.error && <p className="text-sm text-accent">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="group mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-accent px-6 py-4 text-lg font-semibold text-black transition-colors hover:bg-[#e4ff6e] disabled:opacity-60"
      >
        {isPending ? "Saving…" : submitLabel}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
}
