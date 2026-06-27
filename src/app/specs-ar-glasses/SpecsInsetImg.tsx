import Image from "next/image";

/** Side margins for SPECS case study media — 15% inset each side */
export const specsInsetShell = "mx-auto w-[70%]";

function imageUnoptimized(src: string) {
  return /\.(gif|avif|svg)(\?|$)/i.test(src);
}

export function SpecsInsetImgAfterIntro({ src }: { src: string }) {
  return (
    <div className={`${specsInsetShell} mt-10 mb-10 md:mb-20`}>
      <Image
        src={src}
        alt=""
        width={2400}
        height={1600}
        sizes="70vw"
        className="h-auto w-full"
        priority
        decoding="async"
        unoptimized={imageUnoptimized(src)}
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
        width={2400}
        height={1600}
        sizes="70vw"
        className="h-auto w-full"
        loading="lazy"
        decoding="async"
        unoptimized={imageUnoptimized(src)}
      />
    </div>
  );
}
