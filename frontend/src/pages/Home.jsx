import { useSite } from '../SiteContext.jsx';
import { svcOf } from '../lib/site.js';
import { Icon, Img, Link, Marquee, QuoteAction, SecHead, useDir } from '../components/ui.jsx';
import { FilteredProjects } from './Inner.jsx';

const tel = (n) => `tel:${n.replace(/\s/g, '')}`;

export default function Home() {
  const { t, ui, images, company } = useSite();
  const d = useDir();
  const S = t.services, P = t.projects, L = t.leadership, C = t.contact, Cc = t.certifications;
  const [chair, gm] = L.leaders;

  return (
    <>
      <section className="hero on-dark" aria-labelledby="h1">
        <Img src={images.hero} eager />
        <div className="wrap hero-mid">
          <h1 className="h-hero" id="h1" translate="no">{t.brandLine}</h1>
          <p className="lead">{t.hero.lead}</p>
          <span className="cta"><QuoteAction id="hero-action" className="action light"><span className="ic"><Icon name="phone" /></span></QuoteAction></span>
        </div>
        <div className="wrap">
          <dl className="creds" aria-label={ui.figuresLabel}>
            {t.stats.map((s) => <div key={s.label}><dt>{s.label}</dt><dd className="num ltr">{s.value}</dd></div>)}
          </dl>
        </div>
      </section>

      <div className="sheet-body">
        <section className="sec wrap" aria-labelledby="disc-h">
          <SecHead title={S.title} lead={S.lead} label={S.eyebrow} id="disc-h" />
          <div className="cards five">
            {S.items.map((s) => (
              <Link key={s.icon} to={`services/${svcOf(s).slug}`} className="card rise">
                <h3>{s.title}</h3><p>{s.desc}</p><Icon name={d.up} className="go" />
              </Link>
            ))}
            <Link to="services" className="card more rise"><h3>{S.title}</h3><Icon name={d.up} className="go" /></Link>
          </div>
        </section>

        <section className="sec wrap" aria-labelledby="work-h">
          <SecHead title={P.title} lead={P.lead} label={P.eyebrow} id="work-h" />
          <FilteredProjects />
          <p className="sec-foot"><Link to="projects" className="btn">{P.title}</Link></p>
        </section>

        <section className="sec" aria-labelledby="recog-h">
          <div className="wrap">
            <SecHead title={Cc.title} lead={Cc.lead} label={Cc.eyebrow} id="recog-h" extra={<Link to="approvals" className="btn">{Cc.title}</Link>} />
          </div>
          <div className="band"><div className="wrap">
            <h3 className="band-h rise">{Cc.approvalsHeading}</h3>
            <Marquee names={Cc.approvals} />
            <p className="iso-line rise">
              <span>{Cc.isoHeading}</span>
              {Cc.iso.map((x) => <span key={x.title} className="iso"><b className="ltr num">{x.title}</b> {x.desc}</span>)}
            </p>
          </div></div>
        </section>

        <section className="sec wrap" aria-labelledby="lead-h">
          <SecHead title={L.title} lead={L.lead} label={L.eyebrow} id="lead-h" />
          <div className="panel rise">
            <Img src={images.water} />
            <figure className="float chair">
              <Img src={images.chairman} alt={chair.name} />
              <div>
                <blockquote>{L.quote.replace(/^["«]|["»]$/g, '')}</blockquote>
                <figcaption className="sig"><b>{chair.name}</b><span>{chair.title}</span></figcaption>
              </div>
            </figure>
            <Link to="company#people" className="float gm">
              <Img src={images.gm} alt={gm.name} />
              <span className="txt"><b>{gm.name}</b><span>{gm.title}</span><span className="more">{ui.tabs.people}<Icon name={d.fwd} /></span></span>
            </Link>
          </div>
        </section>

        <section className="sec wrap" aria-labelledby="office-h">
          <h2 className="h-sec rise office-h" id="office-h">{ui.officeH}</h2>
          <div className="office">
            <dl className="col rise">
              <div><dt>{ui.address}</dt><dd>{C.address}</dd></div>
              <div><dt>{C.hoursHeading}</dt><dd>{C.hours.map((h) => <span key={h} className="num hr">{h}</span>)}</dd></div>
            </dl>
            <dl className="col rise">
              <div><dt>{ui.phone}</dt><dd><a href={tel(company.phone)}><span className="ltr num">{company.phone}</span></a></dd></div>
              <div><dt>{ui.mobile}</dt><dd><a href={tel(company.mobile)}><span className="ltr num">{company.mobile}</span></a></dd></div>
            </dl>
            <dl className="col rise">
              <div><dt>{ui.email}</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div>
              <div><dt>{ui.cr}</dt><dd className="num">{company.cr}</dd></div>
            </dl>
          </div>
        </section>
      </div>
    </>
  );
}
