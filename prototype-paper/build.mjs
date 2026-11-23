// Builds the owner-approved light redesign (BRIEF.md) into one self-contained
// HTML file for review: every page, Arabic and English.
//
// The file works with scripting off: pages switch with :target, the project
// filter and the tabs are radio inputs, and the phone menu is a page of its own.
// Type is self-hosted and split by unicode-range, so Latin and Arabic share
// one family name each (run `npm install` here first).
// Photos: the four company photographs in the repository are re-encoded in
// assets/ and inlined once as CSS variables; the rest stay on the company CDN.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { renderAll, logoCss } from './src/render.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const b64 = (p) => readFileSync(p).toString('base64');

function faces(family, pkg, cssFile, wantFiles, weight, from = here) {
  const dir = join(from, 'node_modules', pkg);
  const css = readFileSync(join(dir, cssFile), 'utf8');
  return css.split('@font-face').slice(1).map((block) => {
    const file = block.match(/url\(\.\/files\/([^)]+\.woff2)\)/)?.[1];
    const range = block.match(/unicode-range:\s*([^;]+);/)?.[1];
    if (!file || !wantFiles.includes(file)) return '';
    return `@font-face{font-family:'${family}';font-style:normal;font-display:swap;font-weight:${weight};src:url(data:font/woff2;base64,${b64(join(dir, 'files', file))}) format('woff2');unicode-range:${range};}`;
  }).filter(Boolean).join('\n');
}
// A browser picks the faces of a family by weight first and by script second,
// so the two scripts only combine when they declare exactly the same weights.
// Each family therefore fills the same weight slots for both scripts, reusing a
// file where a face has no such weight.
//
// The owner chose El Messiri for headings and Tajawal for text (both scripts
// from each family), after asking for everything bolder and clearer: body text
// (500) is Tajawal Medium, labels (600) Tajawal Bold, headings El Messiri
// SemiBold and small titles El Messiri Bold.
const both = (family, pkg, w, slot = w) => faces(family, `@fontsource/${pkg}`, `${w}.css`, [`${pkg}-arabic-${w}-normal.woff2`, `${pkg}-latin-${w}-normal.woff2`, `${pkg}-latin-ext-${w}-normal.woff2`], String(slot));
const fonts = [
  both('Sacc', 'tajawal', 400), both('Sacc', 'tajawal', 500), both('Sacc', 'tajawal', 700, 600), both('Sacc', 'tajawal', 800, 700),
  both('SaccDisplay', 'el-messiri', 600, 400), both('SaccDisplay', 'el-messiri', 600, 500), both('SaccDisplay', 'el-messiri', 700, 600),
].join('\n');

const LOCAL = ['hero-infrastructure', 'water-network', 'public-realm', 'equipment-fleet'];
const vars = `:root{--ph-logo:url(data:image/webp;base64,${b64(join(root, 'frontend/public/assets/logo-full.webp'))});--ph-mark:url(data:image/png;base64,${b64(join(here, 'assets/mark.png'))});${
  LOCAL.map((n) => `--ph-${n}:url(data:image/jpeg;base64,${b64(join(here, 'assets', `${n}.jpg`))});`).join('')}}`;

const site = JSON.parse(readFileSync(join(root, 'frontend/src/data/site-content.json'), 'utf8'));
const css = readFileSync(join(here, 'src/styles.css'), 'utf8');

// Optional polish only; nothing depends on it. It keeps the home page's bar in
// step with the scroll, and reveals each section once as it comes into view;
// a revealed element drops its reveal classes, so a later filter or tab change
// does not replay the entrance.
const script = `(function(){var d=document.documentElement;d.classList.add('js');var bars=[].slice.call(document.querySelectorAll('.home > .bar'));function on(){var s=window.scrollY>window.innerHeight*0.8;bars.forEach(function(b){b.classList.toggle('stuck',s)})}addEventListener('scroll',on,{passive:true});addEventListener('hashchange',function(){var t=document.getElementById(location.hash.slice(1));if(!t||t.classList.contains('page'))window.scrollTo(0,0);on()});on();if('IntersectionObserver' in window&&matchMedia('(prefers-reduced-motion: no-preference)').matches){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var t=e.target;t.classList.add('in');io.unobserve(t);t.addEventListener('animationend',function done(v){if(v.target!==t)return;t.removeEventListener('animationend',done);t.classList.remove('rise','in')})}})},{rootMargin:'0px 0px -8% 0px'});d.classList.add('reveal');[].forEach.call(document.querySelectorAll('.rise'),function(el){io.observe(el)})}})();`;

const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#FFFFFF">
<link rel="preconnect" href="https://horizons-cdn.hostinger.com">
<title>${site.ar.brandLine} | ${site.en.brandLine}</title>
<style>
${fonts}
${vars}
${logoCss()}
${css}
</style>
</head>
<body>
${renderAll(site)}
<script>${script}</script>
</body>
</html>
`;

mkdirSync(join(here, 'dist'), { recursive: true });
writeFileSync(join(here, 'dist/index.html'), html);
console.log(`dist/index.html  ${(html.length / 1024).toFixed(0)} KB`);
