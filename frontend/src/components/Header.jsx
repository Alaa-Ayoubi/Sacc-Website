import { useEffect, useState } from 'react';

import { useSite } from '../SiteContext.jsx';

/* Top contact strip and the sticky navigation.
 *
 * Nav items come from the API, so a section added in the admin appears here
 * without a code change. The mobile menu closes on selection — leaving it open
 * over the anchor you just jumped to is disorienting. */
export function TopBar() {
  const { t, company } = useSite();
  const crLabel = t.contact?.crLabel || 'CR';

  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar-left">
          {company.cr && <span>{crLabel} {company.cr}</span>}
          {company.phone && (
            <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
          )}
          {company.email && <a href={`mailto:${company.email}`}>{company.email}</a>}
        </div>
        <div>{t.contact?.address}</div>
      </div>
    </div>
  );
}

export default function Header({ onNavigate, view }) {
  const { t, company, toggleLang, lang } = useSite();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  // Highlight the section currently in view. IntersectionObserver keeps this
  // off the scroll event, so it costs nothing while scrolling.
  useEffect(() => {
    if (view !== 'home') return undefined;
    const sections = t.nav
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [t.nav, view]);

  const go = (event, id) => {
    event.preventDefault();
    setOpen(false);
    onNavigate(id);
  };

  return (
    <header className="header">
      <div className="container">
        <a
          className="brand"
          href="#top"
          onClick={(event) => go(event, 'top')}
          aria-label={t.brandLine}
        >
          <img src={company.logo || './assets/logo-full.webp'} alt={t.brandLine} />
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true">☰</span>
          <span className="visually-hidden">{t.navCta}</span>
        </button>

        <nav id="primary-nav" className={`nav${open ? ' open' : ''}`}>
          {t.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => go(event, item.id)}
              aria-current={view === 'home' && active === item.id ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={toggleLang}
            aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            {t.langBtn}
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-label-long"
            onClick={() => onNavigate('careers')}
          >
            {t.navCareers}
          </button>
          <a
            className="btn btn-primary"
            href="#contact"
            onClick={(event) => go(event, 'contact')}
          >
            {t.navCta}
          </a>
        </div>
      </div>
    </header>
  );
}
