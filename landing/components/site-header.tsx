"use client";

import { useEffect, useState } from "react";
import { Logo } from "./brand";

const NAV = [
  { href: "#demo", label: "Демо смены" },
  { href: "#numbers", label: "Цифры" },
  { href: "#modules", label: "Что входит" },
  { href: "#price", label: "Сколько стоит" },
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
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a href="#top" className="shrink-0">
          <Logo />
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-white/65 transition-colors hover:text-cyan-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#lead"
          className="rounded-full bg-cyan-accent px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-cyan-300 sm:px-5"
        >
          Разобрать смену
        </a>
      </div>
    </header>
  );
}
