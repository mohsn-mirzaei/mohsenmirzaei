import { CourseProviderForm } from "@/components/admin/CourseProviderForm";
import { courseProviderFields } from "@/lib/admin/models";
import { createCourseProvider } from "@/lib/admin/actions/course-provider";

export default function NewCourseProviderPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-fg">New course provider</h1>
      <div className="mt-8">
        <CourseProviderForm
          fields={courseProviderFields}
          defaultValues={{}}
          initialCourses={[]}
          action={createCourseProvider}
          submitLabel="Create"
        />
      </div>
    </div>
  );
}
