import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { RecordForm } from "@/components/admin/RecordForm";
import { testimonialFields } from "@/lib/admin/models";
import { updateTestimonial } from "@/lib/admin/actions/testimonial";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  const defaultValues = {
    slug: testimonial.slug,
    name: testimonial.name,
    role: testimonial.role,
    company: testimonial.company,
    quote: testimonial.quote,
    link: testimonial.link ?? "",
    avatar: testimonial.avatar ?? "",
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-fg">Edit testimonial</h1>
      <div className="mt-8">
        <RecordForm
          fields={testimonialFields}
          defaultValues={defaultValues}
          action={updateTestimonial.bind(null, testimonial.id)}
          submitLabel="Save"
        />
      </div>
    </div>
  );
}
