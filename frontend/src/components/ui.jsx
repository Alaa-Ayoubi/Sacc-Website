/* Small building blocks shared by every page. */
import { useEffect, useRef } from 'react';

import { useSite } from '../SiteContext.jsx';
import { BODIES, pathFor, projSlug, src, svcOf } from '../lib/site.js';

const ICON = {
  left: <><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></>,
  right: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  upLeft: <><path d="M7 17V7h10" /><path d="M17 17 7 7" /></>,
  upRight: <><path d="M7 7h10v10" /><path d="M7 17 17 7" /></>,
  menu: <><path d="M4 8h16" /><path d="M4 16h16" /></>,
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
  x: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  alert: <><circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" /></>,
  upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m17 8-5-5-5 5" /><path d="M12 3v12" /></>,
};

/** A line icon, decorative (its control carries the name). */
export function Icon({ name, className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{ICON[name]}</svg>
  );
}

/** Arrow names in reading direction: forward, back, and forward-up (the card corner). */
export function useDir() {
  const { rtl } = useSite();
  return { fwd: rtl ? 'left' : 'right', back: rtl ? 'right' : 'left', up: rtl ? 'upLeft' : 'upRight' };
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

/** A text link with an arrow; `back` points the other way and leads the label. */
export function ArrowLink({ to, back = false, children }) {
  const d = useDir();
  return (
    <Link to={to} className="link">
      {back && <Icon name={d.back} />}<span>{children}</span>{!back && <Icon name={d.fwd} />}
    </Link>
  );
}

/** The single contact action. It carries what the visitor was looking at into the form. */
export function QuoteAction({ id, className = 'action', children }) {
  const { t, route, site, setPrefill } = useSite();
  const onClick = () => {
    const { page, sub } = route;
    let pf = null;
    if (page === 'services' && sub) {
      const s = t.services.items.find((x) => svcOf(x).slug === sub);
      if (s) pf = { message: `${t.services.inquireCta} ${s.title}: ` };
    } else if (page === 'projects' && sub) {
      const p = t.projects.items.find((x) => projSlug(site, x.id) === sub);
      if (p) pf = { message: `${t.projects.detailsCta}: ${p.title}: ` };
    } else if (page === 'approvals') pf = { message: `${t.certifications.cta}: ` };
    setPrefill(pf);
  };
  return <Link to="contact" id={id} className={className} onClick={onClick}>{children}{t.navCta}</Link>;
}

/** A company photograph, cropped to its frame. One that fails to load is
 * removed, leaving the frame's own tint. With no `alt` it is decorative. */
export function Img({ src: u, alt = '', eager = false, className = 'ph', ...rest }) {
  if (!u) return null;
  return (
    <img
      className={className}
      src={src(u)}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : undefined}
      decoding="async"
      onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
      {...rest}
    />
  );
}

// Short words that do not end the first, ink part of a two-tone heading.
const JOINERS = new Set(['&', 'و', 'في', 'in', 'of', 'for', 'to', 'the', 'إلى', 'من']);

/** A heading in two tones: the first part in ink, the rest muted. The muted part
 * takes its own line only when each line keeps at least two words. */
export function Tone({ children, split }) {
  const title = String(children);
  const w = title.trim().split(/\s+/);
  if (w.length < 2) return title;
  let k = split || (w.length <= 3 ? w.length - 1 : Math.ceil(w.length / 2));
  while (k > 1 && JOINERS.has(w[k - 1].toLowerCase())) k -= 1;
  const two = k >= 2 && w.length - k >= 2;
  return <>{w.slice(0, k).join(' ')} <span className={`tone${two ? '' : ' in'}`}>{w.slice(k).join(' ')}</span></>;
}

/** Section head: optional small label, the two-tone heading, then the lead and any action beside it. */
export function SecHead({ title, lead, label, as: H = 'h2', cls = 'h-sec', id, extra }) {
  return (
    <div className="sec-head">
      <div className="rise">{label && <p className="label">{label}</p>}<H className={cls} id={id}><Tone>{title}</Tone></H></div>
      <div className="side rise">{lead && <p className="lead">{lead}</p>}{extra}</div>
    </div>
  );
}

export function PageHead({ title, lead, back }) {
  return (
    <div className="wrap page-head">
      {back && <p className="back">{back}</p>}
      <SecHead title={title} lead={lead} as="h1" cls="h-page" />
    </div>
  );
}

/** A sub-section heading. */
export const SubHead = ({ children, id }) => <h2 className="h-sub rise sub-gap" id={id}>{children}</h2>;

/** One approving body's official logo, at its equal-area size. */
export function BodyLogo({ k, w, h, name, hidden = false, eager = false }) {
  return (
    <img className="logo-img" src={`/assets/logos/${k}.webp`} alt={hidden ? '' : name} width={w} height={h}
      style={{ width: `calc(${w}px * var(--ls, 1))` }} loading={eager ? 'eager' : 'lazy'} decoding="async" />
  );
}

/** Home: the logos slide slowly in one endless row (two copies, the second
 * hidden from assistive tech). It pauses on hover and focus; under reduced
 * motion it stands still as one centred row. */
export function Marquee({ names }) {
  const set = (hidden) => BODIES.map(([k, w, h], i) => (
    <li key={k} className="body-item"><BodyLogo k={k} w={w} h={h} name={names[i]} hidden={hidden} eager /></li>
  ));
  return (
    <div className="marquee rise">
      <div className="mq-view"><div className="mq-track">
        <ul className="mq-set">{set(false)}</ul>
        <ul className="mq-set dup" aria-hidden="true">{set(true)}</ul>
      </div></div>
    </div>
  );
}

/** Approvals page: one white plate per body, its logo alone. */
export function Bodies({ names }) {
  return (
    <ul className="bodies">
      {BODIES.map(([k, w, h], i) => <li key={k} className="body rise"><BodyLogo k={k} w={w} h={h} name={names[i]} /></li>)}
    </ul>
  );
}

let revealed = false;

/** Scroll reveal: each `.rise` element arrives once as it comes into view, then
 * drops its reveal classes, so a later filter or tab change does not replay it.
 * What is already on screen stays put, so a prerendered page does not flicker
 * when it hydrates. Reduced motion skips it entirely. */
export function useReveal(dep) {
  useEffect(() => {
    const D = document.documentElement;
    D.classList.add('js');
    if (!('IntersectionObserver' in window) || !matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      D.classList.remove('reveal');
      return undefined;
    }
    // At hydration what is on screen is already painted: leave it be. A page
    // opened later arrives like the rest.
    if (!revealed) {
      revealed = true;
      document.querySelectorAll('.rise').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.remove('rise');
      });
    }
    D.classList.add('reveal');
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      io.unobserve(el);
      el.classList.add('in');
      const done = (v) => { if (v.target !== el) return; el.removeEventListener('animationend', done); el.classList.remove('rise', 'in'); };
      el.addEventListener('animationend', done);
    }), { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.rise').forEach((el) => io.observe(el));
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
      <div className="choices" role="tablist" aria-label={label} ref={list} onKeyDown={onKey}>
        {items.map((it) => (
          <button key={it.key} type="button" role="tab" id={`tab-${id}-${it.key}`} aria-controls={`panel-${id}-${it.key}`}
            aria-selected={cur === it.key} tabIndex={cur === it.key ? 0 : -1} onClick={() => onChange(it.key)}>{it.label}</button>
        ))}
      </div>
      <div className="panels">
        {items.map((it) => (
          <div key={it.key} className="tabpanel" role="tabpanel" id={`panel-${id}-${it.key}`} aria-labelledby={`tab-${id}-${it.key}`} tabIndex={0} hidden={cur !== it.key}>
            {it.content}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Ruled columns: a title (and a line) under a firm rule. */
export function Cards({ items, four = true, as: H = 'h3' }) {
  return (
    <div className={`cards${four ? ' four' : ''}`}>
      {items.map((x) => {
        const title = typeof x === 'string' ? x : x.title;
        return <div key={title} className="card plain rise"><H className="h3">{title}</H>{x.desc && <p>{x.desc}</p>}</div>;
      })}
    </div>
  );
}
