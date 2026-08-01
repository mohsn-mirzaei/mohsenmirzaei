import { RecordForm } from "@/components/admin/RecordForm";
import { testimonialFields } from "@/lib/admin/models";
import { createTestimonial } from "@/lib/admin/actions/testimonial";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-fg">New testimonial</h1>
      <div className="mt-8">
        <RecordForm
          fields={testimonialFields}
          defaultValues={{}}
          action={createTestimonial}
          submitLabel="Create"
        />
      </div>
    </div>
  );
}
