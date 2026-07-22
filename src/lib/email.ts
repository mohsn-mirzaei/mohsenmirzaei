import { Resend } from "resend";
import { site } from "@/lib/site";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/** Sender address for outbound mail. Must be on a domain verified in Resend. */
const FROM = process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  message: string;
  sourcePath?: string | null;
}) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — skipping lead notification.");
    return;
  }

  await resend.emails.send({
    from: FROM,
    to: site.email,
    replyTo: lead.email,
    subject: `New message from ${lead.name} — mohsenmirzaei.com`,
    text: [
      `From: ${lead.name} <${lead.email}>`,
      lead.sourcePath ? `Page: ${lead.sourcePath}` : null,
      "",
      lead.message,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
