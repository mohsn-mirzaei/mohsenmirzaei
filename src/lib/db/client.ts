import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Prisma client singleton, using the node-postgres driver adapter (Prisma 7
 * no longer reads the connection URL from schema.prisma at runtime).
 *
 * Next.js dev-mode hot-reloading re-evaluates modules on every change, which
 * would otherwise spin up a new PrismaClient (and a new DB connection pool)
 * per reload. Caching the instance on `globalThis` avoids that in dev while
 * staying a plain module-scoped singleton in production.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
