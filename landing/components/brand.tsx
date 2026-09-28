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
      className={`${className} mark-adapt`}
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
      className={`${className} mark-adapt`}
    />
  );
}

/** Client and partner marks downloaded from goulash.tech. */
export function BrandLogo({
  src,
  alt,
  className = "h-7 w-auto",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" decoding="async" className={`${className} mark-adapt`} />
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow flex items-center gap-3 text-paper/40">
      <span aria-hidden className="h-px w-6 bg-cyan-accent" />
      {children}
    </p>
  );
}

export function Section({
  id,
  children,
  className = "",
  gridlines = false,
  divider = true,
  tight = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  gridlines?: boolean;
  divider?: boolean;
  tight?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-16 ${
        tight ? "py-14 sm:py-16 lg:py-20" : "py-20 sm:py-28 lg:py-36"
      } ${divider ? "rule" : ""} ${className}`}
    >
      {gridlines && <span aria-hidden className="gridlines" />}
      <div className="shell relative">{children}</div>
    </section>
  );
}

/**
 * Section head on the 12-column module: short title on the left half,
 * supporting prose in its own column on the right.
 */
export function SectionHead({
  eyebrow,
  title,
  note,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  note?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={`grid12 gap-y-8 ${className}`}>
      <div className="col-span-12 lg:col-span-7">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className={`view-rise text-h2 leading-[1.05] ${eyebrow ? "mt-7" : ""}`}>{title}</h2>
      </div>
      {note && (
        <div
          className={`col-span-12 space-y-4 text-lede leading-snug text-paper/55 lg:col-span-5 lg:col-start-8 ${
            eyebrow ? "lg:pt-11" : ""
          }`}
        >
          {note}
        </div>
      )}
    </header>
  );
}