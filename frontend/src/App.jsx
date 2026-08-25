/* Multi-page site, plus a careers view.
 *
 * Each nav item is its own page — a real view switch, not a scroll to an
 * anchor on one long document. The hash mirrors the current page so a link
 * can be shared and reopened on the right page.
 */
import { useCallback, useEffect, useState } from 'react';

import Header, { TopBar } from './components/Header.jsx';
import Contact from './components/Contact.jsx';
import Careers from './components/Careers.jsx';
import {
  About,
  Certifications,
  Equipment,
  Explore,
  Footer,
  Hero,
  Journey,
  Leadership,
  Projects,
  Services,
  Stats,
  Why,
} from './components/Sections.jsx';
import { useSite } from './SiteContext.jsx';

const PAGES = [
  'home', 'about', 'services', 'projects', 'equipment',
  'certifications', 'journey', 'leadership', 'contact', 'careers',
];

function pageFromHash() {
  const id = window.location.hash.slice(1);
  return PAGES.includes(id) ? id : 'home';
}

export default function App() {
  const { t } = useSite();
  const [view, setView] = useState(pageFromHash);
  const [prefill, setPrefill] = useState('');

  const navigate = useCallback((id) => {
    setView(PAGES.includes(id) ? id : 'home');
  }, []);

  // A page switch is a fresh screen, not a continuation of scroll position.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const hash = view === 'home' ? '#' : `#${view}`;
    if (window.location.hash !== hash) window.history.replaceState(null, '', hash);
  }, [view]);

  useEffect(() => {
    const onHashChange = () => setView(pageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  /* An "enquire about X" button on any page fills in the contact form and
     switches to it, so the visitor never retypes what they clicked. */
  const inquire = useCallback((subject) => {
    setPrefill(subject);
    setView('contact');
  }, []);

  return (
    <>
      <a className="skip" href="#main">{t.nav[0]?.label}</a>
      <TopBar />
      <Header onNavigate={navigate} view={view} />

      <main id="main">
        {view === 'careers' && <Careers onBack={() => navigate('home')} />}
        {view === 'home' && (
          <>
            <Hero onNavigate={navigate} />
            <Stats />
            <Explore onNavigate={navigate} />
          </>
        )}
        {view === 'about' && (
          <>
            <About />
            <Why />
          </>
        )}
        {view === 'services' && <Services onInquire={inquire} />}
        {view === 'projects' && <Projects onInquire={inquire} />}
        {view === 'equipment' && <Equipment onInquire={inquire} />}
        {view === 'certifications' && <Certifications onInquire={inquire} />}
        {view === 'journey' && <Journey />}
        {view === 'leadership' && <Leadership />}
        {view === 'contact' && (
          <Contact prefill={prefill} onPrefillUsed={() => setPrefill('')} />
        )}
      </main>

      <Footer onNavigate={navigate} />
    </>
  );
}
