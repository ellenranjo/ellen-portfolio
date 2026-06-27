"use client";

import { specsInsetShell } from "./SpecsInsetImg";

export function SpecsInsetVideoAfterIntro({ src }: { src: string }) {
  return (
    <div className={`${specsInsetShell} mt-10 mb-10 md:mb-20`}>
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="block h-auto w-full"
      />
    </div>
  );
}
