export type PointIconName =
  | "scale"
  | "break"
  | "margin"
  | "orders"
  | "track"
  | "time"
  | "access"
  | "remote"
  | "metrics";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PointIcon({ name }: { name: PointIconName }) {
  return (
    <span className="point-icon grid size-16 shrink-0 place-items-center text-cyan-accent" aria-hidden>
      <svg viewBox="0 0 32 32" className="size-14 overflow-visible">
        {name === "scale" && <ScaleIcon />}
        {name === "break" && <BreakIcon />}
        {name === "margin" && <MarginIcon />}
        {name === "orders" && <OrdersIcon />}
        {name === "track" && <TrackIcon />}
        {name === "time" && <TimeIcon />}
        {name === "access" && <AccessIcon />}
        {name === "remote" && <RemoteIcon />}
        {name === "metrics" && <MetricsIcon />}
      </svg>
    </span>
  );
}

function ScaleIcon() {
  return (
    <>
      <path className="icon-dash" d="M8 16h6M18 16h6M16 8v6M16 18v6" {...stroke} />
      <circle className="icon-pulse" cx="6" cy="16" r="2.2" fill="currentColor" />
      <circle cx="26" cy="16" r="2.2" fill="currentColor" />
      <circle cx="16" cy="6" r="2.2" fill="currentColor" />
      <circle cx="16" cy="26" r="2.2" fill="currentColor" />
      <circle cx="16" cy="16" r="2.4" {...stroke} />
    </>
  );
}

function BreakIcon() {
  return (
    <>
      <path className="icon-pulse" d="M16 5 28 27H4Z" {...stroke} />
      <path d="M16 13v6" {...stroke} />
      <circle cx="16" cy="22.5" r="0.9" fill="currentColor" />
    </>
  );
}

function MarginIcon() {
  return (
    <>
      <path d="M8 22 14 12l5 6 5-10" {...stroke} />
      <path className="icon-bob" d="M20 8h5v5" {...stroke} />
      <circle cx="8" cy="24" r="2" {...stroke} />
    </>
  );
}

function OrdersIcon() {
  return (
    <>
      <path d="M6 14h20l-2 10H8Z" {...stroke} />
      <path d="M10 14c0-4 2.5-7 6-7s6 3 6 7" {...stroke} />
      <circle className="icon-bob" cx="16" cy="18" r="1.5" fill="currentColor" />
    </>
  );
}

function TrackIcon() {
  return (
    <>
      <path className="icon-dash" d="M5 22c4-9 7-9 11 0s7 9 11 0" {...stroke} />
      <circle cx="6" cy="21" r="1.7" fill="currentColor" />
      <circle className="icon-pulse" cx="16" cy="16" r="1.7" fill="currentColor" />
      <circle cx="26" cy="21" r="1.7" fill="currentColor" />
    </>
  );
}

function TimeIcon() {
  return (
    <>
      <circle cx="16" cy="16" r="9" {...stroke} />
      <path className="icon-spin" d="M16 16 V10" {...stroke} />
      <path d="M16 16h4" {...stroke} />
    </>
  );
}

function AccessIcon() {
  return (
    <>
      <rect x="7" y="7" width="18" height="18" rx="2" {...stroke} />
      <path className="icon-dash" d="M12 16h8M16 12v8" {...stroke} />
      <circle className="icon-pulse" cx="16" cy="16" r="1.4" fill="currentColor" />
    </>
  );
}

function RemoteIcon() {
  return (
    <>
      <path className="icon-pulse" d="M8 14a8 8 0 0 1 16 0" {...stroke} />
      <path d="M11.5 17a4.2 4.2 0 0 1 9 0" {...stroke} />
      <circle cx="16" cy="21.5" r="1.6" fill="currentColor" />
    </>
  );
}

function MetricsIcon() {
  return (
    <>
      <path d="M6 26h20" {...stroke} />
      <rect className="icon-grow" x="8" y="16" width="3.5" height="10" fill="currentColor" />
      <rect className="icon-grow icon-grow-delay" x="14.2" y="10" width="3.5" height="16" fill="currentColor" />
      <rect className="icon-grow icon-grow-delay-2" x="20.5" y="13" width="3.5" height="13" fill="currentColor" />
    </>
  );
}
