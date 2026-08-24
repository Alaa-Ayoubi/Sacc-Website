/* The content sections of the home page.
 *
 * Each one reads its copy from the API bundle, so nothing here hardcodes text
 * in either language. Images fall back to the local copies in public/ when the
 * bundle points at a CDN URL that is unreachable.
 */
import { useState } from 'react';

import { useSite } from '../SiteContext.jsx';

function SectionHead({ eyebrow, title, lead }) {
  return (
    <div className="section-head">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && <h2 className="section-title">{title}</h2>}
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}

export function Hero({ onNavigate }) {
  const { t, images } = useSite();
  const bg = images.hero || './assets/photos/hero-infrastructure.jpg';

  return (
    <section id="top" className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${bg})` }} aria-hidden="true" />
      <div className="container">
        <span className="eyebrow">{t.hero.badge}</span>
        <h1>{t.hero.title}</h1>
        <p className="hero-lead">{t.hero.lead}</p>
        <div className="hero-actions">
          <a
            className="btn btn-primary"
            href="#services"
            onClick={(event) => {
              event.preventDefault();
              onNavigate('services');
            }}
          >
            {t.hero.cta1}
          </a>
          <a
            className="btn btn-ghost"
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              onNavigate('contact');
            }}
          >
            {t.hero.cta2}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  const { t } = useSite();
  return (
    <section className="stats" aria-label={t.intro.eyebrow}>
      <div className="container">
        {t.stats.map((stat) => (
          <div key={stat.label}>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function About() {
  const { t } = useSite();
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead eyebrow={t.intro.eyebrow} title={t.intro.title} />
        <div className="grid grid-3 prose">
          <p>{t.intro.p1}</p>
          <p>{t.intro.p2}</p>
          <p>{t.intro.p3}</p>
        </div>
      </div>
    </section>
  );
}

export function Why() {
  const { t } = useSite();
  return (
    <section className="section section-alt">
      <div className="container">
        <SectionHead title={t.why.title} lead={t.why.lead} />
        <ul className="check-list grid grid-2">
          {t.why.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Services({ onInquire }) {
  const { t } = useSite();
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHead eyebrow={t.services.eyebrow} title={t.services.title} lead={t.services.lead} />
        <div className="grid grid-3">
          {t.services.items.map((service, index) => (
            <article className="card" key={service.title}>
              <span className="card-num">{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              {service.capabilities?.length > 0 && (
                <>
                  <p className="hint">{t.services.capabilitiesHeading}</p>
                  <ul className="tag-list">
                    {service.capabilities.map((capability) => (
                      <li key={capability}>{capability}</li>
                    ))}
                  </ul>
                </>
              )}
              <button
                type="button"
                className="disclosure"
                onClick={() => onInquire(`${t.services.inquireCta} ${service.title}`)}
              >
                {t.services.inquireCta} ←
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects({ onInquire }) {
  const { t } = useSite();
  const [category, setCategory] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const items =
    category === 'all' ? t.projects.items : t.projects.items.filter((p) => p.key === category);

  const stats = [
    { value: t.projects.items.length, label: t.projects.statLabels.projects },
    { value: new Set(t.projects.items.map((p) => p.client)).size, label: t.projects.statLabels.clients },
    { value: new Set(t.projects.items.map((p) => p.location)).size, label: t.projects.statLabels.regions },
  ];

  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <SectionHead eyebrow={t.projects.eyebrow} title={t.projects.title} lead={t.projects.lead} />

        <div className="chips" role="group" aria-label={t.projects.title}>
          {t.projects.categories.map((chip) => (
            <button
              type="button"
              key={chip.key}
              className="chip"
              aria-pressed={category === chip.key}
              onClick={() => setCategory(chip.key)}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <p className="section-lead">{t.projects.empty}</p>
        ) : (
          <div className="grid grid-3">
            {items.map((project) => (
              <article className="card project" key={project.id}>
                {project.image && (
                  <div
                    className="project-media"
                    style={{ backgroundImage: `url(${project.image})` }}
                    role="img"
                    aria-label={project.title}
                  />
                )}
                <div className="project-body">
                  <span className="status">{project.status}</span>
                  <h3 style={{ marginTop: 10 }}>{project.title}</h3>
                  <p>{project.desc}</p>

                  <dl className="project-meta">
                    <div>
                      <dt>{t.projects.labels.client}</dt>
                      <dd>{project.client}</dd>
                    </div>
                    <div>
                      <dt>{t.projects.labels.location}</dt>
                      <dd>{project.location}</dd>
                    </div>
                  </dl>

                  {project.scope?.length > 0 && (
                    <>
                      <button
                        type="button"
                        className="disclosure"
                        aria-expanded={expanded === project.id}
                        onClick={() => setExpanded(expanded === project.id ? null : project.id)}
                      >
                        {expanded === project.id ? t.projects.collapse : t.projects.expand}
                      </button>
                      {expanded === project.id && (
                        <>
                          <p className="hint" style={{ marginTop: 12 }}>
                            {t.projects.labels.scope}
                          </p>
                          <ul className="tag-list">
                            {project.scope.map((step) => (
                              <li key={step}>{step}</li>
                            ))}
                          </ul>
                          <button
                            type="button"
                            className="disclosure"
                            onClick={() => onInquire(`${t.projects.detailsCta}: ${project.title}`)}
                          >
                            {t.projects.detailsCta} ←
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="grid grid-4" style={{ marginTop: 42 }}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="stat-value" style={{ color: 'var(--teal-link)' }}>{stat.value}</div>
              <div className="stat-label" style={{ color: 'var(--ink-muted)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Equipment({ onInquire }) {
  const { t, images } = useSite();
  return (
    <section id="equipment" className="section">
      <div className="container">
        <SectionHead eyebrow={t.equipment.eyebrow} title={t.equipment.title} lead={t.equipment.lead} />

        <div className="contact-grid">
          <div className="prose">
            <p>{t.equipment.p1}</p>
            <p>{t.equipment.p2}</p>
            <button type="button" className="btn btn-outline" onClick={() => onInquire(t.equipment.cta)}>
              {t.equipment.cta}
            </button>
          </div>
          <div>
            <img
              src={images.equipment || './assets/photos/equipment-fleet.jpg'}
              alt={t.equipment.title}
              style={{ width: '100%', borderRadius: 'var(--radius-lg)' }}
              loading="lazy"
            />
          </div>
        </div>

        <h3 style={{ margin: '48px 0 18px' }}>{t.equipment.categoriesHeading}</h3>
        <ul className="check-list grid grid-3">
          {t.equipment.categories.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 style={{ margin: '48px 0 18px' }}>{t.equipment.supportHeading}</h3>
        <div className="grid grid-4">
          {t.equipment.features.map((feature) => (
            <article className="card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Certifications({ onInquire }) {
  const { t } = useSite();
  return (
    <section id="certifications" className="section section-alt">
      <div className="container">
        <SectionHead
          eyebrow={t.certifications.eyebrow}
          title={t.certifications.title}
          lead={t.certifications.lead}
        />

        <h3 style={{ marginBottom: 18 }}>{t.certifications.isoHeading}</h3>
        <div className="grid grid-3">
          {t.certifications.iso.map((cert) => (
            <article className="card" key={cert.title}>
              <h3>{cert.title}</h3>
              <p>{cert.desc}</p>
            </article>
          ))}
        </div>

        <h3 style={{ margin: '48px 0 18px' }}>{t.certifications.approvalsHeading}</h3>
        <ul className="check-list grid grid-3">
          {t.certifications.approvals.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="quote">
          <h3 style={{ marginTop: 0 }}>{t.certifications.commitmentTitle}</h3>
          <p style={{ fontStyle: 'normal' }}>{t.certifications.commitmentBody}</p>
          <button
            type="button"
            className="btn btn-outline"
            style={{ marginTop: 18 }}
            onClick={() => onInquire(t.certifications.cta)}
          >
            {t.certifications.cta}
          </button>
        </div>
      </div>
    </section>
  );
}

export function Journey() {
  const { t } = useSite();
  return (
    <section id="journey" className="section section-dark">
      <div className="container">
        <SectionHead eyebrow={t.journey.eyebrow} title={t.journey.title} lead={t.journey.lead} />

        <div className="contact-grid">
          <ol className="timeline">
            {t.journey.milestones.map((milestone) => (
              <li key={`${milestone.year}-${milestone.title}`}>
                <span className="year">{milestone.year}</span>
                <h3>{milestone.title}</h3>
                <p>{milestone.desc}</p>
              </li>
            ))}
          </ol>

          <div>
            <h3 style={{ color: '#fff', marginTop: 0 }}>{t.journey.valuesTitle}</h3>
            <div className="grid grid-2">
              {t.journey.values.map((value) => (
                <div key={value.title}>
                  <h4 style={{ color: 'var(--teal-bright)', margin: '0 0 6px', fontSize: 15 }}>
                    {value.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: 'rgb(255 255 255 / 70%)' }}>
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Leadership() {
  const { t } = useSite();
  return (
    <section id="leadership" className="section">
      <div className="container">
        <SectionHead
          eyebrow={t.leadership.eyebrow}
          title={t.leadership.title}
          lead={t.leadership.lead}
        />

        <div className="grid grid-2">
          {t.leadership.leaders.map((leader) => (
            <article className="card leader" key={leader.name}>
              {leader.photo ? (
                <img className="leader-photo" src={leader.photo} alt={leader.name} loading="lazy" />
              ) : (
                <div className="leader-photo" aria-hidden="true" />
              )}
              <div>
                <h3 style={{ marginBottom: 2 }}>{leader.name}</h3>
                <p style={{ color: 'var(--teal-link)', fontWeight: 600, margin: '0 0 10px' }}>
                  {leader.title}
                </p>
                <p>{leader.bio}</p>
                {leader.expertise?.length > 0 && (
                  <>
                    <p className="hint">{t.leadership.expertiseHeading}</p>
                    <ul className="tag-list">
                      {leader.expertise.map((area) => (
                        <li key={area}>{area}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>

        {t.leadership.quote && (
          <blockquote className="quote">
            <h3 style={{ marginTop: 0 }}>{t.leadership.quoteTitle}</h3>
            <p>{t.leadership.quote}</p>
          </blockquote>
        )}
      </div>
    </section>
  );
}

export function Footer({ onNavigate }) {
  const { t, company } = useSite();
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-4">
          <div>
            <img
              src={company.logo || './assets/logo-full.webp'}
              alt={t.brandLine}
              style={{ height: 44, marginBottom: 16 }}
            />
            <p>{t.footer.tagline}</p>
          </div>

          <div>
            <h4>{t.footer.quickLinks}</h4>
            <ul>
              {t.nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t.footer.certsHeading}</h4>
            <ul>
              {t.footer.certs.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t.footer.contactHeading}</h4>
            <ul>
              <li>{t.contact.address}</li>
              {company.phone && (
                <li>
                  <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
                </li>
              )}
              {company.mobile && (
                <li>
                  <a href={`tel:${company.mobile.replace(/\s/g, '')}`}>{company.mobile}</a>
                </li>
              )}
              {company.email && (
                <li>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">{t.footer.rights}</div>
      </div>
    </footer>
  );
}
