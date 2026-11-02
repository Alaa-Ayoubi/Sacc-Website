// Bundles the prototype into one self-contained HTML file for review.
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

// Fonts: the arabic + latin subsets of both variable families, with the
// unicode ranges fontsource publishes, so each script loads only what it needs.
function fontFaces(pkg, family, cssFile, wantedSubsets) {
  const css = read(`node_modules/${pkg}/${cssFile}`);
  const blocks = css.split('@font-face').slice(1);
  const out = [];
  for (const block of blocks) {
    const subset = block.match(/\/\*\s*([\w-]+)\s*\*\//)?.[1]
      ?? block.match(/files\/[\w-]+?-(arabic|latin-ext|latin|vietnamese)-/)?.[1];
    const file = block.match(/url\(\.\/files\/([^)]+\.woff2)\)/)?.[1];
    const range = block.match(/unicode-range:\s*([^;]+);/)?.[1];
    const weight = block.match(/font-weight:\s*([^;]+);/)?.[1] ?? '100 900';
    if (!file || !wantedSubsets.some((s) => file.includes(`-${s}-`))) continue;
    out.push(`@font-face{font-family:'${family}';font-style:normal;font-display:swap;font-weight:${weight};src:url(data:font/woff2;base64,${b64(join(here, 'node_modules', pkg, 'files', file))}) format('woff2');unicode-range:${range};}`);
    void subset;
  }
  if (!out.length) throw new Error(`no font faces found for ${family}`);
  return out.join('\n');
}

const fonts = [
  fontFaces('@fontsource-variable/alexandria', 'Alexandria', 'wght.css', ['arabic', 'latin']),
  fontFaces('@fontsource-variable/readex-pro', 'Readex Pro', 'wght.css', ['arabic', 'latin']),
].join('\n');

// Icons: one stroke family (Lucide), inlined as an id -> svg map.
const ICONS = [
  'arrow-left', 'arrow-right', 'check', 'phone', 'mail', 'map-pin', 'clock',
  'file-text', 'chevron-down', 'menu', 'x', 'languages', 'upload', 'link',
  'droplets', 'cloud-rain', 'zap', 'route', 'construction', 'trees',
  'flask-conical', 'truck', 'settings', 'wrench', 'satellite', 'hard-hat',
  'layers', 'graduation-cap', 'shield-check', 'briefcase', 'circle-alert',
  'send', 'building-2',
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
writeFileSync(join(here, 'dist/sacc-prototype.html'), html);
console.log(`dist/sacc-prototype.html  ${(html.length / 1024).toFixed(0)} KB`);
