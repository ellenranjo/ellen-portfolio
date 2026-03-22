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
import { SpectaclesAvalonScroll } from "@/components/SpectaclesAvalonScroll";

export const metadata: Metadata = {
  title: "Spectacles 5",
  description: "Spectacles 5 case study by Ellen Huynh.",
};

export default function Spectacles5Page() {
  return (
    <CaseStudyShell>
      <CsMax>
        <CsH1>Spectacles 5 (2024)</CsH1>

        <CsIntroRow>
          <CsIntroCol variant="wide">
            <strong>Spectacles 5 - Wireless AR Glasses</strong>
            <br />
            The fifth generation Spectacles creates a true AR experience for the
            real world. Spectacles pack incredible technology into a wireless,
            lightweight, and compact form factor. Designed towards early
            adoption of AR technology, this form factor includes a neutral front
            frame device designed to fit majority of face sizes and shapes. The
            temples contour has been tested to ergonomically fit within the 90
            percentile of users. Glasses also come with a portable, lightweight,
            quick-release cover designed to protect the front frame.
          </CsIntroCol>

          <CsIntroCol variant="mid">
            <strong>Disciplines</strong>
            <br />
            Industrial Design, CMF, Visualization, Animation, and Packaging.
          </CsIntroCol>

          <CsIntroCol variant="right">
            <strong>Website</strong>
            <br />
            <a
              href="https://www.spectacles.com/"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass-button liquid-glass-pill liquid-glass-nav inline-block max-w-full break-all text-[9px] font-bold md:text-[11px]"
            >
              https://www.spectacles.com/
            </a>
          </CsIntroCol>
        </CsIntroRow>
      </CsMax>

      <CsBleedImgAfterIntro src="https://cdn.prod.website-files.com/5db14aa8083f4b2beca01d43/67831c928f24c07f419f620f_lensabl%20-%20front%20only.JPEG" />

      <CsSection first>
        <CsH2>The Hardware</CsH2>
        <CsBody extrabold>
          <strong>Responsibilities</strong> Design support on Front Frame Design,
          Ergonomic wearability, and contributed to the design architecture of
          device. Lead Designer for all accessories and packaging associated
          with Specs 5. Responsible for all Rendered Images and Animation that
          was produced for SPS Launch 2024.
        </CsBody>
      </CsSection>
      <SpectaclesAvalonScroll localVideoSrc="/videos/240905_Animation_SPS_Final.mp4" />

      <CsBleedImg
        src="https://cdn.prod.website-files.com/5db14aa8083f4b2beca01d43/6783055f13e73a399b2ba568_MyAI_WEB.avif"
        className="h-full w-full"
      />
      <CsBleedImg
        src="/images/Snap-Spectacles-5-AR.png"
        className="mb-10 h-full w-full md:mb-20"
      />

      <CsSection>
        <CsH2>Protective Cover</CsH2>
        <CsBody extrabold>
          <strong>Responsibilities</strong> Led all aspects of Design, User
          Experience, Functionality, Prototyping, A-Surfaces, and CMF direction.
          <br />
          <strong>Purpose</strong>{" "}Protecting what matters, the glossy front
          frame &amp; lens.
          <br />
          <strong>Latch Mechanism</strong> Simple latch that is designed to be
          opened with one hand.
          <br />
          <strong>CMF</strong> Recycled PC, Eco friendly fabrics that wraps the
          exterior of the case to ensure a premium feel and protection to the
          device.
        </CsBody>
      </CsSection>

      <CsBleedImg src="https://cdn.prod.website-files.com/5db14aa8083f4b2beca01d43/67906fcc1c3c3754a7feb875_IMG_6121.jpg" />
      <CsBleedImg
        src="https://cdn.prod.website-files.com/5db14aa8083f4b2beca01d43/67832d553298c602eb089afd_IMG_1896.JPG"
        className="mb-10 h-full w-full md:mb-20"
      />

      <CsSection>
        <CsH2>Packaging</CsH2>
        <CsBody extrabold>
          <strong>Responsibilities</strong> Curated design language and
          structure of packaging. Defined out of box experience. Assisted in CAD,
          CMF, Prototypes and validating Proof of concepts.
          <br />
          <strong>What Is Inside?</strong> AR Glasses, Protective glasses cover,
          Carrying pouch, USB-C to C cable for charging, Prescription insert
          (Sold Separate).
          <br />
          <strong>Look &amp; Feel</strong> All black card stock for a premium look
          with Snap Yellow accents for touch points.
        </CsBody>
      </CsSection>

      <CsBleedImg src="https://cdn.prod.website-files.com/5db14aa8083f4b2beca01d43/67906fa493d11ffce60af299_IMG_6123.jpg" />
    </CaseStudyShell>
  );
}
