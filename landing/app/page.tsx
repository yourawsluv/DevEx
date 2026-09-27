import {
  BrandLogo,
  Eyebrow,
  LogoHorizontal,
  LogoStacked,
  Section,
  SectionHead,
} from "@/components/brand";
import { Faq } from "@/components/faq";
import { LeadForm } from "@/components/lead-form";
import { ProductScreens } from "@/components/product-screens";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const CLIENT_LOGOS = [
  { src: "/clients/up-sushi.svg", alt: "UP SUSHI" },
  { src: "/clients/sushkof.svg", alt: "Сушкоф и пицца" },
  { src: "/clients/food-garden.svg", alt: "FOODGARDEN" },
  { src: "/clients/zhishi.svg", alt: "Жиши суши" },
  { src: "/clients/sushi-sell.svg", alt: "Сушиселл" },
  { src: "/clients/ninjapizza.svg", alt: "Ninja Pizza" },
  { src: "/clients/fed-king.svg", alt: "Сытый Король" },
  { src: "/clients/non-locals.svg", alt: "Неместные" },
  { src: "/clients/rolik.svg", alt: "Rolik" },
  { src: "/clients/yapdomik.svg", alt: "Японский домик" },
  { src: "/clients/magicburger.svg", alt: "Magic burger" },
  { src: "/clients/sushiman.svg", alt: "SUSHIMAN" },
];

const PARTNER_LOGOS = [
  { src: "/partners/cyber-nevod.svg", alt: "Cyber-Nevod" },
  { src: "/partners/mango-office.svg", alt: "Mango Office" },
  { src: "/partners/one-sync.svg", alt: "OneSync" },
  { src: "/partners/data-mentor.svg", alt: "Data Mentor" },
  { src: "/partners/pointer.svg", alt: "Пойнтер" },
  { src: "/partners/yandex-delivery.svg", alt: "Яндекс Доставка" },
];

const FACTS = [
  { value: "900+", unit: "точек подключено к системе" },
  { value: "1,3 млн+", unit: "заказов через систему в месяц" },
  { value: "150+", unit: "городов с автоматизированной доставкой" },
  { value: "21 день", unit: "срок перехода на платформу" },
  { value: "4,8", unit: "средняя оценка пользователей приложения" },
];

const GROWTH = [
  {
    kicker: "Больше заказов в своём канале",
    value: "+30%",
    unit: "заказов",
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
    unit: "срывов на кухне",
    items: [
      "Автораспределение заказов",
      "Полностью заменяем «ручные костыли»",
      "Без «комплиментарных подарков»",
    ],
  },
  {
    kicker: "Скорость доставки выше конкурента",
    value: "−12 мин",
    unit: "на заказ в час-пик",
    items: [
      "Маршрутизация с учётом местонахождения курьера и типа доставки (пеший/вело/авто)",
      "Подтверждение и распределение заказов без участия человека",
      "Умная логистика",
    ],
  },
  {
    kicker: "Точность доставки → повторный гость",
    value: "+13%",
    unit: "повторных заказов",
    items: [
      "Предсказуемость на +20% ETA → +45% удовлетворённости → +13% повторных заказов",
      "Точное прогнозирование рассчитывается автоматически, с учётом загрузки кухни и маршрута курьера одновременно",
    ],
  },
  {
    kicker: "Чёткая видимость на данных",
    value: "2%",
    unit: "потерь возвращаем",
    items: [
      "Показатели управления",
      "Контроль кухни, списаний, смен, маршрутов и операционных отклонений ликвидируют 2% утечек в расходах",
    ],
  },
];

const MARKET = [
  { value: "+21%", unit: "Средний рост выручки по рынку (РБК)", accent: false },
  { value: "+7.1%", unit: "Выше рынка с Goulash.tech", accent: true },
  { value: "+29%", unit: "Рост выручки клиентов год к году", accent: true },
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
  { title: "Время доставки", delta: "−40%", before: "до ~87 мин", after: "после ~51 мин" },
  { title: "Приготовление заказа", delta: "−47%", before: "до ~60 мин", after: "после ~32 мин" },
  {
    title: "Доля заказов через приложение",
    delta: "+41%",
    before: "до 27%",
    after: "после 68%",
  },
];

const REVIEWS = [
  {
    result: "−17%",
    resultUnit: "скрытых расходов",
    quote:
      "При выборе платформы смотрели не только на цену, но и на то, как она влияет на стратегию. Нам нужна была система, которая позволит расти, а не ставить нас в зависимость от подрядчиков",
    person: "Регина Васина",
    company: "Sayori",
    logo: "/clients/sayori.svg",
  },
  {
    result: "+40%",
    resultUnit: "заказов",
    quote:
      "Собственное приложение за год увеличило количество заказов через мобильное приложение на 40%",
    person: "Владимир Расторгуев",
    company: "СушиСелл",
    logo: "/clients/sushi-sell.svg",
  },
  {
    result: "x3",
    resultUnit: "выручка",
    quote:
      "Оборот компании за год вырос в 3 раза благодаря маршрутизации заказов. Мы сократили время доставки и увеличили производительность кухни.",
    person: "Валентина Мухачева",
    company: "FoodGarden",
    logo: "/clients/food-garden.svg",
  },
  {
    quote:
      "Автоматическое распределение курьеров убрало ручные звонки диспетчера и минимизировало человеческий фактор. Расходы на логистику снизились уже в первый месяц",
    person: "Дмитрий Инякин",
    company: "Неместные",
    logo: "/clients/non-locals.svg",
  },
  {
    quote:
      "Раньше коммуникация с гостями была на стороне подрядчиков — теперь мы выстроили её внутри компании и управляем ею сами",
    person: "Виктория Беляйкина",
    company: "Суши Шеф",
  },
  {
    result: "до 10 минут",
    resultUnit: "в каждом заказе",
    quote:
      "Убрали подтверждение заказов через телефон - экономия до 10 минут в каждом заказе,без расходов на смс.",
    person: "Ирина Кудрявцева",
    company: "Владелица компании",
  },
  {
    quote:
      "Я думаю, еще 10% не разобрал от всей программы. Я до сих пор нахожусь под впечатлением от такого огромного функционала и возможностей этой программы!",
    person: "Андрей",
    company: "Владелец",
  },
  {
    quote:
      "Легкий переход на систему. Наш опыт смены более 3 систем автоматизации позволил оценить легкий и комфортный переход на Goulash.tech. Благодаря интеграциям и возможности загрузить данные, которые были у нас, мы смогли быстро подключиться и сохранить наших клиентов.",
    person: "Александр Невский",
    company: "Управляющий директор",
  },
];

const PLACES = [
  { alt: "Сушиселл", src: "/clients/sushi-sell.svg" },
  { alt: "Sayori", src: "/clients/sayori.svg" },
  { alt: "ТиЧ Пицца", src: "/clients/tick-pizza.svg" },
  { alt: "FOODGARDEN", src: "/clients/food-garden.svg" },
  { alt: "Неместные", src: "/clients/non-locals.svg" },
  { alt: "Сушкоф и пицца", src: "/clients/sushkof.svg" },
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

const CELL = "border-t border-ink-line pt-8";
const COL_RULE = "lg:border-l lg:border-ink-line lg:pl-8";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        {/* ============================= ПЕРВЫЙ ЭКРАН ============================= */}
        <section className="relative overflow-hidden">
          <span aria-hidden className="gridlines mx-auto max-w-[92rem]" />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-48 left-1/4 h-[520px] w-[760px] rounded-full bg-cyan-accent/10 blur-[150px]"
          />
          <div className="shell relative pt-16 pb-14 sm:pt-24 lg:pt-28 lg:pb-20">
            <div className="grid12">
              <div className="col-span-12 lg:col-span-6">
                <LogoHorizontal className="h-8 w-auto sm:h-10" />
              </div>
              <p className="col-span-12 mt-10 max-w-[30ch] text-sm leading-snug text-white/45 sm:mt-14 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:text-right lg:text-base">
                Система автоматизации
                <br />
                для ресторанов доставки
              </p>
            </div>

            <div className="grid12 mt-14 sm:mt-20 lg:mt-28">
              <h1 className="col-span-12 text-display leading-[0.92] lg:col-span-10">
                +3 млн ₽ дополнительной выручки в год на точку
                <span aria-hidden className="align-top text-[0.4em] text-cyan-accent">
                  *
                </span>
              </h1>
            </div>

            <div className="grid12 mt-12 items-end gap-y-10 sm:mt-16">
              <p className="col-span-12 text-lede leading-snug text-white/60 sm:col-span-8 lg:col-span-5">
                Больше заказов, быстрее доставка, меньше потерь и выше возвращаемость гостей
              </p>
              <div className="col-span-12 flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:col-start-7">
                <a
                  href="#lead"
                  className="inline-flex items-center justify-center bg-cyan-accent px-7 py-4 text-base font-medium text-ink transition-colors hover:bg-cyan-300"
                >
                  Обсудить за 15 минут
                </a>
                <a
                  href="#product"
                  className="inline-flex items-center justify-center border border-ink-line px-7 py-4 text-base font-medium text-white transition-colors hover:border-cyan-accent hover:text-cyan-accent"
                >
                  Смотреть продукт
                </a>
              </div>
            </div>
          </div>

          {/* Логотипы клиентов — нижняя полоса первого экрана */}
          <div className="shell relative pb-16 lg:pb-20">
            <div className="rule grid grid-cols-2 gap-x-8 gap-y-10 pt-10 sm:grid-cols-4 lg:grid-cols-6">
              {CLIENT_LOGOS.map((logo) => (
                <BrandLogo
                  key={logo.src}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-6 w-auto max-w-[72%] object-contain object-left opacity-70 transition-opacity hover:opacity-100 sm:h-7"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============================= ГУЛЯШ В ЦИФРАХ ============================= */}
        <Section id="facts" gridlines>
          <Eyebrow>Гуляш в цифрах</Eyebrow>
          <dl className="grid12 mt-14 gap-y-12">
            {FACTS.map((fact) => (
              <div
                key={fact.value}
                className={`col-span-6 sm:col-span-4 lg:col-span-4 ${CELL} ${COL_RULE} lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:pl-0`}
              >
                <dt className="figure text-figure text-cyan-accent">{fact.value}</dt>
                <dd className="mt-4 max-w-[24ch] text-sm leading-snug text-white/45">
                  {fact.unit}
                </dd>
              </div>
            ))}
            <div aria-hidden className="hidden lg:col-span-4 lg:block" />
          </dl>
        </Section>

        {/* ============================= ИСТОЧНИКИ РОСТА ============================= */}
        <Section id="growth">
          <SectionHead
            eyebrow="Рост выручки"
            title={
              <>
                Источники
                <br />
                роста выручки
              </>
            }
            note={
              <>
                <p>
                  Каждая функция Goulash существует только по одной причине — приблизить
                  рестораны доставки к росту выручки.
                </p>
                <p className="text-white/40">Отраслевая экспертиза в основе решения.</p>
              </>
            }
          />

          <div className="grid12 mt-20 gap-y-16">
            {GROWTH.map((block) => (
              <article
                key={block.kicker}
                className={`col-span-12 sm:col-span-6 lg:col-span-4 ${CELL} ${COL_RULE} lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:pl-0`}
              >
                <p className="min-h-[2.75rem] max-w-[26ch] text-sm leading-snug text-white/40">
                  {block.kicker}
                </p>
                <p className="figure mt-6 text-figure text-cyan-accent">{block.value}</p>
                <p className="mt-3 text-white/70">{block.unit}</p>
                <ul className="mt-8 space-y-3 border-t border-ink-line pt-6">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/60">
                      <span aria-hidden className="mt-2 size-1 shrink-0 bg-cyan-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
            <div aria-hidden className="hidden lg:col-span-4 lg:block" />
          </div>

          <div className="grid12 mt-24 gap-y-10 border-t border-ink-line pt-12">
            <h3 className="col-span-12 text-h3 lg:col-span-4">
              Результат, который опережает рынок
            </h3>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <p className="max-w-[54ch] text-lede leading-snug text-white/60">
                Рост бизнеса — главный показатель эффективности. +29% рост выручки клиентов год
                к году. На 7,1% выше рыночного показателя.
              </p>
              <p className="mt-6 text-xs text-white/30">* — по данным РБК</p>
              <p className="mt-1 text-xs text-white/40">
                Станислав Никифоров, коммерческий директор Goulash.tech
              </p>
            </div>
          </div>

          <dl className="grid12 mt-16 gap-y-12">
            {MARKET.map((item) => (
              <div
                key={item.value}
                className={`col-span-12 sm:col-span-6 lg:col-span-4 ${CELL} ${COL_RULE} lg:first:border-l-0 lg:first:pl-0`}
              >
                <dt
                  className={`figure text-figure ${
                    item.accent ? "text-cyan-accent" : "text-white/70"
                  }`}
                >
                  {item.value}
                </dt>
                <dd className="mt-4 max-w-[22ch] text-sm leading-snug text-white/45">
                  {item.unit}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* ============================= КОМУ ПОДХОДИТ ============================= */}
        <Section id="fit" gridlines>
          <SectionHead
            title={
              <>
                Кому подходит
                <br />
                Goulash.tech
              </>
            }
          />
          <div className="grid12 mt-20 gap-y-16">
            {FIT.map((item) => (
              <article
                key={item.title}
                className={`col-span-12 sm:col-span-6 lg:col-span-4 ${CELL} ${COL_RULE} lg:first:border-l-0 lg:first:pl-0`}
              >
                <h3 className="text-h3">{item.title}</h3>
                <p className="mt-5 text-sm leading-relaxed text-white/55">{item.text}</p>
                <blockquote className="mt-10 border-t border-ink-line pt-6 text-lg leading-snug text-white/85">
                  «{item.quote}»
                </blockquote>
                <p className="mt-6 text-sm">{item.person}</p>
                <p className="text-sm text-white/40">{item.role}</p>
              </article>
            ))}
          </div>
          <p className="mt-24 max-w-[24ch] text-h2 leading-[1.1] sm:max-w-[30ch]">
            Goulash.tech идеально подходит под кухни с циклом приготовления до 30 минут
          </p>
        </Section>

        {/* ============================= ПРОДУКТ ============================= */}
        <Section id="product">
          <SectionHead
            eyebrow="Продукт"
            title={
              <>
                Единая система управления
                <br />
                операционными процессами
              </>
            }
            note={
              <p>
                От первого заказа до доставки к гостю и повторных заказов.
              </p>
            }
          />
          <div className="mt-20">
            <ProductScreens />
          </div>

          <div className="grid12 mt-24 gap-y-14">
            {PRODUCT_POINTS.map((point) => (
              <div
                key={point.title}
                className={`col-span-12 sm:col-span-6 lg:col-span-4 ${CELL} ${COL_RULE} lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:pl-0`}
              >
                <h3 className="max-w-[24ch] text-h3">{point.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/50">{point.text}</p>
              </div>
            ))}
          </div>

          <p className="eyebrow mt-24 text-white/35">До и после перехода на платформу</p>
          <dl className="grid12 mt-10 gap-y-12">
            {SHIFTS.map((item) => (
              <div
                key={item.title}
                className={`col-span-12 sm:col-span-6 lg:col-span-4 ${CELL} ${COL_RULE} lg:first:border-l-0 lg:first:pl-0`}
              >
                <dt className="figure text-figure text-cyan-accent">{item.delta}</dt>
                <dd className="mt-5">
                  <p className="min-h-[2.75rem] max-w-[20ch] text-sm leading-snug">
                    {item.title}
                  </p>
                  <p className="mt-4 text-sm text-white/30 tnum">{item.before}</p>
                  <p className="text-sm text-white/60 tnum">{item.after}</p>
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* ============================= ОТЗЫВЫ ============================= */}
        <Section id="reviews" gridlines>
          <SectionHead
            eyebrow="Кейсы и отзывы"
            title={
              <>
                Что говорят
                <br />
                клиенты
              </>
            }
          />
          <div className="grid12 mt-20 gap-y-16">
            {REVIEWS.map((item) => (
              <figure
                key={item.person + item.company}
                className={`col-span-12 flex flex-col sm:col-span-6 lg:col-span-4 ${CELL} ${COL_RULE} lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:pl-0`}
              >
                <div className="flex h-8 items-center">
                  {item.logo ? (
                    <BrandLogo
                      src={item.logo}
                      alt={item.company}
                      className="max-h-8 w-auto max-w-[170px] object-contain object-left opacity-80"
                    />
                  ) : (
                    <span className="eyebrow text-white/30">{item.company}</span>
                  )}
                </div>
                {item.result && (
                  <p className="figure mt-8 text-figure-sm text-cyan-accent">
                    {item.result}
                    <span className="ml-2 align-middle text-sm font-normal tracking-normal text-white/45">
                      {item.resultUnit}
                    </span>
                  </p>
                )}
                <blockquote className="mt-8 border-t border-ink-line pt-6 text-base leading-relaxed text-white/75">
                  «{item.quote}»
                </blockquote>
                <figcaption className="mt-auto pt-8 text-sm">
                  <p>{item.person}</p>
                  <p className="text-white/40">{item.company}</p>
                </figcaption>
              </figure>
            ))}
            <div aria-hidden className="hidden lg:col-span-4 lg:block" />
          </div>
        </Section>

        {/* ============================= ГЕОГРАФИЯ ============================= */}
        <Section id="geo">
          <SectionHead
            eyebrow="Работаем по всей России"
            title={
              <>
                Карта успешных заведений,
                <br />
                уже внедривших Гуляш
              </>
            }
            note={
              <p>
                150+ городов с автоматизированной доставкой, 900+ точек подключено к системе.
              </p>
            }
          />

          <figure className="mt-16 bg-paper px-4 py-8 sm:mt-20 sm:px-12 sm:py-16">
            <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/map-russia.svg"
                alt="Карта заведений, внедривших систему автоматизации Гуляш"
                width={1200}
                height={672}
                loading="lazy"
                decoding="async"
                className="mx-auto h-auto w-full min-w-[640px] sm:min-w-0"
              />
            </div>
            <figcaption className="mt-6 text-xs text-[#1c1f21]/45 sm:hidden">
              Карту можно прокрутить в сторону
            </figcaption>
          </figure>

          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-ink-line pt-10 sm:grid-cols-3 lg:mt-16 lg:grid-cols-6">
            {PLACES.map((place) => (
              <BrandLogo
                key={place.alt}
                src={place.src}
                alt={place.alt}
                className="h-6 w-auto max-w-[78%] object-contain object-left opacity-70 sm:h-7"
              />
            ))}
          </div>

          <div className="grid12 mt-20 border-t border-ink-line pt-10">
            <p className="col-span-12 text-lede leading-snug text-white/55 lg:col-span-6">
              Goulash.Tech осуществляет настройку программ автоматизации для ресторанов online
            </p>
            <p className="col-span-12 mt-6 text-sm text-white/40 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:text-right">
              Главный офис: Екатеринбург, Куйбышева, 41
            </p>
          </div>
        </Section>

        {/* ============================= ПАРТНЁРЫ ============================= */}
        <Section id="partners" gridlines tight>
          <Eyebrow>Партнеры</Eyebrow>
          <div className="grid12 mt-12 gap-y-12">
            {PARTNER_LOGOS.map((logo) => (
              <div
                key={logo.src}
                className="col-span-6 flex items-center sm:col-span-4 lg:col-span-2"
              >
                <BrandLogo
                  src={logo.src}
                  alt={logo.alt}
                  className="h-7 w-auto max-w-[80%] object-contain object-left opacity-75 transition-opacity hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </Section>

        {/* ============================= ТАРИФЫ ============================= */}
        <Section id="price">
          <SectionHead
            eyebrow="Тарифы"
            title={
              <>
                У нас есть
                <br />
                2 тарифных плана
              </>
            }
          />
          <dl className="grid12 mt-20 gap-y-14">
            {TARIFFS.map((item) => (
              <div
                key={item.title}
                className={`col-span-12 sm:col-span-6 lg:col-span-4 ${CELL} ${COL_RULE} lg:first:border-l-0 lg:first:pl-0`}
              >
                <dt className="eyebrow text-white/35">{item.title}</dt>
                <dd>
                  <p className="figure mt-8 text-figure">{item.value}</p>
                  <p className="mt-5 max-w-[30ch] text-sm leading-relaxed text-white/50">
                    {item.text}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* ============================= ВОПРОСЫ ============================= */}
        <Section id="faq" gridlines>
          <div className="grid12 gap-y-12">
            <div className="col-span-12 lg:col-span-4">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-7 text-h2 leading-[1.05]">
                Вопросы
                <br />
                и ответы
              </h2>
              <p className="mt-6 text-sm text-white/40">
                Отвечаем на самые популярные вопросы
              </p>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <Faq />
            </div>
          </div>
        </Section>

        {/* ============================= ЗАЯВКА ============================= */}
        <Section id="lead">
          <div className="grid12 gap-y-14">
            <div className="col-span-12 lg:col-span-4">
              <LogoStacked className="h-14 w-auto" />
              <h2 className="mt-10 text-h2 leading-[1.05]">
                Узнать, как Goulash.tech поможет моему ресторану доставки
              </h2>
              <p className="mt-7 max-w-[34ch] text-sm leading-relaxed text-white/50">
                Наш специалист проконсультирует вас по запуску платформы с учетом особенностей
                вашего бизнеса.
              </p>
              <div className="mt-10 space-y-2 border-t border-ink-line pt-6 text-sm text-white/45">
                <p className="tnum">Тех. поддержка 24/7: +7 (391) 226-92-02</p>
                <p className="tnum">+7 495 868-36-08</p>
                <p>info@goulash.tech</p>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <LeadForm />
            </div>
          </div>
        </Section>

        <SiteFooter />
      </main>

      <a
        href="#lead"
        className="fixed inset-x-4 bottom-4 z-40 bg-cyan-accent py-3.5 text-center text-base font-medium text-ink shadow-lg shadow-cyan-accent/20 sm:hidden"
      >
        Хочу Гуляш
      </a>
    </>
  );
}
