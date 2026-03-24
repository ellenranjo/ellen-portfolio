"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const VIDEO_MP4 =
  "https://videos.ctfassets.net/cbjigzuhgs28/6C5IjcYMybX4ahhnkCs5B0/d037a2397998fab78433c1ad78586307/prod_asset.mp4";
const VIDEO_WEBM =
  "https://videos.ctfassets.net/cbjigzuhgs28/32UKCuYWRWC4qnUSqdfUpR/e15f6a5907fec8d5f1f97d8206cde0e8/prod_asset.webm";

const POSTER_SRC =
  "/images/webflow/6782ff4901019e74c253de80_Avalon%20cameras%20%26%20IR.JPEG";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / Math.max(0.0001, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function getViewportHeight() {
  if (typeof window === "undefined") return 0;
  return window.visualViewport?.height ?? window.innerHeight;
}

function getProgress(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = getViewportHeight();
  const scrollRange = Math.max(1, rect.height - vh);
  return clamp01(-rect.top / scrollRange);
}

function getTextStyle(
  progress: number,
  startIn: number,
  holdEnd: number,
  endOut: number,
) {
  const fadeInStart = Math.max(0, startIn - 0.05);
  const fadeIn = clamp01(
    (progress - fadeInStart) / Math.max(0.0001, startIn - fadeInStart),
  );
  const fadeOut = clamp01(
    (progress - holdEnd) / Math.max(0.0001, endOut - holdEnd),
  );
  const opacity = fadeIn * (1 - fadeOut);

  let y = 30;
  if (progress >= startIn && progress <= holdEnd) y = 0;
  else if (progress > holdEnd) y = -30 * fadeOut;
  else y = 30 * (1 - fadeIn);

  return { opacity, transform: `translateY(${y}%)` };
}

export function SpectaclesAvalonScroll({
  localVideoSrc,
}: {
  localVideoSrc?: string;
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafRef = useRef<number>(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const seekingRef = useRef(false);

  const onDurationReady = useCallback((v: HTMLVideoElement) => {
    if (Number.isFinite(v.duration) && v.duration > 0) {
      setDuration(v.duration);
      setVideoReady(true);
    }
  }, []);

  useEffect(() => {
    const update = () => {
      rafRef.current = 0;
      if (!sectionRef.current) return;
      setProgress(getProgress(sectionRef.current));
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(update);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", onScroll);

    const coarsePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    if (coarsePointer) {
      window.addEventListener("touchmove", onScroll, { passive: true });
      window.addEventListener("touchend", onScroll, { passive: true });
    }

    const vv = typeof window !== "undefined" ? window.visualViewport : null;
    if (vv) {
      vv.addEventListener("scroll", onScroll);
      vv.addEventListener("resize", onScroll);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
      if (coarsePointer) {
        window.removeEventListener("touchmove", onScroll);
        window.removeEventListener("touchend", onScroll);
      }
      if (vv) {
        vv.removeEventListener("scroll", onScroll);
        vv.removeEventListener("resize", onScroll);
      }
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* Seek with guard: mobile Safari may throw if data isn't buffered yet */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || duration <= 0) return;

    const targetTime = progress * duration;
    if (Math.abs(v.currentTime - targetTime) < 0.016) return;

    if (seekingRef.current) return;

    const handleSeeked = () => {
      seekingRef.current = false;
      v.removeEventListener("seeked", handleSeeked);
    };

    try {
      seekingRef.current = true;
      v.addEventListener("seeked", handleSeeked, { once: true });
      v.currentTime = targetTime;
    } catch {
      seekingRef.current = false;
    }
  }, [progress, duration]);

  /* Ensure video starts preloading on mobile Safari (which ignores preload="auto" sometimes) */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryLoad = () => {
      try {
        v.load();
      } catch {
        /* ignore */
      }
    };

    if (v.readyState < 2) {
      tryLoad();
    }
  }, []);

  const sensorsStyle = getTextStyle(progress, 0.17, 0.31, 0.36);
  const computingStyle = getTextStyle(progress, 0.45, 0.6, 0.65);
  const displayStyle = getTextStyle(progress, 0.8, 0.9, 0.95);

  const endT = smoothstep(0.997, 1, progress);
  const scrubVideoOpacity = 1 - endT;
  const textLayerOpacity = 1 - endT;

  return (
    <div ref={sectionRef} className="relative h-[600vh] bg-black">
      <div className="sticky top-0 h-[100dvh] max-h-[100dvh] w-full overflow-hidden bg-black [backface-visibility:hidden] [transform:translateZ(0)]">
        {/* Single video: MP4 first for Safari, WebM second for Chrome/FF */}
        <video
          ref={videoRef}
          className="h-full w-full object-contain xl:object-cover"
          playsInline
          muted
          preload="auto"
          poster={POSTER_SRC}
          aria-hidden="true"
          onLoadedMetadata={(e) => onDurationReady(e.currentTarget)}
          onDurationChange={(e) => onDurationReady(e.currentTarget)}
          onLoadedData={(e) => onDurationReady(e.currentTarget)}
          style={{ opacity: videoReady ? scrubVideoOpacity : 1 }}
        >
          {localVideoSrc ? (
            <source src={localVideoSrc} type="video/mp4" />
          ) : null}
          <source src={VIDEO_MP4} type="video/mp4" />
          <source src={VIDEO_WEBM} type="video/webm" />
        </video>

        {/* Static poster as fallback while video loads (visible until videoReady) */}
        {!videoReady ? (
          <img
            src={POSTER_SRC}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 z-[1] h-full w-full object-contain xl:object-cover"
          />
        ) : null}

        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{ opacity: textLayerOpacity }}
        >
          <div
            className="absolute left-[5%] top-[25%] max-md:max-w-[58%] md:max-w-[380px] text-left text-white xl:top-[5%]"
            style={sensorsStyle}
          >
            <h3 className="text-[11px] font-bold tracking-[1px] text-white md:text-[25px] md:leading-[30px]">
              Powerful Sensors
            </h3>
            <p className="portfolio-copy mt-3 text-white/90">
              A suite of cameras and sensors power multi-modal AI, contextual
              understanding, and 6DoF tracking.
            </p>
          </div>

          <div className="absolute bottom-[30%] left-1/2 w-[min(90vw,560px)] -translate-x-1/2 text-center text-white md:bottom-[26%] lg:bottom-[20%] xl:bottom-[17%]">
            <div style={computingStyle} className="text-center">
              <h3 className="text-[11px] font-bold tracking-[1px] text-white md:text-[25px] md:leading-[30px]">
                Advanced Computing
              </h3>
              <p className="portfolio-copy mt-3 text-center text-white/90">
                A dual system-on-a-chip architecture and vapor chambers enable a
                standalone glasses form factor.
              </p>
            </div>
          </div>

          <div
            className="absolute right-[5%] top-[25%] max-md:max-w-[58%] md:max-w-[380px] text-right text-white xl:top-[5%]"
            style={displayStyle}
          >
            <h3 className="text-[11px] font-bold tracking-[1px] text-white md:text-[25px] md:leading-[30px]">
              Vibrant Display
            </h3>
            <p className="portfolio-copy mt-3 text-white/90">
              A 46 degree field of view, 37 pixel per degree stereo waveguide
              display with automatic tint delivers sharp, bright images.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
