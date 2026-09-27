"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "./brand";

const NAV = [
  { href: "#growth", label: "Рост выручки" },
  { href: "#product", label: "Продукт" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#geo", label: "География" },
  { href: "#price", label: "Тарифы" },
  { href: "#faq", label: "Вопросы" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-ink-line bg-ink/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-20 items-center justify-between gap-8">
        <a href="#top" className="shrink-0" aria-label="Goulash.tech">
          <LogoMark />
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-white/60 transition-colors hover:text-cyan-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#lead"
          className="bg-cyan-accent px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-cyan-300"
        >
          Хочу Гуляш
        </a>
      </div>
    </header>
  );
}
