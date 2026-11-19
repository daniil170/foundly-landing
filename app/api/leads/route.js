import { deliverLead } from "@/lib/leads/delivery";
import { checkRateLimit } from "@/lib/leads/rateLimit";
import { validateLead } from "@/lib/leads/validation";

const maxPayloadBytes = 16 * 1024;

function json(body, status = 200) {
  return Response.json(body, { status });
}

export async function POST(request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > maxPayloadBytes) return json({ ok: false, code: "PAYLOAD_TOO_LARGE", message: "Заявка слишком большая" }, 413);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (!checkRateLimit(ip)) return json({ ok: false, code: "RATE_LIMITED", message: "Слишком много попыток. Попробуйте позже" }, 429);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, code: "INVALID_JSON", message: "Не удалось прочитать заявку" }, 400);
  }

  if (JSON.stringify(body).length > maxPayloadBytes) return json({ ok: false, code: "PAYLOAD_TOO_LARGE", message: "Заявка слишком большая" }, 413);
  if (body.website) return json({ ok: true, code: "ACCEPTED", message: "Заявка получена" }, 202);

  const result = validateLead(body);
  if (!result.valid) return json({ ok: false, code: "VALIDATION_ERROR", message: "Проверьте заполненные поля", errors: result.errors }, 422);

  try {
    await deliverLead(result.data);
    return json({ ok: true, code: "ACCEPTED", message: "Заявка получена" }, 201);
  } catch (error) {
    const configurationError = error instanceof Error && error.message === "LEADS_DESTINATION_NOT_CONFIGURED";
    return json({ ok: false, code: configurationError ? "SERVICE_NOT_CONFIGURED" : "DELIVERY_ERROR", message: "Не удалось отправить заявку. Попробуйте позже" }, 503);
  }
}
