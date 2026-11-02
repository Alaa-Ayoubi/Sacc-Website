// Bundles proposal 6 into one self-contained HTML file for review.
//
// Built from the owner-approved brief (BRIEF.md): Sirion-inspired character,
// the owner's ten-colour palette, WCAG 2.2 AA.
// Type: Onest (Latin) and IBM Plex Sans Arabic (Arabic), self-hosted and split
// by unicode-range under one family name, so both scripts share light weights.
// Photos: the four company photographs in the repository are re-encoded in
// assets/ and inlined; the rest stay on the company CDN (content.images).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const read = (p) => readFileSync(join(here, p), 'utf8');
const b64 = (p) => readFileSync(p).toString('base64');

function faces(pkg, cssFile, wantFiles, weight) {
  const css = read(`node_modules/${pkg}/${cssFile}`);
  return css.split('@font-face').slice(1).map((block) => {
    const file = block.match(/url\(\.\/files\/([^)]+\.woff2)\)/)?.[1];
    const range = block.match(/unicode-range:\s*([^;]+);/)?.[1];
    if (!file || !wantFiles.includes(file)) return '';
    return `@font-face{font-family:'Sacc';font-style:normal;font-display:swap;font-weight:${weight};src:url(data:font/woff2;base64,${b64(join(here, 'node_modules', pkg, 'files', file))}) format('woff2');unicode-range:${range};}`;
  }).filter(Boolean).join('\n');
}

const plex = (w) => faces('@fontsource/ibm-plex-sans-arabic', `${w}.css`, [`ibm-plex-sans-arabic-arabic-${w}-normal.woff2`], String(w));
const fonts = [
  faces('@fontsource-variable/onest', 'wght.css', ['onest-latin-wght-normal.woff2', 'onest-latin-ext-wght-normal.woff2'], '100 900'),
  plex(300), plex(400), plex(500),
].join('\n');

const ICONS = ['arrow-left', 'arrow-right', 'arrow-up-left', 'arrow-up-right', 'phone', 'mail', 'menu', 'x', 'languages', 'upload', 'circle-alert', 'check', 'map-pin', 'clock'];
const icons = Object.fromEntries(ICONS.map((n) => [n, read(`node_modules/lucide-static/icons/${n}.svg`)
  .replace(/<!--[\s\S]*?-->/g, '').replace(/\s*class="[^"]*"/, '').replace(/\s+/g, ' ').trim()]));

const content = JSON.parse(readFileSync(join(root, 'frontend/src/data/site-content.json'), 'utf8'));
const logo = `data:image/webp;base64,${b64(join(root, 'frontend/public/assets/logo-full.webp'))}`;

// Local photographs, keyed by their repository path so content.images resolves to them.
const LOCAL = ['hero-infrastructure', 'water-network', 'public-realm', 'equipment-fleet'];
const photos = Object.fromEntries(LOCAL.map((n) => [`./assets/photos/${n}.jpg`, `data:image/jpeg;base64,${b64(join(here, 'assets', `${n}.jpg`))}`]));

const html = read('src/template.html')
  .replace('/*FONTS*/', () => fonts)
  .replace('/*STYLES*/', () => read('src/styles.css'))
  .replace('/*DATA*/', () => `window.SACC=${JSON.stringify({ content, icons, logo, photos })};`)
  .replace('/*APP*/', () => read('src/app.js'));

mkdirSync(join(here, 'dist'), { recursive: true });
writeFileSync(join(here, 'dist/index.html'), html);
console.log(`dist/index.html  ${(html.length / 1024).toFixed(0)} KB`);
