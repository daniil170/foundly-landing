export const roles = {
  student: "Школьник или студент",
  parent: "Родитель",
  mentor: "Потенциальный ментор"
};

export const roleFields = {
  student: ["ageGroup", "projectStage", "direction", "goal", "deadline", "scenario"],
  parent: ["childAgeGroup", "projectStage", "goal", "deadline", "challenge", "scenario"],
  mentor: ["expertise", "experience", "portfolioUrl", "projectTypes", "availability", "motivation"]
};

export const options = {
  ageGroups: ["До 14 лет", "14–17 лет", "18–22 года", "23 года и старше"],
  childAgeGroups: ["До 14 лет", "14–17 лет", "18 лет и старше"],
  stages: ["Только идея", "Начали работу", "Застряли", "Почти готов — нужна упаковка"],
  scenarios: [
    ["portfolio", "Проект для портфолио"],
    ["deadline", "Проект к конкурсу или хакатону"],
    ["mvp", "От идеи до первого MVP"]
  ],
  contactMethods: ["WhatsApp", "Telegram", "Email", "Телефон"]
};
