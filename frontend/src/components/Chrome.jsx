/* The bar at the top, the phone menu and the compact footer. */
import { useEffect, useRef, useState } from 'react';

import { useSite } from '../SiteContext.jsx';
import { NAV, pathFor } from '../lib/site.js';
import { Icon, Link, QuoteAction } from './ui.jsx';

function Brand() {
  const { ui } = useSite();
  return (
    <Link to="" className="brand">
      <span className="mark" aria-hidden="true" /><span className="name" translate="no">{ui.short}</span>
    </Link>
  );
}

/** The twin page in the other language: a plain link, since it is its own document. */
function LangLink() {
  const { ui, route, lang } = useSite();
  const other = lang === 'ar' ? 'en' : 'ar';
  const here = route.notFound ? '' : route.sub ? `${route.page}/${route.sub}` : route.page;
  return <a className="lang" href={pathFor(here, other)} hrefLang={other} lang={other}>{ui.langName}</a>;
}

export function Bar({ home }) {
  const { ui, route } = useSite();
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const btn = useRef(null);
  const close = useRef(null);
  // Closing the menu by hand returns focus to its button; a menu link moves it to the new page instead.
  const refocus = useRef(false);
  const shut = () => { refocus.current = true; setOpen(false); };
  // On the contact page the form itself is the action.
  const action = route.page !== 'contact';

  // On the home page the bar lies over the photograph, and its action waits
  // until the hero (which carries its own) has scrolled away.
  useEffect(() => {
    if (!home) { setStuck(false); return undefined; }
    const on = () => setStuck(window.scrollY > window.innerHeight * 0.8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, [home]);

  useEffect(() => { setOpen(false); }, [route]);
  useEffect(() => {
    if (!open) return undefined;
    close.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') shut(); };
    document.addEventListener('keydown', onKey);
    // While the menu is open the page behind it neither scrolls nor takes focus.
    const behind = [...document.querySelectorAll('.page > :not(.drawer)')];
    behind.forEach((el) => el.setAttribute('inert', ''));
    document.documentElement.classList.add('locked');
    return () => {
      document.removeEventListener('keydown', onKey);
      behind.forEach((el) => el.removeAttribute('inert'));
      document.documentElement.classList.remove('locked');
      if (refocus.current) { refocus.current = false; btn.current?.focus(); }
    };
  }, [open]);

  const nav = (cls) => (
    <nav className={cls} aria-label={ui.menu}>
      {NAV.map((id) => <Link key={id} to={id} aria-current={route.page === id ? 'page' : undefined}>{ui.nav[id]}</Link>)}
    </nav>
  );

  return (
    <>
      <header className={`bar${stuck ? ' stuck' : ''}`}>
        <div className="wrap bar-in">
          <Brand />
          {nav('main-nav')}
          <div className="bar-end">
            <LangLink />
            {action && <QuoteAction className="action bar-action" />}
            <button ref={btn} className="icon-btn menu-btn" type="button" aria-expanded={open} aria-controls="drawer"
              aria-label={ui.menu} onClick={() => setOpen(true)}><Icon name="menu" /></button>
          </div>
        </div>
      </header>
      {/* The phone menu: one sheet over the page. */}
      <div className="drawer" id="drawer" role="dialog" aria-modal="true" aria-label={ui.menu} hidden={!open}>
        <div className="drawer-top">
          <Brand />
          <button ref={close} className="icon-btn" type="button" aria-label={ui.close}
            onClick={shut}><Icon name="x" /></button>
        </div>
        {nav('drawer-nav')}
        <div className="drawer-foot"><LangLink />{action && <QuoteAction />}</div>
      </div>
    </>
  );
}

export function Footer() {
  const { t, ui } = useSite();
  return (
    <footer className="foot on-dark">
      <div className="wrap foot-in">
        <Link to="" className="brand" aria-label={t.brandLine} translate="no"><span className="logo" /></Link>
        <span className="rights">{t.footer.rights}</span>
        <Link to="careers">{ui.careers}</Link>
        <LangLink />
      </div>
    </footer>
  );
}
