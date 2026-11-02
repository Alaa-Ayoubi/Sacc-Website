import { useState } from 'react';
import { Phone } from 'lucide-react';

import { useSite } from '../SiteContext.jsx';
import { TILES, isDone, projSlug, src, svcOf } from '../lib/site.js';
import { Arrow, Icon, Img, Link, QuoteAction, Seal } from '../components/ui.jsx';
import Viz from '../components/Viz.jsx';

const tel = (n) => `tel:${n.replace(/\s/g, '')}`;

export default function Home() {
  const { t, ui, site, images, company } = useSite();
  const [filter, setFilter] = useState('all');
  const P = t.projects, L = t.leadership, C = t.contact, Cc = t.certifications;
  const band = [
    [src(P.items[3]?.image), `${ui.photoOf}: ${P.items[3]?.title}`],
    ['/assets/photos/hero-infrastructure.jpg', ui.photoOf],
    [src(P.items[4]?.image), `${ui.photoOf}: ${P.items[4]?.title}`],
  ];
  const [chair, gm] = L.leaders;

  return (
    <>
      <section className="hero" aria-labelledby="h1">
        <div className="wrap hero-top">
          <h1 className="h-display" id="h1">{t.brandLine}</h1>
          <div className="side">
            <p className="lead">{t.hero.lead}</p>
            <div className="acts">
              <QuoteAction id="hero-action" />
              <Link to="services" className="ghost">{t.hero.cta1}</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="stage">
        <div className="band wrap">
          <div className="band-in">
            {band.map(([u, alt], i) => <figure key={i}><Img src={u} alt={alt} eager={i === 1} /></figure>)}
            <span className="rail t" aria-hidden="true" /><span className="rail b" aria-hidden="true" />
          </div>
        </div>
        <div className="over">
          <section className="sec wrap" aria-labelledby="disc-h">
            <div className="sec-head">
              <h2 className="h-head rise" id="disc-h">{t.services.title}</h2>
              <p className="lead rise" style={{ '--d': 1 }}>{t.services.lead}</p>
            </div>
            <div className="bento">
              {t.services.items.map((s, i) => {
                const [span, tone] = TILES[i] || [4, 'teal'];
                return (
                  <Link key={s.icon} to={`services/${svcOf(s).slug}`} className={`tile ${tone} span-${span} rise`} style={{ '--d': i % 3 }}>
                    <h3>{s.title}</h3><p>{s.desc}</p>
                    <Viz service={s} W={span >= 6 ? 640 : 420} />
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <section className="sec wrap" id="work" aria-labelledby="work-h">
        <div className="sec-head">
          <h2 className="h-head rise" id="work-h">{P.title}</h2>
          <p className="lead rise" style={{ '--d': 1 }}>{P.lead}</p>
        </div>
        <div className="filters rise" role="group" aria-label={P.title}>
          {P.categories.map((c) => (
            <button key={c.key} type="button" aria-pressed={filter === c.key} onClick={() => setFilter(c.key)}>{c.key === 'all' ? ui.all : c.label}</button>
          ))}
        </div>
        <div className="rows">
          {P.items.map((p) => (
            <Link key={p.id} to={`projects/${projSlug(site, p.id)}`} className="row" hidden={filter !== 'all' && filter !== p.key}>
              <h3>{p.title}</h3>
              <span className={`st${isDone(p) ? '' : ' live'}`}>{p.status}</span>
              <span className="meta">{p.client} · {p.location}</span>
            </Link>
          ))}
        </div>
        <p className="figures-foot"><Link to="projects" className="link">{ui.projMore} <Arrow /></Link></p>
      </section>

      <section className="sec wrap" aria-labelledby="recog-h">
        <div className="recog lav rise">
          <div className="txt"><h2 className="h-head" id="recog-h">{Cc.title}</h2><p>{Cc.lead}</p></div>
          <ul className="seals">
            {Cc.iso.map((i) => (
              <li key={i.title} className="seal"><Seal number={i.title.replace(/^ISO\s*/, '').split(':')[0]} /><b className="ltr">{i.title}</b><span>{i.desc}</span></li>
            ))}
          </ul>
          <div className="apprv">
            <h3>{Cc.approvalsHeading}</h3>
            {Cc.approvals.map((a) => <span key={a} className="chip">{a}</span>)}
            <Link to="approvals" className="link">{ui.apprMore} <Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="sec wrap" aria-label={ui.figuresLabel}>
        <dl className="figures rise">
          {t.stats.map((s) => (
            <div key={s.label}><dt className="visually-hidden">{s.label}</dt><dd><strong className="num ltr">{s.value}</strong></dd><dd><span>{s.label}</span></dd></div>
          ))}
        </dl>
        <p className="figures-foot"><Link to="fleet" className="link">{ui.fleetMore} <Arrow /></Link></p>
      </section>

      <section className="sec wrap" aria-labelledby="lead-h">
        <div className="sec-head">
          <h2 className="h-head rise" id="lead-h">{L.title}</h2>
          <p className="lead rise" style={{ '--d': 1 }}>{L.lead}</p>
        </div>
        <div className="lead-grid">
          <article className="chair-card rise">
            <figure><Img src={src(images.chairman)} alt={chair.name} /></figure>
            <div className="body">
              <blockquote>{L.quote.replace(/^["«]|["»]$/g, '')}</blockquote>
              <p className="sig"><b>{chair.name}</b>{chair.title}</p>
            </div>
          </article>
          <Link to="company#people" className="person-card rise" style={{ '--d': 1 }}>
            <figure><Img src={src(images.gm)} alt={gm.name} /></figure>
            <div className="cap"><b>{gm.name}</b><span>{gm.title}</span></div>
          </Link>
        </div>
      </section>

      <section className="sec wrap" aria-labelledby="office-h">
        <div className="close">
          <div className="panel rise">
            <h2 className="h-head" id="office-h">{ui.officeH}</h2>
            <p className="muted">{C.address}</p>
            <dl>
              <div><dt>{C.hoursHeading}</dt><dd>{C.hours.map((h) => <span key={h} className="num" style={{ display: 'block' }}>{h}</span>)}</dd></div>
              <div><dt>{ui.mobile}</dt><dd><a href={tel(company.mobile)}><span className="ltr num">{company.mobile}</span></a></dd></div>
              <div><dt>{ui.email}</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
              <div><dt>{ui.cr}</dt><dd className="num">{company.cr}</dd></div>
            </dl>
            <a className="ghost" href={tel(company.phone)}><Icon as={Phone} /><span>{ui.call} <span className="ltr num">{company.phone}</span></span></a>
          </div>
          <figure className="rise" style={{ '--d': 1 }}><Img src={src(images.careers)} alt={`${ui.photoOf}: ${ui.officeH}`} /></figure>
        </div>
      </section>
    </>
  );
}
