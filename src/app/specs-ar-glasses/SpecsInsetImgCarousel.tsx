"use client";

import Image from "next/image";
import { useState } from "react";
import { specsInsetShell } from "./SpecsInsetImg";

const DEFAULT_IMG_WIDTH = 3805;
const DEFAULT_IMG_HEIGHT = 2378;

export function SpecsInsetImgCarousel({
  sources,
  labels,
  dimensions,
  className = "mb-10 md:mb-20",
}: {
  sources: readonly string[];
  labels?: readonly string[];
  dimensions?: readonly { width: number; height: number }[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const current = sources[active] ?? sources[0];
  const { width, height } = dimensions?.[active] ??
    dimensions?.[0] ?? {
      width: DEFAULT_IMG_WIDTH,
      height: DEFAULT_IMG_HEIGHT,
    };

  if (!current) return null;

  return (
    <div className={`${specsInsetShell} ${className}`.trim()}>
      <div className="relative w-full overflow-hidden bg-white">
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
