import fs from "fs";
import path from "path";

const OUT = "public/images/specs-ar-glasses";

const ASSETS = [
  {
    file: "260527-front-view-folded-shadow.png",
    url: "https://images.ctfassets.net/fdtlyqzgdb9e/2LAYgy13DTzqPBZcqaKHkN/9d1a3341e256ea58f944f12fa11f3886/260527_Front_View_Folded_Shadow.png",
  },
  {
    file: "260522-frontview-2.png",
    url: "https://images.ctfassets.net/fdtlyqzgdb9e/6mqYAExUHlcJlrCFuk6gGM/6493466a074da5213f206815f75703f6/260522_52_Frontview__2_.png",
  },
  {
    file: "260527-frontview-tinted-1.png",
    url: "https://images.ctfassets.net/fdtlyqzgdb9e/1TrSzxb2YKi8VcHCZPJI7s/a22bb1b4635c3a751067f2a38901a483/260527_52_Frontview_Tinted__1_.png",
  },
  {
    file: "260527-sideview-1.png",
    url: "https://images.ctfassets.net/fdtlyqzgdb9e/2MLyD9FtbTvboXnaA9t8EX/120737881d0ac76e8e54f47ccb4f399c/260527_52_Sideview__1_.png",
  },
  {
    file: "2605023-3-4-view-3.png",
    url: "https://images.ctfassets.net/fdtlyqzgdb9e/6JgrgTWB7FjfqtXU82Sk8B/57eb39af80b208beaa5b25ba5d21df8f/2605023_52_3_4_view__3_.png",
  },
];

for (const { file, url } of ASSETS) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(path.join(OUT, file), buf);
  console.log(file, buf.length, "bytes");
}
