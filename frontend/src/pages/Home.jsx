import { useSite } from '../SiteContext.jsx';
import { projImage, svcOf } from '../lib/site.js';
import { Arrow, Link, LogoStrip, More, Photo, ProjectItem } from '../components/ui.jsx';

export default function Home() {
  const { t, ui, site } = useSite();
  const H = t.hero, C = t.certifications;
  // The company's own photographs: three projects under "selected", a fourth behind the hero.
  const withPhoto = t.projects.items.filter((p) => projImage(site, p));
  const featured = withPhoto.slice(0, 3);
  const heroPhoto = projImage(site, withPhoto.find((p) => !featured.includes(p)) || {});

  return (
    <>
      <div className="hero-bg" aria-hidden="true"><Photo src={heroPhoto} eager /></div>
      <section className="hero" aria-labelledby="h1">
        <div className="hero-in">
          <h1 id="h1">{H.title}</h1>
          <p>{H.lead}</p>
          <Link to="services" className="btn btn-outline-light">{H.cta1}</Link>
        </div>
      </section>

      <section className="band" aria-labelledby="disc-h"><div className="wrap">
        <div className="head"><h2 id="disc-h">{ui.homeDisc}</h2><More to="services">{ui.allDisciplines}</More></div>
        <ul className="disc-list">
          {t.services.items.map((s) => (
            <li key={s.icon}><Link to={`services/${svcOf(s).slug}`}><span className="name">{s.title}</span><Arrow /></Link></li>
          ))}
        </ul>
      </div></section>

      <section className="band mist" aria-labelledby="proj-h"><div className="wrap">
        <div className="head"><h2 id="proj-h">{ui.featured}</h2><More to="projects">{ui.allProjects}</More></div>
        <ul className="proj-grid featured">{featured.map((p) => <ProjectItem key={p.id} p={p} />)}</ul>
      </div></section>

      <section className="band teal on-dark" aria-labelledby="appr-h"><div className="wrap">
        <div className="head"><h2 id="appr-h">{ui.homeAppr}</h2><More to="approvals">{ui.certsLink}</More></div>
        {/* The owner's order: the government approvals first, the ISO certificates beneath. */}
        <LogoStrip names={C.approvals} />
        <ul className="names iso">{C.iso.map((i) => <li key={i.title}><span className="num ltr">{i.title}</span></li>)}</ul>
      </div></section>
    </>
  );
}
