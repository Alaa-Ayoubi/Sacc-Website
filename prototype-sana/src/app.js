/* SACC proposal 5 — "The dark room". Interactive, bilingual, every page.
 *
 * Idea: سنا means light; one dark field, and in it SACC's real works are
 * the lit things. Live thing: the discipline filter on the work index lights
 * only the projects of the discipline chosen. Content is the real snapshot;
 * only the small UI strings below are new copy, in both languages.
 */
(() => {
  'use strict';
  const { content, icons, logo } = window.SACC;
  const C0 = content.company, IMG = content.images;
  const PAGES = ['', 'company', 'services', 'projects', 'fleet', 'approvals', 'contact', 'careers'];
  const NAV = ['company', 'services', 'projects', 'fleet', 'approvals'];
  const remote = (u) => (/^https?:/i.test(u || '') ? u : '');

  const UI = {
    ar: {
      skip: 'تخطَّ إلى المحتوى', menu: 'القائمة', close: 'إغلاق', quote: 'اطلب عرض سعر',
      langName: 'English', langLabel: 'Switch to English',
      nav: { company: 'الشركة', services: 'الخدمات', projects: 'المشاريع', fleet: 'الأسطول', approvals: 'الاعتمادات' },
      name: 'سنا الأوائل للمقاولات', seeWork: 'شاهد أعمالنا',
      discH: 'تخصصاتنا',
      groups: [
        { name: 'الشبكات', icons: ['Droplets', 'CloudRain', 'Zap'], sum: 'مياه وصرف صحي وتصريف أمطار وكهرباء وطاقة شمسية.' },
        { name: 'الطرق والمنشآت', icons: ['Route', 'Construction', 'Building2'], sum: 'طرق وأسفلت وجسور وأنفاق وتنسيق عمراني.' },
        { name: 'الفحص والتشغيل', icons: ['ShieldCheck', 'Truck', 'Settings'], sum: 'ضبط الجودة والمختبرات وتأجير المعدات والتشغيل والصيانة.' },
      ],
      workH: 'مشاريعنا', all: 'الكل',
      proofOpen: 'معتمدون لدى', proofEnd: 'حاصلون على شهادات الأيزو 9001 و14001 و45001.', proofMore: 'الاعتمادات بالتفصيل',
      figH: 'أسطول نملكه', figSay: 'آلة ومركبة ثقيلة نملكها ونشغّلها بكوادرنا المعتمدة.', fleetMore: 'الأسطول بالتفصيل',
      chairH: 'كلمة رئيس مجلس الإدارة', office: 'المقر', officeShort: 'المدينة المنورة', cr: 'السجل التجاري', phone: 'الهاتف',
      visitH: 'مكتبنا في المدينة المنورة', call: 'اتصل بنا', mobile: 'الجوال', email: 'البريد',
      proto: 'نموذج تصميم تفاعلي للمراجعة؛ النماذج لا ترسل أي بيانات.',
      protoSent: 'هذا نموذج للمراجعة: لم يُرسل شيء. بعد الدمج تُحفظ الرسالة ويُبلَّغ الفريق.',
      emailRequired: 'البريد الإلكتروني مطلوب',
      details: 'التفاصيل', allDisc: 'كل التخصصات', allProj: 'كل المشاريع',
      scope: 'نطاق العمل', delivered: 'المشاريع في هذا التخصص', noProj: 'لا توجد مشاريع منشورة في هذا التخصص بعد.',
      prev: 'التخصص السابق', next: 'التخصص التالي', category: 'التصنيف', discipline: 'التخصص',
      more: 'مشاريع أخرى في التصنيف نفسه',
      tabs: { about: 'نبذة', journey: 'المسيرة', values: 'القيم', people: 'القيادة' },
      apply: 'تقدّم', rolesH: 'الوظائف المتاحة',
    },
    en: {
      skip: 'Skip to content', menu: 'Menu', close: 'Close', quote: 'Request a Quote',
      langName: 'العربية', langLabel: 'التبديل إلى العربية',
      nav: { company: 'Company', services: 'Services', projects: 'Projects', fleet: 'Fleet', approvals: 'Approvals' },
      name: 'Sana Al-Awael Contracting', seeWork: 'See our work',
      discH: 'Disciplines',
      groups: [
        { name: 'Networks', icons: ['Droplets', 'CloudRain', 'Zap'], sum: 'Water, sewerage, stormwater, electricity and solar.' },
        { name: 'Roads and structures', icons: ['Route', 'Construction', 'Building2'], sum: 'Roads and asphalt, bridges and tunnels, landscaping.' },
        { name: 'Testing and operations', icons: ['ShieldCheck', 'Truck', 'Settings'], sum: 'Quality control and laboratories, equipment rental, operation and maintenance.' },
      ],
      workH: 'Our projects', all: 'All',
      proofOpen: 'Approved by', proofEnd: 'Certified to ISO 9001, 14001 and 45001.', proofMore: 'Approvals in full',
      figH: 'A fleet we own', figSay: 'heavy machines and vehicles we own and run with our own certified operators.', fleetMore: 'The fleet in full',
      chairH: 'From the Chairman', office: 'Head office', officeShort: 'Al Madinah', cr: 'Commercial Registration', phone: 'Phone',
      visitH: 'Our office in Al Madinah', call: 'Call us', mobile: 'Mobile', email: 'Email',
      proto: 'Interactive design prototype for review; forms send nothing.',
      protoSent: 'This is a review prototype: nothing was sent. Once integrated, the message is stored and the team is notified.',
      emailRequired: 'Email is required',
      details: 'Details', allDisc: 'All disciplines', allProj: 'All projects',
      scope: 'Scope of work', delivered: 'Projects in this discipline', noProj: 'No published projects in this discipline yet.',
      prev: 'Previous discipline', next: 'Next discipline', category: 'Category', discipline: 'Discipline',
      more: 'More projects in this category',
      tabs: { about: 'Overview', journey: 'Journey', values: 'Values', people: 'Leadership' },
      apply: 'Apply', rolesH: 'Open roles',
    },
  };

  const SVC = {
    Droplets: { slug: 'water-sewerage', cat: ['water'], type: 'water-sewerage' },
    CloudRain: { slug: 'stormwater', cat: [], type: 'water-sewerage' },
    Zap: { slug: 'electrical-solar', cat: ['electrical'], type: 'other' },
    Route: { slug: 'roads-asphalt', cat: ['roads'], type: 'roads-asphalt' },
    Construction: { slug: 'bridges-tunnels', cat: [], type: 'bridges-tunnels' },
    Building2: { slug: 'landscaping', cat: ['urban'], type: 'urban-development' },
    ShieldCheck: { slug: 'quality-laboratory', cat: [], type: 'other' },
    Truck: { slug: 'equipment-rental', cat: [], type: 'equipment-rental' },
    Settings: { slug: 'operation-maintenance', cat: [], type: 'other' },
  };
  const CAT_SVC = { water: 'Droplets', roads: 'Route', electrical: 'Zap', urban: 'Building2' };
  const CAT_TYPE = { water: 'water-sewerage', roads: 'roads-asphalt', urban: 'urban-development', electrical: 'other' };

  const state = { lang: 'ar', page: '', sub: '', filter: 'all', prefill: null, role: '', tabs: {} };
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
  const svcIdx = (slug) => t().services.items.findIndex((s) => svcOf(s).slug === slug);
  const projBy = (slug) => t().projects.items.find((p) => projSlug(p.id) === slug);
  const projImg = (p) => remote(IMG.projects?.[p.id - 1]);
  const relProj = (s) => t().projects.items.filter((p) => svcOf(s).cat.includes(p.key));
  const isDone = (p) => /complete|مكتمل|منجز/i.test(p.status);
  const catLabel = (p) => t().projects.categories.find((c) => c.key === p.key)?.label || p.category;
  // A company photograph with an honest stand-in (the name in type) if it cannot load.
  const pic = (url, alt, standText, cls = 'pic', eager = false) => `<figure class="${cls}${url ? ' has-img' : ''}">${url ? `<img src="${esc(url)}" alt="${esc(alt)}" ${eager ? '' : 'loading="lazy"'} onerror="this.parentNode.classList.add('broken')">` : ''}<div class="stand-in"><span>${esc(standText)}</span></div></figure>`;

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
  function bar() {
    const T = t(), U = ui();
    const here = state.sub ? `${state.page}/${state.sub}` : state.page;
    const other = rtl() ? 'en' : 'ar';
    const cur = (id) => (state.page === id ? ' aria-current="page"' : '');
    return `<div class="bar-in">
      <a class="brand" href="${href('')}"><img src="${logo}" alt="${esc(T.brandLine)}" width="120" height="30"></a>
      <nav aria-label="${esc(U.menu)}"><ul>${NAV.map((id) => `<li><a href="${href(id)}"${cur(id)}>${esc(U.nav[id])}</a></li>`).join('')}</ul></nav>
      <div class="tools">
        <a class="lang" href="${href(here, other)}" hreflang="${other}" lang="${other}" aria-label="${esc(U.langLabel)}">${icon('languages')}<span class="long">${esc(U.langName)}</span><span class="short" aria-hidden="true">${rtl() ? 'EN' : 'ع'}</span></a>
        <a class="action" href="${href('contact')}" data-quote>${esc(U.quote)}</a>
        <button class="menu-btn" type="button" aria-expanded="false" aria-controls="drawer" aria-label="${esc(U.menu)}">${icon('menu')}</button>
      </div>
    </div>
    <nav class="drawer" id="drawer" aria-label="${esc(U.menu)}"><ul>${NAV.map((id) => `<li><a href="${href(id)}"${cur(id)}>${esc(U.nav[id])}</a></li>`).join('')}</ul></nav>`;
  }

  function foot() {
    const T = t(), U = ui();
    return `<div class="foot-in">
      <p class="name">${esc(T.brandLine)}</p>
      <div class="side"><a href="${href('careers')}">${esc(T.navCareers)}</a><small>${esc(U.proto)}</small><small>${esc(T.footer.rights)}</small></div>
    </div>`;
  }

  const pageHead = (title, lead = '', extra = '') => `<header class="page-head wrap rise"><h1>${esc(title)}</h1>${lead ? `<p>${esc(lead)}</p>` : ''}${extra}</header>`;

  // ---------- home ----------
  function home() {
    const T = t(), U = ui(), S = T.stats, L = T.leadership, C = T.contact;
    const projects = T.projects.items;
    const cats = T.projects.categories;
    const chair = L.leaders[0];
    const heroImg = remote(IMG.projects?.[4]);
    return `
      <section class="hero" aria-labelledby="h1">
        <figure class="pic">${heroImg ? `<img src="${esc(heroImg)}" alt="" fetchpriority="high">` : ''}</figure>
        <div class="hero-grid">
          <div class="mid"><p>${esc(T.hero.lead)}</p></div>
          <h1 id="h1"><span class="mask"><span>${esc(U.name)}</span></span></h1>
        </div>
      </section>

      <section class="sec disc wrap" aria-labelledby="disc-h">
        <h2 class="sec-h rise" id="disc-h">${esc(U.discH)}</h2>
        <div class="grid12">
          ${U.groups.map((g, gi) => `<div class="col rise" style="--d:${gi + 1}"><h3 class="gname">${esc(g.name)}</h3><ul>${g.icons.map((ic) => {
            const s = T.services.items.find((x) => x.icon === ic);
            return `<li><a href="${href(`services/${svcOf(s).slug}`)}" data-desc="${esc(s.desc)}" data-title="${esc(s.title)}">${esc(s.title)}</a></li>`;
          }).join('')}</ul><p class="sum">${esc(g.sum)}</p></div>`).join('')}
          <p class="spot" id="spot" aria-live="polite"><strong>${esc(T.services.items[0].title)}</strong>${esc(T.services.items[0].desc)}</p>
        </div>
      </section>

      <section class="sec work wrap" id="work" aria-labelledby="work-h">
        <h2 class="sec-h rise" id="work-h">${esc(U.workH)}</h2>
        <div class="filters rise" role="group" aria-label="${esc(U.workH)}">${cats.map((c) => `<button type="button" data-filter="${c.key}" aria-pressed="${state.filter === c.key}">${esc(c.key === 'all' ? U.all : c.label)}</button>`).join('')}</div>
        <div class="grid12">
          <ul class="names" id="names">${projects.map((p, i) => `<li data-key="${p.key}"${state.filter !== 'all' && state.filter !== p.key ? ' class="out"' : ''}>
            ${(() => { const u = projImg(p); return u ? `<figure class="phone-pic has-img"><img src="${esc(u)}" alt="${esc(p.title)}" loading="lazy" onerror="this.parentNode.classList.add('broken')"></figure>` : ''; })()}
            <a href="${href(`projects/${projSlug(p.id)}`)}" data-i="${i}"${i === 0 ? ' class="on"' : ''}><span class="n">${esc(p.title)}</span><span class="meta">${esc(catLabel(p))} · ${esc(p.client)}</span></a></li>`).join('')}</ul>
          <div class="frame" aria-hidden="true">${projects.map((p, i) => { const u = projImg(p); return `<figure data-i="${i}" class="${i === 0 ? 'on ' : ''}${u ? 'has-img' : ''}">${u ? `<img src="${esc(u)}" alt="" loading="lazy" onerror="this.parentNode.classList.add('broken')">` : ''}<div class="stand"><span>${esc(p.location)}</span><small>${esc(p.client)}</small></div></figure>`; }).join('')}</div>
        </div>
      </section>

      <section class="sec proof wrap" aria-labelledby="proof-h">
        <h2 class="visually-hidden" id="proof-h">${esc(U.proofOpen)}</h2>
        <p class="rise"><span class="open">${esc(U.proofOpen)}</span> ${T.certifications.approvals.map((a, i) => `<span class="nm${i === 0 ? ' lit' : ''}">${esc(a.replace(/\s*\([^)]*\)/, ''))}</span>`).join(rtl() ? '، ' : ', ')}.</p>
        <div class="more rise"><span class="iso">${esc(U.proofEnd)}</span> <a class="link" href="${href('approvals')}">${esc(U.proofMore)} ${arrow()}</a></div>
      </section>

      <section class="fig" aria-labelledby="fig-h">
        <figure class="pic">${remote(IMG.careers) ? `<img src="${esc(IMG.careers)}" alt="" loading="lazy">` : ''}</figure>
        <h2 class="top" id="fig-h">${esc(U.figH)}</h2>
        <p class="big num"><span class="ltr">${esc(S[2].value)}</span></p>
        <p class="say">${esc(U.figSay)}</p>
      </section>
      <div class="wrap">
        <div class="figs"><div class="rise"><strong class="num ltr">${esc(S[0].value)}</strong><span>${esc(S[0].label)}</span></div><div class="rise" style="--d:1"><strong class="num ltr">${esc(S[1].value)}</strong><span>${esc(S[1].label)}</span></div></div>
        <div class="fig-foot"><a class="link" href="${href('fleet')}">${esc(U.fleetMore)} ${arrow()}</a></div>
      </div>

      <section class="sec lead-q wrap" aria-labelledby="chair-h">
        <div class="chair">
          <div class="body">
            <h2 class="sec-h rise" id="chair-h">${esc(U.chairH)}</h2>
            <blockquote class="rise" style="--d:1">${esc(L.quote.replace(/^["«]|["»]$/g, ''))}</blockquote>
            <p class="who rise" style="--d:2"><b>${esc(chair.name)}</b> · ${esc(chair.title)}</p>
            <div class="facts rise" style="--d:3"><div>${esc(U.office)}<b>${esc(U.officeShort)}</b></div><div>${esc(U.cr)}<b class="num">${esc(C0.cr)}</b></div><div>${esc(U.phone)}<b class="ltr num">${esc(C0.phone)}</b></div></div>
          </div>
          <figure class="portrait-lg rise" style="--d:1">${remote(IMG.chairman) ? `<img src="${esc(IMG.chairman)}" alt="${esc(chair.name)}" loading="lazy" onerror="this.parentNode.classList.add('broken')">` : ''}</figure>
        </div>
      </section>

      <section class="visit" aria-labelledby="visit-h">
        <figure class="pic">${remote(IMG.projects?.[0]) ? `<img src="${esc(IMG.projects[0])}" alt="" loading="lazy">` : ''}</figure>
        <div class="visit-in">
          <div class="card">
            <h2 id="visit-h">${esc(U.visitH)}</h2>
            <p>${esc(C.address)}</p>
            <dl>${C.hours.map((h) => { const m = h.match(/^(.*?)(?:[،,]\s*|:\s+)(.*)$/) || [h, h, '']; return `<div><dt>${esc(m[1])}</dt><dd class="num">${esc(m[2])}</dd></div>`; }).join('')}</dl>
            <div class="contacts"><a href="tel:${C0.mobile.replace(/\s/g, '')}"><span class="ltr num">${esc(C0.mobile)}</span></a><a href="mailto:${C0.email}">${esc(C0.email)}</a></div>
            <a class="call" href="tel:${C0.phone.replace(/\s/g, '')}">${icon('phone')}<span>${esc(U.call)} <span class="ltr num">${esc(C0.phone)}</span></span></a>
          </div>
        </div>
      </section>`;
  }

  // ---------- inner pages ----------
  function company() {
    const T = t(), U = ui(), I = T.intro, J = T.journey, L = T.leadership;
    const photos = [IMG.chairman, IMG.gm];
    const panels = [
      { key: 'about', label: U.tabs.about, html: `<div class="grid12"><div style="grid-column:1 / span 7"><p style="font-size:var(--step-lead);line-height:1.55">${esc(I.p2)}</p><p style="margin-top:24px">${esc(I.p3)}</p></div><div style="grid-column:9 / span 4"><h3 class="sec-h" style="font-size:1.25rem;margin-bottom:16px">${esc(T.why.title)}</h3><ul class="plain">${T.why.items.slice(4).map((w) => `<li>${esc(w)}</li>`).join('')}</ul></div></div>` },
      { key: 'journey', label: U.tabs.journey, html: `<ol class="years">${J.milestones.map((m) => `<li><span class="y num">${esc(m.year)}</span><div class="t"><b>${esc(m.title)}</b><span>${esc(m.desc)}</span></div></li>`).join('')}</ol>` },
      { key: 'values', label: U.tabs.values, html: `<div class="cols">${J.values.map((v) => `<div><h3>${esc(v.title)}</h3><p>${esc(v.desc)}</p></div>`).join('')}</div>` },
      { key: 'people', label: U.tabs.people, html: `<div class="people">${L.leaders.map((p, i) => `<article class="person"><figure class="face">${remote(photos[i]) ? `<img src="${esc(photos[i])}" alt="${esc(p.name)}" loading="lazy" onerror="this.remove()">` : ''}</figure><div><h3>${esc(p.name)}</h3><p class="role">${esc(p.title)}</p><p>${esc(p.bio)}</p><p class="tags">${(p.expertise || []).map(esc).join(' · ')}</p></div></article>`).join('')}</div>` },
    ];
    return `${pageHead(I.title, I.p1)}<section class="sec wrap">${tabs('co', I.title, panels)}</section>`;
  }

  function services() {
    const S = t().services, U = ui();
    return `${pageHead(S.title, S.lead)}
      <section class="sec wrap idx"><div class="grid12">
        <ul class="names" id="svc-names">${S.items.map((s, i) => `<li><a href="${href(`services/${svcOf(s).slug}`)}" data-i="${i}"${i === 0 ? ' class="on"' : ''}><span class="n">${esc(s.title)}</span></a></li>`).join('')}</ul>
        <div class="detail" aria-live="polite">${S.items.map((s, i) => `<div class="pane${i === 0 ? ' on' : ''}" data-i="${i}"><h2>${esc(s.title)}</h2><p>${esc(s.desc)}</p><ul>${s.capabilities.map((c) => `<li>${esc(c)}</li>`).join('')}</ul><a class="link" href="${href(`services/${svcOf(s).slug}`)}">${esc(U.details)} ${arrow()}</a></div>`).join('')}</div>
      </div></section>`;
  }

  function service() {
    const T = t(), U = ui(), S = T.services, i = svcIdx(state.sub), s = S.items[i];
    const rel = relProj(s);
    const prev = S.items[(i + S.items.length - 1) % S.items.length], next = S.items[(i + 1) % S.items.length];
    return `${pageHead(s.title, s.desc, `<a class="link back" href="${href('services')}">${esc(U.allDisc)}</a>`)}
      <section class="sec wrap">
        <h2 class="sec-h rise" style="margin-bottom:28px">${esc(U.scope)}</h2>
        <div class="cols rise">${s.capabilities.map((c) => `<div><h3>${esc(c)}</h3></div>`).join('')}</div>
      </section>
      <section class="sec wrap">
        <h2 class="sec-h rise" style="margin-bottom:40px">${esc(U.delivered)}</h2>
        ${rel.length ? `<div class="entries">${rel.map(entry).join('')}</div>` : `<p class="rise" style="color:var(--muted)">${esc(U.noProj)}</p>`}
        <nav class="pager" aria-label="${esc(U.allDisc)}"><a href="${href(`services/${svcOf(prev).slug}`)}" rel="prev"><span>${esc(U.prev)}</span><strong>${esc(prev.title)}</strong></a><a href="${href(`services/${svcOf(next).slug}`)}" rel="next"><span>${esc(U.next)}</span><strong>${esc(next.title)}</strong></a></nav>
      </section>`;
  }

  function entry(p) {
    const P = t().projects;
    return `<article class="entry rise">${pic(projImg(p), p.title, p.location)}<div class="txt"><h2>${esc(p.title)}</h2><p class="meta">${esc(p.client)} · ${esc(p.location)} · ${esc(p.status)}</p><a class="link" href="${href(`projects/${projSlug(p.id)}`)}">${esc(ui().details)} ${arrow()}</a></div></article>`;
  }

  function projects() {
    const P = t().projects, U = ui();
    const items = P.items.filter((p) => state.filter === 'all' || p.key === state.filter);
    return `${pageHead(P.title, P.lead)}
      <section class="sec wrap" id="proj-host">
        <div class="filters" role="group" aria-label="${esc(P.title)}">${P.categories.map((c) => `<button type="button" data-filter="${c.key}" aria-pressed="${state.filter === c.key}">${esc(c.key === 'all' ? U.all : c.label)}</button>`).join('')}</div>
        ${items.length ? `<div class="entries">${items.map(entry).join('')}</div>` : `<p>${esc(P.empty)}</p>`}
      </section>`;
  }

  function project() {
    const T = t(), U = ui(), P = T.projects, p = projBy(state.sub);
    const svc = T.services.items.find((s) => s.icon === CAT_SVC[p.key]);
    const more = P.items.filter((x) => x.key === p.key && x.id !== p.id);
    return `${pic(projImg(p), p.title, p.location, 'pic p-pic', true)}
      <header class="page-head wrap" style="padding-top:clamp(56px,7vw,96px)"><h1>${esc(p.title)}</h1><p>${esc(p.desc)}</p>
        <dl class="facts-row"><div><dt>${esc(P.labels.client)}</dt><dd>${esc(p.client)}</dd></div><div><dt>${esc(P.labels.location)}</dt><dd>${esc(p.location)}</dd></div><div><dt>${esc(U.category)}</dt><dd>${esc(catLabel(p))}</dd></div><div><dt>${esc(P.labels.status)}</dt><dd>${esc(p.status)}</dd></div></dl>
      </header>
      <section class="sec wrap">
        <h2 class="sec-h" style="margin-bottom:28px">${esc(P.labels.scope)}</h2>
        <div class="cols">${(p.scope || []).map((x) => `<div><h3>${esc(x)}</h3></div>`).join('')}</div>
        ${svc ? `<p style="margin-top:40px"><a class="link" href="${href(`services/${svcOf(svc).slug}`)}">${esc(U.discipline)}: ${esc(svc.title)} ${arrow()}</a></p>` : ''}
      </section>
      ${more.length ? `<section class="sec wrap"><h2 class="sec-h" style="margin-bottom:40px">${esc(U.more)}</h2><div class="entries">${more.map(entry).join('')}</div></section>` : ''}
      <div class="wrap"><p style="margin-top:56px"><a class="link" href="${href('projects')}">${esc(U.allProj)} ${arrow()}</a></p></div>`;
  }

  function fleet() {
    const E = t().equipment;
    return `${pageHead(E.title, E.lead)}
      <section class="sec wrap"><div class="grid12"><p class="rise" style="grid-column:1 / span 7;font-size:var(--step-lead);line-height:1.55">${esc(E.p1)}</p><p class="rise" style="grid-column:9 / span 4;color:var(--ink)">${esc(E.p2)}</p></div></section>
      <section class="sec wrap"><h2 class="sec-h rise" style="margin-bottom:40px">${esc(E.categoriesHeading)}</h2><div class="cols rise">${E.categories.map((c) => `<div><h3>${esc(c)}</h3></div>`).join('')}</div></section>
      <section class="sec wrap"><h2 class="sec-h rise" style="margin-bottom:40px">${esc(E.supportHeading)}</h2><div class="cols rise">${E.features.map((f) => `<div><h3>${esc(f.title)}</h3><p>${esc(f.desc)}</p></div>`).join('')}</div></section>`;
  }

  function approvals() {
    const Cc = t().certifications;
    return `${pageHead(Cc.title, Cc.lead)}
      <section class="sec wrap"><h2 class="sec-h rise" style="margin-bottom:40px">${esc(Cc.isoHeading)}</h2><div class="cols rise">${Cc.iso.map((i) => `<div><h3 class="num" style="font-size:var(--step-lead);font-weight:300">${esc(i.title)}</h3><p>${esc(i.desc)}</p></div>`).join('')}</div></section>
      <section class="sec wrap"><h2 class="sec-h rise" style="margin-bottom:40px">${esc(Cc.approvalsHeading)}</h2><div class="cols rise">${Cc.approvals.map((a) => `<div><h3>${esc(a)}</h3></div>`).join('')}</div></section>
      <section class="sec wrap"><h2 class="sec-h rise" style="margin-bottom:24px">${esc(Cc.commitmentTitle)}</h2><p class="rise" style="font-size:var(--step-lead);line-height:1.55;max-width:46ch">${esc(Cc.commitmentBody)}</p></section>`;
  }

  function field(id, label, control, err, full = false) {
    return `<div class="field${full ? ' full' : ''}"><label for="${id}">${esc(label)}</label>${control}<span class="err" id="${id}-err" hidden>${icon('circle-alert')}<span>${esc(err || '')}</span></span></div>`;
  }

  function contactPage() {
    const T = t(), C = T.contact, U = ui(), pf = state.prefill || {};
    return `${pageHead(C.title, C.lead)}
      <section class="sec wrap form-wrap">
        <form id="quote-form" novalidate>
          <h2 class="visually-hidden">${esc(U.quote)}</h2>
          <div class="fields">
            ${field('f-name', C.fields.name, `<input id="f-name" name="name" autocomplete="name" placeholder="${esc(C.placeholders.name)}" aria-describedby="f-name-err">`, C.errors.name)}
            ${field('f-email', C.fields.email, `<input id="f-email" name="email" type="email" autocomplete="email" dir="ltr" placeholder="${esc(C.placeholders.email)}" aria-describedby="f-email-err">`, C.errors.email)}
            ${field('f-company', C.fields.company, `<input id="f-company" name="company" autocomplete="organization" placeholder="${esc(C.placeholders.company)}" aria-describedby="f-company-err">`, C.errors.company)}
            ${field('f-type', C.fields.type, `<select id="f-type" name="type"><option value="">${esc(C.placeholders.type)}</option>${C.typeOptions.map((o) => `<option value="${o.key}"${pf.type === o.key ? ' selected' : ''}>${esc(o.label)}</option>`).join('')}</select>`, '')}
            ${field('f-message', C.fields.message, `<textarea id="f-message" name="message" placeholder="${esc(C.placeholders.message)}" aria-describedby="f-message-err">${esc(pf.message || '')}</textarea>`, C.errors.message, true)}
          </div>
          <div class="form-foot"><button class="action" type="submit"><span>${esc(C.submit)}</span></button><small>${esc(U.proto)}</small></div>
          <div id="quote-status" aria-live="polite"></div>
        </form>
        <aside aria-label="${esc(C.officeHeading)}"><dl class="aside-list">
          <div><dt>${esc(C.officeHeading)}</dt><dd>${esc(C.address)}</dd></div>
          <div><dt>${esc(C.hoursHeading)}</dt><dd>${C.hours.map(esc).join('<br>')}</dd></div>
          <div><dt>${esc(U.mobile)}</dt><dd><a class="link" href="tel:${C0.mobile.replace(/\s/g, '')}"><span class="ltr num">${esc(C0.mobile)}</span></a></dd></div>
          <div><dt>${esc(U.email)}</dt><dd><a class="link" href="mailto:${C0.email}">${esc(C0.email)}</a></dd></div>
        </dl></aside>
      </section>`;
  }

  function careers() {
    const K = t().careers, U = ui();
    return `${pageHead(K.title, K.lead)}
      <section class="sec wrap"><h2 class="sec-h rise" style="margin-bottom:40px">${esc(K.whyTitle)}</h2><div class="cols rise">${K.why.map((w) => `<div><h3>${esc(w.title)}</h3><p>${esc(w.desc)}</p></div>`).join('')}</div></section>
      <section class="sec wrap"><h2 class="sec-h rise" style="margin-bottom:12px">${esc(K.rolesTitle)}</h2><p class="rise" style="color:var(--muted);margin-bottom:40px">${esc(K.rolesLead)}</p>
        <ul class="roles-list">${K.roles.map((r) => `<li class="rise"><span class="t">${esc(r.title)}</span><span class="m">${esc(r.dept)} · ${esc(r.location)} · ${esc(r.type)} · ${esc(r.exp)}</span><button type="button" data-role="${r.slug}">${esc(U.apply)}</button></li>`).join('')}</ul></section>
      <section class="sec wrap form-wrap" id="apply">
        <form id="apply-form" novalidate>
          <h2 class="sec-h" style="margin-bottom:12px">${esc(K.applyTitle)}</h2><p style="color:var(--muted);margin-bottom:28px">${esc(K.applyLead)}</p>
          <div class="fields">
            ${field('a-name', K.fields.name, `<input id="a-name" name="name" autocomplete="name" placeholder="${esc(K.placeholders.name)}" aria-describedby="a-name-err">`, K.errors.name)}
            ${field('a-email', K.fields.email, `<input id="a-email" name="email" type="email" autocomplete="email" dir="ltr" placeholder="${esc(K.placeholders.email)}" aria-describedby="a-email-err">`, K.errors.email)}
            ${field('a-phone', K.fields.phone, `<input id="a-phone" name="phone" type="tel" autocomplete="tel" dir="ltr" placeholder="${esc(K.placeholders.phone)}" aria-describedby="a-phone-err">`, K.errors.phone)}
            ${field('a-exp', K.fields.exp, `<input id="a-exp" name="exp" type="number" min="0" max="60" inputmode="numeric" placeholder="${esc(K.placeholders.exp)}" aria-describedby="a-exp-err">`, K.errors.exp)}
            ${field('a-role', K.fields.role, `<select id="a-role" name="role" aria-describedby="a-role-err"><option value="">${esc(K.placeholders.role)}</option>${K.roles.map((r) => `<option value="${r.slug}"${state.role === r.slug ? ' selected' : ''}>${esc(r.title)}</option>`).join('')}<option value="other">${esc(K.otherRole)}</option></select>`, K.errors.role, true)}
            <div class="field full"><span class="label" id="a-cv-l">${esc(K.fields.cv)}</span>
              <label class="visually-hidden" for="a-cv">${esc(K.cvLink)}</label>
              <input id="a-cv" name="cv" type="url" dir="ltr" placeholder="${esc(K.placeholders.cv)}" aria-describedby="a-cv-l a-cv-hint a-cv-err">
              <div class="file-row"><label class="file-btn" for="a-file">${icon('upload')}${esc(K.cvUploadBtn)}</label><input id="a-file" type="file" accept=".pdf,.doc,.docx" class="visually-hidden"><span id="a-file-name" class="hint">${esc(K.cvNone)}</span></div>
              <span class="hint" id="a-cv-hint">${esc(K.cvHint)}</span>
              <span class="err" id="a-cv-err" hidden>${icon('circle-alert')}<span>${esc(K.errors.cv)}</span></span></div>
            ${field('a-note', K.fields.note, `<textarea id="a-note" name="note" placeholder="${esc(K.placeholders.note)}"></textarea>`, '', true)}
          </div>
          <div class="form-foot"><button class="action" type="submit"><span>${esc(K.submit)}</span></button><small>${esc(U.proto)}</small></div>
          <div id="apply-status" aria-live="polite"></div>
        </form>
      </section>`;
  }

  function tabs(id, label, items) {
    const cur = items.some((i) => i.key === state.tabs[id]) ? state.tabs[id] : items[0].key;
    return `<div class="tabs"><div class="tablist" role="tablist" aria-label="${esc(label)}">${items.map((it) => `<button type="button" role="tab" id="tab-${id}-${it.key}" aria-controls="panel-${id}-${it.key}" aria-selected="${cur === it.key}" tabindex="${cur === it.key ? 0 : -1}" data-tab="${id}" data-key="${it.key}">${esc(it.label)}</button>`).join('')}</div>
      ${items.map((it) => `<div class="tabpanel" role="tabpanel" id="panel-${id}-${it.key}" aria-labelledby="tab-${id}-${it.key}" tabindex="0"${cur === it.key ? '' : ' hidden'}>${it.html}</div>`).join('')}</div>`;
  }
  function selectTab(btn, focus) {
    const id = btn.dataset.tab, key = btn.dataset.key; state.tabs[id] = key;
    const box = btn.closest('.tabs');
    $$('[role=tab]', box).forEach((b) => { const on = b === btn; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
    $$('[role=tabpanel]', box).forEach((p) => { p.hidden = p.id !== `panel-${id}-${key}`; });
    if (focus) btn.focus();
  }

  const PAGE_FN = { '': home, company, services, projects, fleet, approvals, contact: contactPage, careers };
  function title() {
    const T = t(), U = ui();
    if (state.page === 'services' && state.sub) return `${T.services.items[svcIdx(state.sub)].title} | ${T.brandLine}`;
    if (state.page === 'projects' && state.sub) return `${projBy(state.sub).title} | ${T.brandLine}`;
    if (!state.page) return `${T.brandLine} | ${T.hero.title}`;
    const map = { company: T.intro.title, contact: T.contact.title, careers: T.careers.title };
    return `${map[state.page] || U.nav[state.page]} | ${T.brandLine}`;
  }

  // ---------- behaviour ----------
  let io, cycle;
  function observe() {
    document.documentElement.classList.add('js');
    io?.disconnect();
    io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('.rise').forEach((el) => io.observe(el));
  }
  function startCycle() {
    clearInterval(cycle);
    const names = $$('.proof .nm'); if (!names.length) return;
    let i = 0;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    cycle = setInterval(() => { names[i].classList.remove('lit'); i = (i + 1) % names.length; names[i].classList.add('lit'); }, 2000);
  }
  function setActive(listSel, frameSel, i) {
    $$(`${listSel} a`).forEach((a) => a.classList.toggle('on', a.dataset.i === String(i)));
    if (frameSel) $$(`${frameSel} > *`).forEach((f) => f.classList.toggle('on', f.dataset.i === String(i)));
  }
  function barMode() {
    const b = $('#bar');
    const onHero = !state.page && scrollY < innerHeight - 120;
    b.classList.toggle('inner', !!state.page);
    b.classList.toggle('solid', !state.page && !onHero);
  }

  // The name runs from margin to margin on one line: its size is fitted to the width.
  function fitName() {
    const h = $('.hero h1'); if (!h) return;
    const box = h.parentElement, span = $('.mask > span', h);
    // A long Latin name on a phone sets on two lines at a fixed size instead of shrinking to a caption.
    const twoLines = !rtl() && innerWidth < 760;
    h.classList.toggle('two', twoLines);
    if (twoLines) { h.style.fontSize = ''; return; }
    const avail = box.clientWidth - parseFloat(getComputedStyle(box).paddingInlineStart) - parseFloat(getComputedStyle(box).paddingInlineEnd);
    h.style.fontSize = '100px';
    const w = span.getBoundingClientRect().width;
    if (w > 0) h.style.fontSize = `${Math.floor((100 * avail / w) * 0.995 * 10) / 10}px`;
  }

  let lastKey = '';
  function render(force = false) {
    const { lang, page, sub } = parseHash();
    const changed = lang !== state.lang || page !== state.page || sub !== state.sub;
    Object.assign(state, { lang, page, sub });
    const key = `${lang}/${page}/${sub}`;
    if (!force && key === lastKey) return;
    lastKey = key;
    if (page !== 'contact') state.prefill = null;
    const D = document.documentElement;
    D.lang = lang; D.dir = lang === 'ar' ? 'rtl' : 'ltr';
    D.classList.remove('loaded');
    document.title = title();
    $('.skip').textContent = ui().skip;
    $('#bar').innerHTML = bar();
    $('#main').innerHTML = (page === 'services' && sub) ? service() : (page === 'projects' && sub) ? project() : PAGE_FN[page]();
    $('#foot').innerHTML = foot();
    if (changed || force) scrollTo({ top: 0, behavior: 'auto' });
    observe(); startCycle(); barMode(); fitName();
    requestAnimationFrame(() => requestAnimationFrame(() => D.classList.add('loaded')));
  }

  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  function setErr(id, bad, msg) {
    const el = document.getElementById(id), err = document.getElementById(`${id}-err`);
    if (err && msg) err.lastChild.textContent = msg;
    el?.setAttribute('aria-invalid', String(bad));
    if (err) err.hidden = !bad;
    return bad;
  }
  function submitLike(form, statusId, okText, busyText) {
    const btn = $('button[type=submit]', form), label = $('span', btn), before = label.textContent;
    btn.setAttribute('aria-busy', 'true'); btn.disabled = true; label.textContent = busyText;
    setTimeout(() => {
      btn.removeAttribute('aria-busy'); btn.disabled = false; label.textContent = before;
      document.getElementById(statusId).innerHTML = `<div class="notice" role="status">${icon('check')}<div><strong>${esc(okText)}</strong><br><span>${esc(ui().protoSent)}</span></div></div>`;
      form.reset();
    }, 900);
  }

  document.addEventListener('click', (e) => {
    const el = e.target.closest('a, button'); if (!el) return;
    const T = t();
    if (el.matches('.menu-btn')) {
      const d = $('#drawer'), open = !d.classList.contains('open');
      d.classList.toggle('open', open); el.setAttribute('aria-expanded', String(open));
      el.innerHTML = icon(open ? 'x' : 'menu'); el.setAttribute('aria-label', open ? ui().close : ui().menu);
      $('#bar').classList.toggle('solid', open || $('#bar').classList.contains('solid'));
      if (open) $('a', d)?.focus();
      return;
    }
    if (el.closest('.drawer')) $('#drawer').classList.remove('open');
    if (el.matches('[role=tab]')) { selectTab(el); return; }
    if (el.dataset.filter) {
      state.filter = el.dataset.filter;
      if (state.page === 'projects') { const y = scrollY; $('#main').innerHTML = projects(); scrollTo(0, y); observe(); $(`[data-filter="${state.filter}"]`)?.focus(); return; }
      $$('.work .filters button').forEach((b) => b.setAttribute('aria-pressed', String(b === el)));
      const lis = $$('#names li');
      lis.forEach((li) => li.classList.toggle('out', state.filter !== 'all' && li.dataset.key !== state.filter));
      const first = lis.find((li) => !li.classList.contains('out'));
      if (first) setActive('#names', '.frame', $('a', first).dataset.i);
      return;
    }
    if (el.dataset.role) { state.role = el.dataset.role; const s = $('#a-role'); if (s) s.value = state.role; $('#apply').scrollIntoView({ behavior: 'smooth' }); setTimeout(() => $('#a-name')?.focus({ preventScroll: true }), 450); return; }
    if (el.getAttribute('href') === '#work') { e.preventDefault(); $('#work')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); return; }
    if (el.hasAttribute('data-quote')) {
      state.prefill = null;
      if (state.page === 'services' && state.sub) { const s = T.services.items[svcIdx(state.sub)]; state.prefill = { type: svcOf(s).type, message: `${T.services.inquireCta} ${s.title}: ` }; }
      else if (state.page === 'projects' && state.sub) { const p = projBy(state.sub); state.prefill = { type: CAT_TYPE[p.key] || 'other', message: `${T.projects.detailsCta}: ${p.title}: ` }; }
      else if (state.page === 'fleet') state.prefill = { type: 'equipment-rental', message: `${T.equipment.cta}: ` };
      else if (state.page === 'approvals') state.prefill = { type: '', message: `${T.certifications.cta}: ` };
    }
  });

  // pointing at a name lights it (work index, services index, disciplines)
  const lightFrom = (e) => {
    const a = e.target.closest?.('#names a, #svc-names a, .disc li a'); if (!a) return;
    if (a.closest('#names')) setActive('#names', '.frame', a.dataset.i);
    else if (a.closest('#svc-names')) setActive('#svc-names', '.idx .detail', a.dataset.i);
    else {
      $$('.disc li a').forEach((x) => x.classList.toggle('on', x === a));
      const spot = $('#spot'); if (spot) spot.innerHTML = `<strong>${esc(a.dataset.title)}</strong>${esc(a.dataset.desc)}`;
    }
  };
  document.addEventListener('pointerover', lightFrom);
  document.addEventListener('focusin', lightFrom);

  document.addEventListener('keydown', (e) => {
    const tab = e.target.closest?.('[role=tab]');
    if (tab && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
      const list = $$('[role=tab]', tab.parentElement), i = list.indexOf(tab), fwd = rtl() ? 'ArrowLeft' : 'ArrowRight';
      const j = e.key === 'Home' ? 0 : e.key === 'End' ? list.length - 1 : (i + (e.key === fwd ? 1 : -1) + list.length) % list.length;
      e.preventDefault(); selectTab(list[j], true); return;
    }
    if (e.key === 'Escape' && $('#drawer')?.classList.contains('open')) { $('.menu-btn').click(); $('.menu-btn').focus(); }
  });
  document.addEventListener('change', (e) => { if (e.target.id === 'a-file') { const f = e.target.files[0]; $('#a-file-name').textContent = f ? f.name : t().careers.cvNone; if (f) setErr('a-cv', false); } });
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
    }
  });
  document.addEventListener('input', (e) => {
    const el = e.target; if (el.getAttribute('aria-invalid') !== 'true') return;
    const ok = el.type === 'email' ? validEmail(el.value.trim()) : el.id === 'f-message' ? el.value.trim().length >= 10 : !!el.value.trim();
    if (ok) setErr(el.id, false);
  });

  addEventListener('scroll', barMode, { passive: true });
  addEventListener('resize', fitName);
  // Refit once the display faces have really loaded (fonts.ready can settle before a lazily used face arrives).
  if (document.fonts) {
    document.fonts.ready.then(fitName);
    document.fonts.addEventListener?.('loadingdone', fitName);
    Promise.all([document.fonts.load('800 100px "Unbounded"', 'SANA'), document.fonts.load('800 100px "Noto Kufi Arabic"', 'سنا')]).then(fitName).catch(() => {});
  }
  addEventListener('hashchange', () => render());
  render(true);
})();
