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
  title: "Goulash.tech — комплексная система автоматизации ресторанов доставки",
  description:
    "+3 млн ₽ дополнительной выручки в год на точку. Больше заказов, быстрее доставка, меньше потерь и выше возвращаемость гостей.",
  openGraph: {
    title: "Goulash.tech — +3 млн ₽ дополнительной выручки в год на точку",
    description:
      "Больше заказов, быстрее доставка, меньше потерь и выше возвращаемость гостей.",
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
