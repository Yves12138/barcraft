const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "outputs", "barcraft-app");

const files = [
  "index.html",
  "app.js",
  "styles.css",
  "iba-data.js",
  "manifest.webmanifest",
  "service-worker.js"
];

const assetDirs = [
  path.join("assets", "cocktails"),
  path.join("assets", "icons"),
  path.join("assets", "textures")
];

function copyFile(relativePath) {
  const from = path.join(root, relativePath);
  const to = path.join(outputDir, relativePath);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

function copyDir(relativePath) {
  const from = path.join(root, relativePath);
  const to = path.join(outputDir, relativePath);
  if (!fs.existsSync(from)) return;
  fs.rmSync(to, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.cpSync(from, to, { recursive: true });
}

fs.mkdirSync(outputDir, { recursive: true });
for (const file of files) copyFile(file);
for (const dir of assetDirs) copyDir(dir);

console.log(`Prepared Capacitor web assets in ${path.relative(root, outputDir)}`);
