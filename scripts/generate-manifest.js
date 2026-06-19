const fs = require("fs");
const path = require("path");

// Writes manifest.js (not manifest.json) on purpose: browsers block fetch()
// of local files under file://, but a plain <script src> tag loads fine
// even when index.html is opened by double-click. drawings.js/gallery.js
// read the globals these files set instead of fetching JSON.
const FOLDERS = [
  { dir: "drawings", globalName: "DrawingsManifest" },
  { dir: "visualizations", globalName: "VisualizationsManifest" },
  { dir: "photos", globalName: "PhotosManifest" },
];

const root = path.join(__dirname, "..");

FOLDERS.forEach(({ dir, globalName }) => {
  const folderPath = path.join(root, dir);
  fs.mkdirSync(folderPath, { recursive: true });

  const files = fs
    .readdirSync(folderPath)
    .filter((name) => name !== "manifest.js" && !name.startsWith("."))
    .sort();

  const contents = `window.App = window.App || {};\nwindow.App.${globalName} = ${JSON.stringify(files, null, 2)};\n`;
  fs.writeFileSync(path.join(folderPath, "manifest.js"), contents);
  console.log(`${dir}/manifest.js -> ${files.length} file(s)`);
});
