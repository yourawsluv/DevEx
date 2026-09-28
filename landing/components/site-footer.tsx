import { LogoHorizontal } from "./brand";
import { ThemeSwitch } from "./theme-switch";

const NAV = [
  { label: "Подключить", href: "#lead" },
  { label: "Преимущества", href: "#growth" },
  { label: "Наша статистика", href: "#facts" },
  { label: "Стать партнером", href: "https://goulash.tech/partner/" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#lead" },
  { label: "Блог", href: "https://goulash.tech/blog/" },
];

const LEGAL = [
  {
    label: "Условия подключения",
    href: "https://goulash.tech/files/restaurant-software-agreement.pdf",
  },
  { label: "Политика конфиденциальности", href: "https://goulash.tech/privacy-policy/" },
  { label: "Юридическая информация", href: "https://goulash.tech/legal-info/" },
];

const SOCIALS = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@goulashtech",
    path: "M21.6 7.2a2.5 2.5 0 0 0-1.75-1.77C18.3 5 12 5 12 5s-6.3 0-7.85.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.75 1.77C5.7 19 12 19 12 19s6.3 0 7.85-.43a2.5 2.5 0 0 0 1.75-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.1V8.9l5.3 3.1-5.3 3.1z",
  },
  {
    label: "ВКонтакте",
    href: "https://vk.com/goulashtech",
    path: "M12.9 16.6c-5.2 0-8.4-3.6-8.5-9.5h2.6c.1 4.4 2.1 6.3 3.6 6.7V7.1h2.5v3.8c1.5-.2 3-1.9 3.5-3.8h2.4c-.4 2.3-2 4-3.2 4.7 1.2.6 3 2.1 3.7 4.8h-2.7c-.5-1.7-1.9-3.1-3.7-3.3v3.3h-.2z",
  },
  {
    label: "Rutube",
    href: "https://rutube.ru/channel/39484867/",
    path: "M4 4h11.5a4 4 0 0 1 0 8H10l4.5 8h-3.2L7 12H6.5v8H4V4zm2.5 2.3v3.5h8.7a1.75 1.75 0 0 0 0-3.5H6.5z",
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden rule">
      <div className="shell relative pt-14 lg:pt-20">
        <div className="grid12 gap-y-12">
          <div className="col-span-12 flex flex-wrap items-center gap-x-10 gap-y-6 lg:col-span-5">
            <a href="#top" aria-label="Goulash.tech — наверх">
              <LogoHorizontal className="h-8 w-auto" />
            </a>
            <a
              href="https://www.sk.ru/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/skolkovo.svg"
                alt="Участник проекта Сколково"
                loading="lazy"
                decoding="async"
                className="h-9 w-auto"
              />
            </a>
          </div>
          <nav
            aria-label="Навигация в подвале"
            className="col-span-12 flex flex-wrap gap-x-7 gap-y-3 text-sm text-paper/55 lg:col-span-7 lg:col-start-6 lg:justify-end"
          >
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-paper"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink-line pt-8">
          <p className="text-xs text-paper/35">Тема</p>
          <ThemeSwitch />
        </div>

        <div className="mt-8 grid12 gap-y-8 border-t border-ink-line pt-8">
          <div className="col-span-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-paper/30 lg:col-span-7">
            {LEGAL.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-paper/60"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="col-span-12 flex gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
            {SOCIALS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="grid size-10 place-items-center rounded-full border border-ink-line text-paper/55 transition-colors hover:border-paper/40 hover:text-paper"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-5">
                  <path d={item.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 grid12 gap-y-8">
          <p className="col-span-12 max-w-[52ch] text-xs leading-relaxed text-paper/30 lg:col-span-5">
            * — средний показатель роста на точку за 2025 год, полученный на основе внутренних
            аналитических данных платформы Goulash Tech для сетей с оборотом более 16 млн в
            месяц
          </p>
          <p className="col-span-12 max-w-[64ch] text-xs leading-relaxed text-paper/25 lg:col-span-6 lg:col-start-7">
            SaaS-платформа Goulash Tech — сервис автоматизации ресторанной доставки. Общество с
            ограниченной ответственностью «Мне бы в космос» является обладателем исключительных
            прав на программу, право использования программы предоставляется на основании
            лицензионного договора, ИНН 6678119318, 620027, Свердловская область, г.
            Екатеринбург, ул. Челюскинцев, д. 60, кв. 60. ОКВЭД 62.01. Разработка компьютерного
            программного обеспечения. Коды видов деятельности в области информационных
            технологий: 1.01, 2.01.
          </p>
        </div>
      </div>

      <div
        aria-hidden
        className="mt-12 select-none overflow-hidden pb-28 sm:pb-0 lg:mt-16"
      >
        <p className="wordmark shell translate-y-[0.16em] whitespace-nowrap">Goulash.tech</p>
      </div>
    </footer>
  );
}
