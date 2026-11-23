/* Facts about the site's structure that are not content: routes, slugs, the
 * mapping between disciplines and project categories, and the small interface
 * strings that the content bundle does not carry. Content itself (every
 * company fact, in both languages) comes from the bundle — the Django admin
 * through `export_site_data --frontend` — never from here. */

export const SITE_URL = 'https://saccgroup.net';
export const LANGS = ['ar', 'en'];
// The owner removed the fleet page; its old addresses redirect to the equipment-rental discipline.
export const PAGES = ['', 'company', 'services', 'projects', 'approvals', 'contact', 'careers'];
export const NAV = ['company', 'services', 'projects', 'approvals'];

// Each discipline, keyed by the icon name the bundle gives it: its URL slug
// and the project categories it delivers.
export const SVC = {
  Droplets: { slug: 'water-sewerage', cat: ['water'] },
  CloudRain: { slug: 'stormwater', cat: [] },
  Zap: { slug: 'electrical-solar', cat: ['electrical'] },
  Route: { slug: 'roads-asphalt', cat: ['roads'] },
  Construction: { slug: 'bridges-tunnels', cat: [] },
  Building2: { slug: 'landscaping', cat: ['urban'] },
  ShieldCheck: { slug: 'quality-laboratory', cat: [] },
  Truck: { slug: 'equipment-rental', cat: [] },
  Settings: { slug: 'operation-maintenance', cat: [] },
};
export const SVC_SLUGS = Object.values(SVC).map((s) => s.slug);
export const CAT_SVC = { water: 'Droplets', roads: 'Route', electrical: 'Zap', urban: 'Building2' };

export const svcOf = (s) => SVC[s.icon] || SVC.Settings;
const slugify = (x) => String(x).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
/** Project slugs come from the English title, so both languages share one URL. */
export const projSlug = (site, id) => slugify(site.en.projects.items.find((p) => p.id === id)?.title || id);
export const projSlugs = (site) => site.en.projects.items.map((p) => projSlug(site, p.id));
/* The approving bodies, in the order the content lists them, each with its
 * official logo (public/assets/logos/<key>.webp, provenance in its README). Logos come in
 * every proportion, so one height would make a wide wordmark look tiny beside a
 * square emblem: each is sized to the same visual area (5800 px²) within a
 * 170 × 64 px box. Width and height here are that size. */
export const BODIES = [
  ['nwc', 86, 64], ['sca', 117, 49], ['sec', 76, 64], ['aramco', 167, 35],
  ['maaden', 127, 46], ['rcjy', 141, 41], ['momah', 93, 63],
];
export const isDone = (p) => /complete|مكتمل|منجز/i.test(p.status);
/** Local repository photos are served from /assets; the bundle writes them as ./assets/... */
export const src = (u) => (!u ? '' : u.startsWith('./') ? u.slice(1) : u);

export const UI = {
  ar: {
    skip: 'تخطَّ إلى المحتوى', menu: 'القائمة', close: 'إغلاق', formH: 'للتواصل',
    short: 'سنا الأوائل للمقاولات', address: 'العنوان', careers: 'الوظائف',
    langName: 'English',
    nav: { company: 'حول', services: 'الخدمات', projects: 'المشاريع', approvals: 'الاعتمادات' },
    all: 'الكل',
    officeH: 'مكتبنا في المدينة المنورة',
    phone: 'الهاتف', mobile: 'الجوال', email: 'البريد', cr: 'السجل التجاري',
    emailRequired: 'البريد الإلكتروني مطلوب',
    scope: 'نطاق العمل', delivered: 'مشاريع منفّذة في هذا التخصص',
    noProj: 'لا توجد مشاريع منشورة في هذا التخصص بعد.', prev: 'التخصص السابق', next: 'التخصص التالي',
    category: 'التصنيف', discipline: 'التخصص', more: 'مشاريع أخرى في التصنيف نفسه',
    tabs: { about: 'نبذة', journey: 'المسيرة', values: 'القيم', people: 'القيادة' },
    figuresLabel: 'الشركة بالأرقام',
    notFoundTitle: 'الصفحة غير موجودة', notFoundLead: 'ربما نُقلت الصفحة أو تغيّر عنوانها.', home: 'الصفحة الرئيسية',
    honeypot: 'اترك هذا الحقل فارغاً',
  },
  en: {
    skip: 'Skip to content', menu: 'Menu', close: 'Close', formH: 'Write to us',
    short: 'Sana Al-Awael Contracting', address: 'Address', careers: 'Careers',
    langName: 'العربية',
    nav: { company: 'About', services: 'Services', projects: 'Projects', approvals: 'Approvals' },
    all: 'All',
    officeH: 'Our office in Al Madinah',
    phone: 'Phone', mobile: 'Mobile', email: 'Email', cr: 'Commercial Registration',
    emailRequired: 'Email is required',
    scope: 'Scope of work', delivered: 'Projects delivered in this discipline',
    noProj: 'No published projects in this discipline yet.', prev: 'Previous discipline', next: 'Next discipline',
    category: 'Category', discipline: 'Discipline', more: 'More projects in this category',
    tabs: { about: 'Overview', journey: 'Journey', values: 'Values', people: 'Leadership' },
    figuresLabel: 'The company in figures',
    notFoundTitle: 'Page not found', notFoundLead: 'The page may have moved or its address changed.', home: 'Home page',
    honeypot: 'Leave this field empty',
  },
};

// ---------- routes ----------

/** Path for a page in a language: Arabic at the root, English under /en. */
export function pathFor(page = '', lang = 'ar') {
  const p = page ? `/${page}` : '';
  if (lang === 'en') return `/en${p}` || '/en';
  return p || '/';
}

/** Parse a pathname into a route. `notFound` is set for anything unknown. */
export function parsePath(pathname, site) {
  const parts = decodeURIComponent(pathname).replace(/\/index\.html$/, '').split('/').filter(Boolean);
  let lang = 'ar';
  if (parts[0] === 'en') { lang = 'en'; parts.shift(); }
  const [page = '', sub = '', ...rest] = parts;
  const route = { lang, page, sub, notFound: false };
  if (!PAGES.includes(page) || rest.length) return { ...route, page: '', sub: '', notFound: true };
  if (sub) {
    const ok = (page === 'services' && SVC_SLUGS.includes(sub)) || (page === 'projects' && projSlugs(site).includes(sub));
    if (!ok) return { ...route, notFound: true };
  }
  return route;
}

/** Every page the site has, for prerendering and the sitemap. */
export function allRoutes(site) {
  const pages = [...PAGES, ...SVC_SLUGS.map((s) => `services/${s}`), ...projSlugs(site).map((s) => `projects/${s}`)];
  return LANGS.flatMap((lang) => pages.map((page) => ({ lang, page })));
}

/** Old addresses (the previous single-page site used #hash pages and ?lang=). */
export const OLD_PAGES = {
  home: '', about: 'company', services: 'services', projects: 'projects', equipment: 'services/equipment-rental', fleet: 'services/equipment-rental',
  certifications: 'approvals', journey: 'company', leadership: 'company', contact: 'contact', careers: 'careers',
};
