import { z } from "zod";

/**
 * Shared between the client form and the /api/contact route handler, so
 * validation errors match on both sides.
 */
export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Tell me your name.").max(100),
  email: z.string().trim().email("That doesn't look like a valid email."),
  message: z
    .string()
    .trim()
    .min(10, "A few more words would help.")
    .max(4000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

/**
 * Full payload sent to the API, including the anti-spam fields the form
 * fills in silently: `company` is a honeypot (must stay empty), and
 * `formStartedAt` is set on mount so the server can reject submissions that
 * arrive suspiciously fast.
 */
export const contactRequestSchema = contactFormSchema.extend({
  // Deliberately unconstrained: a filled honeypot must still pass validation
  // so the route handler can respond as if it succeeded (see /api/contact),
  // rather than leaking a 422 that would tip off a bot.
  company: z.string().max(500).optional().default(""),
  formStartedAt: z.number(),
  sourcePath: z.string().max(200).optional(),
});

export type ContactRequestValues = z.infer<typeof contactRequestSchema>;
