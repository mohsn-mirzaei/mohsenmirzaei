import type { AdminFieldConfig } from "@/lib/admin/models";

export const adminInputClassName =
  "border-b border-line bg-transparent py-3 text-lg text-fg outline-none transition-colors focus:border-accent";

export function AdminField({
  field,
  defaultValue,
}: {
  field: AdminFieldConfig;
  defaultValue?: string | boolean;
}) {
  const id = `field-${field.name}`;

  if (field.type === "checkbox") {
    return (
      <label htmlFor={id} className="flex w-fit items-center gap-3">
        <input
          id={id}
          name={field.name}
          type="checkbox"
          defaultChecked={Boolean(defaultValue)}
          className="h-4 w-4 accent-accent"
        />
        <span className="eyebrow">{field.label}</span>
      </label>
    );
  }

  const isMultiline =
    field.type === "textarea" || field.type === "string-list" || field.type === "metric-pairs";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="eyebrow">
        {field.label}
        {field.optional && <span className="ml-2 text-muted normal-case">(optional)</span>}
      </label>
      {isMultiline ? (
        <textarea
          id={id}
          name={field.name}
          rows={field.type === "textarea" ? 4 : 3}
          defaultValue={(defaultValue as string) ?? ""}
          className={`resize-none ${adminInputClassName}`}
        />
      ) : (
        <input
          id={id}
          name={field.name}
          type="text"
          defaultValue={(defaultValue as string) ?? ""}
          className={adminInputClassName}
        />
      )}
      {field.helpText && <p className="text-xs text-muted">{field.helpText}</p>}
    </div>
  );
}
