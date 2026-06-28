"use client";

import { useEffect, useRef } from "react";
import { specsInsetShell } from "./SpecsInsetImg";

function isHls(src: string) {
  return /\.m3u8(\?|$)/i.test(src);
}

function SpecsInsetVideoPlayer({
  src,
  className = "block h-auto w-full",
}: {
  src: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
      video.addEventListener("loadedmetadata", play, { once: true });
    }

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className={className}
    />
  );
}

export function SpecsInsetVideoAfterIntro({ src }: { src: string }) {
  return (
    <div className={`${specsInsetShell} mt-10 mb-10 md:mb-20`}>
      <SpecsInsetVideoPlayer src={src} />
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
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
