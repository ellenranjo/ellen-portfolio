import Image from "next/image";

/** Side margins for SPECS case study media — 7.5% inset each side */
export const specsInsetShell = "mx-auto w-[85%]";

/** Product stills — serve originals, no optimizer recompression */
const DEFAULT_IMG_WIDTH = 3805;
const DEFAULT_IMG_HEIGHT = 2378;

export function SpecsInsetImgAfterIntro({ src }: { src: string }) {
  return (
    <div className={`${specsInsetShell} mt-10 mb-10 md:mb-20`}>
      <Image
        src={src}
        alt=""
        width={DEFAULT_IMG_WIDTH}
        height={DEFAULT_IMG_HEIGHT}
        sizes="85vw"
        className="h-auto w-full"
        priority
        decoding="async"
        unoptimized
      />
    </div>
  );
}

export function SpecsInsetImg({
  src,
  className = "",
  width = DEFAULT_IMG_WIDTH,
  height = DEFAULT_IMG_HEIGHT,
}: {
  src: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <div className={`${specsInsetShell} ${className}`.trim()}>
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        sizes="85vw"
        className="h-auto w-full"
        loading="lazy"
        decoding="async"
        unoptimized
      />
    </div>
  );
}