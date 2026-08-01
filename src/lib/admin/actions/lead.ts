"use server";

import { prisma } from "@/lib/db/client";
import { requireAdminSession } from "@/lib/admin/auth";
import { leadStatusSchema } from "@/lib/admin/schemas";

/** Never rendered publicly, so no revalidatePath is needed here. */
export async function updateLeadStatus(id: string, formData: FormData): Promise<void> {
  await requireAdminSession();
  const parsed = leadStatusSchema.safeParse(formData.get("status"));
  if (!parsed.success) return;
  await prisma.lead.update({ where: { id }, data: { status: parsed.data } });
}
