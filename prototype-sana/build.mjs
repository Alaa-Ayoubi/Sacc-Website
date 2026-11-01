// Bundles proposal 5 ("The dark room") into one self-contained HTML file.
//
// Type: one family named 'Sana' made of Work Sans (Latin) and Noto Sans
// Arabic (Arabic), self-hosted, split by unicode-range so each script uses
// its own face at the same light weights. Icons: Lucide. Content: the real
// bilingual snapshot (frontend/src/data/site-content.json). Photographs are
// the company's own, referenced on its CDN (content.images), not inlined.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const read = (p) => readFileSync(join(here, p), 'utf8');
const b64 = (p) => readFileSync(p).toString('base64');

function faces(pkg, family, wantFiles) {
  const css = read(`node_modules/${pkg}/wght.css`);
  return css.split('@font-face').slice(1).map((block) => {
    const file = block.match(/url\(\.\/files\/([^)]+\.woff2)\)/)?.[1];
    const range = block.match(/unicode-range:\s*([^;]+);/)?.[1];
    if (!file || !wantFiles.includes(file)) return '';
    return `@font-face{font-family:'${family}';font-style:normal;font-display:swap;font-weight:100 900;src:url(data:font/woff2;base64,${b64(join(here, 'node_modules', pkg, 'files', file))}) format('woff2');unicode-range:${range};}`;
  }).filter(Boolean).join('\n');
}

const fonts = [
  faces('@fontsource-variable/work-sans', 'Work Sans', ['work-sans-latin-wght-normal.woff2', 'work-sans-latin-ext-wght-normal.woff2']),
  faces('@fontsource-variable/noto-sans-arabic', 'Noto Sans Arabic', ['noto-sans-arabic-arabic-wght-normal.woff2']),
].join('\n');

const ICONS = ['arrow-left', 'arrow-right', 'arrow-down', 'phone', 'mail', 'menu', 'x', 'languages', 'upload', 'circle-alert', 'check'];
const icons = Object.fromEntries(ICONS.map((n) => [n, read(`node_modules/lucide-static/icons/${n}.svg`)
  .replace(/<!--[\s\S]*?-->/g, '').replace(/\s*class="[^"]*"/, '').replace(/\s+/g, ' ').trim()]));

const content = JSON.parse(readFileSync(join(root, 'frontend/src/data/site-content.json'), 'utf8'));
const logo = `data:image/webp;base64,${b64(join(root, 'frontend/public/assets/logo-full.webp'))}`;

const html = read('src/template.html')
  .replace('/*FONTS*/', () => fonts)
  .replace('/*STYLES*/', () => read('src/styles.css'))
  .replace('/*DATA*/', () => `window.SACC=${JSON.stringify({ content, icons, logo })};`)
  .replace('/*APP*/', () => read('src/app.js'));

mkdirSync(join(here, 'dist'), { recursive: true });
writeFileSync(join(here, 'dist/index.html'), html);
console.log(`dist/index.html  ${(html.length / 1024).toFixed(0)} KB`);
