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
      <div className="shell flex h-14 items-center justify-between gap-6">
        <a href="#top" className="shrink-0" aria-label="Goulash.tech">
          <LogoMark className="size-7" />
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-paper/60 transition-colors hover:text-cyan-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#lead"
          className="btn bg-cyan-fill px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-cyan-fill-hover"
        >
          Хочу Гуляш
        </a>
      </div>
    </header>
  );
}
