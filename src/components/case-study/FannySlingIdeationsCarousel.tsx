"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getNearestCardIndex(scroller: HTMLDivElement): number {
  const track = scroller.firstElementChild as HTMLElement | null;
  if (!track) return 0;
  const cards = track.querySelectorAll<HTMLElement>(
    ".fanny-ideations-scroll__card",
  );
  if (cards.length === 0) return 0;
  const scrollLeft = scroller.scrollLeft;
  let best = 0;
  let bestDist = Infinity;
  cards.forEach((card, i) => {
    const dist = Math.abs(card.offsetLeft - scrollLeft);
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  });
  return best;
}

const defaultLabels = {
  region: "Ideation sketches carousel",
  scroller: "Ideation images — use arrow keys to change slides",
  prev: "Previous ideation image",
  next: "Next ideation image",
} as const;

export function FannySlingIdeationsCarousel({
  images,
  className = "",
  regionLabel = defaultLabels.region,
  scrollerLabel = defaultLabels.scroller,
  prevLabel = defaultLabels.prev,
  nextLabel = defaultLabels.next,
}: {
  images: { src: string; alt?: string }[];
  className?: string;
  /** Accessible names — defaults match Ideations copy */
  regionLabel?: string;
  scrollerLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const scrollerId = useId();

  const syncIndex = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setIndex(getNearestCardIndex(el));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => syncIndex();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(() => syncIndex());
    ro.observe(el);
    syncIndex();
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [syncIndex]);

  const goToIndex = useCallback((i: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const track = scroller.firstElementChild as HTMLElement | null;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>(
      ".fanny-ideations-scroll__card",
    );
    const clamped = Math.min(Math.max(0, i), cards.length - 1);
    const target = cards[clamped];
    if (!target) return;
    const behavior = prefersReducedMotion() ? "auto" : "smooth";
    target.scrollIntoView({
      behavior,
      inline: "start",
      block: "nearest",
    });
    setIndex(clamped);
  }, []);

  const go = useCallback(
    (dir: -1 | 1) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const track = scroller.firstElementChild as HTMLElement | null;
      if (!track) return;
      const cards = track.querySelectorAll<HTMLElement>(
        ".fanny-ideations-scroll__card",
      );
      const current = getNearestCardIndex(scroller);
      const next = Math.min(Math.max(0, current + dir), cards.length - 1);
      goToIndex(next);
    },
    [goToIndex],
  );

  const atStart = index <= 0;
  const atEnd = index >= images.length - 1;

  const onKeyDown = (e: React.KeyboardEvent) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const current = getNearestCardIndex(scroller);
    const last = images.length - 1;

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (current > 0) goToIndex(current - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (current < last) goToIndex(current + 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goToIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goToIndex(last);
    }
  };

  return (
    <div
      className={`fanny-ideations-carousel relative ${className}`}
      role="region"
      aria-label={regionLabel}
      aria-roledescription="carousel"
    >
      <div
        ref={scrollerRef}
        id={scrollerId}
        className="fanny-ideations-scroll outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgba(45,49,56,0.35)] focus-visible:ring-offset-white"
        aria-label={scrollerLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div className="fanny-ideations-scroll__track">
          {images.map((img, i) => (
            <div key={img.src} className="fanny-ideations-scroll__card">
              <Image
                src={img.src}
                alt={img.alt ?? ""}
                width={1200}
                height={800}
                sizes="(max-width: 479px) 65vw, 50vw"
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-3 sm:px-4 md:px-5"
        aria-hidden
      >
        <div className="pointer-events-auto">
          <button
            type="button"
            className="liquid-glass-button liquid-glass-nav liquid-glass-carousel-btn inline-flex size-11 shrink-0 items-center justify-center rounded-full text-[rgba(28,34,40,0.92)] shadow-sm transition-[opacity,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(45,49,56,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-35"
            onClick={() => go(-1)}
            disabled={atStart}
            aria-label={prevLabel}
            aria-controls={scrollerId}
          >
            <ChevronLeft className="relative z-[1] -translate-x-px" />
          </button>
        </div>
        <div className="pointer-events-auto">
          <button
            type="button"
            className="liquid-glass-button liquid-glass-nav liquid-glass-carousel-btn inline-flex size-11 shrink-0 items-center justify-center rounded-full text-[rgba(28,34,40,0.92)] shadow-sm transition-[opacity,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(45,49,56,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-35"
            onClick={() => go(1)}
            disabled={atEnd}
            aria-label={nextLabel}
            aria-controls={scrollerId}
          >
            <ChevronRight className="relative z-[1] translate-x-px" />
          </button>
        </div>
      </div>
    </div>
  );
}
