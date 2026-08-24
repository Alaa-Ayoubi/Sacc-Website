/* The one-page site, plus a careers view.
 *
 * Two views rather than a router: the site is a single page with in-page
 * anchors, and careers is the one place that leaves it. Adding a router for
 * that would be more machinery than the structure earns.
 */
import { useCallback, useEffect, useState } from 'react';

import Header, { TopBar } from './components/Header.jsx';
import Contact from './components/Contact.jsx';
import Careers from './components/Careers.jsx';
import {
  About,
  Certifications,
  Equipment,
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

const HEADER_OFFSET = 84;

export default function App() {
  const { t } = useSite();
  const [view, setView] = useState('home');
  const [prefill, setPrefill] = useState('');

  const scrollTo = useCallback((id, behavior = 'smooth') => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(top, 0), behavior });
  }, []);

  const navigate = useCallback(
    (id) => {
      if (id === 'careers') {
        setView('careers');
        return;
      }
      if (view !== 'home') {
        setView('home');
        // Wait for the home view to mount before looking for the anchor.
        requestAnimationFrame(() => requestAnimationFrame(() => scrollTo(id)));
        return;
      }
      scrollTo(id);
    },
    [view, scrollTo],
  );

  /* React renders after the document loads, so the browser's own anchor jump
     finds nothing. Honour the incoming hash once the sections exist, which is
     what makes a shared link like /#contact land in the right place. */
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return undefined;
    if (id === 'careers') {
      setView('careers');
      return undefined;
    }

    // Instant, not smooth: someone who followed a deep link asked for that
    // section, not for a tour of everything above it.
    //
    // Scrolling once is not enough — images above the target are still
    // loading, and every one that arrives pushes the target further down,
    // leaving the visitor short of it. Re-align as the layout settles.
    let frame = 0;
    const align = () => scrollTo(id, 'auto');
    align();

    const settle = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(align);
    };
    window.addEventListener('load', settle);
    const timers = [80, 400, 1200].map((delay) => setTimeout(settle, delay));

    return () => {
      window.removeEventListener('load', settle);
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
  }, [scrollTo]);

  /* An "enquire about X" button anywhere on the page fills in the contact
     form and jumps to it, so the visitor never retypes what they clicked. */
  const inquire = useCallback(
    (subject) => {
      if (view !== 'home') setView('home');
      setPrefill(subject);
      requestAnimationFrame(() => requestAnimationFrame(() => scrollTo('contact')));
    },
    [view, scrollTo],
  );

  return (
    <>
      <a className="skip" href="#main">{t.nav[0]?.label}</a>
      <TopBar />
      <Header onNavigate={navigate} view={view} />

      <main id="main">
        {view === 'careers' ? (
          <Careers onBack={() => setView('home')} />
        ) : (
          <>
            <Hero onNavigate={navigate} />
            <Stats />
            <About />
            <Why />
            <Services onInquire={inquire} />
            <Projects onInquire={inquire} />
            <Equipment onInquire={inquire} />
            <Certifications onInquire={inquire} />
            <Journey />
            <Leadership />
            <Contact prefill={prefill} onPrefillUsed={() => setPrefill('')} />
          </>
        )}
      </main>

      <Footer onNavigate={navigate} />
    </>
  );
}
