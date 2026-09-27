"use client";

import { useState } from "react";

type Role = "restaurant" | "courier" | "client";
type ClientView = "cart" | "product" | "checkout" | "paid";
type OrderStatus = "новый" | "принят";
type StopStatus = "в маршруте" | "забран" | "доставлен";

const ROLES: { id: Role; label: string }[] = [
  { id: "restaurant", label: "Ресторан" },
  { id: "courier", label: "Курьер" },
  { id: "client", label: "Клиент" },
];

const SIDEBAR = [
  "Главная",
  "Режим форс-мажора",
  "Справочник",
  "База знаний",
  "Заказы",
  "Обсуждения",
  "Учет доходов",
  "Учет расходов",
  "Гости",
  "Чеклисты и КЛН",
  "Работа сотрудников",
];

const KITCHEN_ORDERS: { id: string; wait: string }[] = [
  { id: "0002", wait: "10 мин" },
  { id: "0009", wait: "10 мин" },
  { id: "4253", wait: "10 мин" },
  { id: "4255", wait: "20 мин" },
  { id: "0004", wait: "6 мин" },
  { id: "0010", wait: "0 мин" },
  { id: "0007", wait: "" },
  { id: "0008", wait: "" },
  { id: "0016", wait: "" },
];

const FILTERS = ["Япония", "Пицца", "Доставка"];

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
    lines: ["Подъезд — 1", "Этаж — 7", "Квартира — 34", "Позвонить консьержу, назвать квартиру"],
    meta: ["Сдача: 0 ₽"],
  },
];

const ADDONS = ["Соевый соус", "Васаби", "Палочки", "Имбирь"];

export function ProductScreens() {
  const [role, setRole] = useState<Role>("restaurant");
  const [section, setSection] = useState("Заказы");
  const [filter, setFilter] = useState("Япония");
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

  return (
    <div className="overflow-hidden border border-ink-line bg-ink-soft">
      <div className="flex flex-col gap-5 border-b border-ink-line p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="eyebrow text-white/35">goulash.tech</p>
          <h3 className="mt-3 text-h3">От первого заказа до доставки к гостю</h3>
        </div>
        <div role="tablist" aria-label="Экран продукта" className="flex border border-ink-line bg-ink p-1">
          {ROLES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={role === item.id}
              onClick={() => setRole(item.id)}
              className={`flex-1 whitespace-nowrap px-5 py-2 text-sm font-medium transition-colors ${
                role === item.id ? "bg-cyan-accent text-ink" : "text-white/60 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div key={role} className="screen-swap p-3 sm:p-5">
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
  filter: string;
  onFilter: (value: string) => void;
  statuses: Record<string, OrderStatus>;
  selectedOrder: string;
  onSelect: (id: string) => void;
  onAccept: (id: string) => void;
}) {
  const accepted = Object.values(statuses).filter((status) => status === "принят").length;

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-[#f4f6f8] text-[#1a1d1f]">
      <div className="flex items-center justify-between border-b border-black/10 bg-white px-4 py-2 text-xs text-black/45">
        <span>goulash.tech/receipts</span>
        <span className="tnum">11:17</span>
      </div>
      <div className="grid lg:grid-cols-[210px_1fr]">
        <aside className="hidden border-r border-black/10 bg-white p-3 lg:block">
          <ul className="space-y-1">
            {SIDEBAR.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => onSection(item)}
                  aria-pressed={section === item}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                    section === item ? "bg-[#e7fffd] font-semibold text-black" : "text-black/70 hover:bg-black/5"
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="min-w-0 p-3 sm:p-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onAccept(selectedOrder)}
              className="rounded-lg bg-[#111] px-3 py-2 text-sm font-semibold text-white"
            >
              Принять заказ
            </button>
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onFilter(item)}
                aria-pressed={filter === item}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  filter === item ? "bg-cyan-accent font-semibold text-black" : "bg-white text-black/70"
                }`}
              >
                {item}
              </button>
            ))}
            <span className="ml-auto text-sm font-semibold tnum">План: 2 000 000 ₽</span>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <Stat label="Всего заказов" value="2 909" />
            <Stat label="Скидки в 2 заказах" value="2 891 ₽" />
            <Stat label="Принято сейчас" value={String(accepted)} />
          </div>

          <p className="mt-4 text-sm text-black/50">
            {section === "Работа сотрудников"
              ? "Курьеры текущей смены: по графику 7 / по факту 7. Повара текущей смены: по графику 7 / по факту 7."
              : section === "Заказы" || section === "Главная"
                ? `Текущая смена · ${filter}. Среднее факт. время приготовления смены 14 мин.`
                : section}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {KITCHEN_ORDERS.map((order) => {
              const status = statuses[order.id] ?? "новый";
              const selected = selectedOrder === order.id;
              return (
                <button
                  key={order.id}
                  type="button"
                  onClick={() => onSelect(order.id)}
                  aria-pressed={selected}
                  className={`rounded-xl border bg-white p-3 text-left ${
                    selected ? "border-cyan-accent ring-2 ring-cyan-accent/40" : "border-black/10"
                  }`}
                >
                  <p className="font-semibold tnum">№{order.id}</p>
                  <p className="mt-1 text-xs text-black/45">{order.wait || "в очереди"}</p>
                  <p className={`mt-2 text-xs font-semibold ${status === "принят" ? "text-[#0a7a72]" : "text-black/40"}`}>
                    {status}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white px-3 py-3">
      <p className="text-xs text-black/45">{label}</p>
      <p className="mt-1 text-lg font-bold tnum">{value}</p>
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
    <div className="mx-auto grid max-w-4xl gap-4 lg:grid-cols-[1fr_280px]">
      <div className="rounded-2xl border border-black/10 bg-white p-4 text-[#1a1d1f]">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Маршрут</h4>
          <span className="text-sm text-black/40 tnum">15:26</span>
        </div>
        <ul className="mt-4 space-y-2">
          {STOPS.map((item, index) => {
            const itemStatus = stopState[item.id] ?? "в маршруте";
            const on = item.id === stop.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelect(item.id)}
                  aria-pressed={on}
                  className={`w-full rounded-xl border px-3 py-3 text-left ${
                    on ? "border-cyan-accent bg-[#f3fffe]" : "border-black/10"
                  }`}
                >
                  <p className="flex items-center justify-between gap-3">
                    <span className="font-semibold">
                      {index + 1}. {item.title}
                    </span>
                    <span className="text-xs text-black/45">{itemStatus}</span>
                  </p>
                  <p className="mt-1 text-sm text-black/55">{item.when}</p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="rounded-[28px] border border-black/10 bg-white p-4 text-[#1a1d1f]">
        <p className="text-xs text-black/40">Точка маршрута</p>
        <p className="mt-2 text-lg font-semibold">{stop.title}</p>
        <p className="text-sm text-black/50">{stop.when}</p>
        <ul className="mt-3 space-y-1 text-sm">
          {stop.lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <ul className="mt-3 space-y-1 text-sm text-black/55">
          {stop.meta.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => onAdvance(stop.id)}
          disabled={status === "доставлен"}
          className="mt-4 w-full rounded-xl bg-[#111] py-3 text-sm font-semibold text-white disabled:opacity-40"
        >
          {status === "в маршруте" ? "Забрал заказ" : status === "забран" ? "Доставил" : "Доставлен"}
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
    <div key={props.view} className="screen-swap mx-auto w-full max-w-[380px] overflow-hidden rounded-[28px] border border-black/10 bg-white text-[#1a1d1f]">
      {props.view === "cart" && <CartView {...props} />}
      {props.view === "product" && <ProductView {...props} />}
      {props.view === "checkout" && <CheckoutView {...props} />}
      {props.view === "paid" && (
        <div className="p-6">
          <p className="text-sm text-black/45">Детали заказа</p>
          <h4 className="mt-3 text-2xl font-semibold">Заказ оплачен</h4>
          <p className="mt-2 text-sm text-black/60">Интернационала, 8 · Пт 18 августа 11:10</p>
          <p className="mt-4 text-lg font-bold tnum">{props.payTotal.toLocaleString("ru-RU")} ₽</p>
          <button
            type="button"
            onClick={() => props.onView("cart")}
            className="mt-6 text-sm text-black/50 underline decoration-dotted underline-offset-4"
          >
            Вернуться в корзину
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
    <div className="p-4">
      <h4 className="text-lg font-semibold">Корзина</h4>
      <button type="button" onClick={() => onView("product")} className="mt-4 w-full text-left">
        <Row title="Хай Барби" meta="399 ₽ · 30+" />
      </button>
      <Row title="Корн-дог с дошиком" meta="295 ₽ · 16+" />
      {addedRoll && <Row title="Эби Спайси" meta="269 ₽" />}
      <p className="mt-4 text-sm text-black/45">Не забудьте добавить</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {ADDONS.map((item) => {
          const on = addons.includes(item);
          return (
            <button
              key={item}
              type="button"
              onClick={() => onToggleAddon(item)}
              aria-pressed={on}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                on ? "border-cyan-accent bg-[#e7fffd]" : "border-black/10"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => onView("product")}
        className="mt-4 text-sm font-semibold text-[#0a7a72]"
      >
        Эби Спайси · 269 ₽
      </button>
      <button
        type="button"
        onClick={() => onView("checkout")}
        className="mt-4 w-full rounded-xl bg-[#111] py-3 text-sm font-semibold text-white tnum"
      >
        К оплате {cartTotal.toLocaleString("ru-RU")} ₽
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
    <div className="p-4">
      <button type="button" onClick={() => onView("cart")} className="text-sm text-black/45">
        ← Корзина
      </button>
      <h4 className="mt-3 text-xl font-semibold">Эби Спайси</h4>
      <p className="mt-2 text-sm leading-relaxed text-black/60">
        Рис, нори, тигровые креветки, сливочный сыр, грибы шиитаке, огурец, соус острый, кунжут
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {["Без острого соуса", "Без грибов"].map((item) => {
          const on = mods.includes(item);
          return (
            <button
              key={item}
              type="button"
              onClick={() => onToggleMod(item)}
              aria-pressed={on}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                on ? "border-cyan-accent bg-[#e7fffd]" : "border-black/10"
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
        className="mt-5 w-full rounded-xl bg-[#111] py-3 text-sm font-semibold text-white tnum"
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
    <div className="p-4">
      <button type="button" onClick={() => onView("cart")} className="text-sm text-black/45">
        ← Детали заказа
      </button>
      <h4 className="mt-3 text-lg font-semibold">Детали заказа</h4>
      <p className="mt-3 text-sm">Интернационала, 8</p>
      <p className="text-sm text-black/55">Пт 18 августа 11:10</p>
      <p className="mt-4 text-sm text-black/45">Выберите способ оплаты</p>
      <button
        type="button"
        onClick={onToggleBonuses}
        aria-pressed={spendBonuses}
        className={`mt-2 w-full rounded-xl border px-3 py-3 text-left text-sm ${
          spendBonuses ? "border-cyan-accent bg-[#e7fffd]" : "border-black/10"
        }`}
      >
        <span className="font-semibold">Оплатить бонусами</span>
        <span className="mt-1 block text-black/55">{spendBonuses ? "Оплатить бонусами" : "Не списывать"}</span>
      </button>
      <p className="mt-4 text-sm">Будет начислено: 38 бонусов</p>
      <p className="text-sm">Ваша скидка: 200 ₽</p>
      <p className="mt-2 font-semibold tnum">Итого к оплате: {payTotal.toLocaleString("ru-RU")} ₽</p>
      <button
        type="button"
        onClick={() => onView("paid")}
        className="mt-4 w-full rounded-xl bg-[#111] py-3 text-sm font-semibold text-white tnum"
      >
        Оплатить {payTotal.toLocaleString("ru-RU")} ₽
      </button>
    </div>
  );
}

function Row({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex items-center justify-between border-b border-black/5 py-3 text-sm">
      <span className="font-medium">{title}</span>
      <span className="text-black/50 tnum">{meta}</span>
    </div>
  );
}
