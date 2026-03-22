"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  csCopy,
  csSectionWidth,
} from "@/components/case-study/CaseStudyPrimitives";

/** Top spacing only — no large bottom margin when a section heading follows the sketch. */
const sketchTopSpacing =
  "mt-4 sm:mt-5 md:mt-7 lg:mt-9 xl:mt-10";

type SketchRow = {
  label: string;
  body: string;
  tilt: string;
  doodle: "problem" | "spark" | "people" | "frame" | "swatch";
};

const ROWS: SketchRow[] = [
  {
    label: "Problem",
    body: "Moment’s mobile photographers needed a smaller, more compact carry than a backpack — without leaving essential gear behind.",
    tilt: "-0.35deg",
    doodle: "problem",
  },
  {
    label: "Solution",
    body: "Design a versatile, functional transportation vessel for mobile lenses and everyday items the urban user carries.",
    tilt: "0.4deg",
    doodle: "spark",
  },
  {
    label: "Target audience",
    body: "Urban // everyday mobile photographer.",
    tilt: "-0.25deg",
    doodle: "people",
  },
  {
    label: "Deliverables",
    body: "3–5 concepts and CMF direction.",
    tilt: "0.3deg",
    doodle: "frame",
  },
  {
    label: "Style direction",
    body: "Minimal — a pack that works on both functional and aesthetic levels. Refresh the existing line and follow current CMF trends.",
    tilt: "-0.2deg",
    doodle: "swatch",
  },
];

function SketchDoodle({ kind }: { kind: SketchRow["doodle"] }) {
  const common = "text-[#303030]/45";
  switch (kind) {
    case "problem":
      return (
        <svg
          className={`${common} h-8 w-10 shrink-0`}
          viewBox="0 0 40 32"
          fill="none"
          aria-hidden
        >
          <path
            d="M8 22c4-8 12-14 22-10 4 2 6 8 2 12-5 5-14 2-18-2"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="14" cy="12" r="2.5" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case "spark":
      return (
        <svg
          className={`${common} h-8 w-8 shrink-0`}
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden
        >
          <path
            d="M16 4l1.5 6 6 1.5-6 1.5L16 20l-1.5-6-6-1.5 6-1.5L16 4z"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "people":
      return (
        <svg
          className={`${common} h-8 w-10 shrink-0`}
          viewBox="0 0 40 32"
          fill="none"
          aria-hidden
        >
          <circle cx="13" cy="11" r="4" stroke="currentColor" strokeWidth="1.1" />
          <path
            d="M6 26c1-5 5-8 10-8s9 3 10 8"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <circle cx="27" cy="12" r="3.5" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case "frame":
      return (
        <svg
          className={`${common} h-8 w-8 shrink-0`}
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden
        >
          <rect
            x="5"
            y="7"
            width="22"
            height="18"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="3 2"
          />
        </svg>
      );
    case "swatch":
      return (
        <svg
          className={`${common} h-8 w-10 shrink-0`}
          viewBox="0 0 40 32"
          fill="none"
          aria-hidden
        >
          <rect x="4" y="10" width="10" height="14" rx="1" stroke="currentColor" strokeWidth="1" />
          <rect x="15" y="10" width="10" height="14" rx="1" stroke="currentColor" strokeWidth="1" />
          <rect x="26" y="10" width="10" height="14" rx="1" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
  }
}

export function FannySlingBriefSketch() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setActive(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`fanny-sketch-pad mx-auto ${csSectionWidth} origin-top text-left ${csCopy} ${sketchTopSpacing} max-md:scale-[0.88] md:scale-100`}
    >
      <div className="fanny-sketch-inner relative z-[1] overflow-visible px-4 pb-4 pt-5 sm:px-5 sm:pb-6 sm:pt-8 md:px-7 md:pb-8 md:pt-9">
        <p className="mb-3 font-sans text-[9px] font-normal uppercase tracking-[0.32em] text-[#303030]/45 sm:mb-4 md:mb-5 md:text-[9px]">
          Project brief
        </p>
        <ul className="m-0 list-none space-y-4 p-0 sm:space-y-5 md:space-y-6">
          {ROWS.map((row, i) => (
            <li
              key={row.label}
              className={`fanny-sketch-row ${active ? "fanny-sketch-row--on" : ""}`}
              style={
                {
                  "--sketch-delay": `${80 + i * 130}ms`,
                  "--sketch-tilt": row.tilt,
                } as CSSProperties
              }
            >
              <div
                className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4"
                style={{ transform: `rotate(${row.tilt})` }}
              >
                <SketchDoodle kind={row.doodle} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#303030] sm:text-[11px] md:tracking-[0.25em]">
                      {row.label}
                    </span>
                    <span className="fanny-sketch-underline mt-1 block max-w-full" aria-hidden />
                  </div>
                  <p className="mt-1.5 mb-0 text-pretty sm:mt-2">
                    {row.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
