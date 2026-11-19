import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Foundly — преврати идею в реальный проект",
    template: "%s · Foundly"
  },
  description: "Ментор, понятный план и короткие спринты для школьных и студенческих проектов.",
  openGraph: {
    title: "Foundly — преврати идею в реальный проект",
    description: "Бесплатная диагностика проекта для школьников, студентов и родителей.",
    type: "website",
    locale: "ru_KZ",
    images: [{ url: "/foundly-logo.png", width: 1024, height: 1024, alt: "Foundly" }]
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="dark">
      <body>{children}</body>
    </html>
  );
}
