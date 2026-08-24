import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { useSite } from '../SiteContext.jsx';

/* Top contact strip and the sticky navigation.
 *
 * Nav items come from the API, so a section added in the admin appears here
 * without a code change. The mobile menu closes on navigation — leaving it open
 * over the page you just opened is disorienting.
 */
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

export default function Header() {
  const { t, company, toggleLang, lang } = useSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // The header lifts off the content once the page has moved.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container">
        <Link viewTransition className="brand" to="/" aria-label={t.brandLine}>
          <img src={company.logo || './assets/logo-full.webp'} alt={t.brandLine} />
        </Link>

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
            <NavLink viewTransition
              key={item.id}
              to={`/${item.id}`}
              // NavLink sets aria-current itself; the pill styling keys off it.
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
            >
              {item.label}
            </NavLink>
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
          <Link viewTransition className="btn btn-ghost btn-label-long" to="/careers">
            {t.navCareers}
          </Link>
          <Link viewTransition className="btn btn-primary" to="/contact">
            {t.navCta}
          </Link>
        </div>
      </div>
    </header>
  );
}
