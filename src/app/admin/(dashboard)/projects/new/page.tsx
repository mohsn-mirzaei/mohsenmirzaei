import { RecordForm } from "@/components/admin/RecordForm";
import { projectFields } from "@/lib/admin/models";
import { createProject } from "@/lib/admin/actions/project";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-fg">New project</h1>
      <div className="mt-8">
        <RecordForm
          fields={projectFields}
          defaultValues={{}}
          action={createProject}
          submitLabel="Create"
        />
      </div>
    </div>
  );
}
