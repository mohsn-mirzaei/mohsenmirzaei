import { describe, it, expect, vi, beforeEach } from "vitest";

const caseStudyFindFirst = vi.fn();
const caseStudyFindUnique = vi.fn();
const caseStudyFindMany = vi.fn();
const caseStudyUpdate = vi.fn();
const caseStudyCreate = vi.fn();
const caseStudyCount = vi.fn();
const caseStudyDelete = vi.fn();
const caseStudySectionDeleteMany = vi.fn();
const caseStudySectionCreateMany = vi.fn();
const redirect = vi.fn();
const revalidatePath = vi.fn();

const tx = {
  caseStudy: {
    update: (...args: unknown[]) => caseStudyUpdate(...args),
    create: (...args: unknown[]) => caseStudyCreate(...args),
    count: (...args: unknown[]) => caseStudyCount(...args),
  },
  caseStudySection: {
    deleteMany: (...args: unknown[]) => caseStudySectionDeleteMany(...args),
    createMany: (...args: unknown[]) => caseStudySectionCreateMany(...args),
  },
};

vi.mock("@/lib/db/client", () => ({
  prisma: {
    caseStudy: {
      findFirst: (...args: unknown[]) => caseStudyFindFirst(...args),
      findUnique: (...args: unknown[]) => caseStudyFindUnique(...args),
      findMany: (...args: unknown[]) => caseStudyFindMany(...args),
      delete: (...args: unknown[]) => caseStudyDelete(...args),
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

const { createCaseStudy, updateCaseStudy, removeCaseStudy } = await import("./case-study");

function buildFormData(overrides: Record<string, string> = {}) {
  const fd = new FormData();
  fd.set("title", "RCoinX");
  fd.set("eyebrow", "Case study");
  fd.set("year", "2024");
  fd.set("role", "Lead engineer");
  fd.set("timeline", "3 months");
  fd.set("team", "Solo");
  fd.set("intro", "An intro paragraph.");
  fd.set("heroMediaSrc", "/images/hero.svg");
  fd.set("heroMediaAlt", "Hero alt text");
  fd.set("metrics", "14k+ | Users served");
  fd.set("stack", "TypeScript, Next.js");
  fd.set(
    "sectionsJson",
    JSON.stringify([{ kicker: "Problem", heading: "The problem", body: "Body text", bullets: "" }]),
  );
  for (const [key, value] of Object.entries(overrides)) fd.set(key, value);
  return fd;
}

beforeEach(() => {
  vi.clearAllMocks();
  caseStudyFindFirst.mockResolvedValue(null);
  caseStudyCount.mockResolvedValue(3);
  caseStudyCreate.mockResolvedValue({ id: "cs_1", slug: "rcoinx" });
  caseStudyUpdate.mockResolvedValue({ id: "cs_1", slug: "rcoinx" });
  caseStudyFindMany.mockResolvedValue([{ slug: "rcoinx" }]);
});

describe("createCaseStudy", () => {
  it("creates the case study and its sections in one transaction", async () => {
    await createCaseStudy({ ok: true }, buildFormData());

    expect(caseStudyCreate).toHaveBeenCalledTimes(1);
    expect(caseStudySectionCreateMany).toHaveBeenCalledTimes(1);
    expect(caseStudySectionCreateMany.mock.calls[0][0].data).toHaveLength(1);
    expect(redirect).toHaveBeenCalledWith("/admin/case-studies");
  });

  it("rejects a duplicate slug", async () => {
    caseStudyFindFirst.mockResolvedValue({ id: "existing" });

    const result = await createCaseStudy({ ok: true }, buildFormData());

    expect(result.ok).toBe(false);
    expect(caseStudyCreate).not.toHaveBeenCalled();
  });
});

describe("updateCaseStudy", () => {
  it("updates scalar fields and replaces sections", async () => {
    caseStudyFindUnique.mockResolvedValue({ slug: "rcoinx" });

    await updateCaseStudy("cs_1", { ok: true }, buildFormData());

    expect(caseStudyUpdate).toHaveBeenCalledWith({ where: { id: "cs_1" }, data: expect.objectContaining({ title: "RCoinX" }) });
    expect(caseStudySectionDeleteMany).toHaveBeenCalledWith({ where: { caseStudyId: "cs_1" } });
  });
});

describe("removeCaseStudy", () => {
  it("deletes the case study and revalidates its path", async () => {
    caseStudyFindUnique.mockResolvedValue({ slug: "rcoinx" });

    await removeCaseStudy("cs_1");

    expect(caseStudyDelete).toHaveBeenCalledWith({ where: { id: "cs_1" } });
    expect(revalidatePath).toHaveBeenCalledWith("/work/rcoinx");
    expect(revalidatePath).toHaveBeenCalledWith("/sitemap.xml");
  });
});
