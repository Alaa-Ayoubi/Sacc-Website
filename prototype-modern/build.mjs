// Bundles proposal 4 into one self-contained HTML file for review.
//
// Fonts (Almarai, self-hosted), the Lucide icon set, the logo and the real
// bilingual content (frontend/src/data/site-content.json) are inlined.
// Photographs are NOT inlined: they are the company's own images on its CDN
// (content.images), referenced by URL so the page shows the real work.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const read = (p) => readFileSync(join(here, p), 'utf8');
const b64 = (p) => readFileSync(p).toString('base64');

function almarai(weights) {
  const out = [];
  for (const w of weights) {
    const css = read(`node_modules/@fontsource/almarai/${w}.css`);
    for (const block of css.split('@font-face').slice(1)) {
      const file = block.match(/url\(\.\/files\/([^)]+\.woff2)\)/)?.[1];
      const range = block.match(/unicode-range:\s*([^;]+);/)?.[1];
      if (!file || !/-(arabic|latin)-/.test(file)) continue;
      out.push(`@font-face{font-family:'Almarai';font-style:normal;font-display:swap;font-weight:${w};src:url(data:font/woff2;base64,${b64(join(here, 'node_modules/@fontsource/almarai/files', file))}) format('woff2');unicode-range:${range};}`);
    }
  }
  return out.join('\n');
}

const ICONS = [
  'arrow-left', 'arrow-right', 'check', 'phone', 'mail', 'map-pin', 'clock',
  'file-text', 'chevron-down', 'menu', 'x', 'languages', 'upload', 'send',
  'shield-check', 'circle-alert', 'wrench', 'satellite', 'hard-hat', 'layers',
  'graduation-cap', 'briefcase', 'award', 'building-2',
];
const icons = Object.fromEntries(ICONS.map((name) => [name, read(`node_modules/lucide-static/icons/${name}.svg`)
  .replace(/<!--[\s\S]*?-->/g, '').replace(/\s*class="[^"]*"/, '').replace(/\s+/g, ' ').trim()]));

const content = JSON.parse(readFileSync(join(root, 'frontend/src/data/site-content.json'), 'utf8'));
const logo = `data:image/webp;base64,${b64(join(root, 'frontend/public/assets/logo-full.webp'))}`;

const html = read('src/template.html')
  .replace('/*FONTS*/', () => almarai([400, 700, 800]))
  .replace('/*STYLES*/', () => read('src/styles.css'))
  .replace('/*DATA*/', () => `window.SACC=${JSON.stringify({ content, icons, logo })};`)
  .replace('/*APP*/', () => read('src/app.js'));

mkdirSync(join(here, 'dist'), { recursive: true });
writeFileSync(join(here, 'dist/sacc-prototype-modern.html'), html);
console.log(`dist/sacc-prototype-modern.html  ${(html.length / 1024).toFixed(0)} KB`);
