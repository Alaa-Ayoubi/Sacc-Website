/* Layout and page switch. Every page has its own address — Arabic at the root,
 * English under /en — and its own prerendered HTML file, so search engines
 * and shared links land on the real page. */
import { useEffect } from 'react';

import { useSite } from './SiteContext.jsx';
import { OLD_PAGES, pathFor } from './lib/site.js';
import { Bar, Footer } from './components/Chrome.jsx';
import { useReveal } from './components/ui.jsx';
import Home from './pages/Home.jsx';
import { Approvals, Company, Fleet, NotFound, Project, Projects, Service, Services } from './pages/Inner.jsx';
import { Careers, Contact } from './pages/Forms.jsx';

const PAGE = { '': Home, company: Company, services: Services, projects: Projects, fleet: Fleet, approvals: Approvals, contact: Contact, careers: Careers };

/** Links from the previous site (#about, #equipment, ?lang=en …) go to their new addresses. */
function useOldLinks(navigate) {
  useEffect(() => {
    const { pathname, hash, search } = window.location;
    const id = hash.slice(1);
    const lang = new URLSearchParams(search).get('lang') === 'en' || pathname.startsWith('/en') ? 'en' : 'ar';
    const atHome = pathname === '/' || pathname === '/en' || pathname === '/en/';
    if (atHome && id in OLD_PAGES) {
      const tab = { journey: '#journey', leadership: '#people' }[id] || '';
      navigate(pathFor(OLD_PAGES[id], lang) + tab, { replace: true });
    } else if (search.includes('lang=en') && !pathname.startsWith('/en')) {
      navigate(pathFor(pathname.replace(/^\/+|\/+$/g, ''), 'en'), { replace: true });
    }
  }, [navigate]);
}

export default function App() {
  const { route, ui, navigate } = useSite();
  useOldLinks(navigate);
  const key = `${route.lang}/${route.page}/${route.sub}/${route.notFound}`;
  useReveal(key);

  let Page = PAGE[route.page] || Home;
  if (route.notFound) Page = NotFound;
  else if (route.page === 'services' && route.sub) Page = Service;
  else if (route.page === 'projects' && route.sub) Page = Project;

  return (
    <>
      <a className="skip" href="#main">{ui.skip}</a>
      <Bar />
      <main id="main" tabIndex={-1}><Page key={key} /></main>
      <Footer />
    </>
  );
}
