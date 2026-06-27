"use client";

import Image from "next/image";
import { useCallback, useId, useState } from "react";
import { specsInsetShell } from "./SpecsInsetImg";

const DEFAULT_IMG_WIDTH = 3805;
const DEFAULT_IMG_HEIGHT = 2378;

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

export function SpecsInsetImgCarousel({
  sources,
  labels,
  dimensions,
  className = "mb-10 md:mb-20",
  regionLabel = "Product views carousel",
  prevLabel = "Previous image",
  nextLabel = "Next image",
}: {
  sources: readonly string[];
  labels?: readonly string[];
  dimensions?: readonly { width: number; height: number }[];
  className?: string;
  regionLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
}) {
  const [active, setActive] = useState(0);
  const carouselId = useId();
  const current = sources[active] ?? sources[0];
  const { width, height } = dimensions?.[active] ??
    dimensions?.[0] ?? {
      width: DEFAULT_IMG_WIDTH,
      height: DEFAULT_IMG_HEIGHT,
    };

  const goPrev = useCallback(() => {
    setActive((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setActive((i) => Math.min(sources.length - 1, i + 1));
  }, [sources.length]);

  const atStart = active <= 0;
  const atEnd = active >= sources.length - 1;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (!atStart) goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (!atEnd) goNext();
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(sources.length - 1);
    }
  };

  if (!current) return null;

  return (
    <div
      className={`${specsInsetShell} ${className}`.trim()}
      role="region"
      aria-label={regionLabel}
      aria-roledescription="carousel"
    >
      <div className="relative w-full overflow-hidden bg-white">
        <div
          id={carouselId}
          tabIndex={0}
          className="outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgba(45,49,56,0.35)] focus-visible:ring-offset-white"
          aria-label="Carousel image — use arrow keys to change slides"
          onKeyDown={onKeyDown}
        >
          <Image
            key={current}
            src={current}
            alt={labels?.[active] ?? `SPECS product view ${active + 1}`}
            width={width}
            height={height}
            sizes="85vw"
            className="block h-auto w-full"
            priority={active === 0}
            decoding="async"
            unoptimized
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-3 sm:px-4 md:px-5"
          aria-hidden
        >
          <div className="pointer-events-auto">
            <button
              type="button"
              className="liquid-glass-button liquid-glass-nav liquid-glass-carousel-btn inline-flex size-11 shrink-0 items-center justify-center rounded-full text-[rgba(28,34,40,0.92)] shadow-sm transition-[opacity,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(45,49,56,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-35"
              onClick={goPrev}
              disabled={atStart}
              aria-label={prevLabel}
              aria-controls={carouselId}
            >
              <ChevronLeft className="relative z-[1] -translate-x-px" />
            </button>
          </div>
          <div className="pointer-events-auto">
            <button
              type="button"
              className="liquid-glass-button liquid-glass-nav liquid-glass-carousel-btn inline-flex size-11 shrink-0 items-center justify-center rounded-full text-[rgba(28,34,40,0.92)] shadow-sm transition-[opacity,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(45,49,56,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-35"
              onClick={goNext}
              disabled={atEnd}
              aria-label={nextLabel}
              aria-controls={carouselId}
            >
              <ChevronRight className="relative z-[1] translate-x-px" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="mt-4 flex items-center justify-center gap-3 md:mt-5 md:gap-4"
        role="tablist"
        aria-label="Product views"
      >
        {sources.map((src, i) => {
          const selected = i === active;
          return (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={labels?.[i] ?? `View ${i + 1}`}
              onClick={() => setActive(i)}
              className={`flex h-8 w-10 shrink-0 items-center justify-center border-0 bg-transparent p-0 transition-opacity duration-200 md:h-10 md:w-12 ${
                selected ? "opacity-100" : "opacity-30 hover:opacity-55"
              }`}
            >
              <Image
                src={src}
                alt=""
                width={48}
                height={30}
                className="h-auto max-h-full w-full object-contain"
                unoptimized
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
