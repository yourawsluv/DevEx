import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Goulash.tech — вся смена доставки в одном экране",
  description:
    "Экосистема для службы доставки еды со своей курьеркой: приём заказа, кухня, автомаршрутизация курьеров. Переход 21 день, внедряет партнёр в вашем городе.",
  openGraph: {
    title: "Goulash.tech — вся смена доставки в одном экране",
    description:
      "150–400 заказов в день и свои курьеры? Гуляш распределяет смену сам. Одна смена, три роли, один экран.",
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${onest.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
