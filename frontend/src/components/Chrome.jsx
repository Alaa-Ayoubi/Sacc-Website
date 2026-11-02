/* The bar at the top and the compact footer. */
import { useEffect, useRef, useState } from 'react';
import { Languages, Menu, X } from 'lucide-react';

import { useSite } from '../SiteContext.jsx';
import { NAV, pathFor } from '../lib/site.js';
import { Icon, Link, QuoteAction } from './ui.jsx';

export function Bar() {
  const { t, ui, route, lang } = useSite();
  const [open, setOpen] = useState(false);
  const [quiet, setQuiet] = useState(!route.page && !route.notFound);
  const btn = useRef(null);
  const drawer = useRef(null);
  const other = lang === 'ar' ? 'en' : 'ar';
  const here = route.notFound ? '' : route.sub ? `${route.page}/${route.sub}` : route.page;

  // One quote action on screen at a time: on the home page the bar's copy
  // waits until the hero's own action has scrolled out of view.
  useEffect(() => {
    const a = document.getElementById('hero-action');
    setQuiet(!!a);
    if (!a) return undefined;
    const io = new IntersectionObserver(([e]) => setQuiet(e.isIntersecting), { rootMargin: '-72px 0px 0px 0px' });
    io.observe(a);
    return () => io.disconnect();
  }, [route]);

  useEffect(() => { setOpen(false); }, [route]);
  useEffect(() => {
    if (!open) return undefined;
    drawer.current?.querySelector('a')?.focus();
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const links = NAV.map((id) => (
    <li key={id}><Link to={id} aria-current={route.page === id ? 'page' : undefined}>{ui.nav[id]}</Link></li>
  ));

  return (
    <header className={`bar${quiet ? ' quiet' : ''}`} id="bar">
      <div className="wrap bar-in">
        <Link to="" className="brand"><img src="/assets/logo-full.webp" alt={t.brandLine} width="120" height="30" /></Link>
        <nav aria-label={ui.menu}><ul>{links}</ul></nav>
        <div className="tools">
          {/* A plain link: the twin page is a separate document with its own language. */}
          <a className="lang" href={pathFor(here, other)} hrefLang={other} lang={other}>
            <Icon as={Languages} /><span>{ui.langName}</span>
          </a>
          <QuoteAction />
          <button ref={btn} className="menu-btn" type="button" aria-expanded={open} aria-controls="drawer"
            aria-label={open ? ui.close : ui.menu} onClick={() => setOpen((v) => !v)}>
            <Icon as={open ? X : Menu} size={20} />
          </button>
        </div>
      </div>
      <nav className={`drawer${open ? ' open' : ''}`} id="drawer" aria-label={ui.menu} ref={drawer}>
        <ul>{links}</ul>
        <QuoteAction className="action drawer-action" />
      </nav>
    </header>
  );
}

export function Footer() {
  const { t } = useSite();
  return (
    <footer className="foot" id="foot">
      <div className="wrap foot-in">
        <img src="/assets/logo-full.webp" alt="" width="104" height="26" />
        <div className="end">
          <Link to="careers">{t.navCareers}</Link>
          <span>{t.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
}
