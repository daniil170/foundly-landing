const attempts = new Map();

export function checkRateLimit(key, now = Date.now(), limit = 5, windowMs = 10 * 60 * 1000) {
  const recent = (attempts.get(key) || []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) return false;
  recent.push(now);
  attempts.set(key, recent);
  return true;
}

export function clearRateLimits() {
  attempts.clear();
}
