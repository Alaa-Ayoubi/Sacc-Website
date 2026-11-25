/* Build step: take the site's content from the backend, so the pages that are
 * prerendered (the only copy visitors and search engines get) carry whatever
 * the admin holds right now.
 *
 * The backend sleeps on Render's free plan and needs up to a minute to wake,
 * so this retries for a few minutes. If it still cannot be reached, or answers
 * with something that is not a whole site, the committed snapshot
 * (src/data/site-content.json) is kept and the build goes on with it: a build
 * never fails, and never ships half the content, because the API was down.
 *
 * With no VITE_API_URL (local development, CI) the snapshot is used as is.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const target = join(root, 'src/data/site-content.json');
const base = (process.env.VITE_API_URL || '').replace(/\/+$/, '');
const DEADLINE_MS = Number(process.env.CONTENT_FETCH_DEADLINE_MS || 240000);
const ATTEMPT_MS = 30000;

/** A whole site: both languages, each with its services, projects and nav. */
export function isWholeSite(data) {
  if (!data || typeof data !== 'object' || !data.company || !data.images) return false;
  return ['ar', 'en'].every((lang) => {
    const t = data[lang];
    return t && t.services?.items?.length && t.projects?.items?.length && t.hero?.title && t.leadership?.leaders?.length;
  });
}

async function attempt(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ATTEMPT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  if (!base) {
    console.log('content: no VITE_API_URL, building from the committed snapshot');
    return;
  }
  const url = `${base}/api/v1/site/`;
  const started = Date.now();
  let lastError = '';
  for (let n = 1; Date.now() - started < DEADLINE_MS; n += 1) {
    try {
      const data = await attempt(url);
      if (!isWholeSite(data)) throw new Error('the answer is not a whole site');
      const next = `${JSON.stringify(data, null, 2)}\n`;
      const same = readFileSync(target, 'utf8') === next;
      writeFileSync(target, next);
      console.log(`content: taken from ${url} (attempt ${n}${same ? ', same as the snapshot' : ''})`);
      return;
    } catch (err) {
      lastError = err.message || String(err);
      console.log(`content: attempt ${n} failed (${lastError}), retrying`);
      await new Promise((r) => setTimeout(r, 10000));
    }
  }
  console.warn(`content: WARNING ${url} unreachable (${lastError}); building from the committed snapshot`);
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
