import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import './styles/fonts.css';
import './styles/site.css';

import App from './App.jsx';
import { SiteProvider } from './SiteContext.jsx';
import { parsePath } from './lib/site.js';

/* Each page downloads the content of its own language only (a chunk built by
 * scripts/split-content.mjs), not both. Switching language is a link to the
 * twin page, which loads its own. The one exception is an unknown address:
 * every one is served the Arabic 404 page, which must hydrate as Arabic before
 * it turns to the visitor's language, so it takes both. */
const CHUNK = {
  ar: () => import('./data/generated/ar.json'),
  en: () => import('./data/generated/en.json'),
};

async function start() {
  const here = window.location.pathname;
  const lang = /^\/en(\/|$)/.test(here) ? 'en' : 'ar';
  let content = (await CHUNK[lang]()).default;
  if (lang !== 'ar' && parsePath(here, content).notFound) {
    content = { ...(await CHUNK.ar()).default, ...content };
  }

  const root = document.getElementById('root');
  const tree = (
    <StrictMode>
      <SiteProvider content={content}>
        <App />
      </SiteProvider>
    </StrictMode>
  );

  // Prerendered pages arrive with their HTML already in place; take it over
  // rather than repaint it. The dev server serves an empty shell.
  if (root.firstElementChild) hydrateRoot(root, tree);
  else createRoot(root).render(tree);
}

start();
