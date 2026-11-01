// Bundles proposal 2 (contemporary Hejazi) into one self-contained HTML file.
//
// Everything the page needs is inlined: fonts (self-hosted from fontsource,
// no font CDN), the logo, the Lucide icon set and the bilingual content. The
// content is read from frontend/src/data/site-content.json, the snapshot the
// live React site renders, so the prototype shows the real copy.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const read = (p, enc = 'utf8') => readFileSync(join(here, p), enc);
const b64 = (p) => readFileSync(p).toString('base64');

// Fonts: only the arabic and latin subsets of each variable family, each with
// the unicode-range fontsource publishes so a script loads only what it needs.
function fontFaces(pkg, family, subsets) {
  const name = pkg.split('/').pop();
  const css = read(`node_modules/${pkg}/wght.css`);
  const out = [];
  for (const block of css.split('@font-face').slice(1)) {
    const file = block.match(/url\(\.\/files\/([^)]+\.woff2)\)/)?.[1];
    const range = block.match(/unicode-range:\s*([^;]+);/)?.[1];
    if (!file || !subsets.some((s) => file === `${name}-${s}-wght-normal.woff2`)) continue;
    out.push(`@font-face{font-family:'${family}';font-style:normal;font-display:swap;font-weight:100 900;src:url(data:font/woff2;base64,${b64(join(here, 'node_modules', pkg, 'files', file))}) format('woff2');unicode-range:${range};}`);
  }
  if (out.length !== subsets.length) throw new Error(`missing font faces for ${family}`);
  return out.join('\n');
}

const fonts = [
  fontFaces('@fontsource-variable/noto-kufi-arabic', 'Noto Kufi Arabic', ['arabic', 'latin']),
  fontFaces('@fontsource-variable/noto-naskh-arabic', 'Noto Naskh Arabic', ['arabic', 'latin']),
].join('\n');

// Icons: one stroke family (Lucide), inlined as an id -> svg map.
const ICONS = [
  'arrow-left', 'arrow-right', 'arrow-up-left', 'arrow-up-right', 'check', 'phone', 'mail', 'map-pin', 'clock',
  'file-text', 'menu', 'x', 'languages', 'upload', 'circle-alert', 'send',
  'droplets', 'cloud-rain', 'zap', 'route', 'construction', 'trees', 'flask-conical', 'truck', 'settings',
  'wrench', 'satellite', 'hard-hat', 'layers', 'graduation-cap', 'users', 'shield-check', 'badge-check', 'plus', 'minus',
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
writeFileSync(join(here, 'dist/sacc-prototype-hejazi.html'), html);
console.log(`dist/sacc-prototype-hejazi.html  ${(html.length / 1024).toFixed(0)} KB`);
