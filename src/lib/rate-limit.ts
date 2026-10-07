import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * IP-based backstop on top of the per-email DB check in /api/contact — that
 * check alone doesn't stop a script rotating fake emails from one IP. Looser
 * than the per-email limit (10/10min vs 3/10min) since it's a coarse
 * catch-all, not the primary defense.
 */
const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(10, "10 m"),
        prefix: "contact-ip",
      })
    : null;

export async function checkIpRateLimit(ip: string): Promise<{ success: boolean }> {
  if (!ratelimit) {
    console.warn("[rate-limit] Upstash env vars not set — skipping IP rate limit.");
    return { success: true };
  }
  const { success } = await ratelimit.limit(ip);
  return { success };
}
