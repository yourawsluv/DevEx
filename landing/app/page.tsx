import { LogoHorizontal, LogoStacked, Section, SectionLabel } from "@/components/brand";
import { Faq } from "@/components/faq";
import { LeadForm } from "@/components/lead-form";
import { ProductScreens } from "@/components/product-screens";
import { SiteHeader } from "@/components/site-header";

const HERO_FACTS = [
  { value: "900+", label: "точек подключено к системе" },
  { value: "1,3 млн+", label: "заказов через систему в месяц" },
  { value: "150+", label: "городов с автоматизированной доставкой" },
  { value: "21 день", label: "срок перехода на платформу" },
];

const GROWTH = [
  {
    kicker: "Больше заказов в своём канале",
    value: "+30%",
    label: "заказов",
    items: [
      "Конверсионное приложение",
      "RFM-анализ персонализация",
      "Тепловая карта: кто, откуда и как часто",
      "Снижение зависимости от агрегаторов",
    ],
  },
  {
    kicker: "Кухня без срывов и скрытых расходов",
    value: "Без",
    label: "срывов на кухне",
    items: [
      "Автораспределение заказов",
      "Полностью заменяем «ручные костыли»",
      "Без «комплиментарных подарков»",
    ],
  },
  {
    kicker: "Скорость доставки выше конкурента",
    value: "−12 мин",
    label: "на заказ в час-пик",
    items: [
      "Маршрутизация с учётом местонахождения курьера и типа доставки (пеший/вело/авто)",
      "Подтверждение и распределение заказов без участия человека",
      "Умная логистика",
    ],
  },
  {
    kicker: "Точность доставки → повторный гость",
    value: "+13%",
    label: "повторных заказов",
    items: [
      "Предсказуемость на +20% ETA → +45% удовлетворённости → +13% повторных заказов",
      "Точное прогнозирование рассчитывается автоматически, с учётом загрузки кухни и маршрута курьера одновременно",
    ],
  },
  {
    kicker: "Чёткая видимость на данных",
    value: "2%",
    label: "потерь возвращаем",
    items: [
      "Показатели управления",
      "Контроль кухни, списаний, смен, маршрутов и операционных отклонений ликвидируют 2% утечек в расходах",
    ],
  },
];

const FIT = [
  {
    title: "Нужен управляемый масштаб",
    text: "Мы хотим открывать новые точки, контролировать партнёров, стандарты и качество доставки без хаоса в процессах.",
    quote: "Я не видел всю сеть в одном контуре и не понимал, где проседает качество",
    person: "Владимир Расторгуев",
    role: "владелец сети ресторанов СушиСелл",
  },
  {
    title: "Система ломается на масштабе",
    text: "У нас своя курьерская служба, несколько кухонных потоков, 200+ заказов в день на точку, а текущая связка уже не справляется.",
    quote: "Я тушила пожары каждый день, но не понимала, где теряю деньги",
    person: "Регина Васина",
    role: "владелец сети доставок Сайори",
  },
  {
    title: "Уперлись в рост и агрегаторы",
    text: "Заказы есть, но маржа уходит в комиссии, операторы и ручную обработку.",
    quote: "Доставка растёт, но прибыль не растёт вместе с ней",
    person: "Владимир Марьясов",
    role: "владелец ресторана доставки ТиЧ Пицца",
  },
];

const PRODUCT_POINTS = [
  {
    title: "Удобный прием заказов",
    text: "Через сайт, мобильное приложение, зал, агрегаторы доставки или звонок оператору",
  },
  {
    title: "Гость отслеживает этапы",
    text: "Клиент видит в реальном времени весь путь заказа без участия колл-центра",
  },
  {
    title: "Точное время доставки",
    text: "Рассчитаем и сообщим до минуты, когда привезем заказ",
  },
  {
    title: "Одна система с неограниченным количеством доступов",
    text: "Контролируйте меню, сайт и мобильное приложение, работу кухни, товарооборот, маркетинг и многое другое",
  },
  {
    title: "Удаленное управление всем бизнесом",
    text: "Работайте с поварами, курьерами, администраторами и заказами, где бы вы ни находились",
  },
  {
    title: "Контроль всех показателей ресторана онлайн",
    text: "За всеми изменениями можно оперативно следить через дашборд и настроить уведомления в чат-бот",
  },
];

const SHIFTS = [
  { title: "Время доставки", before: "до ~87 мин", after: "после ~51 мин", delta: "−40%" },
  { title: "Приготовление заказа", before: "до ~60 мин", after: "после ~32 мин", delta: "−47%" },
  {
    title: "Доля заказов через приложение",
    before: "до 27%",
    after: "после 68%",
    delta: "+41%",
  },
];

const REVIEWS = [
  {
    result: "−17% скрытых расходов",
    quote:
      "При выборе платформы смотрели не только на цену, но и на то, как она влияет на стратегию. Нам нужна была система, которая позволит расти, а не ставить нас в зависимость от подрядчиков",
    person: "Регина Васина",
    company: "Sayori",
  },
  {
    result: "+40% заказов",
    quote: "Собственное приложение за год увеличило количество заказов через мобильное приложение на 40%",
    person: "Владимир Расторгуев",
    company: "СушиСелл",
  },
  {
    result: "x3 выручка",
    quote:
      "Оборот компании за год вырос в 3 раза благодаря маршрутизации заказов. Мы сократили время доставки и увеличили производительность кухни.",
    person: "Валентина Мухачева",
    company: "FoodGarden",
  },
  {
    result: "",
    quote:
      "Автоматическое распределение курьеров убрало ручные звонки диспетчера и минимизировало человеческий фактор. Расходы на логистику снизились уже в первый месяц",
    person: "Дмитрий Инякин",
    company: "Неместные",
  },
  {
    result: "",
    quote:
      "Раньше коммуникация с гостями была на стороне подрядчиков — теперь мы выстроили её внутри компании и управляем ею сами",
    person: "Виктория Беляйкина",
    company: "Суши Шеф",
  },
  {
    result: "",
    quote:
      "Я думаю, еще 10% не разобрал от всей программы. Я до сих пор нахожусь под впечатлением от такого огромного функционала и возможностей этой программы!",
    person: "Андрей",
    company: "Владелец",
  },
  {
    result: "",
    quote:
      "Легкий переход на систему. Наш опыт смены более 3 систем автоматизации позволил оценить легкий и комфортный переход на Goulash.tech. Благодаря интеграциям и возможности загрузить данные, которые были у нас, мы смогли быстро подключиться и сохранить наших клиентов.",
    person: "Александр Невский",
    company: "Управляющий директор",
  },
  {
    result: "до 10 минут в каждом заказе",
    quote:
      "Убрали подтверждение заказов через телефон - экономия до 10 минут в каждом заказе,без расходов на смс.",
    person: "Ирина Кудрявцева",
    company: "Владелица компании",
  },
];

const PLACES = [
  "СушиСелл",
  "Sayori",
  "ТиЧ Пицца",
  "FoodGarden",
  "Неместные",
  "Суши Шеф",
];

const TARIFFS = [
  {
    title: "Интеграция",
    value: "20 000 ₽",
    text: "Стоимость интеграции Goulash.Tech едина для всех тарифов, платеж единоразовый.",
  },
  {
    title: "Оборот менее 4 000 000 ₽",
    value: "40 000 ₽",
    text: "При обороте менее 4 000 000 ₽.",
  },
  {
    title: "Оборот более 4 000 000 ₽",
    value: "1%",
    text: "При обороте в месяц более 4 000 000 ₽. Наполнение системы — 50 000 ₽. Брендирование статичных страниц — от 9 000 ₽.",
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
            <LogoHorizontal className="h-9 w-auto sm:h-11" />
            <h1 className="mt-8 max-w-4xl text-display font-extrabold leading-[0.95] tracking-tight">
              +3 млн ₽ дополнительной выручки в год на точку
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/65 sm:text-xl">
              Больше заказов, быстрее доставка, меньше потерь и выше возвращаемость гостей
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#lead"
                className="inline-flex items-center justify-center rounded-full bg-cyan-accent px-7 py-4 text-center text-base font-semibold text-ink transition-colors hover:bg-cyan-300"
              >
                Узнать, как Goulash.tech поможет моему ресторану доставки
              </a>
              <a
                href="#product"
                className="inline-flex items-center justify-center rounded-full border border-ink-line px-7 py-4 text-base font-semibold text-white transition-colors hover:border-cyan-accent hover:text-cyan-accent"
              >
                Смотреть продукт
              </a>
            </div>
            <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-4">
              {HERO_FACTS.map((fact) => (
                <div key={fact.label} className="bg-ink p-5">
                  <dt className="text-2xl font-bold text-cyan-accent tnum sm:text-3xl">{fact.value}</dt>
                  <dd className="mt-1 text-sm text-white/50">{fact.label}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-white/40">4,8 — средняя оценка пользователей приложения</p>
          </div>
        </section>

        <Section id="growth">
          <SectionLabel>Источники роста выручки</SectionLabel>
          <h2 className="max-w-3xl text-h2 font-bold leading-tight">
            Каждая функция Goulash существует только по одной причине — приблизить рестораны доставки к
            росту выручки
          </h2>
          <p className="mt-5 text-white/60">Отраслевая экспертиза в основе решения.</p>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {GROWTH.map((block) => (
              <article key={block.kicker} className="rounded-2xl border border-ink-line bg-ink-soft p-6">
                <p className="text-sm text-white/45">{block.kicker}</p>
                <p className="mt-3 text-3xl font-bold text-cyan-accent tnum">{block.value}</p>
                <p className="text-white/70">{block.label}</p>
                <ul className="mt-4 space-y-2">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3 text-white/70">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-cyan-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
            <article className="rounded-2xl border border-cyan-accent/40 bg-cyan-accent/5 p-6">
              <p className="text-sm text-white/45">Результат, который опережает рынок</p>
              <p className="mt-3 text-white/80">
                Рост бизнеса — главный показатель эффективности. +29% рост выручки клиентов год к году. На
                7,1% выше рыночного показателя.
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <dt className="text-2xl font-bold tnum">+21%</dt>
                  <dd className="mt-1 text-xs text-white/45">Средний рост выручки по рынку (РБК)</dd>
                </div>
                <div>
                  <dt className="text-2xl font-bold text-cyan-accent tnum">+7.1%</dt>
                  <dd className="mt-1 text-xs text-white/45">Выше рынка с Goulash.tech</dd>
                </div>
                <div>
                  <dt className="text-2xl font-bold text-cyan-accent tnum">+29%</dt>
                  <dd className="mt-1 text-xs text-white/45">Рост выручки клиентов год к году</dd>
                </div>
              </dl>
              <p className="mt-5 text-sm text-white/40">* — по данным РБК</p>
              <p className="mt-2 text-sm text-white/55">Станислав Никифоров, коммерческий директор Goulash.tech</p>
            </article>
          </div>
        </Section>

        <Section id="fit">
          <SectionLabel>Кому подходит Goulash.tech</SectionLabel>
          <div className="grid gap-4 lg:grid-cols-3">
            {FIT.map((item) => (
              <article key={item.title} className="rounded-2xl border border-ink-line bg-ink-soft p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-white/65">{item.text}</p>
                <blockquote className="mt-5 text-white/85">«{item.quote}»</blockquote>
                <p className="mt-4 font-medium">{item.person}</p>
                <p className="text-sm text-white/45">{item.role}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-lg text-white/70">
            Goulash.tech идеально подходит под кухни с циклом приготовления до 30 минут
          </p>
        </Section>

        <Section id="product">
          <SectionLabel>Goulash.tech для сетей доставки</SectionLabel>
          <h2 className="max-w-3xl text-h2 font-bold leading-tight">
            Единая система управления операционными процессами в доставке: от первого заказа до доставки к
            гостю и повторных заказов
          </h2>
          <div className="mt-10">
            <ProductScreens />
          </div>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_POINTS.map((point) => (
              <div key={point.title} className="bg-ink p-6">
                <h3 className="font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm text-white/55">{point.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {SHIFTS.map((item) => (
              <article key={item.title} className="rounded-2xl border border-ink-line bg-ink-soft p-6">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-white/45">{item.before}</p>
                <p className="text-sm text-white/70">{item.after}</p>
                <p className="mt-3 text-2xl font-bold text-cyan-accent tnum">{item.delta}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="reviews">
          <SectionLabel>Что говорят клиенты</SectionLabel>
          <div className="grid gap-4 md:grid-cols-2">
            {REVIEWS.map((item) => (
              <figure key={item.person + item.company} className="rounded-2xl border border-ink-line bg-ink-soft p-6">
                {item.result && (
                  <p className="mb-4 inline-block rounded-lg bg-cyan-accent/12 px-3 py-1.5 text-sm font-semibold text-cyan-accent">
                    {item.result}
                  </p>
                )}
                <blockquote className="text-lg leading-snug text-white/85">«{item.quote}»</blockquote>
                <figcaption className="mt-5">
                  <p className="font-medium">{item.person}</p>
                  <p className="text-sm text-white/45">{item.company}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section id="geo">
          <SectionLabel>Работаем по всей России</SectionLabel>
          <h2 className="max-w-3xl text-h2 font-bold leading-tight">
            Карта успешных заведений, уже внедривших Гуляш
          </h2>
          <p className="mt-5 max-w-2xl text-white/60">
            150+ городов с автоматизированной доставкой. 900+ точек подключено к системе.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {PLACES.map((place) => (
              <li key={place} className="rounded-full border border-ink-line px-4 py-2 text-sm">
                {place}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-white/55">
            Goulash.Tech осуществляет настройку программ автоматизации для ресторанов online
          </p>
          <p className="mt-2 text-sm text-white/40">Главный офис: Екатеринбург, Куйбышева, 41</p>
        </Section>

        <Section id="price">
          <SectionLabel>Тарифы</SectionLabel>
          <h2 className="max-w-3xl text-h2 font-bold leading-tight">У нас есть 2 тарифных плана</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {TARIFFS.map((item) => (
              <article key={item.title} className="rounded-2xl border border-ink-line bg-ink-soft p-6">
                <p className="text-sm uppercase tracking-wider text-white/40">{item.title}</p>
                <p className="mt-3 text-3xl font-bold tnum">{item.value}</p>
                <p className="mt-2 text-white/60">{item.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="faq">
          <SectionLabel>Вопросы и ответы</SectionLabel>
          <h2 className="mb-8 max-w-3xl text-h2 font-bold leading-tight">
            Отвечаем на самые популярные вопросы
          </h2>
          <Faq />
        </Section>

        <Section id="lead">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <LogoStacked className="h-16 w-auto" />
              <h2 className="mt-6 text-h2 font-bold leading-tight">
                Узнать, как Goulash.tech поможет моему ресторану доставки
              </h2>
              <p className="mt-5 text-white/60">
                Наш специалист проконсультирует вас по запуску платформы с учетом особенностей вашего
                бизнеса.
              </p>
              <p className="mt-6 text-sm text-white/45">Тех. поддержка 24/7: +7 (391) 226-92-02</p>
              <p className="text-sm text-white/45">+7 495 868-36-08 · info@goulash.tech</p>
            </div>
            <LeadForm />
          </div>
        </Section>

        <footer className="border-t border-ink-line py-12">
          <div className="shell flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <LogoHorizontal className="h-8 w-auto" />
              <p className="mt-4 max-w-md text-sm text-white/45">
                Goulash.tech — компания, которая помогает ресторанам расти. Развивающая систему роста для
                ресторанов доставки. Основанная на многолетнем опыте управления собственной ресторанной
                сетью Goulash.tech помогает более чем 900 ресторанам увеличивать выручку, управляя всей
                цепочкой доставки — от первого клика до повторного заказа.
              </p>
            </div>
            <div className="text-sm text-white/45">
              <p>+7 495 868-36-08</p>
              <p>info@goulash.tech</p>
              <p className="mt-2">Главный офис: Екатеринбург, Куйбышева, 41</p>
              <p className="mt-2">info@cyber-nevod.ru</p>
            </div>
            <p className="max-w-sm text-xs text-white/30">
              SaaS-платформа Goulash Tech — сервис автоматизации ресторанной доставки. Общество с
              ограниченной ответственностью «Мне бы в космос» является обладателем исключительных прав на
              программу, право использования программы предоставляется на основании лицензионного договора,
              ИНН 6678119318, 620027, Свердловская область, г. Екатеринбург, ул. Челюскинцев, д. 60, кв. 60.
              ОКВЭД 62.01. Разработка компьютерного программного обеспечения. Коды видов деятельности в
              области информационных технологий: 1.01, 2.01.
            </p>
          </div>
        </footer>
      </main>
      <a
        href="#lead"
        className="fixed inset-x-4 bottom-4 z-40 rounded-full bg-cyan-accent py-3.5 text-center text-base font-semibold text-ink shadow-lg shadow-cyan-accent/20 sm:hidden"
      >
        Хочу Гуляш
      </a>
    </>
  );
}
