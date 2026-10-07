import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { sendLeadNotification } from "@/lib/email";
import { contactRequestSchema } from "@/lib/contact-schema";
import { checkIpRateLimit } from "@/lib/rate-limit";

/** Reject submissions filled in faster than a human plausibly could. */
const MIN_FILL_TIME_MS = 1500;
/** Rate limit: at most this many submissions per email in the window below. */
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." },
      { status: 422 },
    );
  }

  const { name, email, message, company, formStartedAt, sourcePath } = parsed.data;

  // Bot signals: honeypot filled, or submitted implausibly fast. Respond as
  // if it succeeded so scripts don't learn they were caught.
  const filledTooFast = Date.now() - formStartedAt < MIN_FILL_TIME_MS;
  if (company || filledTooFast) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { success: ipAllowed } = await checkIpRateLimit(ip);
  if (!ipAllowed) {
    return NextResponse.json(
      { ok: false, error: "Too many messages sent recently — please try again later." },
      { status: 429 },
    );
  }

  const recentCount = await prisma.lead.count({
    where: {
      email,
      createdAt: { gte: new Date(Date.now() - RATE_LIMIT_WINDOW_MS) },
    },
  });
  if (recentCount >= RATE_LIMIT_MAX) {
    return NextResponse.json(
      { ok: false, error: "Too many messages sent recently — please try again later." },
      { status: 429 },
    );
  }

  const lead = await prisma.lead.create({
    data: { name, email, message, sourcePath },
  });

  try {
    await sendLeadNotification(lead);
  } catch (error) {
    // The lead is already saved — a failed notification email shouldn't
    // surface as a failure to the person submitting the form.
    console.error("[api/contact] failed to send lead notification email", error);
  }

  return NextResponse.json({ ok: true });
}
