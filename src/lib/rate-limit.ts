// ponytail: limiter in-memory per instance. Cukup untuk 1 server (VPS/standalone).
// Kalau nanti jalan multi-instance/serverless, pindahkan counter ke Redis/Upstash.
const buckets = new Map<string, { count: number; resetAt: number }>();

/** true = boleh lanjut, false = kena limit. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    if (buckets.size > 10_000) {
      for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k);
    }
    return true;
  }

  entry.count += 1;
  return entry.count <= limit;
}

type HeaderSource = Headers | Record<string, string | string[] | undefined> | undefined;

export function getClientIp(headers: HeaderSource): string {
  const read = (name: string): string | undefined => {
    if (!headers) return undefined;
    if (headers instanceof Headers) return headers.get(name) ?? undefined;
    const value = headers[name];
    return Array.isArray(value) ? value[0] : value;
  };
  return read("x-forwarded-for")?.split(",")[0].trim() || read("x-real-ip") || "unknown";
}
