/* Every page other than the home page and the two forms. */
import { useEffect, useState } from 'react';

import { useSite } from '../SiteContext.jsx';
import { CAT_SVC, projSlug, src, svcOf } from '../lib/site.js';
import { Arrow, BackArrow, Img, Link, PageHead, Seal, Tabs } from '../components/ui.jsx';
import Viz from '../components/Viz.jsx';

const tone = (i) => (i % 2 ? 'lav' : 'teal');

function NodeCards({ items, render }) {
  return (
    <div className="cards">
      {items.map((x, i) => (
        <div key={i} className={`card ${tone(i)} rise`} style={{ '--d': i % 4 }}><span className="node" />{render(x)}</div>
      ))}
    </div>
  );
}

export function ProjectCard({ p }) {
  const { site } = useSite();
  return (
    <Link to={`projects/${projSlug(site, p.id)}`} className="pcard rise">
      <figure><Img src={src(p.image)} alt={p.title} /></figure>
      <div className="cap"><h3>{p.title}</h3><span className="meta">{p.client} · {p.status}</span></div>
    </Link>
  );
}

export function Company() {
  const { t, ui, images, route } = useSite();
  const I = t.intro, J = t.journey, L = t.leadership;
  const [tab, setTab] = useState('about');
  // Arriving from a link to the leadership cards (/company#people) opens that tab.
  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (['about', 'journey', 'values', 'people'].includes(h)) setTab(h);
  }, [route]);
  const photos = [images.chairman, images.gm];
  const items = [
    { key: 'about', label: ui.tabs.about, content: (
      <div className="split">
        <div><p className="lead" style={{ color: 'var(--ink)' }}>{I.p2}</p><p className="muted" style={{ marginTop: 20 }}>{I.p3}</p></div>
        <div className="card teal">
          <h3>{t.why.title}</h3>
          <ul style={{ display: 'grid', gap: 10, marginTop: 8 }}>
            {/* The first four reasons (ISO, NWC, 35 years, fleet) are stated where they belong. */}
            {t.why.items.slice(4).map((w) => <li key={w} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}><span className="node" style={{ flex: 'none' }} /><span>{w}</span></li>)}
          </ul>
        </div>
      </div>
    ) },
    { key: 'journey', label: ui.tabs.journey, content: (
      <ol className="years">{J.milestones.map((m) => <li key={m.year}><span className="y num">{m.year}</span><div className="t"><b>{m.title}</b><span>{m.desc}</span></div></li>)}</ol>
    ) },
    { key: 'values', label: ui.tabs.values, content: (
      <div className="cards">{J.values.map((v, i) => <div key={v.title} className={`card ${i % 3 === 1 ? 'lav' : 'teal'}`}><span className="node" /><h3>{v.title}</h3><p>{v.desc}</p></div>)}</div>
    ) },
    { key: 'people', label: ui.tabs.people, content: (
      <div className="people">{L.leaders.map((p, i) => (
        <article key={p.name} className="person">
          <figure><Img src={src(photos[i])} alt={p.name} /></figure>
          <div><h3>{p.name}</h3><p className="role">{p.title}</p><p className="muted">{p.bio}</p>
            <p className="tags">{(p.expertise || []).map((x) => <span key={x}>{x}</span>)}</p></div>
        </article>
      ))}</div>
    ) },
  ];
  return (
    <>
      <PageHead title={I.title} lead={I.p1} />
      <section className="sec wrap"><Tabs id="co" label={I.title} items={items} current={tab} onChange={setTab} /></section>
    </>
  );
}

export function Services() {
  const S = useSite().t.services;
  return (
    <>
      <PageHead title={S.title} lead={S.lead} />
      <section className="sec wrap">
        <div className="bento">
          {S.items.map((s, i) => (
            <Link key={s.icon} to={`services/${svcOf(s).slug}`} className={`tile ${i % 2 ? 'teal' : 'lav'} span-4 rise`} style={{ '--d': i % 3, minHeight: 0 }}>
              <h3>{s.title}</h3><p>{s.desc}</p>
              <p style={{ marginTop: 'auto', paddingTop: 12 }}>{s.capabilities.join(' · ')}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export function Service() {
  const { t, ui, route } = useSite();
  const S = t.services.items;
  const i = S.findIndex((x) => svcOf(x).slug === route.sub);
  const s = S[i];
  const rel = t.projects.items.filter((p) => svcOf(s).cat.includes(p.key));
  const prev = S[(i + S.length - 1) % S.length], next = S[(i + 1) % S.length];
  return (
    <>
      <PageHead title={s.title} lead={s.desc} back={<Link to="services" className="link back"><BackArrow /> {ui.allDisc}</Link>} />
      <section className="sec wrap"><div className={`tile ${tone(i + 1)} rise`} style={{ minHeight: 0 }}><Viz service={s} W={640} /></div></section>
      <section className="sec wrap">
        <h2 className="h-head rise" style={{ marginBottom: 28 }}>{ui.scope}</h2>
        <NodeCards items={s.capabilities} render={(c) => <h3>{c}</h3>} />
      </section>
      <section className="sec wrap">
        <h2 className="h-head rise" style={{ marginBottom: 28 }}>{ui.delivered}</h2>
        {rel.length ? <div className="pcards">{rel.map((p) => <ProjectCard key={p.id} p={p} />)}</div> : <p className="muted rise">{ui.noProj}</p>}
        <nav className="pager" aria-label={ui.allDisc}>
          <Link to={`services/${svcOf(prev).slug}`} rel="prev"><span>{ui.prev}</span><strong style={{ fontWeight: 400 }}>{prev.title}</strong></Link>
          <Link to={`services/${svcOf(next).slug}`} rel="next"><span>{ui.next}</span><strong style={{ fontWeight: 400 }}>{next.title}</strong></Link>
        </nav>
      </section>
    </>
  );
}

export function Projects() {
  const { t, ui } = useSite();
  const P = t.projects;
  const [filter, setFilter] = useState('all');
  const items = P.items.filter((p) => filter === 'all' || p.key === filter);
  return (
    <>
      <PageHead title={P.title} lead={P.lead} />
      <section className="sec wrap">
        <div className="filters" role="group" aria-label={P.title}>
          {P.categories.map((c) => <button key={c.key} type="button" aria-pressed={filter === c.key} onClick={() => setFilter(c.key)}>{c.key === 'all' ? ui.all : c.label}</button>)}
        </div>
        {items.length ? <div className="pcards">{items.map((p) => <ProjectCard key={p.id} p={p} />)}</div> : <p className="muted">{P.empty}</p>}
      </section>
    </>
  );
}

export function Project() {
  const { t, ui, site, route } = useSite();
  const P = t.projects;
  const p = P.items.find((x) => projSlug(site, x.id) === route.sub);
  const svc = t.services.items.find((s) => s.icon === CAT_SVC[p.key]);
  const more = P.items.filter((x) => x.key === p.key && x.id !== p.id);
  const cat = P.categories.find((c) => c.key === p.key)?.label || p.category;
  return (
    <>
      <PageHead title={p.title} lead={p.desc} back={<Link to="projects" className="link back"><BackArrow /> {ui.projMore}</Link>} />
      <div className="wrap">
        <figure className="photo wide rise"><Img src={src(p.image)} alt={p.title} eager /></figure>
        <dl className="facts rise">
          <div><dt>{P.labels.client}</dt><dd>{p.client}</dd></div>
          <div><dt>{P.labels.location}</dt><dd>{p.location}</dd></div>
          <div><dt>{ui.category}</dt><dd>{cat}</dd></div>
          <div><dt>{P.labels.status}</dt><dd>{p.status}</dd></div>
        </dl>
      </div>
      <section className="sec wrap">
        <h2 className="h-head rise" style={{ marginBottom: 28 }}>{P.labels.scope}</h2>
        <NodeCards items={p.scope || []} render={(x) => <h3>{x}</h3>} />
        {svc && <p style={{ marginTop: 32 }}><Link to={`services/${svcOf(svc).slug}`} className="link">{ui.discipline}: {svc.title} <Arrow /></Link></p>}
      </section>
      {more.length > 0 && (
        <section className="sec wrap">
          <h2 className="h-head rise" style={{ marginBottom: 28 }}>{ui.more}</h2>
          <div className="pcards">{more.map((x) => <ProjectCard key={x.id} p={x} />)}</div>
        </section>
      )}
    </>
  );
}

export function Fleet() {
  const E = useSite().t.equipment;
  return (
    <>
      <PageHead title={E.title} lead={E.lead} />
      <section className="sec wrap">
        <div className="split">
          <p className="lead rise" style={{ color: 'var(--ink)' }}>{E.p1}</p>
          <div className="card teal rise" style={{ '--d': 1 }}><p style={{ fontSize: 'var(--fs-body)', color: 'var(--ink)' }}>{E.p2}</p></div>
        </div>
        <figure className="photo wide rise"><Img src="/assets/photos/equipment-fleet.jpg" alt={E.title} /></figure>
      </section>
      <section className="sec wrap"><h2 className="h-head rise" style={{ marginBottom: 28 }}>{E.categoriesHeading}</h2><NodeCards items={E.categories} render={(c) => <h3>{c}</h3>} /></section>
      <section className="sec wrap">
        <h2 className="h-head rise" style={{ marginBottom: 28 }}>{E.supportHeading}</h2>
        <div className="cards">{E.features.map((f, i) => <div key={f.title} className="card rise" style={{ '--d': i % 4 }}><h3>{f.title}</h3><p>{f.desc}</p></div>)}</div>
      </section>
    </>
  );
}

export function Approvals() {
  const Cc = useSite().t.certifications;
  return (
    <>
      <PageHead title={Cc.title} lead={Cc.lead} />
      <section className="sec wrap">
        <div className="recog lav rise">
          <div className="txt"><h2 className="h-head">{Cc.isoHeading}</h2><p>{Cc.commitmentBody}</p></div>
          <ul className="seals">{Cc.iso.map((i) => <li key={i.title} className="seal"><Seal number={i.title.replace(/^ISO\s*/, '').split(':')[0]} /><b className="ltr">{i.title}</b><span>{i.desc}</span></li>)}</ul>
        </div>
      </section>
      <section className="sec wrap"><h2 className="h-head rise" style={{ marginBottom: 28 }}>{Cc.approvalsHeading}</h2><NodeCards items={Cc.approvals} render={(a) => <h3>{a}</h3>} /></section>
    </>
  );
}

export function NotFound() {
  const { ui } = useSite();
  return (
    <section className="wrap page-head page-404">
      <h1 className="h-display">{ui.notFoundTitle}</h1>
      <p className="lead">{ui.notFoundLead}</p>
      <p><Link to="" className="link">{ui.home} <Arrow /></Link></p>
    </section>
  );
}
