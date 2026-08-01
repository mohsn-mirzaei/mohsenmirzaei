import { CaseStudyForm } from "@/components/admin/CaseStudyForm";
import { caseStudyFields } from "@/lib/admin/models";
import { createCaseStudy } from "@/lib/admin/actions/case-study";

export default function NewCaseStudyPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-fg">New case study</h1>
      <div className="mt-8">
        <CaseStudyForm
          fields={caseStudyFields}
          defaultValues={{}}
          initialSections={[]}
          action={createCaseStudy}
          submitLabel="Create"
        />
      </div>
    </div>
  );
}
