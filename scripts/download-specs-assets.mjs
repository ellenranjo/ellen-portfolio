import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import ffmpegPath from "ffmpeg-static";

const OUT = "public/images/specs-ar-glasses";

const STILLS = [
  {
    file: "wave-exploded.png",
    url: "https://images.ctfassets.net/fdtlyqzgdb9e/VrjUrEp6KMrsFGlCviuM2/531062a5fe81e86315ac90dff00b1b62/Wave.png",
  },
  {
    file: "interface.png",
    url: "https://images.ctfassets.net/fdtlyqzgdb9e/5aVeFhjq2NdMDxRz1fgpF1/1e63df37405177527280a523176ec10a/Interface.png",
  },
  {
    file: "snapdragon.png",
    url: "https://images.ctfassets.net/fdtlyqzgdb9e/5knVbVAyrXlx2hevoXurZY/bb58fe8ff31efadec91ef4923f0c4bb4/Snapdragon.png",
  },
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
  {
    file: "260522-front-case-shadow.png",
    url: "https://images.ctfassets.net/fdtlyqzgdb9e/4OTTHy3neRsW4dcu8yjavF/b83c6ee29e976db4ff6c33aef0ae1d95/260522_Front_Case_Shadow.png",
  },
  {
    file: "incontext-0010-077.jpg",
    url: "https://images.ctfassets.net/fdtlyqzgdb9e/2ll85PrQLAmnyH65nAXPHS/eaa39e41fd963280cb8962843492701f/SME_26001_0010_077_v4_11_QC.jpg",
  },
  {
    file: "incontext-0050-069.jpg",
    url: "https://images.ctfassets.net/fdtlyqzgdb9e/3ibpKyuFxdGUO1qAVEEqmE/d1be2a85ba4fe117eceb7b6a71bd70ae/SME_26001_0050_069_v2_10_QC.jpg",
  },
  {
    file: "incontext-0030-072.jpg",
    url: "https://images.ctfassets.net/fdtlyqzgdb9e/2E7dvO1ylbnRbEt3d0dhS1/c82a09ab1b104105a496d081b0959cc8/SME_26001_0030_072_v1_12_QC.jpg",
  },
  {
    file: "incontext-0110-039.jpg",
    url: "https://images.ctfassets.net/fdtlyqzgdb9e/kAKJwCQghQZYDr3SgnGvT/df72e9cf24ade861caf763438138aa53/SME_26001_0110_039_v1_11_QC.jpg",
  },
  {
    file: "incontext-0040-080.jpg",
    url: "https://images.ctfassets.net/fdtlyqzgdb9e/mDu4owAPxzqld7aUabwFt/5b034cbbfd3074abb2976e5c094c2732/SME_26001_0040_080_v2_09_QC.jpg",
  },
];

const DIRECT_MP4 = [
  {
    file: "homepage-meisel-16x9.mp4",
    url: "https://videos.ctfassets.net/fdtlyqzgdb9e/5SDH54dmIAQux18t0JtoF6/ff107ab0c2a3c8306561f2e1fc52bbf7/SNAP_SPECS_MEISEL_15s_CGI_4k_16x9_GENERIC_Web_2.mp4",
  },
  {
    file: "1p-casting-fixed-uhd.mp4",
    url: "https://videos.ctfassets.net/fdtlyqzgdb9e/YTzMmNOJS2uNOr8IvOOfV/a366b5617d6bcab15888765624fc1014/1P_Casting_Fixed_1_UHD.mp4",
  },
  {
    file: "1p-navigation-01-uhd.mp4",
    url: "https://videos.ctfassets.net/fdtlyqzgdb9e/78TcSmLqUA49o4Z0yzKauu/0c1328454309c1ffb3d3a0b422dbb613/1P_Navigation_01_UHD.mp4",
  },
];

/** One-time HLS sources — converted to local mp4 for self-hosted playback */
const HLS_TO_MP4 = [
  {
    file: "front-frame-rotating-view.mp4",
    url: "https://web-platform.snap.com/vod/o1znirz7lzo4/O8zo83WDFA8Cxi88h46Nu/4875743dab9a03b21339da83c00a6b17/SPECS27_Front_Frame_Rotating_View_1.m3u8",
  },
  {
    file: "case-inserted.mp4",
    url: "https://web-platform.snap.com/vod/o1znirz7lzo4/2EIYkeE4rsU5nR7fqXD1ys/cc50638e5dd476443a1c89d44c699888/SPECS27_Case_Inserted.m3u8",
  },
  {
    file: "frontview-recording-led.mp4",
    url: "https://web-platform.snap.com/vod/o1znirz7lzo4/NCByXZ7gHk4tnPb1CL0IO/7fd8e280d60c1d062affa79eed0f8d8c/260527_Frontview_Recording_LED__2_.m3u8",
  },
];

fs.mkdirSync(OUT, { recursive: true });

async function downloadDirect({ file, url }) {
  const dest = path.join(OUT, file);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log("downloaded", file, buf.length);
}

function convertHls({ file, url }) {
  const dest = path.join(OUT, file);
  const result = spawnSync(
    ffmpegPath,
    ["-y", "-i", url, "-c", "copy", "-movflags", "faststart", dest],
    { stdio: "inherit" },
  );
  if (result.status !== 0) throw new Error(`ffmpeg failed for ${file}`);
  console.log("converted", file, fs.statSync(dest).size);
}

for (const item of STILLS) {
  await downloadDirect(item);
}

for (const item of DIRECT_MP4) {
  await downloadDirect(item);
}

for (const item of HLS_TO_MP4) {
  convertHls(item);
}

console.log("done");
