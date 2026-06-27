import Image from "next/image";

/** Side margins for SPECS case study media — 15% inset each side */
export const specsInsetShell = "mx-auto w-[70%]";

/** Product stills — serve originals, no optimizer recompression */
const SPECS_IMG_WIDTH = 1024;
const SPECS_IMG_HEIGHT = 639;

export function SpecsInsetImgAfterIntro({ src }: { src: string }) {
  return (
    <div className={`${specsInsetShell} mt-10 mb-10 md:mb-20`}>
      <Image
        src={src}
        alt=""
        width={SPECS_IMG_WIDTH}
        height={SPECS_IMG_HEIGHT}
        sizes="70vw"
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
}: {
  src: string;
  className?: string;
}) {
  return (
    <div className={`${specsInsetShell} ${className}`.trim()}>
      <Image
        src={src}
        alt=""
        width={SPECS_IMG_WIDTH}
        height={SPECS_IMG_HEIGHT}
        sizes="70vw"
        className="h-auto w-full"
        loading="lazy"
        decoding="async"
        unoptimized
      />
    </div>
  );
}