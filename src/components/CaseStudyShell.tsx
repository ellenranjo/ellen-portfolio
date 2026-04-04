import type { ReactNode } from "react";
import Image from "next/image";
import { SITE_NAME_GIF_SRC } from "@/lib/site-assets";

type CaseStudyShellProps = {
  children: ReactNode;
  /** Removes bottom padding under the header so the next section can sit flush (e.g. photography intro). */
  compactHeader?: boolean;
};

/**
 * Shared header + footer for case study pages (matches Spectacles / live site).
 */
export function CaseStudyShell({
  children,
  compactHeader = false,
}: CaseStudyShellProps) {
  return (
    <main className="min-h-screen bg-white text-[#303030] md:cursor-none">
      <section
        className={
          compactHeader
            ? "pb-0 pt-10 text-center md:pb-0 md:pt-[76px]"
            : "pb-10 pt-10 text-center md:pb-20 md:pt-[76px]"
        }
      >
        <div className="mx-auto flex flex-col items-center">
          <a href="/" className="site-header-name mb-0 block">
            <Image
              src={SITE_NAME_GIF_SRC}
              alt="Ellen Huynh"
              width={220}
              height={72}
              className="w-full"
              loading="eager"
              unoptimized
            />
          </a>
          <nav className="site-header-nav">
            <a
              href="/"
              className="liquid-glass-button liquid-glass-pill liquid-glass-nav inline-block font-bold !no-underline"
            >
              <span className="site-header-nav__label site-header-nav__label--rest">
                work
              </span>
              <span className="site-header-nav__label site-header-nav__label--hover" aria-hidden>
                [work]
              </span>
            </a>
            <a
              href="/about"
              className="liquid-glass-button liquid-glass-pill liquid-glass-nav inline-block font-bold !no-underline"
            >
              <span className="site-header-nav__label site-header-nav__label--rest">
                about
              </span>
              <span className="site-header-nav__label site-header-nav__label--hover" aria-hidden>
                [about]
              </span>
            </a>
            <a
              href="/photography"
              className="liquid-glass-button liquid-glass-pill liquid-glass-nav inline-block font-bold !no-underline"
            >
              <span className="site-header-nav__label site-header-nav__label--rest">
                photography
              </span>
              <span className="site-header-nav__label site-header-nav__label--hover" aria-hidden>
                [photography]
              </span>
            </a>
          </nav>
        </div>
      </section>
      {children}
      <section className="mb-0 mt-6 text-center md:mt-8">
        <a
          href="/"
          className="liquid-glass-button liquid-glass-pill liquid-glass-nav inline-block text-[9px] font-bold !no-underline md:text-[11px]"
        >
          More Selected Work
        </a>
        <div className="mb-[30px] mt-[10px] text-[65%] font-light leading-[15px]">
          ©2026 Ellen Huynh. All Rights Reserved.
          <br />
        </div>
      </section>
    </main>
  );
}
