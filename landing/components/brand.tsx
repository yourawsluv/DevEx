export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="grid size-9 place-items-center rounded-[10px] bg-cyan-accent text-[20px] font-extrabold leading-none text-ink"
      >
        G
      </span>
      {!compact && (
        <span className="text-[17px] font-semibold leading-none tracking-tight">
          Goulash<span className="text-cyan-accent">.tech</span>
        </span>
      )}
      <span className="sr-only">Goulash.tech</span>
    </span>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.18em] text-white/45">
      <span aria-hidden className="h-px w-8 bg-cyan-accent" />
      {children}
    </p>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`border-t border-ink-line py-16 sm:py-24 ${className}`}
    >
      <div className="shell">{children}</div>
    </section>
  );
}
