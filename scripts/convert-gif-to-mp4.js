const { spawnSync } = require("child_process");
const path = require("path");
const ffmpegPath = require("ffmpeg-static");

const gifPath = path.join(__dirname, "../public/images/ps5-final.gif");
const mp4Path = path.join(__dirname, "../public/images/ps5-final.mp4");

// GIF dithering is baked into pixels — downscale + denoise softens the dot grid for web.
const vf =
  "scale=min(iw\\,1920):-2:flags=lanczos," +
  "hqdn3d=4:3:6:4," +
  "format=yuv420p";

const result = spawnSync(
  ffmpegPath,
  [
    "-i",
    gifPath,
    "-movflags",
    "faststart",
    "-pix_fmt",
    "yuv420p",
    "-crf",
    "20",
    "-vf",
    vf,
    "-y",
    mp4Path,
  ],
  { stdio: "inherit" }
);

if (result.status !== 0) process.exit(result.status);

// First-frame poster for seamless card hover (matches video t=0)
const posterPath = path.join(__dirname, "../public/images/ps5-poster.jpg");
const poster = spawnSync(
  ffmpegPath,
  [
    "-y",
    "-i",
    mp4Path,
    "-frames:v",
    "1",
    "-update",
    "1",
    "-q:v",
    "2",
    posterPath,
  ],
  { stdio: "inherit" }
);
process.exit(poster.status || 0);
