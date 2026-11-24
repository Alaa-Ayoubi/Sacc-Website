/* Every page other than the home page and the two forms. */
import { useState } from 'react';

import { useSite } from '../SiteContext.jsx';
import { isDone, portrait, projImage, projSlug, svcOf } from '../lib/site.js';
import { Arrow, Checks, Icon, Link, Logos, More, PageHead, Photo, ProjectItem, Tabs, projService } from '../components/ui.jsx';

/** "n published projects" in the visitor's language. */
function Published({ n }) {
  const P = useSite().ui.published;
  if (n === 1) return P.one;
  if (n === 2) return P.two;
  return <><span className="num">{n}</span> {P.few}</>;
}

const relProjects = (t, s) => t.projects.items.filter((p) => svcOf(s).cat.includes(p.key));
const Crumb = ({ to, children }) => <Link to={to} className="crumb"><Arrow /> {children}</Link>;

export function Company() {
  const { t, ui } = useSite();
  const I = t.intro, Y = t.why;
  // The first four reasons (ISO, NWC, 35 years, fleet) are stated on their own pages.
  return (
    <>
      <PageHead title={I.title} lead={I.p1} />
      <section className="band"><div className="wrap cols-2">
        <div className="prose"><p className="lead">{I.p2}</p><p>{I.p3}</p></div>
        <div>
          <h2 className="sub-h">{Y.title}</h2>
          <Checks items={Y.items.slice(4)} className="checks" />
          <div className="onward"><More to="leadership">{ui.meetLeaders}</More><More to="journey">{ui.ourJourney}</More></div>
        </div>
      </div></section>
    </>
  );
}

export function Services() {
  const { t, ui } = useSite();
  const S = t.services;
  return (
    <>
      <PageHead title={S.title} lead={S.lead} />
      <section className="band"><div className="wrap">
        <ul className="disc-grid">
          {S.items.map((s) => {
            const n = relProjects(t, s).length;
            return (
              <li key={s.icon}><Link to={`services/${svcOf(s).slug}`}>
                <h2>{s.title}</h2>
                <span className="meta" aria-hidden={n ? undefined : 'true'}>{n ? <Published n={n} /> : ''}</span>
                <span className="go">{ui.details} <Arrow /></span>
              </Link></li>
            );
          })}
        </ul>
      </div></section>
    </>
  );
}

export function Service() {
  const { t, ui, route } = useSite();
  const S = t.services.items;
  const i = S.findIndex((x) => svcOf(x).slug === route.sub);
  const s = S[i];
  const rel = relProjects(t, s);
  const prev = S[(i + S.length - 1) % S.length], next = S[(i + 1) % S.length];
  return (
    <>
      <PageHead title={s.title} lead={s.desc}><Crumb to="services">{ui.allDisciplines}</Crumb></PageHead>
      <section className="band"><div className="wrap">
        <Tabs id="svc" label={s.title} items={[
          { key: 'scope', label: ui.scopeTab, count: s.capabilities.length, content: <Checks items={s.capabilities} /> },
          { key: 'projects', label: ui.projectsTab, count: rel.length, content: rel.length
            ? <ul className="proj-grid">{rel.map((p) => <ProjectItem key={p.id} p={p} />)}</ul>
            : <p className="empty">{ui.noProjects}</p> },
        ]} />
        <nav className="pager" aria-label={ui.allDisciplines}>
          <Link to={`services/${svcOf(prev).slug}`} rel="prev"><span className="k">{ui.prev}</span><span className="v">{prev.title}</span></Link>
          <Link to={`services/${svcOf(next).slug}`} rel="next"><span className="k">{ui.next}</span><span className="v">{next.title}</span></Link>
        </nav>
      </div></section>
    </>
  );
}

export function Projects() {
  const P = useSite().t.projects;
  const [filter, setFilter] = useState('all');
  const items = P.items.filter((p) => filter === 'all' || p.key === filter);
  return (
    <>
      <PageHead title={P.title} lead={P.lead} />
      <section className="band"><div className="wrap">
        <div className="filters" role="group" aria-label={P.title}>
          {P.categories.map((c) => (
            <button key={c.key} type="button" aria-pressed={filter === c.key} onClick={() => setFilter(c.key)}>
              {c.label}<span className="count num">{c.key === 'all' ? P.items.length : P.items.filter((p) => p.key === c.key).length}</span>
            </button>
          ))}
        </div>
        {items.length ? <ul className="proj-grid">{items.map((p) => <ProjectItem key={p.id} p={p} as="h2" />)}</ul> : <p className="empty">{P.empty}</p>}
      </div></section>
    </>
  );
}

export function Project() {
  const { t, ui, site, route } = useSite();
  const P = t.projects;
  const p = P.items.find((x) => projSlug(site, x.id) === route.sub);
  const svc = projService(t, p);
  const cat = P.categories.find((c) => c.key === p.key)?.label || p.category;
  const more = P.items.filter((x) => x.key === p.key && x.id !== p.id);
  return (
    <>
      <PageHead title={p.title}><Crumb to="projects">{ui.allProjects}</Crumb></PageHead>
      <Photo src={projImage(site, p)} alt={p.title} className="proj-hero" eager />
      <section className="band"><div className="wrap cols-2">
        <div className="prose">
          <p className="lead">{p.desc}</p>
          <h2 className="sub-h scope-h">{P.labels.scope}</h2>
          <Checks items={p.scope || []} />
        </div>
        <dl className="facts">
          <div><dt>{P.labels.client}</dt><dd>{p.client}</dd></div>
          <div><dt>{P.labels.location}</dt><dd>{p.location}</dd></div>
          <div><dt>{ui.category}</dt><dd>{cat}</dd></div>
          <div><dt>{P.labels.status}</dt><dd><span className={`status ${isDone(p) ? 'done' : 'live'}`}>{p.status}</span></dd></div>
          {svc && <div><dt>{ui.discipline}</dt><dd><Link to={`services/${svcOf(svc).slug}`} className="more">{svc.title}</Link></dd></div>}
        </dl>
      </div></section>
      {more.length > 0 && (
        <section className="band mist"><div className="wrap">
          <div className="head"><h2>{ui.moreProjects}</h2></div>
          <ul className="proj-grid">{more.map((x) => <ProjectItem key={x.id} p={x} />)}</ul>
        </div></section>
      )}
    </>
  );
}

export function Fleet() {
  const E = useSite().t.equipment;
  return (
    <>
      <PageHead title={E.title} lead={E.lead} />
      <section className="band"><div className="wrap">
        <div className="prose fleet-prose"><p className="lead">{E.p1}</p><p>{E.p2}</p></div>
        <Tabs id="fleet" label={E.title} items={[
          { key: 'cats', label: E.categoriesHeading, count: E.categories.length, content: (
            <ul className="list-ruled">{E.categories.map((c) => <li key={c}><span className="tick" aria-hidden="true" /><span>{c}</span></li>)}</ul>
          ) },
          { key: 'support', label: E.supportHeading, count: E.features.length, content: (
            <ul className="ruled-desc">{E.features.map((f) => <li key={f.title}><Icon name="check" /><div><h3>{f.title}</h3><p>{f.desc}</p></div></li>)}</ul>
          ) },
        ]} />
      </div></section>
    </>
  );
}

export function Approvals() {
  const C = useSite().t.certifications;
  // The owner's order: government approvals, then the commitment, then the ISO certificates.
  return (
    <>
      <PageHead title={C.title} lead={C.lead} />
      <section className="band"><div className="wrap">
        <Tabs id="certs" label={C.title} items={[
          { key: 'gov', label: C.approvalsHeading, count: C.approvals.length, content: <Logos names={C.approvals} /> },
          { key: 'commit', label: C.commitmentTitle, content: <div className="prose"><p className="lead">{C.commitmentBody}</p></div> },
          { key: 'iso', label: C.isoHeading, count: C.iso.length, content: (
            <ul className="features">{C.iso.map((i) => <li key={i.title}><Icon name="award" /><h3 className="num">{i.title}</h3><p>{i.desc}</p></li>)}</ul>
          ) },
        ]} />
      </div></section>
    </>
  );
}

export function Journey() {
  const { t, ui } = useSite();
  const J = t.journey;
  return (
    <>
      <PageHead title={J.title} lead={J.lead} />
      <section className="band"><div className="wrap">
        <Tabs id="journey" label={J.title} items={[
          { key: 'm', label: ui.milestones, count: J.milestones.length, content: (
            <ol className="timeline">{J.milestones.map((m) => <li key={m.year}><span className="yr">{m.year}</span><div><h3>{m.title}</h3><p>{m.desc}</p></div></li>)}</ol>
          ) },
          { key: 'v', label: J.valuesTitle, count: J.values.length, content: (
            <ul className="values">{J.values.map((v) => <li key={v.title}><strong>{v.title}</strong><span>{v.desc}</span></li>)}</ul>
          ) },
        ]} />
      </div></section>
    </>
  );
}

export function Leadership() {
  const { t, site } = useSite();
  const L = t.leadership;
  return (
    <>
      <PageHead title={L.title} lead={L.lead} />
      <section className="band"><div className="wrap leaders">
        {L.leaders.map((p, i) => (
          <article key={p.name} className="leader">
            <Photo src={portrait(site, i)} alt={p.name} className="portrait" />
            <div>
              <h2>{p.name}</h2><p className="role">{p.title}</p><p className="bio">{p.bio}</p>
              <h3 className="visually-hidden">{L.expertiseHeading}</h3>
              <ul className="tags">{(p.expertise || []).map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </article>
        ))}
      </div></section>
      <section className="band teal on-dark"><div className="wrap">
        <figure className="quote">
          <blockquote>{L.quote}</blockquote>
          <figcaption><strong>{L.leaders[0].name}</strong>{L.leaders[0].title}</figcaption>
        </figure>
      </div></section>
    </>
  );
}

export function NotFound() {
  const { ui } = useSite();
  return (
    <>
      <PageHead title={ui.notFoundTitle} lead={ui.notFoundLead} />
      <section className="band"><div className="wrap"><More to="">{ui.home}</More></div></section>
    </>
  );
}
