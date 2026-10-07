import { describe, it, expect, vi, beforeEach } from "vitest";

const experienceFindFirst = vi.fn();
const experienceCount = vi.fn();
const experienceCreate = vi.fn();
const experienceUpdate = vi.fn();
const experienceDelete = vi.fn();
const experienceFindMany = vi.fn();
const $transaction = vi.fn();
const redirect = vi.fn();
const revalidatePath = vi.fn();

vi.mock("@/lib/db/client", () => ({
  prisma: {
    experience: {
      findFirst: (...args: unknown[]) => experienceFindFirst(...args),
      count: (...args: unknown[]) => experienceCount(...args),
      create: (...args: unknown[]) => experienceCreate(...args),
      update: (...args: unknown[]) => experienceUpdate(...args),
      delete: (...args: unknown[]) => experienceDelete(...args),
      findMany: (...args: unknown[]) => experienceFindMany(...args),
    },
    $transaction: (...args: unknown[]) => $transaction(...args),
  },
}));

vi.mock("next/navigation", () => ({ redirect: (...args: unknown[]) => redirect(...args) }));
vi.mock("next/cache", () => ({ revalidatePath: (...args: unknown[]) => revalidatePath(...args) }));
vi.mock("@/lib/admin/auth", () => ({ requireAdminSession: vi.fn().mockResolvedValue({ email: "admin@example.com" }) }));

const { createExperience, updateExperience, removeExperience, reorderExperience } = await import("./experience");

function buildFormData(overrides: Record<string, string> = {}) {
  const fd = new FormData();
  fd.set("company", "Acme Corp");
  fd.set("role", "Engineer");
  fd.set("period", "2023 — Present");
  fd.set("summary", "Did engineering things.");
  fd.set("highlights", "Shipped a thing\nFixed a bug");
  fd.set("stack", "TypeScript, React");
  for (const [key, value] of Object.entries(overrides)) fd.set(key, value);
  return fd;
}

beforeEach(() => {
  vi.clearAllMocks();
  experienceFindFirst.mockResolvedValue(null);
  experienceCount.mockResolvedValue(2);
});

describe("createExperience", () => {
  it("creates a row at the next order and redirects", async () => {
    await createExperience({ ok: true }, buildFormData());

    expect(experienceCreate).toHaveBeenCalledTimes(1);
    expect(experienceCreate.mock.calls[0][0].data).toMatchObject({ order: 2, company: "Acme Corp" });
    expect(revalidatePath).toHaveBeenCalledWith("/");
    expect(redirect).toHaveBeenCalledWith("/admin/experience");
  });

  it("rejects a duplicate slug without creating a row", async () => {
    experienceFindFirst.mockResolvedValue({ id: "existing" });

    const result = await createExperience({ ok: true }, buildFormData());

    expect(result.ok).toBe(false);
    expect(experienceCreate).not.toHaveBeenCalled();
  });

  it("rejects an invalid submission (missing company)", async () => {
    const result = await createExperience({ ok: true }, buildFormData({ company: "" }));

    expect(result.ok).toBe(false);
    expect(experienceCreate).not.toHaveBeenCalled();
  });
});

describe("updateExperience", () => {
  it("updates the row and redirects", async () => {
    await updateExperience("row_1", { ok: true }, buildFormData());

    expect(experienceUpdate).toHaveBeenCalledWith({ where: { id: "row_1" }, data: expect.objectContaining({ company: "Acme Corp" }) });
    expect(redirect).toHaveBeenCalledWith("/admin/experience");
  });
});

describe("removeExperience", () => {
  it("deletes the row and revalidates", async () => {
    await removeExperience("row_1");

    expect(experienceDelete).toHaveBeenCalledWith({ where: { id: "row_1" } });
    expect(revalidatePath).toHaveBeenCalledWith("/");
  });
});

describe("reorderExperience", () => {
  it("swaps order with the neighbor above when moving up", async () => {
    experienceFindMany.mockResolvedValue([
      { id: "a", order: 0 },
      { id: "b", order: 1 },
    ]);

    await reorderExperience("b", "up");

    expect($transaction).toHaveBeenCalledTimes(1);
  });

  it("does nothing when already at the top", async () => {
    experienceFindMany.mockResolvedValue([
      { id: "a", order: 0 },
      { id: "b", order: 1 },
    ]);

    await reorderExperience("a", "up");

    expect($transaction).not.toHaveBeenCalled();
  });
});
