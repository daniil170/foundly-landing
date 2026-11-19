export async function deliverLead(lead, fetcher = fetch) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) {
    if (process.env.NODE_ENV === "production") throw new Error("LEADS_DESTINATION_NOT_CONFIGURED");
    return { mode: "mock", accepted: true };
  }
  let response;
  try {
    response = await fetcher(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ version: 1, submittedAt: new Date().toISOString(), lead }),
      signal: AbortSignal.timeout(8000)
    });
  } catch {
    throw new Error("LEADS_DELIVERY_FAILED");
  }
  if (!response.ok) throw new Error("LEADS_DELIVERY_FAILED");
  return { mode: "webhook", accepted: true };
}
