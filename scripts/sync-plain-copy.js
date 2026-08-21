/**
 * Sync scripts/narrative-copy.json into plain/** PHP pages.
 * Updates test hook/buildup blocks and category intro paragraphs.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const copy = JSON.parse(
  fs.readFileSync(path.join(__dirname, "narrative-copy.json"), "utf8")
);

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function syncTest(slug, n) {
  const file = path.join(root, "plain", slug, "index.php");
  if (!fs.existsSync(file)) {
    console.warn("skip missing", slug);
    return;
  }
  let html = fs.readFileSync(file, "utf8");
  const next = html.replace(
    /<div class="swg-info">[\s\S]*?<\/div>(\s*)<div class="swg-run([^"]*)">/,
    `<div class="swg-info">
            <section class="swg-block">
              <div class="swg-block-label">${esc(n.hookHeading)}</div>
              <p class="swg-block-text">${esc(n.hook)}</p>
            </section>
            <section class="swg-block">
              <div class="swg-block-label">${esc(n.buildupHeading)}</div>
              <p class="swg-block-text">${esc(n.buildup)}</p>
            </section>
          </div>$1<div class="swg-run$2">`
  );
  if (next === html) {
    console.warn("no swg-info match", slug);
    return;
  }
  fs.writeFileSync(file, next);
  console.log("test", slug);
}

function syncCategory(name, paras, dir) {
  const file = path.join(root, "plain", dir, "index.php");
  if (!fs.existsSync(file)) {
    console.warn("skip category", dir);
    return;
  }
  let html = fs.readFileSync(file, "utf8");
  const body = paras.map((p) => `            <p>${esc(p)}</p>`).join("\n");
  const next = html.replace(
    /<div class="swg-category-copy">[\s\S]*?<\/div>/,
    `<div class="swg-category-copy">\n${body}\n          </div>`
  );
  if (next === html) {
    console.warn("no category-copy match", dir);
    return;
  }
  fs.writeFileSync(file, next);
  console.log("category", name);
}

for (const [slug, n] of Object.entries(copy.tests || {})) {
  syncTest(slug, n);
}

const catDirs = {
  Phishing: "phishing",
  Malware: "malware",
  "Data Theft": "data-theft",
  Cyberslacking: "cyberslacking",
};
for (const [name, paras] of Object.entries(copy.categories || {})) {
  syncCategory(name, paras, catDirs[name]);
}

console.log("done");
