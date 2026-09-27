export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo-mark.png"
      alt="Goulash.tech"
      width={32}
      height={32}
      className={className}
    />
  );
}

export function LogoHorizontal({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo-horizontal.png"
      alt="Goulash.tech"
      width={1024}
      height={151}
      className={className}
    />
  );
}

export function LogoStacked({ className = "h-16 w-auto" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo-stacked.png"
      alt="Goulash.tech"
      width={699}
      height={255}
      className={className}
    />
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
    <section id={id} className={`border-t border-ink-line py-16 sm:py-24 ${className}`}>
      <div className="shell">{children}</div>
    </section>
  );
}
