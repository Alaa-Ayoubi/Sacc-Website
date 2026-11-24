/* Small building blocks shared by every page. */
import { useState } from 'react';
import {
  ArrowLeft, ArrowRight, Award, Briefcase, Building2, Check, CircleAlert, Clock, FileText, GraduationCap,
  HardHat, Languages, Layers, Mail, MapPin, Menu, Phone, Satellite, Send, ShieldCheck, Upload, Wrench, X,
} from 'lucide-react';

import { useSite } from '../SiteContext.jsx';
import { BODIES, CAT_SVC, isDone, pathFor, projImage, projSlug, svcOf } from '../lib/site.js';

const GLYPH = {
  'arrow-left': ArrowLeft, 'arrow-right': ArrowRight, award: Award, briefcase: Briefcase, 'building-2': Building2,
  check: Check, 'circle-alert': CircleAlert, clock: Clock, 'file-text': FileText, 'graduation-cap': GraduationCap,
  'hard-hat': HardHat, languages: Languages, layers: Layers, mail: Mail, 'map-pin': MapPin, menu: Menu, phone: Phone,
  satellite: Satellite, send: Send, 'shield-check': ShieldCheck, upload: Upload, wrench: Wrench, x: X,
};

/** A line icon, decorative (its control carries the name). */
export function Icon({ name, className = '' }) {
  const G = GLYPH[name];
  return <span className={`icon ${className}`.trim()} aria-hidden="true">{G && <G strokeWidth={1.75} />}</span>;
}

/** The forward arrow in reading direction. */
export function Arrow() {
  const { rtl } = useSite();
  return <Icon name={rtl ? 'arrow-left' : 'arrow-right'} />;
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

/** The single contact action, in the masthead. It carries what the visitor was looking at into the form. */
export function QuoteAction({ className = 'btn btn-quote' }) {
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
    } else if (page === 'fleet') pf = { message: `${t.equipment.cta}: ` };
    setPrefill(pf);
  };
  return <Link to="contact" className={className} onClick={onClick}>{t.navCta}</Link>;
}

/** A company photograph in its frame. Without a photograph, or when it fails
 * to load, the frame keeps its own tint. With no `alt` it is decorative. */
export function Photo({ src, alt = '', className = 'photo', eager = false }) {
  const [failed, setFailed] = useState(false);
  const none = !src || failed;
  return (
    <figure className={`${className}${none ? ' nophoto' : ''}`}>
      {!none && (
        <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} fetchpriority={eager ? 'high' : undefined}
          decoding="async" onError={() => setFailed(true)} />
      )}
    </figure>
  );
}

/** The teal head of every inner page: its title, a lead, and anything that goes with them. */
export function PageHead({ title, lead, children }) {
  return (
    <section className="pagehead">
      <div className="pagehead-in"><div><h1>{title}</h1>{lead && <p>{lead}</p>}{children}</div></div>
    </section>
  );
}

/** "See all" link under or beside a section heading. */
export function More({ to, children }) {
  return <Link to={to} className="more">{children} <Arrow /></Link>;
}

/** A list of short items, each with a check mark, under a firm rule. */
export function Checks({ items, className = 'caps' }) {
  return <ul className={className}>{items.map((x) => <li key={x}><Icon name="check" /><span>{x}</span></li>)}</ul>;
}

/** One project: its photograph, title, client, location and status. */
export function ProjectItem({ p, as: H = 'h3' }) {
  const { site } = useSite();
  return (
    <li className="proj">
      <Link to={`projects/${projSlug(site, p.id)}`}>
        <Photo src={projImage(site, p)} />
        <div>
          <H>{p.title}</H>
          <p className="meta"><span>{p.client}</span><span>{p.location}</span><span className={`status ${isDone(p) ? 'done' : 'live'}`}>{p.status}</span></p>
        </div>
      </Link>
    </li>
  );
}

export const projService = (t, p) => t.services.items.find((s) => s.icon === CAT_SVC[p.key]);

/** The approving bodies, each by its official logo on a white plate. Logos
 * are sized to the same visual area, so a wide wordmark and a square emblem
 * read at the same weight. */
export function Logos({ names, captions = false }) {
  return (
    <ul className={`logos${captions ? ' named' : ''}`}>
      {BODIES.map(([k, w, h], i) => (
        <li key={k}>
          <span className="logo"><img src={`/assets/logos/${k}.webp`} alt={captions ? '' : names[i]} width={w} height={h} loading="lazy" decoding="async" /></span>
          {/* With a caption the body's name is written out; the logo then repeats it. */}
          {captions && <span className="name">{names[i]}</span>}
        </li>
      ))}
    </ul>
  );
}

/** Home: the approving bodies' logos slide slowly in one endless row, with no
 * plates. Two copies make the loop seamless; the second is hidden from
 * assistive tech. It pauses on hover and focus, and under reduced motion it
 * stands still as one centred row. */
export function LogoStrip({ names }) {
  const set = (hidden) => BODIES.map(([k, w, h], i) => (
    <li key={k}>
      <img src={`/assets/logos/${k}.webp`} alt={hidden ? '' : names[i]} width={w} height={h} decoding="async" />
    </li>
  ));
  return (
    <div className="strip">
      <div className="strip-view"><div className="strip-track">
        <ul className="strip-set">{set(false)}</ul>
        <ul className="strip-set dup" aria-hidden="true">{set(true)}</ul>
      </div></div>
    </div>
  );
}

/** The three ISO standards side by side: a certificate mark, the standard,
 * what it covers. The same cards on the home page and the certifications page. */
export function IsoCards({ iso, as: H = 'h3' }) {
  return (
    <ul className="features iso-cards">
      {iso.map((i) => <li key={i.title}><Icon name="award" /><H><span className="num ltr">{i.title}</span></H><p>{i.desc}</p></li>)}
    </ul>
  );
}
