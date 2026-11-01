// Bundles proposal 3 (the project signboard) into one self-contained HTML
// file for review.
//
// Everything the page needs is inlined: fonts (self-hosted, no font CDN),
// the logo, the icon set and the bilingual content. The content is read
// from frontend/src/data/site-content.json, the same snapshot the live
// React site renders, so the prototype shows the real copy, not filler.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const read = (p, enc = 'utf8') => readFileSync(join(here, p), enc);
const b64 = (p) => readFileSync(p).toString('base64');

// Fonts: only the subsets each family is used for, with the unicode ranges
// fontsource publishes, so each script loads only what it needs.
function fontFaces(pkg, family, cssFile, wantedSubsets) {
  const css = read(`node_modules/${pkg}/${cssFile}`);
  const out = [];
  for (const block of css.split('@font-face').slice(1)) {
    const file = block.match(/url\(\.\/files\/([^)]+\.woff2)\)/)?.[1];
    const range = block.match(/unicode-range:\s*([^;]+);/)?.[1];
    const weight = block.match(/font-weight:\s*([^;]+);/)?.[1] ?? '100 900';
    const stretch = block.match(/font-stretch:\s*([^;]+);/)?.[1];
    if (!file || !wantedSubsets.some((s) => file.includes(`-${s}-`))) continue;
    out.push(`@font-face{font-family:'${family}';font-style:normal;font-display:swap;font-weight:${weight};${stretch ? `font-stretch:${stretch};` : ''}src:url(data:font/woff2;base64,${b64(join(here, 'node_modules', pkg, 'files', file))}) format('woff2');unicode-range:${range};}`);
  }
  if (!out.length) throw new Error(`no font faces found for ${family}`);
  return out.join('\n');
}

const fonts = [
  // Latin and numerals for both languages: a sturdy grotesque with a width axis.
  fontFaces('@fontsource-variable/archivo', 'Archivo', 'standard.css', ['latin']),
  // The board voice: Kufi for titles, keys, values and interface.
  fontFaces('@fontsource-variable/noto-kufi-arabic', 'Noto Kufi Arabic', 'wght.css', ['arabic']),
  // Running Arabic prose: Naskh.
  fontFaces('@fontsource-variable/noto-naskh-arabic', 'Noto Naskh Arabic', 'wght.css', ['arabic']),
].join('\n');

// Icons: one stroke family (Lucide), inlined as an id -> svg map.
const ICONS = [
  'arrow-left', 'arrow-right', 'chevron-left', 'chevron-right', 'chevron-down',
  'check', 'phone', 'mail', 'map-pin', 'clock', 'file-text', 'menu', 'x',
  'languages', 'upload', 'send', 'circle-alert', 'shield-check', 'user-round',
  'file-down',
];
const icons = Object.fromEntries(ICONS.map((name) => {
  const svg = read(`node_modules/lucide-static/icons/${name}.svg`)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s*class="[^"]*"/, '')
    .replace(/\s+/g, ' ')
    .trim();
  return [name, svg];
}));

const content = JSON.parse(readFileSync(join(root, 'frontend/src/data/site-content.json'), 'utf8'));
const logo = `data:image/webp;base64,${b64(join(root, 'frontend/public/assets/logo-full.webp'))}`;

const html = read('src/template.html')
  .replace('/*FONTS*/', () => fonts)
  .replace('/*STYLES*/', () => read('src/styles.css'))
  .replace('/*DATA*/', () => `window.SACC=${JSON.stringify({ content, icons, logo })};`)
  .replace('/*APP*/', () => read('src/app.js'));

mkdirSync(join(here, 'dist'), { recursive: true });
writeFileSync(join(here, 'dist/sacc-prototype-signboard.html'), html);
console.log(`dist/sacc-prototype-signboard.html  ${(html.length / 1024).toFixed(0)} KB`);
