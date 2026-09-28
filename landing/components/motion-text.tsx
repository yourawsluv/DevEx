"use client";

import { useEffect, useRef, useState } from "react";
import { TextMorph, type TextMorphProps } from "torph/react";

/** Three different Torph behaviours — not one ease reused everywhere. */
export type MorphVariant = "spring" | "glide" | "numbers";

const VARIANTS: Record<MorphVariant, Pick<TextMorphProps, "duration" | "ease" | "scale" | "numbers">> = {
  /** Physics spring: characters settle with overshoot. */
  spring: {
    ease: { stiffness: 170, damping: 14, mass: 1 },
    scale: true,
    numbers: false,
  },
  /** Cubic-bezier slide without the scale pop. */
  glide: {
    duration: 820,
    ease: "cubic-bezier(0.19, 1, 0.22, 1)",
    scale: false,
    numbers: false,
  },
  /** Digits travel by place value along the block axis. */
  numbers: {
    duration: 640,
    ease: "cubic-bezier(0.22, 1, 0.36, 1)",
    scale: false,
    numbers: true,
  },
};

/** Cycles copy with Torph while the longest line keeps the layout still. */
export function MorphCycle({
  lines,
  className = "",
  interval = 3800,
  variant,
}: {
  lines: readonly string[];
  className?: string;
  interval?: number;
  variant: MorphVariant;
}) {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const longest = lines.reduce((a, b) => (a.length >= b.length ? a : b));
  const motion = VARIANTS[variant];

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
    <span ref={ref} data-torph={variant} className={`inline-grid max-w-full ${className}`}>
      <span className="invisible col-start-1 row-start-1 whitespace-pre-line" aria-hidden>
        {longest}
      </span>
      <TextMorph
        locale="ru"
        className="col-start-1 row-start-1 whitespace-pre-line"
        {...motion}
      >
        {lines[index] ?? ""}
      </TextMorph>
    </span>
  );
}

/** Morphs when `text` changes — scroll states, tabs, statuses. */
export function MorphSwap({
  text,
  className = "",
  variant,
}: {
  text: string;
  className?: string;
  variant: MorphVariant;
}) {
  const motion = VARIANTS[variant];
  return (
    <span data-torph={variant} className={className}>
      <TextMorph locale="ru" {...motion}>
        {text}
      </TextMorph>
    </span>
  );
}
