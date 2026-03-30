import type { Metadata } from "next";
import Image from "next/image";
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
import { CaseStudyImageCarousel } from "@/components/case-study/CaseStudyImageCarousel";
import { HostWineFreezeStory } from "@/components/case-study/HostWineFreezeStory";

export const metadata: Metadata = {
  title: "Wine and Bar Accessories",
  description: "Wine and bar accessories for True Zoo / True Brands by Ellen Huynh.",
};

const W = "/images/webflow";

export default function BarWineAccessoriesPage() {
  return (
    <CaseStudyShell>
      <CsMax>
        <CsH1>Wine and Bar Accessories</CsH1>

        <CsIntroRow>
          <CsIntroCol variant="wide">
            <strong>Brand: True Zoo, Host by True Brands</strong>
            <br />
            Lead creative direction on new product development for consumer wine
            &amp; barware products across 10 different inhouse brands.
            Responsible for end to end product development from initial concepts
            to final production. Includes all aspects of the design process
            including R&amp;D, sketching, CAD development, product testing, and
            working with overseas manufacturers.
          </CsIntroCol>

          <CsIntroCol variant="mid">
            <strong>Responsibilities</strong>
            <br />
            Sketching, Parametric modeling, Product Design Development, CMF,
            Prototyping, and DFM
          </CsIntroCol>

          <CsIntroCol variant="right">
            <strong>Focus</strong>
            <br />
            Wine &amp; barware NPD across in-house brands.
          </CsIntroCol>
        </CsIntroRow>
      </CsMax>

      <CaseStudyImageCarousel
        className="carousel--contain mt-6 mb-12 w-full md:mt-8 md:mb-16"
        images={[
          {
            src: `${W}/62a00c160fc390082f47130c_Penguin-foil.gif`,
            alt: "Pinot penguin foil opener",
          },
          {
            src: `${W}/5f6a607d674542e0985db211_9035_add2.jpg`,
            alt: "Host Insta-chill Pack product",
          },
          {
            src: `${W}/5f6a607d97081f6f6b62672f_9035_act1.jpg`,
            alt: "Host Insta-chill Pack product",
          },
          {
            src: `${W}/5f6a607dec3ebf1ad1642770_9035_act2.jpg`,
            alt: "Host Insta-chill Pack product",
          },
          {
            src: `${W}/62a017fb0fc390f598476841_eagle%20true%20zoo.jpg`,
            alt: "Baldwin the Eagle product",
          },
        ]}
        regionLabel="Wine and bar product images"
        scrollerLabel="Product images — swipe or use arrow keys"
        prevLabel="Previous product image"
        nextLabel="Next product image"
      />

      <CsSection first className="!mt-14 md:!mt-20">
        <CsH2>Host Wine Freeze Cup V2</CsH2>
        <HostWineFreezeStory
          oldDesignSrc={`${W}/62a031fe0ebb7d469ca9faa2_very%20older%20part%20line.jpeg`}
          newDesignSrc={`${W}/62a032013482a7cef968d31d_old%20host%20cup.jpeg`}
          catalogSrc={`${W}/62a030e16afcff5445e0aba8_catalog%20truebrands.PNG`}
          designLoopSrc={`${W}/5e5c5e6e512f4e5fa8ac0b79_design-loop.gif`}
          postDesignBleedSrc={`${W}/62a0309458d737b33d73584f_host2.png`}
        />
      </CsSection>

      <CsSection>
        <CsH2>Host Insta-Chill Softgoods Line</CsH2>
        <CsBody extrabold>
          Host soft goods line incorporates True Brand&apos;s proprietary cooling
          gel that will chill any room temperature drink. This series includes a
          cooling tote and backpack that has removeable gel packs. Outer
          materials uses waterproof durable material, YKK zippers, Nylon hand
          straps, and waterproof insulated inner liner with multiple pockets and
          organization for smaller and larger items.
          <br />
          <br />
          <strong>Responsibilities</strong> Market research, concept
          development, CMF, and Soft-goods guideline
        </CsBody>
      </CsSection>

      <CaseStudyImageCarousel
        className="mt-6 mb-3 w-full md:mt-8 md:mb-4"
        images={[
          { src: `${W}/62a03e18360ef619fcd63eda_koozie4.jpg`, alt: "Koozie variant" },
          { src: `${W}/62a03e1ae115135dd56e8c28_koozie5.jpg`, alt: "Koozie variant" },
        ]}
        regionLabel="Pinot the Penguin product images"
        scrollerLabel="Pinot product images — swipe or use arrow keys"
        prevLabel="Previous Pinot product image"
        nextLabel="Next Pinot product image"
      />

      <div className="flex w-full flex-col gap-0">
        <Image
          src={`${W}/5f6a596d09584402fd12ea11_BAG1.jpg`}
          alt=""
          width={1600}
          height={1066}
          sizes="100vw"
          className="mt-0 mb-0 block h-auto w-full"
          loading="lazy"
          decoding="async"
        />
        <Image
          src={`${W}/5f6a59ab1514cba28f1b0cf5_image%20(7).png`}
          alt="Wine opener product in context"
          width={1600}
          height={1066}
          sizes="100vw"
          className="mb-5 mt-0 block h-auto w-full md:mb-6"
          loading="lazy"
          decoding="async"
        />
      </div>
    </CaseStudyShell>
  );
}
