/* Facts about the site's structure that are not content: routes, slugs, the
 * mapping between disciplines and project categories, and the small interface
 * strings that the content bundle does not carry. Content itself (every
 * company fact, in both languages) comes from the bundle — the Django admin
 * through `export_site_data --frontend` — never from here. */

export const SITE_URL = 'https://saccgroup.net';
export const LANGS = ['ar', 'en'];
export const PAGES = ['', 'company', 'services', 'projects', 'fleet', 'approvals', 'contact', 'careers'];
export const NAV = ['company', 'services', 'projects', 'fleet', 'approvals'];

// Each discipline, keyed by the icon name the bundle gives it: its URL slug,
// the project categories it delivers, the quote form's project type, and its
// tile on the home page (a company photograph or a line drawing).
export const SVC = {
  Droplets: { slug: 'water-sewerage', cat: ['water'], type: 'water-sewerage', photo: '/assets/photos/water-network.jpg' },
  CloudRain: { slug: 'stormwater', cat: [], type: 'water-sewerage', draw: 'culvert' },
  Zap: { slug: 'electrical-solar', cat: ['electrical'], type: 'other', photo: '/assets/photos/public-realm.jpg' },
  Route: { slug: 'roads-asphalt', cat: ['roads'], type: 'roads-asphalt', draw: 'road' },
  Construction: { slug: 'bridges-tunnels', cat: [], type: 'bridges-tunnels', draw: 'bridge' },
  Building2: { slug: 'landscaping', cat: ['urban'], type: 'urban-development', photoKey: 'urban' },
  ShieldCheck: { slug: 'quality-laboratory', cat: [], type: 'other', draw: 'lab' },
  Truck: { slug: 'equipment-rental', cat: [], type: 'equipment-rental', photo: '/assets/photos/equipment-fleet.jpg' },
  Settings: { slug: 'operation-maintenance', cat: [], type: 'other', draw: 'cycle' },
};
export const SVC_SLUGS = Object.values(SVC).map((s) => s.slug);
export const CAT_SVC = { water: 'Droplets', roads: 'Route', electrical: 'Zap', urban: 'Building2' };
export const CAT_TYPE = { water: 'water-sewerage', roads: 'roads-asphalt', urban: 'urban-development', electrical: 'other' };
// Home-page bento: column span and tone for each of the nine tiles, in order.
export const TILES = [[7, 'lav'], [5, 'teal'], [5, 'teal'], [7, 'lav'], [4, 'lav'], [4, 'teal'], [4, 'lav'], [6, 'teal'], [6, 'lav']];

export const svcOf = (s) => SVC[s.icon] || SVC.Settings;
const slugify = (x) => String(x).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
/** Project slugs come from the English title, so both languages share one URL. */
export const projSlug = (site, id) => slugify(site.en.projects.items.find((p) => p.id === id)?.title || id);
export const projSlugs = (site) => site.en.projects.items.map((p) => projSlug(site, p.id));
export const isDone = (p) => /complete|مكتمل|منجز/i.test(p.status);
/** Local repository photos are served from /assets; the bundle writes them as ./assets/... */
export const src = (u) => (!u ? '' : u.startsWith('./') ? u.slice(1) : u);

export const UI = {
  ar: {
    skip: 'تخطَّ إلى المحتوى', menu: 'القائمة', close: 'إغلاق', quote: 'اطلب عرض سعر',
    langName: 'English',
    nav: { company: 'الشركة', services: 'الخدمات', projects: 'المشاريع', fleet: 'الأسطول', approvals: 'الاعتمادات' },
    all: 'الكل',
    apprMore: 'الاعتمادات بالتفصيل', fleetMore: 'الأسطول بالتفصيل', projMore: 'كل المشاريع',
    officeH: 'مكتبنا في المدينة المنورة', call: 'اتصل بنا',
    phone: 'الهاتف', mobile: 'الجوال', email: 'البريد', cr: 'السجل التجاري',
    emailRequired: 'البريد الإلكتروني مطلوب',
    allDisc: 'كل التخصصات', scope: 'نطاق العمل', delivered: 'مشاريع منفّذة في هذا التخصص',
    noProj: 'لا توجد مشاريع منشورة في هذا التخصص بعد.', prev: 'التخصص السابق', next: 'التخصص التالي',
    category: 'التصنيف', discipline: 'التخصص', more: 'مشاريع أخرى في التصنيف نفسه',
    tabs: { about: 'نبذة', journey: 'المسيرة', values: 'القيم', people: 'القيادة' },
    apply: 'تقدّم', photoOf: 'صورة من موقع العمل', figuresLabel: 'الشركة بالأرقام',
    notFoundTitle: 'الصفحة غير موجودة', notFoundLead: 'ربما نُقلت الصفحة أو تغيّر عنوانها.', home: 'الصفحة الرئيسية',
    honeypot: 'اترك هذا الحقل فارغاً',
  },
  en: {
    skip: 'Skip to content', menu: 'Menu', close: 'Close', quote: 'Request a Quote',
    langName: 'العربية',
    nav: { company: 'Company', services: 'Services', projects: 'Projects', fleet: 'Fleet', approvals: 'Approvals' },
    all: 'All',
    apprMore: 'Approvals in full', fleetMore: 'The fleet in full', projMore: 'All projects',
    officeH: 'Our office in Al Madinah', call: 'Call us',
    phone: 'Phone', mobile: 'Mobile', email: 'Email', cr: 'Commercial Registration',
    emailRequired: 'Email is required',
    allDisc: 'All disciplines', scope: 'Scope of work', delivered: 'Projects delivered in this discipline',
    noProj: 'No published projects in this discipline yet.', prev: 'Previous discipline', next: 'Next discipline',
    category: 'Category', discipline: 'Discipline', more: 'More projects in this category',
    tabs: { about: 'Overview', journey: 'Journey', values: 'Values', people: 'Leadership' },
    apply: 'Apply', photoOf: 'Site photograph', figuresLabel: 'The company in figures',
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
  home: '', about: 'company', services: 'services', projects: 'projects', equipment: 'fleet',
  certifications: 'approvals', journey: 'company', leadership: 'company', contact: 'contact', careers: 'careers',
};
