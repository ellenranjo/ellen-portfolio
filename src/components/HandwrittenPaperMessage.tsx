"use client";

/**
 * Visual direction: bold marker / graffiti handwriting similar in spirit to
 * “Mark” (GraphicRiver). That font is licensed separately—we use Google’s
 * Permanent Marker here as a close free alternative.
 */
import { Permanent_Marker } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const marker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const MESSAGE =
  "hey! my name is Ellen. 6+ years in wearables and consumer goods.";

const CHARS = Array.from(MESSAGE);
const TOTAL = CHARS.length;
const WORDS = MESSAGE.split(" ");

const INITIAL_DELAY_MS = 35;
// Slight overlap with glyph stroke duration for smoother continuous flow.
const STEP_MS = 52;

export function HandwrittenPaperMessage() {
  const [drawnCount, setDrawnCount] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDrawnCount(TOTAL);
      return;
    }

    let i = 0;

    const tick = () => {
      if (i >= TOTAL) return;
      i += 1;
      setDrawnCount(i);
      if (i >= TOTAL) return;
      timersRef.current.push(setTimeout(tick, STEP_MS));
    };

    timersRef.current.push(setTimeout(tick, INITIAL_DELAY_MS));

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const activeIndex = drawnCount - 1; // -1 => nothing drawn

  return (
    <>
      <p className="sr-only">{MESSAGE}</p>
      <div
        className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center px-[6%] py-[9%] pt-[11%]"
        aria-hidden="true"
      >
        {/* Was rotate-90; +180° correction for legibility ⇒ 270° (= -90°) */}
        <div
          className={`flex max-h-[92%] max-w-[92%] origin-center -rotate-90 items-center justify-center ${marker.className}`}
        >
          {/* Use div (not p): global `p { font-size: 12px }` overrides Tailwind utilities */}
          <div
            className={`handwritten-paper-visible ${marker.className} text-balance text-center tracking-wide text-[#1a1a1a] leading-relaxed`}
          >
            {WORDS.map((word, wordIdx) => {
              const startIndex =
                WORDS.slice(0, wordIdx).reduce(
                  (sum, prevWord) => sum + prevWord.length + 1,
                  0,
                );
              const isLastWord = wordIdx === WORDS.length - 1;
              const spaceIndex = startIndex + word.length;

              return (
                <span key={`${word}-${wordIdx}`} className="inline-block whitespace-nowrap">
                  {Array.from(word).map((char, charIdx) => {
                    const idx = startIndex + charIdx;
                    const isRevealed = idx < drawnCount;
                    const isActive = idx === activeIndex;
                    return (
                      <span key={idx} className="relative inline-block">
                        <span className={isRevealed ? "opacity-100" : "opacity-0"}>
                          {char}
                        </span>
                        {isActive ? (
                          <span className="pen-handwrite-glyph absolute inset-0">
                            {char}
                          </span>
                        ) : null}
                      </span>
                    );
                  })}
                  {!isLastWord ? (
                    <span className="relative inline-block">
                      <span className={spaceIndex < drawnCount ? "opacity-100" : "opacity-0"}>
                        {"\u00A0"}
                      </span>
                    </span>
                  ) : null}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
