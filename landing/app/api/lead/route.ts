import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  phone?: string;
  city?: string;
  ordersPerDay?: string;
  channel?: string;
  consent?: boolean;
};

const ORDER_RANGES = ["до 100", "100–200", "200–400", "400+"];

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос" }, { status: 400 });
  }

  const digits = (body.phone ?? "").replace(/\D/g, "");
  const errors: Record<string, string> = {};

  if (!body.name || body.name.trim().length < 2) errors.name = "Укажите имя";
  if (digits.length !== 11) errors.phone = "Телефон из 11 цифр";
  if (!body.city || body.city.trim().length < 2) errors.city = "Укажите город";
  if (!body.ordersPerDay || !ORDER_RANGES.includes(body.ordersPerDay))
    errors.ordersPerDay = "Выберите поток заказов";
  if (!body.consent) errors.consent = "Нужно согласие на обработку данных";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // Мок-обработка заявки: имитируем сетевую задержку.
  await new Promise((resolve) => setTimeout(resolve, 900));

  // Телефон, оканчивающийся на 0000, возвращает сбой — так проверяется экран ошибки.
  if (digits.endsWith("0000")) {
    return NextResponse.json(
      { ok: false, error: "Сервис заявок недоступен. Попробуйте ещё раз." },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    id: `GT-${digits.slice(-4)}-${String(Date.now()).slice(-4)}`,
    note: "Заявка принята мок-эндпоинтом тестового лендинга и никуда не отправляется.",
  });
}
