"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Stat = {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
  decimalSep: "," | ".";
  group: boolean;
};

function parseStat(raw: string): Stat | null {
  const match = raw.match(/^(\D*?)(\d(?:[\d\s]*\d)?)([.,]\d+)?(.*)$/);
  if (!match) return null;
  const [, prefix, intRaw, fracRaw = "", suffix] = match;
  const decimalSep = fracRaw.startsWith(".") ? "." : ",";
  const decimals = fracRaw ? fracRaw.slice(1).length : 0;
  const target = Number(`${intRaw.replace(/\s/g, "")}.${fracRaw.slice(1) || "0"}`);
  if (!Number.isFinite(target)) return null;
  return {
    prefix,
    suffix,
    target,
    decimals,
    decimalSep,
    group: /\d\s\d/.test(intRaw),
  };
}

function formatStat(stat: Stat, progress: number) {
  const current = stat.target * progress;
  const rounded =
    stat.decimals > 0 ? current.toFixed(stat.decimals) : String(Math.round(current));
  const [intPart, fracPart] = rounded.split(".");
  const grouped = stat.group ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : intPart;
  const body = stat.decimals > 0 ? `${grouped}${stat.decimalSep}${fracPart}` : grouped;
  return `${stat.prefix}${body}${stat.suffix}`;
}

function subscribeReduced(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/** Counts a statistic from zero once it enters the viewport. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const stat = parseStat(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => (stat ? formatStat(stat, 0) : value));
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  useEffect(() => {
    const node = ref.current;
    const parsed = parseStat(value);
    if (!node || !parsed || reduced) return;

    let started = false;
    let frame = 0;
    const run = () => {
      if (started) return;
      started = true;
      const begin = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - begin) / 1200);
        const eased = 1 - (1 - t) ** 3;
        setDisplay(formatStat(parsed, eased));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) run();
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduced, value]);

  if (!stat) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={`inline-grid ${className}`} aria-label={value}>
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <span aria-hidden className="col-start-1 row-start-1">
        {reduced ? value : display}
      </span>
    </span>
  );
}
