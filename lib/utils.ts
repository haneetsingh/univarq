// Shared helpers.

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function firstNameOf(name: string): string {
  return name.trim().split(/\s+/)[0] ?? "";
}

// Best-effort client IP from the proxy headers Vercel sets.
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

// In-memory: per serverless instance, reset on cold start, not shared across
// instances. Blunts a single burst; use a durable store for a global limit.
export function createRateLimiter(max: number, windowMs: number) {
  const hitsByKey = new Map<string, number[]>();

  return function rateLimit(key: string): boolean {
    const now = Date.now();
    const cutoff = now - windowMs;
    const hits = (hitsByKey.get(key) ?? []).filter((t) => t > cutoff);
    if (hits.length >= max) {
      hitsByKey.set(key, hits);
      return false;
    }
    hits.push(now);
    hitsByKey.set(key, hits);
    return true;
  };
}
