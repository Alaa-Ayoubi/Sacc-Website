/* Content, language and the current address, shared by every page.
 *
 * The language is part of the address (Arabic at the root, English under /en),
 * so switching language is a link to the twin page, not a stored preference.
 *
 * Content starts from the snapshot bundled at build time — the same one the
 * pages were prerendered from, so hydration matches — then quietly upgrades
 * if the API answers.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import snapshot from './data/site-content.json';
import { fetchSite } from './api.js';
import { UI, parsePath } from './lib/site.js';
import { pageMeta } from './lib/seo.js';

const SiteContext = createContext(null);

export function SiteProvider({ url, children }) {
  const [site, setSite] = useState(snapshot);
  const [path, setPath] = useState(url ?? (typeof window !== 'undefined' ? window.location.pathname : '/'));
  const [prefill, setPrefill] = useState(null);
  const route = useMemo(() => parsePath(path, site), [path, site]);

  // Refresh in the background. A failure is never shown: the snapshot is complete.
  useEffect(() => {
    let cancelled = false;
    fetchSite()
      .then((data) => { if (!cancelled && data?.en?.services?.items?.length && data?.ar?.services?.items?.length) setSite(data); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

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
