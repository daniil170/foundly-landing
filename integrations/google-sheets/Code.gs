const SHEET_NAME = "Заявки";

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents || "{}");
    if (payload.website) return response({ ok: true });
    if (!payload.name || !payload.contact || !payload.role || payload.consent !== true) return response({ ok: false, error: "validation" });

    const attribution = payload.attribution || {};
    const row = [
      Utilities.getUuid(), new Date(), "Новая", clean(payload.role), clean(payload.name), clean(payload.contact), clean(payload.city),
      clean(payload.contactMethod), clean(payload.message), clean(payload.ageGroup), clean(payload.childAgeGroup), clean(payload.projectStage),
      clean(payload.direction), clean(payload.goal), clean(payload.deadline), clean(payload.scenario), clean(payload.parentName),
      clean(payload.parentContact), payload.parentInformed === true, clean(payload.challenge), clean(payload.expertise), clean(payload.experience),
      clean(payload.portfolioUrl), clean(payload.projectTypes), clean(payload.availability), clean(payload.motivation), payload.consent === true,
      clean(payload.selectedCta), clean(attribution.utm_source), clean(attribution.utm_medium), clean(attribution.utm_campaign),
      clean(attribution.utm_content), clean(attribution.utm_term), clean(attribution.referrer), clean(attribution.landingPath), clean(payload.userAgent)
    ];

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME).appendRow(row);
    lock.releaseLock();
    return response({ ok: true });
  } catch (error) {
    return response({ ok: false, error: "internal" });
  }
}

function clean(value) {
  return String(value || "").trim().slice(0, 2000);
}

function response(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
