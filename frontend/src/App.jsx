/* Routes.
 *
 * The site was one scrolling page; it is now a page per section, matching how
 * saccgroup.net is organised. Anchors from the old structure still work —
 * /#services and similar redirect to the matching route, so any link already
 * shared keeps landing in the right place.
 */
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Header, { TopBar } from './components/Header.jsx';
import PageTransition from './components/PageTransition.jsx';
import Careers from './components/Careers.jsx';
import { Footer } from './components/Sections.jsx';
import {
  AboutPage,
  CertificationsPage,
  ContactPage,
  EquipmentPage,
  HomePage,
  JourneyPage,
  LeadershipPage,
  NotFoundPage,
  ProjectsPage,
  ServicesPage,
} from './pages/Pages.jsx';
import { useSite } from './SiteContext.jsx';

/* A route change should start at the top of the new page, not wherever the
   previous one was scrolled to. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Instant, not smooth: the cross-fade already carries the change, and
    // scrolling the outgoing page as it fades reads as two things at once.
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

/* The single-page build used #anchors. Carry those over so shared links and
   search results do not break. */
function LegacyHashRedirect() {
  const location = useLocation();
  const hash = location.hash.slice(1);
  const known = [
    'about', 'services', 'projects', 'equipment',
    'certifications', 'journey', 'leadership', 'contact', 'careers',
  ];
  if (location.pathname === '/' && known.includes(hash)) {
    return <Navigate to={`/${hash}`} replace />;
  }
  return null;
}

export default function App() {
  const { t } = useSite();

  return (
    <>
      <a className="skip" href="#main">{t.nav[0]?.label}</a>
      <ScrollToTop />
      <LegacyHashRedirect />
      <TopBar />
      <Header />

      <main id="main">
        <PageTransition>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/leadership" element={<LeadershipPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </PageTransition>
      </main>

      <Footer />
    </>
  );
}
