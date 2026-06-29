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
  SpecsInsetVideoPair,
} from "./SpecsInsetVideo";
import { SpecsInsetImg } from "./SpecsInsetImg";
import { SpecsInsetImgCarousel } from "./SpecsInsetImgCarousel";

export const metadata: Metadata = {
  title: "SPECS AR Glasses",
  description: "SPECS AR Glasses case study by Ellen Huynh.",
};

const FRONT_FRAME_VIDEO =
  "/images/specs-ar-glasses/front-frame-rotating-view.mp4";
const WAVE_EXPLODED_IMAGE = "/images/specs-ar-glasses/wave-exploded.png";
const CASTING_NAV_VIDEOS = [
  "/images/specs-ar-glasses/1p-casting-fixed-uhd.mp4",
  "/images/specs-ar-glasses/1p-navigation-01-uhd.mp4",
] as const;
const INSTAGRAM_VIDEO = "/images/specs-ar-glasses/instagram-video.mp4";
const INTERFACE_IMAGE = "/images/specs-ar-glasses/interface.png";
const PRESCRIPTION_IMAGE = "/images/specs-ar-glasses/prescription.png";
const SNAPDRAGON_IMAGE = "/images/specs-ar-glasses/snapdragon.png";
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
const FRONT_CASE_SHADOW_IMAGE =
  "/images/specs-ar-glasses/260522-front-case-shadow.png";
const FRONTVIEW_LED_VIDEO =
  "/images/specs-ar-glasses/frontview-recording-led.mp4";
const INCONTEXT_STILLS = [
  "/images/specs-ar-glasses/incontext-0010-077.jpg",
  "/images/specs-ar-glasses/incontext-0050-069.jpg",
  "/images/specs-ar-glasses/incontext-0030-072.jpg",
  "/images/specs-ar-glasses/incontext-0110-039.jpg",
  "/images/specs-ar-glasses/incontext-0040-080.jpg",
] as const;

const INCONTEXT_STILL_LABELS = [
  "In context",
  "In context",
  "In context",
  "In context",
  "In context",
] as const;

const INCONTEXT_STILL_DIMENSIONS = [
  { width: 3858, height: 3000 },
  { width: 4556, height: 3000 },
  { width: 4055, height: 3000 },
  { width: 3302, height: 3000 },
  { width: 4069, height: 3000 },
] as const;

export default function SpecsArGlassesPage() {
  return (
    <CaseStudyShell>
      <CsMax>
        <CsH1>SPECS AR Glasses [2026]</CsH1>

        <CsIntroRow>
          <CsIntroCol variant="wide">
            <strong>SPECS</strong>
            <br />
            A standalone augmented reality platform that integrates waveguide
            optics, onboard computing, AI, advanced sensing, and hand tracking
            into a compact form factor. Designed to deliver immersive spatial
            experiences while maintaining comfort, durability, and wearability.
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
            ID Glasses Lead: Mathias Hintermann
            <br />
            ID Accessories Lead: Ellen Huynh
            <br />
            Charging Ecosystem Lead: Ellen Huynh
            <br />
            Surfacing: Emin Abranians
            <br />
            3D Visuals: Baron &amp; Baron, Heeju Kim
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

      <CsSection first>
        <CsH2>SPECS</CsH2>
        <CsBody>
          Fully standalone, with no puck and no tether. 51° field of view
          display. Powered by two Snapdragon processors to enable fast hand
          tracking, low latency, and responsive interactions that help digital
          content feel anchored in the real world.
        </CsBody>
      </CsSection>

      <SpecsInsetImg
        src={WAVE_EXPLODED_IMAGE}
        width={2880}
        height={1620}
        className="mb-10 md:mb-20"
      />

      <SpecsInsetVideoPair sources={CASTING_NAV_VIDEOS} />

      <SpecsInsetImgCarousel
        sources={HERO_STILLS}
        labels={HERO_STILL_LABELS}
        priorityFirstSlide
        regionLabel="Product views carousel"
        prevLabel="Previous product view"
        nextLabel="Next product view"
      />

      <CsSection className="mt-10">
        <CsH2>The Hardware</CsH2>
        <CsBody extrabold>
          <strong>Responsibilities</strong>{" "}
          Contributed to the industrial design of SPECS AR glasses, guiding product styling, ergonomics, and
          wearability from concept through production. Collaborated with product,
          engineering, human factors, and manufacturing to streamline fit studies,
          evaluate hinge concepts, validate comfort across diverse users, and
          integrate complex computing hardware into a compact wearable form factor.
          Defined the charging interface on the glasses, seamlessly integrating
          functional charging features into the product&apos;s design language as a
          distinctive aesthetic detail while establishing the foundation for the
          broader charging ecosystem.
        </CsBody>
      </CsSection>

      <SpecsInsetVideo src={INSTAGRAM_VIDEO} className="mt-0 mb-10 md:mb-20" />
      <SpecsInsetImg
        src={PRESCRIPTION_IMAGE}
        width={2880}
        height={1620}
        className="mb-10 md:mb-20"
      />
      <SpecsInsetImg
        src={INTERFACE_IMAGE}
        width={2880}
        height={1620}
        className="mb-10 md:mb-20"
      />
      <SpecsInsetImg
        src={SNAPDRAGON_IMAGE}
        width={2880}
        height={1620}
        className="mb-10 md:mb-20"
      />

      <CsSection className="mt-10">
        <CsH2>Charging Ecosystem</CsH2>
        <CsBody extrabold>
          <strong>Responsibilities</strong>{" "}
          Led the industrial design of the complete charging ecosystem and
          accessories for Specs, including the charging case and charging
          cable/data cable. Defined a cohesive accessory experience that extended
          the product language while addressing usability, durability,
          manufacturing, and everyday portability.
        </CsBody>
      </CsSection>

      <SpecsInsetVideo src={CASE_INSERTED_VIDEO} className="mb-10 md:mb-20" />
      <SpecsInsetImg
        src={FRONT_CASE_SHADOW_IMAGE}
        width={2750}
        height={1719}
        className="mb-10 md:mb-20"
      />

      <SpecsInsetVideo src={FRONTVIEW_LED_VIDEO} className="mb-10 md:mb-20" />
      <SpecsInsetImgCarousel
        sources={INCONTEXT_STILLS}
        labels={INCONTEXT_STILL_LABELS}
        dimensions={INCONTEXT_STILL_DIMENSIONS}
        regionLabel="In context photography carousel"
        prevLabel="Previous in context photo"
        nextLabel="Next in context photo"
      />
    </CaseStudyShell>
  );
}
