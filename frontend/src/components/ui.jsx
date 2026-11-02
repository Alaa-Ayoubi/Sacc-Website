/* Small building blocks shared by every page. */
import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { useSite } from '../SiteContext.jsx';
import { CAT_TYPE, pathFor, projSlug, svcOf } from '../lib/site.js';

export function Icon({ as: Glyph, size = 18 }) {
  return <span className="icon" aria-hidden="true"><Glyph size={size} strokeWidth={1.75} /></span>;
}

/** Forward arrow in reading direction. */
export function Arrow() {
  const { rtl } = useSite();
  return <Icon as={rtl ? ArrowLeft : ArrowRight} />;
}
/** Back arrow in reading direction. */
export function BackArrow() {
  const { rtl } = useSite();
  return <Icon as={rtl ? ArrowRight : ArrowLeft} />;
}

/** An internal link: a real <a href> that switches pages without a reload. */
export function Link({ to, lang, onClick, children, ...rest }) {
  const site = useSite();
  const href = pathFor(to, lang || site.lang);
  const handle = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    site.navigate(href);
  };
  return <a href={href} onClick={handle} {...rest}>{children}</a>;
}

/** The single quote action. It carries what the visitor was looking at into the form. */
export function QuoteAction({ id, className = 'action' }) {
  const { ui, t, route, site, setPrefill } = useSite();
  const onClick = () => {
    const { page, sub } = route;
    let pf = null;
    if (page === 'services' && sub) {
      const s = t.services.items.find((x) => svcOf(x).slug === sub);
      if (s) pf = { type: svcOf(s).type, message: `${t.services.inquireCta} ${s.title}: ` };
    } else if (page === 'projects' && sub) {
      const p = t.projects.items.find((x) => projSlug(site, x.id) === sub);
      if (p) pf = { type: CAT_TYPE[p.key] || 'other', message: `${t.projects.detailsCta}: ${p.title}: ` };
    } else if (page === 'fleet') pf = { type: 'equipment-rental', message: `${t.equipment.cta}: ` };
    else if (page === 'approvals') pf = { type: '', message: `${t.certifications.cta}: ` };
    setPrefill(pf);
  };
  return <Link to="contact" id={id} className={className} onClick={onClick}>{ui.quote}</Link>;
}

/** A company photograph. A photo that fails to load is removed, leaving its tinted frame. */
export function Img({ src, alt, eager = false, ...rest }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : undefined}
      decoding="async"
      onError={(e) => { e.currentTarget.style.display = 'none'; }}
      {...rest}
    />
  );
}

export function PageHead({ title, lead, back }) {
  return (
    <header className="wrap page-head">
      {back}
      <h1 className="h-display rise">{title}</h1>
      {lead && <p className="lead rise" style={{ '--d': 1 }}>{lead}</p>}
    </header>
  );
}

/** Scroll reveal: marks `.rise` elements in view. Reduced motion is handled in CSS. */
export function useReveal(dep) {
  useEffect(() => {
    // What is already on screen stays put: mark it revealed before hiding the rest,
    // so a prerendered page does not flicker when it hydrates.
    document.querySelectorAll('.rise:not(.in)').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in');
    });
    document.documentElement.classList.add('js');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    document.querySelectorAll('.rise:not(.in)').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

/** ARIA tabs with arrow keys that follow the reading direction. */
export function Tabs({ id, label, items, current, onChange }) {
  const { rtl } = useSite();
  const list = useRef(null);
  const cur = items.some((i) => i.key === current) ? current : items[0].key;
  const onKey = (e) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    const i = items.findIndex((x) => x.key === cur);
    const fwd = rtl ? 'ArrowLeft' : 'ArrowRight';
    const j = e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : (i + (e.key === fwd ? 1 : -1) + items.length) % items.length;
    e.preventDefault();
    onChange(items[j].key);
    requestAnimationFrame(() => list.current?.querySelectorAll('[role=tab]')[j]?.focus());
  };
  return (
    <div className="tabs">
      <div className="tablist" role="tablist" aria-label={label} ref={list} onKeyDown={onKey}>
        {items.map((it) => (
          <button key={it.key} type="button" role="tab" id={`tab-${id}-${it.key}`} aria-controls={`panel-${id}-${it.key}`}
            aria-selected={cur === it.key} tabIndex={cur === it.key ? 0 : -1} onClick={() => onChange(it.key)}>{it.label}</button>
        ))}
      </div>
      {items.map((it) => (
        <div key={it.key} className="tabpanel" role="tabpanel" id={`panel-${id}-${it.key}`} aria-labelledby={`tab-${id}-${it.key}`} tabIndex={0} hidden={cur !== it.key}>
          {it.content}
        </div>
      ))}
    </div>
  );
}

/** Typographic ISO seal (no certificate artwork exists, so none is imitated). */
export function Seal({ number }) {
  return (
    <svg viewBox="0 0 112 112" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
      <circle cx="56" cy="56" r="53" /><circle cx="56" cy="56" r="44" />
      <text x="56" y="52" textAnchor="middle" fill="currentColor" stroke="none" fontSize="15" fontWeight="500" direction="ltr">ISO</text>
      <text x="56" y="74" textAnchor="middle" fill="currentColor" stroke="none" fontSize="20" fontWeight="300" direction="ltr">{number}</text>
    </svg>
  );
}
