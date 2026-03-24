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
import { FannySlingBriefSketch } from "@/components/case-study/FannySlingBriefSketch";
import { FannySlingColorStudy } from "@/components/case-study/FannySlingColorStudy";
import { FannySlingIdeationsCarousel } from "@/components/case-study/FannySlingIdeationsCarousel";
import { FannySlingTechPack } from "@/components/case-study/FannySlingTechPack";

export const metadata: Metadata = {
  title: "Photography Fanny Sling",
  description: "Moment Photography Gear Sling by Ellen Huynh.",
};

const W = "/images/webflow";

export default function FannySlingPage() {
  return (
    <CaseStudyShell>
      <CsMax>
        <CsH1>Photography Gear Sling (2018)</CsH1>

        <CsIntroRow>
          <CsIntroCol variant="wide">
            <strong>Client: Moment</strong>
            <br />
            Moment is a mobile photography pioneer, a company that started in the
            heart of Seattle. This was a short project that started from a simple
            idea of finding a better storage method for their current mobile
            lens. It was the first time Moment deviated from hard goods and
            wanted to test the water to create in house soft goods. I got to
            explore a handful of different CMF for a wide variety of
            Moment&apos;s current consumer audience. Dived into hand selected
            fabric and created sewing pattern ready for manufacture. This
            project later snowballed into reality and in the hands of the
            consumers.
          </CsIntroCol>

          <CsIntroCol variant="mid">
            <strong>Disciplines</strong>
            <br />
            Industrial Design, R&amp;D, Soft Good, Sewing, Pattern Making, CMF
            Research
            <br />
            <br />
            <strong>Programs</strong>
            <br />
            Illustrator, &amp; Photoshop
          </CsIntroCol>

          <CsIntroCol variant="right">
            <strong>Elsewhere</strong>
            <br />
            <a
              href="https://www.shopmoment.com/products/moment-mtw-fanny-sling-2l/2020-black-ripstop"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass-button liquid-glass-pill liquid-glass-nav inline-block max-w-full break-all text-[9px] font-bold md:text-[11px]"
            >
              Moment Fanny Sling
            </a>
          </CsIntroCol>
        </CsIntroRow>
      </CsMax>

      <CsBleedImgAfterIntro src={`${W}/5db6711d19de5556e2f00d6e_momentfanny.jpg`} />

      <CsSection first>
        <FannySlingBriefSketch />
        <div className="mt-12 sm:mt-14 md:mt-16 lg:mt-20">
          <CsH2>Target Audience</CsH2>
        </div>
        <div className="mt-6 sm:mt-8 md:mt-10 mb-8 md:mb-12">
          <FannySlingIdeationsCarousel
            images={[
              { src: `${W}/5dc66119205897032c7ad70d_123.jpg` },
              { src: `${W}/5dc66123d6571e511abacf83_1233.jpg` },
              { src: `${W}/5dc661242058972d327ad719_1235.jpg` },
            ]}
            regionLabel="Target audience reference carousel"
            scrollerLabel="Target audience images — use arrow keys to change slides"
            prevLabel="Previous target audience image"
            nextLabel="Next target audience image"
          />
        </div>
      </CsSection>

      <CsBleedImg src={`${W}/5db675965e46c14138778184_sketchesbag.jpg`} />

      <div className="mt-12 sm:mt-14 md:mt-16 lg:mt-20">
        <CsSection>
          <CsH2>Color &amp; Material Study</CsH2>
          <div className="mt-6 sm:mt-7 md:mt-9 md:pb-1">
            <FannySlingColorStudy />
          </div>
        </CsSection>
      </div>

      <FannySlingIdeationsCarousel
        className="mb-0 mt-8 sm:mt-10 md:mt-12 lg:mt-14"
        images={[
          { src: `${W}/5dc66126d6571e5f37bacf9a_1232.jpg` },
          { src: `${W}/5dc661246ade636ddef03459_1234.jpg` },
          { src: `${W}/5dc6612652f69f304b8640a2_1236.jpg` },
        ]}
      />

      <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-20">
        <CsSection>
          <FannySlingTechPack />
        </CsSection>
      </div>

      <CsSection>
        <div className="mt-8 sm:mt-10 md:mt-14 lg:mt-16 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <CsH2>Final Design</CsH2>
        </div>
      </CsSection>

      <div>
        <CsBleedImg src={`${W}/5dc89cec11520ec04eeea2db_TEALBAG.jpg`} />
        <CsSection>
          <div className="mt-8 sm:mt-10 md:mt-14 lg:mt-16">
            <CsH2>Post Design Hand Off</CsH2>
            <CsBody center>
              Executed by Moment following design delivery. Involvement
              concluded at design delivery.
            </CsBody>
          </div>
        </CsSection>
        <CsBleedImg
          src={`${W}/5db67cb65613b1bc1506720b_Screen%20Shot%202019-10-27%20at%2010.28.20%20PM.png`}
        />
        <CsBleedImg
          src={`${W}/5f5986010011268456326832_moment%20cinch%20hazy.jpg`}
          className="mb-10 mt-0 h-full w-full md:mb-20"
        />
      </div>

      <CsSection>
        <CsH2>Key Design Takeaways</CsH2>
        <CsBody extrabold>
          <strong>From original concept</strong> Dedicated divider compartment
          for Moment mobile lenses. Pocket cut out for variety of phone models
          with the ability to keep lenses attach for those on the go adventures.
          Durable Rip-stop Nylon. Ability to cinch down to slimmer profile.
          Photography by Moment.
          <br />
          <br />
          Currently available at{" "}
          <a
            href="https://www.shopmoment.com/shop/fanny-sling/black-ripstop"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            www.shopmoment.com
          </a>
          .
        </CsBody>
      </CsSection>
    </CaseStudyShell>
  );
}
