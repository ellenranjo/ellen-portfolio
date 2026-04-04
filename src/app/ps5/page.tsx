import type { Metadata } from "next";
import { CaseStudyShell } from "@/components/CaseStudyShell";
import {
  CsBleedImg,
  CsBleedImgAfterIntro,
  CsBleedImgBeforeTitle,
  CsBody,
  CsH1,
  CsH2,
  CsIntroCol,
  CsIntroRow,
  CsMax,
  CsSection,
} from "@/components/case-study/CaseStudyPrimitives";
import { AutoPlayVideo } from "@/components/case-study/AutoPlayVideo";
import { CaseStudyImageCarousel } from "@/components/case-study/CaseStudyImageCarousel";

export const metadata: Metadata = {
  title: "PlayStation 5 Controller",
  description: "PlayStation 5 Controller concept by Ellen Huynh.",
};

const W = "/images/webflow";

export default function Ps5Page() {
  return (
    <CaseStudyShell>
      <CsMax>
        <CsH1>PS5 Controller [2020]</CsH1>

        <CsIntroRow>
          <CsIntroCol variant="wide">
            <strong>PS5 Controller — Concept</strong>
            <br />
            Personal Work. Time Frame: 5 weeks. PlayStation played a huge part
            in my early interest in gaming culture. The new release of the
            PlayStation 5 shocked both competitors and fans across the globe in
            more ways than one. I decided to share my own fan inspired concept
            for the PS5.
          </CsIntroCol>

          <CsIntroCol variant="mid">
            <strong>Disciplines</strong>
            <br />
            Industrial Design, UI/UX, &amp; Graphic Design
            <br />
            <br />
            <strong>Programs</strong>
            <br />
            Solidworks, Figma, Adobe After Effects, Keyshot, Procreate,
            Illustrator, &amp; Photoshop
          </CsIntroCol>

          <CsIntroCol variant="right">
            <strong>Elsewhere</strong>
            <br />
            <a
              href="https://www.linkedin.com/posts/huynhellen_playstation5-industrialdesign-gamingindustry-activity-6689940212921040896-87AZ"
              target="_blank"
              rel="noreferrer"
              className="liquid-glass-button liquid-glass-pill liquid-glass-nav inline-block text-[9px] font-bold md:text-[11px]"
            >
              LinkedIn
            </a>
          </CsIntroCol>
        </CsIntroRow>
      </CsMax>

      <CsBleedImgAfterIntro src={`${W}/5f094c063ebbae2c42b3c988_PS5%20BACK.png`} />
      <CsSection first>
        <CsH2>Brand Language Inspo</CsH2>
        <CsBody>
          Sony has always been known for their linear, geometric, and clean
          design language. &quot;Quality and compactness uncompromised&quot; — I
          used this as my guideline throughout my design process.
        </CsBody>
      </CsSection>

      <CsBleedImg
        src={`${W}/5f0e0f46d2880d1e5e2dc9e0_Moodboard-01.jpg`}
        className="mb-10 h-full w-full md:mb-20"
      />

      <CsSection>
        <CsH2>Hear what gamers had to say</CsH2>
        <div className="mx-auto mb-6 mt-4 flex w-[72%] max-w-[25.6rem] flex-col items-center gap-4 text-left sm:mb-8 sm:mt-5 md:mb-16 md:mt-7 md:w-[64%] md:max-w-[576px] md:items-stretch lg:mb-20 lg:mt-9 xl:mt-10">
          <div className="animate-pulse w-full rounded-full border border-white/45 bg-white/35 px-5 py-4 text-[9px] font-light leading-[14px] tracking-[0.5px] shadow-[0_10px_30px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-[14px] [-webkit-backdrop-filter:blur(14px)_saturate(150%)] [animation-duration:4.8s] md:max-w-[92%] md:px-6 md:py-4 md:text-[11px] md:leading-[18px] md:tracking-[0.3px] lg:text-[12px] lg:leading-[18px]">
            &quot;I&apos;m not a big fan of the center touch pad. It could really
            be replaced by a small screen or something. It would add more value
            in many games.. like mapping, KD ratios, npc dialog, party list,
            etc.&quot;
          </div>
          <div className="animate-pulse w-full rounded-full border border-white/45 bg-white/35 px-5 py-4 text-[9px] font-light leading-[14px] tracking-[0.5px] shadow-[0_10px_30px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-[14px] [-webkit-backdrop-filter:blur(14px)_saturate(150%)] [animation-duration:5.4s] md:max-w-[92%] md:self-end md:px-6 md:py-4 md:text-[11px] md:leading-[18px] md:tracking-[0.3px] lg:text-[12px] lg:leading-[18px]">
            &quot;I love the PS controller. The new Xbox controller just
            doesn&apos;t feel right in my hands. I hope PS could draw more
            parallel to the features than focusing on the looks.&quot;
          </div>
          <div className="animate-pulse w-full rounded-full border border-white/45 bg-white/35 px-5 py-4 text-[9px] font-light leading-[14px] tracking-[0.5px] shadow-[0_10px_30px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-[14px] [-webkit-backdrop-filter:blur(14px)_saturate(150%)] [animation-duration:6s] md:max-w-[92%] md:px-6 md:py-4 md:text-[11px] md:leading-[18px] md:tracking-[0.3px] lg:text-[12px] lg:leading-[18px]">
            &quot;In its current form, it is sort of limiting. I wish the new
            controller has paddles for added game play effect for games such as
            Battle Royale, FPS, and MMO.&quot;
          </div>
        </div>
      </CsSection>

      <CsBleedImgBeforeTitle src={`${W}/5f17b8847f9bac152e7a56f6_Untitled_Artwork%20(3).jpg`} />

      <CsSection>
        <CsH2>The Solution</CsH2>
      </CsSection>

      <CsBleedImg src={`${W}/5f108d70c1dec4032c2d70b2_Incontext%201.jpg`} className="mt-6 h-full w-full md:mt-10" />

      <CsBleedImg src={`${W}/5f0d631fec956205d510c0a3_Black%20iso.jpg`} />
      <section className="relative w-full bg-[#181818] py-10 md:py-16">
        <AutoPlayVideo
          src="/images/paring_3-desktop.mp4"
          mobileSrc="/images/paring_3-mobile.mp4"
          poster={`${W}/5f0d631fec956205d510c0a3_Black%20iso.jpg`}
          className="absolute left-1/2 top-1/2 z-[1] h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 object-contain"
        />
        <div className="w-full pb-[56.25%]" />
      </section>
      <section className="relative mb-10 w-full bg-[#181818] py-10 md:mb-20 md:py-16">
        <AutoPlayVideo
          src="/images/Paddle%20Press-desktop.mp4"
          mobileSrc="/images/Paddle%20Press-mobile.mp4"
          poster={`${W}/5f0d631fec956205d510c0a3_Black%20iso.jpg`}
          className="absolute left-0 top-1/2 z-[1] w-[80%] -translate-y-1/2 object-cover"
        />
        <div className="w-full pb-[56.25%]" />
      </section>

      <CsSection>
        <h2 className="mx-auto mb-0 block w-[72%] max-w-[25.6rem] text-left text-[11px] font-bold leading-snug tracking-[0.5px] md:block md:w-[64%] md:max-w-none md:text-center md:text-[25px] md:leading-[30px] md:tracking-[1px]">
          Parametric Drawings
        </h2>
      </CsSection>
      <CsBleedImg src="/images/controllerlinework.svg" className="mb-0 mt-6 h-full w-full md:mt-10" />
      <CsBleedImg src={`${W}/5f11d33d1f068f9470d4dd3d_White%20floater%20Perspective%20small.jpg`} />
      <CaseStudyImageCarousel
        className="mt-3 mb-10 w-full md:mb-20"
        images={[
          { src: `${W}/5f10167f4f22923c7f158882_Close%20Up%201%20small.jpg`, alt: "PS5 controller close-up" },
          { src: "/images/Close%20Up%203.jpg", alt: "PS5 controller close-up 3" },
          { src: "/images/Close%20Up%204.jpg", alt: "PS5 controller close-up 4" },
          { src: "/images/Close%20up%205.jpg", alt: "PS5 controller close-up detail" },
          { src: "/images/Black%20ISO%20back.jpg", alt: "PS5 controller black ISO back view" },
          { src: `${W}/5f20ce24e75e6d2b2f3d360b_ps5%20controller%20concept%202.136.png`, alt: "PS5 controller concept render" },
        ]}
        regionLabel="PS5 controller detail images"
        scrollerLabel="Controller detail images — swipe or use arrow keys"
        prevLabel="Previous controller image"
        nextLabel="Next controller image"
      />
      <CsSection>
        <CsH2>User Interface</CsH2>
        <CsBody extrabold>
          <strong>Wireframing</strong> High fidelity functional wireframes were
          created in Figma to map out the user interface. Above is a snippet of
          my workflow during the process of the visual touch bar center. Through
          this activity, I mapped out the use-case scenario, the purpose of my
          design, and how information will be gathered, interacted, and
          displayed. This made it easier to mentally visualize how to animate each
          frame in Adobe After Effects.
        </CsBody>
      </CsSection>

      <CsBleedImg
        src="/images/PS5%20Wireframe.svg"
        className="mb-0 mt-0 block h-full w-full"
      />
      <CsBleedImg
        src={`${W}/5f0e10e7693aa30ceb62e52b_Wireframe%20Figma.png`}
        className="mb-0 mt-0 block h-full w-full"
      />
      <AutoPlayVideo
        src="/images/ps5-final.mp4"
        poster="/images/ps5-poster.jpg"
        className="mb-10 mt-0 block h-full w-full object-cover [transform:translateZ(0)] [backface-visibility:hidden] md:mb-20"
        rootMargin="300% 0px"
      />
      <CsSection>
        <CsH2>Visual Control Panel</CsH2>
        <CsBody>
          Display simple telemetry and other useful information during your game
          play such as FPS, ping, current party members, notifications from
          friends, stats, music, and more. Gain quick access of your controller
          sensitivity settings, color bar, all without having to pause your
          game. You can finally turn off that light bar and reserve your battery
          life longer!
        </CsBody>
      </CsSection>
      <AutoPlayVideo
        src="/images/Front-desktop.mp4"
        mobileSrc="/images/Front-mobile.mp4"
        poster="/images/ps5-poster.jpg"
        className="mb-0 mt-0 block h-full w-full object-cover [transform:translateZ(0)] [backface-visibility:hidden]"
      />

      <CsBleedImgBeforeTitle src={`${W}/5f0d81071fd4121664e2ce27_Incontext%202.jpg`} />

      <CsSection>
        <CsH2>CMF</CsH2>
      </CsSection>

      <CsBleedImg
        src={`${W}/5f0ffa5cef0a6bb962bf0913_yellow%20down%20angle%20(sm).jpg`}
        className="mt-6 h-full w-full md:mt-10"
      />

      <CsBleedImg src={`${W}/5f1094e152453b36c5dffb36_fall%20out%20DOF%20Grain.jpg`} />

    </CaseStudyShell>
  );
}
