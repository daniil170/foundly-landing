import { describe, expect, it } from "vitest";
import { roleFields } from "@/lib/leads/fields";
import { validateLead } from "@/lib/leads/validation";
import { studentLead } from "./fixtures";

describe("валидация заявки", () => {
  it("принимает корректную заявку студента", () => expect(validateLead(studentLead).valid).toBe(true));
  it("отклоняет пустую и некорректную заявку", () => {
    const result = validateLead({ role: "student", contact: "не контакт" });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeTruthy();
    expect(result.errors.contact).toBeTruthy();
    expect(result.errors.consent).toBeTruthy();
  });
  it("требует контакт родителя у несовершеннолетнего", () => {
    const result = validateLead({ ...studentLead, ageGroup: "14–17 лет" });
    expect(result.errors.parentName).toBeTruthy();
    expect(result.errors.parentContact).toBeTruthy();
    expect(result.errors.parentInformed).toBeTruthy();
  });
  it("проверяет ссылку портфолио ментора", () => {
    const mentor = { ...studentLead, role: "mentor", expertise: "Frontend", experience: "Три года", portfolioUrl: "github без протокола", projectTypes: "Веб-приложения", availability: "3 часа в неделю", motivation: "Хочу помогать" };
    expect(validateLead(mentor).errors.portfolioUrl).toBeTruthy();
  });
});

describe("условные поля", () => {
  it.each(["student", "parent", "mentor"])("определяет поля роли %s", (role) => expect(roleFields[role].length).toBeGreaterThanOrEqual(6));
});
