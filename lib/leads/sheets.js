export async function submitLead(payload, fetcher = fetch) {
  const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) throw new Error("Форма ещё не подключена к Google Sheets");

  const userAgent = typeof navigator === "undefined" ? "" : navigator.userAgent;
  try {
    await fetcher(webhookUrl, {
      method: "POST",
      headers: { "content-type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({ ...payload, userAgent }),
      mode: "no-cors",
      keepalive: true
    });
  } catch {
    throw new Error("Не удалось отправить заявку. Проверьте соединение и попробуйте снова");
  }
  return { accepted: true };
}
