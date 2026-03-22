import type { Metadata } from "next";
import { CaseStudyShell } from "@/components/CaseStudyShell";
const WEBFLOW_SHARED_CSS =
  "https://cdn.prod.website-files.com/5db14aa8083f4b2beca01d43/css/ellen-huynh.webflow.shared.bbf26b8a1.css";
const LIVE_PHOTOGRAPHY_URL = "https://ellenhuynh.com/photography";

export const metadata: Metadata = {
  title: "Photography | Ellen Huynh",
  description: "A collection of memories, experiences, and stories.",
};

async function getLiveGalleryHtml() {
  const res = await fetch(LIVE_PHOTOGRAPHY_URL, { next: { revalidate: 3600 } });
  const html = await res.text();
  const match = html.match(
    /<div class="container-40 w-container">[\s\S]*?<\/div><\/div>/,
  );
  return match?.[0] ?? "";
}

export default async function PhotographyPage() {
  const galleryHtml = await getLiveGalleryHtml();

  return (
    <CaseStudyShell>
      {/* Load the same Webflow styles used by live photography grid */}
      <link rel="stylesheet" href={WEBFLOW_SHARED_CSS} />

      <section className="portfolio-copy mx-auto w-full max-w-[940px] px-8 pt-0 md:px-10">
        <h1 className="heading-42 mt-0 !mb-0 text-center text-[16px] font-bold tracking-[0.5px] !font-sans md:mt-0 md:!mb-0 md:text-[20px]">
          A collection of my memories, experiences, and stories.
        </h1>
        <p className="-mt-10 text-center md:-mt-12">
          <strong className="text-[12px] font-bold leading-[18px] tracking-[0.3px] md:text-[12px] md:leading-[18px]">
            2011 - Present
          </strong>
          <br />
          <span className="mt-0 inline-block text-[12px] font-light leading-[18px] tracking-[0.3px] md:text-[12px] md:leading-[18px]">
            Shot on: Sony A6000, Sony A7iii, IPhone 14 Pro, DJI Mavic Pro
          </span>
        </p>
      </section>

      <section
        className="portfolio-copy mx-auto mt-10 w-full max-w-[1354px] px-8 md:px-10"
        dangerouslySetInnerHTML={{ __html: galleryHtml }}
      />

      <section className="hidden">
        {/* fallback marker if gallery extraction fails */}
        {!galleryHtml ? "Photography gallery unavailable." : null}
      </section>
    </CaseStudyShell>
  );
}
