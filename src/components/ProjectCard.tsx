"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLazyViewport } from "@/hooks/useLazyViewport";
import { RENDER_QUALITY } from "@/lib/image-quality";

type Project = {
  href: string;
  image: string;
  hoverMedia?: string;
  /** Autoplay loop video (mp4 or HLS) shown in place of the static image */
  primaryVideo?: string;
  /** Optional poster while primaryVideo loads */
  videoPoster?: string;
  /** object-position for primaryVideo crop inside aspect-video (default: center) */
  videoObjectPosition?: string;
  title: string;
  details: string[];
};

function isVideo(src: string) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(src);
}

function isHls(src: string) {
  return /\.m3u8(\?|$)/i.test(src);
}

function PrimaryVideo({
  src,
  poster,
  objectPosition = "center",
  className,
  priority = false,
}: {
  src: string;
  poster?: string;
  objectPosition?: string;
  className?: string;
  priority?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;

    if (priority) {
      const timer = window.setTimeout(() => setShouldLoad(true), 280);
      return () => window.clearTimeout(timer);
    }

    const node = wrapRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [priority, shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;

    const video = videoRef.current;
    if (!video) return;

    let hls: { destroy: () => void } | null = null;
    let cancelled = false;

    const play = () => {
      video.play().catch(() => {});
    };

    if (isHls(src)) {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        video.addEventListener("loadedmetadata", play, { once: true });
      } else {
        import("hls.js").then(({ default: Hls }) => {
          if (cancelled || !Hls.isSupported()) return;
          const instance = new Hls();
          hls = instance;
          instance.loadSource(src);
          instance.attachMedia(video);
          instance.on(Hls.Events.MANIFEST_PARSED, play);
        });
      }
    } else {
      video.src = src;
      video.addEventListener("canplay", play, { once: true });
    }

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [src, shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    const node = wrapRef.current;
    if (!video || !node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={wrapRef} className="absolute inset-0 h-full w-full">
      <video
        ref={videoRef}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        preload={shouldLoad ? "metadata" : "none"}
        className={className}
        style={{ objectPosition }}
      />
    </div>
  );
}

function disciplinePills(detailLine: string | undefined) {
  if (!detailLine?.trim()) return [];
  return detailLine
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  /** Eager-load the first homepage card so the poster is ready without competing full-file video preload. */
  priority?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { containerRef, isInView } = useLazyViewport(priority, "280px 0px");
  const hoverIsVideo = project.hoverMedia && isVideo(project.hoverMedia);
  const disciplines = disciplinePills(project.details[1]);
  const poster = project.videoPoster ?? project.image;
  const loadHoverMedia = Boolean(project.hoverMedia) && isInView;

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
      <div
        ref={containerRef}
        className="relative aspect-video w-full overflow-hidden bg-transparent transition-colors duration-200 group-hover:bg-white group-active:bg-white"
      >
        {project.primaryVideo ? (
          <PrimaryVideo
            src={project.primaryVideo}
            poster={poster}
            objectPosition={project.videoObjectPosition}
            priority={priority}
            className="h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-80 group-active:opacity-80"
          />
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 92vw, 66vw"
            className={`object-cover transition-opacity duration-200 group-hover:opacity-80 group-active:opacity-80 ${project.hoverMedia ? "group-hover:hidden" : ""}`}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            quality={RENDER_QUALITY}
            unoptimized={/\.gif(\?|$)/i.test(project.image)}
          />
        )}
        {loadHoverMedia &&
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
              src={project.hoverMedia!}
              alt={`${project.title} preview animation`}
              fill
              sizes="(max-width: 768px) 92vw, 66vw"
              className="hidden object-cover transition-opacity duration-200 group-hover:block group-hover:opacity-80"
              loading="lazy"
              decoding="async"
              quality={RENDER_QUALITY}
              unoptimized={/\.gif(\?|$)/i.test(project.hoverMedia!)}
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
