/* One page per section.
 *
 * The site was a single scrolling page; it is now a set of routes, matching how
 * the live site at saccgroup.net is organised. Each inner page opens with a
 * compact navy banner — that band is what the translucent header sits on, and
 * it carries the page title.
 *
 * The section components are unchanged and reused as-is: a page is a banner
 * plus the section that was already built.
 */
import { Link } from 'react-router-dom';

import PageHero from '../components/PageHero.jsx';
import Contact from '../components/Contact.jsx';
import { ChairmanQuote, Reveal, Ticker } from '../components/Motion.jsx';
import {
  About as AboutSection,
  Certifications as CertificationsSection,
  Equipment as EquipmentSection,
  Hero,
  Journey as JourneySection,
  Leadership as LeadershipSection,
  Projects as ProjectsSection,
  Services as ServicesSection,
  Stats,
  Why,
} from '../components/Sections.jsx';
import { useSite } from '../SiteContext.jsx';

/* A closing invitation, so every inner page ends with a way to get in touch
   rather than simply stopping. */
function ContactCta() {
  const { t } = useSite();
  return (
    <section className="cta-band">
      <div className="container">
        <Reveal>
          <h2>{t.contact.title}</h2>
          <p>{t.contact.lead}</p>
          <Link viewTransition className="btn btn-primary" to="/contact">
            {t.navCta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Ticker />
      <AboutSection />
      <Why />
      <ChairmanQuote />
      <ContactCta />
    </>
  );
}

export function AboutPage() {
  const { t } = useSite();
  return (
    <>
      <PageHero eyebrow={t.intro.eyebrow} title={t.intro.title} />
      <AboutSection headless />
      <Why />
      <ChairmanQuote />
      <ContactCta />
    </>
  );
}

export function ServicesPage() {
  const { t } = useSite();
  return (
    <>
      <PageHero eyebrow={t.services.eyebrow} title={t.services.title} lead={t.services.lead} />
      <ServicesSection headless />
      <ContactCta />
    </>
  );
}

export function ProjectsPage() {
  const { t } = useSite();
  return (
    <>
      <PageHero eyebrow={t.projects.eyebrow} title={t.projects.title} lead={t.projects.lead} />
      <ProjectsSection headless />
      <ContactCta />
    </>
  );
}

export function EquipmentPage() {
  const { t, images } = useSite();
  return (
    <>
      <PageHero
        eyebrow={t.equipment.eyebrow}
        title={t.equipment.title}
        lead={t.equipment.lead}
        image={images.equipment}
      />
      <EquipmentSection headless />
      <ContactCta />
    </>
  );
}

export function CertificationsPage() {
  const { t } = useSite();
  return (
    <>
      <PageHero
        eyebrow={t.certifications.eyebrow}
        title={t.certifications.title}
        lead={t.certifications.lead}
      />
      <CertificationsSection headless />
      <ContactCta />
    </>
  );
}

export function JourneyPage() {
  const { t } = useSite();
  return (
    <>
      <PageHero eyebrow={t.journey.eyebrow} title={t.journey.title} lead={t.journey.lead} />
      <JourneySection headless />
      <ContactCta />
    </>
  );
}

export function LeadershipPage() {
  const { t, images } = useSite();
  return (
    <>
      <PageHero
        eyebrow={t.leadership.eyebrow}
        title={t.leadership.title}
        lead={t.leadership.lead}
        image={images.chairman}
      />
      <LeadershipSection headless />
      <ContactCta />
    </>
  );
}

export function ContactPage() {
  const { t } = useSite();
  return (
    <>
      <PageHero eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead} />
      <Contact headless />
    </>
  );
}

export function NotFoundPage() {
  const { t } = useSite();
  return (
    <>
      <PageHero title="404" lead={t.projects.empty} />
      <section className="section">
        <div className="container">
          <Link viewTransition className="btn btn-outline" to="/">
            {t.backHome}
          </Link>
        </div>
      </section>
    </>
  );
}
