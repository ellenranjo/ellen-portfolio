"use client";

import { useEffect, useRef } from "react";
import { specsInsetShell } from "./SpecsInsetImg";
import { useLazyViewport } from "./useLazyViewport";

function isHls(src: string) {
  return /\.m3u8(\?|$)/i.test(src);
}

function SpecsInsetVideoPlayer({
  src,
  className = "block h-auto w-full",
  priority = false,
  fill = false,
}: {
  src: string;
  className?: string;
  /** Load immediately — use only for the above-the-fold hero clip. */
  priority?: boolean;
  fill?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { containerRef, isInView } = useLazyViewport(priority);

  useEffect(() => {
    if (!isInView) return;

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
  }, [src, isInView]);

  return (
    <div
      ref={containerRef}
      className={fill ? "h-full w-full" : "w-full"}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload={isInView ? (priority ? "auto" : "metadata") : "none"}
        className={className}
      />
    </div>
  );
}

export function SpecsInsetVideoAfterIntro({ src }: { src: string }) {
  return (
    <div className={`${specsInsetShell} mt-10 mb-10 md:mb-20`}>
      <SpecsInsetVideoPlayer src={src} priority />
    </div>
  );
}

export function SpecsInsetVideo({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <div className={`${specsInsetShell} ${className}`.trim()}>
      <SpecsInsetVideoPlayer src={src} />
    </div>
  );
}

export function SpecsInsetVideoPair({
  sources,
  className = "mb-10 md:mb-20",
}: {
  sources: readonly [string, string];
  className?: string;
}) {
  return (
    <div className={`${specsInsetShell} ${className}`.trim()}>
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {sources.map((src) => (
          <div
            key={src}
            className="aspect-video w-full overflow-hidden bg-black"
          >
            <SpecsInsetVideoPlayer
              src={src}
              fill
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
