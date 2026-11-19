const allowedEvents = new Set([
  "intro_completed",
  "cta_clicked",
  "scenario_selected",
  "form_started",
  "form_step_completed",
  "form_submitted",
  "form_error"
]);

export function trackEvent(name, properties = {}) {
  if (typeof window === "undefined" || !allowedEvents.has(name)) return;
  window.dispatchEvent(new CustomEvent("foundly:analytics", { detail: { name, properties, timestamp: Date.now() } }));
}
