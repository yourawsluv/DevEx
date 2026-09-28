"use client";

import { useState } from "react";

type Fields = {
  name: string;
  phone: string;
  city: string;
  consent: boolean;
};

type Status = "idle" | "loading" | "success" | "error";

const EMPTY: Fields = {
  name: "",
  phone: "",
  city: "",
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
  if (fields.city.trim().length < 2) errors.city = "Укажите город";
  if (!fields.consent) errors.consent = "Нужно согласие на обработку данных";
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
    setTouched({ name: true, phone: true, city: true, consent: true });
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
        setServerMessage(data.error ?? "Не удалось отправить заявку. Попробуйте ещё раз.");
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
      <div className="max-w-sm rise">
        <p className="grid size-12 place-items-center rounded-full bg-paper text-2xl font-medium text-ink">
          ✓
        </p>
        <h3 className="mt-7 text-h2">Заявка отправлена</h3>
        <p className="mt-4 max-w-lg text-paper/65">
          Номер заявки <span className="text-paper tnum">{leadId}</span>.
          Наш специалист проконсультирует вас по запуску платформы с учетом особенностей вашего
          бизнеса.
        </p>
        <button
          type="button"
          onClick={() => {
            setFields(EMPTY);
            setTouched({});
            setErrors({});
            setStatus("idle");
          }}
          className="mt-6 text-sm text-paper/50 underline decoration-dotted underline-offset-4 hover:text-paper"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="max-w-sm"
    >
      <div className="grid gap-5">
        <Field
          label="Имя"
          error={errors.name}
          input={
            <input
              value={fields.name}
              onChange={(event) => setField("name", event.target.value)}
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
              onChange={(event) => setField("phone", formatPhone(event.target.value))}
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
              onChange={(event) => setField("city", event.target.value)}
              onBlur={() => blur("city")}
              placeholder="Екатеринбург"
              className={inputClass(!!errors.city)}
              aria-invalid={!!errors.city}
            />
          }
        />
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-paper/55">
        <input
          type="checkbox"
          checked={fields.consent}
          onChange={(event) => setField("consent", event.target.checked)}
          onBlur={() => blur("consent")}
          className="mt-0.5 size-4 accent-current"
          aria-invalid={!!errors.consent}
        />
        <span>
          Согласен на обработку персональных данных.
          {errors.consent && <span className="mt-1 block text-[#ff6b6b]">{errors.consent}</span>}
        </span>
      </label>

      {status === "error" && (
        <div
          role="alert"
          className="mt-6 border border-[#ff6b6b]/50 bg-[#ff6b6b]/10 p-4 text-sm text-[#ff6b6b] rise"
        >
          <p className="font-medium">Заявка не отправилась</p>
          <p className="mt-1 text-paper/70">{serverMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn mt-8 inline-flex w-fit items-center justify-center gap-2 bg-cyan-fill px-7 py-3.5 text-base font-medium text-black transition-colors hover:bg-cyan-fill-hover disabled:cursor-progress disabled:opacity-70"
      >
        {status === "loading" && (
          <span
            aria-hidden
            className="size-4 animate-spin rounded-full border-2 border-black/30 border-t-black"
          />
        )}
        {status === "loading" ? "Отправка" : "Отправить"}
      </button>
      <p aria-live="polite" className="sr-only">
        {status === "loading" ? "Отправка заявки" : ""}
      </p>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return `w-full rounded-xl border bg-ink px-4 py-3.5 text-base text-paper placeholder:text-paper/25 focus:outline-none ${
    invalid ? "border-[#ff6b6b] focus:border-[#ff6b6b]" : "border-ink-line focus:border-paper/45"
  }`;
}

function Field({
  label,
  error,
  input,
  className = "",
}: {
  label: string;
  error?: string;
  input: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm text-paper/55">{label}</span>
      {input}
      {error && <span className="mt-1.5 block text-sm text-[#ff6b6b]">{error}</span>}
    </label>
  );
}
