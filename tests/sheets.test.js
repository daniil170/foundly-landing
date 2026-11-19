import { afterEach, describe, expect, it, vi } from "vitest";
import { submitLead } from "@/lib/leads/sheets";
import { studentLead } from "./fixtures";

describe("отправка в Google Sheets", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("отправляет заявку в Apps Script", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL", "https://script.google.com/macros/s/test/exec");
    const fetcher = vi.fn().mockResolvedValue({});
    await expect(submitLead(studentLead, fetcher)).resolves.toEqual({ accepted: true });
    expect(fetcher).toHaveBeenCalledWith(
      "https://script.google.com/macros/s/test/exec",
      expect.objectContaining({ method: "POST", mode: "no-cors", keepalive: true })
    );
  });

  it("показывает ошибку без URL таблицы", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL", "");
    await expect(submitLead(studentLead, vi.fn())).rejects.toThrow("Google Sheets");
  });

  it("показывает ошибку сети", async () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL", "https://script.google.com/macros/s/test/exec");
    await expect(submitLead(studentLead, vi.fn().mockRejectedValue(new Error("network")))).rejects.toThrow("Не удалось отправить");
  });
});
