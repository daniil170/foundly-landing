import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputPath = fileURLToPath(new URL("./Foundly Leads.xlsx", import.meta.url));
const workbook = Workbook.create();
const leads = workbook.worksheets.add("Заявки");
const settings = workbook.worksheets.add("Настройки");

const headers = [
  "ID", "Получено", "Статус", "Роль", "Имя", "Контакт", "Город", "Способ связи", "Сообщение",
  "Возрастная группа", "Возраст ребёнка", "Стадия проекта", "Направление", "Цель", "Дедлайн", "Сценарий",
  "Имя родителя", "Контакт родителя", "Родитель уведомлён", "Основная сложность", "Экспертиза", "Опыт",
  "Портфолио", "Типы проектов", "Доступность", "Мотивация", "Согласие", "CTA", "utm_source", "utm_medium",
  "utm_campaign", "utm_content", "utm_term", "Referrer", "Landing path", "User agent"
];

const seed = [
  "sample", new Date(), "Новая", "Тест", "ТЕСТОВАЯ СТРОКА — удалите после настройки", "", "", "", "",
  "", "", "", "", "", "", "", "", "", false, "", "", "", "", "", "", "", true, "",
  "", "", "", "", "", "", "", ""
];

leads.getRange("A1:AJ2").values = [headers, seed];
const table = leads.tables.add("A1:AJ2", true, "FoundlyLeads");
table.style = "TableStyleLight1";
table.showFilterButton = true;
leads.freezePanes.freezeRows(1);
leads.freezePanes.freezeColumns(3);
leads.showGridLines = false;
leads.getRange("A1:AJ2").format.font = { name: "Arial", size: 10, color: "#111111" };
leads.getRange("A1:AJ1").format = { fill: "#F2F2F2", font: { name: "Arial", size: 10, bold: true, color: "#111111" }, verticalAlignment: "center", horizontalAlignment: "center", wrapText: true };
leads.getRange("A1:AJ1").format.rowHeightPx = 42;
leads.getRange("A2:AJ2").format.rowHeightPx = 34;
leads.getRange("B2:B1000").setNumberFormat("yyyy-mm-dd hh:mm");
leads.getRange("C2:C1000").dataValidation = { rule: { type: "list", values: ["Новая", "Связались", "Диагностика", "В работе", "Не подходит", "Закрыта"] } };
leads.getRange("D2:D1000").dataValidation = { rule: { type: "list", values: ["student", "parent", "mentor"] } };
leads.getRange("Q2:Q1000").format.columnWidthPx = 160;
leads.getRange("W2:W1000").format.columnWidthPx = 210;
leads.getRange("A1:AJ2").format.autofitColumns();
for (const column of ["I", "N", "T", "V", "X", "Z", "AI", "AJ"]) leads.getRange(`${column}1:${column}1000`).format.columnWidthPx = 220;
for (const column of ["E", "F", "G", "H", "J", "K", "L", "M", "O", "P", "Q", "R", "U", "Y", "AB"]) leads.getRange(`${column}1:${column}1000`).format.columnWidthPx = 140;
leads.getRange("A2:AJ1000").format.verticalAlignment = "top";

settings.showGridLines = false;
settings.getRange("A1:D1").values = [["Foundly · настройки заявок", "", "", ""]];
settings.getRange("A3:B9").values = [
  ["Статусы", "Роли"],
  ["Новая", "student"],
  ["Связались", "parent"],
  ["Диагностика", "mentor"],
  ["В работе", ""],
  ["Не подходит", ""],
  ["Закрыта", ""]
];
settings.getRange("A11:D15").values = [
  ["Порядок подключения", "", "", ""],
  ["1", "Откройте Extensions → Apps Script", "", ""],
  ["2", "Вставьте Code.gs из проекта", "", ""],
  ["3", "Deploy → New deployment → Web app", "", ""],
  ["4", "URL добавьте в NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL", "", ""]
];
settings.getRange("A1:D1").format = { font: { name: "Arial", size: 14, bold: true, color: "#FF6833" } };
settings.getRange("A3:B3").format = { fill: "#F2F2F2", font: { name: "Arial", size: 10, bold: true, color: "#111111" } };
settings.getRange("A11:D11").format = { fill: "#F2F2F2", font: { name: "Arial", size: 10, bold: true, color: "#111111" } };
settings.getRange("A1:D15").format.font = { name: "Arial", size: 10, color: "#111111" };
settings.getRange("A1:D15").format.autofitColumns();
settings.getRange("B1:B15").format.columnWidthPx = 360;

workbook.recalculate();
const preview = await workbook.render({ sheetName: "Заявки", range: "A1:J8", scale: 1, format: "png" });
await fs.writeFile(fileURLToPath(new URL("./Foundly Leads Preview.png", import.meta.url)), new Uint8Array(await preview.arrayBuffer()));
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
const inspection = await workbook.inspect({ kind: "workbook,sheet,table", maxChars: 6000, tableMaxRows: 3, tableMaxCols: 36 });
process.stdout.write(inspection.ndjson);
