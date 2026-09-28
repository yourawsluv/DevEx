"use client";

import { useEffect, useRef, useState } from "react";
import { TextMorph } from "torph/react";

const EASE = { stiffness: 180, damping: 20 };

/** Cycles copy with Torph while the longest line keeps the layout still. */
export function MorphCycle({
  lines,
  className = "",
  interval = 3800,
}: {
  lines: readonly string[];
  className?: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const longest = lines.reduce((a, b) => (a.length >= b.length ? a : b));

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % lines.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [active, interval, lines.length]);

  return (
    <span ref={ref} className={`inline-grid max-w-full ${className}`}>
      <span className="invisible col-start-1 row-start-1 whitespace-pre-line" aria-hidden>
        {longest}
      </span>
      <TextMorph
        locale="ru"
        duration={640}
        ease={EASE}
        className="col-start-1 row-start-1 whitespace-pre-line"
      >
        {lines[index] ?? ""}
      </TextMorph>
    </span>
  );
}

/** Morphs when `text` changes — scroll states, tabs, statuses. */
export function MorphSwap({ text, className = "" }: { text: string; className?: string }) {
  return (
    <TextMorph locale="ru" duration={460} ease={EASE} className={className}>
      {text}
    </TextMorph>
  );
}
