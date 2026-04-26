const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const OUTPUT_DIR = path.join(__dirname, "assets");
const ASSETS_PATH = "assets";
const SITE_URL = "https://hall.restuhaqza.dev";
const SITE_NAME = "The Patronous Project";
const TAGLINE = "Not one spell. A whole staff of wizards.";
const STAR = "\u2605";
const GOLD = "#c9a84c";
const GOLD_LIGHT = "#e8d48b";
const BG_DEEP = "#0a0a12";
const BG_CARD = "#12121f";
const TEXT_BRIGHT = "#f0eef5";
const TEXT_DIM = "#a9a4b8";
const PURPLE = "#6b4c8a";
const BLUE = "#4a6fa5";

async function writeFavicon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BG_DEEP}"/>
      <stop offset="100%" stop-color="${BG_CARD}"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#bg)"/>
  <text x="32" y="44" text-anchor="middle" font-family="Georgia, serif" font-size="36" fill="${GOLD}">${STAR}</text>
</svg>`;

  fs.writeFileSync(path.join(OUTPUT_DIR, "favicon.svg"), svg.trim() + "\n");

  await sharp(Buffer.from(svg)).resize(180, 180).png().toFile(path.join(OUTPUT_DIR, "favicon.png"));
  await sharp(Buffer.from(svg)).resize(32, 32).png().toFile(path.join(OUTPUT_DIR, "favicon-32.png"));
  await sharp(Buffer.from(svg)).resize(16, 16).png().toFile(path.join(OUTPUT_DIR, "favicon-16.png"));
  await sharp(Buffer.from(svg)).resize(180, 180).png().toFile(path.join(OUTPUT_DIR, "apple-touch-icon.png"));

  console.log("  ✓ favicon.svg + PNG variants + apple-touch-icon");
}

async function writeOgImage() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BG_DEEP}"/>
      <stop offset="60%" stop-color="${BG_CARD}"/>
      <stop offset="100%" stop-color="#0f0f1e"/>
    </linearGradient>
    <radialGradient id="centerGlow" cx="50%" cy="45%" r="45%">
      <stop offset="0%" stop-color="${PURPLE}" stop-opacity="0.18"/>
      <stop offset="40%" stop-color="${BLUE}" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="630" fill="url(#centerGlow)"/>

  <!-- Decorative particles -->
  <circle cx="150" cy="120" r="1.5" fill="${GOLD}" opacity="0.3"/>
  <circle cx="350" cy="80" r="1" fill="${GOLD_LIGHT}" opacity="0.2"/>
  <circle cx="850" cy="95" r="1.5" fill="${GOLD}" opacity="0.25"/>
  <circle cx="1050" cy="150" r="1" fill="${GOLD_LIGHT}" opacity="0.2"/>
  <circle cx="200" cy="500" r="1" fill="${GOLD}" opacity="0.15"/>
  <circle cx="980" cy="520" r="1.5" fill="${GOLD_LIGHT}" opacity="0.2"/>
  <circle cx="600" cy="580" r="1" fill="${GOLD}" opacity="0.15"/>
  <circle cx="100" cy="350" r="1" fill="${TEXT_DIM}" opacity="0.2"/>
  <circle cx="1100" cy="400" r="1" fill="${TEXT_DIM}" opacity="0.2"/>

  <!-- Top gold line -->
  <rect x="0" y="0" width="1200" height="2" fill="${GOLD}" opacity="0.35"/>

  <!-- Star emblem with glow -->
  <circle cx="600" cy="145" r="60" fill="url(#starGlow)"/>
  <text x="600" y="168" text-anchor="middle" font-family="Georgia, serif" font-size="52" fill="${GOLD}" opacity="0.9">${STAR}</text>

  <!-- Eyebrow -->
  <text x="600" y="240" text-anchor="middle" font-family="sans-serif" font-size="16" fill="${GOLD}" letter-spacing="8" opacity="0.7">PATRONOUS PROJECT</text>

  <!-- Main title -->
  <text x="600" y="330" text-anchor="middle" font-family="Georgia, serif" font-size="68" font-weight="bold" fill="${TEXT_BRIGHT}">The Patronous</text>
  <text x="600" y="405" text-anchor="middle" font-family="Georgia, serif" font-size="68" font-weight="bold" fill="${TEXT_BRIGHT}">Project</text>

  <!-- Gold divider -->
  <rect x="540" y="430" width="120" height="1.5" fill="${GOLD}" opacity="0.5" rx="1"/>

  <!-- Tagline -->
  <text x="600" y="480" text-anchor="middle" font-family="Georgia, serif" font-size="26" font-style="italic" fill="${GOLD_LIGHT}" opacity="0.85">${TAGLINE}</text>

  <!-- Bottom info -->
  <text x="600" y="560" text-anchor="middle" font-family="sans-serif" font-size="14" fill="${TEXT_DIM}" letter-spacing="4" opacity="0.6">BUILT ON OPENCLAW</text>

  <!-- Bottom gold line -->
  <rect x="0" y="628" width="1200" height="2" fill="${GOLD}" opacity="0.35"/>
</svg>`;

  const svgPath = path.join(OUTPUT_DIR, "og-image.svg");
  fs.writeFileSync(svgPath, svg.trim() + "\n");
  console.log("  ✓ og-image.svg");

  await sharp(Buffer.from(svg)).png({ quality: 95 }).toFile(path.join(OUTPUT_DIR, "og-image.png"));
  console.log("  ✓ og-image.png (1200x630)");
}

function updateIndexHtml() {
  const htmlPath = path.join(__dirname, "index.html");
  let html = fs.readFileSync(htmlPath, "utf-8");

  const oldBlock = html.match(/\n  <link rel="icon"[\s\S]*?<meta name="twitter:image"[^>]*>/);
  if (oldBlock) {
    html = html.replace(oldBlock[0], "");
  }

  const ogTags = `
  <link rel="icon" type="image/svg+xml" href="${ASSETS_PATH}/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="${ASSETS_PATH}/favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="${ASSETS_PATH}/favicon-16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="${ASSETS_PATH}/apple-touch-icon.png">
  <meta property="og:title" content="${SITE_NAME} — A Hogwarts AI Ecosystem">
  <meta property="og:description" content="A personal AI ecosystem where magical agents work together as a team, each with their own personality, domain expertise, and tools.">
  <meta property="og:image" content="${SITE_URL}/${ASSETS_PATH}/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${SITE_NAME} — ${TAGLINE}">
  <meta property="og:url" content="${SITE_URL}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${SITE_NAME} — A Hogwarts AI Ecosystem">
  <meta name="twitter:description" content="A personal AI ecosystem where magical agents work together as a team.">
  <meta name="twitter:image" content="${SITE_URL}/${ASSETS_PATH}/og-image.png">`;

  html = html.replace(
    '<link rel="stylesheet" href="style.css">',
    ogTags + "\n  " + '<link rel="stylesheet" href="style.css">'
  );

  fs.writeFileSync(htmlPath, html);
  console.log("  ✓ index.html updated with full OG + favicon meta");
}

(async () => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log("\n\u2728 Generating Patronous site assets...\n");
  await writeFavicon();
  await writeOgImage();
  updateIndexHtml();
  console.log("\nDone! Assets in assets/, OG uses absolute URLs at " + SITE_URL + "\n");
})();
