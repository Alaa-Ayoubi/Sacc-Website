/* The top bar, the masthead with the phone menu, and the footer. */
import { useEffect, useRef, useState } from 'react';

import { useSite } from '../SiteContext.jsx';
import { NAV, navLabel, pathFor } from '../lib/site.js';
import { Arrow, Icon, Link, QuoteAction } from './ui.jsx';

const tel = (n) => `tel:${n.replace(/\s/g, '')}`;

/** Registration and the NWC approval on one side, phone and email on the other. */
export function TopBar() {
  const { t, ui, company } = useSite();
  return (
    <div className="topbar">
      <div className="topbar-in">
        <ul className="creds">
          <li><Icon name="file-text" />{ui.cr} <span className="num">{company.cr}</span></li>
          <li><Icon name="shield-check" />{t.why.items[1]}</li>
        </ul>
        <ul className="reach">
          <li><Icon name="phone" /><a href={tel(company.phone)}><span className="ltr num">{company.phone}</span></a></li>
          <li><Icon name="mail" /><a href={`mailto:${company.email}`}>{company.email}</a></li>
        </ul>
      </div>
    </div>
  );
}

export function Masthead() {
  const { t, ui, route, lang } = useSite();
  const [open, setOpen] = useState(false);
  const btn = useRef(null);
  const drawer = useRef(null);
  const other = lang === 'ar' ? 'en' : 'ar';
  const here = route.notFound ? '' : route.sub ? `${route.page}/${route.sub}` : route.page;
  // Closing the menu by hand returns focus to its button; a menu link moves it to the new page instead.
  const refocus = useRef(false);

  useEffect(() => { setOpen(false); }, [route]);
  useEffect(() => {
    if (!open) return undefined;
    // The menu opens right under the masthead, wherever the page has scrolled to.
    const head = drawer.current?.closest('.masthead');
    drawer.current?.style.setProperty('--drawer-top', `${Math.max(0, head?.getBoundingClientRect().bottom || 0)}px`);
    drawer.current?.querySelector('a')?.focus();
    const onKey = (e) => { if (e.key === 'Escape') { refocus.current = true; setOpen(false); } };
    document.addEventListener('keydown', onKey);
    // While the menu is open the page under it neither scrolls nor takes focus.
    const behind = [...document.querySelectorAll('.topbar, main, .footer')];
    behind.forEach((el) => el.setAttribute('inert', ''));
    document.documentElement.classList.add('locked');
    return () => {
      document.removeEventListener('keydown', onKey);
      behind.forEach((el) => el.removeAttribute('inert'));
      document.documentElement.classList.remove('locked');
      if (refocus.current) { refocus.current = false; btn.current?.focus(); }
    };
  }, [open]);

  const cur = (page) => (route.page === page ? 'page' : undefined);
  const toggle = () => { if (open) refocus.current = true; setOpen(!open); };

  return (
    <header className="masthead">
      <div className="masthead-in">
        <Link to="" className="brand"><img src="/assets/logo-full.webp" alt={t.brandLine} width="144" height="36" /></Link>
        <nav className="nav" aria-label={ui.menu}>
          {NAV.map(([page]) => <Link key={page} to={page} aria-current={cur(page)}>{navLabel(t, page)}</Link>)}
        </nav>
        <div className="tools">
          {/* A plain link: the twin page is a separate document with its own language. */}
          <a className="lang" href={pathFor(here, other)} hrefLang={other} lang={other}>
            <Icon name="languages" /><span className="long">{ui.langName}</span><span className="short" aria-hidden="true">{ui.langShort}</span>
          </a>
          <QuoteAction />
          <button ref={btn} className="menu-btn" type="button" aria-expanded={open} aria-controls="drawer"
            aria-label={open ? ui.close : ui.menu} onClick={toggle}><Icon name={open ? 'x' : 'menu'} /></button>
        </div>
      </div>
      <nav className={`drawer${open ? ' open' : ''}`} id="drawer" aria-label={ui.menu} ref={drawer}>
        {NAV.map(([page]) => <Link key={page} to={page} aria-current={cur(page)}><span>{navLabel(t, page)}</span><Arrow /></Link>)}
      </nav>
    </header>
  );
}

export function Footer() {
  const { t, ui, company, route } = useSite();
  const F = t.footer, C = t.contact;
  const cur = (page) => (route.page === page ? 'page' : undefined);
  return (
    <footer className="footer">
      <div className="footer-in">
        <div className="footer-about">
          <Link to="" className="footer-brand"><img src="/assets/logo-full.webp" alt={t.brandLine} width="144" height="36" /></Link>
          <p>{F.tagline}</p>
          <span className="cr"><Icon name="file-text" />{ui.cr} <span className="num">{company.cr}</span></span>
        </div>
        <nav aria-labelledby="foot-links-h">
          <h2 id="foot-links-h">{F.quickLinks}</h2>
          <ul>
            {NAV.map(([page]) => <li key={page}><Link to={page} aria-current={cur(page)}>{navLabel(t, page)}</Link></li>)}
            <li><Link to="careers" aria-current={cur('careers')}>{t.navCareers}</Link></li>
          </ul>
        </nav>
        <div>
          <h2>{F.certsHeading}</h2>
          <ul className="footer-certs">{F.certs.map((c) => <li key={c}><Icon name="check" /><span>{c}</span></li>)}</ul>
        </div>
        <div>
          <h2>{F.contactHeading}</h2>
          <ul className="footer-reach">
            <li><Icon name="map-pin" /><span>{C.address}</span></li>
            <li><Icon name="phone" /><a href={tel(company.phone)}><span className="ltr num">{company.phone}</span></a></li>
            <li><Icon name="phone" /><a href={tel(company.mobile)}><span className="ltr num">{company.mobile}</span></a></li>
            <li><Icon name="mail" /><a href={`mailto:${company.email}`}>{company.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-base">
        <p>{F.rights}</p>
      </div>
    </footer>
  );
}
