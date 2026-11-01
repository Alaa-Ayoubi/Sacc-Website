/* SACC prototype, proposal 3: the project signboard.
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
  const CO = content.company;

  // New interface copy: the only strings not taken from the content bundle.
  const UI = {
    ar: {
      skip: 'تخطَّ إلى المحتوى',
      home: 'الرئيسية',
      quote: 'اطلب عرض سعر',
      menu: 'القائمة',
      close: 'إغلاق القائمة',
      langLabel: 'Switch to English',
      crumbs: 'مسار التصفح',
      cr: 'السجل التجاري',
      phone: 'الهاتف',
      email: 'البريد',
      mobile: 'الجوال',
      office: 'المكتب',
      activity: 'النشاط',
      contractor: 'المقاول',
      projectName: 'اسم المشروع',
      projectBoard: 'لوحة المشروع',
      discipline: 'التخصص',
      disciplines: 'التخصصات',
      projects: 'المشاريع',
      category: 'التصنيف',
      description: 'وصف المشروع',
      overview: 'نبذة',
      published: 'المشاريع المنشورة',
      noProjects: 'لا توجد مشاريع منشورة في هذا التخصص بعد.',
      pickDiscipline: 'اختر التخصص',
      pickProject: 'اختر المشروع',
      fullBoard: 'لوحة المشروع كاملة',
      disciplinePage: 'صفحة التخصص',
      scopeTab: 'نطاق العمل',
      projectsTab: 'المشاريع المنفّذة',
      milestonesTab: 'محطات المسيرة',
      commitmentTab: 'الالتزام',
      allProjects: 'كل المشاريع',
      allDisciplines: 'كل التخصصات',
      prev: 'السابق',
      next: 'التالي',
      moreInCategory: 'مشاريع أخرى في التصنيف نفسه',
      filterLabel: 'تصفية المشاريع حسب التصنيف',
      register: 'سجل المشاريع',
      no: 'الرقم',
      project: 'المشروع',
      completed: 'مكتمل',
      inProgress: 'قيد التنفيذ',
      owners: 'الجهات المالكة',
      places: 'المواقع',
      documents: 'طلب الوثائق',
      documentsNote: 'نرسل الوثائق إلى بريد الجهة بعد مراجعة الطلب.',
      proto: 'نموذج تصميم تفاعلي للمراجعة. النماذج لا ترسل أي بيانات.',
      protoSent: 'هذا نموذج للمراجعة: لم يُرسل شيء. بعد الدمج تُحفظ الرسالة ويُبلَّغ الفريق.',
      emailRequired: 'البريد الإلكتروني مطلوب',
      apply: 'تقدّم لهذه الوظيفة',
      role: 'الوظيفة', dept: 'القسم', loc: 'الموقع', type: 'الدوام', exp: 'الخبرة',
      photoMissing: 'الصورة غير متاحة',
      signed: 'رئيس مجلس الإدارة',
      requestRef: 'مرجع الطلب',
      tally: {
        projects: ['مشروع', 'مشروعان', 'مشاريع', 'مشروعًا'],
        disciplines: ['تخصص', 'تخصصان', 'تخصصات', 'تخصصًا'],
        entities: ['جهة', 'جهتان', 'جهات', 'جهة'],
        certs: ['شهادة', 'شهادتان', 'شهادات', 'شهادة'],
        places: ['موقع', 'موقعان', 'مواقع', 'موقعًا'],
        roles: ['وظيفة', 'وظيفتان', 'وظائف', 'وظيفة'],
      },
    },
    en: {
      skip: 'Skip to content',
      home: 'Home',
      quote: 'Request a Quote',
      menu: 'Menu',
      close: 'Close menu',
      langLabel: 'التبديل إلى العربية',
      crumbs: 'Breadcrumb',
      cr: 'Commercial Registration',
      phone: 'Phone',
      email: 'Email',
      mobile: 'Mobile',
      office: 'Office',
      activity: 'Activity',
      contractor: 'Contractor',
      projectName: 'Project',
      projectBoard: 'Project board',
      discipline: 'Discipline',
      disciplines: 'Disciplines',
      projects: 'Projects',
      category: 'Category',
      description: 'Description',
      overview: 'Overview',
      published: 'Published projects',
      noProjects: 'No published projects in this discipline yet.',
      pickDiscipline: 'Choose a discipline',
      pickProject: 'Choose a project',
      fullBoard: 'Full project board',
      disciplinePage: 'Discipline page',
      scopeTab: 'Scope of work',
      projectsTab: 'Delivered projects',
      milestonesTab: 'Milestones',
      commitmentTab: 'Commitment',
      allProjects: 'All projects',
      allDisciplines: 'All disciplines',
      prev: 'Previous',
      next: 'Next',
      moreInCategory: 'More projects in this category',
      filterLabel: 'Filter projects by category',
      register: 'Project register',
      no: 'No.',
      project: 'Project',
      completed: 'Completed',
      inProgress: 'In progress',
      owners: 'Project owners',
      places: 'Locations',
      documents: 'Document request',
      documentsNote: 'Documents are sent to your organisation’s email once the request is reviewed.',
      proto: 'Interactive design prototype for review. Forms send nothing.',
      protoSent: 'This is a review prototype: nothing was sent. Once integrated, the message is stored and the team is notified.',
      emailRequired: 'Email is required',
      apply: 'Apply for this role',
      role: 'Role', dept: 'Department', loc: 'Location', type: 'Type', exp: 'Experience',
      photoMissing: 'Photo unavailable',
      signed: 'Chairman',
      requestRef: 'Request reference',
      tally: {
        projects: ['project', 'projects'],
        disciplines: ['discipline', 'disciplines'],
        entities: ['body', 'bodies'],
        certs: ['certificate', 'certificates'],
        places: ['location', 'locations'],
        roles: ['role', 'roles'],
      },
    },
  };

  // Each service (by its content icon): its URL slug, the contact-form
  // project type it pre-fills, and the project categories it delivered.
  const SERVICE = {
    Droplets: { slug: 'water-sewerage', type: 'water-sewerage', cats: ['water'] },
    CloudRain: { slug: 'stormwater', type: 'water-sewerage', cats: [] },
    Zap: { slug: 'electrical-solar', type: 'other', cats: ['electrical'] },
    Route: { slug: 'roads-asphalt', type: 'roads-asphalt', cats: ['roads'] },
    Construction: { slug: 'bridges-tunnels', type: 'bridges-tunnels', cats: [] },
    Building2: { slug: 'landscaping', type: 'urban-development', cats: ['urban'] },
    ShieldCheck: { slug: 'quality-laboratory', type: 'other', cats: [] },
    Truck: { slug: 'equipment-rental', type: 'equipment-rental', cats: [] },
    Settings: { slug: 'operation-maintenance', type: 'other', cats: [] },
  };
  const PROJECT_TYPE = { water: 'water-sewerage', roads: 'roads-asphalt', urban: 'urban-development', electrical: 'other' };
  const slugify = (x) => String(x).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const projectSlug = (id) => slugify(content.en.projects.items.find((p) => p.id === id)?.title || id);

  const state = { lang: 'ar', page: '', sub: '', board: { disc: 0, proj: 1 }, filter: 'all', prefill: null, role: '', tabs: {}, jump: null };

  // ---------- helpers ----------
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const icon = (name, cls = '') => `<span class="ic ${cls}" aria-hidden="true">${icons[name] || ''}</span>`;
  const other = () => (state.lang === 'ar' ? 'en' : 'ar');
  const t = (lang = state.lang) => content[lang];
  const ui = (lang = state.lang) => UI[lang];
  const rtl = () => state.lang === 'ar';
  const fwd = () => icon(rtl() ? 'arrow-left' : 'arrow-right', 'fwd');
  const href = (page, lang = state.lang) => `#/${lang === 'en' ? 'en/' : ''}${page}`;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const svc = (s) => SERVICE[s.icon] || SERVICE.Settings;
  const svcSlug = (s) => svc(s).slug;
  const svcIndex = (slug) => t().services.items.findIndex((x) => svcSlug(x) === slug);
  const projById = (id, lang = state.lang) => t(lang).projects.items.find((p) => p.id === id);
  const projBySlug = (slug) => t().projects.items.find((p) => projectSlug(p.id) === slug);
  const projDisc = (p) => t().services.items.findIndex((s) => svc(s).cats.includes(p.key));
  const discProjects = (i) => t().projects.items.filter((p) => svc(t().services.items[i]).cats.includes(p.key));
  const done = (p) => /complete|مكتمل/i.test(p.status);
  const no = (n) => String(n).padStart(2, '0');
  const altAttrs = () => `lang="${other()}" dir="${other() === 'ar' ? 'rtl' : 'ltr'}"`;

  // Arabic counted nouns: 1 and 2 have their own forms (the dual stands
  // without a numeral), 3–10 take the plural, 11 and above the singular
  // accusative. English: singular for 1, plural otherwise.
  function counted(n, key) {
    const f = ui().tally[key];
    const fig = (x) => `<span class="fig">${x}</span>`;
    if (state.lang === 'en') return `${fig(n)} <span class="noun">${esc(n === 1 ? f[0] : f[1])}</span>`;
    if (n === 1) return `${fig(1)} <span class="noun">${esc(f[0])}</span>`;
    if (n === 2) return `<span class="noun solo">${esc(f[1])}</span>`;
    return `${fig(n)} <span class="noun">${esc(n <= 10 ? f[2] : f[3])}</span>`;
  }

  // A bilingual board key: the current language first, the other beneath.
  const key = (pick) => `<span class="k1">${esc(pick(t(), ui()))}</span><span class="k2" ${altAttrs()}>${esc(pick(t(other()), ui(other())))}</span>`;

  // One ruled row of a board. size: full | half | quarter.
  function row(k, v, { size = 'full', id = '', link = '', cls = '' } = {}) {
    return `<div class="row ${size} ${cls}"${id ? ` data-k="${id}"` : ''}><dt class="key">${k}</dt><dd class="val">${v}${link}</dd></div>`;
  }
  const onward = (page, label) => `<a class="onward" href="${href(page)}">${esc(label)}${fwd()}</a>`;
  const navLabel = (id) => t().nav.find((n) => n.id === id)?.label || '';

  function statusMark(p) {
    return `<span class="status ${done(p) ? 'is-done' : 'is-live'}"><span class="sq" aria-hidden="true"></span>${esc(p.status)}</span>`;
  }

  function parseHash() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    let lang = 'ar';
    if (parts[0] === 'en') { lang = 'en'; parts.shift(); }
    const page = PAGES.includes(parts[0] || '') ? (parts[0] || '') : '';
    let sub = parts[1] || '';
    if (page === 'services' && !Object.values(SERVICE).some((s) => s.slug === sub)) sub = '';
    if (page === 'projects' && !content.en.projects.items.some((p) => projectSlug(p.id) === sub)) sub = '';
    if (page !== 'services' && page !== 'projects') sub = '';
    return { lang, page, sub };
  }

  function go(page, opts = {}) {
    if (opts.prefill !== undefined) state.prefill = opts.prefill;
    const target = href(page);
    if (location.hash === target) render(true); else location.hash = target;
  }

  // ---------- official strip, masthead, footer ----------
  function strip() {
    const T = t(), U = ui();
    return `<div class="wrap strip-in">
      <ul class="creds">
        <li><span class="sk">${esc(U.cr)}</span> <span class="num">${esc(CO.cr)}</span></li>
        <li>${icon('shield-check')}${esc(T.why.items[1])}</li>
      </ul>
      <ul class="reach">
        <li><span class="sk">${esc(U.phone)}</span> <a href="tel:${CO.phone.replace(/\s/g, '')}" dir="ltr" class="num">${esc(CO.phone)}</a></li>
        <li><span class="sk">${esc(U.email)}</span> <a href="mailto:${CO.email}" dir="ltr">${esc(CO.email)}</a></li>
      </ul>
    </div>`;
  }

  function mast() {
    const T = t(), U = ui();
    const items = [...T.nav, { id: 'careers', label: T.navCareers }];
    const cur = (id) => (state.page === id ? ' aria-current="page"' : '');
    const here = state.sub ? `${state.page}/${state.sub}` : state.page;
    const o = other();
    return `
      <div class="wrap mast-in">
        <a class="brand" href="${href('')}"><img src="${logo}" alt="${esc(T.brandLine)}" width="152" height="40" /></a>
        <nav class="nav" aria-label="${esc(U.menu)}"><ul>${items.map((n) => `<li><a href="${href(n.id)}"${cur(n.id)}>${esc(n.label)}</a></li>`).join('')}</ul></nav>
        <div class="tools">
          <a class="lang" href="${href(here, o)}" hreflang="${o}" lang="${o}" aria-label="${esc(U.langLabel)}">${esc(T.langBtn)}</a>
          <a class="act" href="${href('contact')}" data-quote>${esc(U.quote)}</a>
          <button class="menu-btn" type="button" aria-expanded="false" aria-controls="drawer" aria-label="${esc(U.menu)}">${icon('menu')}</button>
        </div>
      </div>
      <div class="drawer" id="drawer" hidden>
        <ul>${items.map((n) => `<li><a href="${href(n.id)}"${cur(n.id)}>${esc(n.label)}${fwd()}</a></li>`).join('')}</ul>
        <a class="act act-block" href="${href('contact')}" data-quote>${esc(U.quote)}</a>
      </div>`;
  }

  function foot() {
    const T = t(), F = T.footer;
    return `<div class="wrap foot-in">
      <div class="foot-brand"><img src="${logo}" alt="${esc(T.brandLine)}" width="152" height="40" loading="lazy" /><p>${esc(F.tagline)}</p></div>
      <nav aria-label="${esc(F.quickLinks)}"><h2>${esc(F.quickLinks)}</h2>
        <ul class="sitemap">${[{ id: '', label: ui().home }, ...T.nav, { id: 'careers', label: T.navCareers }].map((n) => `<li><a href="${href(n.id)}">${esc(n.label)}</a></li>`).join('')}</ul>
      </nav>
    </div>
    <div class="wrap foot-base"><span>${esc(F.rights)}</span></div>`;
  }

  // ---------- board pieces ----------
  // The title band every page opens with: title, its other-language twin, lead.
  function band(title, altTitle, lead = '', { level = 1, id = 'pt' } = {}) {
    return `<header class="band">
      <h${level} class="band-title" id="${id}">${esc(title)}</h${level}>
      ${altTitle ? `<p class="band-alt" ${altAttrs()}>${esc(altTitle)}</p>` : ''}
      ${lead ? `<p class="band-lead">${esc(lead)}</p>` : ''}
    </header>`;
  }

  function crumbs(trail) {
    const U = ui();
    return `<nav class="crumbs wrap" aria-label="${esc(U.crumbs)}"><ol>
      <li><a href="${href('')}">${esc(U.home)}</a></li>
      ${trail.map(([label, page], i) => `<li>${icon(rtl() ? 'chevron-left' : 'chevron-right', 'sep')}${i === trail.length - 1 ? `<span aria-current="page">${esc(label)}</span>` : `<a href="${href(page)}">${esc(label)}</a>`}</li>`).join('')}
    </ol></nav>`;
  }

  // Page head board: band only, sitting at the top of the page.
  function head(title, altTitle, lead) {
    return `<section class="wrap"><div class="board head-board">${band(title, altTitle, lead)}</div></section>`;
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
    const id = btn.dataset.tab, k = btn.dataset.key;
    state.tabs[id] = k;
    const box = btn.closest('.tabs');
    $$('[role=tab]', box).forEach((b) => { const on = b === btn; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
    $$('[role=tabpanel]', box).forEach((p) => { p.hidden = p.id !== `panel-${id}-${k}`; });
    if (focus) btn.focus();
  }

  // Numbered register rows (projects): used on Projects, service and project pages.
  function register(items, caption) {
    const P = t().projects, U = ui();
    return `<table class="register">
      <caption class="vh">${esc(caption)}</caption>
      <thead><tr><th scope="col" class="c-no">${esc(U.no)}</th><th scope="col">${esc(U.project)}</th><th scope="col">${esc(P.labels.client)}</th><th scope="col">${esc(P.labels.location)}</th><th scope="col">${esc(P.labels.status)}</th></tr></thead>
      <tbody>${items.map((p) => `<tr>
        <td class="c-no num">${no(p.id)}</td>
        <th scope="row" class="c-title"><a href="${href(`projects/${projectSlug(p.id)}`)}">${esc(p.title)}</a></th>
        <td data-k="${esc(P.labels.client)}">${esc(p.client)}</td>
        <td data-k="${esc(P.labels.location)}">${esc(p.location)}</td>
        <td data-k="${esc(P.labels.status)}">${statusMark(p)}</td>
      </tr>`).join('')}</tbody>
    </table>`;
  }

  // ---------- the live board (home) ----------
  function liveRows() {
    const T = t(), P = T.projects, U = ui();
    const { disc, proj } = state.board;
    const s = T.services.items[disc];
    const p = proj ? projById(proj) : null;
    if (!p) {
      const alt = t(other()).services.items[disc];
      return `<dl class="rows" id="live-rows">
        ${row(key((c, u) => u.discipline), `<span class="title-val">${esc(s.title)}</span><span class="title-alt" ${altAttrs()}>${esc(alt.title)}</span>`, { id: 'title', cls: 'title-row' })}
        ${row(key((c) => c.projects.labels.scope), `<ul class="inline-list">${s.capabilities.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>`, { id: 'scope' })}
        ${row(key((c, u) => u.published), `<span class="muted">${esc(U.noProjects)}</span>`, { id: 'owner', link: onward(`services/${svcSlug(s)}`, U.disciplinePage) })}
      </dl>`;
    }
    const alt = projById(p.id, other());
    const di = projDisc(p);
    const ds = T.services.items[di];
    return `<dl class="rows" id="live-rows">
      ${row(key((c, u) => u.projectName), `<span class="title-val">${esc(p.title)}</span><span class="title-alt" ${altAttrs()}>${esc(alt.title)}</span>`, { id: 'title', cls: 'title-row' })}
      ${row(key((c) => c.projects.labels.client), esc(p.client), { size: 'half', id: 'owner' })}
      ${row(key((c, u) => u.contractor), esc(T.brandLine), { size: 'half', id: 'contractor' })}
      ${row(key((c) => c.projects.labels.location), esc(p.location), { size: 'half', id: 'location' })}
      ${row(key((c) => c.projects.labels.status), statusMark(p), { size: 'half', id: 'status' })}
      ${row(key((c, u) => u.category), esc(p.category), { size: 'half', id: 'category' })}
      ${row(key((c, u) => u.discipline), ds ? `<a href="${href(`services/${svcSlug(ds)}`)}">${esc(ds.title)}</a>` : '', { size: 'half', id: 'discipline' })}
      ${row(key((c) => c.projects.labels.scope), `<ul class="inline-list">${p.scope.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>`, { id: 'scope', link: onward(`projects/${projectSlug(p.id)}`, U.fullBoard) })}
    </dl>`;
  }

  function picker() {
    const T = t(), U = ui();
    const { disc, proj } = state.board;
    return `<div class="picker">
      <div class="pick-disc">
        <label for="pick-disc">${esc(U.pickDiscipline)}</label>
        <span class="select">${icon('chevron-down')}<select id="pick-disc">${T.services.items.map((s, i) => `<option value="${i}"${i === disc ? ' selected' : ''}>${esc(s.title)}</option>`).join('')}</select></span>
      </div>
      <div class="pick-proj" role="group" aria-labelledby="pick-proj-l">
        <span id="pick-proj-l">${esc(U.pickProject)}</span>
        <div class="nums">${T.projects.items.map((p) => `<button type="button" class="num-btn num" data-pick="${p.id}" aria-pressed="${p.id === proj}" aria-label="${esc(p.title)}" title="${esc(p.title)}">${no(p.id)}</button>`).join('')}</div>
      </div>
    </div>`;
  }

  function pageHome() {
    const T = t(), U = ui(), C = T.certifications, S = T.stats;
    const P = T.projects.items;
    const statKey = (i) => key((c) => c.stats[i].label);
    return `
      <section class="wrap home">
        <article class="board home-board" aria-labelledby="pt">
          ${band(T.brandLine, t(other()).brandLine, '', { level: 1 })}
          <dl class="rows">
            ${row(key((c, u) => u.activity), `<p class="prose">${esc(T.hero.lead)}</p>`, { link: onward('about', navLabel('about')) })}
            ${row(statKey(0), `<span class="big num">${esc(S[0].value)}</span>`, { size: 'quarter', link: onward('journey', navLabel('journey')) })}
            ${row(statKey(1), `<span class="big num">${esc(S[1].value)}</span>`, { size: 'quarter', link: onward('leadership', navLabel('leadership')) })}
            ${row(statKey(2), `<span class="big num">${esc(S[2].value)}</span>`, { size: 'quarter', link: onward('equipment', navLabel('equipment')) })}
            ${row(statKey(3), `<span class="big num">${esc(S[3].value)}</span>`, { size: 'quarter' })}
            ${row(key((c) => c.certifications.isoHeading), `<span class="big">${counted(C.iso.length, 'certs')}</span>`, { size: 'quarter', link: `<a class="onward" href="${href('certifications')}" data-settab="certs:iso">${esc(navLabel('certifications'))}${fwd()}</a>` })}
            ${row(key((c) => c.certifications.approvalsHeading), `<span class="big">${counted(C.approvals.length, 'entities')}</span>`, { size: 'quarter', link: `<a class="onward" href="${href('certifications')}" data-settab="certs:approvals">${esc(navLabel('certifications'))}${fwd()}</a>` })}
            ${row(key((c, u) => u.disciplines), `<span class="big">${counted(T.services.items.length, 'disciplines')}</span>`, { size: 'quarter', link: onward('services', navLabel('services')) })}
            ${row(key((c, u) => u.projects), `<span class="big">${counted(P.length, 'projects')}</span>`, { size: 'quarter', link: onward('projects', navLabel('projects')) })}
          </dl>
          <section class="live" aria-labelledby="live-h">
            <div class="subband">
              <h2 id="live-h"><span class="k1">${esc(U.projectBoard)}</span><span class="k2" ${altAttrs()}>${esc(ui(other()).projectBoard)}</span></h2>
              ${picker()}
            </div>
            <div id="live" aria-live="polite">${liveRows()}</div>
          </section>
        </article>
      </section>`;
  }

  function swapLive() {
    const host = $('#live');
    if (!host) return;
    const before = Object.fromEntries($$('.row', host).map((r) => [r.dataset.k, r.textContent]));
    host.innerHTML = liveRows();
    let i = 0;
    $$('.row', host).forEach((r) => {
      if (before[r.dataset.k] !== r.textContent) { r.style.setProperty('--i', i++); r.classList.add('swap'); }
    });
    const sel = $('#pick-disc'); if (sel) sel.value = String(state.board.disc);
    $$('[data-pick]').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.pick) === state.board.proj)));
  }

  // ---------- pages ----------
  function pageAbout() {
    const T = t(), I = T.intro, W = T.why;
    // The first four reasons are facts that already live on their own pages
    // (ISO, NWC approval, leadership years, fleet), so About keeps the rest.
    const reasons = W.items.slice(4);
    return `
      <section class="wrap"><article class="board" aria-labelledby="pt">
        ${band(I.title, t(other()).intro.title)}
        <div class="prose-block"><p class="prose">${esc(I.p1)}</p><p class="prose">${esc(I.p2)}</p><p class="prose">${esc(I.p3)}</p></div>
      </article></section>
      <section class="wrap"><div class="board">
        ${band(W.title, t(other()).why.title, W.lead, { level: 2, id: 'why-h' })}
        <ul class="ticks">${reasons.map((r) => `<li>${icon('check')}<span>${esc(r)}</span></li>`).join('')}</ul>
      </div></section>`;
  }

  function pageServices() {
    const T = t(), S = T.services, U = ui();
    return `
      ${head(S.title, t(other()).services.title, S.lead)}
      <section class="wrap"><div class="board">
        <ol class="schedule">${S.items.map((s, i) => {
          const n = discProjects(i).length;
          const alt = t(other()).services.items[i];
          return `<li>
            <a class="sch-title" href="${href(`services/${svcSlug(s)}`)}"><span class="k1">${esc(s.title)}</span><span class="k2" ${altAttrs()}>${esc(alt.title)}</span></a>
            <div class="sch-body"><p class="prose">${esc(s.desc)}</p><ul class="inline-list">${s.capabilities.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></div>
            <div class="sch-count">${n ? counted(n, 'projects') : `<span class="muted">${esc(U.noProjects)}</span>`}</div>
            <a class="sch-go" href="${href(`services/${svcSlug(s)}`)}" aria-label="${esc(s.title)}">${fwd()}</a>
          </li>`;
        }).join('')}</ol>
      </div></section>`;
  }

  function pageService() {
    const T = t(), S = T.services, U = ui();
    const i = svcIndex(state.sub);
    const s = S.items[i];
    const rel = discProjects(i);
    const prev = S.items[(i + S.items.length - 1) % S.items.length];
    const next = S.items[(i + 1) % S.items.length];
    const scope = `<dl class="rows">${s.capabilities.map((c, j) => row(`<span class="k1 num">${no(j + 1)}</span>`, esc(c), { cls: 'numbered' })).join('')}</dl>`;
    const projects = rel.length ? register(rel, U.projectsTab) : `<p class="empty">${esc(U.noProjects)}</p>`;
    return `
      ${crumbs([[S.title, 'services'], [s.title]])}
      ${head(s.title, t(other()).services.items[i].title, s.desc)}
      <section class="wrap"><div class="board">
        ${tabs('svc', s.title, [
          { key: 'scope', label: U.scopeTab, count: s.capabilities.length, html: scope },
          { key: 'projects', label: U.projectsTab, count: rel.length, html: projects },
        ])}
      </div></section>
      ${pager(['services', prev, svcSlug(prev), prev.title], ['services', next, svcSlug(next), next.title], U.allDisciplines)}`;
  }

  function pager(prev, next, label) {
    const U = ui();
    return `<nav class="wrap pager" aria-label="${esc(label)}">
      <a href="${href(`${prev[0]}/${prev[2]}`)}" rel="prev"><span class="pk">${icon(rtl() ? 'arrow-right' : 'arrow-left')}${esc(U.prev)}</span><span class="pv">${esc(prev[3])}</span></a>
      <a href="${href(`${next[0]}/${next[2]}`)}" rel="next"><span class="pk">${esc(U.next)}${fwd()}</span><span class="pv">${esc(next[3])}</span></a>
    </nav>`;
  }

  function pageProjects() {
    const T = t(), P = T.projects, U = ui();
    const items = P.items;
    const shown = state.filter === 'all' ? items : items.filter((p) => p.key === state.filter);
    const owners = new Set(items.map((p) => p.client)).size;
    const places = new Set(items.map((p) => p.location)).size;
    const doneN = items.filter(done).length;
    return `
      ${head(P.title, t(other()).projects.title, P.lead)}
      <section class="wrap"><div class="board">
        <dl class="rows">
          ${row(key((c, u) => u.projects), `<span class="big">${counted(items.length, 'projects')}</span>`, { size: 'quarter' })}
          ${row(key((c, u) => u.completed), `<span class="big num">${doneN}</span>`, { size: 'quarter' })}
          ${row(key((c, u) => u.owners), `<span class="big">${counted(owners, 'entities')}</span>`, { size: 'quarter' })}
          ${row(key((c, u) => u.places), `<span class="big">${counted(places, 'places')}</span>`, { size: 'quarter' })}
        </dl>
        <div class="filters" role="group" aria-label="${esc(U.filterLabel)}">${P.categories.map((c) => {
          const n = c.key === 'all' ? items.length : items.filter((p) => p.key === c.key).length;
          return `<button type="button" data-filter="${c.key}" aria-pressed="${state.filter === c.key}"><span>${esc(c.label)}</span><span class="count num">${n}</span></button>`;
        }).join('')}</div>
        <div id="register">${shown.length ? register(shown, U.register) : `<p class="empty">${esc(P.empty)}</p>`}</div>
      </div></section>`;
  }

  function pageProject() {
    const T = t(), P = T.projects, U = ui();
    const p = projBySlug(state.sub);
    const alt = projById(p.id, other());
    const di = projDisc(p);
    const ds = T.services.items[di];
    const more = P.items.filter((x) => x.key === p.key && x.id !== p.id);
    const list = P.items;
    const k = list.indexOf(p);
    const prev = list[(k + list.length - 1) % list.length];
    const next = list[(k + 1) % list.length];
    return `
      ${crumbs([[P.title, 'projects'], [p.title]])}
      <section class="wrap"><article class="board" aria-labelledby="pt">
        <header class="band">
          <p class="band-no num">${no(p.id)}</p>
          <h1 class="band-title" id="pt">${esc(p.title)}</h1>
          <p class="band-alt" ${altAttrs()}>${esc(alt.title)}</p>
        </header>
        <dl class="rows">
          ${row(key((c) => c.projects.labels.client), esc(p.client), { size: 'half' })}
          ${row(key((c, u) => u.contractor), esc(T.brandLine), { size: 'half' })}
          ${row(key((c) => c.projects.labels.location), esc(p.location), { size: 'half' })}
          ${row(key((c) => c.projects.labels.status), statusMark(p), { size: 'half' })}
          ${row(key((c, u) => u.category), esc(p.category), { size: 'half' })}
          ${row(key((c, u) => u.discipline), ds ? `<a href="${href(`services/${svcSlug(ds)}`)}">${esc(ds.title)}</a>` : '', { size: 'half' })}
          ${row(key((c, u) => u.description), `<p class="prose">${esc(p.desc)}</p>`)}
          ${row(key((c) => c.projects.labels.scope), `<ol class="scope-list">${p.scope.map((x, j) => `<li><span class="num">${no(j + 1)}</span>${esc(x)}</li>`).join('')}</ol>`)}
        </dl>
      </article></section>
      ${more.length ? `<section class="wrap"><div class="board">${band(U.moreInCategory, ui(other()).moreInCategory, '', { level: 2, id: 'more-h' })}${register(more, U.moreInCategory)}</div></section>` : ''}
      ${pager(['projects', prev, projectSlug(prev.id), prev.title], ['projects', next, projectSlug(next.id), next.title], U.allProjects)}`;
  }

  function docRequest(label, type) {
    const U = ui();
    return `<div class="docreq"><div><h2>${esc(U.documents)}</h2><p>${esc(U.documentsNote)}</p></div>
      <a class="btn-line" href="${href('contact')}" data-request="${esc(label)}" data-type="${type}">${icon('file-down')}${esc(label)}</a></div>`;
  }

  function pageEquipment() {
    const T = t(), E = T.equipment, U = ui();
    const cats = `<dl class="rows">${E.categories.map((c, j) => row(`<span class="k1 num">${no(j + 1)}</span>`, esc(c), { cls: 'numbered' })).join('')}</dl>`;
    const support = `<dl class="rows">${E.features.map((f) => row(`<span class="k1">${esc(f.title)}</span>`, `<p class="prose">${esc(f.desc)}</p>`)).join('')}</dl>`;
    return `
      ${head(E.title, t(other()).equipment.title, E.lead)}
      <section class="wrap"><div class="board">
        <dl class="rows">${row(key((c, u) => u.overview), `<p class="prose">${esc(E.p1)}</p><p class="prose">${esc(E.p2)}</p>`)}</dl>
        ${tabs('fleet', E.title, [
          { key: 'categories', label: E.categoriesHeading, count: E.categories.length, html: cats },
          { key: 'support', label: E.supportHeading, count: E.features.length, html: support },
        ])}
        ${docRequest(E.cta, 'equipment-rental')}
      </div></section>`;
  }

  function pageCerts() {
    const T = t(), C = T.certifications, U = ui();
    const iso = `<dl class="rows">${C.iso.map((c) => row(`<span class="k1 num iso">${esc(c.title)}</span>`, esc(c.desc))).join('')}</dl>`;
    const approvals = `<dl class="rows">${C.approvals.map((a, j) => row(`<span class="k1 num">${no(j + 1)}</span>`, esc(a), { cls: 'numbered' })).join('')}</dl>`;
    const commit = `<div class="prose-block"><h3>${esc(C.commitmentTitle)}</h3><p class="prose">${esc(C.commitmentBody)}</p></div>`;
    return `
      ${head(C.title, t(other()).certifications.title, C.lead)}
      <section class="wrap"><div class="board">
        ${tabs('certs', C.title, [
          { key: 'iso', label: C.isoHeading, count: C.iso.length, html: iso },
          { key: 'approvals', label: C.approvalsHeading, count: C.approvals.length, html: approvals },
          { key: 'commitment', label: U.commitmentTab, html: commit },
        ])}
        ${docRequest(C.cta, 'other')}
      </div></section>`;
  }

  function pageJourney() {
    const T = t(), J = T.journey, U = ui();
    const ms = `<dl class="rows">${J.milestones.map((m) => row(`<span class="k1 num year">${esc(m.year)}</span>`, `<strong class="v-title">${esc(m.title)}</strong><p class="prose">${esc(m.desc)}</p>`)).join('')}</dl>`;
    const values = `<dl class="rows">${J.values.map((v) => row(`<span class="k1">${esc(v.title)}</span>`, `<p class="prose">${esc(v.desc)}</p>`)).join('')}</dl>`;
    return `
      ${head(J.title, t(other()).journey.title, J.lead)}
      <section class="wrap"><div class="board">
        ${tabs('journey', J.title, [
          { key: 'milestones', label: U.milestonesTab, count: J.milestones.length, html: ms },
          { key: 'values', label: J.valuesTitle, count: J.values.length, html: values },
        ])}
      </div></section>`;
  }

  function pageLeadership() {
    const T = t(), L = T.leadership, U = ui();
    const altL = t(other()).leadership;
    const chair = L.leaders[0];
    return `
      ${head(L.title, altL.title, L.lead)}
      <section class="wrap leaders">${L.leaders.map((p, i) => `
        <article class="board leader" aria-labelledby="ld-${i}">
          <header class="band band-person">
            <figure class="portrait"><img src="${esc(p.photo)}" alt="${esc(p.name)}" width="240" height="300" loading="lazy" data-portrait /><figcaption class="no-photo">${icon('user-round')}<span>${esc(U.photoMissing)}</span></figcaption></figure>
            <div><h2 class="band-title" id="ld-${i}">${esc(p.name)}</h2><p class="band-alt" ${altAttrs()}>${esc(altL.leaders[i].name)}</p><p class="role">${esc(p.title)}</p></div>
          </header>
          <dl class="rows">
            ${row(key((c, u) => u.overview), `<p class="prose">${esc(p.bio)}</p>`)}
            ${row(key((c) => c.leadership.expertiseHeading), `<ul class="inline-list">${p.expertise.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`)}
          </dl>
        </article>`).join('')}
      </section>
      <section class="wrap"><figure class="board quote-board">
        ${band(L.quoteTitle, altL.quoteTitle, '', { level: 2, id: 'q-h' })}
        <blockquote><p>${esc(L.quote)}</p></blockquote>
        <figcaption><strong>${esc(chair.name)}</strong><span>${esc(chair.title)}</span></figcaption>
      </figure></section>`;
  }

  // A form field laid out as a board row: label in the key column.
  function field(id, label, control, err, hint = '') {
    return `<div class="row full frow"><div class="key"><label for="${id}" class="k1">${esc(label)}</label></div><div class="val">${control}${hint ? `<span class="hint" id="${id}-hint">${esc(hint)}</span>` : ''}<span class="err" id="${id}-err" hidden>${icon('circle-alert')}<span>${esc(err || '')}</span></span></div></div>`;
  }
  const protoNote = () => `<p class="proto">${esc(ui().proto)}</p>`;

  function pageContact() {
    const T = t(), C = T.contact, U = ui();
    const pf = state.prefill || {};
    return `
      ${head(C.title, t(other()).contact.title, C.lead)}
      <section class="wrap contact">
        <form class="board form" id="q-form" novalidate aria-labelledby="q-h">
          ${band(U.quote, ui(other()).quote, '', { level: 2, id: 'q-h' })}
          <div class="rows">
            ${field('q-name', C.fields.name, `<input id="q-name" name="name" autocomplete="name" placeholder="${esc(C.placeholders.name)}" aria-describedby="q-name-err">`, C.errors.name)}
            ${field('q-email', C.fields.email, `<input id="q-email" name="email" type="email" autocomplete="email" dir="ltr" placeholder="${esc(C.placeholders.email)}" aria-describedby="q-email-err">`, C.errors.email)}
            ${field('q-company', C.fields.company, `<input id="q-company" name="company" autocomplete="organization" placeholder="${esc(C.placeholders.company)}" aria-describedby="q-company-err">`, C.errors.company)}
            ${field('q-type', C.fields.type, `<span class="select">${icon('chevron-down')}<select id="q-type" name="type"><option value="">${esc(C.placeholders.type)}</option>${C.typeOptions.map((o) => `<option value="${o.key}"${pf.type === o.key ? ' selected' : ''}>${esc(o.label)}</option>`).join('')}</select></span>`, '')}
            ${field('q-message', C.fields.message, `<textarea id="q-message" name="message" rows="6" placeholder="${esc(C.placeholders.message)}" aria-describedby="q-message-err">${esc(pf.message || '')}</textarea>`, C.errors.message)}
          </div>
          <div class="form-foot">${protoNote()}<button class="btn-ink" type="submit">${icon('send', 'flip')}<span>${esc(C.submit)}</span></button></div>
          <div class="status-host" id="q-status" aria-live="polite"></div>
        </form>
        <aside class="board office" aria-labelledby="o-h">
          ${band(C.officeHeading, t(other()).contact.officeHeading, '', { level: 2, id: 'o-h' })}
          <dl class="rows">
            ${row(key((c, u) => u.office), esc(C.address))}
            ${row(key((c, u) => u.mobile), `<a href="tel:${CO.mobile.replace(/\s/g, '')}" dir="ltr" class="num">${esc(CO.mobile)}</a>`)}
            ${row(key((c) => c.contact.hoursHeading), C.hours.map((h) => `<span class="line">${esc(h)}</span>`).join(''))}
          </dl>
        </aside>
      </section>`;
  }

  function pageCareers() {
    const T = t(), K = T.careers, U = ui();
    return `
      <section class="wrap"><div class="board head-board">
        ${band(K.title, t(other()).careers.title, K.lead)}
        <div class="head-act"><a class="btn-line on-band" href="#apply" data-jump="apply">${esc(K.cta)}${icon('chevron-down')}</a></div>
      </div></section>
      <section class="wrap"><div class="board">
        ${band(K.whyTitle, t(other()).careers.whyTitle, '', { level: 2, id: 'why-h' })}
        <dl class="rows">${K.why.map((w) => row(`<span class="k1">${esc(w.title)}</span>`, `<p class="prose">${esc(w.desc)}</p>`, { size: 'half' })).join('')}</dl>
      </div></section>
      <section class="wrap"><div class="board">
        ${band(K.rolesTitle, t(other()).careers.rolesTitle, K.rolesLead, { level: 2, id: 'roles-h' })}
        <table class="register roles"><caption class="vh">${esc(K.rolesTitle)}</caption>
          <thead><tr><th scope="col">${esc(U.role)}</th><th scope="col">${esc(U.dept)}</th><th scope="col">${esc(U.loc)}</th><th scope="col">${esc(U.type)}</th><th scope="col">${esc(U.exp)}</th><th scope="col"><span class="vh">${esc(U.apply)}</span></th></tr></thead>
          <tbody>${K.roles.map((r) => `<tr><th scope="row" class="c-title">${esc(r.title)}</th><td data-k="${esc(U.dept)}">${esc(r.dept)}</td><td data-k="${esc(U.loc)}">${esc(r.location)}</td><td data-k="${esc(U.type)}">${esc(r.type)}</td><td data-k="${esc(U.exp)}">${esc(r.exp)}</td><td class="c-act"><button class="btn-line sm" type="button" data-role="${r.slug}">${esc(U.apply)}</button></td></tr>`).join('')}</tbody>
        </table>
      </div></section>
      <section class="wrap" id="apply"><form class="board form" id="a-form" novalidate aria-labelledby="a-h">
        ${band(K.applyTitle, t(other()).careers.applyTitle, K.applyLead, { level: 2, id: 'a-h' })}
        <div class="rows">
          ${field('a-name', K.fields.name, `<input id="a-name" name="name" autocomplete="name" placeholder="${esc(K.placeholders.name)}" aria-describedby="a-name-err">`, K.errors.name)}
          ${field('a-email', K.fields.email, `<input id="a-email" name="email" type="email" autocomplete="email" dir="ltr" placeholder="${esc(K.placeholders.email)}" aria-describedby="a-email-err">`, K.errors.email)}
          ${field('a-phone', K.fields.phone, `<input id="a-phone" name="phone" type="tel" autocomplete="tel" dir="ltr" placeholder="${esc(K.placeholders.phone)}" aria-describedby="a-phone-err">`, K.errors.phone)}
          ${field('a-exp', K.fields.exp, `<input id="a-exp" name="exp" type="number" min="0" max="60" inputmode="numeric" placeholder="${esc(K.placeholders.exp)}" aria-describedby="a-exp-err">`, K.errors.exp)}
          ${field('a-role', K.fields.role, `<span class="select">${icon('chevron-down')}<select id="a-role" name="role" aria-describedby="a-role-err"><option value="">${esc(K.placeholders.role)}</option>${K.roles.map((r) => `<option value="${r.slug}"${state.role === r.slug ? ' selected' : ''}>${esc(r.title)}</option>`).join('')}<option value="other">${esc(K.otherRole)}</option></select></span>`, K.errors.role)}
          <div class="row full frow"><div class="key"><span class="k1" id="a-cv-l">${esc(K.fields.cv)}</span></div><div class="val">
            <label class="sub-label" for="a-cv">${esc(K.cvLink)}</label>
            <input id="a-cv" name="cv" type="url" dir="ltr" placeholder="${esc(K.placeholders.cv)}" aria-describedby="a-cv-l a-cv-hint a-cv-err">
            <div class="file-row"><span class="sub-label">${esc(K.cvUpload)}</span><label class="btn-line sm" for="a-file">${icon('upload')}${esc(K.cvUploadBtn)}</label><input id="a-file" type="file" accept=".pdf,.doc,.docx" class="vh"><span id="a-file-name" class="muted">${esc(K.cvNone)}</span></div>
            <span class="hint" id="a-cv-hint">${esc(K.cvHint)}</span>
            <span class="err" id="a-cv-err" hidden>${icon('circle-alert')}<span>${esc(K.errors.cv)}</span></span>
          </div></div>
          ${field('a-note', K.fields.note, `<textarea id="a-note" name="note" rows="4" placeholder="${esc(K.placeholders.note)}"></textarea>`, '')}
        </div>
        <div class="form-foot">${protoNote()}<button class="btn-ink" type="submit">${icon('send', 'flip')}<span>${esc(K.submit)}</span></button></div>
        <div class="status-host" id="a-status" aria-live="polite"></div>
      </form></section>`;
  }

  const PAGE_FN = { '': pageHome, about: pageAbout, services: pageServices, projects: pageProjects, equipment: pageEquipment, certifications: pageCerts, journey: pageJourney, leadership: pageLeadership, contact: pageContact, careers: pageCareers };

  function pageTitle() {
    const T = t();
    if (state.page === 'services' && state.sub) return `${T.services.items[svcIndex(state.sub)].title} | ${T.brandLine}`;
    if (state.page === 'projects' && state.sub) return `${projBySlug(state.sub).title} | ${T.brandLine}`;
    if (!state.page) return T.brandLine;
    if (state.page === 'careers') return `${T.careers.title} | ${T.brandLine}`;
    return `${navLabel(state.page)} | ${T.brandLine}`;
  }

  // ---------- render ----------
  let lastKey = '';
  function render(force = false) {
    const { lang, page, sub } = parseHash();
    const changed = page !== state.page || lang !== state.lang || sub !== state.sub;
    state.lang = lang; state.page = page; state.sub = sub;
    const k = `${lang}/${page}/${sub}`;
    if (!force && k === lastKey) return;
    if (page !== 'contact') state.prefill = null;
    lastKey = k;

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = pageTitle();
    $('.skip').textContent = ui().skip;
    $('#strip').innerHTML = strip();
    $('#mast').innerHTML = mast();
    $('#main').innerHTML = (page === 'services' && sub) ? pageService() : (page === 'projects' && sub) ? pageProject() : PAGE_FN[page]();
    $('#foot').innerHTML = foot();
    if (changed || force) window.scrollTo({ top: 0, behavior: 'auto' });
    if (state.jump) { const el = document.getElementById(state.jump); state.jump = null; if (el) el.scrollIntoView(); }
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
  function submitLike(form, statusId, okText, busyText) {
    const btn = $('button[type=submit]', form);
    const label = $('span:last-child', btn);
    const was = label.textContent;
    btn.setAttribute('aria-busy', 'true'); btn.disabled = true; label.textContent = busyText;
    setTimeout(() => {
      btn.removeAttribute('aria-busy'); btn.disabled = false; label.textContent = was;
      document.getElementById(statusId).innerHTML = `<div class="notice" role="status">${icon('check')}<div><strong>${esc(okText)}</strong><span>${esc(ui().protoSent)}</span></div></div>`;
      form.reset();
    }, 700);
  }

  // ---------- drawer ----------
  function setDrawer(open) {
    const d = $('#drawer'), b = $('.menu-btn');
    if (!d || !b) return;
    d.hidden = !open;
    document.body.classList.toggle('drawer-open', open);
    b.setAttribute('aria-expanded', String(open));
    b.innerHTML = icon(open ? 'x' : 'menu');
    b.setAttribute('aria-label', open ? ui().close : ui().menu);
  }

  // ---------- events ----------
  document.addEventListener('click', (e) => {
    const el = e.target.closest('button, a');
    if (!el) return;
    const T = t();

    if (el.matches('.menu-btn')) { setDrawer($('#drawer').hidden); return; }
    if (el.closest('.drawer')) setDrawer(false);

    if (el.matches('[role=tab]')) { selectTab(el); return; }
    if (el.dataset.pick) {
      const id = Number(el.dataset.pick);
      const p = projById(id);
      state.board = { disc: Math.max(0, projDisc(p)), proj: id };
      swapLive();
      return;
    }
    if (el.dataset.settab) { const [id, k] = el.dataset.settab.split(':'); state.tabs[id] = k; return; }
    if (el.dataset.filter) {
      state.filter = el.dataset.filter;
      const host = $('#main');
      host.innerHTML = pageProjects();
      $(`[data-filter="${state.filter}"]`)?.focus();
      return;
    }
    if (el.dataset.request) {
      e.preventDefault();
      go('contact', { prefill: { type: el.dataset.type || '', message: `${el.dataset.request}: ` } });
      return;
    }
    if (el.dataset.role) {
      state.role = el.dataset.role;
      const sel = $('#a-role'); if (sel) sel.value = state.role;
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      $('#apply').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      setTimeout(() => $('#a-name')?.focus({ preventScroll: true }), reduce ? 0 : 450);
      return;
    }
    if (el.dataset.jump) { e.preventDefault(); document.getElementById(el.dataset.jump)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); return; }
    if (el.hasAttribute('data-quote')) {
      // The single quote action carries the page it was pressed on.
      state.prefill = null;
      if (state.page === 'services' && state.sub) {
        const s = T.services.items[svcIndex(state.sub)];
        state.prefill = { type: svc(s).type, message: `${T.services.inquireCta} ${s.title}: ` };
      } else if (state.page === 'projects' && state.sub) {
        const p = projBySlug(state.sub);
        state.prefill = { type: PROJECT_TYPE[p.key] || 'other', message: `${T.projects.detailsCta}: ${p.title} — ` };
      }
      if (state.page === 'contact') { e.preventDefault(); render(true); $('#q-name')?.focus(); }
    }
  });

  document.addEventListener('keydown', (e) => {
    const tab = e.target.closest?.('[role=tab]');
    if (tab && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
      const list = $$('[role=tab]', tab.parentElement);
      const i = list.indexOf(tab);
      const f = rtl() ? 'ArrowLeft' : 'ArrowRight';
      const j = e.key === 'Home' ? 0 : e.key === 'End' ? list.length - 1 : (i + (e.key === f ? 1 : -1) + list.length) % list.length;
      e.preventDefault(); selectTab(list[j], true); return;
    }
    if (e.key === 'Escape' && $('#drawer') && !$('#drawer').hidden) { setDrawer(false); $('.menu-btn').focus(); }
  });

  document.addEventListener('change', (e) => {
    if (e.target.id === 'pick-disc') {
      const d = Number(e.target.value);
      const first = discProjects(d)[0];
      state.board = { disc: d, proj: first ? first.id : null };
      swapLive();
      return;
    }
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
    if (form.id === 'q-form') {
      const C = t().contact;
      const bad = [
        setErr('q-name', !v('name')),
        setErr('q-email', !validEmail(v('email')), v('email') ? C.errors.email : ui().emailRequired),
        setErr('q-company', !v('company')),
        setErr('q-message', v('message').length < 10),
      ];
      const first = ['q-name', 'q-email', 'q-company', 'q-message'][bad.indexOf(true)];
      if (first) { document.getElementById(first).focus(); return; }
      submitLike(form, 'q-status', C.success, C.submitting);
    }
    if (form.id === 'a-form') {
      const K = t().careers;
      const hasFile = !!$('#a-file').files.length;
      const bad = [
        setErr('a-name', !v('name')),
        setErr('a-email', !validEmail(v('email')), v('email') ? K.errors.email : ui().emailRequired),
        setErr('a-phone', !v('phone')),
        setErr('a-exp', v('exp') === ''),
        setErr('a-role', !v('role')),
        setErr('a-cv', !v('cv') && !hasFile),
      ];
      const first = ['a-name', 'a-email', 'a-phone', 'a-exp', 'a-role', 'a-cv'][bad.indexOf(true)];
      if (first) { document.getElementById(first).focus(); return; }
      submitLike(form, 'a-status', K.success, K.submitting);
      $('#a-file-name').textContent = K.cvNone;
    }
  });

  // An invalid field stays invalid while focused; it clears only once the
  // value is actually valid.
  document.addEventListener('input', (e) => {
    const el = e.target, id = el.id;
    if (el.getAttribute('aria-invalid') !== 'true') return;
    const val = el.value.trim();
    const ok = id.endsWith('email') ? validEmail(val) : id.endsWith('-message') ? val.length >= 10 : id === 'a-cv' ? !!val : !!val;
    if (ok) setErr(id, false);
  });

  // Portraits come from the live site's CDN; when it cannot be reached the
  // figure shows its labelled fallback instead of a broken image.
  document.addEventListener('error', (e) => {
    const img = e.target;
    if (img.tagName === 'IMG' && img.hasAttribute('data-portrait')) { img.closest('.portrait').classList.add('missing'); img.remove(); }
  }, true);

  addEventListener('hashchange', () => { setDrawer(false); render(); });
  addEventListener('resize', () => { if (innerWidth > 1180) setDrawer(false); });
  render(true);
})();
