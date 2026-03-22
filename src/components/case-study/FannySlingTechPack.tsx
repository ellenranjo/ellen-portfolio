import {
  CsBody,
  CsH2,
  csCopy,
  csSectionWidth,
} from "@/components/case-study/CaseStudyPrimitives";

/** Panel titles: no `csCopy` (avoids font-light vs font-bold cascade); +1px on mobile vs body */
const techPackPanelTitle =
  "font-sans text-[10px] font-bold leading-[15px] tracking-[0.5px] text-[#303030] md:text-[11px] md:leading-[18px] md:tracking-[0.3px] lg:text-[12px] lg:leading-[18px]";

const SPEC_IMAGE = "/images/momentpattern.svg";

const PANELS: {
  id: string;
  title: string;
  items: string[];
}[] = [
  {
    id: "front",
    title: "Front panel",
    items: [
      "Overall width 7″",
      "Upper zone 1.5″ · lower zone 2.5″",
      "Front pocket ~2″ tall (angled opening)",
      "Center nylon strap 0.8″ · tab + gunmetal G-hook",
      "Corner radius 2 × r0.3″",
      "Top stitch · zipper stop callout",
    ],
  },
  {
    id: "back",
    title: "Back panel",
    items: [
      "Panel 7″ × 4.5″",
      "Center back sleeve",
      "Side tab: 2″ extension · 2″ → 1″ taper",
      "Gunmetal buckle at tab end",
    ],
  },
  {
    id: "components",
    title: "Components & hardware",
    items: [
      "10″ YKK zipper (1″ tape width)",
      "Bottom panel 13.25″ × 1.8″",
      "Gunmetal G-hook 1″",
      "Gunmetal buckle 0.8″",
    ],
  },
];

export function FannySlingTechPack() {
  return (
    <div className="fanny-tech-pack">
      <CsH2>Pattern Specification</CsH2>
      <CsBody center>
        Manufacturing-ready tech pack: panel geometry, zipper run, and hardware
        sizes for sew &amp; assembly.
      </CsBody>

      <figure className="fanny-tech-pack__figure mx-auto mt-0 w-full max-w-[min(100vw,1040px)] px-6 sm:px-5 md:px-6">
        <div className="fanny-tech-pack__frame overflow-hidden rounded-md">
          <img
            src={SPEC_IMAGE}
            alt="Moment sling pattern: technical line drawing with panel dimensions, zipper run, and hardware callouts."
            className="h-auto w-full"
            loading="lazy"
            decoding="async"
          />
        </div>
      </figure>

      <div
        className={`${csSectionWidth} mx-auto mt-8 grid max-w-4xl gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 md:mt-12 md:grid-cols-3`}
      >
        {PANELS.map((panel) => (
          <div
            key={panel.id}
            className="fanny-tech-pack__card rounded-md border border-[#303030]/10 bg-white px-3 py-3.5 sm:px-4 sm:py-4"
          >
            <h3
              className={`m-0 border-b border-[#303030]/10 pb-2 ${techPackPanelTitle}`}
            >
              {panel.title}
            </h3>
            <ul className="mb-0 mt-2.5 list-none space-y-1.5 p-0">
              {panel.items.map((line) => (
                <li
                  key={line}
                  className={`${csCopy} relative pl-3 text-[#303030] before:absolute before:left-0 before:top-[0.55em] before:h-0.5 before:w-0.5 before:rounded-full before:bg-[#303030]/35 sm:pl-3.5 sm:before:h-1 sm:before:w-1`}
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className={`mx-auto text-left ${csSectionWidth} mt-6 sm:mt-8 md:mt-10 mb-6 sm:mb-8 md:mb-16 lg:mb-20`}
      >
        <div className={`${csCopy} [&_strong]:font-extrabold`}>
          <strong>Legend</strong> Dashed lines indicate stitches. Measurements
          are exact; additional seam allowance follows material and manufacturer.
        </div>
      </div>
    </div>
  );
}
