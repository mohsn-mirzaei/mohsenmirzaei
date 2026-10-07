import { describe, it, expect, vi, beforeEach } from "vitest";

const leadCount = vi.fn();
const leadCreate = vi.fn();
const sendLeadNotification = vi.fn();

vi.mock("@/lib/db/client", () => ({
  prisma: {
    lead: {
      count: (...args: unknown[]) => leadCount(...args),
      create: (...args: unknown[]) => leadCreate(...args),
    },
  },
}));

vi.mock("@/lib/email", () => ({
  sendLeadNotification: (...args: unknown[]) => sendLeadNotification(...args),
}));

const checkIpRateLimit = vi.fn();
vi.mock("@/lib/rate-limit", () => ({
  checkIpRateLimit: (...args: unknown[]) => checkIpRateLimit(...args),
}));

const { POST } = await import("./route");

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

const validPayload = {
  name: "Jane Doe",
  email: "jane@example.com",
  message: "Hello, I'd love to work together on something.",
  company: "",
  formStartedAt: Date.now() - 5000,
  sourcePath: "/",
};

beforeEach(() => {
  vi.clearAllMocks();
  leadCount.mockResolvedValue(0);
  leadCreate.mockResolvedValue({ id: "lead_1", ...validPayload });
  checkIpRateLimit.mockResolvedValue({ success: true });
});

describe("POST /api/contact", () => {
  it("creates a Lead and sends a notification for a valid submission", async () => {
    const res = await POST(makeRequest(validPayload));
    const json = await res.json();

    expect(json).toEqual({ ok: true });
    expect(leadCreate).toHaveBeenCalledTimes(1);
    expect(sendLeadNotification).toHaveBeenCalledTimes(1);
  });

  it("silently accepts a honeypot-filled submission without creating a Lead", async () => {
    const res = await POST(makeRequest({ ...validPayload, company: "I am a bot" }));
    const json = await res.json();

    expect(json).toEqual({ ok: true });
    expect(leadCreate).not.toHaveBeenCalled();
  });

  it("silently accepts a too-fast submission without creating a Lead", async () => {
    const res = await POST(makeRequest({ ...validPayload, formStartedAt: Date.now() }));
    const json = await res.json();

    expect(json).toEqual({ ok: true });
    expect(leadCreate).not.toHaveBeenCalled();
  });

  it("rate-limits after too many recent submissions from the same email", async () => {
    leadCount.mockResolvedValue(3);
    const res = await POST(makeRequest(validPayload));

    expect(res.status).toBe(429);
    expect(leadCreate).not.toHaveBeenCalled();
  });

  it("rate-limits by IP even with a fresh email, without hitting the DB", async () => {
    checkIpRateLimit.mockResolvedValue({ success: false });
    const res = await POST(makeRequest(validPayload));

    expect(res.status).toBe(429);
    expect(leadCount).not.toHaveBeenCalled();
    expect(leadCreate).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON bodies", async () => {
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      body: "not json",
    });
    const res = await POST(req);

    expect(res.status).toBe(400);
    expect(leadCreate).not.toHaveBeenCalled();
  });

  it("rejects schema-invalid payloads", async () => {
    const res = await POST(makeRequest({ ...validPayload, email: "not-an-email" }));

    expect(res.status).toBe(422);
    expect(leadCreate).not.toHaveBeenCalled();
  });
});
