/* SACC proposal 4 — modern institutional. Interactive, bilingual, every page.
 *
 * Copy is the real site snapshot (window.SACC.content); only the small set
 * of interface strings in UI is new, in both languages. Routes mirror the
 * URLs the integrated site will serve: #/services in Arabic, #/en/services
 * in English. Every fact has one home; the only quote action is in the
 * masthead and pre-fills the single contact form from the page it is
 * pressed on.
 */
(() => {
  'use strict';

  const { content, icons, logo } = window.SACC;
  const PAGES = ['', 'about', 'services', 'projects', 'equipment', 'certifications', 'journey', 'leadership', 'contact', 'careers'];
  const C0 = content.company;
  const IMG = content.images;
  const isRemote = (u) => /^https?:/i.test(u || '');

  const UI = {
    ar: {
      skip: 'تخطَّ إلى المحتوى', home: 'الرئيسية', quote: 'اطلب عرض سعر', menu: 'القائمة', close: 'إغلاق',
      langName: 'English', langLabel: 'Switch to English', cr: 'السجل التجاري',
      proto: 'نموذج تصميم تفاعلي للمراجعة. النماذج لا ترسل أي بيانات.',
      protoSent: 'هذا نموذج للمراجعة: لم يُرسل شيء. بعد الدمج تُحفظ الرسالة ويُبلَّغ الفريق.',
      allDisciplines: 'كل التخصصات', allProjects: 'كل المشاريع', certsLink: 'الشهادات والاعتمادات بالتفصيل',
      details: 'التفاصيل', scopeTab: 'نطاق العمل', projectsTab: 'المشاريع المنفّذة',
      noProjects: 'لا توجد مشاريع منشورة في هذا التخصص بعد.',
      prev: 'التخصص السابق', next: 'التخصص التالي', category: 'التصنيف', discipline: 'التخصص',
      moreProjects: 'مشاريع أخرى في التصنيف نفسه', milestones: 'محطات المسيرة',
      office: 'المكتب', mobile: 'الجوال', isoHead: 'شهادات الأيزو', bodiesHead: 'جهات معتمِدة',
      apply: 'تقدّم لهذه الوظيفة', role: 'الوظيفة', dept: 'القسم', loc: 'الموقع', type: 'الدوام', exp: 'الخبرة',
      emailRequired: 'البريد الإلكتروني مطلوب', meetLeaders: 'تعرّف على القيادة', ourJourney: 'مسيرتنا منذ 2007',
      featured: 'مشاريع مختارة', photoMissing: 'صورة المشروع',
      homeDisc: 'ما ننفّذه', homeAppr: 'معتمدون وحاصلون على الأيزو',
      published: { one: 'مشروع منشور واحد', two: 'مشروعان منشوران', few: 'مشاريع منشورة', none: 'لا مشاريع منشورة بعد' },
    },
    en: {
      skip: 'Skip to content', home: 'Home', quote: 'Request a Quote', menu: 'Menu', close: 'Close',
      langName: 'العربية', langLabel: 'التبديل إلى العربية', cr: 'Commercial Registration',
      proto: 'Interactive design prototype for review. Forms send nothing.',
      protoSent: 'This is a review prototype: nothing was sent. Once integrated, the message is stored and the team is notified.',
      allDisciplines: 'All disciplines', allProjects: 'All projects', certsLink: 'Certifications and approvals in full',
      details: 'Details', scopeTab: 'Scope of work', projectsTab: 'Delivered projects',
      noProjects: 'No published projects in this discipline yet.',
      prev: 'Previous discipline', next: 'Next discipline', category: 'Category', discipline: 'Discipline',
      moreProjects: 'More projects in this category', milestones: 'Milestones',
      office: 'Office', mobile: 'Mobile', isoHead: 'ISO certifications', bodiesHead: 'Approving bodies',
      apply: 'Apply for this role', role: 'Role', dept: 'Department', loc: 'Location', type: 'Type', exp: 'Experience',
      emailRequired: 'Email is required', meetLeaders: 'Meet the leadership', ourJourney: 'Our journey since 2007',
      featured: 'Selected projects', photoMissing: 'Project photograph',
      homeDisc: 'What we deliver', homeAppr: 'Approved and ISO certified',
      published: { one: '1 published project', two: '2 published projects', few: 'published projects', none: 'No published projects yet' },
    },
  };

  // Service (by content icon) -> drawing, URL slug, related project category, contact type.
  const SVC = {
    Droplets: { d: 'water', slug: 'water-sewerage', cat: ['water'], type: 'water-sewerage' },
    CloudRain: { d: 'storm', slug: 'stormwater', cat: [], type: 'water-sewerage' },
    Zap: { d: 'power', slug: 'electrical-solar', cat: ['electrical'], type: 'other' },
    Route: { d: 'road', slug: 'roads-asphalt', cat: ['roads'], type: 'roads-asphalt' },
    Construction: { d: 'bridge', slug: 'bridges-tunnels', cat: [], type: 'bridges-tunnels' },
    Building2: { d: 'landscape', slug: 'landscaping', cat: ['urban'], type: 'urban-development' },
    ShieldCheck: { d: 'qc', slug: 'quality-laboratory', cat: [], type: 'other' },
    Truck: { d: 'fleet', slug: 'equipment-rental', cat: [], type: 'equipment-rental' },
    Settings: { d: 'om', slug: 'operation-maintenance', cat: [], type: 'other' },
  };
  const CAT_SVC = { water: 'Droplets', roads: 'Route', electrical: 'Zap', urban: 'Building2' };
  const CAT_TYPE = { water: 'water-sewerage', roads: 'roads-asphalt', urban: 'urban-development', electrical: 'other' };

  const state = { lang: 'ar', page: '', sub: '', filter: 'all', prefill: null, role: '', tabs: {} };

  // ---------- helpers ----------
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (n, cls = '') => `<span class="icon ${cls}" aria-hidden="true">${icons[n] || ''}</span>`;
  const t = () => content[state.lang];
  const ui = () => UI[state.lang];
  const rtl = () => state.lang === 'ar';
  const arrow = () => icon(rtl() ? 'arrow-left' : 'arrow-right');
  const href = (p, lang = state.lang) => `#/${lang === 'en' ? 'en/' : ''}${p}`;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const svcOf = (s) => SVC[s.icon] || SVC.Settings;
  const slugify = (x) => String(x).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const projSlug = (id) => slugify(content.en.projects.items.find((p) => p.id === id)?.title || id);
  const svcIndexBySlug = (slug) => t().services.items.findIndex((s) => svcOf(s).slug === slug);
  const projBySlug = (slug) => t().projects.items.find((p) => projSlug(p.id) === slug);
  const projImage = (p) => { const u = IMG.projects?.[p.id - 1]; return isRemote(u) ? u : ''; };
  const remoteProjects = () => t().projects.items.filter((p) => projImage(p));
  const featuredProjects = () => remoteProjects().slice(0, 3);
  const heroImage = () => { const spare = remoteProjects().find((p) => !featuredProjects().includes(p)); return spare ? projImage(spare) : ''; };
  const isDone = (p) => /complete|مكتمل|منجز/i.test(p.status);
  const relProjects = (s) => t().projects.items.filter((p) => svcOf(s).cat.includes(p.key));
  const published = (n) => {
    const P = ui().published;
    if (n === 0) return P.none;
    if (n === 1) return P.one;
    if (n === 2) return P.two;
    return `<span class="num">${n}</span> ${P.few}`;
  };

  // ---------- drawings: one system, 2px technical line work ----------
  const L = (x1, y1, x2, y2) => `<line class="ln" pathLength="1" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
  const P = (d) => `<path class="ln" pathLength="1" d="${d}"/>`;
  const Ci = (cx, cy, r) => `<circle class="ln" pathLength="1" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const Re = (x, y, w, h, rx = 0) => `<rect class="ln" pathLength="1" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/>`;
  const hatch = (y, x0 = 16, x1 = 228, step = 14) => { let d = ''; for (let x = x0; x <= x1; x += step) d += `M${x} ${y} l-6 8 `; return P(d); };
  const wave = (y, x0 = 10, x1 = 230) => { let d = `M${x0} ${y}`; for (let x = x0; x < x1; x += 20) d += ` q5 -5 10 0 t10 0`; return P(d); };
  const DRAW = {
    water: () => `${L(10, 40, 230, 40)}${hatch(40)}${Ci(95, 95, 27)}${Ci(95, 95, 19)}${Ci(172, 104, 15)}${Ci(172, 104, 10)}${L(95, 68, 95, 22)}${Ci(95, 15, 7)}${L(84, 22, 106, 22)}${P('M60 128 H210')}`,
    storm: () => `${L(24, 6, 18, 18)}${L(48, 4, 42, 16)}${L(72, 8, 66, 20)}${L(96, 4, 90, 16)}${P('M10 46 H150 V38 H230')}${Re(128, 46, 18, 7)}${L(137, 53, 137, 80)}${Re(70, 80, 140, 52)}${Re(80, 88, 120, 36)}${wave(116, 84, 196)}`,
    power: () => `${L(10, 132, 230, 132)}${P('M60 132 L78 30 L96 132 M66 100 H90 M70 76 H86 M74 52 H82 M60 132 L90 100 M96 132 L66 100 M66 100 L86 76 M90 100 L70 76')}${L(48, 40, 108, 40)}${L(78, 30, 78, 22)}${P('M48 44 Q140 72 230 48')}${P('M108 44 Q166 66 230 58')}${P('M190 132 V72 Q190 62 200 62 H212')}${Re(210, 60, 14, 5)}`,
    road: () => `${P('M10 50 Q120 40 230 50')}${P('M10 62 Q120 52 230 62')}${L(10, 80, 230, 80)}${L(10, 102, 230, 102)}${L(10, 128, 230, 128)}${L(10, 50, 10, 128)}${L(230, 50, 230, 128)}${L(70, 44.5, 90, 43.6)}${L(150, 43.6, 170, 44.5)}${[30, 52, 74, 96, 118, 140, 162, 184, 206].map((x, i) => Ci(x, 90 + (i % 2) * 4, 2)).join('')}${hatch(128, 20, 222, 18)}`,
    bridge: () => `${L(10, 30, 230, 30)}${P('M20 30 V40 M40 30 V40 M60 30 V40 M80 30 V40 M100 30 V40 M120 30 V40 M140 30 V40 M160 30 V40 M180 30 V40 M200 30 V40 M220 30 V40')}${Re(10, 40, 220, 10)}${L(10, 58, 230, 58)}${Re(62, 58, 32, 6)}${Re(146, 58, 32, 6)}${Re(70, 64, 16, 64)}${Re(154, 64, 16, 64)}${wave(124)}`,
    landscape: () => `${L(10, 96, 230, 96)}${L(70, 96, 70, 60)}${Ci(70, 42, 22)}${Ci(52, 56, 13)}${Ci(88, 56, 13)}${Re(50, 96, 40, 16)}${P('M120 104 H230 M134 96 V104 M154 96 V104 M174 96 V104 M194 96 V104 M214 96 V104')}${P('M160 84 H204 M164 84 V96 M200 84 V96')}${L(20, 122, 220, 122)}${[40, 80, 120, 160, 200].map((x) => Ci(x, 122, 2.5)).join('')}`,
    qc: () => `${P('M40 30 a20 6 0 1 0 40 0 a20 6 0 1 0 -40 0')}${L(40, 30, 40, 120)}${L(80, 30, 80, 120)}${P('M40 120 a20 6 0 0 0 40 0')}${P('M40 62 a20 6 0 0 0 40 0')}${P('M40 92 a20 6 0 0 0 40 0')}${P('M134 28 H158 M138 28 V60 L118 118 H174 L154 60 V28')}${L(126, 98, 166, 98)}${Ci(205, 72, 20)}${L(205, 72, 215, 58)}${P('M189 72 H193 M205 56 V60 M217 72 H221')}`,
    fleet: () => `${L(10, 130, 230, 130)}${Re(36, 104, 112, 24, 12)}${Ci(50, 116, 7)}${Ci(134, 116, 7)}${Ci(92, 116, 5)}${Re(56, 76, 76, 28)}${Re(96, 50, 32, 26)}${L(104, 56, 122, 56)}${P('M66 78 L140 36 L192 70')}${P('M192 70 L204 102 L180 106 Z')}${L(140, 36, 150, 50)}`,
    om: () => `${L(10, 40, 230, 40)}${hatch(40, 16, 80)}${hatch(40, 160, 228)}${Re(84, 34, 72, 6)}${Re(96, 46, 48, 70)}${P('M108 58 H132 M108 72 H132 M108 86 H132 M108 100 H132')}${L(10, 118, 96, 118)}${L(144, 118, 230, 118)}${L(10, 134, 230, 134)}${Ci(196, 84, 16)}${L(196, 84, 204, 72)}`,
  };
  const drawing = (key, label = '') => `<svg class="drawing" viewBox="0 0 240 150" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true"'}>${(DRAW[key] || DRAW.road)()}</svg>`;

  // A photograph from the company's own CDN, with the drawing standing in when it cannot load.
  const photo = (url, alt, fallbackKey, cls = 'photo') => `<figure class="${cls}${url ? '' : ' nophoto'}">${url ? `<img src="${esc(url)}" alt="${esc(alt)}" loading="lazy" onerror="this.parentNode.classList.add('nophoto')">` : ''}<span class="fallback">${drawing(fallbackKey)}</span></figure>`;

  function parseHash() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    let lang = 'ar';
    if (parts[0] === 'en') { lang = 'en'; parts.shift(); }
    const page = PAGES.includes(parts[0] || '') ? (parts[0] || '') : '';
    let sub = parts[1] || '';
    if (page === 'services' && !Object.values(SVC).some((v) => v.slug === sub)) sub = '';
    if (page === 'projects' && !content.en.projects.items.some((p) => projSlug(p.id) === sub)) sub = '';
    if (page !== 'services' && page !== 'projects') sub = '';
    return { lang, page, sub };
  }

  function go(page, prefill) {
    if (prefill !== undefined) state.prefill = prefill;
    const target = href(page);
    if (location.hash === target) render(true); else location.hash = target;
  }

  // ---------- chrome ----------
  function topbar() {
    const T = t(), U = ui();
    return `<div class="topbar-in">
      <ul class="creds"><li>${icon('file-text')}${esc(U.cr)} <span class="num">${esc(C0.cr)}</span></li><li>${icon('shield-check')}${esc(T.why.items[1])}</li></ul>
      <ul class="reach"><li>${icon('phone')}<a href="tel:${C0.phone.replace(/\s/g, '')}"><span class="ltr num">${esc(C0.phone)}</span></a></li><li>${icon('mail')}<a href="mailto:${C0.email}">${esc(C0.email)}</a></li></ul>
    </div>`;
  }

  function masthead() {
    const T = t(), U = ui();
    const here = state.sub ? `${state.page}/${state.sub}` : state.page;
    const other = state.lang === 'ar' ? 'en' : 'ar';
    const items = [...T.nav, { id: 'careers', label: T.navCareers }];
    const cur = (id) => (state.page === id ? ' aria-current="page"' : '');
    return `
      <div class="masthead-in">
        <a class="brand" href="${href('')}"><img src="${logo}" alt="${esc(T.brandLine)}" width="144" height="36"></a>
        <nav class="nav" aria-label="${esc(U.menu)}">${items.map((n) => `<a href="${href(n.id)}"${cur(n.id)}>${esc(n.label)}</a>`).join('')}</nav>
        <div class="tools">
          <a class="lang" href="${href(here, other)}" hreflang="${other}" lang="${other}" aria-label="${esc(U.langLabel)}">${icon('languages')}<span class="long">${esc(U.langName)}</span><span class="short" aria-hidden="true">${state.lang === 'ar' ? 'EN' : 'ع'}</span></a>
          <a class="btn btn-quote" href="${href('contact')}" data-quote>${esc(U.quote)}</a>
          <button class="menu-btn" type="button" aria-expanded="false" aria-controls="drawer" aria-label="${esc(U.menu)}">${icon('menu')}</button>
        </div>
      </div>
      <nav class="drawer" id="drawer" aria-label="${esc(U.menu)}">${items.map((n) => `<a href="${href(n.id)}"${cur(n.id)}><span>${esc(n.label)}</span>${arrow()}</a>`).join('')}</nav>`;
  }

  function footer() {
    const T = t();
    return `<div class="footer-in">
        <div><img src="${logo}" alt="${esc(T.brandLine)}" width="144" height="36"></div>
        <div><h2>${esc(T.footer.quickLinks)}</h2><ul>${T.nav.map((n) => `<li><a href="${href(n.id)}">${esc(n.label)}</a></li>`).join('')}<li><a href="${href('careers')}">${esc(T.navCareers)}</a></li></ul></div>
      </div>
      <div class="footer-base">${esc(T.footer.rights)}</div>`;
  }

  function pagehead(title, lead, extra = '', drawKey = '') {
    return `<section class="pagehead"><div class="pagehead-in">
      <div><h1>${esc(title)}</h1>${lead ? `<p>${esc(lead)}</p>` : ''}${extra}</div>
      ${drawKey ? drawing(drawKey) : ''}
    </div></section>`;
  }

  // ---------- tabs ----------
  function tabs(id, label, items, tone = '') {
    const cur = items.some((i) => i.key === state.tabs[id]) ? state.tabs[id] : items[0].key;
    return `<div class="tabs ${tone}" data-tabs="${id}">
      <div class="tablist" role="tablist" aria-label="${esc(label)}">${items.map((it) => `<button type="button" role="tab" id="tab-${id}-${it.key}" aria-controls="panel-${id}-${it.key}" aria-selected="${cur === it.key}" tabindex="${cur === it.key ? 0 : -1}" data-tab="${id}" data-key="${it.key}">${esc(it.label)}${it.count !== undefined ? `<span class="count num">${it.count}</span>` : ''}</button>`).join('')}</div>
      ${items.map((it) => `<div class="tabpanel" role="tabpanel" id="panel-${id}-${it.key}" aria-labelledby="tab-${id}-${it.key}" tabindex="0"${cur === it.key ? '' : ' hidden'}>${it.html}</div>`).join('')}
    </div>`;
  }
  function selectTab(btn, focus) {
    const id = btn.dataset.tab, key = btn.dataset.key;
    state.tabs[id] = key;
    const box = btn.closest('.tabs');
    $$('[role=tab]', box).forEach((b) => { const on = b === btn; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
    $$('[role=tabpanel]', box).forEach((p) => { p.hidden = p.id !== `panel-${id}-${key}`; });
    if (focus) btn.focus();
    observeDrawings();
  }

  // ---------- project cards ----------
  function projItem(p) {
    const T = t();
    const svc = T.services.items.find((s) => s.icon === CAT_SVC[p.key]);
    return `<li class="proj"><a href="${href(`projects/${projSlug(p.id)}`)}">
      ${photo(projImage(p), p.title, svc ? svcOf(svc).d : 'road')}
      <div><h3>${esc(p.title)}</h3><p class="meta"><span>${esc(p.client)}</span><span>${esc(p.location)}</span><span class="status ${isDone(p) ? 'done' : 'live'}">${esc(p.status)}</span></p></div>
    </a></li>`;
  }

  // ---------- pages ----------
  function pageHome() {
    const T = t(), U = ui(), H = T.hero, C = T.certifications;
    const featured = featuredProjects();
    return `
      <section class="hero" aria-labelledby="h1">
        ${photo(heroImage(), T.brandLine, 'road')}
        <div class="hero-in">
          <h1 id="h1">${esc(H.title)}</h1>
          <p>${esc(H.lead)}</p>
          <a class="btn btn-outline-light" href="${href('services')}">${esc(H.cta1)}</a>
        </div>
      </section>

      <section class="band" aria-labelledby="disc-h"><div class="wrap">
        <div class="head"><h2 id="disc-h">${esc(U.homeDisc)}</h2><a class="more" href="${href('services')}">${esc(U.allDisciplines)} ${arrow()}</a></div>
        <ul class="disc-list">${T.services.items.map((s) => `<li><a href="${href(`services/${svcOf(s).slug}`)}"><span class="mark">${drawing(svcOf(s).d)}</span><span class="name">${esc(s.title)}</span>${arrow()}</a></li>`).join('')}</ul>
      </div></section>

      <section class="band mist" aria-labelledby="proj-h"><div class="wrap">
        <div class="head"><h2 id="proj-h">${esc(U.featured)}</h2><a class="more" href="${href('projects')}">${esc(U.allProjects)} ${arrow()}</a></div>
        <ul class="proj-grid featured">${featured.map(projItem).join('')}</ul>
      </div></section>

      <section class="band teal on-dark" aria-labelledby="appr-h"><div class="wrap">
        <div class="head"><h2 id="appr-h">${esc(U.homeAppr)}</h2><a class="more" href="${href('certifications')}">${esc(U.certsLink)} ${arrow()}</a></div>
        <ul class="names iso">${C.iso.map((i) => `<li><span class="num ltr">${esc(i.title)}</span></li>`).join('')}</ul>
        <ul class="names bodies-grid">${C.approvals.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
      </div></section>`;
  }

  function pageAbout() {
    const T = t(), U = ui(), I = T.intro, Y = T.why;
    const own = Y.items.slice(4); // the first four (ISO, NWC, 35 years, fleet) live on their own pages
    return `${pagehead(I.title, I.p1, '', 'road')}
      <section class="band"><div class="wrap cols-2">
        <div class="prose"><p class="lead">${esc(I.p2)}</p><p>${esc(I.p3)}</p></div>
        <div><h2 class="sub-h">${esc(Y.title)}</h2><ul class="checks">${own.map((w) => `<li>${icon('check')}<span>${esc(w)}</span></li>`).join('')}</ul>
          <div class="onward"><a class="more" href="${href('leadership')}">${esc(U.meetLeaders)} ${arrow()}</a><a class="more" href="${href('journey')}">${esc(U.ourJourney)} ${arrow()}</a></div></div>
      </div></section>`;
  }

  function pageServices() {
    const T = t(), S = T.services;
    return `${pagehead(S.title, S.lead)}
      <section class="band"><div class="wrap">
        <ul class="disc-grid">${S.items.map((s) => {
          const v = svcOf(s);
          return `<li><a href="${href(`services/${v.slug}`)}">${drawing(v.d)}<h2>${esc(s.title)}</h2><span class="meta"${relProjects(s).length ? '' : ' aria-hidden="true"'}>${relProjects(s).length ? published(relProjects(s).length) : ''}</span><span class="go">${esc(ui().details)} ${arrow()}</span></a></li>`;
        }).join('')}</ul>
      </div></section>`;
  }

  function pageService() {
    const T = t(), U = ui(), S = T.services;
    const i = svcIndexBySlug(state.sub), s = S.items[i], v = svcOf(s);
    const rel = relProjects(s);
    const prev = S.items[(i + S.items.length - 1) % S.items.length];
    const next = S.items[(i + 1) % S.items.length];
    return `${pagehead(s.title, s.desc, `<a class="crumb" href="${href('services')}">${arrow()} ${esc(U.allDisciplines)}</a>`, v.d)}
      <section class="band"><div class="wrap">
        ${tabs('svc', s.title, [
          { key: 'scope', label: U.scopeTab, count: s.capabilities.length, html: `<ul class="caps">${s.capabilities.map((c) => `<li>${icon('check')}<span>${esc(c)}</span></li>`).join('')}</ul>` },
          { key: 'projects', label: U.projectsTab, count: rel.length, html: rel.length ? `<ul class="proj-grid">${rel.map(projItem).join('')}</ul>` : `<p class="empty">${esc(U.noProjects)}</p>` },
        ])}
        <nav class="pager" aria-label="${esc(U.allDisciplines)}">
          <a href="${href(`services/${svcOf(prev).slug}`)}" rel="prev"><span class="k">${esc(U.prev)}</span><span class="v">${esc(prev.title)}</span></a>
          <a href="${href(`services/${svcOf(next).slug}`)}" rel="next"><span class="k">${esc(U.next)}</span><span class="v">${esc(next.title)}</span></a>
        </nav>
      </div></section>`;
  }

  function pageProjects() {
    const P = t().projects;
    const items = P.items.filter((p) => state.filter === 'all' || p.key === state.filter);
    return `${pagehead(P.title, P.lead)}
      <section class="band"><div class="wrap" id="proj-host">
        <div class="filters" role="group" aria-label="${esc(P.title)}">${P.categories.map((c) => `<button type="button" data-filter="${c.key}" aria-pressed="${state.filter === c.key}">${esc(c.label)}<span class="count num">${c.key === 'all' ? P.items.length : P.items.filter((p) => p.key === c.key).length}</span></button>`).join('')}</div>
        ${items.length ? `<ul class="proj-grid">${items.map(projItem).join('')}</ul>` : `<p class="empty">${esc(P.empty)}</p>`}
      </div></section>`;
  }

  function pageProject() {
    const T = t(), U = ui(), P = T.projects;
    const p = projBySlug(state.sub);
    const svc = T.services.items.find((s) => s.icon === CAT_SVC[p.key]);
    const cat = P.categories.find((c) => c.key === p.key)?.label || p.category;
    const more = P.items.filter((x) => x.key === p.key && x.id !== p.id);
    return `${pagehead(p.title, '', `<a class="crumb" href="${href('projects')}">${arrow()} ${esc(U.allProjects)}</a>`)}
      ${photo(projImage(p), p.title, svc ? svcOf(svc).d : 'road', 'proj-hero')}
      <section class="band"><div class="wrap cols-2">
        <div class="prose"><p class="lead">${esc(p.desc)}</p>
          <h2 class="sub-h" style="margin-top:18px">${esc(P.labels.scope)}</h2>
          <ul class="caps">${(p.scope || []).map((x) => `<li>${icon('check')}<span>${esc(x)}</span></li>`).join('')}</ul></div>
        <dl class="facts">
          <div><dt>${esc(P.labels.client)}</dt><dd>${esc(p.client)}</dd></div>
          <div><dt>${esc(P.labels.location)}</dt><dd>${esc(p.location)}</dd></div>
          <div><dt>${esc(U.category)}</dt><dd>${esc(cat)}</dd></div>
          <div><dt>${esc(P.labels.status)}</dt><dd><span class="status ${isDone(p) ? 'done' : 'live'}">${esc(p.status)}</span></dd></div>
          ${svc ? `<div><dt>${esc(U.discipline)}</dt><dd><a class="more" href="${href(`services/${svcOf(svc).slug}`)}">${esc(svc.title)}</a></dd></div>` : ''}
        </dl>
      </div></section>
      ${more.length ? `<section class="band mist"><div class="wrap"><div class="head"><h2>${esc(U.moreProjects)}</h2></div><ul class="proj-grid">${more.map(projItem).join('')}</ul></div></section>` : ''}`;
  }

  function pageEquipment() {
    const E = t().equipment;
    const f4 = { Wrench: 'wrench', Satellite: 'satellite', HardHat: 'hard-hat', Clock: 'clock' };
    return `${pagehead(E.title, E.lead, '', 'fleet')}
      <section class="band"><div class="wrap">
        <div class="prose" style="margin-bottom:48px"><p class="lead">${esc(E.p1)}</p><p>${esc(E.p2)}</p></div>
        ${tabs('fleet', E.title, [
          { key: 'cats', label: E.categoriesHeading, count: E.categories.length, html: `<ul class="list-ruled">${E.categories.map((c) => `<li><span class="tick" aria-hidden="true"></span><span>${esc(c)}</span></li>`).join('')}</ul>` },
          { key: 'support', label: E.supportHeading, count: E.features.length, html: `<ul class="ruled-desc">${E.features.map((f) => `<li>${icon('check')}<div><h3>${esc(f.title)}</h3><p>${esc(f.desc)}</p></div></li>`).join('')}</ul>` },
        ])}
      </div></section>`;
  }

  function pageCerts() {
    const C = t().certifications;
    return `${pagehead(C.title, C.lead)}
      <section class="band"><div class="wrap">
        ${tabs('certs', C.title, [
          { key: 'iso', label: C.isoHeading, count: C.iso.length, html: `<ul class="features">${C.iso.map((i) => `<li>${icon('award')}<h3 class="num">${esc(i.title)}</h3><p>${esc(i.desc)}</p></li>`).join('')}</ul>` },
          { key: 'gov', label: C.approvalsHeading, count: C.approvals.length, html: `<ul class="list-ruled">${C.approvals.map((a) => `<li><span class="tick" aria-hidden="true"></span><span>${esc(a)}</span></li>`).join('')}</ul>` },
          { key: 'commit', label: C.commitmentTitle, html: `<div class="prose"><p class="lead">${esc(C.commitmentBody)}</p></div>` },
        ])}
      </div></section>`;
  }

  function pageJourney() {
    const J = t().journey;
    return `${pagehead(J.title, J.lead)}
      <section class="band"><div class="wrap">
        ${tabs('journey', J.title, [
          { key: 'm', label: ui().milestones, count: J.milestones.length, html: `<ol class="timeline">${J.milestones.map((m) => `<li><span class="yr">${esc(m.year)}</span><div><h3>${esc(m.title)}</h3><p>${esc(m.desc)}</p></div></li>`).join('')}</ol>` },
          { key: 'v', label: J.valuesTitle, count: J.values.length, html: `<ul class="values">${J.values.map((v) => `<li><strong>${esc(v.title)}</strong><span>${esc(v.desc)}</span></li>`).join('')}</ul>` },
        ])}
      </div></section>`;
  }

  function pageLeadership() {
    const L2 = t().leadership;
    const photos = [IMG.chairman, IMG.gm];
    return `${pagehead(L2.title, L2.lead)}
      <section class="band"><div class="wrap leaders">${L2.leaders.map((p, i) => `
        <article class="leader">
          <figure class="portrait${isRemote(photos[i]) ? '' : ' nophoto'}">${isRemote(photos[i]) ? `<img src="${esc(photos[i])}" alt="${esc(p.name)}" loading="lazy" onerror="this.parentNode.classList.add('nophoto')">` : ''}<span class="fallback">${icon('building-2')}</span></figure>
          <div><h2>${esc(p.name)}</h2><p class="role">${esc(p.title)}</p><p class="bio">${esc(p.bio)}</p>
            <h3 class="visually-hidden">${esc(L2.expertiseHeading)}</h3><ul class="tags">${(p.expertise || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
        </article>`).join('')}</div></section>
      <section class="band teal on-dark"><div class="wrap"><figure class="quote"><blockquote>${esc(L2.quote)}</blockquote><figcaption><strong>${esc(L2.leaders[0].name)}</strong>${esc(L2.leaders[0].title)}</figcaption></figure></div></section>`;
  }

  function field(id, label, control, err, full = false) {
    return `<div class="field${full ? ' full' : ''}"><label for="${id}">${esc(label)}</label>${control}<span class="err" id="${id}-err" hidden>${icon('circle-alert')}<span>${esc(err || '')}</span></span></div>`;
  }

  function pageContact() {
    const T = t(), C = T.contact, U = ui(), pf = state.prefill || {};
    return `${pagehead(C.title, C.lead)}
      <section class="band"><div class="wrap sheet-grid">
        <form class="sheet" id="quote-form" novalidate>
          <h2>${esc(U.quote)}</h2>
          <div class="fields">
            ${field('f-name', C.fields.name, `<input id="f-name" name="name" autocomplete="name" placeholder="${esc(C.placeholders.name)}" aria-describedby="f-name-err">`, C.errors.name)}
            ${field('f-email', C.fields.email, `<input id="f-email" name="email" type="email" autocomplete="email" dir="ltr" placeholder="${esc(C.placeholders.email)}" aria-describedby="f-email-err">`, C.errors.email)}
            ${field('f-company', C.fields.company, `<input id="f-company" name="company" autocomplete="organization" placeholder="${esc(C.placeholders.company)}" aria-describedby="f-company-err">`, C.errors.company)}
            ${field('f-type', C.fields.type, `<select id="f-type" name="type"><option value="">${esc(C.placeholders.type)}</option>${C.typeOptions.map((o) => `<option value="${o.key}"${pf.type === o.key ? ' selected' : ''}>${esc(o.label)}</option>`).join('')}</select>`, '')}
            ${field('f-message', C.fields.message, `<textarea id="f-message" name="message" placeholder="${esc(C.placeholders.message)}" aria-describedby="f-message-err">${esc(pf.message || '')}</textarea>`, C.errors.message, true)}
          </div>
          <div class="form-foot"><button class="btn btn-quote" type="submit">${icon('send', 'flip')}<span>${esc(C.submit)}</span></button></div>
          <div id="quote-status" aria-live="polite"></div>
        </form>
        <aside class="aside"><h2>${esc(C.officeHeading)}</h2><ul class="office">
          <li>${icon('map-pin')}<span class="k">${esc(U.office)}</span><span>${esc(C.address)}</span></li>
          <li>${icon('phone')}<span class="k">${esc(U.mobile)}</span><a href="tel:${C0.mobile.replace(/\s/g, '')}"><span class="ltr num">${esc(C0.mobile)}</span></a></li>
          <li>${icon('clock')}<span class="k">${esc(C.hoursHeading)}</span><span>${C.hours.map(esc).join('<br>')}</span></li>
        </ul></aside>
      </div></section>`;
  }

  function pageCareers() {
    const T = t(), K = T.careers, U = ui();
    const ic = { Layers: 'layers', GraduationCap: 'graduation-cap', HardHat: 'hard-hat', ShieldCheck: 'shield-check', Briefcase: 'briefcase' };
    return `${pagehead(K.title, K.lead, `<a class="btn btn-outline-light" href="#apply" data-jump="apply">${esc(K.cta)}</a>`)}
      <section class="band mist"><div class="wrap"><div class="head"><h2>${esc(K.whyTitle)}</h2></div>
        <ul class="features">${K.why.map((w) => `<li>${icon(ic[w.icon] || 'layers')}<h3>${esc(w.title)}</h3><p>${esc(w.desc)}</p></li>`).join('')}</ul></div></section>
      <section class="band"><div class="wrap"><div class="head"><div><h2>${esc(K.rolesTitle)}</h2><p>${esc(K.rolesLead)}</p></div></div>
        <table class="roles"><thead><tr><th scope="col">${esc(U.role)}</th><th scope="col">${esc(U.dept)}</th><th scope="col">${esc(U.loc)}</th><th scope="col">${esc(U.type)}</th><th scope="col">${esc(U.exp)}</th><th scope="col"><span class="visually-hidden">${esc(U.apply)}</span></th></tr></thead>
        <tbody>${K.roles.map((r) => `<tr><td class="t">${esc(r.title)}</td><td class="k" data-k="${esc(U.dept)}">${esc(r.dept)}</td><td class="k" data-k="${esc(U.loc)}">${esc(r.location)}</td><td class="k" data-k="${esc(U.type)}">${esc(r.type)}</td><td class="k" data-k="${esc(U.exp)}">${esc(r.exp)}</td><td><button class="btn btn-outline" type="button" data-role="${r.slug}">${esc(U.apply)}</button></td></tr>`).join('')}</tbody></table>
      </div></section>
      <section class="band mist" id="apply"><div class="wrap sheet-solo">
        <form class="sheet" id="apply-form" novalidate>
          <h2>${esc(K.applyTitle)}</h2><p>${esc(K.applyLead)}</p>
          <div class="fields">
            ${field('a-name', K.fields.name, `<input id="a-name" name="name" autocomplete="name" placeholder="${esc(K.placeholders.name)}" aria-describedby="a-name-err">`, K.errors.name)}
            ${field('a-email', K.fields.email, `<input id="a-email" name="email" type="email" autocomplete="email" dir="ltr" placeholder="${esc(K.placeholders.email)}" aria-describedby="a-email-err">`, K.errors.email)}
            ${field('a-phone', K.fields.phone, `<input id="a-phone" name="phone" type="tel" autocomplete="tel" dir="ltr" placeholder="${esc(K.placeholders.phone)}" aria-describedby="a-phone-err">`, K.errors.phone)}
            ${field('a-exp', K.fields.exp, `<input id="a-exp" name="exp" type="number" min="0" max="60" inputmode="numeric" placeholder="${esc(K.placeholders.exp)}" aria-describedby="a-exp-err">`, K.errors.exp)}
            ${field('a-role', K.fields.role, `<select id="a-role" name="role" aria-describedby="a-role-err"><option value="">${esc(K.placeholders.role)}</option>${K.roles.map((r) => `<option value="${r.slug}"${state.role === r.slug ? ' selected' : ''}>${esc(r.title)}</option>`).join('')}<option value="other">${esc(K.otherRole)}</option></select>`, K.errors.role, true)}
            <div class="field full"><span class="label" id="a-cv-l">${esc(K.fields.cv)}</span>
              <label class="visually-hidden" for="a-cv">${esc(K.cvLink)}</label>
              <input id="a-cv" name="cv" type="url" dir="ltr" placeholder="${esc(K.placeholders.cv)}" aria-describedby="a-cv-l a-cv-hint a-cv-err">
              <div class="file-row"><label class="btn btn-outline" for="a-file">${icon('upload')}${esc(K.cvUploadBtn)}</label><input id="a-file" type="file" accept=".pdf,.doc,.docx" class="visually-hidden"><span id="a-file-name">${esc(K.cvNone)}</span></div>
              <span class="hint" id="a-cv-hint">${esc(K.cvHint)}</span>
              <span class="err" id="a-cv-err" hidden>${icon('circle-alert')}<span>${esc(K.errors.cv)}</span></span></div>
            ${field('a-note', K.fields.note, `<textarea id="a-note" name="note" placeholder="${esc(K.placeholders.note)}"></textarea>`, '', true)}
          </div>
          <div class="form-foot"><button class="btn btn-teal" type="submit">${icon('send', 'flip')}<span>${esc(K.submit)}</span></button></div>
          <div id="apply-status" aria-live="polite"></div>
        </form>
      </div></section>`;
  }

  const PAGE_FN = { '': pageHome, about: pageAbout, services: pageServices, projects: pageProjects, equipment: pageEquipment, certifications: pageCerts, journey: pageJourney, leadership: pageLeadership, contact: pageContact, careers: pageCareers };

  function pageTitle() {
    const T = t();
    if (state.page === 'services' && state.sub) return `${T.services.items[svcIndexBySlug(state.sub)].title} — ${T.brandLine}`;
    if (state.page === 'projects' && state.sub) return `${projBySlug(state.sub).title} — ${T.brandLine}`;
    if (!state.page) return `${T.brandLine} — ${T.hero.title}`;
    if (state.page === 'careers') return `${T.careers.title} — ${T.brandLine}`;
    return `${T.nav.find((n) => n.id === state.page)?.label || ''} — ${T.brandLine}`;
  }

  // ---------- drawings draw once as they enter ----------
  let io = null;
  function observeDrawings() {
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('anim');
    io = io || new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('drawn'); io.unobserve(e.target); }
    }), { threshold: 0.25 });
    $$('.drawing:not(.drawn)').forEach((d) => io.observe(d));
  }

  // ---------- render ----------
  let lastKey = '';
  function render(force = false) {
    const { lang, page, sub } = parseHash();
    const changed = lang !== state.lang || page !== state.page || sub !== state.sub;
    Object.assign(state, { lang, page, sub });
    const key = `${lang}/${page}/${sub}`;
    if (!force && key === lastKey) return;
    lastKey = key;
    if (page !== 'contact') state.prefill = null;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = pageTitle();
    $('.skip').textContent = ui().skip;
    $('#proto-note').textContent = ui().proto;
    $('#topbar').innerHTML = topbar();
    $('#masthead').innerHTML = masthead();
    $('#main').innerHTML = (page === 'services' && sub) ? pageService() : (page === 'projects' && sub) ? pageProject() : PAGE_FN[page]();
    $('#footer').innerHTML = footer();
    if (changed || force) scrollTo({ top: 0, behavior: 'auto' });
    if (state.jump) { const el = document.getElementById(state.jump); state.jump = null; el?.scrollIntoView(); }
    observeDrawings();
  }

  // ---------- forms ----------
  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  function setErr(id, bad, msg) {
    const input = document.getElementById(id), err = document.getElementById(`${id}-err`);
    if (err && msg) err.lastChild.textContent = msg;
    input?.setAttribute('aria-invalid', String(bad));
    if (err) err.hidden = !bad;
    return bad;
  }
  function submitLike(form, statusId, okText, busyText) {
    const btn = $('button[type=submit]', form), label = $('span:last-child', btn);
    const before = label.textContent;
    btn.setAttribute('aria-busy', 'true'); btn.disabled = true; label.textContent = busyText;
    setTimeout(() => {
      btn.removeAttribute('aria-busy'); btn.disabled = false; label.textContent = before;
      document.getElementById(statusId).innerHTML = `<div class="notice" role="status">${icon('check')}<div><strong>${esc(okText)}</strong><br><span>${esc(ui().protoSent)}</span></div></div>`;
      form.reset();
    }, 900);
  }

  // ---------- events ----------
  document.addEventListener('click', (e) => {
    const el = e.target.closest('button, a');
    if (!el) return;
    const T = t();
    if (el.matches('.menu-btn')) {
      const d = $('#drawer'), open = !d.classList.contains('open');
      d.style.top = `${Math.max(0, $('#masthead').getBoundingClientRect().bottom)}px`;
      d.classList.toggle('open', open); el.setAttribute('aria-expanded', String(open));
      el.innerHTML = icon(open ? 'x' : 'menu'); el.setAttribute('aria-label', open ? ui().close : ui().menu);
      if (open) $('a', d)?.focus();
      return;
    }
    if (el.closest('.drawer')) $('#drawer').classList.remove('open');
    if (el.matches('[role=tab]')) { selectTab(el); return; }
    if (el.dataset.filter) {
      state.filter = el.dataset.filter;
      const scrollY0 = scrollY; $('#main').innerHTML = pageProjects(); scrollTo(0, scrollY0);
      $(`[data-filter="${state.filter}"]`)?.focus(); observeDrawings();
      return;
    }
    if (el.dataset.request) { go('contact', { type: el.dataset.type || '', message: `${el.dataset.request}: ` }); return; }
    if (el.dataset.role) {
      state.role = el.dataset.role;
      const sel = $('#a-role'); if (sel) sel.value = state.role;
      $('#apply').scrollIntoView({ behavior: 'smooth' }); setTimeout(() => $('#a-name')?.focus({ preventScroll: true }), 450);
      return;
    }
    if (el.dataset.jump) { e.preventDefault(); document.getElementById(el.dataset.jump)?.scrollIntoView({ behavior: 'smooth' }); return; }
    if (el.hasAttribute('data-quote')) {
      state.prefill = null;
      if (state.page === 'services' && state.sub) {
        const s = T.services.items[svcIndexBySlug(state.sub)];
        state.prefill = { type: svcOf(s).type, message: `${T.services.inquireCta} ${s.title}: ` };
      } else if (state.page === 'projects' && state.sub) {
        const p = projBySlug(state.sub);
        state.prefill = { type: CAT_TYPE[p.key] || 'other', message: `${T.projects.detailsCta}: ${p.title} — ` };
      } else if (state.page === 'equipment') {
        state.prefill = { type: 'equipment-rental', message: `${T.equipment.cta}: ` };
      } else if (state.page === 'certifications') {
        state.prefill = { type: '', message: `${T.certifications.cta}: ` };
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    const tab = e.target.closest?.('[role=tab]');
    if (tab && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
      const list = $$('[role=tab]', tab.parentElement), i = list.indexOf(tab);
      const fwd = rtl() ? 'ArrowLeft' : 'ArrowRight';
      const j = e.key === 'Home' ? 0 : e.key === 'End' ? list.length - 1 : (i + (e.key === fwd ? 1 : -1) + list.length) % list.length;
      e.preventDefault(); selectTab(list[j], true); return;
    }
    if (e.key === 'Escape' && $('#drawer')?.classList.contains('open')) { $('.menu-btn').click(); $('.menu-btn').focus(); }
  });

  document.addEventListener('change', (e) => {
    if (e.target.id === 'a-file') { const f = e.target.files[0]; $('#a-file-name').textContent = f ? f.name : t().careers.cvNone; if (f) setErr('a-cv', false); }
  });

  document.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target, v = (n) => (form.elements[n]?.value || '').trim();
    if (form.id === 'quote-form') {
      const C = t().contact;
      const bad = [setErr('f-name', !v('name')), setErr('f-email', !validEmail(v('email')), v('email') ? C.errors.email : ui().emailRequired), setErr('f-company', !v('company')), setErr('f-message', v('message').length < 10)];
      const first = ['f-name', 'f-email', 'f-company', 'f-message'][bad.indexOf(true)];
      if (first) { document.getElementById(first).focus(); return; }
      submitLike(form, 'quote-status', C.success, C.submitting);
    }
    if (form.id === 'apply-form') {
      const K = t().careers, hasFile = !!$('#a-file').files.length;
      const bad = [setErr('a-name', !v('name')), setErr('a-email', !validEmail(v('email')), v('email') ? K.errors.email : ui().emailRequired), setErr('a-phone', !v('phone')), setErr('a-exp', v('exp') === ''), setErr('a-role', !v('role')), setErr('a-cv', !v('cv') && !hasFile)];
      const first = ['a-name', 'a-email', 'a-phone', 'a-exp', 'a-role', 'a-cv'][bad.indexOf(true)];
      if (first) { document.getElementById(first).focus(); return; }
      submitLike(form, 'apply-status', K.success, K.submitting);
      $('#a-file-name').textContent = K.cvNone;
    }
  });

  document.addEventListener('input', (e) => {
    const el = e.target;
    if (el.getAttribute('aria-invalid') !== 'true') return;
    const ok = el.type === 'email' ? validEmail(el.value.trim()) : el.id === 'f-message' ? el.value.trim().length >= 10 : !!el.value.trim();
    if (ok) setErr(el.id, false);
  });

  addEventListener('hashchange', () => render());
  render(true);
})();
