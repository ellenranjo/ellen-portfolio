import { HandwrittenPaperMessage } from "@/components/HandwrittenPaperMessage";
import { ProjectCard } from "@/components/ProjectCard";

type Project = {
  href: string;
  image: string;
  hoverMedia?: string;
  title: string;
  details: string[];
};

const projects: Project[] = [
  {
    href: "/spectacles-5",
    image:
      "https://cdn.prod.website-files.com/5db14aa8083f4b2beca01d43/6782ff4901019e74c253de80_Avalon%20cameras%20%26%20IR.JPEG",
    hoverMedia: "/spectacles-5-hover.gif",
    title: "Spectacles 5",
    details: [
      "Released Fall 2024",
      "Industrial Design, CMF, Packaging, Animation",
    ],
  },
  {
    href: "/pixy",
    image:
      "https://cdn.prod.website-files.com/5db14aa8083f4b2beca01d43/6405941859ee2c0de3f81ef2_220228_BROOKS_STILLS_ENCINO_GEN-Z_PRODUCT-STRAP_192.jpg",
    title: "Pixy",
    details: ["Released Spring 2022", "Industrial Design, CMF, Packaging"],
  },
  {
    href: "/ps5",
    image: "/images/ps5-poster.jpg",
    hoverMedia: "/images/ps5-final.mp4?v=2",
    title: "PlayStation 5 Controller",
    details: ["Personal Project - Summer 2020", "Industrial Design, UX/UI"],
  },
  {
    href: "/fanny-sling",
    image:
      "https://cdn.prod.website-files.com/5db14aa8083f4b2beca01d43/5db3a15713810c7d3a411309_Fanny-Sling.jpg",
    title: "Photography Fanny Sling",
    details: ["Released Fall 2018", "Industrial Design, Soft Good"],
  },
  {
    href: "/bar-wine-acessories",
    image:
      "https://cdn.prod.website-files.com/5db14aa8083f4b2beca01d43/62a0105fa86dd74ae28f7455_Penguin%20Hero.jpg",
    title: "True Brands",
    details: [
      "Released Fall/Summer 2018-19",
      "Industrial Design, CMF",
    ],
  },
];

export default function Home() {
  return (
    <main className="homepage min-h-screen bg-white text-[#303030]">
      {/* Canonical hero: one composition — `.homepage-hero-canvas` is the scale reference (cqi). */}
      <section
        className="homepage-hero -mt-10 relative w-full overflow-visible bg-transparent"
        style={{ clipPath: "inset(5% 0 -40% 0 round 0px)" }}
      >
        <div className="homepage-hero-canvas">
          {/* Stage = layout frame; lockup is anchored to main paper bottom (see globals.css) */}
          <div className="homepage-hero-stage">
            <div className="homepage-hero-art">
              <div aria-hidden="true" className="homepage-hero-art-glow" />
              <div className="homepage-hero-art-scene">
                <div className="homepage-hero-art-layer">
                  <div
                    aria-hidden="true"
                    className="hero-float-paper-a absolute left-[8%] top-[-18%] z-[1] w-[34%] rotate-[47deg] bg-white/94 shadow-[0_5px_12px_rgba(35,35,35,0.11)] aspect-[11/17]"
                  />
                  <div className="hero-float-paper-b absolute left-[25%] top-[-16%] z-[2] w-[38%] rotate-[47deg] overflow-hidden bg-white shadow-[0_7px_16px_rgba(25,25,25,0.12)] aspect-[11/17]">
                    <HandwrittenPaperMessage />
                  </div>
                  <img
                    src="/Papermate2.png"
                    alt=""
                    aria-hidden="true"
                    className="hero-float-pen-image absolute left-[60%] top-[20%] z-30 w-[22%] rotate-[-35deg] mix-blend-multiply"
                  />

                  {/* Lockup lives in art layer: CSS anchor → main paper bottom (golden reference), not stage bottom */}
                  <div className="homepage-hero-lockup">
                    <a href="/" className="site-header-name mb-0">
                      <img
                        src="https://cdn.prod.website-files.com/5db14aa8083f4b2beca01d43/5dc8fae852f69fd0d2957908_MOSHED-2019-11-10-22-8-22.gif"
                        alt="Ellen Huynh"
                        className="w-full"
                      />
                    </a>
                    <div className="site-header-tagline">industrial designer</div>
                    <nav className="site-header-nav">
                      <a
                        href="/"
                        className="liquid-glass-button liquid-glass-pill liquid-glass-nav inline-block font-bold !no-underline"
                      >
                        work
                      </a>
                      <a
                        href="/about"
                        className="liquid-glass-button liquid-glass-pill liquid-glass-nav inline-block font-bold !no-underline"
                      >
                        about
                      </a>
                      <a
                        href="/photography"
                        className="liquid-glass-button liquid-glass-pill liquid-glass-nav inline-block font-bold !no-underline"
                      >
                        photography
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="homepage-projects mx-auto w-full max-w-[90%] px-5 md:max-w-[85%] md:px-0 lg:max-w-[66%]"
        style={{
          marginTop:
            "calc(var(--hero-projects-gap) - var(--hero-pull-cards-up))",
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.href} project={project} />
        ))}
      </section>

      <div className="mb-5 mt-10 text-center">
        <a
          href="#"
          className="liquid-glass-button liquid-glass-pill liquid-glass-nav inline-block text-[9px] font-bold md:text-[11px]"
        >
          Back To Top
        </a>
      </div>

      <footer className="pb-6 text-center">
        <div className="text-[12px] font-light">
          <a
            href="https://www.behance.net/ellenxoonu5d6e"
            target="_blank"
            rel="noreferrer"
            className="hover:bg-[#face6a]"
          >
            Behance
          </a>{" "}
          //{" "}
          <a
            href="https://www.linkedin.com/in/ellen-huynh-02504685/"
            target="_blank"
            rel="noreferrer"
            className="hover:bg-[#face6a]"
          >
            Linkedin
          </a>{" "}
          //{" "}
          <a
            href="mailto:ellenxoonu@gmail.com?subject=Hello!"
            className="hover:bg-[#face6a]"
          >
            Email
          </a>
        </div>
        <div className="mt-[10px] text-[65%] font-light leading-[15px]">
          ©2026 Ellen Huynh. All Rights Reserved.
          <br />
        </div>
      </footer>
    </main>
  );
}