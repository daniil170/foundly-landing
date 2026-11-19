# Подключение Google Sheets

1. Импортируйте `Foundly Leads.xlsx` как нативную Google-таблицу.
2. Удалите тестовую строку после проверки структуры.
3. Откройте **Расширения → Apps Script**.
4. Замените содержимое `Code.gs` кодом из этого каталога.
5. Нажмите **Deploy → New deployment → Web app**.
6. Выполнение: от вашего имени. Доступ: все, у кого есть ссылка.
7. Скопируйте URL deployment в `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

8. Перезапустите Next.js и отправьте тестовую заявку.

URL веб-приложения не является секретом: он используется браузером для отправки формы. Apps Script проверяет обязательные поля и honeypot перед добавлением строки.
