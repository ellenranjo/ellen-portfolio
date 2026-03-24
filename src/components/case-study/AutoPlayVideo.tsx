"use client";

import { useEffect, useRef, useState } from "react";

type AutoPlayVideoProps = {
  /** Desktop / default source */
  src: string;
  /** Smaller source served on viewports <= 1024px (tablet & phone) */
  mobileSrc?: string;
  poster?: string;
  className?: string;
  /** How far from the viewport to begin loading. Default "200% 0px" */
  rootMargin?: string;
};

const MOBILE_MQ = "(max-width: 1024px)";

/**
 * Self-managing autoplay video with responsive source selection:
 * 1. Picks mobileSrc or src based on viewport width at mount time
 * 2. Shows poster as CSS background (zero video bandwidth initially)
 * 3. IntersectionObserver triggers preload="auto" + load() when near viewport
 * 4. Calls play() with Safari promise handling once canplay fires
 * 5. Fades video in over poster once actually playing
 */
export function AutoPlayVideo({
  src,
  mobileSrc,
  poster,
  className,
  rootMargin = "200% 0px",
}: AutoPlayVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    const resolvedSrc =
      mobileSrc && window.matchMedia(MOBILE_MQ).matches ? mobileSrc : src;
    const sourceEl = video.querySelector("source");
    if (sourceEl) sourceEl.src = resolvedSrc;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();

        video.preload = "auto";
        try {
          video.load();
        } catch {}

        const tryPlay = () => {
          const p = video.play();
          if (p) p.catch(() => {});
        };

        if (video.readyState >= 3) {
          tryPlay();
        } else {
          video.addEventListener("canplay", tryPlay, { once: true });
        }
      },
      { rootMargin, threshold: 0 },
    );
    io.observe(wrap);

    const onPlaying = () => setPlaying(true);
    video.addEventListener("playing", onPlaying);

    return () => {
      io.disconnect();
      video.removeEventListener("playing", onPlaying);
    };
  }, [src, mobileSrc, rootMargin]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={poster ? {
        backgroundImage: `url(${poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      } : undefined}
    >
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "inherit",
          opacity: playing ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
