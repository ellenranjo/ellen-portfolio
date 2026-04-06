const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const src = path.join(root, "node_modules", "pdfjs-dist", "build", "pdf.worker.min.mjs");
const dest = path.join(root, "public", "pdf.worker.min.mjs");

if (!fs.existsSync(src)) {
  console.warn(
    "[copy-pdf-worker] pdf.worker.min.mjs not found (skip until after npm install).",
  );
  process.exit(0);
}

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);
console.log("[copy-pdf-worker] Copied pdf.worker.min.mjs → public/");
