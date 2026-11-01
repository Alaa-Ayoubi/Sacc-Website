/* SACC prototype, proposal 2: contemporary Hejazi.
 *
 * Content is the real site snapshot (window.SACC.content). Only the small set
 * of interface strings in UI below is new copy, written in both languages.
 * Hash routes mirror the URLs the integrated site will serve:
 * #/services/water-sewerage in Arabic, #/en/services/water-sewerage in English.
 */
(() => {
  'use strict';

  const { content, icons, logo } = window.SACC;
  const PAGES = ['', 'about', 'services', 'projects', 'equipment', 'certifications', 'journey', 'leadership', 'contact', 'careers'];
  const { phone: PHONE, mobile: MOBILE, email: EMAIL, cr: CR } = content.company;
  const IMG = content.images;

  // New interface copy: the only strings not taken from the content bundle.
  const UI = {
    ar: {
      skip: 'تخطَّ إلى المحتوى',
      home: 'الرئيسية',
      quote: 'اطلب عرض سعر',
      menu: 'القائمة',
      close: 'إغلاق القائمة',
      langName: 'English',
      langLabel: 'Switch to English',
      proto: 'نموذج تصميم تفاعلي للمراجعة. النماذج لا ترسل أي بيانات.',
      protoSent: 'هذا نموذج للمراجعة: لم يُرسل شيء. بعد الدمج تُحفظ الرسالة ويُبلَّغ الفريق.',
      official: 'البيانات الرسمية',
      cr: 'السجل التجاري',
      phone: 'الهاتف',
      mobile: 'الجوال',
      email: 'البريد',
      office: 'العنوان',
      register: 'سجل الاعتمادات',
      facadeHint: 'افتح نافذة أي تخصص لعرض نطاقه وقدراته.',
      brief: 'السجل في سطور',
      details: 'صفحة التخصص',
      openDetails: 'التفاصيل الكاملة',
      allDisciplines: 'كل التخصصات',
      allProjects: 'كل المشاريع',
      scopeTab: 'نطاق العمل',
      projectsTab: 'المشاريع المنفّذة',
      noProjects: 'لا توجد مشاريع منشورة في هذا التخصص بعد.',
      prevDiscipline: 'التخصص السابق',
      nextDiscipline: 'التخصص التالي',
      projectSheet: 'بطاقة المشروع',
      category: 'التصنيف',
      discipline: 'التخصص المرتبط',
      moreProjects: 'مشاريع أخرى في التصنيف نفسه',
      milestonesTab: 'محطات المسيرة',
      related: 'صفحة ذات صلة',
      emailRequired: 'البريد الإلكتروني مطلوب',
      apply: 'تقدّم لهذه الوظيفة',
      role: 'الوظيفة', dept: 'القسم', loc: 'الموقع', type: 'الدوام', exp: 'الخبرة',
      tally: {
        projects: ['مشروع منفّذ', 'مشروعان منفّذان', 'مشاريع منفّذة', 'مشروعًا منفّذًا'],
        clients: ['جهة مالكة', 'جهتان مالكتان', 'جهات مالكة', 'جهةً مالكة'],
        places: ['مدينة ومنطقة', 'مدينتان ومنطقتان', 'مدن ومناطق', 'مدينةً ومنطقة'],
        completed: ['مكتمل', 'مكتملان', 'مكتملة', 'مكتملًا'],
        approvals: ['جهة حكومية معتمِدة', 'جهتان حكوميتان معتمِدتان', 'جهات حكومية معتمِدة', 'جهةً حكومية معتمِدة'],
      },
    },
    en: {
      skip: 'Skip to content',
      home: 'Home',
      quote: 'Request a Quote',
      menu: 'Menu',
      close: 'Close menu',
      langName: 'العربية',
      langLabel: 'التبديل إلى العربية',
      proto: 'Interactive design prototype for review. Forms send nothing.',
      protoSent: 'This is a review prototype: nothing was sent. Once integrated, the message is stored and the team is notified.',
      official: 'Official details',
      cr: 'Commercial Registration',
      phone: 'Phone',
      mobile: 'Mobile',
      email: 'Email',
      office: 'Address',
      register: 'Accreditation register',
      facadeHint: 'Open any discipline to see its scope and capabilities.',
      brief: 'The record in brief',
      details: 'Discipline page',
      openDetails: 'Full details',
      allDisciplines: 'All disciplines',
      allProjects: 'All projects',
      scopeTab: 'Scope of work',
      projectsTab: 'Delivered projects',
      noProjects: 'No published projects in this discipline yet.',
      prevDiscipline: 'Previous discipline',
      nextDiscipline: 'Next discipline',
      projectSheet: 'Project sheet',
      category: 'Category',
      discipline: 'Related discipline',
      moreProjects: 'More projects in this category',
      milestonesTab: 'Milestones',
      related: 'Related page',
      emailRequired: 'Email is required',
      apply: 'Apply for this role',
      role: 'Role', dept: 'Department', loc: 'Location', type: 'Type', exp: 'Experience',
      tally: {
        projects: ['project delivered', 'projects delivered'],
        clients: ['client', 'clients'],
        places: ['city or region', 'cities and regions'],
        completed: ['completed', 'completed'],
        approvals: ['government approval', 'government approvals'],
      },
    },
  };

  // Each discipline, keyed by its content icon: its URL slug, its glyph, the
  // project categories it has delivered, the contact form's project type, and
  // an inner page that carries its supporting proof.
  const DISCIPLINE = {
    Droplets: { slug: 'water-sewerage', icon: 'droplets', projects: ['water'], type: 'water-sewerage' },
    CloudRain: { slug: 'stormwater', icon: 'cloud-rain', projects: [], type: 'water-sewerage' },
    Zap: { slug: 'electrical-solar', icon: 'zap', projects: ['electrical'], type: 'other' },
    Route: { slug: 'roads-asphalt', icon: 'route', projects: ['roads'], type: 'roads-asphalt' },
    Construction: { slug: 'bridges-tunnels', icon: 'construction', projects: [], type: 'bridges-tunnels' },
    Building2: { slug: 'landscaping', icon: 'trees', projects: ['urban'], type: 'urban-development' },
    ShieldCheck: { slug: 'quality-laboratory', icon: 'flask-conical', projects: [], type: 'other', page: 'certifications' },
    Truck: { slug: 'equipment-rental', icon: 'truck', projects: [], type: 'equipment-rental', page: 'equipment' },
    Settings: { slug: 'operation-maintenance', icon: 'settings', projects: [], type: 'other' },
  };
  const SLUGS = Object.values(DISCIPLINE).map((d) => d.slug);
  const CATEGORY_ICON = { water: 'droplets', roads: 'route', electrical: 'zap', urban: 'trees' };
  const CATEGORY_TYPE = { water: 'water-sewerage', roads: 'roads-asphalt', urban: 'urban-development', electrical: 'other' };
  const FEATURE_ICON = { Wrench: 'wrench', Satellite: 'satellite', HardHat: 'hard-hat', Clock: 'clock' };
  const PERK_ICON = { Layers: 'layers', GraduationCap: 'graduation-cap', HardHat: 'hard-hat', Users: 'users' };

  const state = { lang: 'ar', page: '', sub: '', bay: 0, filter: 'all', prefill: null, role: '', tabs: {}, jump: null };

  // ---------- helpers ----------
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const icon = (name, cls = '') => `<span class="icon${cls ? ` ${cls}` : ''}" aria-hidden="true">${icons[name] || ''}</span>`;
  const t = () => content[state.lang];
  const ui = () => UI[state.lang];
  const rtl = () => state.lang === 'ar';
  const arrow = () => icon(rtl() ? 'arrow-left' : 'arrow-right', 'arrow');
  const href = (page, lang = state.lang) => `#/${lang === 'en' ? 'en/' : ''}${page}`;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const disc = (svc) => DISCIPLINE[svc.icon] || DISCIPLINE.Settings;
  const slugify = (x) => String(x).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const projectSlug = (id) => slugify(content.en.projects.items.find((p) => p.id === id)?.title || id);
  const svcBySlug = (slug) => t().services.items.findIndex((x) => disc(x).slug === slug);
  const projBySlug = (slug) => t().projects.items.find((p) => projectSlug(p.id) === slug);
  const isDone = (p) => /complete|مكتمل/i.test(p.status);
  const delivered = (svc) => t().projects.items.filter((p) => disc(svc).projects.includes(p.key));
  const tel = (n) => `tel:${n.replace(/\s/g, '')}`;
  const textlink = (to, label, cls = '') => `<a class="textlink${cls ? ` ${cls}` : ''}" href="${href(to)}"><span>${esc(label)}</span>${arrow()}</a>`;

  // Counted nouns. Arabic: 1 and 2 have their own forms (2 is the dual, said
  // without the numeral), 3-10 take the plural, 11+ the singular accusative.
  const countParts = (n, key) => {
    const f = ui().tally[key];
    if (!rtl()) return { n, noun: n === 1 ? f[0] : f[1] };
    if (n === 2) return { n: '', noun: f[1] };
    return { n, noun: n === 1 ? f[0] : n <= 10 ? f[2] : f[3] };
  };
  const counted = (n, key) => {
    const f = ui().tally[key];
    const num = (x) => `<span class="num">${x}</span>`;
    if (!rtl()) return `${num(n)} ${esc(n === 1 ? f[0] : f[1])}`;
    if (n === 1) return `${num(1)} ${esc(f[0])}`;
    if (n === 2) return esc(f[1]);
    return `${num(n)} ${esc(n <= 10 ? f[2] : f[3])}`;
  };

  function parseHash() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    let lang = 'ar';
    if (parts[0] === 'en') { lang = 'en'; parts.shift(); }
    const page = PAGES.includes(parts[0] || '') ? (parts[0] || '') : '';
    let sub = parts[1] || '';
    if (page === 'services' && !SLUGS.includes(sub)) sub = '';
    else if (page === 'projects' && !content.en.projects.items.some((p) => projectSlug(p.id) === sub)) sub = '';
    else if (page !== 'services' && page !== 'projects') sub = '';
    return { lang, page, sub };
  }

  function go(page, opts = {}) {
    if (opts.prefill !== undefined) state.prefill = opts.prefill;
    const target = href(page);
    if (location.hash === target) render(true); else location.hash = target;
  }

  // ---------- global frame ----------
  function official() {
    const T = t(), U = ui();
    return `<div class="wrap official-in">
      <ul aria-label="${esc(U.official)}">
        <li>${icon('file-text')}<span>${esc(U.cr)}</span> <span class="num">${esc(CR)}</span></li>
        <li>${icon('badge-check')}<span>${esc(T.why.items[1])}</span></li>
        <li>${icon('phone')}<a href="${tel(PHONE)}" dir="ltr" class="num">${esc(PHONE)}</a></li>
        <li>${icon('mail')}<a href="mailto:${EMAIL}" dir="ltr">${esc(EMAIL)}</a></li>
      </ul>
    </div>`;
  }

  function masthead() {
    const T = t(), U = ui();
    const items = [...T.nav, { id: 'careers', label: T.navCareers }];
    const cur = (id) => (state.page === id ? ' aria-current="page"' : '');
    const other = rtl() ? 'en' : 'ar';
    const here = state.sub ? `${state.page}/${state.sub}` : state.page;
    return `
      <div class="wrap mast-in">
        <a class="brand" href="${href('')}"><img src="${logo}" alt="${esc(T.brandLine)} — ${esc(U.home)}" width="150" height="38" /></a>
        <nav class="nav" aria-label="${esc(U.menu)}"><ul>${items.map((n) => `<li><a href="${href(n.id)}"${cur(n.id)}>${esc(n.label)}</a></li>`).join('')}</ul></nav>
        <div class="mast-tools">
          <a class="lang" href="${href(here, other)}" hreflang="${other}" lang="${other}" aria-label="${esc(U.langLabel)}">${icon('languages')}<span>${esc(U.langName)}</span></a>
          <a class="btn btn-door mast-quote" href="${href('contact')}" data-quote>${esc(U.quote)}</a>
          <button class="menu-btn" type="button" aria-expanded="false" aria-controls="drawer" aria-label="${esc(U.menu)}">${icon('menu')}</button>
        </div>
      </div>
      <div class="drawer" id="drawer" hidden>
        <nav aria-label="${esc(U.menu)}"><ul>${items.map((n) => `<li><a href="${href(n.id)}"${cur(n.id)}><span>${esc(n.label)}</span>${arrow()}</a></li>`).join('')}</ul></nav>
        <a class="btn btn-door" href="${href('contact')}" data-quote>${esc(U.quote)}</a>
      </div>`;
  }

  function footer() {
    const T = t();
    const items = [...T.nav, { id: 'careers', label: T.navCareers }];
    return `
      <div class="wrap footer-in">
        <div class="footer-brand"><img src="${logo}" alt="${esc(T.brandLine)}" width="170" height="43" loading="lazy" /><p>${esc(T.brandLine)}</p></div>
        <nav aria-label="${esc(T.footer.quickLinks)}"><h2>${esc(T.footer.quickLinks)}</h2><ul class="sitemap">${items.map((n) => `<li><a href="${href(n.id)}">${esc(n.label)}</a></li>`).join('')}</ul></nav>
      </div>
      <div class="wrap footer-base"><span>${esc(T.footer.rights)}</span></div>`;
  }

  // The lintel: every page opens on a stone band carrying its title.
  function lintel(title, lead, extra = '', cls = '') {
    return `
      <section class="lintel${cls ? ` ${cls}` : ''}" aria-labelledby="page-h">
        <div class="wrap lintel-in"><div class="lintel-text"><h1 id="page-h">${esc(title)}</h1>${lead ? `<p class="lead">${esc(lead)}</p>` : ''}${extra}</div></div>
      </section>
      <div class="tie" aria-hidden="true"></div>`;
  }

  // ---------- home ----------
  function register() {
    const T = t(), U = ui(), C = T.certifications;
    return `
      <div class="register">
        <h2 class="visually-hidden">${esc(U.register)}</h2>
        <ul>
          ${C.iso.map((i) => `<li><span class="code num" dir="ltr">${esc(i.title)}</span><span class="what">${esc(i.desc)}</span></li>`).join('')}
          <li>${(() => { const c = countParts(C.approvals.length, 'approvals'); return `<span class="code num">${c.n}</span><span class="what">${esc(c.noun)}</span>`; })()}</li>
        </ul>
        ${textlink('certifications', C.title)}
      </div>`;
  }

  function bay(s, i) {
    const S = t().services, U = ui(), d = disc(s);
    const open = state.bay === i;
    const rel = delivered(s);
    return `
      <li class="bay" data-bay="${i}"${open ? ' data-open' : ''}>
        <h3 class="crown-h"><button class="crown" type="button" id="bay-${i}-btn" aria-expanded="${open}" aria-controls="bay-${i}">${icon(d.icon, 'crown-icon')}<span class="crown-t">${esc(s.title)}</span>${icon(open ? 'minus' : 'plus', 'crown-state')}</button></h3>
        <div class="window">
          <span class="leaf leaf-a" aria-hidden="true"></span><span class="leaf leaf-b" aria-hidden="true"></span>
          <div class="bay-body" id="bay-${i}" role="region" aria-labelledby="bay-${i}-btn"${open ? '' : ' inert'}>
            <p>${esc(s.desc)}</p>
            <h4 class="visually-hidden">${esc(S.capabilitiesHeading.replace(/[:：]\s*$/, ''))}</h4>
            <ul class="caps">${s.capabilities.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
            <div class="bay-foot">${rel.length ? `<span class="bay-count">${counted(rel.length, 'projects')}</span>` : ''}${textlink(`services/${d.slug}`, U.details)}</div>
          </div>
        </div>
      </li>`;
  }

  function facadeCols() {
    return t().services.items.map((_, i) => `minmax(0, ${state.bay === i ? 4 : 1}fr)`).join(' ');
  }

  function pageHome() {
    const T = t(), U = ui(), H = T.hero, S = T.services, P = T.projects, St = T.stats;
    const nav = (id) => T.nav.find((n) => n.id === id).label;
    const rows = [
      { to: 'projects', name: P.title, fig: counted(P.items.length, 'projects') },
      { to: 'equipment', name: nav('equipment'), fig: `<span class="num" dir="ltr">${esc(St[2].value)}</span> ${esc(St[2].label)}` },
      { to: 'leadership', name: nav('leadership'), fig: `<span class="num" dir="ltr">${esc(St[1].value)}</span> ${esc(St[1].label)}` },
      { to: 'journey', name: nav('journey'), fig: `<span class="num">${esc(St[0].value)}</span> ${esc(St[0].label)}` },
      { to: 'certifications', name: nav('certifications'), fig: `<span class="num" dir="ltr">${esc(St[3].value)}</span> ${esc(St[3].label)}` },
    ];
    return `
      <section class="lintel lintel-home" aria-labelledby="page-h">
        <div class="wrap lintel-in">
          <div class="lintel-text"><h1 id="page-h">${esc(H.title)}</h1><p class="lead">${esc(H.lead)}</p></div>
          ${register()}
        </div>
      </section>
      <div class="tie" aria-hidden="true"></div>
      <section class="facade-sec" aria-labelledby="facade-h">
        <div class="wrap">
          <div class="facade-head"><h2 id="facade-h">${esc(S.title)}</h2><p>${esc(U.facadeHint)}</p>${textlink('services', U.allDisciplines)}</div>
          <ol class="facade" style="--cols:${facadeCols()}">${S.items.map(bay).join('')}</ol>
        </div>
      </section>
      <div class="tie" aria-hidden="true"></div>
      <section class="band" aria-labelledby="brief-h">
        <div class="wrap split">
          <h2 id="brief-h">${esc(U.brief)}</h2>
          <ul class="ledger">${rows.map((r) => `<li><a href="${href(r.to)}"><span class="ledger-name">${esc(r.name)}</span><span class="ledger-fig">${r.fig}</span>${arrow()}</a></li>`).join('')}</ul>
        </div>
      </section>`;
  }

  // ---------- inner pages ----------
  function pageAbout() {
    // The NWC approval (why.items[1]) lives once, in the official strip.
    const T = t(), I = T.intro, W = T.why;
    return `
      ${lintel(I.title, I.p1)}
      <section class="band"><div class="wrap split">
        <div class="prose"><p>${esc(I.p2)}</p><p>${esc(I.p3)}</p></div>
        <div class="why"><h2>${esc(W.title)}</h2><p>${esc(W.lead)}</p><ul class="checks">${W.items.filter((w) => w !== W.items[1]).map((w) => `<li>${icon('check')}<span>${esc(w)}</span></li>`).join('')}</ul></div>
      </div></section>`;
  }

  function pageServices() {
    const T = t(), S = T.services, U = ui();
    return `
      ${lintel(S.title, S.lead)}
      <section class="band"><div class="wrap">
        <ol class="index">${S.items.map((s) => {
          const d = disc(s), rel = delivered(s);
          return `<li><a href="${href(`services/${d.slug}`)}">
            <span class="swatch" aria-hidden="true"></span>
            <span class="index-t">${icon(d.icon)}<span>${esc(s.title)}</span></span>
            <span class="index-d">${esc(s.desc)}</span>
            <span class="index-n">${rel.length ? counted(rel.length, 'projects') : ''}</span>
            ${arrow()}</a></li>`;
        }).join('')}</ol>
        <p class="visually-hidden">${esc(U.facadeHint)}</p>
      </div></section>`;
  }

  function projectRows(items, compact = false) {
    const P = t().projects;
    return `<ol class="projects${compact ? ' compact' : ''}" aria-label="${esc(P.title)}">${items.map((p) => `
      <li><a href="${href(`projects/${projectSlug(p.id)}`)}">
        ${icon(CATEGORY_ICON[p.key] || 'layers', 'cat')}
        <span class="proj-t">${esc(p.title)}</span>
        <span class="proj-m"><span>${esc(p.client)}</span><span>${esc(p.location)}</span></span>
        <span class="status${isDone(p) ? '' : ' live'}">${esc(p.status)}</span>
        ${arrow()}
      </a></li>`).join('')}</ol>`;
  }

  function projectsBlock() {
    const P = t().projects;
    const items = P.items.filter((p) => state.filter === 'all' || p.key === state.filter);
    const done = P.items.filter(isDone).length;
    const clients = new Set(P.items.map((p) => p.client)).size;
    const places = new Set(P.items.map((p) => p.location)).size;
    return `
      <div class="filters" role="group" aria-label="${esc(ui().category)}">
        ${P.categories.map((c) => `<button type="button" data-filter="${c.key}" aria-pressed="${state.filter === c.key}">${c.key !== 'all' ? icon(CATEGORY_ICON[c.key]) : ''}<span>${esc(c.label)}</span></button>`).join('')}
      </div>
      <p class="tally">${counted(P.items.length, 'projects')}<span class="sep" aria-hidden="true"></span>${counted(clients, 'clients')}<span class="sep" aria-hidden="true"></span>${counted(places, 'places')}<span class="sep" aria-hidden="true"></span>${counted(done, 'completed')}</p>
      <div id="project-list" aria-live="polite">${items.length ? projectRows(items) : `<p class="empty">${esc(P.empty)}</p>`}</div>`;
  }

  function pageProjects() {
    const P = t().projects;
    return `${lintel(P.title, P.lead)}<section class="band"><div class="wrap">${projectsBlock()}</div></section>`;
  }

  // Accessible tabs: arrow keys follow the reading direction.
  function tabs(id, label, items) {
    const cur = items.some((i) => i.key === state.tabs[id]) ? state.tabs[id] : items[0].key;
    return `
      <div class="tabs" data-tabs="${id}">
        <div class="tablist" role="tablist" aria-label="${esc(label)}">${items.map((it) => `<button type="button" role="tab" id="tab-${id}-${it.key}" aria-controls="panel-${id}-${it.key}" aria-selected="${cur === it.key}" tabindex="${cur === it.key ? 0 : -1}" data-tab="${id}" data-key="${it.key}"><span>${esc(it.label)}</span>${it.count !== undefined ? `<span class="count num">${it.count}</span>` : ''}</button>`).join('')}</div>
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
  }

  const docRequest = (label, type = '') => `<div class="lintel-actions"><button class="btn btn-line" type="button" data-request="${esc(label)}" data-type="${type}">${icon('file-text')}<span>${esc(label)}</span></button></div>`;

  function pageEquipment() {
    const E = t().equipment;
    return `${lintel(E.title, E.lead, docRequest(E.cta, 'equipment-rental'))}
      <section class="band"><div class="wrap">
        <div class="prose two"><p>${esc(E.p1)}</p><p>${esc(E.p2)}</p></div>
        ${tabs('fleet', E.title, [
          { key: 'cats', label: E.categoriesHeading, count: E.categories.length, html: `<ul class="grid-list">${E.categories.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>` },
          { key: 'support', label: E.supportHeading, count: E.features.length, html: `<ul class="features">${E.features.map((f) => `<li>${icon(FEATURE_ICON[f.icon] || 'wrench')}<h3>${esc(f.title)}</h3><p>${esc(f.desc)}</p></li>`).join('')}</ul>` },
        ])}
      </div></section>`;
  }

  function pageCerts() {
    const C = t().certifications;
    return `${lintel(C.title, C.lead, docRequest(C.cta))}
      <section class="band"><div class="wrap">
        ${tabs('certs', C.title, [
          { key: 'iso', label: C.isoHeading, count: C.iso.length, html: `<ul class="plaques">${C.iso.map((i) => `<li><span class="code num" dir="ltr">${esc(i.title)}</span><span>${esc(i.desc)}</span></li>`).join('')}</ul>` },
          { key: 'gov', label: C.approvalsHeading, count: C.approvals.length, html: `<ul class="approvals">${C.approvals.map((a) => `<li>${icon('shield-check')}<span>${esc(a)}</span></li>`).join('')}</ul>` },
          { key: 'commit', label: C.commitmentTitle, html: `<p class="statement">${esc(C.commitmentBody)}</p>` },
        ])}
      </div></section>`;
  }

  function pageJourney() {
    const J = t().journey;
    return `${lintel(J.title, J.lead)}
      <section class="band"><div class="wrap">
        ${tabs('journey', J.title, [
          { key: 'milestones', label: ui().milestonesTab, count: J.milestones.length, html: `<ol class="courses">${J.milestones.map((m) => `<li><span class="yr num">${esc(m.year)}</span><div><h3>${esc(m.title)}</h3><p>${esc(m.desc)}</p></div></li>`).join('')}</ol>` },
          { key: 'values', label: J.valuesTitle, count: J.values.length, html: `<ul class="values">${J.values.map((v) => `<li><h3>${esc(v.title)}</h3><p>${esc(v.desc)}</p></li>`).join('')}</ul>` },
        ])}
      </div></section>`;
  }

  function pageLeadership() {
    const L = t().leadership, U = ui();
    const photos = [IMG.chairman, IMG.gm];
    const chair = L.leaders[0];
    return `${lintel(L.title, L.lead)}
      <section class="band"><div class="wrap"><div class="leaders">${L.leaders.map((p, i) => {
        return `<article class="leader">
          <div class="portrait"><span class="leaf leaf-a" aria-hidden="true"></span><span class="leaf leaf-b" aria-hidden="true"></span>${photos[i] ? `<img src="${photos[i]}" alt="${esc(p.name)}" loading="lazy" onerror="this.remove()">` : ''}</div>
          <div class="leader-text"><h2>${esc(p.name)}</h2><p class="role">${esc(p.title)}</p><p>${esc(p.bio)}</p>
            <h3>${esc(L.expertiseHeading)}</h3><ul class="tags">${(p.expertise || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
        </article>`;
      }).join('')}</div></div></section>
      <section class="band band-timber" aria-labelledby="quote-h"><div class="wrap">
        <figure class="quote"><h2 id="quote-h" class="visually-hidden">${esc(L.quoteTitle)}</h2><blockquote><p>${esc(L.quote)}</p></blockquote><figcaption><strong>${esc(chair.name)}</strong><span>${esc(chair.title)}</span></figcaption></figure>
      </div></section>`;
  }

  function field(id, label, control, err, full = false, hint = '') {
    return `<div class="field${full ? ' full' : ''}"><label for="${id}">${esc(label)}</label>${control}${hint ? `<span class="hint" id="${id}-hint">${esc(hint)}</span>` : ''}<span class="err" id="${id}-err" hidden>${icon('circle-alert')}<span>${esc(err || '')}</span></span></div>`;
  }

  function pageContact() {
    const T = t(), C = T.contact, U = ui(), pf = state.prefill || {};
    return `${lintel(C.title, C.lead)}
      <section class="band"><div class="wrap contact-grid">
        <form class="sheet" id="quote-form" novalidate aria-labelledby="quote-h">
          <h2 id="quote-h">${esc(U.quote)}</h2>
          <div class="fields">
            ${field('q-name', C.fields.name, `<input id="q-name" name="name" autocomplete="name" placeholder="${esc(C.placeholders.name)}" aria-describedby="q-name-err">`, C.errors.name)}
            ${field('q-email', C.fields.email, `<input id="q-email" name="email" type="email" autocomplete="email" dir="ltr" placeholder="${esc(C.placeholders.email)}" aria-describedby="q-email-err">`, C.errors.email)}
            ${field('q-company', C.fields.company, `<input id="q-company" name="company" autocomplete="organization" placeholder="${esc(C.placeholders.company)}" aria-describedby="q-company-err">`, C.errors.company)}
            ${field('q-type', C.fields.type, `<select id="q-type" name="type"><option value="">${esc(C.placeholders.type)}</option>${C.typeOptions.map((o) => `<option value="${o.key}"${pf.type === o.key ? ' selected' : ''}>${esc(o.label)}</option>`).join('')}</select>`, '')}
            ${field('q-message', C.fields.message, `<textarea id="q-message" name="message" rows="6" placeholder="${esc(C.placeholders.message)}" aria-describedby="q-message-err">${esc(pf.message || '')}</textarea>`, C.errors.message, true)}
          </div>
          <div class="form-foot"><button class="btn btn-door" type="submit">${icon('send', 'flip')}<span>${esc(C.submit)}</span></button></div>
          <div id="quote-status" aria-live="polite"></div>
        </form>
        <aside class="office" aria-labelledby="office-h">
          <h2 id="office-h">${esc(C.officeHeading)}</h2>
          <dl>
            <div><dt>${icon('map-pin')}${esc(U.office)}</dt><dd>${esc(C.address)}</dd></div>
            <div><dt>${icon('phone')}${esc(U.mobile)}</dt><dd><a href="${tel(MOBILE)}" dir="ltr" class="num">${esc(MOBILE)}</a></dd></div>
            <div><dt>${icon('clock')}${esc(C.hoursHeading)}</dt><dd>${C.hours.map((h) => `<span class="num">${esc(h)}</span>`).join('<br>')}</dd></div>
          </dl>
        </aside>
      </div></section>`;
  }

  function pageCareers() {
    const T = t(), K = T.careers, U = ui();
    return `${lintel(K.title, K.lead, `<div class="lintel-actions"><a class="btn btn-line" href="#apply" data-jump="apply"><span>${esc(K.cta)}</span></a></div>`)}
      <section class="band" aria-labelledby="perks-h"><div class="wrap split">
        <h2 id="perks-h">${esc(K.whyTitle)}</h2>
        <ul class="features">${K.why.map((w) => `<li>${icon(PERK_ICON[w.icon] || 'layers')}<h3>${esc(w.title)}</h3><p>${esc(w.desc)}</p></li>`).join('')}</ul>
      </div></section>
      <div class="tie thin" aria-hidden="true"></div>
      <section class="band" aria-labelledby="roles-h"><div class="wrap">
        <div class="section-head"><h2 id="roles-h">${esc(K.rolesTitle)}</h2><p>${esc(K.rolesLead)}</p></div>
        <table class="roles"><thead><tr><th scope="col">${esc(U.role)}</th><th scope="col">${esc(U.dept)}</th><th scope="col">${esc(U.loc)}</th><th scope="col">${esc(U.type)}</th><th scope="col">${esc(U.exp)}</th><th scope="col"><span class="visually-hidden">${esc(U.apply)}</span></th></tr></thead>
        <tbody>${K.roles.map((r) => `<tr><th scope="row">${esc(r.title)}</th><td data-k="${esc(U.dept)}">${esc(r.dept)}</td><td data-k="${esc(U.loc)}">${esc(r.location)}</td><td data-k="${esc(U.type)}">${esc(r.type)}</td><td data-k="${esc(U.exp)}" class="num">${esc(r.exp)}</td><td><button class="btn btn-line btn-sm" type="button" data-role="${r.slug}">${esc(U.apply)}</button></td></tr>`).join('')}</tbody></table>
      </div></section>
      <section class="band band-stone" id="apply" aria-labelledby="apply-h"><div class="wrap">
        <form class="sheet sheet-solo" id="apply-form" novalidate>
          <h2 id="apply-h">${esc(K.applyTitle)}</h2><p class="sheet-lead">${esc(K.applyLead)}</p>
          <div class="fields">
            ${field('a-name', K.fields.name, `<input id="a-name" name="name" autocomplete="name" placeholder="${esc(K.placeholders.name)}" aria-describedby="a-name-err">`, K.errors.name)}
            ${field('a-email', K.fields.email, `<input id="a-email" name="email" type="email" autocomplete="email" dir="ltr" placeholder="${esc(K.placeholders.email)}" aria-describedby="a-email-err">`, K.errors.email)}
            ${field('a-phone', K.fields.phone, `<input id="a-phone" name="phone" type="tel" autocomplete="tel" dir="ltr" placeholder="${esc(K.placeholders.phone)}" aria-describedby="a-phone-err">`, K.errors.phone)}
            ${field('a-exp', K.fields.exp, `<input id="a-exp" name="exp" type="number" min="0" max="60" inputmode="numeric" placeholder="${esc(K.placeholders.exp)}" aria-describedby="a-exp-err">`, K.errors.exp)}
            ${field('a-role', K.fields.role, `<select id="a-role" name="role" aria-describedby="a-role-err"><option value="">${esc(K.placeholders.role)}</option>${K.roles.map((r) => `<option value="${r.slug}"${state.role === r.slug ? ' selected' : ''}>${esc(r.title)}</option>`).join('')}<option value="other">${esc(K.otherRole)}</option></select>`, K.errors.role, true)}
            <fieldset class="field full cv" aria-describedby="a-cv-hint a-cv-err"><legend>${esc(K.fields.cv)}</legend>
              <label class="sub" for="a-cv">${esc(K.cvLink)}</label>
              <input id="a-cv" name="cv" type="url" dir="ltr" placeholder="${esc(K.placeholders.cv)}" aria-describedby="a-cv-hint a-cv-err">
              <div class="file-row"><span class="sub">${esc(K.cvUpload)}</span><label class="btn btn-line btn-sm" for="a-file">${icon('upload')}<span>${esc(K.cvUploadBtn)}</span></label><input id="a-file" type="file" accept=".pdf,.doc,.docx" class="visually-hidden"><span id="a-file-name" class="file-name">${esc(K.cvNone)}</span></div>
              <span class="hint" id="a-cv-hint">${esc(K.cvHint)}</span>
              <span class="err" id="a-cv-err" hidden>${icon('circle-alert')}<span>${esc(K.errors.cv)}</span></span></fieldset>
            ${field('a-note', K.fields.note, `<textarea id="a-note" name="note" rows="4" placeholder="${esc(K.placeholders.note)}"></textarea>`, '', true)}
          </div>
          <div class="form-foot"><button class="btn btn-timber" type="submit">${icon('send', 'flip')}<span>${esc(K.submit)}</span></button></div>
          <div id="apply-status" aria-live="polite"></div>
        </form>
      </div></section>`;
  }

  function pageService() {
    const T = t(), S = T.services, U = ui();
    const i = svcBySlug(state.sub);
    const s = S.items[i], d = disc(s), rel = delivered(s);
    const prev = S.items[(i + S.items.length - 1) % S.items.length];
    const next = S.items[(i + 1) % S.items.length];
    const relatedPage = d.page ? `<p class="related">${esc(U.related)}: ${textlink(d.page, T[d.page].title)}</p>` : '';
    return `
      ${lintel(s.title, s.desc, `<div class="lintel-actions">${textlink('services', U.allDisciplines, 'back')}</div>`, 'lintel-sub')}
      <section class="band"><div class="wrap svc-grid">
        <div class="elevation" aria-hidden="true">${icon(d.icon, 'elev-icon')}<span class="leaf leaf-a"></span><span class="leaf leaf-b"></span></div>
        <div>
          ${tabs('svc', s.title, [
            { key: 'scope', label: U.scopeTab, count: s.capabilities.length, html: `<ul class="scope">${s.capabilities.map((c) => `<li>${icon('check')}<span>${esc(c)}</span></li>`).join('')}</ul>${relatedPage}` },
            { key: 'projects', label: U.projectsTab, count: rel.length, html: rel.length ? projectRows(rel, true) : `<p class="empty">${esc(U.noProjects)}</p>` },
          ])}
        </div>
      </div></section>
      <nav class="pager" aria-label="${esc(U.allDisciplines)}"><div class="wrap pager-in">
        <a href="${href(`services/${disc(prev).slug}`)}" rel="prev"><span class="k">${esc(U.prevDiscipline)}</span><span class="v">${esc(prev.title)}</span></a>
        <a href="${href(`services/${disc(next).slug}`)}" rel="next"><span class="k">${esc(U.nextDiscipline)}</span><span class="v">${esc(next.title)}</span></a>
      </div></nav>`;
  }

  function pageProject() {
    const T = t(), P = T.projects, U = ui();
    const p = projBySlug(state.sub);
    const cat = P.categories.find((c) => c.key === p.key)?.label || p.category;
    const svc = T.services.items.find((x) => disc(x).projects.includes(p.key));
    const more = P.items.filter((x) => x.key === p.key && x.id !== p.id);
    return `
      ${lintel(p.title, p.desc, `<div class="lintel-actions">${textlink('projects', U.allProjects, 'back')}</div>`, 'lintel-sub')}
      <section class="band"><div class="wrap sheet-split">
        <div><h2>${esc(U.projectSheet)}</h2>
          <dl class="facts">
            <div><dt>${esc(P.labels.client)}</dt><dd>${esc(p.client)}</dd></div>
            <div><dt>${esc(P.labels.location)}</dt><dd>${esc(p.location)}</dd></div>
            <div><dt>${esc(U.category)}</dt><dd>${icon(CATEGORY_ICON[p.key] || 'layers')}<span>${esc(cat)}</span></dd></div>
            <div><dt>${esc(P.labels.status)}</dt><dd><span class="status${isDone(p) ? '' : ' live'}">${esc(p.status)}</span></dd></div>
            ${svc ? `<div><dt>${esc(U.discipline)}</dt><dd>${textlink(`services/${disc(svc).slug}`, svc.title)}</dd></div>` : ''}
          </dl></div>
        <div><h2>${esc(P.labels.scope)}</h2><ul class="scope">${(p.scope || []).map((x) => `<li>${icon('check')}<span>${esc(x)}</span></li>`).join('')}</ul></div>
      </div></section>
      ${more.length ? `<div class="tie thin" aria-hidden="true"></div><section class="band" aria-labelledby="more-h"><div class="wrap"><div class="section-head"><h2 id="more-h">${esc(U.moreProjects)}</h2></div>${projectRows(more, true)}</div></section>` : ''}`;
  }

  const PAGE_FN = { '': pageHome, about: pageAbout, services: pageServices, projects: pageProjects, equipment: pageEquipment, certifications: pageCerts, journey: pageJourney, leadership: pageLeadership, contact: pageContact, careers: pageCareers };

  function pageTitle() {
    const T = t();
    if (state.page === 'services' && state.sub) return `${T.services.items[svcBySlug(state.sub)].title} — ${T.brandLine}`;
    if (state.page === 'projects' && state.sub) return `${projBySlug(state.sub).title} — ${T.brandLine}`;
    if (!state.page) return `${T.brandLine} — ${T.hero.title}`;
    if (state.page === 'careers') return `${T.careers.title} — ${T.brandLine}`;
    return `${T.nav.find((x) => x.id === state.page)?.label || ''} — ${T.brandLine}`;
  }

  // ---------- render ----------
  let lastKey = '';
  function render(force = false) {
    const { lang, page, sub } = parseHash();
    const changed = page !== state.page || lang !== state.lang || sub !== state.sub;
    state.lang = lang; state.page = page; state.sub = sub;
    const key = `${lang}/${page}/${sub}`;
    if (!force && key === lastKey) return;
    if (page !== 'contact') state.prefill = null;
    if (page !== 'careers') state.role = '';
    lastKey = key;

    document.documentElement.lang = lang;
    document.documentElement.dir = rtl() ? 'rtl' : 'ltr';
    document.title = pageTitle();
    $('.skip').textContent = ui().skip;
    $('#proto-note').textContent = ui().proto;
    $('#official').innerHTML = official();
    $('#masthead').innerHTML = masthead();
    $('#main').innerHTML = (page === 'services' && sub) ? pageService() : (page === 'projects' && sub) ? pageProject() : PAGE_FN[page]();
    $('#footer').innerHTML = footer();
    if (changed || force) window.scrollTo({ top: 0, behavior: 'auto' });
    if (state.jump) { const el = document.getElementById(state.jump); state.jump = null; el?.scrollIntoView(); }
    if (changed && !force) $('#main').focus({ preventScroll: true });
  }

  // ---------- facade (signature interaction) ----------
  function setBay(i, focus) {
    state.bay = state.bay === i ? -1 : i;
    const facade = $('.facade');
    if (!facade) return;
    facade.style.setProperty('--cols', facadeCols());
    $$('.bay', facade).forEach((b) => {
      const on = Number(b.dataset.bay) === state.bay;
      b.toggleAttribute('data-open', on);
      const btn = $('.crown', b);
      btn.setAttribute('aria-expanded', String(on));
      $('.crown-state', btn).innerHTML = icons[on ? 'minus' : 'plus'];
      $('.bay-body', b).inert = !on;
    });
    if (focus) $(`#bay-${i}-btn`)?.focus();
  }

  // ---------- menu ----------
  function setMenu(open) {
    const d = $('#drawer'), btn = $('.menu-btn');
    if (!d || !btn) return;
    d.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? ui().close : ui().menu);
    btn.innerHTML = icon(open ? 'x' : 'menu');
    if (open) $('a', d)?.focus();
  }

  // ---------- forms ----------
  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  function setErr(id, bad, msg) {
    const input = document.getElementById(id);
    const err = document.getElementById(`${id}-err`);
    if (err && msg) err.lastChild.textContent = msg;
    input?.setAttribute('aria-invalid', String(bad));
    if (err) err.hidden = !bad;
    return bad;
  }
  function fieldOk(el) {
    const v = el.value.trim();
    if (el.type === 'email') return validEmail(v);
    if (el.id === 'q-message') return v.length >= 10;
    if (el.id === 'a-cv') return !!v || !!$('#a-file')?.files.length;
    return !!v;
  }
  function submitLike(form, statusId, okText, busyText) {
    const btn = $('button[type=submit]', form);
    const label = $('span:last-child', btn);
    const orig = label.textContent;
    btn.setAttribute('aria-busy', 'true'); btn.disabled = true; label.textContent = busyText;
    setTimeout(() => {
      btn.removeAttribute('aria-busy'); btn.disabled = false; label.textContent = orig;
      document.getElementById(statusId).innerHTML = `<div class="notice" role="status">${icon('check')}<div><strong>${esc(okText)}</strong><span>${esc(ui().protoSent)}</span></div></div>`;
      form.reset();
    }, 700);
  }

  // ---------- events ----------
  document.addEventListener('click', (e) => {
    const el = e.target.closest('button, a, .bay');
    if (!el) return;
    const T = t();

    if (el.matches('.menu-btn')) { setMenu($('#drawer').hidden); return; }
    if (el.closest('#drawer') && el.matches('a')) setMenu(false);

    if (el.matches('.crown')) { setBay(Number(el.closest('.bay').dataset.bay)); return; }
    if (el.matches('.bay') && !el.hasAttribute('data-open')) { setBay(Number(el.dataset.bay)); return; }
    if (el.matches('[role=tab]')) { selectTab(el); return; }

    if (el.dataset.request) {
      go('contact', { prefill: { type: el.dataset.type || '', message: `${el.dataset.request}: ` } });
      return;
    }
    if (el.dataset.filter) {
      state.filter = el.dataset.filter;
      const P = T.projects;
      const items = P.items.filter((p) => state.filter === 'all' || p.key === state.filter);
      $$('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === state.filter)));
      $('#project-list').innerHTML = items.length ? projectRows(items) : `<p class="empty">${esc(P.empty)}</p>`;
      return;
    }
    if (el.dataset.role) {
      state.role = el.dataset.role;
      const sel = $('#a-role'); if (sel) { sel.value = state.role; setErr('a-role', false); }
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      $('#apply').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      $('#a-name')?.focus({ preventScroll: true });
      return;
    }
    if (el.dataset.jump) { e.preventDefault(); document.getElementById(el.dataset.jump)?.scrollIntoView(); $('#a-name')?.focus({ preventScroll: true }); return; }

    // The one quote action: on a discipline or project page it carries that
    // page into the contact form.
    if (el.hasAttribute('data-quote')) {
      state.prefill = null;
      if (state.page === 'services' && state.sub) {
        const s = T.services.items[svcBySlug(state.sub)];
        state.prefill = { type: disc(s).type, message: `${T.services.inquireCta} ${s.title}: ` };
      } else if (state.page === 'projects' && state.sub) {
        const p = projBySlug(state.sub);
        state.prefill = { type: CATEGORY_TYPE[p.key] || 'other', message: `${T.projects.detailsCta}: ${p.title} — ` };
      }
      if (state.page === 'contact') { e.preventDefault(); render(true); $('#q-name')?.focus(); }
    }
  });

  document.addEventListener('keydown', (e) => {
    const fwd = rtl() ? 'ArrowLeft' : 'ArrowRight';
    const back = rtl() ? 'ArrowRight' : 'ArrowLeft';
    const tab = e.target.closest?.('[role=tab]');
    if (tab && [fwd, back, 'Home', 'End'].includes(e.key)) {
      const list = $$('[role=tab]', tab.parentElement);
      const i = list.indexOf(tab);
      const j = e.key === 'Home' ? 0 : e.key === 'End' ? list.length - 1 : (i + (e.key === fwd ? 1 : -1) + list.length) % list.length;
      e.preventDefault(); selectTab(list[j], true); return;
    }
    const crown = e.target.closest?.('.crown');
    if (crown && [fwd, back, 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
      const list = $$('.crown');
      const i = list.indexOf(crown);
      const step = (e.key === fwd || e.key === 'ArrowDown') ? 1 : -1;
      const j = e.key === 'Home' ? 0 : e.key === 'End' ? list.length - 1 : (i + step + list.length) % list.length;
      e.preventDefault(); list[j].focus(); return;
    }
    if (e.key === 'Escape' && !$('#drawer')?.hidden) { setMenu(false); $('.menu-btn')?.focus(); }
  });

  document.addEventListener('change', (e) => {
    if (e.target.id === 'a-file') {
      const f = e.target.files[0];
      $('#a-file-name').textContent = f ? f.name : t().careers.cvNone;
      if (f) setErr('a-cv', false);
    }
    if (e.target.tagName === 'SELECT' && e.target.getAttribute('aria-invalid') === 'true' && e.target.value) setErr(e.target.id, false);
  });

  document.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const v = (n) => (form.elements[n]?.value || '').trim();
    if (form.id === 'quote-form') {
      const C = t().contact;
      const ids = ['q-name', 'q-email', 'q-company', 'q-message'];
      const bad = [
        setErr('q-name', !v('name')),
        setErr('q-email', !validEmail(v('email')), v('email') ? C.errors.email : ui().emailRequired),
        setErr('q-company', !v('company')),
        setErr('q-message', v('message').length < 10),
      ];
      const first = ids[bad.indexOf(true)];
      if (first) { document.getElementById(first).focus(); return; }
      submitLike(form, 'quote-status', C.success, C.submitting);
    }
    if (form.id === 'apply-form') {
      const K = t().careers;
      const hasFile = !!$('#a-file').files.length;
      const ids = ['a-name', 'a-email', 'a-phone', 'a-exp', 'a-role', 'a-cv'];
      const bad = [
        setErr('a-name', !v('name')),
        setErr('a-email', !validEmail(v('email')), v('email') ? K.errors.email : ui().emailRequired),
        setErr('a-phone', !v('phone')),
        setErr('a-exp', v('exp') === ''),
        setErr('a-role', !v('role')),
        setErr('a-cv', !v('cv') && !hasFile),
      ];
      const first = ids[bad.indexOf(true)];
      if (first) { document.getElementById(first).focus(); return; }
      submitLike(form, 'apply-status', K.success, K.submitting);
      $('#a-file-name').textContent = K.cvNone;
    }
  });

  // An invalid field stays marked until its value is actually valid.
  document.addEventListener('input', (e) => {
    const el = e.target;
    if (el.getAttribute?.('aria-invalid') !== 'true') return;
    if (fieldOk(el)) setErr(el.id, false);
    else if (el.type === 'email') setErr(el.id, true, el.value.trim() ? t()[el.id.startsWith('a-') ? 'careers' : 'contact'].errors.email : ui().emailRequired);
  });

  addEventListener('hashchange', () => { setMenu(false); render(); });
  matchMedia('(min-width: 75em)').addEventListener('change', () => setMenu(false));
  render(true);
})();
