/**
 * In-memory per-IP rate limiting for assistant invocations.
 * Sliding window: max 20 requests per IP per 60 seconds.
 */

interface RateLimitEntry {
  count: number
  windowStart: number
}

const ipLimits = new Map<string, RateLimitEntry>()

const WINDOW_MS = 60_000
const MAX_REQUESTS = 20

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = ipLimits.get(ip)

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    ipLimits.set(ip, { count: 1, windowStart: now })
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  entry.count += 1
  return { allowed: true, remaining: MAX_REQUESTS - entry.count }
}
