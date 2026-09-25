"use client";

import { useState } from "react";

type Fields = {
  name: string;
  phone: string;
  city: string;
  ordersPerDay: string;
  channel: string;
  consent: boolean;
};

type Status = "idle" | "loading" | "success" | "error";

const ORDER_RANGES = ["до 100", "100–200", "200–400", "400+"];
const CHANNELS = ["Telegram", "WhatsApp", "Звонок"];

const EMPTY: Fields = {
  name: "",
  phone: "",
  city: "",
  ordersPerDay: "",
  channel: "Telegram",
  consent: false,
};

function formatPhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = `7${digits.slice(1)}`;
  if (!digits.startsWith("7")) digits = `7${digits}`;
  digits = digits.slice(0, 11);
  const rest = digits.slice(1);
  let out = "+7";
  if (rest.length > 0) out += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) out += ") ";
  if (rest.length > 3) out += rest.slice(3, 6);
  if (rest.length > 6) out += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) out += `-${rest.slice(8, 10)}`;
  return out;
}

function validate(fields: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (fields.name.trim().length < 2) errors.name = "Как к вам обращаться?";
  if (fields.phone.replace(/\D/g, "").length !== 11)
    errors.phone = "Телефон в формате +7 (999) 123-45-67";
  if (fields.city.trim().length < 2) errors.city = "Укажите город доставки";
  if (!ORDER_RANGES.includes(fields.ordersPerDay))
    errors.ordersPerDay = "Выберите поток заказов";
  if (!fields.consent) errors.consent = "Без согласия не сможем позвонить";
  return errors;
}

export function LeadForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [leadId, setLeadId] = useState("");

  const setField = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    const next = { ...fields, [key]: value };
    setFields(next);
    if (touched[key] || errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: validate(next)[key] }));
    }
  };

  const blur = (key: keyof Fields) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validate(fields)[key] }));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate(fields);
    setErrors(found);
    setTouched({
      name: true,
      phone: true,
      city: true,
      ordersPerDay: true,
      channel: true,
      consent: true,
    });
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("loading");
    setServerMessage("");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = (await response.json()) as {
        ok: boolean;
        id?: string;
        error?: string;
        errors?: Record<string, string>;
      };
      if (!response.ok || !data.ok) {
        if (data.errors) setErrors(data.errors as Partial<Record<keyof Fields, string>>);
        setServerMessage(data.error ?? "Проверьте поля формы");
        setStatus("error");
        return;
      }
      setLeadId(data.id ?? "");
      setStatus("success");
    } catch {
      setServerMessage("Нет связи с сервером. Проверьте интернет и попробуйте снова.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-cyan-accent/50 bg-cyan-accent/5 p-6 sm:p-10 rise">
        <p className="grid size-12 place-items-center rounded-full bg-cyan-accent text-2xl font-bold text-ink">
          ✓
        </p>
        <h3 className="mt-5 text-2xl font-semibold sm:text-3xl">Заявка отправлена</h3>
        <p className="mt-3 max-w-lg text-white/65">
          Номер заявки <span className="font-semibold text-cyan-accent tnum">{leadId}</span>.
          Партнёр в вашем городе свяжется в {fields.channel.toLowerCase()} в течение рабочего
          дня, разберёт вечернюю смену и покажет, что меняется за три недели перехода.
        </p>
        <ul className="mt-5 space-y-2 text-sm text-white/55">
          <li>1. Звонок-разбор на 20 минут: поток, каналы, курьеры, касса.</li>
          <li>2. Расчёт стоимости по вашему обороту.</li>
          <li>3. План перехода с датами запуска.</li>
        </ul>
        <button
          type="button"
          onClick={() => {
            setFields(EMPTY);
            setTouched({});
            setErrors({});
            setStatus("idle");
          }}
          className="mt-6 text-sm text-white/50 underline decoration-dotted underline-offset-4 hover:text-cyan-accent"
        >
          Отправить ещё одну заявку
        </button>
        <p className="mt-6 text-xs text-white/30">
          Это тестовый лендинг: заявка обрабатывается мок-эндпоинтом и никуда не уходит.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-3xl border border-ink-line bg-ink-soft p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Имя"
          error={errors.name}
          input={
            <input
              value={fields.name}
              onChange={(e) => setField("name", e.target.value)}
              onBlur={() => blur("name")}
              placeholder="Иван"
              autoComplete="name"
              className={inputClass(!!errors.name)}
              aria-invalid={!!errors.name}
            />
          }
        />
        <Field
          label="Телефон"
          error={errors.phone}
          input={
            <input
              value={fields.phone}
              onChange={(e) => setField("phone", formatPhone(e.target.value))}
              onBlur={() => blur("phone")}
              placeholder="+7 (999) 123-45-67"
              inputMode="tel"
              autoComplete="tel"
              className={inputClass(!!errors.phone)}
              aria-invalid={!!errors.phone}
            />
          }
        />
        <Field
          label="Город"
          error={errors.city}
          input={
            <input
              value={fields.city}
              onChange={(e) => setField("city", e.target.value)}
              onBlur={() => blur("city")}
              placeholder="Красноярск"
              className={inputClass(!!errors.city)}
              aria-invalid={!!errors.city}
            />
          }
        />
        <Field
          label="Заказов в день"
          error={errors.ordersPerDay}
          input={
            <select
              value={fields.ordersPerDay}
              onChange={(e) => setField("ordersPerDay", e.target.value)}
              onBlur={() => blur("ordersPerDay")}
              className={inputClass(!!errors.ordersPerDay)}
              aria-invalid={!!errors.ordersPerDay}
            >
              <option value="">Выберите поток</option>
              {ORDER_RANGES.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          }
        />
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm text-white/55">Куда удобнее ответить</legend>
        <div className="flex flex-wrap gap-2">
          {CHANNELS.map((channel) => (
            <button
              key={channel}
              type="button"
              onClick={() => setField("channel", channel)}
              aria-pressed={fields.channel === channel}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                fields.channel === channel
                  ? "border-cyan-accent bg-cyan-accent/10 text-cyan-accent"
                  : "border-ink-line text-white/60 hover:border-white/30"
              }`}
            >
              {channel}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="mt-5 flex items-start gap-3 text-sm text-white/55">
        <input
          type="checkbox"
          checked={fields.consent}
          onChange={(e) => setField("consent", e.target.checked)}
          onBlur={() => blur("consent")}
          className="mt-0.5 size-4 accent-[#00ffff]"
          aria-invalid={!!errors.consent}
        />
        <span>
          Согласен на обработку персональных данных и связь по указанному каналу.
          {errors.consent && (
            <span className="mt-1 block text-[#ff6b6b]">{errors.consent}</span>
          )}
        </span>
      </label>

      {status === "error" && (
        <div
          role="alert"
          className="mt-5 rounded-2xl border border-[#ff6b6b]/50 bg-[#ff6b6b]/10 p-4 text-sm text-[#ff6b6b] rise"
        >
          <p className="font-semibold">Заявка не отправилась</p>
          <p className="mt-1 text-white/70">{serverMessage}</p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-cyan-accent px-6 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-cyan-300 disabled:cursor-progress disabled:opacity-70"
        >
          {status === "loading" && (
            <span
              aria-hidden
              className="size-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink"
            />
          )}
          {status === "loading" ? "Отправляем…" : "Разобрать мою смену"}
        </button>
        <p className="text-xs text-white/35">
          Мок-форма тестового лендинга. Телефон, оканчивающийся на 0000, показывает экран
          ошибки.
        </p>
      </div>
      <p aria-live="polite" className="sr-only">
        {status === "loading" ? "Отправка заявки" : ""}
      </p>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return `w-full rounded-xl border bg-ink px-4 py-3 text-base text-white placeholder:text-white/25 focus:outline-none ${
    invalid
      ? "border-[#ff6b6b] focus:border-[#ff6b6b]"
      : "border-ink-line focus:border-cyan-accent"
  }`;
}

function Field({
  label,
  error,
  input,
}: {
  label: string;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/55">{label}</span>
      {input}
      {error && <span className="mt-1.5 block text-sm text-[#ff6b6b]">{error}</span>}
    </label>
  );
}
