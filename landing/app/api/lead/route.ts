import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  phone?: string;
  city?: string;
  consent?: boolean;
};

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
  if (!body.consent) errors.consent = "Нужно согласие на обработку данных";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  await new Promise((resolve) => setTimeout(resolve, 900));

  return NextResponse.json({
    ok: true,
    id: `GT-${digits.slice(-4)}-${String(Date.now()).slice(-4)}`,
  });
}
