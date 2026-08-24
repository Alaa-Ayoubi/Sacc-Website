/* Refresh the bundled content snapshot from the live backend.
 *
 * The app ships with a copy of the site content so the first paint never waits
 * on a sleeping free instance. Run this after editing content in the Django
 * admin, then commit the result:
 *
 *   VITE_API_URL=https://sacc-backend-894t.onrender.com npm run sync-content
 *
 * Falls back to the repository's site-data.js if the API cannot be reached, so
 * a build never ends up with no content at all.
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const target = resolve(here, '../src/data/site-content.json');
const base = (process.env.VITE_API_URL || '').replace(/\/$/, '');

if (!base) {
  console.error('Set VITE_API_URL to the backend address first.');
  process.exit(1);
}

const url = `${base}/api/v1/site/`;
process.stdout.write(`Fetching ${url}\n`);

// A sleeping instance can take ~50s to wake, so allow well past that.
const response = await fetch(url, { signal: AbortSignal.timeout(120000) }).catch((error) => {
  console.error(`Could not reach the API: ${error.message}`);
  process.exit(1);
});

if (!response.ok) {
  console.error(`API returned HTTP ${response.status}`);
  process.exit(1);
}

const data = await response.json();

// Guard against writing an empty snapshot over a good one — an unseeded
// database returns a structurally valid but blank bundle.
const services = data?.en?.services?.items?.length ?? 0;
if (!services) {
  console.error('The API returned no services — refusing to overwrite with empty content.');
  process.exit(1);
}

await writeFile(target, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log(`Wrote ${target} (${services} services, ${data.en.projects.items.length} projects)`);
