import { Logo, Section, SectionLabel } from "@/components/brand";
import { Faq } from "@/components/faq";
import { LeadForm } from "@/components/lead-form";
import { ShiftDemo } from "@/components/shift-demo";
import { SiteHeader } from "@/components/site-header";

const HERO_FACTS = [
  { value: "900+", label: "точек на системе" },
  { value: "1,3 млн+", label: "заказов в месяц" },
  { value: "150+", label: "городов" },
  { value: "21 день", label: "переход" },
];

const PAIN = [
  {
    role: "Администратор",
    text: "Переспрашивает адрес и состав заказа, обещает время «на глаз», ищет свободного курьера звонками.",
    cost: "до 10 минут на заказ",
  },
  {
    role: "Кухня",
    text: "Не видит, что уже в пути, а что готовить сейчас. Стоп-лист живёт в чате смены, поэтому продаётся то, чего нет.",
    cost: "отмены и комплименты",
  },
  {
    role: "Курьер",
    text: "Ждёт звонка, чтобы узнать адрес. Пеший едет за пять километров, потому что «других свободных нет».",
    cost: "лишние минуты в час-пик",
  },
];

const ROLE_SOLUTION = [
  {
    role: "Администратор",
    items: [
      "Номер гостя определяется через интеграцию с АТС",
      "Адрес подставляется из истории заказов",
      "ETA считает система по загрузке кухни и маршруту",
    ],
  },
  {
    role: "Кухня",
    items: [
      "Слоты по 15 минут: видно, что готовить сейчас",
      "Автораспределение заказов вместо ручных костылей",
      "Стоп-лист уходит руководителю в Telegram сам",
    ],
  },
  {
    role: "Курьер",
    items: [
      "Push о готовом заказе без звонка диспетчера",
      "Адрес и маршрут в приложении курьера",
      "Тип доставки — пеший, вело, авто — учтён в назначении",
    ],
  },
];

const NUMBERS = [
  { value: "−12 мин", label: "на заказ в час-пик за счёт маршрутизации" },
  { value: "+30%", label: "заказов в своём канале, вне агрегаторов" },
  { value: "+13%", label: "повторных заказов при точном ETA" },
  { value: "2%", label: "потерь в расходах возвращается контролем смены" },
  { value: "+3 млн ₽", label: "дополнительной выручки в год на точку" },
  { value: "4,8", label: "средняя оценка приложения у гостей" },
];

const CASES = [
  {
    quote: "Я тушила пожары каждый день, но не понимала, где теряю деньги",
    result: "−17% скрытых расходов",
    person: "Регина Васина",
    company: "сеть доставок Sayori",
  },
  {
    quote:
      "Автоматическое распределение курьеров убрало ручные звонки диспетчера и минимизировало человеческий фактор. Расходы на логистику снизились уже в первый месяц",
    result: "логистика дешевле с первого месяца",
    person: "Дмитрий Инякин",
    company: "«Неместные»",
  },
  {
    quote:
      "Оборот компании за год вырос в 3 раза благодаря маршрутизации заказов. Мы сократили время доставки и увеличили производительность кухни",
    result: "x3 выручка за год",
    person: "Валентина Мухачева",
    company: "FoodGarden",
  },
];

const MODULES = [
  {
    title: "Приём заказа",
    text: "Сайт, приложение, колл-центр с определением номера по АТС, агрегаторы — в одном контуре.",
  },
  {
    title: "Меню и стоп-листы",
    text: "Управление в ERP, автоматическая выгрузка на все каналы, уведомление в Telegram.",
  },
  {
    title: "Работа кухни",
    text: "Слоты по 15 минут, графики смен, отметка по штрих-коду или отпечатку.",
  },
  {
    title: "Автомаршрутизация",
    text: "Учёт типа курьера и его местоположения, маршрут в обе стороны, распределение без диспетчера.",
  },
  {
    title: "Приложение курьера",
    text: "Push о готовом заказе, адрес после забора, маршрут и статусы.",
  },
  {
    title: "Статус для гостя",
    text: "Этапы готовности, курьер на карте, автоуведомление при задержке.",
  },
  {
    title: "Контроль смены",
    text: "KPI на главном экране, сравнение точек между собой, разбор отклонений.",
  },
  {
    title: "Лояльность и база",
    text: "Бонусы, промокоды, RFM-сегменты, тепловая карта заказов, дни рождения гостей.",
  },
  {
    title: "Своё приложение",
    text: "Гостевое приложение и сайт под вашим брендом без своей команды разработки.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Разбор смены",
    time: "1 день",
    text: "Смотрим поток, каналы заказов, курьеров и кассу. Считаем, где именно уходят минуты и деньги.",
  },
  {
    step: "02",
    title: "Настройка и перенос",
    time: "до 14 дней",
    text: "Меню, зоны и тарифы доставки, база гостей, интеграция с вашей POS. Всё делает партнёр в вашем городе.",
  },
  {
    step: "03",
    title: "Первые смены",
    time: "до 7 дней",
    text: "Обучаем администраторов и курьеров, партнёр рядом в первые вечера, дальше смена идёт сама.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-cyan-accent/12 blur-[140px]"
          />
          <div className="shell relative pt-14 pb-16 sm:pt-20 sm:pb-24">
            <p className="inline-flex items-center gap-2 rounded-full border border-ink-line px-4 py-2 text-sm text-white/60">
              <span aria-hidden className="size-2 rounded-full bg-cyan-accent" />
              Для служб доставки со своей курьеркой · 150–400 заказов в день
            </p>

            <h1 className="mt-7 max-w-4xl text-display font-extrabold leading-[0.95] tracking-tight">
              Вся смена —
              <br />
              <span className="text-cyan-accent">в одном экране</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-white/65 sm:text-xl">
              Goulash.tech заменяет пять сервисов и ручную диспетчеризацию одной
              экосистемой: приём заказа, кухня, курьеры. Переход — 21 день, внедряет партнёр
              в вашем городе.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#lead"
                className="inline-flex items-center justify-center rounded-full bg-cyan-accent px-7 py-4 text-base font-semibold text-ink transition-colors hover:bg-cyan-300"
              >
                Разобрать мою смену
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-full border border-ink-line px-7 py-4 text-base font-semibold text-white transition-colors hover:border-cyan-accent hover:text-cyan-accent"
              >
                Посмотреть демо смены
              </a>
            </div>

            <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-4">
              {HERO_FACTS.map((fact) => (
                <div key={fact.label} className="bg-ink p-5">
                  <dt className="text-2xl font-bold text-cyan-accent tnum sm:text-3xl">
                    {fact.value}
                  </dt>
                  <dd className="mt-1 text-sm text-white/50">{fact.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Section id="pain">
          <SectionLabel>Ваша смена сегодня</SectionLabel>
          <h2 className="max-w-3xl text-h2 font-bold leading-tight">
            18:40. Двенадцать заказов, пять курьеров, и вся логика смены — в голове
            диспетчера
          </h2>
          <p className="mt-5 max-w-2xl text-white/60">
            Утром вы считаете не выручку, а отмены. Вот как это выглядит по ролям.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PAIN.map((item) => (
              <article
                key={item.role}
                className="rounded-2xl border border-ink-line bg-ink-soft p-6"
              >
                <p className="text-sm uppercase tracking-wider text-white/40">{item.role}</p>
                <p className="mt-3 text-white/80">{item.text}</p>
                <p className="mt-5 inline-block rounded-lg bg-[#ff6b6b]/12 px-3 py-1.5 text-sm font-medium text-[#ff6b6b]">
                  {item.cost}
                </p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="roles">
          <SectionLabel>Что меняет Гуляш</SectionLabel>
          <h2 className="max-w-3xl text-h2 font-bold leading-tight">
            Одна смена. Три роли. Один экран
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {ROLE_SOLUTION.map((block) => (
              <article
                key={block.role}
                className="rounded-2xl border border-ink-line bg-ink-soft p-6"
              >
                <h3 className="text-lg font-semibold text-cyan-accent">{block.role}</h3>
                <ul className="mt-4 space-y-3">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3 text-white/70">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-cyan-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="demo">
          <SectionLabel>Демо продукта</SectionLabel>
          <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-2xl text-h2 font-bold leading-tight">
              Переключите смену и посмотрите, что меняется
            </h2>
            <p className="max-w-md text-white/60">
              Тумблер режима, роли и типы курьеров пересчитывают распределение, ETA и KPI
              смены прямо на экране.
            </p>
          </div>
          <ShiftDemo />
        </Section>

        <Section id="numbers">
          <SectionLabel>Результат</SectionLabel>
          <h2 className="max-w-3xl text-h2 font-bold leading-tight">
            +29% выручки клиентов год к году — на 7,1% выше рынка
          </h2>
          <p className="mt-5 max-w-2xl text-white/60">
            Средний рост рынка доставки — +21% (данные РБК). Клиенты Goulash.tech растут
            быстрее, потому что смена перестаёт терять заказы.
          </p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-3">
            {NUMBERS.map((item) => (
              <div key={item.label} className="bg-ink p-6">
                <p className="text-3xl font-bold text-cyan-accent tnum">{item.value}</p>
                <p className="mt-2 text-white/55">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-white/30">
            Показатели и цитаты — с сайта goulash.tech и из открытых источников. Данные внутри
            демо смены демонстрационные.
          </p>
        </Section>

        <Section id="cases">
          <SectionLabel>Такие же владельцы</SectionLabel>
          <div className="grid gap-4 lg:grid-cols-3">
            {CASES.map((item) => (
              <figure
                key={item.person}
                className="flex flex-col justify-between rounded-2xl border border-ink-line bg-ink-soft p-6"
              >
                <blockquote className="text-lg leading-snug text-white/85">
                  «{item.quote}»
                </blockquote>
                <figcaption className="mt-6">
                  <p className="inline-block rounded-lg bg-cyan-accent/12 px-3 py-1.5 text-sm font-semibold text-cyan-accent">
                    {item.result}
                  </p>
                  <p className="mt-3 font-medium">{item.person}</p>
                  <p className="text-sm text-white/45">{item.company}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section id="modules">
          <SectionLabel>Что входит</SectionLabel>
          <h2 className="max-w-3xl text-h2 font-bold leading-tight">
            Девять модулей, которые закрывают вечер
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((module) => (
              <div key={module.title} className="bg-ink p-6">
                <h3 className="font-semibold">{module.title}</h3>
                <p className="mt-2 text-sm text-white/55">{module.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="migration">
          <SectionLabel>Переход</SectionLabel>
          <h2 className="max-w-3xl text-h2 font-bold leading-tight">
            21 день. Три шага. Партнёр рядом
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map((item) => (
              <article
                key={item.step}
                className="rounded-2xl border border-ink-line bg-ink-soft p-6"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-4xl font-extrabold text-cyan-accent/25 tnum">
                    {item.step}
                  </span>
                  <span className="rounded-lg border border-ink-line px-2.5 py-1 text-xs text-white/50">
                    {item.time}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-white/60">{item.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="price">
          <SectionLabel>Сколько стоит</SectionLabel>
          <h2 className="max-w-3xl text-h2 font-bold leading-tight">
            Цена привязана к обороту, а не к числу модулей
          </h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-ink-line bg-ink-soft p-6">
              <p className="text-sm uppercase tracking-wider text-white/40">Интеграция</p>
              <p className="mt-3 text-3xl font-bold tnum">20 000 ₽</p>
              <p className="mt-2 text-white/55">
                Единоразово, одинаково для всех тарифов: подключение, настройка, перенос
                данных.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-accent/50 bg-cyan-accent/5 p-6">
              <p className="text-sm uppercase tracking-wider text-cyan-accent">
                Оборот до 4 млн ₽ в месяц
              </p>
              <p className="mt-3 text-3xl font-bold tnum">40 000 ₽ / мес</p>
              <p className="mt-2 text-white/60">
                Фиксированный платёж со всеми модулями смены: приём заказа, кухня,
                маршрутизация, лояльность.
              </p>
            </div>
            <div className="rounded-2xl border border-ink-line bg-ink-soft p-6">
              <p className="text-sm uppercase tracking-wider text-white/40">
                Оборот больше 4 млн ₽
              </p>
              <p className="mt-3 text-3xl font-bold tnum">1% от оборота</p>
              <p className="mt-2 text-white/55">
                Платите пропорционально росту. Наполнение системы силами партнёра — 50 000 ₽,
                брендирование страниц — от 9 000 ₽.
              </p>
            </div>
          </div>
          <p className="mt-5 text-xs text-white/30">
            Тарифы приведены по опубликованному прайсу партнёра Goulash.tech и могут
            отличаться в вашем городе.
          </p>
        </Section>

        <Section id="faq">
          <SectionLabel>Вопросы</SectionLabel>
          <h2 className="mb-8 max-w-3xl text-h2 font-bold leading-tight">
            Что спрашивают перед переходом
          </h2>
          <Faq />
        </Section>

        <Section id="lead">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start">
            <div>
              <SectionLabel>Заявка</SectionLabel>
              <h2 className="text-h2 font-bold leading-tight">Разберём вашу смену</h2>
              <p className="mt-5 text-white/60">
                Двадцать минут разговора: поток заказов, каналы, курьеры, касса. Покажем на
                ваших цифрах, сколько минут и денег забирает ручная диспетчеризация, и назовём
                стоимость по вашему обороту.
              </p>
              <ul className="mt-7 space-y-3 text-white/70">
                {[
                  "Отвечает партнёр в вашем городе, не колл-центр",
                  "Без презентаций: сразу разбор вечернего часа-пика",
                  "План перехода с датами и ответственными",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-cyan-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <LeadForm />
          </div>
        </Section>

        <footer className="border-t border-ink-line py-12">
          <div className="shell flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Logo />
              <p className="mt-4 max-w-sm text-sm text-white/45">
                SaaS-платформа для ресторанов и служб доставки: приём заказа, кухня,
                маршрутизация, лояльность и аналитика в одном контуре.
              </p>
              <p className="mt-4 text-sm text-white/45">
                Одна смена. Три роли. Один экран. Подключайтесь.
              </p>
            </div>
            <div className="text-sm text-white/45">
              <p className="mb-2 uppercase tracking-wider text-white/30">Контакты</p>
              <p>+7 495 868-36-08</p>
              <p>info@goulash.tech</p>
              <p className="mt-2">Екатеринбург, Куйбышева, 41</p>
            </div>
            <p className="max-w-xs text-xs text-white/30">
              Тестовый лендинг под один сегмент: служба доставки со своей курьеркой. Форма
              заявки — мок, данные демо-смены придуманы. Цифры и цитаты — с goulash.tech и из
              открытых источников.
            </p>
          </div>
        </footer>
      </main>

      <a
        href="#lead"
        className="fixed inset-x-4 bottom-4 z-40 rounded-full bg-cyan-accent py-3.5 text-center text-base font-semibold text-ink shadow-lg shadow-cyan-accent/20 sm:hidden"
      >
        Разобрать смену
      </a>
    </>
  );
}
