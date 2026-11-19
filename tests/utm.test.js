import { describe, expect, it } from "vitest";
import { captureAttribution } from "@/lib/analytics/utm";

function storage() {
  const values = new Map();
  return { getItem: (key) => values.get(key) || null, setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key) };
}

describe("UTM-атрибуция", () => {
  it("сохраняет параметры первого входа", () => {
    const session = storage();
    const first = captureAttribution({ search: "?utm_source=instagram&utm_medium=social&utm_campaign=foundly_launch", path: "/", referrer: "https://instagram.com", storage: session });
    const second = captureAttribution({ search: "?utm_source=threads", path: "/privacy", storage: session });
    expect(first.utm_source).toBe("instagram");
    expect(first.referrer).toBe("https://instagram.com");
    expect(second.utm_source).toBe("instagram");
    expect(second.landingPath).toBe("/");
  });
});
