"use client";

import { adminInputClassName } from "@/components/admin/AdminField";

/** Controlled (value/onChange) field primitives, for client-managed array-of-drafts editors. */

export function TextField({
  label,
  value,
  onChange,
  optional,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  optional?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="eyebrow">
        {label}
        {optional && <span className="ml-2 text-muted normal-case">(optional)</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={adminInputClassName}
      />
    </div>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  optional,
  helpText,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  optional?: boolean;
  helpText?: string;
  rows?: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="eyebrow">
        {label}
        {optional && <span className="ml-2 text-muted normal-case">(optional)</span>}
      </label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`resize-none ${adminInputClassName}`}
      />
      {helpText && <p className="text-xs text-muted">{helpText}</p>}
    </div>
  );
}
