/* Build step: one content file per language for the browser.
 *
 * The full content (src/data/site-content.json) holds both languages; a page
 * only ever shows one, so the browser gets src/data/generated/<lang>.json:
 * the shared company details and images, that language, and the project
 * slugs, which are made from the English titles and so would otherwise need
 * the English half on every Arabic page. The prerender keeps using the full
 * file. Generated, not committed. */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { projSlug } from '../src/lib/site.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = JSON.parse(readFileSync(join(root, 'src/data/site-content.json'), 'utf8'));
const out = join(root, 'src/data/generated');
mkdirSync(out, { recursive: true });

const projectSlugs = Object.fromEntries(site.en.projects.items.map((p) => [p.id, projSlug(site, p.id)]));
for (const lang of ['ar', 'en']) {
  const part = { company: site.company, images: site.images, projectSlugs, [lang]: site[lang] };
  writeFileSync(join(out, `${lang}.json`), JSON.stringify(part));
}
console.log(`content: split into ${['ar', 'en'].map((l) => `${l}.json`).join(', ')}`);
