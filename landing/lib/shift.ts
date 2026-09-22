export type CourierType = "foot" | "bike" | "car";

export type Courier = {
  id: string;
  name: string;
  type: CourierType;
  /** Через сколько минут курьер освободится (0 — свободен сейчас). */
  freeInMin: number;
};

export type Order = {
  id: string;
  address: string;
  district: string;
  sum: number;
  positions: string[];
  /** Сколько минут назад гость оформил заказ. */
  placedMinAgo: number;
  /** Через сколько минут кухня отдаст заказ. */
  readyInMin: number;
  distanceKm: number;
  channel: "Приложение" | "Сайт" | "Колл-центр" | "Агрегатор";
};

export const COURIER_TYPE_LABEL: Record<CourierType, string> = {
  foot: "Пеший",
  bike: "Вело",
  car: "Авто",
};

const SPEED_KMH: Record<CourierType, number> = {
  foot: 5,
  bike: 15,
  car: 28,
};

/** Максимальная дистанция, на которую имеет смысл отправлять курьера этого типа. */
const MAX_DISTANCE_KM: Record<CourierType, number> = {
  foot: 1.6,
  bike: 4.5,
  car: 99,
};

/** Обещание гостю: доставка за 45 минут с момента заказа. */
export const PROMISE_MIN = 45;

/** Время, которое теряет диспетчер на ручной поиск курьера и звонок. */
export const DISPATCH_PENALTY_MIN = 7;

const HANDOFF_MIN = 2;

export const COURIERS: Courier[] = [
  { id: "c1", name: "Артём", type: "bike", freeInMin: 0 },
  { id: "c2", name: "Данил", type: "car", freeInMin: 6 },
  { id: "c3", name: "Егор", type: "foot", freeInMin: 0 },
  { id: "c4", name: "Марат", type: "car", freeInMin: 14 },
  { id: "c5", name: "Полина", type: "bike", freeInMin: 3 },
];

export const ORDERS: Order[] = [
  {
    id: "4181",
    address: "Мира, 42",
    district: "Центр",
    sum: 1840,
    positions: ["Филадельфия", "Том ям"],
    placedMinAgo: 12,
    readyInMin: 2,
    distanceKm: 1.1,
    channel: "Приложение",
  },
  {
    id: "4182",
    address: "Красной Армии, 7",
    district: "Центр",
    sum: 990,
    positions: ["Пепперони 30"],
    placedMinAgo: 11,
    readyInMin: 4,
    distanceKm: 0.9,
    channel: "Сайт",
  },
  {
    id: "4183",
    address: "Весны, 15",
    district: "Взлётка",
    sum: 3120,
    positions: ["Сет «Дракон»", "Ролл Калифорния", "Кола 1,5"],
    placedMinAgo: 10,
    readyInMin: 6,
    distanceKm: 5.4,
    channel: "Приложение",
  },
  {
    id: "4184",
    address: "Алексеева, 111",
    district: "Взлётка",
    sum: 1460,
    positions: ["Том ям", "Вок с курицей"],
    placedMinAgo: 9,
    readyInMin: 5,
    distanceKm: 6.2,
    channel: "Агрегатор",
  },
  {
    id: "4185",
    address: "Ленина, 113",
    district: "Центр",
    sum: 2210,
    positions: ["Сет «Дракон»", "Мисо-суп"],
    placedMinAgo: 8,
    readyInMin: 3,
    distanceKm: 1.4,
    channel: "Колл-центр",
  },
  {
    id: "4186",
    address: "Свободный, 61",
    district: "Студгородок",
    sum: 780,
    positions: ["Пепперони 30"],
    placedMinAgo: 7,
    readyInMin: 9,
    distanceKm: 3.6,
    channel: "Сайт",
  },
  {
    id: "4187",
    address: "Копылова, 19",
    district: "Студгородок",
    sum: 1980,
    positions: ["Ролл Калифорния", "Вок с курицей"],
    placedMinAgo: 6,
    readyInMin: 8,
    distanceKm: 3.1,
    channel: "Приложение",
  },
  {
    id: "4188",
    address: "9 Мая, 77",
    district: "Северный",
    sum: 4350,
    positions: ["Сет «Дракон»", "Филадельфия", "Пепперони 30", "Кола 1,5"],
    placedMinAgo: 5,
    readyInMin: 12,
    distanceKm: 8.1,
    channel: "Приложение",
  },
  {
    id: "4189",
    address: "Тотмина, 4",
    district: "Западный",
    sum: 1250,
    positions: ["Мисо-суп", "Ролл Калифорния"],
    placedMinAgo: 4,
    readyInMin: 10,
    distanceKm: 4.9,
    channel: "Агрегатор",
  },
  {
    id: "4190",
    address: "Карла Маркса, 48",
    district: "Центр",
    sum: 1620,
    positions: ["Том ям", "Филадельфия"],
    placedMinAgo: 3,
    readyInMin: 7,
    distanceKm: 1.2,
    channel: "Сайт",
  },
  {
    id: "4191",
    address: "Дубровинского, 62",
    district: "Центр",
    sum: 890,
    positions: ["Вок с курицей"],
    placedMinAgo: 2,
    readyInMin: 11,
    distanceKm: 2.3,
    channel: "Колл-центр",
  },
  {
    id: "4192",
    address: "Батурина, 30",
    district: "Взлётка",
    sum: 2740,
    positions: ["Сет «Дракон»", "Кола 1,5", "Мисо-суп"],
    placedMinAgo: 1,
    readyInMin: 14,
    distanceKm: 5.8,
    channel: "Приложение",
  },
];

export const MENU_ITEMS = [
  "Сет «Дракон»",
  "Филадельфия",
  "Пепперони 30",
  "Том ям",
  "Вок с курицей",
  "Ролл Калифорния",
  "Мисо-суп",
  "Кола 1,5",
];

export function travelMin(distanceKm: number, type: CourierType) {
  return Math.round((distanceKm / SPEED_KMH[type]) * 60);
}

export function canTake(courier: Courier, order: Order) {
  return order.distanceKm <= MAX_DISTANCE_KM[courier.type];
}

export type Assignment = {
  orderId: string;
  courierId: string;
  /** Минут до передачи заказа гостю, считая от «сейчас». */
  etaMin: number;
  /** Полное время доставки с момента оформления. */
  totalMin: number;
  late: boolean;
};

export type ShiftResult = {
  assignments: Assignment[];
  unassignedIds: string[];
};

function etaFor(order: Order, courier: Courier, penaltyMin: number) {
  const pickupAt = Math.max(order.readyInMin, courier.freeInMin + penaltyMin);
  return pickupAt + travelMin(order.distanceKm, courier.type) + HANDOFF_MIN;
}

/**
 * Автораспределение Гуляша: самый срочный заказ уходит курьеру,
 * который доставит его быстрее всех и подходит по типу доставки.
 */
export function autoAssign(
  orders: Order[],
  couriers: Courier[],
  allowedTypes: CourierType[],
): ShiftResult {
  const pool = couriers
    .filter((c) => allowedTypes.includes(c.type))
    .map((c) => ({ ...c }));
  const queue = [...orders].sort(
    (a, b) =>
      PROMISE_MIN - a.placedMinAgo - (PROMISE_MIN - b.placedMinAgo) ||
      a.readyInMin - b.readyInMin,
  );

  const assignments: Assignment[] = [];
  const unassignedIds: string[] = [];

  for (const order of queue) {
    const eligible = pool.filter((c) => canTake(c, order));
    if (eligible.length === 0) {
      unassignedIds.push(order.id);
      continue;
    }
    let best = eligible[0];
    let bestEta = etaFor(order, best, 0);
    for (const courier of eligible.slice(1)) {
      const eta = etaFor(order, courier, 0);
      if (eta < bestEta) {
        best = courier;
        bestEta = eta;
      }
    }
    const totalMin = order.placedMinAgo + bestEta;
    assignments.push({
      orderId: order.id,
      courierId: best.id,
      etaMin: bestEta,
      totalMin,
      late: totalMin > PROMISE_MIN,
    });
    best.freeInMin = bestEta + Math.round(travelMin(order.distanceKm, best.type) * 0.6);
  }

  return { assignments, unassignedIds };
}

/** Ручная смена: считаем то, что диспетчер уже назначил, плюс потеря времени на звонки. */
export function manualAssign(
  orders: Order[],
  couriers: Courier[],
  picks: Record<string, string | undefined>,
): ShiftResult {
  const pool = couriers.map((c) => ({ ...c }));
  const assignments: Assignment[] = [];
  const unassignedIds: string[] = [];

  for (const order of orders) {
    const courierId = picks[order.id];
    const courier = courierId ? pool.find((c) => c.id === courierId) : undefined;
    if (!courier) {
      unassignedIds.push(order.id);
      continue;
    }
    const eta = etaFor(order, courier, DISPATCH_PENALTY_MIN);
    const totalMin = order.placedMinAgo + eta;
    assignments.push({
      orderId: order.id,
      courierId: courier.id,
      etaMin: eta,
      totalMin,
      late: totalMin > PROMISE_MIN,
    });
    courier.freeInMin =
      eta + Math.round(travelMin(order.distanceKm, courier.type) * 0.6);
  }

  return { assignments, unassignedIds };
}

export type Kpi = {
  avgDelivery: number;
  latePercent: number;
  perCourier: number;
  unassigned: number;
  lostRub: number;
};

export function computeKpi(orders: Order[], result: ShiftResult, couriersOnShift: number): Kpi {
  const { assignments, unassignedIds } = result;
  const delivered = assignments.length;
  const avgDelivery = delivered
    ? Math.round(assignments.reduce((acc, a) => acc + a.totalMin, 0) / delivered)
    : 0;
  const lateCount = assignments.filter((a) => a.late).length + unassignedIds.length;
  const lostRub = orders
    .filter(
      (o) =>
        unassignedIds.includes(o.id) ||
        assignments.some((a) => a.orderId === o.id && a.late),
    )
    // Опоздание стоит компенсации гостю, неразобранный заказ — отмены.
    .reduce(
      (acc, o) => acc + (unassignedIds.includes(o.id) ? o.sum : Math.round(o.sum * 0.15)),
      0,
    );

  return {
    avgDelivery,
    latePercent: Math.round((lateCount / orders.length) * 100),
    perCourier: couriersOnShift
      ? Math.round((delivered / couriersOnShift) * 10) / 10
      : 0,
    unassigned: unassignedIds.length,
    lostRub,
  };
}

export const KITCHEN_SLOTS = ["18:30", "18:45", "19:00", "19:15"] as const;

export function slotOf(order: Order) {
  if (order.readyInMin <= 4) return "18:30";
  if (order.readyInMin <= 8) return "18:45";
  if (order.readyInMin <= 12) return "19:00";
  return "19:15";
}
