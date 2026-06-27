"use client";

import Image from "next/image";
import { useState } from "react";
import { specsInsetShell } from "./SpecsInsetImg";

const IMG_WIDTH = 1024;
const IMG_HEIGHT = 639;

const THUMB_LABELS = ["Front view", "Side view", "Three-quarter view", "Folded view"];

export function SpecsInsetImgCarousel({
  sources,
  className = "mb-10 md:mb-20",
}: {
  sources: readonly string[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const current = sources[active] ?? sources[0];

  if (!current) return null;

  return (
    <div className={`${specsInsetShell} ${className}`.trim()}>
      <div className="relative w-full overflow-hidden bg-white">
        <Image
          key={current}
          src={current}
          alt={THUMB_LABELS[active] ?? "SPECS product view"}
          width={IMG_WIDTH}
          height={IMG_HEIGHT}
          sizes="70vw"
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
              aria-label={THUMB_LABELS[i] ?? `View ${i + 1}`}
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
