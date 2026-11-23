/* Every page other than the home page and the two forms. */
import { useEffect, useState } from 'react';

import { useSite } from '../SiteContext.jsx';
import { CAT_SVC, isDone, projSlug, svcOf } from '../lib/site.js';
import { ArrowLink, Bodies, Cards, Icon, Img, Link, PageHead, SecHead, SubHead, Tabs, useDir } from '../components/ui.jsx';

/** A project on its photograph: client and status at the top, title at the foot. */
export function ProjectCard({ p, as: H = 'h3', hidden }) {
  const { site } = useSite();
  return (
    <Link to={`projects/${projSlug(site, p.id)}`} className="pcard on-dark rise" data-key={p.key} hidden={hidden}>
      <Img src={p.image} />
      <span className="top"><span>{p.client}</span><span className={`st${isDone(p) ? '' : ' live'}`}>{p.status}</span></span>
      <H className="pt">{p.title}</H>
    </Link>
  );
}

const ProjectGrid = ({ items, as, show = () => true }) => (
  <div className="pgrid">{items.map((p) => <ProjectCard key={p.id} p={p} as={as} hidden={!show(p)} />)}</div>
);

/** Every project, with the category filter above. */
export function FilteredProjects({ as }) {
  const { t, ui } = useSite();
  const P = t.projects;
  const [filter, setFilter] = useState('all');
  return (
    <>
      <div className="filters choices" role="group" aria-label={P.title}>
        {P.categories.map((c) => (
          <button key={c.key} type="button" aria-pressed={filter === c.key} onClick={() => setFilter(c.key)}>{c.key === 'all' ? ui.all : c.label}</button>
        ))}
      </div>
      <ProjectGrid items={P.items} as={as} show={(p) => filter === 'all' || p.key === filter} />
    </>
  );
}

export function Company() {
  const { t, ui, images, route } = useSite();
  const I = t.intro, J = t.journey, L = t.leadership;
  const [tab, setTab] = useState('about');
  // Arriving from a link to the leadership (/company#people) opens that tab.
  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (['about', 'journey', 'values', 'people'].includes(h)) setTab(h);
  }, [route]);
  const photos = [images.chairman, images.gm];
  const items = [
    { key: 'about', label: ui.tabs.about, content: (
      <div className="prose narrow"><p className="lead strong">{I.p2}</p><p className="muted">{I.p3}</p></div>
    ) },
    { key: 'journey', label: ui.tabs.journey, content: (
      <ol className="years">
        {J.milestones.map((m) => <li key={m.year}><span className="y num">{m.year}</span><div className="t"><b>{m.title}</b><span className="muted">{m.desc}</span></div></li>)}
      </ol>
    ) },
    { key: 'values', label: ui.tabs.values, content: <Cards items={J.values} as="h2" /> },
    { key: 'people', label: ui.tabs.people, content: (
      <div className="people">{L.leaders.map((p, i) => (
        <article key={p.name} className="person">
          <Img src={photos[i]} alt={p.name} />
          <div>
            <h2 className="pn">{p.name}</h2><p className="role">{p.title}</p><p className="muted">{p.bio}</p>
            <p className="tags">{(p.expertise || []).map((x) => <span key={x}>{x}</span>)}</p>
          </div>
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
  const d = useDir();
  return (
    <>
      <PageHead title={S.title} lead={S.lead} />
      <section className="sec wrap">
        <div className="list">
          {S.items.map((s) => (
            <Link key={s.icon} to={`services/${svcOf(s).slug}`} className="row rise">
              <b>{s.title}</b><span className="muted">{s.desc}</span><Icon name={d.fwd} className="go" />
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
      <PageHead title={s.title} lead={s.desc} back={<ArrowLink to="services" back>{t.services.title}</ArrowLink>} />
      <section className="sec wrap"><SubHead>{ui.scope}</SubHead><Cards items={s.capabilities} /></section>
      <section className="sec wrap">
        <SubHead>{ui.delivered}</SubHead>
        {rel.length ? <ProjectGrid items={rel} /> : <p className="muted">{ui.noProj}</p>}
        <nav className="pager" aria-label={t.services.title}>
          <Link to={`services/${svcOf(prev).slug}`} rel="prev"><span>{ui.prev}</span><b>{prev.title}</b></Link>
          <Link to={`services/${svcOf(next).slug}`} rel="next"><span>{ui.next}</span><b>{next.title}</b></Link>
        </nav>
      </section>
    </>
  );
}

export function Projects() {
  const P = useSite().t.projects;
  return (
    <>
      <PageHead title={P.title} lead={P.lead} />
      <section className="sec wrap"><FilteredProjects as="h2" /></section>
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
      <PageHead title={p.title} lead={p.desc} back={<ArrowLink to="projects" back>{P.title}</ArrowLink>} />
      <div className="wrap">
        <div className="panel sharp record rise">
          <Img src={p.image} alt={p.title} eager />
          <dl className="float facts">
            <div><dt>{P.labels.client}</dt><dd>{p.client}</dd></div>
            <div><dt>{P.labels.location}</dt><dd>{p.location}</dd></div>
            <div><dt>{ui.category}</dt><dd>{cat}</dd></div>
            <div><dt>{P.labels.status}</dt><dd>{p.status}</dd></div>
          </dl>
        </div>
      </div>
      <section className="sec wrap">
        <SubHead>{P.labels.scope}</SubHead>
        <Cards items={p.scope || []} />
        {svc && <p className="after"><ArrowLink to={`services/${svcOf(svc).slug}`}>{ui.discipline}: {svc.title}</ArrowLink></p>}
      </section>
      {more.length > 0 && <section className="sec wrap"><SubHead>{ui.more}</SubHead><ProjectGrid items={more} /></section>}
    </>
  );
}

export function Approvals() {
  const Cc = useSite().t.certifications;
  return (
    <>
      <PageHead title={Cc.title} lead={Cc.lead} />
      <section className="sec wrap">
        <SecHead title={Cc.isoHeading} lead={Cc.commitmentBody} cls="h-sub" />
        <div className="tiles">
          {Cc.iso.map((x) => {
            const n = (/^ISO\s*(.+)$/.exec(x.title) || [null, x.title])[1];
            return <div key={x.title} className="tile rise"><div className="plate"><small className="ltr">ISO</small><b className="ltr num">{n}</b></div><p className="cap">{x.desc}</p></div>;
          })}
        </div>
      </section>
      <section className="sec">
        <div className="band"><div className="wrap">
          <h2 className="band-h rise">{Cc.approvalsHeading}</h2>
          <Bodies names={Cc.approvals} />
        </div></div>
      </section>
    </>
  );
}

export function NotFound() {
  const { ui } = useSite();
  return (
    <>
      <PageHead title={ui.notFoundTitle} lead={ui.notFoundLead} />
      <section className="sec wrap page-404"><ArrowLink to="">{ui.home}</ArrowLink></section>
    </>
  );
}
