import type { Metadata } from "next";
import { CaseStudyShell } from "@/components/CaseStudyShell";
import {
  CsBody,
  CsH1,
  CsH2,
  CsIntroCol,
  CsIntroRow,
  CsMax,
  CsSection,
} from "@/components/case-study/CaseStudyPrimitives";
import {
  SpecsInsetVideo,
  SpecsInsetVideoAfterIntro,
} from "./SpecsInsetVideo";
import { SpecsInsetImgCarousel } from "./SpecsInsetImgCarousel";

export const metadata: Metadata = {
  title: "SPECS AR Glasses",
  description: "SPECS AR Glasses case study by Ellen Huynh.",
};

const FRONT_FRAME_VIDEO =
  "/images/specs-ar-glasses/front-frame-rotating-view.mp4";
const INSTAGRAM_VIDEO = "/images/specs-ar-glasses/instagram-video.mp4";
const INSTAGRAM_VIDEO_2 = "/images/specs-ar-glasses/instagram-video-2.mp4";
const HERO_STILLS = [
  "/images/specs-ar-glasses/260527-front-view-folded-shadow.png",
  "/images/specs-ar-glasses/260522-frontview-2.png",
  "/images/specs-ar-glasses/260527-frontview-tinted-1.png",
  "/images/specs-ar-glasses/260527-sideview-1.png",
  "/images/specs-ar-glasses/2605023-3-4-view-3.png",
] as const;

const HERO_STILL_LABELS = [
  "Folded view",
  "Front view",
  "Tinted front view",
  "Side view",
  "Three-quarter view",
] as const;
const CASE_INSERTED_VIDEO = "/images/specs-ar-glasses/case-inserted.mp4";
const FRONTVIEW_LED_VIDEO =
  "/images/specs-ar-glasses/frontview-recording-led.mp4";

export default function SpecsArGlassesPage() {
  return (
    <CaseStudyShell>
      <CsMax>
        <CsH1>SPECS AR Glasses [2026]</CsH1>

        <CsIntroRow>
          <CsIntroCol variant="wide">
            <strong>SPECS - Wireless AR Glasses</strong>
            <br />
            SPECS are a standalone wearable computer that blend the digital and
            physical worlds through lightweight, see-through glasses. Designed for
            real life, the form factor packs advanced sensors, a see-through
            display, and high-performance AI into a sleek frame crafted from
            Swiss TR90 polymer — weighing just 132 grams at 47mm. A neutral front
            frame and ergonomic temples are designed to fit a wide range of face
            sizes and shapes for all-day wear.
          </CsIntroCol>

          <CsIntroCol variant="mid">
            <strong>Disciplines</strong>
            <br />
            Industrial Design, CMF, and Packaging.
            <br />
            <br />
            <strong>Credits</strong>
            <br />
            Creative Director: Evan Spiegel
            <br />
            ID Lead Glasses: Mathias Hintermann
            <br />
            ID Accessories Lead: Ellen Huynh
            <br />
            Charging Ecosystem Lead: Ellen Huynh
            <br />
            Surfacing: Emin Abranians
            <br />
            3D Visuals: Baron &amp; Baron
          </CsIntroCol>

          <CsIntroCol variant="right">
            <strong>Website</strong>
            <br />
            <a
              href="https://www.specs.com/"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass-button liquid-glass-pill liquid-glass-nav inline-block max-w-full break-all text-[9px] font-bold md:text-[11px]"
            >
              https://www.specs.com/
            </a>
          </CsIntroCol>
        </CsIntroRow>
      </CsMax>

      <SpecsInsetVideoAfterIntro src={FRONT_FRAME_VIDEO} />

      <SpecsInsetImgCarousel sources={HERO_STILLS} labels={HERO_STILL_LABELS} />

      <CsSection first>
        <CsH2>The Hardware</CsH2>
        <CsBody extrabold>
          <strong>Responsibilities</strong> Design support on front frame design,
          ergonomic wearability, and contributed to the design architecture of
          the device. Lead Designer for all accessories and packaging associated
          with SPECS. Responsible for rendered images and animation produced for
          launch.
        </CsBody>
      </CsSection>

      <SpecsInsetVideo src={INSTAGRAM_VIDEO} className="mt-0 mb-10 md:mb-20" />
      <SpecsInsetVideo src={INSTAGRAM_VIDEO_2} className="mb-10 md:mb-20" />

      <CsSection className="mt-10">
        <CsH2>Charging Ecosystem</CsH2>
        <CsBody extrabold>
          <strong>Responsibilities</strong> Led CMF direction across the frame,
          temples, and touch surfaces — balancing a premium matte-gloss black
          finish with durable Swiss TR90 polymer.
          <br />
          <strong>Materials</strong> Lightweight TR90 frame construction with
          carefully tuned surface finishes for everyday wear and durability.
          <br />
          <strong>Details</strong> Subtle brand integration, sensor housing
          treatments, and color-accurate lens tints designed to complement the
          see-through waveguide display.
        </CsBody>
      </CsSection>

      <SpecsInsetVideo src={CASE_INSERTED_VIDEO} className="mb-10 md:mb-20" />

      <SpecsInsetVideo src={FRONTVIEW_LED_VIDEO} className="mb-10 md:mb-20" />
    </CaseStudyShell>
  );
}
