"use client";

import { useMemo, useState } from "react";
import {
  autoAssign,
  canTake,
  computeKpi,
  COURIER_TYPE_LABEL,
  COURIERS,
  DISPATCH_PENALTY_MIN,
  KITCHEN_SLOTS,
  manualAssign,
  MENU_ITEMS,
  ORDERS,
  PROMISE_MIN,
  slotOf,
  travelMin,
  type Assignment,
  type CourierType,
  type Order,
} from "@/lib/shift";

type Mode = "manual" | "goulash";
type Role = "admin" | "kitchen" | "courier";

const ROLES: { id: Role; label: string; hint: string }[] = [
  { id: "admin", label: "Администратор", hint: "доска заказов и ETA" },
  { id: "kitchen", label: "Кухня", hint: "слоты и стоп-лист" },
  { id: "courier", label: "Курьер", hint: "маршрут в приложении" },
];

const TYPES: CourierType[] = ["foot", "bike", "car"];

/** Как смену раскидал диспетчер: по порядку звонков, без учёта типа доставки. */
const MANUAL_PRESET: Record<string, string> = {
  "4181": "c3",
  "4182": "c1",
  "4183": "c5",
  "4184": "c2",
};

export function ShiftDemo() {
  const [mode, setMode] = useState<Mode>("manual");
  const [role, setRole] = useState<Role>("admin");
  const [types, setTypes] = useState<CourierType[]>(TYPES);
  const [picks, setPicks] = useState<Record<string, string | undefined>>(MANUAL_PRESET);
  const [stopList, setStopList] = useState<string[]>([]);
  const [activeCourier, setActiveCourier] = useState<string>("c1");

  const couriers = useMemo(
    () => COURIERS.filter((c) => types.includes(c.type)),
    [types],
  );

  const auto = useMemo(() => autoAssign(ORDERS, COURIERS, types), [types]);
  const manual = useMemo(() => manualAssign(ORDERS, couriers, picks), [couriers, picks]);
  const result = mode === "goulash" ? auto : manual;

  const kpi = computeKpi(ORDERS, result, couriers.length);
  const manualKpi = computeKpi(ORDERS, manual, couriers.length);
  const autoKpi = computeKpi(ORDERS, auto, couriers.length);

  const byOrder = useMemo(() => {
    const map = new Map<string, Assignment>();
    result.assignments.forEach((a) => map.set(a.orderId, a));
    return map;
  }, [result]);

  const projectedByOrder = useMemo(() => {
    const map = new Map<string, Assignment>();
    result.projected.forEach((a) => map.set(a.orderId, a));
    return map;
  }, [result]);

  const toggleType = (type: CourierType) => {
    setTypes((prev) => {
      const next = prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type];
      return next.length === 0 ? prev : next;
    });
    setPicks((prev) => {
      const allowed = COURIERS.filter((c) =>
        (types.includes(type) ? types.filter((t) => t !== type) : [...types, type]).includes(
          c.type,
        ),
      ).map((c) => c.id);
      const next: Record<string, string | undefined> = {};
      Object.entries(prev).forEach(([orderId, courierId]) => {
        if (courierId && allowed.includes(courierId)) next[orderId] = courierId;
      });
      return next;
    });
  };

  const toggleStop = (item: string) =>
    setStopList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );

  const reset = () => {
    setPicks(MANUAL_PRESET);
    setStopList([]);
    setTypes(TYPES);
  };

  const deltaAvg = manualKpi.avgDelivery - autoKpi.avgDelivery;

  return (
    <div className="overflow-hidden rounded-3xl border border-ink-line bg-ink-soft">
      <div className="flex flex-col gap-4 border-b border-ink-line p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm text-white/50">
            <span aria-hidden className="size-2 rounded-full bg-cyan-accent pulse-dot" />
            Смена 18:40 · час-пик · {ORDERS.length} заказов · {couriers.length} курьеров
          </p>
          <h3 className="mt-1 text-xl font-semibold sm:text-2xl">
            {mode === "goulash" ? "Смена на Гуляше" : "Смена как сейчас"}
          </h3>
        </div>

        <div
          role="group"
          aria-label="Режим смены"
          className="flex rounded-full border border-ink-line bg-ink p-1"
        >
          {(
            [
              { id: "manual", label: "Как сейчас" },
              { id: "goulash", label: "На Гуляше" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              aria-pressed={mode === item.id}
              className={`flex-1 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                mode === item.id
                  ? "bg-cyan-accent text-ink"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <dl className="grid grid-cols-2 divide-ink-line border-b border-ink-line sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
        <Kpi
          label="Среднее время доставки"
          value={`${kpi.avgDelivery} мин`}
          tone={kpi.avgDelivery > PROMISE_MIN ? "bad" : "good"}
          hint={
            mode === "goulash" && deltaAvg > 0
              ? `−${deltaAvg} мин к «как сейчас»`
              : `обещание гостю — ${PROMISE_MIN} мин`
          }
        />
        <Kpi
          label="Опоздания"
          value={`${kpi.latePercent}%`}
          tone={kpi.latePercent > 20 ? "bad" : "good"}
          hint="заказов позже обещанного"
        />
        <Kpi
          label={mode === "goulash" ? "Не разобрано" : "Ждут диспетчера"}
          value={`${kpi.unassigned}`}
          tone={kpi.unassigned > 0 ? "bad" : "good"}
          hint={
            mode === "goulash"
              ? "нет курьера нужного типа"
              : "он дойдёт до них по одному"
          }
        />
        <Kpi
          label="Заказов на курьера"
          value={`${kpi.perCourier}`}
          tone="neutral"
          hint="за этот час"
        />
        <Kpi
          label="Потери за час"
          value={`${kpi.lostRub.toLocaleString("ru-RU")} ₽`}
          tone={kpi.lostRub > 1500 ? "bad" : "good"}
          hint="отмены и компенсации"
        />
      </dl>

      <div className="flex flex-col gap-4 border-b border-ink-line p-4 sm:p-6">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Роль в смене">
          {ROLES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={role === item.id}
              onClick={() => setRole(item.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                role === item.id
                  ? "border-cyan-accent bg-cyan-accent/10 text-cyan-accent"
                  : "border-ink-line text-white/60 hover:border-white/30 hover:text-white"
              }`}
            >
              {item.label}
              <span className="ml-2 hidden text-white/40 sm:inline">{item.hint}</span>
            </button>
          ))}
        </div>

        {role !== "kitchen" && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm text-white/45">Курьеры на смене:</span>
            {TYPES.map((type) => {
              const on = types.includes(type);
              const count = COURIERS.filter((c) => c.type === type).length;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  aria-pressed={on}
                  className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                    on
                      ? "border-cyan-accent/60 bg-cyan-accent/10 text-cyan-accent"
                      : "border-ink-line text-white/40 line-through hover:text-white/70"
                  }`}
                >
                  {COURIER_TYPE_LABEL[type]} · {count}
                </button>
              );
            })}
            <button
              type="button"
              onClick={reset}
              className="ml-auto text-sm text-white/45 underline decoration-dotted underline-offset-4 hover:text-cyan-accent"
            >
              Сбросить смену
            </button>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6">
        {role === "admin" && (
          <AdminBoard
            mode={mode}
            couriers={couriers}
            byOrder={byOrder}
            projectedByOrder={projectedByOrder}
            picks={picks}
            onPick={(orderId, courierId) =>
              setPicks((prev) => ({ ...prev, [orderId]: courierId || undefined }))
            }
            stopList={stopList}
          />
        )}
        {role === "kitchen" && (
          <KitchenBoard
            mode={mode}
            stopList={stopList}
            onToggleStop={toggleStop}
            byOrder={byOrder}
            projectedByOrder={projectedByOrder}
          />
        )}
        {role === "courier" && (
          <CourierPhone
            mode={mode}
            couriers={couriers}
            activeCourier={activeCourier}
            onSelect={setActiveCourier}
            byOrder={byOrder}
          />
        )}
      </div>

      <p className="border-t border-ink-line px-4 py-3 text-xs text-white/35 sm:px-6">
        Данные смены демонстрационные. Логика распределения, ETA и KPI считаются на ваших
        переключениях в реальном времени.
      </p>
    </div>
  );
}

function Kpi({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  tone: "good" | "bad" | "neutral";
}) {
  const color =
    tone === "bad" ? "text-[#ff6b6b]" : tone === "good" ? "text-cyan-accent" : "text-white";
  return (
    <div className="border-b border-ink-line p-4 last:border-b-0 sm:p-5 lg:border-b-0">
      <dt className="text-xs uppercase tracking-wider text-white/40">{label}</dt>
      <dd className={`mt-2 text-2xl font-bold tnum sm:text-3xl ${color}`}>{value}</dd>
      <p className="mt-1 text-xs text-white/35">{hint}</p>
    </div>
  );
}

function statusChip(assignment: Assignment | undefined, projected?: Assignment) {
  if (!assignment) {
    if (projected)
      return (
        <span className="rounded-md bg-[#ff6b6b]/15 px-2 py-1 text-xs font-semibold text-[#ff6b6b] tnum">
          ждёт диспетчера · ≈{projected.totalMin} мин
        </span>
      );
    return (
      <span className="rounded-md bg-[#ff6b6b]/15 px-2 py-1 text-xs font-semibold text-[#ff6b6b]">
        нет курьера
      </span>
    );
  }
  if (assignment.late)
    return (
      <span className="rounded-md bg-[#ffb648]/15 px-2 py-1 text-xs font-semibold text-[#ffb648] tnum">
        {assignment.totalMin} мин · опоздание
      </span>
    );
  return (
    <span className="rounded-md bg-cyan-accent/15 px-2 py-1 text-xs font-semibold text-cyan-accent tnum">
      {assignment.totalMin} мин
    </span>
  );
}

function AdminBoard({
  mode,
  couriers,
  byOrder,
  projectedByOrder,
  picks,
  onPick,
  stopList,
}: {
  mode: Mode;
  couriers: typeof COURIERS;
  byOrder: Map<string, Assignment>;
  projectedByOrder: Map<string, Assignment>;
  picks: Record<string, string | undefined>;
  onPick: (orderId: string, courierId: string) => void;
  stopList: string[];
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-white/50">
        <p>
          {mode === "goulash"
            ? "Заказы распределены автоматически: срочный — ближайшему подходящему курьеру."
            : `Диспетчер назначает курьера руками: выберите его в списке. До остальных заказов он дойдёт по одному, каждый звонок отодвигает следующий на ${DISPATCH_PENALTY_MIN} минут.`}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-y-2 text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-white/35">
              <th className="px-3 font-medium">Заказ</th>
              <th className="px-3 font-medium">Адрес</th>
              <th className="px-3 font-medium">Канал</th>
              <th className="px-3 font-medium">Готов</th>
              <th className="px-3 font-medium">Курьер</th>
              <th className="px-3 font-medium">Доставка</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((order) => {
              const assignment = byOrder.get(order.id);
              const courier = assignment
                ? COURIERS.find((c) => c.id === assignment.courierId)
                : undefined;
              const mismatch = courier ? !canTake(courier, order) : false;
              const blocked = order.positions.some((p) => stopList.includes(p));
              return (
                <tr key={order.id} className="bg-ink/60 align-middle">
                  <td className="rounded-l-xl border-y border-l border-ink-line px-3 py-3">
                    <p className="font-semibold tnum">№{order.id}</p>
                    <p className="text-xs text-white/40 tnum">
                      {order.sum.toLocaleString("ru-RU")} ₽
                    </p>
                  </td>
                  <td className="border-y border-ink-line px-3 py-3">
                    <p>{order.address}</p>
                    <p className="text-xs text-white/40 tnum">
                      {order.district} · {order.distanceKm} км
                    </p>
                    {blocked && (
                      <p className="mt-1 text-xs text-[#ffb648]">
                        {mode === "goulash"
                          ? "позиция в стоп-листе — гость её не видит"
                          : "позиция в стоп-листе — заказ под отмену"}
                      </p>
                    )}
                  </td>
                  <td className="border-y border-ink-line px-3 py-3 text-white/60">
                    {order.channel}
                  </td>
                  <td className="border-y border-ink-line px-3 py-3 text-white/60 tnum">
                    через {order.readyInMin} мин
                  </td>
                  <td className="border-y border-ink-line px-3 py-3">
                    {mode === "goulash" ? (
                      courier ? (
                        <span>
                          {courier.name}
                          <span className="ml-2 text-xs text-white/40">
                            {COURIER_TYPE_LABEL[courier.type]} ·{" "}
                            {travelMin(order.distanceKm, courier.type)} мин в пути
                          </span>
                        </span>
                      ) : (
                        <span className="text-xs text-[#ff6b6b]">
                          нет курьера нужного типа на смене
                        </span>
                      )
                    ) : (
                      <label className="flex items-center gap-2">
                        <span className="sr-only">Курьер для заказа {order.id}</span>
                        <select
                          value={picks[order.id] ?? ""}
                          onChange={(event) => onPick(order.id, event.target.value)}
                          className="w-full max-w-[190px] rounded-lg border border-ink-line bg-ink px-2 py-1.5 text-sm text-white focus:border-cyan-accent focus:outline-none"
                        >
                          <option value="">— назначить —</option>
                          {couriers.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name} · {COURIER_TYPE_LABEL[c.type]}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                    {mismatch && (
                      <p className="mt-1 text-xs text-[#ffb648]">не по типу доставки</p>
                    )}
                  </td>
                  <td className="rounded-r-xl border-y border-r border-ink-line px-3 py-3">
                    {statusChip(assignment, projectedByOrder.get(order.id))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function KitchenBoard({
  mode,
  stopList,
  onToggleStop,
  byOrder,
  projectedByOrder,
}: {
  mode: Mode;
  stopList: string[];
  onToggleStop: (item: string) => void;
  byOrder: Map<string, Assignment>;
  projectedByOrder: Map<string, Assignment>;
}) {
  const slots = KITCHEN_SLOTS.map((slot) => ({
    slot,
    orders: ORDERS.filter((o) => slotOf(o) === slot),
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div>
        <p className="mb-3 text-sm text-white/50">
          Слоты по 15 минут: кухня видит, что готовить сейчас, а что через полчаса.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {slots.map(({ slot, orders }) => {
            const sum = orders.reduce((acc, o) => acc + o.sum, 0);
            return (
              <div key={slot} className="rounded-2xl border border-ink-line bg-ink p-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-lg font-semibold tnum">{slot}</p>
                  <p className="text-xs text-white/40 tnum">
                    {orders.length} зак · {sum.toLocaleString("ru-RU")} ₽
                  </p>
                </div>
                <ul className="mt-3 space-y-2">
                  {orders.map((order) => {
                    const blocked = order.positions.some((p) => stopList.includes(p));
                    const assignment = byOrder.get(order.id);
                    return (
                      <li
                        key={order.id}
                        className={`rounded-xl border px-3 py-2 text-sm ${
                          blocked
                            ? "border-[#ffb648]/50 bg-[#ffb648]/10"
                            : "border-ink-line bg-ink-soft"
                        }`}
                      >
                        <p className="flex items-start justify-between gap-2 font-medium tnum">
                          №{order.id}
                          <span className="shrink-0 text-right text-xs font-normal text-white/40">
                            {assignment
                              ? `курьер через ${assignment.etaMin} мин`
                              : projectedByOrder.has(order.id)
                                ? "курьер не назначен"
                                : "без курьера"}
                          </span>
                        </p>
                        <p className="mt-1 text-xs text-white/50">
                          {order.positions.join(" · ")}
                        </p>
                      </li>
                    );
                  })}
                  {orders.length === 0 && (
                    <li className="rounded-xl border border-dashed border-ink-line px-3 py-4 text-center text-xs text-white/30">
                      слот свободен
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <aside className="rounded-2xl border border-ink-line bg-ink p-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-white/45">
          Стоп-лист
        </h4>
        <p className="mt-2 text-sm text-white/50">
          Отметьте, что закончилось на кухне.
        </p>
        <ul className="mt-3 space-y-2">
          {MENU_ITEMS.map((item) => {
            const on = stopList.includes(item);
            return (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => onToggleStop(item)}
                  aria-pressed={on}
                  className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-sm transition-colors ${
                    on
                      ? "border-[#ffb648]/60 bg-[#ffb648]/10 text-[#ffb648]"
                      : "border-ink-line text-white/70 hover:border-white/30"
                  }`}
                >
                  {item}
                  <span className="text-xs">{on ? "в стоп-листе" : "в наличии"}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div
          className={`mt-4 rounded-xl border p-3 text-sm ${
            stopList.length === 0
              ? "border-ink-line text-white/35"
              : mode === "goulash"
                ? "border-cyan-accent/50 bg-cyan-accent/10 text-cyan-accent rise"
                : "border-[#ff6b6b]/50 bg-[#ff6b6b]/10 text-[#ff6b6b] rise"
          }`}
        >
          {stopList.length === 0 ? (
            "Уведомлений нет."
          ) : mode === "goulash" ? (
            <>
              Telegram руководителю: {stopList.length} поз. в стоп-листе. Позиции скрыты на
              сайте, в приложении и у оператора — гость их не закажет.
            </>
          ) : (
            <>
              Стоп-лист остался в чате смены. Сайт и оператор продолжают продавать{" "}
              {stopList.length} поз. — это отмены и комплименты за счёт заведения.
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

function CourierPhone({
  mode,
  couriers,
  activeCourier,
  onSelect,
  byOrder,
}: {
  mode: Mode;
  couriers: typeof COURIERS;
  activeCourier: string;
  onSelect: (id: string) => void;
  byOrder: Map<string, Assignment>;
}) {
  const selected = couriers.find((c) => c.id === activeCourier) ?? couriers[0];
  const route: { order: Order; assignment: Assignment }[] = [];
  byOrder.forEach((assignment, orderId) => {
    if (assignment.courierId !== selected?.id) return;
    const order = ORDERS.find((o) => o.id === orderId);
    if (order) route.push({ order, assignment });
  });
  route.sort((a, b) => a.assignment.etaMin - b.assignment.etaMin);

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <div>
        <p className="mb-3 text-sm text-white/50">Курьеры на смене</p>
        <ul className="space-y-2">
          {couriers.map((c) => {
            const load = [...byOrder.values()].filter((a) => a.courierId === c.id).length;
            const on = selected?.id === c.id;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => onSelect(c.id)}
                  aria-pressed={on}
                  className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left text-sm transition-colors ${
                    on
                      ? "border-cyan-accent bg-cyan-accent/10"
                      : "border-ink-line hover:border-white/30"
                  }`}
                >
                  <span>
                    <span className="font-medium">{c.name}</span>
                    <span className="block text-xs text-white/40">
                      {COURIER_TYPE_LABEL[c.type]} ·{" "}
                      {c.freeInMin === 0 ? "свободен" : `освободится через ${c.freeInMin} мин`}
                    </span>
                  </span>
                  <span
                    className={`rounded-md px-2 py-1 text-xs tnum ${
                      load > 0 ? "bg-cyan-accent/15 text-cyan-accent" : "bg-white/5 text-white/40"
                    }`}
                  >
                    {load} зак
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mx-auto w-full max-w-[360px] rounded-[28px] border border-ink-line bg-ink p-4">
        <div className="flex items-center justify-between text-xs text-white/40">
          <span>Приложение курьера</span>
          <span className="tnum">18:40</span>
        </div>
        <p className="mt-3 text-lg font-semibold">{selected?.name ?? "—"}</p>
        <p className="text-xs text-white/40">
          {selected ? COURIER_TYPE_LABEL[selected.type] : ""} · маршрут на смену
        </p>

        {mode === "manual" ? (
          <div className="mt-4 rounded-2xl border border-[#ff6b6b]/40 bg-[#ff6b6b]/10 p-4 text-sm text-[#ff6b6b]">
            В ручном режиме курьер узнаёт адрес по звонку диспетчера. Маршрут нигде не
            собирается — только голос в трубке.
            {route.length > 0 && (
              <p className="mt-2 text-white/60">
                Сейчас на нём {route.length} заказ(а), диспетчер держит это в голове.
              </p>
            )}
          </div>
        ) : (
          <div className="mt-4 space-y-2 rise">
            <div className="rounded-2xl border border-cyan-accent/50 bg-cyan-accent/10 p-3 text-sm text-cyan-accent">
              Push: заказ готов, адрес в маршруте
            </div>
            {route.length === 0 && (
              <p className="rounded-2xl border border-dashed border-ink-line p-4 text-center text-sm text-white/35">
                Заказов нет — курьер ждёт назначения.
              </p>
            )}
            {route.map(({ order, assignment }, index) => (
              <div
                key={order.id}
                className="rounded-2xl border border-ink-line bg-ink-soft p-3 text-sm"
              >
                <p className="flex items-center justify-between">
                  <span className="font-semibold">
                    {index + 1}. {order.address}
                  </span>
                  <span className="text-xs text-cyan-accent tnum">
                    {assignment.etaMin} мин
                  </span>
                </p>
                <p className="mt-1 text-xs text-white/45 tnum">
                  №{order.id} · {order.district} · {order.distanceKm} км ·{" "}
                  {order.sum.toLocaleString("ru-RU")} ₽
                </p>
                <p className="mt-1 text-xs text-white/35">{order.positions.join(" · ")}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
