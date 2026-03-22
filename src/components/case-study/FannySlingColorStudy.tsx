/**
 * Replacement for legacy colorstudy.jpg — crisp, scalable material board.
 * Materials align with on-page copy (ripstop nylon, softgoods CMF) + typical sling trims.
 */

import { csCopy } from "@/components/case-study/CaseStudyPrimitives";

const SWATCHES: {
  name: string;
  detail: string;
  className: string;
}[] = [
  {
    name: "Black ripstop nylon",
    detail: "Shell — durable grid weave (shipping black)",
    className: "fanny-swatch--ripstop-black",
  },
  {
    name: "Charcoal ripstop",
    detail: "Alternate shell tone for CMF study",
    className: "fanny-swatch--ripstop-gray",
  },
  {
    name: "Teal PU / coating",
    detail: "Accent colorway exploration (see teal concept)",
    className: "fanny-swatch--teal",
  },
  {
    name: "Poly mesh lining",
    detail: "Lightweight interior panels",
    className: "fanny-swatch--mesh",
  },
  {
    name: "Nylon pack cloth",
    detail: "Pocket & divider faces",
    className: "fanny-swatch--packcloth",
  },
  {
    name: "Webbing — black",
    detail: "Straps & compression",
    className: "fanny-swatch--webbing",
  },
  {
    name: "Hypalon / TPU patch",
    detail: "Brand hit & reinforcement",
    className: "fanny-swatch--hypalon",
  },
  {
    name: "Coated zipper tape",
    detail: "Weather-facing closures",
    className: "fanny-swatch--zipper",
  },
];

export function FannySlingColorStudy() {
  return (
    <figure className="mt-0 w-full">
      <div className="mx-auto w-full max-w-[940px] px-6 sm:px-5 md:px-6">
        <div className="grid grid-cols-4 gap-1 sm:gap-2 md:gap-4">
          {SWATCHES.map((s) => (
            <div
              key={s.name}
              className="group flex flex-col overflow-hidden rounded-md border border-[#303030]/12 bg-white"
            >
              <div
                className={`relative aspect-[4/3] w-full ${s.className}`}
                aria-hidden
              />
              <div className="border-t border-[#303030]/08 px-1 py-1.5 sm:px-2.5 sm:py-2 md:px-3 md:py-2.5">
                <p className={`m-0 ${csCopy} text-[#303030] md:font-bold`}>
                  {s.name}
                </p>
                <p className={`mt-0.5 mb-0 ${csCopy} text-[#303030]/65 sm:mt-1`}>
                  {s.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}
