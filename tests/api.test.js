import { beforeEach, describe, expect, it, vi } from "vitest";
import { clearRateLimits } from "@/lib/leads/rateLimit";
import { studentLead } from "./fixtures";

vi.mock("@/lib/leads/delivery", () => ({ deliverLead: vi.fn() }));

import { deliverLead } from "@/lib/leads/delivery";
import { POST } from "@/app/api/leads/route";

function request(body, ip = "127.0.0.1") {
  return new Request("http://localhost/api/leads", { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": ip }, body: JSON.stringify(body) });
}

describe("POST /api/leads", () => {
  beforeEach(() => clearRateLimits());
  it("отправляет корректную заявку", async () => {
    deliverLead.mockResolvedValue({ accepted: true });
    const response = await POST(request(studentLead));
    expect(response.status).toBe(201);
    expect((await response.json()).ok).toBe(true);
  });
  it("возвращает ошибки полей для пустой заявки", async () => {
    const response = await POST(request({}));
    const body = await response.json();
    expect(response.status).toBe(422);
    expect(body.errors.role).toBeTruthy();
  });
  it("безопасно сообщает об ошибке отправки", async () => {
    deliverLead.mockRejectedValue(new Error("LEADS_DELIVERY_FAILED"));
    const response = await POST(request(studentLead));
    const body = await response.json();
    expect(response.status).toBe(503);
    expect(body.code).toBe("DELIVERY_ERROR");
    expect(JSON.stringify(body)).not.toContain(studentLead.contact);
  });
  it("ограничивает повторные запросы", async () => {
    deliverLead.mockResolvedValue({ accepted: true });
    for (let index = 0; index < 5; index += 1) await POST(request(studentLead, "10.0.0.1"));
    const response = await POST(request(studentLead, "10.0.0.1"));
    expect(response.status).toBe(429);
  });
});
