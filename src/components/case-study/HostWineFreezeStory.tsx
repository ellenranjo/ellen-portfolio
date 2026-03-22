"use client";

import { useEffect, useRef, useState } from "react";
import {
  csCopy,
  csH2TypographyHalf,
  csHeadingToBodyGapTop,
  csSectionWidth,
} from "@/components/case-study/CaseStudyPrimitives";

type HostWineFreezeStoryProps = {
  /** Previous cup — visible part line / older mold */
  oldDesignSrc: string;
  /** Redesigned cup — part line under band */
  newDesignSrc: string;
  /** True Brands catalog spread */
  catalogSrc: string;
  /** Full-width design loop GIF — shown directly under the catalog image */
  designLoopSrc?: string;
  /** Full-bleed image stacked flush under the design loop (no gap between) */
  postDesignBleedSrc?: string;
};

/**
 * Scroll-triggered, staggered “story” layout for Host Wine Freeze Cup V2 —
 * keeps case-study type scale, adds cards + motion for engagement.
 */
export function HostWineFreezeStory({
  oldDesignSrc,
  newDesignSrc,
  catalogSrc,
  designLoopSrc,
  postDesignBleedSrc,
}: HostWineFreezeStoryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setVisible(true);
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const width = `mx-auto ${csSectionWidth}`;

  return (
    <div
      ref={rootRef}
      className={`host-freeze-story ${csHeadingToBodyGapTop} ${visible ? "host-freeze-story--on" : ""}`}
      aria-label="Host Wine Freeze Cup V2 project story"
    >
      <figure
        className={`host-freeze-story__compare ${width} mb-8 sm:mb-10 md:mb-12`}
        aria-label="Previous Host wine freeze cup design compared to the redesigned cup"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-2 md:gap-4">
          <div className="min-w-0 flex-1">
            <figcaption
              className={`host-freeze-story__compare-label mb-1.5 text-left text-[#303030] ${csH2TypographyHalf}`}
            >
              Old design
            </figcaption>
            <div className="host-freeze-story__compare-frame">
              <img
                src={oldDesignSrc}
                alt="Host wine freeze cup — previous design with visible part line"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div
            className="hidden shrink-0 select-none items-center justify-center pb-6 font-sans text-[14px] text-[#303030]/35 sm:flex md:text-[18px]"
            aria-hidden
          >
            →
          </div>
          <div className="min-w-0 flex-1">
            <figcaption
              className={`host-freeze-story__compare-label mb-1.5 text-left text-[#303030] ${csH2TypographyHalf}`}
            >
              New design
            </figcaption>
            <div className="host-freeze-story__compare-frame">
              <img
                src={newDesignSrc}
                alt="Host wine freeze cup — redesigned silhouette, improved weld and part line"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </figure>

      <div className={`host-freeze-story__grid ${width}`}>
        <article className="host-freeze-story__card host-freeze-story__card--problem host-freeze-story__card--sticky">
          <div className="host-freeze-story__card-head">
            <span className="host-freeze-story__pill" aria-hidden>
              Problem
            </span>
          </div>
          <p className={`${csCopy} mb-0`}>
            The original design and mold created a{" "}
            <span className="host-freeze-story__highlight">30% scrap rate</span>{" "}
            as the sonic weld line placement was very weak. On top of the scrap
            rate issue, the part line on the old design was also in a very
            visible place.
          </p>
        </article>

        <article className="host-freeze-story__card host-freeze-story__card--solution host-freeze-story__card--sticky">
          <div className="host-freeze-story__card-head">
            <span className="host-freeze-story__pill" aria-hidden>
              Solution
            </span>
          </div>
          <p className={`${csCopy} mb-0`}>
            Redesign the silhouette of the Host wine freeze cup without
            changing too much of the original intent to improve the scrap rate.
            Worked closely with engineers to creatively redesign the mold to
            move the part line under the silicone band and resurfaced inner body
            to give the sonic weld area more surface to adhere. Successfully
            improved the design and lowered the scrap rate and overall cost per
            unit.
          </p>
        </article>
      </div>

      <div
        className={`mt-6 w-full sm:mt-8 md:mt-10 ${
          designLoopSrc || postDesignBleedSrc
            ? "mb-10 md:mb-14"
            : "mb-10 md:mb-20"
        }`}
      >
        <div className="host-freeze-story__catalog w-full">
          <img
            src={catalogSrc}
            alt="True Brands catalog — Host wine freeze cup in retail context"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full max-w-none"
          />
        </div>
        {designLoopSrc ? (
          <img
            src={designLoopSrc}
            alt=""
            loading="lazy"
            decoding="async"
            className="mt-0 block h-auto w-full max-w-none"
          />
        ) : null}
        {postDesignBleedSrc ? (
          <img
            src={postDesignBleedSrc}
            alt=""
            loading="lazy"
            decoding="async"
            className="mt-0 block h-auto w-full max-w-none"
          />
        ) : null}
      </div>
    </div>
  );
}
