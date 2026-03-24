import type { ReactNode } from "react";
import Image from "next/image";

/** GIF/AVIF/SVG: skip optimizer (animation, already compressed, or vector). */
function imageUnoptimized(src: string) {
  return /\.(gif|avif|svg)(\?|$)/i.test(src);
}

/** Matches Spectacles 5 — golden standard for typography & layout */

/** Body / intro copy: nav-scale on mobile–md, slightly larger on lg+ for long reads */
export const csCopy =
  "font-sans text-[9px] font-light leading-[14px] tracking-[0.5px] md:text-[11px] md:leading-[18px] md:tracking-[0.3px] lg:text-[12px] lg:leading-[18px]";

/**
 * Vertical gap between section headings (CsH2) and body copy — tight on mobile,
 * scales up at sm / md / lg / xl (matches nav/body scale steps).
 */
export const csHeadingToBodyGapTop =
  "mt-4 sm:mt-5 md:mt-7 lg:mt-9 xl:mt-10";

export const csHeadingToBodyGap = `${csHeadingToBodyGapTop} mb-6 sm:mb-8 md:mb-16 lg:mb-20`;

export function CsMax({
  children,
  className,
}: {
  children: ReactNode;
  /** Appended after base max-width / padding classes */
  className?: string;
}) {
  return (
    <section
      className={`mx-auto max-w-[940px] px-6 md:px-0${className ? ` ${className}` : ""}`}
    >
      {children}
    </section>
  );
}

export function CsH1({ children }: { children: ReactNode }) {
  return (
    <h1 className="mx-auto mb-3 w-[90%] max-w-lg text-left text-[18px] font-bold leading-[1.15] tracking-[0.5px] md:mb-10 md:ml-10 md:mr-0 md:w-auto md:max-w-none md:text-[25px] md:leading-[1.1] md:tracking-[2px]">
      {children}
    </h1>
  );
}

export function CsIntroRow({ children }: { children: ReactNode }) {
  return (
    <div className="mt-3 flex flex-col items-center gap-6 md:mt-0 md:flex-row md:items-start md:gap-0">
      {children}
    </div>
  );
}

type IntroVariant = "wide" | "mid" | "right";

/** Intro column labels (`<strong>`) read heavier than body — all case studies using `CsIntroCol`. */
const introColStrong = "[&_strong]:font-extrabold";

const introCol: Record<IntroVariant, string> = {
  wide: `${csCopy} ${introColStrong} w-[90%] max-w-lg text-left md:ml-10 md:mt-[25px] md:w-[35%] md:max-w-none`,
  mid: `${csCopy} ${introColStrong} w-[90%] max-w-lg text-left md:ml-[67px] md:mt-[25px] md:w-[25%] md:max-w-none`,
  right: `${csCopy} ${introColStrong} w-[90%] max-w-lg text-left md:ml-10 md:mt-[25px] md:w-[25%] md:max-w-none`,
};

export function CsIntroCol({
  variant,
  children,
}: {
  variant: IntroVariant;
  children: ReactNode;
}) {
  return <div className={introCol[variant]}>{children}</div>;
}

/** Full-bleed media — below-the-fold by default; set `priority` only when above the fold. */
export function CsBleedImg({
  src,
  className = "mt-0 h-full w-full",
  priority = false,
}: {
  src: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt=""
      width={2400}
      height={1600}
      sizes="100vw"
      className={`max-w-none ${className}`}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      decoding="async"
      unoptimized={imageUnoptimized(src)}
    />
  );
}

/** Use when the next block is a title section (h2 + copy). */
export function CsBleedImgBeforeTitle({
  src,
  priority = false,
}: {
  src: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt=""
      width={2400}
      height={1600}
      sizes="100vw"
      className="mb-10 h-auto w-full max-w-none md:mb-20"
      priority={priority}
      loading={priority ? undefined : "lazy"}
      decoding="async"
      unoptimized={imageUnoptimized(src)}
    />
  );
}

/**
 * First full-bleed image after the intro header (`CsMax` + title + `CsIntroRow`).
 * Usually LCP for the case study — `priority` defaults true.
 */
export function CsBleedImgAfterIntro({
  src,
  className,
  priority = true,
}: {
  src: string;
  /** Appended after the standard after-intro spacing */
  className?: string;
  /** Set false if this image is not the main above-the-fold hero */
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt=""
      width={2400}
      height={1600}
      sizes="100vw"
      className={`mt-10 mb-10 h-auto w-full max-w-none md:mb-20${className ? ` ${className}` : ""}`}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      decoding="async"
      unoptimized={imageUnoptimized(src)}
    />
  );
}

export function CsSection({
  first,
  className,
  children,
}: {
  /** First major section after hero uses mt-10; following blocks use mt-0 */
  first?: boolean;
  /** Appended after base section classes */
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={`mx-auto w-full text-left ${first ? "mt-10" : "mt-0"}${className ? ` ${className}` : ""}`}
    >
      {children}
    </section>
  );
}

/** Section widths: ~20% narrower than legacy 90%/80% (72% / 64%); max cap 80% of previous `max-w-lg`. */
export const csSectionWidth =
  "w-[72%] max-w-[25.6rem] md:w-[64%] md:max-w-none";

/** Core type scale for `CsH2` — reuse where section titles should match (e.g. compare labels). */
export const csH2Typography =
  "text-[11px] font-bold leading-snug tracking-[0.5px] md:text-[25px] md:leading-[30px] md:tracking-[1px]";

/** Smaller than `csH2Typography` — compare row captions (readable on mobile / tablet). */
export const csH2TypographyHalf =
  "text-[10px] font-bold leading-snug tracking-[0.3px] sm:text-[11px] md:text-[14px] md:leading-[18px] md:tracking-[0.45px] lg:text-[15px] lg:leading-[19px] lg:tracking-[0.5px]";

export function CsH2({ children }: { children: ReactNode }) {
  return (
    <h2
      className={`mx-auto mb-0 block text-left md:block md:text-center ${csH2Typography} ${csSectionWidth}`}
    >
      {children}
    </h2>
  );
}

/** Pull quote in animated liquid-glass pill — same width rhythm as `CsH2`. */
export function CsQuotePill({ children }: { children: ReactNode }) {
  return (
    <blockquote
      className={`case-study-quote-pill liquid-glass-button liquid-glass-pill liquid-glass-nav mx-auto mb-0 block text-left text-[11px] font-bold leading-snug tracking-[0.5px] md:text-center md:text-[25px] md:leading-[30px] md:tracking-[1px] ${csSectionWidth}`}
    >
      <span className="block">{children}</span>
    </blockquote>
  );
}

/** Matches `CsH2` so section copy aligns with headings on tablet+. */
const bodyBaseLeft = `${csCopy} mx-auto text-left ${csSectionWidth} ${csHeadingToBodyGap}`;
/** Mobile: left like Spectacles / Pixy; md+: centered for short blurbs */
const bodyBaseCenter = `${csCopy} mx-auto text-left md:text-center ${csSectionWidth} ${csHeadingToBodyGap}`;

export function CsBody({
  children,
  extrabold,
  center,
}: {
  children: ReactNode;
  /** Spectacles “Hardware / Cover / Packaging” style labels */
  extrabold?: boolean;
  /** md+: centered short blurbs; mobile stays left (Spectacles / Pixy) */
  center?: boolean;
}) {
  const base = center ? bodyBaseCenter : bodyBaseLeft;
  return (
    <div
      className={
        extrabold ? `${base} [&_strong]:font-extrabold` : base
      }
    >
      {children}
    </div>
  );
}

/** Intro-only full-width copy under H1 when not using 3-column row */
export function CsIntroWide({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${csCopy} mx-auto mt-6 w-[90%] max-w-lg text-left md:ml-10 md:mt-8 md:w-auto md:max-w-[85%]`}
    >
      {children}
    </div>
  );
}
