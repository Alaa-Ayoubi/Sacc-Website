/* What each page tells search engines and link previews: title, description,
 * canonical address, its other-language twin (hreflang), Open Graph, and
 * structured data. Used by the prerender (full <head>) and by the client
 * (title and description on navigation). */
import { SITE_URL, UI, pathFor, projSlug, svcOf } from './site.js';

const clip = (s, n = 160) => {
  const x = String(s || '').replace(/\s+/g, ' ').trim();
  return x.length > n ? `${x.slice(0, n - 1).replace(/\s+\S*$/, '')}…` : x;
};

export function pageMeta(site, route) {
  const T = site[route.lang], U = UI[route.lang], brand = T.brandLine;
  const { page, sub } = route;
  let title = brand, description = T.hero.lead, crumb = null;

  if (route.notFound) {
    return { title: `${U.notFoundTitle} | ${brand}`, description: U.notFoundLead, noindex: true };
  }
  if (page === 'services' && sub) {
    const s = T.services.items.find((x) => svcOf(x).slug === sub);
    title = `${s.title} | ${brand}`; description = s.desc; crumb = [U.nav.services, 'services', s.title];
  } else if (page === 'projects' && sub) {
    const p = T.projects.items.find((x) => projSlug(site, x.id) === sub);
    title = `${p.title} | ${brand}`; description = p.desc; crumb = [U.nav.projects, 'projects', p.title];
  } else if (page) {
    const map = {
      company: [T.intro.title, T.intro.p1],
      services: [T.services.title, T.services.lead],
      projects: [T.projects.title, T.projects.lead],
      fleet: [T.equipment.title, T.equipment.lead],
      approvals: [T.certifications.title, T.certifications.lead],
      contact: [T.contact.title, T.contact.lead],
      careers: [T.careers.title, T.careers.lead],
    };
    const [h, d] = map[page];
    title = `${h} | ${brand}`; description = d;
  } else {
    title = `${brand} | ${T.services.title}`;
  }

  const here = sub ? `${page}/${sub}` : page;
  const url = (lang) => `${SITE_URL}${pathFor(here, lang)}`;
  return {
    title,
    description: clip(description),
    canonical: url(route.lang),
    alternates: { ar: url('ar'), en: url('en'), 'x-default': url('ar') },
    crumb: crumb && { label: crumb[0], href: `${SITE_URL}${pathFor(crumb[1], route.lang)}`, current: crumb[2], url: url(route.lang) },
  };
}

/** Structured data: the company as a GeneralContractor, plus breadcrumbs on sub-pages. */
export function jsonLd(site, route, meta) {
  const T = site[route.lang], C = site.company;
  const org = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${SITE_URL}/#organization`,
    name: site.ar.brandLine,
    alternateName: [site.en.brandLine, 'SACC'],
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/assets/logo.png`,
    image: `${SITE_URL}/assets/og-image.jpg`,
    description: site[route.lang].hero.lead,
    telephone: C.phone,
    email: C.email,
    foundingDate: '2007',
    address: {
      '@type': 'PostalAddress',
      addressLocality: route.lang === 'ar' ? 'المدينة المنورة' : 'Al Madinah Al Munawwarah',
      addressCountry: 'SA',
    },
    areaServed: { '@type': 'Country', name: route.lang === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia' },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '08:00',
      closes: '17:00',
    }],
    hasCertification: T.certifications.iso.map((i) => ({ '@type': 'Certification', name: i.title, description: i.desc })),
    knowsAbout: T.services.items.map((s) => s.title),
  };
  const out = [org];
  if (meta.crumb) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: T.brandLine, item: `${SITE_URL}${pathFor('', route.lang)}` },
        { '@type': 'ListItem', position: 2, name: meta.crumb.label, item: meta.crumb.href },
        { '@type': 'ListItem', position: 3, name: meta.crumb.current, item: meta.crumb.url },
      ],
    });
  }
  return out;
}

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** The full set of head tags for a prerendered page. */
export function headHtml(site, route) {
  const meta = pageMeta(site, route);
  const tags = [
    `<title>${attr(meta.title)}</title>`,
    `<meta name="description" content="${attr(meta.description)}">`,
  ];
  if (meta.noindex) {
    tags.push('<meta name="robots" content="noindex">');
    return tags.join('\n    ');
  }
  tags.push(
    `<link rel="canonical" href="${meta.canonical}">`,
    ...Object.entries(meta.alternates).map(([l, u]) => `<link rel="alternate" hreflang="${l}" href="${u}">`),
    '<meta property="og:type" content="website">',
    `<meta property="og:site_name" content="${attr(site[route.lang].brandLine)}">`,
    `<meta property="og:title" content="${attr(meta.title)}">`,
    `<meta property="og:description" content="${attr(meta.description)}">`,
    `<meta property="og:url" content="${meta.canonical}">`,
    `<meta property="og:image" content="${SITE_URL}/assets/og-image.jpg">`,
    `<meta property="og:locale" content="${route.lang === 'ar' ? 'ar_SA' : 'en_US'}">`,
    `<meta property="og:locale:alternate" content="${route.lang === 'ar' ? 'en_US' : 'ar_SA'}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<script type="application/ld+json">${JSON.stringify(jsonLd(site, route, meta)).replace(/</g, '\\u003c')}</script>`,
  );
  return tags.join('\n    ');
}

