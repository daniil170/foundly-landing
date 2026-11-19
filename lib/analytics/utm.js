export const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
export const attributionStorageKey = "foundly_attribution";

function clean(value, max = 160) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function captureAttribution({ search = "", referrer = "", path = "/", storage } = {}) {
  if (!storage) return {};
  const existing = storage.getItem(attributionStorageKey);
  if (existing) {
    try {
      return JSON.parse(existing);
    } catch {
      storage.removeItem(attributionStorageKey);
    }
  }
  const params = new URLSearchParams(search);
  const attribution = {
    ...Object.fromEntries(attributionKeys.map((key) => [key, clean(params.get(key) || "")])),
    referrer: clean(referrer, 500),
    landingPath: clean(path, 300)
  };
  storage.setItem(attributionStorageKey, JSON.stringify(attribution));
  return attribution;
}

export function getAttribution(storage) {
  if (!storage) return {};
  try {
    return JSON.parse(storage.getItem(attributionStorageKey) || "{}");
  } catch {
    return {};
  }
}
