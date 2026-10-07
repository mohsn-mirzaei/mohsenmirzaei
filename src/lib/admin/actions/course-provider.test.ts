import { describe, it, expect, vi, beforeEach } from "vitest";

const providerFindUnique = vi.fn();
const providerFindFirst = vi.fn();
const providerFindMany = vi.fn();
const providerUpdate = vi.fn();
const providerCreate = vi.fn();
const providerCount = vi.fn();
const providerDelete = vi.fn();
const courseDeleteMany = vi.fn();
const courseCreateMany = vi.fn();
const redirect = vi.fn();
const revalidatePath = vi.fn();

const tx = {
  courseProvider: {
    update: (...args: unknown[]) => providerUpdate(...args),
    create: (...args: unknown[]) => providerCreate(...args),
    count: (...args: unknown[]) => providerCount(...args),
  },
  course: {
    deleteMany: (...args: unknown[]) => courseDeleteMany(...args),
    createMany: (...args: unknown[]) => courseCreateMany(...args),
  },
};

vi.mock("@/lib/db/client", () => ({
  prisma: {
    courseProvider: {
      findUnique: (...args: unknown[]) => providerFindUnique(...args),
      findFirst: (...args: unknown[]) => providerFindFirst(...args),
      findMany: (...args: unknown[]) => providerFindMany(...args),
      delete: (...args: unknown[]) => providerDelete(...args),
    },
    $transaction: vi.fn(async (arg: unknown) => {
      if (typeof arg === "function") return arg(tx);
      return Promise.all(arg as Promise<unknown>[]);
    }),
  },
}));

vi.mock("next/navigation", () => ({ redirect: (...args: unknown[]) => redirect(...args) }));
vi.mock("next/cache", () => ({ revalidatePath: (...args: unknown[]) => revalidatePath(...args) }));
vi.mock("@/lib/admin/auth", () => ({ requireAdminSession: vi.fn().mockResolvedValue({ email: "admin@example.com" }) }));

const { createCourseProvider, updateCourseProvider, removeCourseProvider } = await import("./course-provider");

function buildFormData(overrides: Record<string, string> = {}) {
  const fd = new FormData();
  fd.set("name", "Go Casts");
  fd.set("url", "https://gocasts.ir");
  fd.set(
    "coursesJson",
    JSON.stringify([
      { title: "Go & Backend Bootcamp", hours: "40", url: "https://example.com", free: false, inProgress: true, highlights: "" },
    ]),
  );
  for (const [key, value] of Object.entries(overrides)) fd.set(key, value);
  return fd;
}

beforeEach(() => {
  vi.clearAllMocks();
  providerFindUnique.mockResolvedValue(null);
  providerFindFirst.mockResolvedValue(null);
  providerCount.mockResolvedValue(3);
  providerCreate.mockResolvedValue({ id: "cp_1", slug: "go-casts" });
  providerUpdate.mockResolvedValue({ id: "cp_1", slug: "go-casts" });
});

describe("createCourseProvider", () => {
  it("creates the provider and its courses in one transaction", async () => {
    await createCourseProvider({ ok: true }, buildFormData());

    expect(providerCreate).toHaveBeenCalledTimes(1);
    expect(courseCreateMany).toHaveBeenCalledTimes(1);
    expect(courseCreateMany.mock.calls[0][0].data).toHaveLength(1);
    expect(redirect).toHaveBeenCalledWith("/admin/courses");
  });

  it("rejects a duplicate slug without creating a provider", async () => {
    providerFindUnique.mockResolvedValue({ id: "existing" });

    const result = await createCourseProvider({ ok: true }, buildFormData());

    expect(result.ok).toBe(false);
    expect(providerCreate).not.toHaveBeenCalled();
  });

  it("rejects a submission with no courses", async () => {
    const result = await createCourseProvider({ ok: true }, buildFormData({ coursesJson: "[]" }));

    expect(result.ok).toBe(false);
    expect(providerCreate).not.toHaveBeenCalled();
  });
});

describe("updateCourseProvider", () => {
  it("updates scalar fields and replaces courses", async () => {
    await updateCourseProvider("cp_1", { ok: true }, buildFormData());

    expect(providerUpdate).toHaveBeenCalledWith({ where: { id: "cp_1" }, data: expect.objectContaining({ name: "Go Casts" }) });
    expect(courseDeleteMany).toHaveBeenCalledWith({ where: { providerId: "cp_1" } });
  });
});

describe("removeCourseProvider", () => {
  it("deletes the provider and revalidates the homepage", async () => {
    await removeCourseProvider("cp_1");

    expect(providerDelete).toHaveBeenCalledWith({ where: { id: "cp_1" } });
    expect(revalidatePath).toHaveBeenCalledWith("/");
  });
});
