import { RecordForm } from "@/components/admin/RecordForm";
import { experienceFields } from "@/lib/admin/models";
import { createExperience } from "@/lib/admin/actions/experience";

export default function NewExperiencePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-fg">New experience</h1>
      <div className="mt-8">
        <RecordForm
          fields={experienceFields}
          defaultValues={{}}
          action={createExperience}
          submitLabel="Create"
        />
      </div>
    </div>
  );
}
