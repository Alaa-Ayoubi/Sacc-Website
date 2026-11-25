/* Content, language and the current address, shared by every page.
 *
 * The language is part of the address (Arabic at the root, English under /en),
 * so switching language is a link to the twin page, not a stored preference.
 *
 * Content is the snapshot taken at build time, the same one the pages were
 * prerendered from, so hydration always matches. The browser gets only the
 * language of the page it is on (see main.jsx); the prerender gets both. The browser never asks the
 * backend for it: a content change in the admin rebuilds the site instead
 * (backend apps.core.publish), which keeps visitors from waking the sleeping
 * backend and the page from changing under them.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { UI, parsePath } from './lib/site.js';
import { pageMeta } from './lib/seo.js';

const SiteContext = createContext(null);

export function SiteProvider({ content, url, children }) {
  const site = content;
  // Every unknown address is served the one prerendered 404 page, which is
  // Arabic. Hydrate that page as it was rendered, then turn to the real address
  // (an English 404 under /en becomes English).
  const [path, setPath] = useState(() => {
    if (url != null) return url;
    if (typeof window === 'undefined') return '/';
    return parsePath(window.location.pathname, site).notFound ? '/404' : window.location.pathname;
  });
  useEffect(() => { if (url == null) setPath(window.location.pathname); }, [url]);
  const [prefill, setPrefill] = useState(null);
  const route = useMemo(() => parsePath(path, site), [path, site]);

  // Back and forward buttons.
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Keep the document in step with the page: language, direction, title, description.
  useEffect(() => {
    const T = site[route.lang], meta = pageMeta(site, route);
    const D = document.documentElement;
    D.lang = route.lang; D.dir = T.dir;
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [route, site]);

  const navigate = useCallback((to, { replace = false } = {}) => {
    const next = new URL(to, window.location.href);
    if (next.pathname === window.location.pathname && !next.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    window.history[replace ? 'replaceState' : 'pushState'](null, '', next.pathname + next.search + next.hash);
    setPath(next.pathname);
    window.scrollTo({ top: 0, behavior: 'auto' });
    // A new page: move focus to it, so keyboard and screen-reader users start there.
    requestAnimationFrame(() => document.getElementById('main')?.focus({ preventScroll: true }));
  }, []);

  const value = useMemo(() => ({
    site, route, lang: route.lang, t: site[route.lang], ui: UI[route.lang], rtl: route.lang === 'ar',
    company: site.company, images: site.images, navigate, prefill, setPrefill,
  }), [site, route, navigate, prefill]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const value = useContext(SiteContext);
  if (!value) throw new Error('useSite must be used inside <SiteProvider>');
  return value;
}
