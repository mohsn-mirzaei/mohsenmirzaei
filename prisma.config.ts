import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Next.js convention is `.env.local` for secrets, but the plain `dotenv`
// package (used here by the Prisma CLI, outside Next's own env loading)
// only reads `.env` by default — point it at `.env.local` explicitly.
config({ path: ".env.local" });

/**
 * Prisma 7 config: connection URL used by `prisma migrate`/`prisma studio`.
 * Runtime queries go through the driver adapter in src/lib/db/client.ts
 * instead — see https://pris.ly/d/config-datasource.
 *
 * Migrations need the direct (unpooled) host. The `-pooler` URL is for the
 * app at runtime and rejects or drops long-lived schema commands.
 */
const migrationUrl =
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL_NON_POOLING ||
  env("DATABASE_URL");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: migrationUrl,
  },
});
