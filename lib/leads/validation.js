import { attributionKeys } from "@/lib/analytics/utm";
import { roleFields } from "@/lib/leads/fields";

const limits = {
  name: 80, contact: 120, city: 80, message: 1000, parentName: 80, parentContact: 120,
  direction: 160, goal: 400, deadline: 120, challenge: 500, expertise: 300,
  experience: 1000, portfolioUrl: 400, projectTypes: 600, availability: 300, motivation: 800,
  projectStage: 120, ageGroup: 80, childAgeGroup: 80, scenario: 80, contactMethod: 40,
  selectedCta: 80, referrer: 500, landingPath: 300
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[\d\s()\-]{7,22}$/;
const urlPattern = /^https?:\/\/[\w.-]+(?:\/[^\s]*)?$/i;

export function normalizeLead(input = {}) {
  const normalized = {};
  for (const [key, max] of Object.entries(limits)) {
    normalized[key] = typeof input[key] === "string" ? input[key].trim().replace(/\s+/g, " ").slice(0, max) : "";
  }
  normalized.role = ["student", "parent", "mentor"].includes(input.role) ? input.role : "";
  normalized.consent = input.consent === true;
  normalized.parentInformed = input.parentInformed === true;
  normalized.website = typeof input.website === "string" ? input.website.trim().slice(0, 200) : "";
  normalized.attribution = {};
  for (const key of [...attributionKeys, "referrer", "landingPath"]) {
    const max = key === "referrer" ? 500 : key === "landingPath" ? 300 : 160;
    normalized.attribution[key] = typeof input.attribution?.[key] === "string" ? input.attribution[key].trim().slice(0, max) : "";
  }
  return normalized;
}

export function isMinor(data) {
  return data.role === "student" && ["До 14 лет", "14–17 лет"].includes(data.ageGroup);
}

export function validateLead(input) {
  const data = normalizeLead(input);
  const errors = {};
  if (!data.role) errors.role = "Выберите, кто заполняет форму";
  if (!data.name) errors.name = "Укажите имя";
  if (!data.contact || (!emailPattern.test(data.contact) && !phonePattern.test(data.contact))) errors.contact = "Укажите корректный email или телефон";
  if (!data.city) errors.city = "Укажите город";
  if (!data.contactMethod) errors.contactMethod = "Выберите способ связи";
  if (!data.consent) errors.consent = "Нужно согласие на обработку данных";
  for (const field of roleFields[data.role] || []) {
    if (!data[field]) errors[field] = "Заполните поле";
  }
  if (data.role === "mentor" && data.portfolioUrl && !urlPattern.test(data.portfolioUrl)) errors.portfolioUrl = "Укажите полную ссылку с https://";
  if (isMinor(data)) {
    if (!data.parentName) errors.parentName = "Укажите имя родителя";
    if (!data.parentContact || (!emailPattern.test(data.parentContact) && !phonePattern.test(data.parentContact))) errors.parentContact = "Укажите корректный контакт родителя";
    if (!data.parentInformed) errors.parentInformed = "Подтвердите информирование родителя";
  }
  return { valid: Object.keys(errors).length === 0, errors, data };
}

export function validateStep(step, input) {
  const { errors } = validateLead(input);
  const stepFields = step === 0 ? ["role"] : step === 1 ? ["name", "contact", "city", "contactMethod"] : [...(roleFields[input.role] || []), "parentName", "parentContact", "parentInformed", "consent"];
  return Object.fromEntries(Object.entries(errors).filter(([key]) => stepFields.includes(key)));
}
