"use client";

import { useEffect, useSyncExternalStore } from "react";

export const THEME_KEY = "goulash-theme";
const THEME_EVENT = "goulash-theme-change";

type Mode = "system" | "light" | "dark";

const OPTIONS: { id: Mode; label: string }[] = [
  { id: "system", label: "Система" },
  { id: "light", label: "Светлая" },
  { id: "dark", label: "Тёмная" },
];

function resolve(mode: Mode) {
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return mode === "dark" || (mode !== "light" && systemDark) ? "dark" : "light";
}

export function applyTheme(mode: Mode) {
  const resolved = resolve(mode);
  const root = document.documentElement;
  root.dataset.theme = mode;
  root.dataset.resolved = resolved;
  root.style.colorScheme = resolved;
}

function readMode(): Mode {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
  } catch {
    /* private mode */
  }
  return "system";
}

function subscribe(onStoreChange: () => void) {
  const onChange = () => onStoreChange();
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function ThemeSwitch() {
  const mode = useSyncExternalStore(subscribe, readMode, () => "system" as Mode);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (readMode() === "system") applyTheme("system");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const choose = (next: Mode) => {
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }
    applyTheme(next);
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <div role="radiogroup" aria-label="Тема оформления" className="inline-flex rounded-full border border-ink-line p-1">
      {OPTIONS.map((option) => {
        const on = mode === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => choose(option.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              on ? "bg-cyan-fill text-black" : "text-paper/55 hover:text-paper"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
