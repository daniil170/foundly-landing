export const metadata = {
  title: "Foundly",
  description: "Помогаем превратить идею в реальный проект"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
