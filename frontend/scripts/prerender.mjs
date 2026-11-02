/* Prerender every page to its own HTML file, then write the sitemap,
 * robots.txt and the 404 page.
 *
 * Runs after `vite build` (client, into dist/) and `vite build --ssr`
 * (server entry, into dist-ssr/). Each address becomes dist/<path>/index.html
 * with its full content and its own head: title, description, canonical,
 * hreflang twin, Open Graph and structured data. The browser then hydrates the
 * page instead of rebuilding it, so search engines and slow phones both get
 * real HTML on the first byte. */
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssr = join(root, 'dist-ssr');
const SITE_URL = (process.env.SITE_URL || 'https://saccgroup.net').replace(/\/$/, '');

const serverEntry = readdirSync(ssr).find((f) => /^entry-server\.m?js$/.test(f));
const { render, site, allRoutes, pathFor } = await import(pathToFileURL(join(ssr, serverEntry)).href);
const template = readFileSync(join(dist, 'index.html'), 'utf8');

// Preload the text faces the first screen needs, so the page does not reflow
// when they arrive. Vite fingerprints them, so look them up in the build.
const assets = readdirSync(join(dist, 'static'));
const font = (re) => assets.find((f) => re.test(f));
const preloadFor = {
  ar: font(/^ibm-plex-sans-arabic-arabic-400-normal-.*\.woff2$/),
  en: font(/^onest-latin-wght-normal-.*\.woff2$/),
};
const preload = (lang) => (preloadFor[lang] ? `<link rel="preload" href="/static/${preloadFor[lang]}" as="font" type="font/woff2" crossorigin>` : '');

function page(url) {
  const { html, head, lang, dir } = render(url);
  return template
    .replace('<!--app-lang-->', lang)
    .replace('<!--app-dir-->', dir)
    .replace('<!--app-head-->', `${head}\n    ${preload(lang)}`)
    .replace('<!--app-html-->', html);
}

const routes = allRoutes(site);
for (const { lang, page: p } of routes) {
  const url = pathFor(p, lang);
  const file = url === '/' ? join(dist, 'index.html') : join(dist, url, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page(url));
}
writeFileSync(join(dist, '404.html'), page('/404'));

// Sitemap: every page with its language twin.
const today = new Date().toISOString().slice(0, 10);
const byPage = new Map();
for (const { lang, page: p } of routes) byPage.set(p, { ...(byPage.get(p) || {}), [lang]: `${SITE_URL}${pathFor(p, lang)}` });
const urls = [...byPage.values()].flatMap((alt) => ['ar', 'en'].map((lang) => `  <url>
    <loc>${alt[lang]}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="ar" href="${alt.ar}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${alt.en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${alt.ar}"/>
  </url>`));
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

rmSync(ssr, { recursive: true, force: true });
console.log(`prerendered ${routes.length} pages + 404, sitemap.xml (${urls.length} urls), robots.txt`);
