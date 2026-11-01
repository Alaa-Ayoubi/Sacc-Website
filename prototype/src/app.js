/* SACC prototype — interactive, bilingual, every page.
 *
 * Content is the real site snapshot (window.SACC.content). Only the small
 * set of interface strings below is new copy, written in both languages.
 * Routing uses hash paths that mirror the URLs the integrated site will
 * serve: #/services in Arabic, #/en/services in English.
 */
(() => {
  'use strict';

  const { content, icons, logo } = window.SACC;
  const PAGES = ['', 'about', 'services', 'projects', 'equipment', 'certifications', 'journey', 'leadership', 'contact', 'careers'];
  const PHONE = content.company.phone;
  const MOBILE = content.company.mobile;
  const EMAIL = content.company.email;
  const CR = content.company.cr;
  const IMG = content.images;

  // New interface copy — the only strings not taken from the content bundle.
  const UI = {
    ar: {
      skip: 'تخطَّ إلى المحتوى',
      home: 'الرئيسية',
      quote: 'اطلب عرض سعر',
      menu: 'القائمة',
      close: 'إغلاق',
      langName: 'English',
      langLabel: 'Switch to English',
      sectionHeading: 'ما تنفّذه SACC تحت الشارع الواحد',
      schematic: 'مقطع توضيحي، ليس بمقياس رسم',
      record: 'سجل التأهيل',
      recordIso: 'الجودة والبيئة والسلامة',
      approvalsCount: 'جهات حكومية وشبه حكومية معتمِدة',
      legendHeading: 'اختر شبكة لعرض نطاقها',
      related: 'مشاريع منفّذة في هذا التخصص',
      above: 'فوق الأرض',
      allProjects: 'كل المشاريع',
      fullServices: 'كل التخصصات بالتفصيل',
      meetLeaders: 'تعرّف على القيادة',
      ourJourney: 'مسيرتنا منذ 2007',
      phone: 'الهاتف',
      mobile: 'الجوال',
      email: 'البريد',
      office: 'المكتب',
      cr: 'السجل التجاري',
      depthUnit: 'م',
      proto: 'نموذج تصميم تفاعلي للمراجعة. النماذج لا ترسل أي بيانات.',
      protoSent: 'هذا نموذج للمراجعة: لم يُرسل شيء. بعد الدمج تُحفظ الرسالة ويُبلَّغ الفريق.',
      apply: 'تقدّم لهذه الوظيفة',
      details: 'التفاصيل الكاملة',
      allDisciplines: 'كل التخصصات',
      scopeTab: 'نطاق العمل',
      projectsTab: 'المشاريع المنفّذة',
      noProjects: 'لا توجد مشاريع منشورة في هذا التخصص بعد. اطلب سجل الخبرات وسنرسل لك المشاريع المماثلة.',
      quickQuote: 'اطلب عرض سعر لهذا التخصص',
      prevDiscipline: 'التخصص السابق',
      nextDiscipline: 'التخصص التالي',
      projectSheet: 'بطاقة المشروع',
      category: 'التصنيف',
      discipline: 'التخصص المرتبط',
      moreProjects: 'مشاريع أخرى في التصنيف نفسه',
      milestonesTab: 'محطات المسيرة',
      fleetNote: 'هذا التخصص فوق الأرض: أسطول تملكه SACC وتؤجّره مع الدعم الفني.',
      role: 'الوظيفة', dept: 'القسم', loc: 'الموقع', type: 'الدوام', exp: 'الخبرة',
      present: 'حتى اليوم',
      short: {
        water: 'المياه والصرف', storm: 'تصريف الأمطار', power: 'الكهرباء والإنارة', road: 'طبقات الطريق',
        structure: 'الجدار الاستنادي', landscape: 'التنسيق والري', qc: 'عيّنة فحص', om: 'غرفة تفتيش وصيانة',
      },
    },
    en: {
      skip: 'Skip to content',
      home: 'Home',
      quote: 'Request a Quote',
      menu: 'Menu',
      close: 'Close',
      langName: 'العربية',
      langLabel: 'التبديل إلى العربية',
      sectionHeading: 'What SACC builds under one street',
      schematic: 'Schematic section, not to scale',
      record: 'Qualification record',
      recordIso: 'Quality, environment and safety',
      approvalsCount: 'Government and semi-government approvals',
      legendHeading: 'Select a network to see its scope',
      related: 'Delivered projects in this discipline',
      above: 'Above ground',
      allProjects: 'All projects',
      fullServices: 'Every discipline in detail',
      meetLeaders: 'Meet the leadership',
      ourJourney: 'Our journey since 2007',
      phone: 'Phone',
      mobile: 'Mobile',
      email: 'Email',
      office: 'Office',
      cr: 'Commercial Registration',
      depthUnit: 'm',
      proto: 'Interactive design prototype for review. Forms send nothing.',
      protoSent: 'This is a review prototype: nothing was sent. Once integrated, the message is stored and the team is notified.',
      apply: 'Apply for this role',
      details: 'Full details',
      allDisciplines: 'All disciplines',
      scopeTab: 'Scope of work',
      projectsTab: 'Delivered projects',
      noProjects: 'No published projects in this discipline yet. Request our experience record and we will send comparable projects.',
      quickQuote: 'Request a quote for this discipline',
      prevDiscipline: 'Previous discipline',
      nextDiscipline: 'Next discipline',
      projectSheet: 'Project sheet',
      category: 'Category',
      discipline: 'Related discipline',
      moreProjects: 'More projects in this category',
      milestonesTab: 'Milestones',
      fleetNote: 'This discipline sits above ground: a fleet SACC owns and rents out with technical support.',
      role: 'Role', dept: 'Department', loc: 'Location', type: 'Type', exp: 'Experience',
      present: 'Present',
      short: {
        water: 'Water & sewer', storm: 'Stormwater', power: 'Power & lighting', road: 'Road layers',
        structure: 'Retaining wall', landscape: 'Landscape & irrigation', qc: 'Test core', om: 'Access chamber',
      },
    },
  };

  // Each service (by its content icon) maps to a network in the section,
  // a colour from the logo's arcs, and the project categories it delivered.
  const NETWORK = {
    Droplets: { id: 'water', c: 'var(--water)', ink: 'var(--water-ink)', icon: 'droplets', projects: ['water'], type: 'water-sewerage' },
    CloudRain: { id: 'storm', c: 'var(--sewer)', ink: 'var(--sewer-ink)', icon: 'cloud-rain', projects: ['water'], type: 'water-sewerage' },
    Zap: { id: 'power', c: 'var(--power)', ink: 'var(--power-ink)', icon: 'zap', projects: ['electrical'], type: 'other' },
    Route: { id: 'road', c: 'var(--road)', ink: 'var(--road-ink)', icon: 'route', projects: ['roads'], type: 'roads-asphalt' },
    Construction: { id: 'structure', c: 'var(--concrete)', ink: 'var(--ink-2)', icon: 'construction', projects: [], type: 'bridges-tunnels' },
    Building2: { id: 'landscape', c: 'var(--sewer)', ink: 'var(--sewer-ink)', icon: 'trees', projects: ['urban'], type: 'urban-development' },
    ShieldCheck: { id: 'qc', c: 'var(--aggregate)', ink: 'var(--ink-2)', icon: 'flask-conical', projects: [], type: 'other' },
    Truck: { id: 'fleet', c: 'var(--marking)', ink: 'var(--road-ink)', icon: 'truck', projects: [], type: 'equipment-rental' },
    Settings: { id: 'om', c: 'var(--sewer)', ink: 'var(--sewer-ink)', icon: 'settings', projects: [], type: 'other' },
  };
  const SERVICE_SLUG = { water: 'water-sewerage', storm: 'stormwater', power: 'electrical-solar', road: 'roads-asphalt', structure: 'bridges-tunnels', landscape: 'landscaping', qc: 'quality-laboratory', fleet: 'equipment-rental', om: 'operation-maintenance' };
  const PROJECT_SERVICE = { water: 'Droplets', roads: 'Route', electrical: 'Zap', urban: 'Building2' };
  const slugify = (x) => String(x).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const projectSlug = (id) => slugify(content.en.projects.items.find((p) => p.id === id)?.title || id);
  const PROJECT_COLOR = { water: 'var(--water)', roads: 'var(--road)', electrical: 'var(--power)', urban: 'var(--sewer)' };

  const state = { lang: 'ar', page: '', sub: '', svc: 0, picked: false, filter: 'all', open: new Set(), prefill: null, role: '', tabs: {} };

  // ---------- helpers ----------
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const icon = (name, cls = '') => `<span class="icon ${cls}" aria-hidden="true">${icons[name] || ''}</span>`;
  const t = () => content[state.lang];
  const ui = () => UI[state.lang];
  const rtl = () => state.lang === 'ar';
  const arrow = () => icon(rtl() ? 'arrow-left' : 'arrow-right');
  const href = (page, lang = state.lang) => `#/${lang === 'en' ? 'en/' : ''}${page}`;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const net = (svc) => NETWORK[svc.icon] || NETWORK.Settings;
  const svcSlug = (svc) => SERVICE_SLUG[net(svc).id];
  const svcBySlug = (slug) => t().services.items.findIndex((x) => svcSlug(x) === slug);
  const projBySlug = (slug) => t().projects.items.find((p) => projectSlug(p.id) === slug);

  function parseHash() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    let lang = 'ar';
    if (parts[0] === 'en') { lang = 'en'; parts.shift(); }
    const page = PAGES.includes(parts[0] || '') ? (parts[0] || '') : '';
    let sub = parts[1] || '';
    if (page === 'services' && !Object.values(SERVICE_SLUG).includes(sub)) sub = '';
    if (page === 'projects' && !content.en.projects.items.some((p) => projectSlug(p.id) === sub)) sub = '';
    if (page !== 'services' && page !== 'projects') sub = '';
    return { lang, page, sub };
  }

  function go(page, opts = {}) {
    if (opts.prefill !== undefined) state.prefill = opts.prefill;
    if (opts.role !== undefined) state.role = opts.role;
    const target = href(page);
    if (location.hash === target) render(true); else location.hash = target;
  }

  // ---------- masthead + footer ----------
  function masthead() {
    const T = t(), U = ui();
    const links = T.nav.map((n) => `<a href="${href(n.id)}"${state.page === n.id ? ' aria-current="page"' : ''}>${esc(n.label)}</a>`).join('');
    const other = state.lang === 'ar' ? 'en' : 'ar';
    const here = state.sub ? `${state.page}/${state.sub}` : state.page;
    return `
      <div class="masthead-in">
        <a class="brand" href="${href('')}" aria-label="${esc(T.brandLine)} — ${esc(U.home)}"><img src="${logo}" alt="${esc(T.brandLine)}" width="136" height="34" /></a>
        <nav class="nav" aria-label="${esc(U.menu)}">${links}<a href="${href('careers')}"${state.page === 'careers' ? ' aria-current="page"' : ''}>${esc(T.navCareers)}</a></nav>
        <div class="mast-tools">
          <a class="lang" href="${href(here, other)}" hreflang="${other}" lang="${other}" aria-label="${esc(U.langLabel)}">${icon('languages')}<span>${esc(U.langName)}</span></a>
          <a class="btn btn-mark" href="${href('contact')}" data-quote>${esc(U.quote)}</a>
          <button class="menu-btn" type="button" aria-expanded="false" aria-controls="drawer" aria-label="${esc(U.menu)}">${icon('menu')}</button>
        </div>
      </div>
      <div class="drawer" id="drawer">
        ${[...T.nav, { id: 'careers', label: T.navCareers }].map((n) => `<a class="navlink" href="${href(n.id)}"${state.page === n.id ? ' aria-current="page"' : ''}><span>${esc(n.label)}</span>${arrow()}</a>`).join('')}
        <a class="btn btn-mark" href="${href('contact')}" data-quote>${esc(U.quote)}</a>
      </div>`;
  }

  function officialBar() {
    const T = t(), U = ui();
    return `<div class="officialbar-in">
      <ul class="creds"><li>${icon('file-text')}${esc(U.cr)} <span class="num">${esc(CR)}</span></li><li>${icon('shield-check')}${esc(T.why.items[1])}</li><li>${icon('check')}ISO 9001 · 14001 · 45001</li></ul>
      <ul class="reach"><li>${icon('phone')}<a href="tel:${PHONE.replace(/\s/g, '')}"><span class="ltr num">${esc(PHONE)}</span></a></li><li>${icon('mail')}<a href="mailto:${EMAIL}">${esc(EMAIL)}</a></li></ul>
    </div>`;
  }

  function footer() {
    const T = t(), U = ui(), F = T.footer;
    return `
      <div class="roadedge" aria-hidden="true"></div>
      <div class="footer-grid">
        <div><img src="${logo}" alt="${esc(T.brandLine)}" width="136" height="34" /><p>${esc(F.tagline)}</p></div>
        <div><h2>${esc(F.quickLinks)}</h2><ul>${T.nav.slice(0, 5).map((n) => `<li><a href="${href(n.id)}">${esc(n.label)}</a></li>`).join('')}<li><a href="${href('careers')}">${esc(T.navCareers)}</a></li></ul></div>
        <div><h2>${esc(F.certsHeading)}</h2><ul>${F.certs.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></div>
        <div><h2>${esc(F.contactHeading)}</h2><ul>
          <li><a href="tel:${PHONE.replace(/\s/g, '')}"><span class="ltr">${esc(PHONE)}</span></a></li>
          <li><a href="tel:${MOBILE.replace(/\s/g, '')}"><span class="ltr">${esc(MOBILE)}</span></a></li>
          <li><a href="mailto:${EMAIL}">${esc(EMAIL)}</a></li>
          <li>${esc(T.contact.address)}</li>
          <li>${esc(U.cr)} <span class="num">${esc(CR)}</span></li>
        </ul></div>
      </div>
      <div class="footer-base"><span>${esc(F.rights)}</span><span>${esc(T.brandLine)}</span></div>`;
  }

  // ---------- the street section ----------
  const W = 1200, H = 470, TOP = 34, SURF = 70, M = 80;
  function sectionSVG() {
    const U = ui(), short = U.short;
    const R = rtl();
    const X = (x) => (R ? W - x : x);
    const rx = (x, w) => (R ? W - x - w : x); // rect x after mirroring
    const anchor = (a) => (a === 'middle' ? 'middle' : (R ? (a === 'start' ? 'end' : 'start') : a));
    const rect = (x, y, w, h, attrs = '') => `<rect x="${rx(x, w)}" y="${y}" width="${w}" height="${h}" ${attrs}/>`;
    const circ = (cx, cy, r, attrs = '') => `<circle cx="${X(cx)}" cy="${cy}" r="${r}" ${attrs}/>`;
    const line = (x1, y1, x2, y2, attrs = '') => `<line x1="${X(x1)}" y1="${y1}" x2="${X(x2)}" y2="${y2}" ${attrs}/>`;
    const svcIndex = Object.fromEntries(t().services.items.map((s, i) => [net(s).id, i]));
    const tag = (id, px, py, lx, ly, a = 'middle') => `
      <g class="tag" data-anchor="${anchor(a)}">
        ${line(px, py, lx, ly + (ly < py ? 8 : -8), 'stroke="#f3f2ed" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.8"')}
        <circle cx="${X(px)}" cy="${py}" r="3" fill="#f3f2ed"/>
        <rect rx="2" fill="#f3f4f3" x="0" y="0" width="0" height="0"/>
        <text x="${X(lx)}" y="${ly}" text-anchor="${anchor(a)}" dominant-baseline="middle" font-size="15" font-family="Readex Pro, system-ui, sans-serif" font-weight="500" fill="#17181a">${esc(short[id])}</text>
      </g>`;
    const group = (id, i, body, glow) => `<g class="net${state.picked && t().services.items[state.svc] && net(t().services.items[state.svc]).id === id ? ' on' : ''}" data-net="${id}" data-svc="${svcIndex[id]}" style="--i:${i}" role="button" tabindex="-1" aria-label="${esc(t().services.items[svcIndex[id]].title)}">${glow ? `<g class="hitarea">${glow.replace(/fill="none"/g, 'fill="transparent"')}</g><g class="glow">${glow}</g>` : ''}${body}</g>`;

    // dotted aggregate + basalt textures
    const defs = `
      <defs>
        <pattern id="agg" width="11" height="9" patternUnits="userSpaceOnUse"><rect width="11" height="9" fill="#8b857a"/><circle cx="3" cy="3" r="1.3" fill="#6f6a61"/><circle cx="8.5" cy="6.5" r="1" fill="#a39d91"/></pattern>
        <pattern id="sub" width="13" height="11" patternUnits="userSpaceOnUse"><rect width="13" height="11" fill="#a59d8c"/><circle cx="4" cy="4" r="1.1" fill="#8d8676"/><circle cx="10" cy="8" r="0.9" fill="#bdb5a4"/></pattern>
        <pattern id="bas" width="23" height="19" patternUnits="userSpaceOnUse"><rect width="23" height="19" fill="#2e2a27"/><path d="M3 5l3-2 2 3-3 1z" fill="#3c3632"/><path d="M14 13l4-1 1 3-4 1z" fill="#37322e"/><circle cx="18" cy="4" r="1" fill="#46403a"/></pattern>
        <pattern id="sand" width="9" height="8" patternUnits="userSpaceOnUse"><rect width="9" height="8" fill="#c9a46a"/><circle cx="2" cy="2" r="0.7" fill="#b8925a"/><circle cx="6.5" cy="5.5" r="0.6" fill="#d8b97f"/></pattern>
      </defs>`;

    // strata (settle once)
    const strata = `
      <g class="stratum" style="--i:5">${rect(0, 250, W, H - TOP - 250, 'fill="url(#bas)"')}</g>
      <g class="stratum" style="--i:4">${rect(0, 96, W, 154, 'fill="url(#sand)"')}</g>
      <g class="stratum" style="--i:3">${rect(160, 130, 880, 40, 'fill="url(#sub)"')}</g>
      <g class="stratum" style="--i:2">${rect(160, 96, 880, 34, 'fill="url(#agg)"')}</g>
      <g class="stratum" style="--i:1">${rect(160, 82, 880, 14, 'fill="#3a3b3f"')}${rect(0, 74, 150, 22, 'fill="#d9cfbd"')}${rect(1050, 74, 150, 22, 'fill="#d9cfbd"')}</g>
      <g class="stratum" style="--i:0">${rect(160, SURF, 880, 12, 'fill="#0f1012"')}${rect(0, 62, 150, 12, 'fill="#b7b2a7"')}${rect(1050, 62, 150, 12, 'fill="#b7b2a7"')}${rect(150, 58, 12, 52, 'fill="#a7a298"')}${rect(1038, 58, 12, 52, 'fill="#a7a298"')}
        ${rect(590, 68, 20, 4, 'fill="#f6b81c"')}${rect(370, 68, 20, 4, 'fill="#e9e7df"')}${rect(810, 68, 20, 4, 'fill="#e9e7df"')}</g>`;

    // depth ruler at the inline-start edge
    let ruler = '';
    for (let k = 0; k <= 4; k += 1) {
      const y = SURF + k * M;
      ruler += line(0, y, 12, y, 'stroke="#f3f2ed" stroke-width="1.5" opacity="0.85"');
      ruler += `${rect(14, y + 4, 50, 20, 'rx="2" fill="rgba(23,24,26,0.78)"')}<text x="${X(39)}" y="${y + 14.5}" text-anchor="middle" dominant-baseline="middle" font-size="12" font-family="Readex Pro, system-ui, sans-serif" fill="#f3f2ed">${k === 0 ? '0.0' : `−${k}.0`} ${U.depthUnit}</text>`;
    }
    ruler = `<g aria-hidden="true">${line(4, SURF, 4, SURF + 4 * M, 'stroke="#f3f2ed" stroke-width="1" opacity="0.5"')}${ruler}</g>`;

    const nets = [
      group('road', 0,
        `${rect(160, SURF, 880, 100, 'class="hit"')}`,
        `${rect(158, SURF - 2, 884, 104, 'fill="none" stroke="#f6b81c" stroke-width="3"')}`),
      group('water', 1,
        `${circ(330, 215, 36, 'fill="#dcc79c"')}${circ(330, 215, 25, 'fill="#3fa29b"')}${circ(330, 215, 16, 'fill="#123c39"')}
         ${circ(640, 345, 46, 'fill="#4a433d"')}${circ(640, 345, 37, 'fill="#3fa29b"')}${circ(640, 345, 27, 'fill="#10302d"')}`,
        `${circ(330, 215, 41, 'fill="none" stroke="#3fa29b" stroke-width="3"')}${circ(640, 345, 51, 'fill="none" stroke="#3fa29b" stroke-width="3"')}`),
      group('om', 2,
        `${rect(612, 72, 56, 236, 'fill="rgba(15,16,18,0.55)" stroke="#a7a298" stroke-width="4"')}
         ${[100, 130, 160, 190, 220, 250, 280].map((y) => line(626, y, 654, y, 'stroke="#a7a298" stroke-width="2.5"')).join('')}
         ${rect(604, 64, 72, 8, 'fill="#55524c"')}`,
        `${rect(606, 60, 68, 254, 'fill="none" stroke="#6cbf88" stroke-width="3"')}`),
      group('storm', 3,
        `${rect(820, 268, 124, 76, 'fill="#a7a298"')}${rect(832, 280, 100, 52, 'fill="#173325"')}${rect(832, 318, 100, 14, 'fill="#2f6b4a" opacity="0.8"')}`,
        `${rect(814, 262, 136, 88, 'fill="none" stroke="#6cbf88" stroke-width="3"')}`),
      group('power', 4,
        `${rect(1062, 0, 76, 140, 'class="hit"')}${line(1120, 64, 1120, 6, 'stroke="#e5862b" stroke-width="5"')}${line(1120, 10, 1082, 10, 'stroke="#e5862b" stroke-width="4"')}${rect(1068, 8, 20, 7, 'fill="#f6b81c"')}
         ${line(1120, 74, 1120, 140, 'stroke="#e5862b" stroke-width="2" stroke-dasharray="5 4"')}
         ${rect(1066, 140, 100, 58, 'fill="#9a958c"')}
         ${[[1086, 157], [1116, 157], [1146, 157], [1086, 181], [1116, 181]].map(([x, y]) => circ(x, y, 9, 'fill="#2a1a0c" stroke="#e5862b" stroke-width="3.5"')).join('')}
         ${circ(1146, 181, 6, 'fill="#2a1a0c" stroke="#f6b81c" stroke-width="2.5"')}`,
        `${rect(1060, 134, 112, 70, 'fill="none" stroke="#e5862b" stroke-width="3"')}`),
      group('structure', 5,
        `${rect(1176, 24, 18, 268, 'fill="#a7a298"')}${rect(1138, 290, 62, 20, 'fill="#a7a298"')}${[60, 110, 160, 210, 260].map((y) => line(1176, y, 1194, y, 'stroke="#8a857b" stroke-width="1.5"')).join('')}`,
        `${rect(1132, 18, 68, 298, 'fill="none" stroke="#a7a298" stroke-width="3"')}`),
      group('landscape', 6,
        `${rect(66, 62, 64, 46, 'fill="#4e3c2b"')}${rect(94, 18, 8, 46, 'fill="#6b5338"')}${circ(98, 20, 24, 'fill="#6cbf88"')}${circ(84, 30, 14, 'fill="#5aa874"')}${circ(112, 32, 12, 'fill="#5aa874"')}
         ${line(40, 100, 140, 100, 'stroke="#6cbf88" stroke-width="3" stroke-dasharray="2 6"')}`,
        `${rect(60, -6, 76, 118, 'fill="none" stroke="#6cbf88" stroke-width="3"')}`),
      group('qc', 7,
        `${rect(470, 64, 22, 108, 'fill="rgba(233,231,223,0.18)" stroke="#e9e7df" stroke-width="2" stroke-dasharray="6 4"')}`,
        `${rect(464, 58, 34, 120, 'fill="none" stroke="#e9e7df" stroke-width="3"')}`),
    ].join('');

    const tags = [
      tag('landscape', 120, 22, 150, 30, 'start'),
      tag('road', 420, SURF + 6, 420, 30),
      tag('om', 640, 64, 700, 30, 'start'),
      tag('power', 1082, 10, 1040, 30, 'end'),
      tag('qc', 481, 172, 481, 208),
      tag('water', 330, 251, 330, 300),
      tag('storm', 882, 344, 882, 392),
      tag('structure', 1170, 310, 1172, 360, 'end'),
    ].join('');

    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" style="direction:ltr" role="group" aria-labelledby="xsec-h" xmlns="http://www.w3.org/2000/svg">${defs}<g transform="translate(0 ${TOP})">${strata}${nets}${ruler}${tags}</g></svg>`;
  }

  // Fit each tag's paper box to its rendered text.
  function fitTags(root) {
    $$('.tag', root).forEach((g) => {
      const text = $('text', g), box = $('rect', g);
      try {
        const b = text.getBBox();
        box.setAttribute('x', b.x - 8); box.setAttribute('y', b.y - 4);
        box.setAttribute('width', b.width + 16); box.setAttribute('height', b.height + 8);
      } catch { /* not rendered yet */ }
    });
  }

  function record() {
    const T = t(), U = ui(), S = T.stats;
    const rows = [
      [S[0].value, S[0].label],
      ['NWC', T.why.items[1]],
      ['ISO', `9001 · 14001 · 45001 — ${U.recordIso}`],
      [S[2].value, S[2].label],
      [S[1].value, S[1].label],
      [String(T.certifications.approvals.length), U.approvalsCount],
    ];
    return `
      <aside class="record" aria-labelledby="record-h">
        <h2 id="record-h">${esc(U.record)}</h2>
        <dl>${rows.map(([k, v]) => `<div class="record-row"><dt><span class="ltr">${esc(k)}</span></dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
        <div class="record-cta"><a class="textlink" href="${href('certifications')}">${esc(T.certifications.cta)} ${arrow()}</a></div>
      </aside>`;
  }

  function streetSection() {
    const U = ui();
    return `
      <section class="xsec" aria-labelledby="xsec-h">
        <h2 id="xsec-h" class="visually-hidden">${esc(U.sectionHeading)}</h2>
        <div class="xsec-grid">
          <figure class="xsec-figure settle${state.picked ? ' picked' : ''}" id="xsec">${sectionSVG()}<figcaption class="xsec-caption">${esc(U.schematic)}</figcaption></figure>
          ${record()}
        </div>
      </section>`;
  }

  function disciplinePanel() {
    const T = t(), U = ui();
    const s = T.services.items[state.svc];
    const n = net(s);
    const rel = T.projects.items.filter((p) => n.projects.includes(p.key));
    return `
      <div class="discipline fade-swap" id="discipline" style="--c:${n.c};--c-ink:${n.ink}" aria-live="polite">
        <div class="discipline-head">${icon(n.icon)}<h3>${esc(s.title)}</h3></div>
        <p>${esc(s.desc)}</p>
        <ul class="caps">${s.capabilities.map((c) => `<li>${icon('check')}<span>${esc(c)}</span></li>`).join('')}</ul>
        ${rel.length ? `<div class="related"><h4>${esc(U.related)}</h4><ul>${rel.map((p) => `<li><a class="textlink" href="${href(`projects/${projectSlug(p.id)}`)}">${esc(p.title)}</a><span>${esc(p.client)} · ${esc(p.location)}</span></li>`).join('')}</ul></div>` : ''}
        <div class="actions"><button class="btn btn-mark" type="button" data-inquire="${state.svc}">${esc(T.services.inquireCta)} ${esc(s.title)}</button><a class="textlink" href="${href(`services/${svcSlug(s)}`)}">${esc(U.details)} ${arrow()}</a></div>
      </div>`;
  }

  function reader() {
    const T = t(), U = ui();
    return `
      <section class="reader" aria-label="${esc(T.services.title)}">
        <div class="reader-grid">
          <div class="legend">
            <h2>${esc(U.legendHeading)}</h2>
            <ol>${T.services.items.map((s, i) => {
              const n = net(s);
              return `<li><button type="button" data-svc="${i}" aria-pressed="${i === state.svc}" aria-controls="discipline" style="--c:${n.c}"><span class="seg"></span><span>${esc(s.title)}</span>${n.id === 'fleet' ? `<span class="where">${esc(U.above)}</span>` : ''}</button></li>`;
            }).join('')}</ol>
          </div>
          ${disciplinePanel()}
        </div>
      </section>`;
  }

  // ---------- shared blocks ----------
  function pagehead(title, lead, extra = '') {
    return `
      <section class="pagehead"><div class="wrap"><h1>${esc(title)}</h1>${lead ? `<p>${esc(lead)}</p>` : ''}${extra}</div></section>
      <div class="strata" aria-hidden="true"><i></i><i></i><i></i><i></i></div>`;
  }

  function companyBlock(withWhy = true) {
    const T = t(), I = T.intro, Y = T.why;
    return `
      <div class="head"><h2>${esc(I.title)}</h2></div>
      <div class="company">
        <p class="lead">${esc(I.p1)}</p>
        <div class="cols"><p>${esc(I.p2)}</p><p>${esc(I.p3)}</p></div>
      </div>
      ${withWhy ? `<div class="why"><h3>${esc(Y.title)}</h3><p>${esc(Y.lead)}</p><ul class="checks">${Y.items.map((w) => `<li>${icon('check')}<span>${esc(w)}</span></li>`).join('')}</ul></div>` : ''}`;
  }

  function proofBlock(full = false) {
    const C = t().certifications;
    return `
      <div class="head"><h2>${esc(C.title)}</h2><p>${esc(C.lead)}</p></div>
      <div class="proof">
        <div><h3>${esc(C.isoHeading)}</h3><ul class="iso">${C.iso.map((i) => `<li><strong class="num">${esc(i.title)}</strong><span>${esc(i.desc)}</span></li>`).join('')}</ul></div>
        <div><h3>${esc(C.approvalsHeading)}</h3><ul class="approvals">${C.approvals.map((a) => `<li>${icon('shield-check')}<span>${esc(a)}</span></li>`).join('')}</ul></div>
      </div>
      <div class="proof-foot">
        ${full ? `<p><strong>${esc(C.commitmentTitle)}.</strong> ${esc(C.commitmentBody)}</p>` : ''}
        <button class="btn btn-ink" type="button" data-request="${esc(C.cta)}">${icon('file-text')}${esc(C.cta)}</button>
      </div>`;
  }

  function logsBlock(limit) {
    const P = t().projects;
    const items = P.items.filter((p) => state.filter === 'all' || p.key === state.filter);
    const shown = limit ? items.slice(0, limit) : items;
    const done = P.items.filter((p) => /complete|منجز|مكتمل/i.test(p.status)).length;
    const clients = new Set(P.items.map((p) => p.client)).size;
    const places = new Set(P.items.map((p) => p.location)).size;
    return `
      <div class="filters" role="group" aria-label="${esc(P.title)}">
        ${P.categories.map((c) => `<button type="button" data-filter="${c.key}" aria-pressed="${state.filter === c.key}">${c.key !== 'all' ? `<span class="seg" style="--c:${PROJECT_COLOR[c.key]}"></span>` : ''}${esc(c.label)}</button>`).join('')}
      </div>
      <p class="tally"><strong class="num">${P.items.length}</strong> ${esc(P.statLabels.projects)} · <strong class="num">${clients}</strong> ${esc(P.statLabels.clients)} · <strong class="num">${places}</strong> ${esc(P.statLabels.regions)} · <strong class="num">${done}</strong> ${esc(P.statLabels.completed)}</p>
      ${shown.length ? `<ol class="logs">${shown.map((p) => {
        const open = state.open.has(p.id);
        const live = !/complete|منجز|مكتمل/i.test(p.status);
        return `
          <li class="log" id="project-${p.id}">
            <div class="log-row">
              <span class="seg" style="--c:${PROJECT_COLOR[p.key]}" aria-hidden="true"></span>
              <h3><a href="${href(`projects/${projectSlug(p.id)}`)}">${esc(p.title)}</a></h3>
              <p class="meta"><span>${esc(P.labels.client)}: ${esc(p.client)}</span><span>${esc(P.labels.location)}: ${esc(p.location)}</span></p>
              <span class="status ${live ? 'live' : 'done'}">${esc(p.status)}</span>
              <button class="toggle" type="button" aria-expanded="${open}" aria-controls="pd-${p.id}" data-toggle="${p.id}">${esc(open ? P.collapse : P.expand)}${icon('chevron-down')}</button>
            </div>
            <div class="log-detail" id="pd-${p.id}"${open ? '' : ' hidden'}>
              <p>${esc(p.desc)}</p>
              <div class="scope"><h4>${esc(P.labels.scope)}</h4><ul>${(p.scope || []).map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
                <button class="btn btn-line" type="button" data-inquire-project="${p.id}">${esc(P.detailsCta)} ${arrow()}</button></div>
            </div>
          </li>`;
      }).join('')}</ol>` : `<p class="empty">${esc(P.empty)}</p>`}`;
  }

  function fleetBlock(full = false) {
    const E = t().equipment;
    return `
      <div class="fleet">
        <div><div class="head"><h2>${esc(E.title)}</h2><p>${esc(E.lead)}</p></div>
          <div class="body"><p>${esc(E.p1)}</p>${full ? `<p>${esc(E.p2)}</p>` : ''}</div>
          <div class="actions" style="margin-top:28px"><button class="btn btn-mark" type="button" data-request="${esc(E.cta)}" data-type="equipment-rental">${esc(E.cta)}</button></div>
        </div>
        <div><h3>${esc(E.categoriesHeading)}</h3><ul class="cats">${E.categories.map((c) => `<li>${icon('truck')}<span>${esc(c)}</span></li>`).join('')}</ul></div>
      </div>
      ${full ? `<div class="support">${E.features.map((f) => `<div>${icon({ Wrench: 'wrench', Satellite: 'satellite', HardHat: 'hard-hat', Clock: 'clock' }[f.icon] || 'wrench')}<h4>${esc(f.title)}</h4><p>${esc(f.desc)}</p></div>`).join('')}</div>` : ''}`;
  }

  function quoteBlock() {
    const L = t().leadership;
    const chair = L.leaders[0];
    return `
      <figure class="quote"><span class="rule" aria-hidden="true"></span>
        <div><blockquote>${esc(L.quote)}</blockquote><figcaption><strong>${esc(chair.name)}</strong>${esc(chair.title)}</figcaption></div>
      </figure>`;
  }

  function channels() {
    const T = t(), U = ui();
    return `
      <ul class="channels">
        <li>${icon('phone')}<span class="k">${esc(U.phone)}</span><a href="tel:${PHONE.replace(/\s/g, '')}"><span class="ltr num">${esc(PHONE)}</span></a></li>
        <li>${icon('phone')}<span class="k">${esc(U.mobile)}</span><a href="tel:${MOBILE.replace(/\s/g, '')}"><span class="ltr num">${esc(MOBILE)}</span></a></li>
        <li>${icon('mail')}<span class="k">${esc(U.email)}</span><a href="mailto:${EMAIL}">${esc(EMAIL)}</a></li>
        <li>${icon('map-pin')}<span class="k">${esc(U.office)}</span><span>${esc(T.contact.address)}</span></li>
        <li>${icon('clock')}<span class="k">${esc(T.contact.hoursHeading)}</span><span>${T.contact.hours.map(esc).join('<br>')}</span></li>
      </ul>`;
  }

  function closeBlock() {
    const T = t(), U = ui();
    return `
      <section class="band"><div class="wrap close-grid">
        <div><h2>${esc(T.contact.title)}</h2><p>${esc(T.contact.lead)}</p>
          <div class="actions" style="margin-top:28px"><a class="btn btn-mark" href="${href('contact')}" data-quote>${esc(U.quote)}</a></div></div>
        ${channels()}
      </div></section>`;
  }

  // ---------- pages ----------
  function pageHome() {
    const T = t(), U = ui(), Hh = T.hero;
    return `
      <section class="opening" aria-labelledby="h1">
        <div class="opening-grid">
          <h1 id="h1">${esc(Hh.title)}</h1>
          <div class="opening-side">
            <p>${esc(Hh.lead)}</p>
            <div class="actions">
              <a class="btn btn-mark" href="${href('contact')}" data-quote>${esc(U.quote)}</a>
              <a class="btn btn-line-dark" href="${href('services')}">${esc(Hh.cta1)}</a>
            </div>
          </div>
        </div>
      </section>
      ${streetSection()}
      ${reader()}
      <section class="band band-paper"><div class="wrap">${companyBlock(true)}</div></section>
      <section class="band band-sand"><div class="wrap">${proofBlock(false)}</div></section>
      <section class="band"><div class="wrap">
        <div class="head"><h2>${esc(T.projects.title)}</h2><p>${esc(T.projects.lead)}</p></div>
        ${logsBlock()}
      </div></section>
      <section class="band band-basalt"><div class="wrap">${fleetBlock(false)}</div></section>
      <section class="band band-asphalt"><div class="wrap">${quoteBlock()}
        <div class="actions" style="margin-top:36px"><a class="textlink" href="${href('leadership')}">${esc(U.meetLeaders)} ${arrow()}</a><a class="textlink" href="${href('journey')}">${esc(U.ourJourney)} ${arrow()}</a></div>
      </div></section>
      ${closeBlock()}`;
  }

  function pageAbout() {
    const T = t(), U = ui();
    return `
      ${pagehead(T.intro.title, T.hero.lead)}
      <section class="band band-paper"><div class="wrap">${companyBlock(true)}</div></section>
      <section class="band band-asphalt"><div class="wrap">${quoteBlock()}
        <div class="actions" style="margin-top:36px"><a class="textlink" href="${href('leadership')}">${esc(U.meetLeaders)} ${arrow()}</a><a class="textlink" href="${href('journey')}">${esc(U.ourJourney)} ${arrow()}</a></div></div></section>
      ${closeBlock()}`;
  }

  function pageServices() {
    const T = t(), S = T.services;
    return `
      ${pagehead(S.title, S.lead)}
      ${streetSection()}
      ${reader()}
      <section class="band band-paper"><div class="wrap">
        <ol class="svc-list">${S.items.map((s, i) => {
          const n = net(s);
          return `<li class="svc" style="--c:${n.c}">${icon(n.icon)}<div><h3><a href="${href(`services/${svcSlug(s)}`)}">${esc(s.title)}</a></h3><p>${esc(s.desc)}</p><a class="textlink svc-more" href="${href(`services/${svcSlug(s)}`)}">${esc(ui().details)} ${arrow()}</a></div>
            <ul aria-label="${esc(S.capabilitiesHeading)}">${s.capabilities.map((c) => `<li><span class="seg" style="--c:${n.c}"></span>${esc(c)}</li>`).join('')}</ul>
            <button class="btn btn-line" type="button" data-inquire="${i}">${esc(S.inquireCta)} ${arrow()}</button></li>`;
        }).join('')}</ol>
      </div></section>
      ${closeBlock()}`;
  }

  function pageProjects() {
    const P = t().projects;
    return `${pagehead(P.title, P.lead)}<section class="band"><div class="wrap">${logsBlock()}</div></section>${closeBlock()}`;
  }

  function pageEquipment() {
    const E = t().equipment;
    const icons4 = { Wrench: 'wrench', Satellite: 'satellite', HardHat: 'hard-hat', Clock: 'clock' };
    return `${pagehead(E.title, E.lead, `<div class="actions"><button class="btn btn-mark" type="button" data-request="${esc(E.cta)}" data-type="equipment-rental">${esc(E.cta)}</button></div>`)}
      <section class="band band-basalt"><div class="wrap">
        <div class="fleet-intro"><p>${esc(E.p1)}</p><p>${esc(E.p2)}</p></div>
        ${tabs('fleet', E.title, [
          { key: 'cats', label: E.categoriesHeading, count: E.categories.length, html: `<ul class="cats wide">${E.categories.map((c) => `<li>${icon('truck')}<span>${esc(c)}</span></li>`).join('')}</ul>` },
          { key: 'support', label: E.supportHeading, count: E.features.length, html: `<div class="support">${E.features.map((f) => `<div>${icon(icons4[f.icon] || 'wrench')}<h4>${esc(f.title)}</h4><p>${esc(f.desc)}</p></div>`).join('')}</div>` },
        ], 'dark')}
      </div></section>${closeBlock()}`;
  }

  function pageCerts() {
    const C = t().certifications;
    return `${pagehead(C.title, C.lead, `<div class="actions"><button class="btn btn-mark" type="button" data-request="${esc(C.cta)}">${icon('file-text')}${esc(C.cta)}</button></div>`)}
      <section class="band band-sand"><div class="wrap">
        ${tabs('certs', C.title, [
          { key: 'iso', label: C.isoHeading, count: C.iso.length, html: `<ul class="iso wide">${C.iso.map((i) => `<li><strong class="num">${esc(i.title)}</strong><span>${esc(i.desc)}</span></li>`).join('')}</ul>` },
          { key: 'gov', label: C.approvalsHeading, count: C.approvals.length, html: `<ul class="approvals">${C.approvals.map((a) => `<li>${icon('shield-check')}<span>${esc(a)}</span></li>`).join('')}</ul>` },
          { key: 'commit', label: C.commitmentTitle, html: `<p class="commit">${esc(C.commitmentBody)}</p>` },
        ], 'sand')}
      </div></section>${closeBlock()}`;
  }

  function pageJourney() {
    const J = t().journey;
    const shades = ['#f6b81c', '#8b857a', '#a59d8c', '#c9a46a', '#b38d55', '#3a3531'];
    const ordered = [...J.milestones].reverse(); // newest on top, oldest deepest
    return `
      ${pagehead(J.title, J.lead)}
      <section class="band band-paper"><div class="wrap">
        ${tabs('journey', J.title, [
          { key: 'milestones', label: ui().milestonesTab, count: J.milestones.length, html: `<ol class="column">${ordered.map((m, i) => `<li style="--l:${shades[i] || '#3a3531'}"><span class="layer" aria-hidden="true"></span><span class="yr">${esc(m.year)}</span><div class="txt"><h3>${esc(m.title)}</h3><p>${esc(m.desc)}</p></div></li>`).join('')}</ol>` },
          { key: 'values', label: J.valuesTitle, count: J.values.length, html: `<ul class="values light">${J.values.map((v) => `<li><strong>${esc(v.title)}</strong><span>${esc(v.desc)}</span></li>`).join('')}</ul>` },
        ])}
      </div></section>
      ${closeBlock()}`;
  }

  function pageLeadership() {
    const L = t().leadership;
    const photos = [IMG.chairman, IMG.gm];
    return `
      ${pagehead(L.title, L.lead)}
      <section class="band band-paper"><div class="wrap"><div class="leaders">${L.leaders.map((p, i) => {
        const initials = p.name.replace(/^(Eng\.|م\.)\s*/, '').split(/\s+/).slice(0, 2).map((w) => w[0]).join('');
        return `<article class="leader"><div class="portrait"><span class="initials" aria-hidden="true">${esc(initials)}</span>${photos[i] ? `<img src="${photos[i]}" alt="${esc(p.name)}" loading="lazy" onerror="this.remove()">` : ''}</div>
          <div><h3>${esc(p.name)}</h3><p class="role">${esc(p.title)}</p><p class="bio">${esc(p.bio)}</p>
          <h4 class="visually-hidden">${esc(L.expertiseHeading)}</h4><ul class="tags">${(p.expertise || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div></article>`;
      }).join('')}</div></div></section>
      <section class="band band-asphalt"><div class="wrap">${quoteBlock()}</div></section>
      ${closeBlock()}`;
  }

  function field(id, label, control, err, full = false, hint = '') {
    return `<div class="field${full ? ' full' : ''}"><label for="${id}">${esc(label)}</label>${control}${hint ? `<span class="hint" id="${id}-hint">${esc(hint)}</span>` : ''}<span class="err" id="${id}-err" hidden>${icon('circle-alert')}<span>${esc(err || '')}</span></span></div>`;
  }

  function quoteForm(x, title, pf = {}) {
    const C = t().contact;
    return `
        <form class="sheet" id="${x}-form" data-kind="quote" data-x="${x}" novalidate>
          <h2>${esc(title)}</h2>
          <div class="fields">
            ${field(`${x}-name`, C.fields.name, `<input id="${x}-name" name="name" autocomplete="name" placeholder="${esc(C.placeholders.name)}" aria-describedby="${x}-name-err">`, C.errors.name)}
            ${field(`${x}-email`, C.fields.email, `<input id="${x}-email" name="email" type="email" autocomplete="email" dir="ltr" placeholder="${esc(C.placeholders.email)}" aria-describedby="${x}-email-err">`, C.errors.email)}
            ${field(`${x}-company`, C.fields.company, `<input id="${x}-company" name="company" autocomplete="organization" placeholder="${esc(C.placeholders.company)}" aria-describedby="${x}-company-err">`, C.errors.company)}
            ${field(`${x}-type`, C.fields.type, `<select id="${x}-type" name="type"><option value="">${esc(C.placeholders.type)}</option>${C.typeOptions.map((o) => `<option value="${o.key}"${pf.type === o.key ? ' selected' : ''}>${esc(o.label)}</option>`).join('')}</select>`, '')}
            ${field(`${x}-message`, C.fields.message, `<textarea id="${x}-message" name="message" placeholder="${esc(C.placeholders.message)}" aria-describedby="${x}-message-err">${esc(pf.message || '')}</textarea>`, C.errors.message, true)}
          </div>
          <div class="form-foot"><button class="btn btn-mark" type="submit">${icon('send', 'flip')}${esc(C.submit)}</button><span class="form-note">${esc(C.orEmail)} <a href="mailto:${EMAIL}">${esc(EMAIL)}</a></span></div>
          <div id="${x}-status" aria-live="polite"></div>
        </form>`;
  }

  function pageContact() {
    const T = t(), C = T.contact, U = ui();
    return `
      ${pagehead(C.title, C.lead)}
      <section class="band"><div class="wrap sheet-grid">
        ${quoteForm('f', U.quote, state.prefill || {})}
        <aside class="aside">
          <div class="block"><h3>${esc(C.officeHeading)}</h3>${channels()}</div>
          <div class="block"><h3>${esc(U.cr)}</h3><p class="num">${esc(CR)}</p></div>
        </aside>
      </div></section>`;
  }

  function pageCareers() {
    const T = t(), K = T.careers, U = ui();
    return `
      ${pagehead(K.title, K.lead, `<div class="actions"><a class="btn btn-mark" href="#apply" data-jump="apply">${esc(K.cta)}</a></div>`)}
      <section class="band band-basalt"><div class="wrap"><div class="head"><h2>${esc(K.whyTitle)}</h2></div>
        <ul class="perks">${K.why.map((w) => `<li>${icon({ Layers: 'layers', GraduationCap: 'graduation-cap', HardHat: 'hard-hat', ShieldCheck: 'shield-check', Briefcase: 'briefcase' }[w.icon] || 'layers')}<h3>${esc(w.title)}</h3><p>${esc(w.desc)}</p></li>`).join('')}</ul></div></section>
      <section class="band band-paper"><div class="wrap"><div class="head"><h2>${esc(K.rolesTitle)}</h2><p>${esc(K.rolesLead)}</p></div>
        <table class="roles"><thead><tr><th scope="col">${esc(U.role)}</th><th scope="col">${esc(U.dept)}</th><th scope="col">${esc(U.loc)}</th><th scope="col">${esc(U.type)}</th><th scope="col">${esc(U.exp)}</th><th scope="col"><span class="visually-hidden">${esc(U.apply)}</span></th></tr></thead>
        <tbody>${K.roles.map((r) => `<tr><td class="t">${esc(r.title)}</td><td class="k" data-k="${esc(U.dept)}">${esc(r.dept)}</td><td class="k" data-k="${esc(U.loc)}">${esc(r.location)}</td><td class="k" data-k="${esc(U.type)}">${esc(r.type)}</td><td class="k" data-k="${esc(U.exp)}">${esc(r.exp)}</td><td><button class="btn btn-line" type="button" data-role="${r.slug}">${esc(U.apply)}</button></td></tr>`).join('')}</tbody></table>
      </div></section>
      <section class="band" id="apply"><div class="wrap sheet-grid">
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
              <div class="file-row"><label class="btn btn-line" for="a-file">${icon('upload')}${esc(K.cvUploadBtn)}</label><input id="a-file" type="file" accept=".pdf,.doc,.docx" class="visually-hidden"><span id="a-file-name">${esc(K.cvNone)}</span></div>
              <span class="hint" id="a-cv-hint">${esc(K.cvHint)}</span>
              <span class="err" id="a-cv-err" hidden>${icon('circle-alert')}<span>${esc(K.errors.cv)}</span></span></div>
            ${field('a-note', K.fields.note, `<textarea id="a-note" name="note" placeholder="${esc(K.placeholders.note)}"></textarea>`, '', true)}
          </div>
          <div class="form-foot"><button class="btn btn-mark" type="submit">${icon('send', 'flip')}${esc(K.submit)}</button></div>
          <div id="apply-status" aria-live="polite"></div>
        </form>
        <aside class="aside"><div class="block"><h3>${esc(T.contact.officeHeading)}</h3>${channels()}</div></aside>
      </div></section>`;
  }

  // Accessible tabs: arrow keys move along the reading direction.
  function tabs(id, label, items, tone = '') {
    const cur = items.some((i) => i.key === state.tabs[id]) ? state.tabs[id] : items[0].key;
    return `
      <div class="tabs ${tone}" data-tabs="${id}">
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
  }

  function relatedLogs(items) {
    const P = t().projects;
    return `<ol class="logs compact">${items.map((p) => `
      <li class="log"><div class="log-row">
        <span class="seg" style="--c:${PROJECT_COLOR[p.key]}" aria-hidden="true"></span>
        <h3><a href="${href(`projects/${projectSlug(p.id)}`)}">${esc(p.title)}</a></h3>
        <p class="meta"><span>${esc(P.labels.client)}: ${esc(p.client)}</span><span>${esc(P.labels.location)}: ${esc(p.location)}</span></p>
        <span class="status ${/complete|منجز|مكتمل/i.test(p.status) ? 'done' : 'live'}">${esc(p.status)}</span>
        <a class="textlink" href="${href(`projects/${projectSlug(p.id)}`)}">${esc(ui().details)} ${arrow()}</a>
      </div></li>`).join('')}</ol>`;
  }

  function pageService() {
    const T = t(), S = T.services, U = ui();
    const i = svcBySlug(state.sub);
    const s = S.items[i], n = net(s);
    const rel = T.projects.items.filter((p) => n.projects.includes(p.key));
    const prev = S.items[(i + S.items.length - 1) % S.items.length];
    const next = S.items[(i + 1) % S.items.length];
    const scope = `<ul class="caps big" style="--c-ink:${n.ink}">${s.capabilities.map((c) => `<li>${icon('check')}<span>${esc(c)}</span></li>`).join('')}</ul>`;
    const projects = rel.length ? relatedLogs(rel) : `<p class="empty">${esc(U.noProjects)}</p>`;
    return `
      ${pagehead(s.title, s.desc, `<div class="actions"><a class="btn btn-mark" href="#svc-quote" data-jump="svc-quote">${esc(U.quickQuote)}</a><a class="textlink on-dark" href="${href('services')}">${esc(U.allDisciplines)} ${arrow()}</a></div>`)}
      ${n.id === 'fleet' ? `<section class="band band-basalt"><div class="wrap"><p class="note-dark">${esc(U.fleetNote)}</p>${fleetBlock(false)}</div></section>` : streetSection()}
      <section class="band band-paper"><div class="wrap svc-detail" style="--c:${n.c}">
        ${tabs('svc', s.title, [
          { key: 'scope', label: U.scopeTab, count: s.capabilities.length, html: scope },
          { key: 'projects', label: U.projectsTab, count: rel.length, html: projects },
        ])}
      </div></section>
      <section class="band" id="svc-quote"><div class="wrap sheet-grid">
        ${quoteForm('q', U.quickQuote, { type: n.type, message: `${S.inquireCta} ${s.title}: ` })}
        <aside class="aside"><div class="block"><h3>${esc(T.contact.officeHeading)}</h3>${channels()}</div></aside>
      </div></section>
      <nav class="pager wrap" aria-label="${esc(U.allDisciplines)}">
        <a href="${href(`services/${svcSlug(prev)}`)}" rel="prev"><span class="k">${esc(U.prevDiscipline)}</span><span class="v"><span class="seg" style="--c:${net(prev).c}"></span>${esc(prev.title)}</span></a>
        <a href="${href(`services/${svcSlug(next)}`)}" rel="next"><span class="k">${esc(U.nextDiscipline)}</span><span class="v"><span class="seg" style="--c:${net(next).c}"></span>${esc(next.title)}</span></a>
      </nav>`;
  }

  function pageProject() {
    const T = t(), P = T.projects, U = ui();
    const p = projBySlug(state.sub);
    const cat = P.categories.find((c) => c.key === p.key)?.label || p.category;
    const svcI = T.services.items.findIndex((x) => x.icon === PROJECT_SERVICE[p.key]);
    const svc = T.services.items[svcI];
    const more = P.items.filter((x) => x.key === p.key && x.id !== p.id);
    return `
      ${pagehead(p.title, p.desc, `<div class="actions"><button class="btn btn-mark" type="button" data-inquire-project="${p.id}">${esc(P.detailsCta)}</button><a class="textlink on-dark" href="${href('projects')}">${esc(U.allProjects)} ${arrow()}</a></div>`)}
      ${streetSection()}
      <section class="band band-paper"><div class="wrap project-sheet">
        <div><h2>${esc(U.projectSheet)}</h2>
          <dl class="facts">
            <div><dt>${esc(P.labels.client)}</dt><dd>${esc(p.client)}</dd></div>
            <div><dt>${esc(P.labels.location)}</dt><dd>${esc(p.location)}</dd></div>
            <div><dt>${esc(U.category)}</dt><dd><span class="seg" style="--c:${PROJECT_COLOR[p.key]}"></span>${esc(cat)}</dd></div>
            <div><dt>${esc(P.labels.status)}</dt><dd><span class="status ${/complete|منجز|مكتمل/i.test(p.status) ? 'done' : 'live'}">${esc(p.status)}</span></dd></div>
            ${svc ? `<div><dt>${esc(U.discipline)}</dt><dd><a class="textlink" href="${href(`services/${svcSlug(svc)}`)}">${esc(svc.title)}</a></dd></div>` : ''}
          </dl></div>
        <div><h2>${esc(P.labels.scope)}</h2><ul class="caps big" style="--c-ink:var(--ink)">${(p.scope || []).map((x) => `<li>${icon('check')}<span>${esc(x)}</span></li>`).join('')}</ul></div>
      </div></section>
      ${more.length ? `<section class="band"><div class="wrap"><div class="head"><h2>${esc(U.moreProjects)}</h2></div>${relatedLogs(more)}</div></section>` : ''}
      ${closeBlock()}`;
  }

  const PAGE_FN = { '': pageHome, about: pageAbout, services: pageServices, projects: pageProjects, equipment: pageEquipment, certifications: pageCerts, journey: pageJourney, leadership: pageLeadership, contact: pageContact, careers: pageCareers };

  function pageTitle() {
    const T = t();
    if (state.page === 'services' && state.sub) return `${T.services.items[svcBySlug(state.sub)].title} — ${T.brandLine}`;
    if (state.page === 'projects' && state.sub) return `${projBySlug(state.sub).title} — ${T.brandLine}`;
    if (!state.page) return `${T.brandLine} — ${T.hero.title}`;
    if (state.page === 'careers') return `${T.careers.title} — ${T.brandLine}`;
    const n = T.nav.find((x) => x.id === state.page);
    return `${n ? n.label : ''} — ${T.brandLine}`;
  }

  // ---------- render ----------
  let lastKey = '';
  function render(force = false) {
    const { lang, page, sub } = parseHash();
    const changedPage = page !== state.page || lang !== state.lang || sub !== state.sub;
    state.lang = lang; state.page = page; state.sub = sub;
    const key = `${lang}/${page}/${sub}`;
    if (changedPage) state.picked = false;
    if (page === 'services' && sub) { state.svc = svcBySlug(sub); state.picked = true; }
    if (page === 'projects' && sub) {
      const p = projBySlug(sub);
      const i = t().services.items.findIndex((x) => x.icon === PROJECT_SERVICE[p.key]);
      if (i >= 0) { state.svc = i; state.picked = true; }
    }
    if (!force && key === lastKey) return;
    if (page !== 'contact') state.prefill = null;
    lastKey = key;

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = pageTitle();
    $('.skip').textContent = ui().skip;
    $('#officialbar').innerHTML = officialBar();
    $('#masthead').innerHTML = masthead();
    $('#main').innerHTML = (page === 'services' && sub) ? pageService() : (page === 'projects' && sub) ? pageProject() : PAGE_FN[page]();
    $('#footer').innerHTML = footer();
    const flag = $('#proto-flag');
    if (!state.flagClosed) flag.innerHTML = `<span>${esc(ui().proto)}</span><button type="button" data-closeflag aria-label="${esc(ui().close)}">${icon('x')}</button>`;
    flag.hidden = !!state.flagClosed;
    fitTags(document);
    requestAnimationFrame(() => fitTags(document));
    buildGauge();
    if (changedPage || force) window.scrollTo({ top: 0, behavior: 'auto' });
    if (state.jump) { const el = document.getElementById(state.jump); state.jump = null; if (el) el.scrollIntoView(); }
  }

  function refreshReader() {
    const panel = $('#discipline');
    if (panel) panel.outerHTML = disciplinePanel();
    $$('.legend button').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.svc) === state.svc)));
    $$('#xsec').forEach((fig) => {
      fig.classList.toggle('picked', state.picked);
      fig.classList.remove('settle');
      const id = net(t().services.items[state.svc]).id;
      $$('.net', fig).forEach((g) => g.classList.toggle('on', state.picked && g.dataset.net === id));
    });
  }

  function refreshLogs() {
    const host = $('.logs')?.closest('.wrap') || $('.filters')?.closest('.wrap');
    if (!host) return;
    const head = $('.head', host);
    host.innerHTML = (head ? head.outerHTML : '') + logsBlock();
  }

  // ---------- depth gauge ----------
  function buildGauge() {
    const g = $('#gauge');
    const sections = $$('#main > section');
    g.innerHTML = `<span class="line"></span>${sections.map((_, i) => `<span class="tick" style="top:${(i / Math.max(1, sections.length - 1)) * 100}%"></span>`).join('')}<span class="mark"></span>`;
    moveGauge();
  }
  function moveGauge() {
    const mark = $('#gauge .mark');
    if (!mark) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    mark.style.top = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
    const fig = $('#xsec');
    const r = fig && fig.getBoundingClientRect();
    $('#gauge').classList.toggle('aside', !!r && r.bottom > 0 && r.top < innerHeight);
  }

  // ---------- forms ----------
  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  function setErr(id, bad) {
    const input = document.getElementById(id);
    const err = document.getElementById(`${id}-err`);
    input?.setAttribute('aria-invalid', String(bad));
    if (err) err.hidden = !bad;
    return bad;
  }
  function submitLike(form, statusId, okText) {
    const btn = $('button[type=submit]', form);
    btn.setAttribute('aria-busy', 'true'); btn.disabled = true;
    const label = btn.lastChild.textContent;
    btn.lastChild.textContent = form.id === 'apply-form' ? t().careers.submitting : t().contact.submitting;
    setTimeout(() => {
      btn.removeAttribute('aria-busy'); btn.disabled = false; btn.lastChild.textContent = label;
      document.getElementById(statusId).innerHTML = `<div class="notice ok" role="status">${icon('check')}<div><strong>${esc(okText)}</strong><br><span>${esc(ui().protoSent)}</span></div></div>`;
      form.reset();
    }, 900);
  }

  // ---------- events ----------
  document.addEventListener('click', (e) => {
    const el = e.target.closest('button, a, .net');
    if (!el) return;
    const T = t();

    if (el.matches('.menu-btn')) {
      const d = $('#drawer'); const open = !d.classList.contains('open');
      d.style.top = `${Math.max(0, $('#masthead').getBoundingClientRect().bottom)}px`;
      d.classList.toggle('open', open); el.setAttribute('aria-expanded', String(open));
      el.innerHTML = icon(open ? 'x' : 'menu'); el.setAttribute('aria-label', open ? ui().close : ui().menu);
      return;
    }
    if (el.matches('.drawer a')) { $('#drawer').classList.remove('open'); }
    if (el.hasAttribute('data-closeflag')) { state.flagClosed = true; $('#proto-flag').hidden = true; return; }

    if (el.matches('.net')) {
      state.svc = Number(el.dataset.svc); state.picked = true; refreshReader();
      const panel = $('#discipline'); const r = panel?.getBoundingClientRect();
      if (r && r.top > innerHeight - 120) panel.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
      return;
    }
    if (el.matches('[role=tab]')) { selectTab(el); return; }
    if (el.matches('.legend button')) { state.svc = Number(el.dataset.svc); state.picked = true; refreshReader(); return; }

    if (el.dataset.inquire !== undefined) {
      const s = T.services.items[Number(el.dataset.inquire)];
      go('contact', { prefill: { type: net(s).type, message: `${T.services.inquireCta} ${s.title}: ` } });
      return;
    }
    if (el.dataset.inquireProject) {
      const p = T.projects.items.find((x) => String(x.id) === el.dataset.inquireProject);
      const type = { water: 'water-sewerage', roads: 'roads-asphalt', urban: 'urban-development' }[p.key] || 'other';
      go('contact', { prefill: { type, message: `${T.projects.detailsCta}: ${p.title} — ` } });
      return;
    }
    if (el.dataset.request) {
      go('contact', { prefill: { type: el.dataset.type || '', message: `${el.dataset.request}: ` } });
      return;
    }
    if (el.dataset.filter) { state.filter = el.dataset.filter; refreshLogs(); $(`[data-filter="${state.filter}"]`)?.focus(); return; }
    if (el.dataset.toggle) {
      const id = Number(el.dataset.toggle);
      if (state.open.has(id)) state.open.delete(id); else state.open.add(id);
      const open = state.open.has(id);
      el.setAttribute('aria-expanded', String(open));
      el.firstChild.textContent = open ? T.projects.collapse : T.projects.expand;
      document.getElementById(`pd-${id}`).hidden = !open;
      return;
    }
    if (el.dataset.project) {
      e.preventDefault();
      state.filter = 'all'; state.open.add(Number(el.dataset.project)); state.jump = `project-${el.dataset.project}`;
      go('projects');
      return;
    }
    if (el.dataset.role) {
      state.role = el.dataset.role;
      const sel = $('#a-role'); if (sel) sel.value = state.role;
      $('#apply').scrollIntoView({ behavior: 'smooth' }); setTimeout(() => $('#a-name')?.focus({ preventScroll: true }), 450);
      return;
    }
    if (el.dataset.jump) { e.preventDefault(); document.getElementById(el.dataset.jump)?.scrollIntoView({ behavior: 'smooth' }); return; }
    if (el.hasAttribute('data-quote')) { state.prefill = null; }
  });

  document.addEventListener('keydown', (e) => {
    const tab = e.target.closest?.('[role=tab]');
    if (tab && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
      const list = $$('[role=tab]', tab.parentElement);
      const i = list.indexOf(tab);
      const fwd = rtl() ? 'ArrowLeft' : 'ArrowRight';
      const j = e.key === 'Home' ? 0 : e.key === 'End' ? list.length - 1 : (i + (e.key === fwd ? 1 : -1) + list.length) % list.length;
      e.preventDefault(); selectTab(list[j], true); return;
    }
    if (e.key === 'Escape' && $('#drawer')?.classList.contains('open')) { $('.menu-btn').click(); $('.menu-btn').focus(); }
  });

  document.addEventListener('change', (e) => {
    if (e.target.id === 'a-file') {
      const f = e.target.files[0];
      $('#a-file-name').textContent = f ? f.name : t().careers.cvNone;
      if (f) setErr('a-cv', false);
    }
  });

  document.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const v = (n) => (form.elements[n]?.value || '').trim();
    if (form.dataset.kind === 'quote') {
      const x = form.dataset.x;
      const bad = [
        setErr(`${x}-name`, !v('name')),
        setErr(`${x}-email`, !validEmail(v('email'))),
        setErr(`${x}-company`, !v('company')),
        setErr(`${x}-message`, v('message').length < 10),
      ];
      const first = [`${x}-name`, `${x}-email`, `${x}-company`, `${x}-message`][bad.indexOf(true)];
      if (first) { document.getElementById(first).focus(); return; }
      submitLike(form, `${x}-status`, t().contact.success);
    }
    if (form.id === 'apply-form') {
      const hasFile = !!$('#a-file').files.length;
      const bad = [
        setErr('a-name', !v('name')),
        setErr('a-email', !validEmail(v('email'))),
        setErr('a-phone', !v('phone')),
        setErr('a-exp', v('exp') === ''),
        setErr('a-role', !v('role')),
        setErr('a-cv', !v('cv') && !hasFile),
      ];
      const first = ['a-name', 'a-email', 'a-phone', 'a-exp', 'a-role', 'a-cv'][bad.indexOf(true)];
      if (first) { document.getElementById(first).focus(); return; }
      submitLike(form, 'apply-status', t().careers.success);
      $('#a-file-name').textContent = t().careers.cvNone;
    }
  });

  document.addEventListener('input', (e) => {
    const id = e.target.id;
    if (e.target.getAttribute('aria-invalid') === 'true') {
      const ok = id.endsWith('email') ? validEmail(e.target.value.trim()) : id.endsWith('-message') ? e.target.value.trim().length >= 10 : !!e.target.value.trim();
      if (ok) setErr(id, false);
    }
  });

  addEventListener('scroll', moveGauge, { passive: true });
  addEventListener('resize', moveGauge);
  addEventListener('hashchange', () => render());
  // SVG labels are measured again once their faces have actually loaded.
  if (document.fonts) {
    document.fonts.ready.then(() => fitTags(document));
    document.fonts.addEventListener?.('loadingdone', () => fitTags(document));
    document.fonts.load('500 15px "Readex Pro"', 'سنا SACC').then(() => fitTags(document)).catch(() => {});
  }
  render(true);
})();
