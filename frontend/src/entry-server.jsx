/* Server entry for the prerender (scripts/prerender.mjs). */
import { renderToString } from 'react-dom/server';

import App from './App.jsx';
import { SiteProvider } from './SiteContext.jsx';
import snapshot from './data/site-content.json';
import { allRoutes, parsePath, pathFor } from './lib/site.js';
import { headHtml } from './lib/seo.js';

export { snapshot as site, allRoutes, pathFor };

/** Render one address to { html, head, lang, dir }. */
export function render(url) {
  const route = parsePath(url, snapshot);
  const html = renderToString(
    <SiteProvider url={url}>
      <App />
    </SiteProvider>,
  );
  return { html, head: headHtml(snapshot, route), lang: route.lang, dir: snapshot[route.lang].dir };
}
