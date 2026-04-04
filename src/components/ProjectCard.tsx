"use client";

import Image from "next/image";
import { useRef } from "react";

type Project = {
  href: string;
  image: string;
  hoverMedia?: string;
  title: string;
  details: string[];
};

function isVideo(src: string) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(src);
}

function disciplinePills(detailLine: string | undefined) {
  if (!detailLine?.trim()) return [];
  return detailLine
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverIsVideo = project.hoverMedia && isVideo(project.hoverMedia);
  const disciplines = disciplinePills(project.details[1]);

  return (
    <a
      href={project.href}
      className="group relative z-[1] mb-4 block w-full touch-manipulation bg-transparent pb-[6px] text-inherit no-underline transition-[background-color,box-shadow,opacity] duration-200 hover:bg-white hover:shadow-[0_0_20px_-5px_#a5a5a5] active:bg-white active:shadow-[0_0_20px_-5px_#a5a5a5] md:mb-6 lg:mb-[60px]"
      onMouseEnter={() => hoverIsVideo && videoRef.current?.play()}
      onMouseLeave={() => {
        const v = videoRef.current;
        if (!hoverIsVideo || !v) return;
        v.pause();
        try {
          v.currentTime = 0;
        } catch {
          /* ignore */
        }
      }}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-transparent transition-colors duration-200 group-hover:bg-white group-active:bg-white">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 92vw, 66vw"
          className={`object-cover transition-opacity duration-200 group-hover:opacity-80 group-active:opacity-80 ${project.hoverMedia ? "group-hover:hidden" : ""}`}
          loading="lazy"
          decoding="async"
          unoptimized={/\.gif(\?|$)/i.test(project.image)}
        />
        {project.hoverMedia &&
          (hoverIsVideo ? (
            <video
              ref={videoRef}
              src={project.hoverMedia}
              muted
              loop
              playsInline
              preload="none"
              poster={project.image}
              className="hidden h-full w-full object-cover transition-opacity duration-200 group-hover:block group-hover:opacity-80"
            />
          ) : (
            <Image
              src={project.hoverMedia}
              alt={`${project.title} preview animation`}
              fill
              sizes="(max-width: 768px) 92vw, 66vw"
              className="hidden object-cover transition-opacity duration-200 group-hover:block group-hover:opacity-80"
              loading="lazy"
              decoding="async"
              unoptimized={/\.gif(\?|$)/i.test(project.hoverMedia)}
            />
          ))}
      </div>
      <div className="relative z-[1] mx-4 my-3 bg-transparent font-sans text-[9px] font-light leading-[15px] tracking-[0.5px] transition-colors duration-200 group-hover:bg-white group-active:bg-white md:mx-4 md:my-4 md:text-[11px] md:leading-[18px] lg:m-7">
        <strong className="font-extrabold">[{project.title}]</strong>
        <br />
        {project.details[0]}
        <br />
        <span className="mt-1 flex flex-wrap gap-1.5 md:gap-2">
          {disciplines.map((label, i) => (
            <span
              key={`${project.href}-${label}-${i}`}
              className="inline-block rounded-full bg-[#f0ff00] px-2 py-0.5 font-sans text-[9px] font-semibold leading-snug tracking-[0.5px] text-[#1f2328] md:px-2.5 md:py-0.5 md:text-[11px]"
            >
              {label}
            </span>
          ))}
        </span>
      </div>
    </a>
  );
}
