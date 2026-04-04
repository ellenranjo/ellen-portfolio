import type { Metadata } from "next";
import Image from "next/image";
import { PeerTestimonials } from "@/components/about/PeerTestimonials";
import { ResumeButton } from "@/components/about/ResumeButton";
import { CaseStudyShell } from "@/components/CaseStudyShell";
import { aboutPeerTestimonials } from "@/data/aboutPeerTestimonials";

const ABOUT_PORTRAIT =
  "/images/webflow/6786123ce4b833befb174169_IMG_1078.jpg";

export const metadata: Metadata = {
  title: "About | Ellen Huynh",
  description: "About Ellen Huynh, Industrial Designer.",
};

export default function AboutPage() {
  return (
    <CaseStudyShell>
      <div className="mx-auto w-full max-w-[940px] px-6 pb-6 font-sans md:px-10 md:pb-10">
        <div className="mt-2 grid grid-cols-1 gap-8 md:mt-4 md:grid-cols-[minmax(0,34%)_minmax(0,1fr)] md:items-stretch md:gap-10">
          <div className="image-69 relative mx-auto flex w-full max-w-[280px] min-h-[280px] flex-col overflow-hidden rounded-sm md:mx-0 md:max-w-none md:h-full md:min-h-0">
            <Image
              src={ABOUT_PORTRAIT}
              width={520}
              height={520}
              alt="Ellen Huynh"
              className="min-h-[280px] w-full flex-1 object-cover object-[center_22%] md:min-h-0"
              sizes="(max-width: 767px) 100vw, 34vw"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="portfolio-copy mx-auto flex w-[90%] max-w-lg min-h-0 min-w-0 flex-col justify-start text-left md:mx-0 md:w-full md:max-w-none">
            <p className="text-[12px] font-light leading-[18px] md:text-[12px] md:leading-[18px]">
              Hi! I&apos;m Ellen
              <br />
              <br />
              I&apos;m an Industrial Designer with 6+ years of experience in product
              design. My journey began with creating kitchen gadgets, wine and bar
              tools, and soft goods. For the past five years, I&apos;ve been designing
              and driving innovation at Snap Inc., where I&apos;ve been developing
              augmented reality glasses that blend cutting edge AR wearables with the
              physical world.{"\u00A0"}😎
              <br />
              <br />I graduated from Western Washington University with a degree in
              Industrial Design. Originally from Seattle, I now call Los Angeles home.
              I&apos;m passionate about crafting innovative, user centered designs that
              bring real value to people&apos;s lives, while pushing the boundaries of
              what&apos;s possible.
              <br />
              <br />
              When I&apos;m not designing, you can find me cooking, sipping coffee,
              watching movies, or out on a run. I&apos;m currently training for my
              third Marathon.{"\u00A0"}☻
              <br />
              <br />
              <strong>
                <em>Feel free to reach me here!</em>
              </strong>
              <br />
              <br />
              <span className="about-cta-links mb-5 inline-flex flex-row flex-wrap items-center gap-3 md:mb-6 md:gap-4">
                <a
                  href="mailto:ellenxoonu@gmail.com"
                  className="liquid-glass-button liquid-glass-pill liquid-glass-nav inline-block font-bold text-[9px] no-underline md:text-[11px]"
                >
                  <span className="site-header-nav__label site-header-nav__label--rest">
                    email
                  </span>
                  <span
                    className="site-header-nav__label site-header-nav__label--hover"
                    aria-hidden
                  >
                    [email]
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/huynhellen/"
                  target="_blank"
                  rel="noreferrer"
                  className="liquid-glass-button liquid-glass-pill liquid-glass-nav inline-block font-bold text-[9px] no-underline md:text-[11px]"
                >
                  <span className="site-header-nav__label site-header-nav__label--rest">
                    linkedin
                  </span>
                  <span
                    className="site-header-nav__label site-header-nav__label--hover"
                    aria-hidden
                  >
                    [linkedin]
                  </span>
                </a>
                <ResumeButton className="liquid-glass-button liquid-glass-pill liquid-glass-nav inline-block font-bold text-[9px] no-underline md:text-[11px]" />
              </span>
            </p>
          </div>
        </div>
      </div>

      <section className="mx-auto w-full max-w-[940px] px-6 pb-10 font-sans md:px-10 md:pb-20">
        <div className="mx-auto w-[90%] max-w-lg text-left md:w-full md:max-w-none">
          <h1 className="heading-42 my-[40px] text-left text-[16px] font-bold tracking-[0.5px] !font-sans md:my-[60px] md:text-center md:text-[20px]">
            A few words from the peer&apos;s
            <br />
          </h1>

          <PeerTestimonials testimonials={aboutPeerTestimonials} />
        </div>
      </section>
    </CaseStudyShell>
  );
}
