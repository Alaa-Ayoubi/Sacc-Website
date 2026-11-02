/* Write the routes block of backend/render.yaml for the static site.
 *
 *   node scripts/render-routes.mjs          rewrite the block in place
 *   node scripts/render-routes.mjs --check  exit 1 if it is out of date
 *
 * Every page is a prerendered file at <path>/index.html. Each clean address
 * (/company, /en/services/stormwater …) gets an explicit rewrite to its file,
 * so it is served with a 200 at the address the canonical tag names, whatever
 * the host does with directory paths. There is no catch-all: an unknown
 * address gets a real 404, not a copy of the home page.
 *
 * Old addresses get permanent (301) redirects: the /ar prefix of the previous
 * site, and the old page names (about, equipment, certifications, journey,
 * leadership). Old #hash links cannot reach a server; the app moves those. */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { OLD_PAGES, allRoutes, pathFor } from '../src/lib/site.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = JSON.parse(readFileSync(join(root, 'src/data/site-content.json'), 'utf8'));
const yamlPath = join(root, '..', 'backend', 'render.yaml');
const START = '    # BEGIN generated routes (frontend/scripts/render-routes.mjs)';
const END = '    # END generated routes';

const rule = (type, source, destination) => `      - type: ${type}\n        source: ${source}\n        destination: ${destination}`;
const lines = [];
const seen = new Set();
const redirect = (from, to) => { if (from !== to && !seen.has(from)) { seen.add(from); lines.push(rule('redirect', from, to)); } };

// The previous site's Arabic prefix.
redirect('/ar', '/');
redirect('/ar/', '/');
for (const { lang, page } of allRoutes(site)) if (lang === 'ar' && page) redirect(`/ar/${page}`, pathFor(page, 'ar'));
// Old page names, in every prefix they could have had.
for (const [old, now] of Object.entries(OLD_PAGES)) {
  if (old === 'home' || old === now) continue;
  redirect(`/${old}`, pathFor(now, 'ar'));
  redirect(`/ar/${old}`, pathFor(now, 'ar'));
  redirect(`/en/${old}`, pathFor(now, 'en'));
}
// Clean addresses to their prerendered files.
for (const { lang, page } of allRoutes(site)) {
  const url = pathFor(page, lang);
  if (url !== '/') lines.push(rule('rewrite', url, `${url}/index.html`));
}

const block = `${START}\n${lines.join('\n')}\n${END}`;
const yaml = readFileSync(yamlPath, 'utf8');
const a = yaml.indexOf(START), b = yaml.indexOf(END);
if (a < 0 || b < 0) { console.error('render.yaml has no generated-routes markers'); process.exit(1); }
const next = yaml.slice(0, a) + block + yaml.slice(b + END.length);
if (process.argv.includes('--check')) {
  if (next !== yaml) { console.error('backend/render.yaml routes are out of date: run `npm run routes` in frontend/'); process.exit(1); }
  console.log('render.yaml routes are up to date');
} else {
  writeFileSync(yamlPath, next);
  console.log(`render.yaml: ${lines.length} rules`);
}
