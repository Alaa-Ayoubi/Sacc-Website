/* Content and language, shared by every section.
 *
 * The bundle holds Arabic and English together, so switching language is a
 * state change rather than a refetch — the same reason the API returns both.
 *
 * Content starts from the snapshot bundled at build time so the first paint
 * never waits on the backend, then quietly upgrades if the API answers.
 */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import snapshot from './data/site-content.json';
import { fetchSite } from './api';

const SiteContext = createContext(null);

const STORAGE_KEY = 'sacc.lang';
const LANGUAGES = ['ar', 'en'];

function initialLanguage() {
  // An explicit ?lang= wins, so a link can be shared in a chosen language.
  const requested = new URLSearchParams(window.location.search).get('lang');
  if (LANGUAGES.includes(requested)) return requested;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGUAGES.includes(saved)) return saved;
  } catch {
    // Private browsing and blocked storage both land here; the default is fine.
  }
  return document.documentElement.lang === 'en' ? 'en' : 'ar';
}

export function SiteProvider({ children }) {
  const [lang, setLang] = useState(initialLanguage);
  const [site, setSite] = useState(snapshot);
  const [live, setLive] = useState(false);

  // Refresh in the background. A failure is not an error the visitor should
  // ever see — the bundled snapshot is already on screen and is complete.
  useEffect(() => {
    let cancelled = false;
    fetchSite()
      .then((data) => {
        if (cancelled || !data?.en?.services?.items?.length) return;
        setSite(data);
        setLive(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const t = site[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    document.title = `${t.brandLine} — SACC`;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Not being able to remember the choice is not worth surfacing.
    }
  }, [lang, site]);

  const value = useMemo(
    () => ({
      lang,
      dir: site[lang].dir,
      t: site[lang],
      company: site.company,
      images: site.images,
      live,
      toggleLang: () => setLang((current) => (current === 'ar' ? 'en' : 'ar')),
    }),
    [lang, site, live],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const value = useContext(SiteContext);
  if (!value) throw new Error('useSite must be used inside <SiteProvider>');
  return value;
}
