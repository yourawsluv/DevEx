"use client";

import { useEffect, useRef, useState } from "react";
import { MorphCycle, MorphSwap } from "./motion-text";

type Role = "restaurant" | "courier" | "client";
type ClientView = "cart" | "product" | "checkout" | "paid";
type OrderStatus = "новый" | "готовится" | "готов" | "принят";
type StopStatus = "в маршруте" | "забран" | "доставлен";
type Kitchen = "Япония" | "Пицца" | "Доставка";

const ROLES: { id: Role; label: string }[] = [
  { id: "restaurant", label: "Ресторан" },
  { id: "courier", label: "Курьер" },
  { id: "client", label: "Клиент" },
];

const CAPTION: Record<Role, string> = {
  restaurant: "Кухня принимает заказ",
  courier: "Курьер везёт без звонка",
  client: "Гость видит путь заказа",
};

const SIDEBAR = [
  "Главная",
  "Заказы",
  "Режим форс-мажора",
  "Справочник",
  "База знаний",
  "Обсуждения",
  "Учет доходов",
  "Учет расходов",
  "Гости",
  "Чеклисты и КЛН",
  "Работа сотрудников",
];

const FILTERS: Kitchen[] = ["Япония", "Пицца", "Доставка"];

const KITCHEN_ORDERS: { id: string; wait: string; kind: Kitchen; status: OrderStatus }[] = [
  { id: "0002", wait: "10 мин", kind: "Япония", status: "готовится" },
  { id: "0009", wait: "10 мин", kind: "Пицца", status: "новый" },
  { id: "4253", wait: "8 мин", kind: "Доставка", status: "готовится" },
  { id: "4255", wait: "20 мин", kind: "Япония", status: "готов" },
  { id: "0004", wait: "6 мин", kind: "Пицца", status: "готовится" },
  { id: "0010", wait: "0 мин", kind: "Доставка", status: "готов" },
  { id: "0007", wait: "4 мин", kind: "Япония", status: "новый" },
  { id: "0008", wait: "12 мин", kind: "Пицца", status: "готовится" },
  { id: "0016", wait: "2 мин", kind: "Доставка", status: "новый" },
];

const STATUS_CYCLE = ["готовится", "сборка", "отдача"] as const;

const STOPS: {
  id: string;
  title: string;
  when: string;
  lines: string[];
  meta: string[];
}[] = [
  {
    id: "2926",
    title: "Амундсена, 68",
    when: "№2926 на 20:35",
    lines: ["Подъезд — 1"],
    meta: ["Пакетов: 1 · 1079 г", "Сдача: 0 ₽", "Нал"],
  },
  {
    id: "6946",
    title: "Волгоградская, 18",
    when: "на 15:25",
    lines: ["Подъезд — 1", "Этаж — 7", "Квартира — 34", "Позвонить консьержу"],
    meta: ["Сдача: 0 ₽"],
  },
];

const ADDONS = ["Соевый соус", "Васаби", "Палочки", "Имбирь"];

const FRAME =
  "overflow-hidden border-[8px] border-[color:color-mix(in_srgb,var(--paper)_38%,transparent)] bg-white text-[#1a1d1f]";

export function ProductScreens() {
  const track = useRef<HTMLDivElement>(null);
  const roleRef = useRef<Role>("restaurant");
  const [role, setRole] = useState<Role>("restaurant");
  const [section, setSection] = useState("Заказы");
  const [filter, setFilter] = useState<Kitchen>("Япония");
  const [statuses, setStatuses] = useState<Record<string, OrderStatus>>({});
  const [selectedOrder, setSelectedOrder] = useState("0002");
  const [stopState, setStopState] = useState<Record<string, StopStatus>>({});
  const [activeStop, setActiveStop] = useState("2926");
  const [clientView, setClientView] = useState<ClientView>("cart");
  const [mods, setMods] = useState<string[]>([]);
  const [addedRoll, setAddedRoll] = useState(false);
  const [addons, setAddons] = useState<string[]>([]);
  const [spendBonuses, setSpendBonuses] = useState(false);

  const cartTotal = 1492 + (addedRoll ? 269 : 0);
  const payTotal = cartTotal - 200;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const header = 56;
      const start = el.offsetTop - header;
      const range = Math.max(el.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / range));
      const index = Math.min(ROLES.length - 1, Math.floor(progress * ROLES.length));
      const next = ROLES[index].id;
      if (roleRef.current !== next) {
        roleRef.current = next;
        setRole(next);
      }
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = (next: Role) => {
    const el = track.current;
    if (!el) return;
    const header = 56;
    const start = el.offsetTop - header;
    const range = Math.max(el.offsetHeight - window.innerHeight, 1);
    const index = ROLES.findIndex((item) => item.id === next);
    roleRef.current = next;
    setRole(next);
    window.scrollTo({ top: start + ((index + 0.5) / ROLES.length) * range, behavior: "smooth" });
  };

  return (
    <div ref={track} className="relative h-[300svh]">
      <div className="sticky top-14 z-20 flex h-[calc(100svh-3.5rem)] flex-col">
        <p className="shrink-0 px-4 pt-4 text-center text-sm text-paper/55 sm:pt-6">
          <MorphSwap text={CAPTION[role]} />
        </p>

        <div className="flex min-h-0 flex-1 items-center justify-center px-4 py-3">
          <div key={role} className={`screen-swap @container ${frameClass(role)} ${FRAME}`}>
            {role === "restaurant" && (
              <RestaurantScreen
                section={section}
                onSection={setSection}
                filter={filter}
                onFilter={setFilter}
                statuses={statuses}
                selectedOrder={selectedOrder}
                onSelect={setSelectedOrder}
                onAccept={(id) => setStatuses((prev) => ({ ...prev, [id]: "принят" }))}
              />
            )}
            {role === "courier" && (
              <CourierScreen
                activeStop={activeStop}
                onSelect={setActiveStop}
                stopState={stopState}
                onAdvance={(id) =>
                  setStopState((prev) => ({
                    ...prev,
                    [id]: prev[id] === "забран" ? "доставлен" : "забран",
                  }))
                }
              />
            )}
            {role === "client" && (
              <ClientScreen
                view={clientView}
                onView={setClientView}
                mods={mods}
                onToggleMod={(name) =>
                  setMods((prev) =>
                    prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name],
                  )
                }
                addedRoll={addedRoll}
                onAddRoll={() => {
                  setAddedRoll(true);
                  setClientView("cart");
                }}
                addons={addons}
                onToggleAddon={(name) =>
                  setAddons((prev) =>
                    prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name],
                  )
                }
                cartTotal={cartTotal}
                payTotal={payTotal}
                spendBonuses={spendBonuses}
                onToggleBonuses={() => setSpendBonuses((value) => !value)}
              />
            )}
          </div>
        </div>

        <div className="shrink-0 flex justify-center px-4 pb-[4.75rem] sm:pb-5">
          <div role="tablist" aria-label="Экран продукта" className="flex rounded-full border border-ink-line bg-ink/85 p-1 backdrop-blur">
            {ROLES.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={role === item.id}
                onClick={() => goTo(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5 ${
                  role === item.id ? "bg-cyan-fill text-black" : "text-paper/60 hover:text-paper"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function frameClass(role: Role) {
  if (role === "restaurant") {
    return "aspect-[16/10] h-[min(100%,calc(100svh-13.5rem))] w-auto max-w-full";
  }
  return "aspect-[9/19.5] h-[min(100%,calc(100svh-13.5rem))] w-auto max-w-full";
}

function LiveDot() {
  return (
    <span className="relative inline-flex size-2.5 shrink-0" aria-hidden>
      <span className="live-ping absolute inset-0 rounded-full bg-[#00b7b7]" />
      <span className="relative size-2.5 rounded-full bg-[#00d6d6]" />
    </span>
  );
}

function RestaurantScreen({
  section,
  onSection,
  filter,
  onFilter,
  statuses,
  selectedOrder,
  onSelect,
  onAccept,
}: {
  section: string;
  onSection: (value: string) => void;
  filter: Kitchen;
  onFilter: (value: Kitchen) => void;
  statuses: Record<string, OrderStatus>;
  selectedOrder: string;
  onSelect: (id: string) => void;
  onAccept: (id: string) => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#f4f6f8]">
      <div className="flex items-center justify-between border-b border-black/10 bg-white px-3 py-2 text-[11px] text-black/45">
        <span>goulash.tech</span>
        <span className="tnum">11:17</span>
      </div>
      <div className="grid min-h-0 flex-1 @min-[680px]:grid-cols-[168px_1fr]">
        <aside className="hidden overflow-auto border-r border-black/10 bg-white p-2 @min-[680px]:block">
          <ul className="space-y-0.5">
            {SIDEBAR.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => onSection(item)}
                  aria-pressed={section === item}
                  className={`w-full rounded-full px-2.5 py-1.5 text-left text-xs ${
                    section === item ? "bg-[#111] font-medium text-white" : "text-black/65 hover:bg-black/5"
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="flex min-h-0 min-w-0 flex-col">
          <div className="flex gap-1.5 overflow-x-auto border-b border-black/5 px-2 py-2 @min-[680px]:hidden">
            {SIDEBAR.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onSection(item)}
                aria-pressed={section === item}
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] ${
                  section === item ? "bg-[#111] text-white" : "bg-white text-black/60"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="min-h-0 flex-1 overflow-auto p-3">
            <p className="text-sm font-medium">
              <MorphSwap text={section} />
            </p>
            <div key={section} className="screen-swap mt-3">
              <RestaurantPanel
                section={section}
                filter={filter}
                onFilter={onFilter}
                statuses={statuses}
                selectedOrder={selectedOrder}
                onSelect={onSelect}
                onAccept={onAccept}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RestaurantPanel(props: {
  section: string;
  filter: Kitchen;
  onFilter: (value: Kitchen) => void;
  statuses: Record<string, OrderStatus>;
  selectedOrder: string;
  onSelect: (id: string) => void;
  onAccept: (id: string) => void;
}) {
  switch (props.section) {
    case "Главная":
      return <HomePanel />;
    case "Заказы":
      return <OrdersPanel {...props} />;
    case "Режим форс-мажора":
      return <ForcePanel />;
    case "Справочник":
      return <ListPanel rows={["Роллы · 48", "Пицца · 22", "Напитки · 16", "Сеты · 11"]} />;
    case "База знаний":
      return (
        <ListPanel
          rows={["Как закрыть смену", "Стоп-лист на пике", "Возврат гостю", "Маршруты курьеров"]}
        />
      );
    case "Обсуждения":
      return <ChatPanel />;
    case "Учет доходов":
      return <MoneyPanel kind="in" />;
    case "Учет расходов":
      return <MoneyPanel kind="out" />;
    case "Гости":
      return <ListPanel rows={["Анна · 12 заказов", "Илья · 7 заказов", "Мария · 4 заказа", "Олег · новый"]} />;
    case "Чеклисты и КЛН":
      return <CheckPanel />;
    case "Работа сотрудников":
      return <StaffPanel />;
    default:
      return <OrdersPanel {...props} />;
  }
}

function HomePanel() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <Stat label="Выручка смены" value="186 400 ₽" />
        <Stat label="Заказов" value="46" />
        <Stat label="Кухня, факт" value="14 мин" />
        <Stat label="Опоздания" value="2" />
      </div>
      <LiveOrder />
    </div>
  );
}

function OrdersPanel({
  filter,
  onFilter,
  statuses,
  selectedOrder,
  onSelect,
  onAccept,
}: {
  filter: Kitchen;
  onFilter: (value: Kitchen) => void;
  statuses: Record<string, OrderStatus>;
  selectedOrder: string;
  onSelect: (id: string) => void;
  onAccept: (id: string) => void;
}) {
  const visible = KITCHEN_ORDERS.filter((order) => order.kind === filter);
  const accepted = Object.values(statuses).filter((status) => status === "принят").length;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => onAccept(selectedOrder)}
          className="rounded-full bg-[#111] px-3 py-1.5 text-xs font-medium text-white"
        >
          Принять
        </button>
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onFilter(item)}
            aria-pressed={filter === item}
            className={`rounded-full px-2.5 py-1 text-xs ${
              filter === item ? "bg-[#00ffff] font-medium text-black" : "bg-white text-black/60"
            }`}
          >
            {item}
          </button>
        ))}
        <span className="ml-auto text-[11px] text-black/45 tnum">Принято {accepted}</span>
      </div>
      <LiveOrder />
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {visible.map((order) => {
          const status = statuses[order.id] ?? order.status;
          const selected = selectedOrder === order.id;
          const cooking = status === "готовится";
          return (
            <button
              key={order.id}
              type="button"
              onClick={() => onSelect(order.id)}
              aria-pressed={selected}
              className={`rounded-xl border bg-white p-2 text-left ${
                selected ? "border-[#00c2c2] ring-2 ring-[#00ffff]/50" : "border-black/10"
              }`}
            >
              <p className="text-sm font-medium tnum">№{order.id}</p>
              <p className="mt-0.5 text-[11px] text-black/45">{order.wait}</p>
              <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-[#0a7a72]">
                {cooking && <LiveDot />}
                {status}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LiveOrder() {
  return (
    <div className="mt-2 flex items-center gap-2 rounded-full bg-[#111] px-3 py-1.5 text-white">
      <LiveDot />
      <span className="text-[11px] tnum">№0002</span>
      <MorphCycle lines={STATUS_CYCLE} interval={1700} className="text-[11px] text-[#c8fffb]" />
    </div>
  );
}

function ForcePanel() {
  const [paused, setPaused] = useState(false);
  const [extra, setExtra] = useState(false);
  return (
    <div className="space-y-2">
      <p className="rounded-xl bg-[#fff4e5] px-3 py-2 text-xs text-[#8a4b00]">
        {paused ? "Доставка на паузе. Новые слоты закрыты." : "Кухня на пике. Можно придержать слоты."}
      </p>
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        className={`w-full rounded-full px-3 py-2 text-xs font-medium ${
          paused ? "bg-[#111] text-white" : "bg-white text-black"
        }`}
      >
        {paused ? "Снять паузу" : "Пауза доставки"}
      </button>
      <button
        type="button"
        onClick={() => setExtra((value) => !value)}
        className={`w-full rounded-full px-3 py-2 text-xs font-medium ${
          extra ? "bg-[#00ffff] text-black" : "bg-white text-black"
        }`}
      >
        {extra ? "ETA +15 мин включено" : "+15 минут к ETA"}
      </button>
    </div>
  );
}

function ListPanel({ rows }: { rows: string[] }) {
  return (
    <ul className="divide-y divide-black/10 overflow-hidden rounded-xl bg-white">
      {rows.map((row) => (
        <li key={row} className="px-3 py-2.5 text-sm">
          {row}
        </li>
      ))}
    </ul>
  );
}

function ChatPanel() {
  return (
    <div className="space-y-2">
      <p className="max-w-[80%] rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-xs">Кухня, сет №4253 ждёт соус</p>
      <p className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-[#111] px-3 py-2 text-xs text-white">
        Соус на отдаче, 2 минуты
      </p>
      <p className="max-w-[80%] rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-xs">Курьер у двери</p>
    </div>
  );
}

function MoneyPanel({ kind }: { kind: "in" | "out" }) {
  const rows =
    kind === "in"
      ? [
          ["Приложение", "+84 200 ₽"],
          ["Зал", "+41 600 ₽"],
          ["Агрегаторы", "+22 900 ₽"],
        ]
      : [
          ["Списания", "−6 400 ₽"],
          ["Доставка", "−11 200 ₽"],
          ["Скидки", "−2 891 ₽"],
        ];
  return (
    <ul className="space-y-1.5">
      {rows.map(([label, value]) => (
        <li key={label} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm">
          <span>{label}</span>
          <span className={`tnum ${kind === "in" ? "text-[#0a7a72]" : "text-[#9a3b3b]"}`}>{value}</span>
        </li>
      ))}
    </ul>
  );
}

function CheckPanel() {
  const items = ["Холодильник", "Линия роллов", "Упаковка", "Касса"];
  const [done, setDone] = useState<string[]>(["Холодильник"]);
  return (
    <ul className="space-y-1.5">
      {items.map((item) => {
        const on = done.includes(item);
        return (
          <li key={item}>
            <button
              type="button"
              onClick={() =>
                setDone((prev) => (prev.includes(item) ? prev.filter((name) => name !== item) : [...prev, item]))
              }
              className="flex w-full items-center gap-2 rounded-xl bg-white px-3 py-2 text-left text-sm"
            >
              <span className={`size-3.5 rounded-full border ${on ? "border-[#00b7b7] bg-[#00ffff]" : "border-black/20"}`} />
              <span className={on ? "text-black/40 line-through" : ""}>{item}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function StaffPanel() {
  const people = [
    ["Повара", "7 / 7"],
    ["Курьеры", "6 / 7"],
    ["Касса", "2 / 2"],
  ];
  return (
    <ul className="space-y-1.5">
      {people.map(([role, fact]) => (
        <li key={role} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm">
          <span className="flex items-center gap-2">
            <LiveDot />
            {role}
          </span>
          <span className="text-black/50 tnum">{fact}</span>
        </li>
      ))}
    </ul>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white px-2.5 py-2">
      <p className="text-[10px] text-black/45">{label}</p>
      <p className="mt-0.5 text-sm font-medium tnum">{value}</p>
    </div>
  );
}

function CourierScreen({
  activeStop,
  onSelect,
  stopState,
  onAdvance,
}: {
  activeStop: string;
  onSelect: (id: string) => void;
  stopState: Record<string, StopStatus>;
  onAdvance: (id: string) => void;
}) {
  const stop = STOPS.find((item) => item.id === activeStop) ?? STOPS[0];
  const status = stopState[stop.id] ?? "в маршруте";

  return (
    <div className="h-full overflow-auto bg-white p-3">
      <div className="flex items-center justify-between">
        <h4 className="text-base font-medium">Маршрут</h4>
        <span className="text-xs text-black/40 tnum">15:26</span>
      </div>
      <ul className="mt-3 space-y-1.5">
        {STOPS.map((item, index) => {
          const itemStatus = stopState[item.id] ?? "в маршруте";
          const on = item.id === stop.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                aria-pressed={on}
                className={`w-full rounded-2xl border px-3 py-2.5 text-left ${
                  on ? "border-[#00c2c2] bg-[#f3fffe]" : "border-black/10"
                }`}
              >
                <p className="flex items-center justify-between gap-2 text-sm font-medium">
                  <span>
                    {index + 1}. {item.title}
                  </span>
                  <span className="text-[10px] font-normal text-black/45">{itemStatus}</span>
                </p>
                <p className="mt-0.5 text-xs text-black/50">{item.when}</p>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-3 rounded-2xl bg-[#f4f6f8] p-3">
        <p className="text-[11px] text-black/40">Точка маршрута</p>
        <p className="mt-1 text-base font-medium">{stop.title}</p>
        <p className="text-xs text-black/50">{stop.when}</p>
        <ul className="mt-2 space-y-0.5 text-xs">
          {stop.lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <ul className="mt-2 space-y-0.5 text-xs text-black/50">
          {stop.meta.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => onAdvance(stop.id)}
          disabled={status === "доставлен"}
          className="mt-3 w-full rounded-full bg-[#111] py-2.5 text-sm font-medium text-white disabled:opacity-40"
        >
          {status === "в маршруте" ? "Забрал" : status === "забран" ? "Доставил" : "Доставлен"}
        </button>
      </div>
    </div>
  );
}

function ClientScreen(props: {
  view: ClientView;
  onView: (view: ClientView) => void;
  mods: string[];
  onToggleMod: (name: string) => void;
  addedRoll: boolean;
  onAddRoll: () => void;
  addons: string[];
  onToggleAddon: (name: string) => void;
  cartTotal: number;
  payTotal: number;
  spendBonuses: boolean;
  onToggleBonuses: () => void;
}) {
  return (
    <div key={props.view} className="screen-swap h-full overflow-auto bg-white">
      {props.view === "cart" && <CartView {...props} />}
      {props.view === "product" && <ProductView {...props} />}
      {props.view === "checkout" && <CheckoutView {...props} />}
      {props.view === "paid" && (
        <div className="p-4">
          <p className="text-xs text-black/45">Детали заказа</p>
          <h4 className="mt-2 text-xl font-medium">Заказ оплачен</h4>
          <p className="mt-1 text-xs text-black/55">Интернационала, 8 · 11:10</p>
          <p className="mt-3 text-base font-medium tnum">{props.payTotal.toLocaleString("ru-RU")} ₽</p>
          <button
            type="button"
            onClick={() => props.onView("cart")}
            className="mt-4 text-xs text-black/50 underline decoration-dotted underline-offset-4"
          >
            В корзину
          </button>
        </div>
      )}
    </div>
  );
}

function CartView({
  onView,
  addedRoll,
  addons,
  onToggleAddon,
  cartTotal,
}: {
  onView: (view: ClientView) => void;
  addedRoll: boolean;
  addons: string[];
  onToggleAddon: (name: string) => void;
  cartTotal: number;
}) {
  return (
    <div className="p-3">
      <h4 className="text-base font-medium">Корзина</h4>
      <button type="button" onClick={() => onView("product")} className="mt-2 w-full text-left">
        <Row title="Хай Барби" meta="399 ₽" />
      </button>
      <Row title="Корн-дог" meta="295 ₽" />
      {addedRoll && <Row title="Эби Спайси" meta="269 ₽" />}
      <p className="mt-3 text-[11px] text-black/45">Добавить</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {ADDONS.map((item) => {
          const on = addons.includes(item);
          return (
            <button
              key={item}
              type="button"
              onClick={() => onToggleAddon(item)}
              aria-pressed={on}
              className={`rounded-full border px-2.5 py-1 text-[11px] ${
                on ? "border-[#00c2c2] bg-[#e7fffd]" : "border-black/10"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
      <button type="button" onClick={() => onView("product")} className="mt-3 text-xs font-medium text-[#0a7a72]">
        Эби Спайси · 269 ₽
      </button>
      <button
        type="button"
        onClick={() => onView("checkout")}
        className="mt-3 w-full rounded-full bg-[#111] py-2.5 text-sm font-medium text-white tnum"
      >
        Оплатить {cartTotal.toLocaleString("ru-RU")} ₽
      </button>
    </div>
  );
}

function ProductView({
  onView,
  mods,
  onToggleMod,
  onAddRoll,
}: {
  onView: (view: ClientView) => void;
  mods: string[];
  onToggleMod: (name: string) => void;
  onAddRoll: () => void;
}) {
  return (
    <div className="p-3">
      <button type="button" onClick={() => onView("cart")} className="text-xs text-black/45">
        ← Корзина
      </button>
      <h4 className="mt-2 text-lg font-medium">Эби Спайси</h4>
      <p className="mt-1 text-xs leading-relaxed text-black/60">Креветка, сыр, шиитаке, огурец, острый соус</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["Без острого", "Без грибов"].map((item) => {
          const on = mods.includes(item);
          return (
            <button
              key={item}
              type="button"
              onClick={() => onToggleMod(item)}
              aria-pressed={on}
              className={`rounded-full border px-2.5 py-1 text-[11px] ${
                on ? "border-[#00c2c2] bg-[#e7fffd]" : "border-black/10"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={onAddRoll}
        className="mt-4 w-full rounded-full bg-[#111] py-2.5 text-sm font-medium text-white tnum"
      >
        В корзину · 269 ₽
      </button>
    </div>
  );
}

function CheckoutView({
  onView,
  payTotal,
  spendBonuses,
  onToggleBonuses,
}: {
  onView: (view: ClientView) => void;
  payTotal: number;
  spendBonuses: boolean;
  onToggleBonuses: () => void;
}) {
  return (
    <div className="p-3">
      <button type="button" onClick={() => onView("cart")} className="text-xs text-black/45">
        ← Корзина
      </button>
      <h4 className="mt-2 text-base font-medium">Оплата</h4>
      <p className="mt-2 text-xs">Интернационала, 8</p>
      <p className="text-xs text-black/50">Пт 18 августа 11:10</p>
      <button
        type="button"
        onClick={onToggleBonuses}
        aria-pressed={spendBonuses}
        className={`mt-3 w-full rounded-2xl border px-3 py-2 text-left text-xs ${
          spendBonuses ? "border-[#00c2c2] bg-[#e7fffd]" : "border-black/10"
        }`}
      >
        {spendBonuses ? "Бонусы списываются" : "Не списывать бонусы"}
      </button>
      <p className="mt-3 text-xs">Скидка 200 ₽</p>
      <p className="mt-1 text-sm font-medium tnum">Итого {payTotal.toLocaleString("ru-RU")} ₽</p>
      <button
        type="button"
        onClick={() => onView("paid")}
        className="mt-3 w-full rounded-full bg-[#111] py-2.5 text-sm font-medium text-white tnum"
      >
        Оплатить
      </button>
    </div>
  );
}

function Row({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex items-center justify-between border-b border-black/5 py-2 text-xs">
      <span className="font-medium">{title}</span>
      <span className="text-black/50 tnum">{meta}</span>
    </div>
  );
}
