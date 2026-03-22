import type { Metadata } from "next";
import { CaseStudyShell } from "@/components/CaseStudyShell";
import {
  CsBleedImg,
  CsBleedImgAfterIntro,
  CsBody,
  CsH1,
  CsH2,
  CsIntroCol,
  CsIntroRow,
  CsMax,
  CsSection,
} from "@/components/case-study/CaseStudyPrimitives";

export const metadata: Metadata = {
  title: "Pixy",
  description: "Pixy case study by Ellen Huynh.",
};

const HERO =
  "https://cdn.prod.website-files.com/5db14aa8083f4b2beca01d43/6405941859ee2c0de3f81ef2_220228_BROOKS_STILLS_ENCINO_GEN-Z_PRODUCT-STRAP_192.jpg";
const ROCK =
  "https://cdn.prod.website-files.com/5db14aa8083f4b2beca01d43/64059d2008d407ecd8a92797_220302_BROOKS_STILLS_WEESHA-CLUB_STILL-LIFE_PRODUCT-ON-ROCK_009.jpg";
const PIXY2 =
  "https://cdn.prod.website-files.com/5db14aa8083f4b2beca01d43/64059d2cbdf9c611d6aec5ed_pixy2.jpg";

const STRAP = "/images/Pixystrap.png";
/** Local asset: `public/images/pixystrap2.png` */
const BUMPER = "/images/pixystrap2.png";

export default function PixyPage() {
  return (
    <CaseStudyShell>
      <CsMax>
        <CsH1>Pixy (2022)</CsH1>

        <CsIntroRow>
          <CsIntroCol variant="wide">
            <strong>Pixy - Flying Camera</strong>
            <br />
            Pixy is a compact camera drone that was designed to allow users to
            take selfies and videos from unique aerial perspectives by simply
            launching it from their hand and have it follow them around. The idea
            was to streamline photos and footage to automatically sync with the
            Snapchat App to share with family and friends. Contribution included
            the carrying strap, bumper protector, and packaging.
          </CsIntroCol>

          <CsIntroCol variant="mid">
            <strong>Disciplines</strong>
            <br />
            Industrial Design, Packaging
          </CsIntroCol>

          <CsIntroCol variant="right">
            <strong>Website</strong>
            <br />
            <a
              href="https://www.pixy.com/"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass-button liquid-glass-pill liquid-glass-nav inline-block max-w-full break-all text-[9px] font-bold md:text-[11px]"
            >
              https://www.pixy.com/
            </a>
          </CsIntroCol>
        </CsIntroRow>
      </CsMax>

      <CsBleedImgAfterIntro src={PIXY2} />

      <CsSection first>
        <CsH2>The Hardware</CsH2>
        <CsBody extrabold>
          <strong>Responsibilities</strong> Design support on the main device
          hardware and product proposition. Assisted in ID quality inspection
          and design guidelines. Responsible for accessories that were offered
          with Pixy, including protective bumper, carrying strap, and packaging.
          <br />
          <strong>Function</strong> Pixy is designed to take selfies and short
          videos by flying in pre-programmed patterns like hovering, orbiting,
          or following the user, all controlled by a simple button press.
          <br />
          <strong>Integration</strong>{" "}Bumper &amp; Strap incorporating a fun
          and fashionable way to carry the product.
          <br />
          <strong>Value Prop.</strong> While most drones on the market are
          intimidating and confusing to use, Pixy offers a more approachable,
          user friendly design to engage Snapchat core users to take photos and
          footage handsfree.
        </CsBody>
      </CsSection>

      <CsBleedImg src={HERO} className="mb-10 h-full w-full md:mb-20" />

      <CsSection>
        <CsH2>Accessories</CsH2>
        <CsBody extrabold>
          <strong>Responsibilities</strong> Led design direction, CMF direction,
          and usability testing for the accessories. Influenced product use case
          and product value prop.
          <br />
          <strong>Carrying Strap</strong>{" "}Inspired by Off White, bringing a
          fashion forward statement in wearable products. Defining what
          &apos;wearable product&apos; means.
          <br />
          <strong>Bumper</strong> Offers a protective barrier for everyday use
          and allows the product to be accessible and easy to release product
          from carrier.
        </CsBody>
      </CsSection>

      <CsBleedImg
        src={STRAP}
        className="h-full w-full"
      />

      <CsBleedImg
        src={BUMPER}
        className="mb-10 h-full w-full md:mb-20"
      />

      <CsSection>
        <CsH2>Packaging</CsH2>
        <CsBody extrabold>
          <strong>Responsibilities</strong> Generated artwork and design themes
          for the packaging. Supported design lead on CAD and influenced
          unboxing experience.
          <br />
          <strong>Unboxing Experience</strong> Crafted to offer a clear view of
          the product, moving away from the dark, serious CE packaging by
          creating a fun and engaging unboxing experience.
          <br />
          <strong>CMF</strong>{" "}The shades of color choices were curated to be
          friendly and inviting, while still staying true to the brand&apos;s
          language.
        </CsBody>
      </CsSection>

      <CsBleedImg src={ROCK} className="mb-10 h-full w-full md:mb-20" />
    </CaseStudyShell>
  );
}
