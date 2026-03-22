"use client";

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

export function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverIsVideo = project.hoverMedia && isVideo(project.hoverMedia);

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
        <img
          src={project.image}
          alt={project.title}
          className={`h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-80 group-active:opacity-80 ${project.hoverMedia ? "group-hover:hidden" : ""}`}
        />
        {project.hoverMedia &&
          (hoverIsVideo ? (
            <video
              ref={videoRef}
              src={project.hoverMedia}
              muted
              loop
              playsInline
              preload="auto"
              className="hidden h-full w-full object-cover transition-opacity duration-200 group-hover:block group-hover:opacity-80"
            />
          ) : (
            <img
              src={project.hoverMedia}
              alt={`${project.title} preview animation`}
              className="hidden h-full w-full object-cover transition-opacity duration-200 group-hover:block group-hover:opacity-80"
            />
          ))}
      </div>
      <div className="relative z-[1] mx-4 my-3 bg-transparent font-sans text-[9px] font-light leading-[15px] tracking-[0.5px] transition-colors duration-200 group-hover:bg-white group-active:bg-white md:mx-4 md:my-4 md:text-[11px] md:leading-[18px] lg:m-7">
        <strong className="font-extrabold">{project.title}</strong>
        <br />
        {project.details[0]}
        <br />
        {project.details[1]}
      </div>
    </a>
  );
}
