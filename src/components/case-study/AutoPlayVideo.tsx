"use client";

import { useEffect, useRef, useState } from "react";

type AutoPlayVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  /** How far from the viewport to begin loading. Default "200% 0px" */
  rootMargin?: string;
};

/**
 * Self-managing autoplay video:
 * 1. Shows poster image immediately (no bandwidth cost)
 * 2. When section enters rootMargin, sets preload="auto" and calls load()
 * 3. Once canplay fires, calls play() with Safari promise handling
 * 4. Fades video in over poster once actually playing
 */
export function AutoPlayVideo({
  src,
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
  }, [rootMargin]);

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
