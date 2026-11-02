/* SACC proposal 6. Built from the owner-approved brief (BRIEF.md).
 * Interactive, bilingual, every page. Content is the real snapshot; only the
 * small interface strings below are new copy, in both languages. */
(() => {
  'use strict';
  const { content, icons, logo, photos } = window.SACC;
  const C0 = content.company, IMG = content.images;
  const PAGES = ['', 'company', 'services', 'projects', 'fleet', 'approvals', 'contact', 'careers'];
  const NAV = ['company', 'services', 'projects', 'fleet', 'approvals'];
  // A photo source: local repository photos are inlined; company CDN photos stay remote.
  const src = (u) => (u && photos[u]) || (/^https?:/i.test(u || '') ? u : '');

  const UI = {
    ar: {
      skip: 'تخطَّ إلى المحتوى', menu: 'القائمة', close: 'إغلاق', quote: 'اطلب عرض سعر',
      langName: 'English', langLabel: 'Switch to English',
      nav: { company: 'الشركة', services: 'الخدمات', projects: 'المشاريع', fleet: 'الأسطول', approvals: 'الاعتمادات' },
      all: 'الكل', open: 'التفاصيل', inProgress: 'قيد التنفيذ', done: 'مكتمل',
      apprMore: 'الاعتمادات بالتفصيل', fleetMore: 'الأسطول بالتفصيل', projMore: 'كل المشاريع',
      chairSig: 'رئيس مجلس الإدارة', officeH: 'مكتبنا في المدينة المنورة', call: 'اتصل بنا',
      phone: 'الهاتف', mobile: 'الجوال', email: 'البريد', cr: 'السجل التجاري',
      proto: 'نموذج تصميم تفاعلي للمراجعة؛ النماذج لا ترسل أي بيانات.',
      protoSent: 'هذا نموذج للمراجعة: لم يُرسل شيء. بعد الدمج تُحفظ الرسالة ويُبلَّغ الفريق.',
      emailRequired: 'البريد الإلكتروني مطلوب',
      allDisc: 'كل التخصصات', scope: 'نطاق العمل', delivered: 'مشاريع منفّذة في هذا التخصص',
      noProj: 'لا توجد مشاريع منشورة في هذا التخصص بعد.', prev: 'التخصص السابق', next: 'التخصص التالي',
      category: 'التصنيف', discipline: 'التخصص', more: 'مشاريع أخرى في التصنيف نفسه',
      tabs: { about: 'نبذة', journey: 'المسيرة', values: 'القيم', people: 'القيادة' },
      apply: 'تقدّم', photoOf: 'صورة من موقع العمل: ',
    },
    en: {
      skip: 'Skip to content', menu: 'Menu', close: 'Close', quote: 'Request a Quote',
      langName: 'العربية', langLabel: 'التبديل إلى العربية',
      nav: { company: 'Company', services: 'Services', projects: 'Projects', fleet: 'Fleet', approvals: 'Approvals' },
      all: 'All', open: 'Details', inProgress: 'In progress', done: 'Completed',
      apprMore: 'Approvals in full', fleetMore: 'The fleet in full', projMore: 'All projects',
      chairSig: 'Chairman', officeH: 'Our office in Al Madinah', call: 'Call us',
      phone: 'Phone', mobile: 'Mobile', email: 'Email', cr: 'Commercial Registration',
      proto: 'Interactive design prototype for review; forms send nothing.',
      protoSent: 'This is a review prototype: nothing was sent. Once integrated, the message is stored and the team is notified.',
      emailRequired: 'Email is required',
      allDisc: 'All disciplines', scope: 'Scope of work', delivered: 'Projects delivered in this discipline',
      noProj: 'No published projects in this discipline yet.', prev: 'Previous discipline', next: 'Next discipline',
      category: 'Category', discipline: 'Discipline', more: 'More projects in this category',
      tabs: { about: 'Overview', journey: 'Journey', values: 'Values', people: 'Leadership' },
      apply: 'Apply', photoOf: 'Site photograph: ',
    },
  };

  // Each discipline: its slug, the project categories it delivers, the quote form type,
  // and its tile on the home page (photo or line drawing).
  const SVC = {
    Droplets: { slug: 'water-sewerage', cat: ['water'], type: 'water-sewerage', photo: './assets/photos/water-network.jpg' },
    CloudRain: { slug: 'stormwater', cat: [], type: 'water-sewerage', draw: 'culvert' },
    Zap: { slug: 'electrical-solar', cat: ['electrical'], type: 'other', photo: './assets/photos/public-realm.jpg' },
    Route: { slug: 'roads-asphalt', cat: ['roads'], type: 'roads-asphalt', draw: 'road' },
    Construction: { slug: 'bridges-tunnels', cat: [], type: 'bridges-tunnels', draw: 'bridge' },
    Building2: { slug: 'landscaping', cat: ['urban'], type: 'urban-development', photo: IMG.urban },
    ShieldCheck: { slug: 'quality-laboratory', cat: [], type: 'other', draw: 'lab' },
    Truck: { slug: 'equipment-rental', cat: [], type: 'equipment-rental', photo: './assets/photos/equipment-fleet.jpg' },
    Settings: { slug: 'operation-maintenance', cat: [], type: 'other', draw: 'cycle' },
  };
  const TILES = [[7, 'lav'], [5, 'teal'], [5, 'teal'], [7, 'lav'], [4, 'lav'], [4, 'teal'], [4, 'lav'], [6, 'teal'], [6, 'lav']];
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
  const projImg = (p) => src(IMG.projects?.[p.id - 1]);
  const relProj = (s) => t().projects.items.filter((p) => svcOf(s).cat.includes(p.key));
  const isDone = (p) => /complete|مكتمل|منجز/i.test(p.status);
  const catLabel = (p) => t().projects.categories.find((c) => c.key === p.key)?.label || p.category;
  const img = (u, alt, eager = false) => (u ? `<img src="${esc(u)}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async" onerror="this.remove()">` : '');
  const tel = (n) => `tel:${n.replace(/\s/g, '')}`;

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

  // ---------- line drawings ----------
  // Thin engineering diagrams around the discipline tiles. Drawn in a W×200 box
  // whose aspect matches the element, so the photo window lines up with its frame.
  function viz(s, W, label) {
    const d = svcOf(s), H = 200, cx = W / 2, k = W / 640;
    const node = (x, y) => `<circle cx="${x}" cy="${y}" r="4.5"/>`;
    let body = '', ph = '';
    if (d.photo) {
      const fw = Math.round(W * (W > 500 ? 0.38 : 0.5)), fx = cx - fw / 2, fy = 30, fh = 140;
      const sw = Math.round(W * 0.13), gap = Math.round(14 * k + 6);
      body = `<rect x="${fx - 8}" y="${fy - 8}" width="${fw + 16}" height="${fh + 16}" rx="6"/>
        <rect x="${fx - gap - sw}" y="62" width="${sw}" height="76" rx="4"/><rect x="${fx + fw + gap}" y="62" width="${sw}" height="76" rx="4"/>
        <path d="M${fx - gap} 100H${fx - 8}M${fx + fw + 8} 100H${fx + fw + gap}"/>
        <path d="M6 100H${fx - gap - sw}M${fx + fw + gap + sw} 100H${W - 6}"/>
        ${node(6, 100)}${node(W - 6, 100)}${node(fx - 8, 100)}${node(fx + fw + 8, 100)}`;
      const u = src(d.photo);
      ph = `<div class="ph" style="left:${(fx / W) * 100}%;top:${(fy / H) * 100}%;width:${(fw / W) * 100}%;height:${(fh / H) * 100}%">${img(u, ui().photoOf + label)}</div>`;
    } else if (d.draw === 'culvert') {
      const w = 230 * k + 40;
      body = `<path d="M6 52H${W - 6}"/>${node(6, 52)}${node(W - 6, 52)}
        <rect x="${cx - w}" y="70" width="${w}" height="96" rx="3"/><rect x="${cx}" y="70" width="${w}" height="96" rx="3"/>
        <rect x="${cx - w - 10}" y="60" width="${2 * w + 20}" height="116" rx="5"/>
        <path d="M${cx - w + 14} 140q${w / 8} -12 ${w / 4} 0t${w / 4} 0t${w / 4} 0"/><path d="M${cx + 14} 140q${w / 8} -12 ${w / 4} 0t${w / 4} 0t${w / 4} 0"/>
        <path d="M${cx - w + 14} 154q${w / 8} -12 ${w / 4} 0t${w / 4} 0t${w / 4} 0"/><path d="M${cx + 14} 154q${w / 8} -12 ${w / 4} 0t${w / 4} 0t${w / 4} 0"/>
        <path d="M6 188H${W - 6}"/>${node(6, 188)}${node(W - 6, 188)}`;
    } else if (d.draw === 'road') {
      const a = 300 * k + 40, b = 190 * k + 30;
      body = `<path d="M6 176H${W - 6}"/>${node(6, 176)}${node(W - 6, 176)}
        <path d="M${cx - a} 176L${cx - b} 92H${cx + b}L${cx + a} 176"/>
        <path d="M${cx - b + 6} 104H${cx + b - 6}M${cx - b + 12} 116H${cx + b - 12}"/>
        <path d="M${cx - b + 20} 80H${cx - 20}M${cx + 20} 80H${cx + b - 20}" stroke-dasharray="14 10"/>
        <path d="M${cx - b} 92V40M${cx + b} 92V40M${cx - b} 40H${cx + b}"/>${node(cx - b, 40)}${node(cx + b, 40)}${node(cx, 40)}`;
    } else if (d.draw === 'bridge') {
      const a = 170 * k + 40;
      body = `<path d="M6 86H${W - 6}"/>${node(6, 86)}${node(W - 6, 86)}
        <path d="M${cx - a} 176Q${cx} 6 ${cx + a} 176"/>
        <path d="M${cx - a} 86V186M${cx + a} 86V186"/>
        ${[-0.6, -0.3, 0, 0.3, 0.6].map((f) => { const x = cx + f * a, y = 176 - (1 - f * f) * 85; return `<path d="M${x} 86V${y.toFixed(1)}"/>`; }).join('')}
        <path d="M6 186H${W - 6}"/>${node(cx - a, 186)}${node(cx + a, 186)}`;
    } else if (d.draw === 'lab') {
      const c = 46, g = 22 + 10 * k;
      body = `<path d="M6 160H${W - 6}"/>${node(6, 160)}${node(W - 6, 160)}
        ${[-1, 0, 1].map((i) => { const x = cx + i * (c + g) - c / 2; return `<rect x="${x}" y="${160 - c}" width="${c}" height="${c}" rx="2"/><path d="M${x + 10} ${160 - c - 10}H${x + c + 10}V${150}"/>`; }).join('')}
        <path d="M${cx - 1.5 * c - g - 20} 34H${cx + 1.5 * c + g + 20}M${cx - 1.5 * c - g - 20} 34V160M${cx + 1.5 * c + g + 20} 34V160"/>
        <path d="M${cx} 34V${160 - c - 18}"/>${node(cx, 160 - c - 18)}
        <path d="M${cx - 1.5 * c - g} 182H${cx + 1.5 * c + g}"/><path d="M${cx - 1.5 * c - g} 176V188M${cx + 1.5 * c + g} 176V188"/>`;
    } else {
      const r = 62;
      const pts = [0, 60, 120, 180, 240, 300].map((deg) => [cx + r * Math.cos((deg * Math.PI) / 180), 100 + r * Math.sin((deg * Math.PI) / 180)]);
      body = `<circle class="ring" cx="${cx}" cy="100" r="${r}"/><circle class="ring" cx="${cx}" cy="100" r="${r - 18}"/>
        <path d="M6 100H${cx - r}M${cx + r} 100H${W - 6}"/>${node(6, 100)}${node(W - 6, 100)}
        <path d="M${cx} 100V${100 - r + 22}M${cx} 100H${cx + 26}"/>
        ${pts.map(([x, y]) => node(x.toFixed(1), y.toFixed(1))).join('')}`;
    }
    return `<div class="viz" style="aspect-ratio:${W} / ${H}"><svg viewBox="0 0 ${W} ${H}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true" focusable="false">${body}</svg>${ph}</div>`;
  }

  function seal(n) {
    return `<svg viewBox="0 0 112 112" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false"><circle cx="56" cy="56" r="53"/><circle cx="56" cy="56" r="44"/>
      <text x="56" y="52" text-anchor="middle" fill="currentColor" stroke="none" font-family="Sacc, sans-serif" font-size="15" font-weight="500" direction="ltr">ISO</text>
      <text x="56" y="74" text-anchor="middle" fill="currentColor" stroke="none" font-family="Sacc, sans-serif" font-size="20" font-weight="300" direction="ltr">${esc(n)}</text></svg>`;
  }

  // ---------- chrome ----------
  function bar() {
    const T = t(), U = ui();
    const here = state.sub ? `${state.page}/${state.sub}` : state.page;
    const other = rtl() ? 'en' : 'ar';
    const cur = (id) => (state.page === id ? ' aria-current="page"' : '');
    const links = NAV.map((id) => `<li><a href="${href(id)}"${cur(id)}>${esc(U.nav[id])}</a></li>`).join('');
    return `<div class="wrap bar-in">
      <a class="brand" href="${href('')}"><img src="${logo}" alt="${esc(T.brandLine)}" width="120" height="30"></a>
      <nav aria-label="${esc(U.menu)}"><ul>${links}</ul></nav>
      <div class="tools">
        <a class="lang" href="${href(here, other)}" hreflang="${other}" lang="${other}">${icon('languages')}<span>${esc(U.langName)}</span></a>
        <a class="action" href="${href('contact')}" data-quote>${esc(U.quote)}</a>
        <button class="menu-btn" type="button" aria-expanded="false" aria-controls="drawer" aria-label="${esc(U.menu)}">${icon('menu')}</button>
      </div>
    </div>
    <nav class="drawer" id="drawer" aria-label="${esc(U.menu)}"><ul>${links}</ul><a class="action drawer-action" href="${href('contact')}" data-quote>${esc(U.quote)}</a></nav>`;
  }

  function foot() {
    const T = t(), U = ui();
    return `<div class="wrap foot-in">
      <img src="${logo}" alt="" width="104" height="26">
      <div class="end"><a href="${href('careers')}">${esc(T.navCareers)}</a><span>${esc(U.proto)}</span><span>${esc(T.footer.rights)}</span></div>
    </div>`;
  }

  const pageHead = (title, lead = '', back = '') => `<header class="wrap page-head">${back}<h1 class="h-display rise">${esc(title)}</h1>${lead ? `<p class="lead rise" style="--d:1">${esc(lead)}</p>` : ''}</header>`;

  // ---------- home ----------
  function home() {
    const T = t(), U = ui(), S = T.stats, L = T.leadership, C = T.contact, Cc = T.certifications;
    const svc = T.services.items, P = T.projects;
    const band = [IMG.projects?.[3], './assets/photos/hero-infrastructure.jpg', IMG.projects?.[4]].map(src);
    const bandAlt = [P.items[3].title, '', P.items[4].title];
    return `
      <section class="hero" aria-labelledby="h1">
        <div class="wrap hero-top">
          <h1 class="h-display rise" id="h1">${esc(T.brandLine)}</h1>
          <div class="side rise" style="--d:1">
            <p class="lead">${esc(T.hero.lead)}</p>
            <div class="acts"><a class="action" id="hero-action" href="${href('contact')}" data-quote>${esc(U.quote)}</a><a class="ghost" href="${href('services')}">${esc(T.hero.cta1)}</a></div>
          </div>
        </div>
      </section>
      <div class="stage">
        <div class="band wrap" aria-hidden="false">
          <div class="band-in">${band.map((u, i) => `<figure>${img(u, bandAlt[i] ? U.photoOf + bandAlt[i] : U.photoOf.replace(/[:：]\s*$/, ''), i === 1)}</figure>`).join('')}
            <span class="rail t" aria-hidden="true"></span><span class="rail b" aria-hidden="true"></span></div>
        </div>
        <div class="over">
          <section class="sec wrap" aria-labelledby="disc-h">
            <div class="sec-head"><h2 class="h-head rise" id="disc-h">${esc(T.services.title)}</h2><p class="lead rise" style="--d:1">${esc(T.services.lead)}</p></div>
            <div class="bento">${svc.map((s, i) => {
              const [span, tone] = TILES[i];
              return `<a class="tile ${tone} span-${span} rise" style="--d:${i % 3}" href="${href(`services/${svcOf(s).slug}`)}">
                <h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p>
                ${viz(s, span >= 6 ? 640 : 420, s.title)}</a>`;
            }).join('')}</div>
          </section>
        </div>
      </div>

      <section class="sec wrap" id="work" aria-labelledby="work-h">
        <div class="sec-head"><h2 class="h-head rise" id="work-h">${esc(P.title)}</h2><p class="lead rise" style="--d:1">${esc(P.lead)}</p></div>
        <div class="filters rise" role="group" aria-label="${esc(P.title)}">${P.categories.map((c) => `<button type="button" data-filter="${c.key}" aria-pressed="${state.filter === c.key}">${esc(c.key === 'all' ? U.all : c.label)}</button>`).join('')}</div>
        <div class="rows">${P.items.map((p) => `<a class="row rise" href="${href(`projects/${projSlug(p.id)}`)}" data-key="${p.key}"${state.filter !== 'all' && state.filter !== p.key ? ' hidden' : ''}>
          <h3>${esc(p.title)}</h3><span class="st${isDone(p) ? '' : ' live'}">${esc(p.status)}</span>
          <span class="meta">${esc(p.client)} · ${esc(p.location)}</span></a>`).join('')}</div>
        <p class="figures-foot"><a class="link" href="${href('projects')}">${esc(U.projMore)} ${arrow()}</a></p>
      </section>

      <section class="sec wrap" aria-labelledby="recog-h">
        <div class="recog lav rise">
          <div class="txt"><h2 class="h-head" id="recog-h">${esc(Cc.title)}</h2><p>${esc(Cc.lead)}</p></div>
          <ul class="seals">${Cc.iso.map((i) => `<li class="seal">${seal(i.title.replace(/^ISO\s*/, '').split(':')[0])}<b class="ltr">${esc(i.title)}</b><span>${esc(i.desc)}</span></li>`).join('')}</ul>
          <div class="apprv"><h3>${esc(Cc.approvalsHeading)}</h3>${Cc.approvals.map((a) => `<span class="chip">${esc(a)}</span>`).join('')}<a class="link" href="${href('approvals')}">${esc(U.apprMore)} ${arrow()}</a></div>
        </div>
      </section>

      <section class="sec wrap" aria-label="${esc(T.intro.eyebrow)}">
        <dl class="figures rise">${S.map((s) => `<div><dt class="visually-hidden">${esc(s.label)}</dt><dd><strong class="num ltr">${esc(s.value)}</strong></dd><dd><span>${esc(s.label)}</span></dd></div>`).join('')}</dl>
        <p class="figures-foot"><a class="link" href="${href('fleet')}">${esc(U.fleetMore)} ${arrow()}</a></p>
      </section>

      <section class="sec wrap" aria-labelledby="lead-h">
        <div class="sec-head"><h2 class="h-head rise" id="lead-h">${esc(L.title)}</h2><p class="lead rise" style="--d:1">${esc(L.lead)}</p></div>
        <div class="lead-grid">
          <article class="chair-card rise"><figure>${img(src(IMG.chairman), L.leaders[0].name)}</figure>
            <div class="body"><blockquote>${esc(L.quote.replace(/^["«]|["»]$/g, ''))}</blockquote><p class="sig"><b>${esc(L.leaders[0].name)}</b>${esc(L.leaders[0].title)}</p></div></article>
          <a class="person-card rise" style="--d:1" href="${href('company')}" data-tab-open="people"><figure>${img(src(IMG.gm), L.leaders[1].name)}</figure><div class="cap"><b>${esc(L.leaders[1].name)}</b><span>${esc(L.leaders[1].title)}</span></div></a>
        </div>
      </section>

      <section class="sec wrap" aria-labelledby="office-h">
        <div class="close">
          <div class="panel rise">
            <h2 class="h-head" id="office-h">${esc(U.officeH)}</h2>
            <p class="muted">${esc(C.address)}</p>
            <dl>
              <div><dt>${esc(C.hoursHeading)}</dt><dd>${C.hours.map((h) => `<span class="num" style="display:block">${esc(h)}</span>`).join('')}</dd></div>
              <div><dt>${esc(U.mobile)}</dt><dd><a href="${tel(C0.mobile)}"><span class="ltr num">${esc(C0.mobile)}</span></a></dd></div>
              <div><dt>${esc(U.email)}</dt><dd><a href="mailto:${C0.email}">${esc(C0.email)}</a></dd></div>
              <div><dt>${esc(U.cr)}</dt><dd class="num">${esc(C0.cr)}</dd></div>
            </dl>
            <a class="ghost" href="${tel(C0.phone)}">${icon('phone')}<span>${esc(U.call)} <span class="ltr num">${esc(C0.phone)}</span></span></a>
          </div>
          <figure class="rise" style="--d:1">${img(src(IMG.careers), U.photoOf + U.officeH)}</figure>
        </div>
      </section>`;
  }

  // ---------- inner pages ----------
  function company() {
    const T = t(), U = ui(), I = T.intro, J = T.journey, L = T.leadership;
    const ph = [IMG.chairman, IMG.gm];
    const panels = [
      { key: 'about', label: U.tabs.about, html: `<div class="split"><div><p class="lead" style="color:var(--ink)">${esc(I.p2)}</p><p style="margin-top:20px" class="muted">${esc(I.p3)}</p></div><div class="card teal"><h3>${esc(T.why.title)}</h3><ul style="display:grid;gap:10px;margin-top:8px">${T.why.items.slice(4).map((w) => `<li style="display:flex;gap:10px;align-items:baseline"><span class="node" style="flex:none"></span><span>${esc(w)}</span></li>`).join('')}</ul></div></div>` },
      { key: 'journey', label: U.tabs.journey, html: `<ol class="years">${J.milestones.map((m) => `<li><span class="y num">${esc(m.year)}</span><div class="t"><b>${esc(m.title)}</b><span>${esc(m.desc)}</span></div></li>`).join('')}</ol>` },
      { key: 'values', label: U.tabs.values, html: `<div class="cards">${J.values.map((v, i) => `<div class="card ${i % 3 === 1 ? 'lav' : 'teal'}"><span class="node"></span><h3>${esc(v.title)}</h3><p>${esc(v.desc)}</p></div>`).join('')}</div>` },
      { key: 'people', label: U.tabs.people, html: `<div class="people">${L.leaders.map((p, i) => `<article class="person"><figure>${img(src(ph[i]), p.name)}</figure><div><h3>${esc(p.name)}</h3><p class="role">${esc(p.title)}</p><p class="muted">${esc(p.bio)}</p><p class="tags">${(p.expertise || []).map((x) => `<span>${esc(x)}</span>`).join('')}</p></div></article>`).join('')}</div>` },
    ];
    return `${pageHead(I.title, I.p1)}<section class="sec wrap">${tabs('co', I.title, panels)}</section>`;
  }

  function services() {
    const S = t().services;
    return `${pageHead(S.title, S.lead)}
      <section class="sec wrap"><div class="bento">${S.items.map((s, i) => `<a class="tile ${i % 2 ? 'teal' : 'lav'} span-4 rise" style="--d:${i % 3};min-height:0" href="${href(`services/${svcOf(s).slug}`)}">
        <h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p>
        <p style="margin-top:auto;padding-top:12px">${s.capabilities.map(esc).join(' · ')}</p></a>`).join('')}</div></section>`;
  }

  function service() {
    const T = t(), U = ui(), S = T.services, i = svcIdx(state.sub), s = S.items[i];
    const rel = relProj(s);
    const prev = S.items[(i + S.items.length - 1) % S.items.length], next = S.items[(i + 1) % S.items.length];
    return `${pageHead(s.title, s.desc, `<a class="link back" href="${href('services')}">${icon(rtl() ? 'arrow-right' : 'arrow-left')} ${esc(U.allDisc)}</a>`)}
      <section class="sec wrap">
        <div class="tile ${i % 2 ? 'teal' : 'lav'} rise" style="min-height:0;cursor:default">${viz(s, 640, s.title)}</div>
      </section>
      <section class="sec wrap">
        <h2 class="h-head rise" style="margin-bottom:28px">${esc(U.scope)}</h2>
        <div class="cards">${s.capabilities.map((c, j) => `<div class="card ${j % 2 ? 'lav' : 'teal'} rise" style="--d:${j}"><span class="node"></span><h3>${esc(c)}</h3></div>`).join('')}</div>
      </section>
      <section class="sec wrap">
        <h2 class="h-head rise" style="margin-bottom:28px">${esc(U.delivered)}</h2>
        ${rel.length ? `<div class="pcards">${rel.map(pcard).join('')}</div>` : `<p class="muted rise">${esc(U.noProj)}</p>`}
        <nav class="pager" aria-label="${esc(U.allDisc)}"><a href="${href(`services/${svcOf(prev).slug}`)}" rel="prev"><span>${esc(U.prev)}</span><strong style="font-weight:400">${esc(prev.title)}</strong></a><a href="${href(`services/${svcOf(next).slug}`)}" rel="next"><span>${esc(U.next)}</span><strong style="font-weight:400">${esc(next.title)}</strong></a></nav>
      </section>`;
  }

  function pcard(p) {
    return `<a class="pcard rise" href="${href(`projects/${projSlug(p.id)}`)}"><figure>${img(projImg(p), p.title)}</figure><div class="cap"><h3>${esc(p.title)}</h3><span class="meta">${esc(p.client)} · ${esc(p.status)}</span></div></a>`;
  }

  function projects() {
    const P = t().projects, U = ui();
    const items = P.items.filter((p) => state.filter === 'all' || p.key === state.filter);
    return `${pageHead(P.title, P.lead)}
      <section class="sec wrap" id="proj-host">
        <div class="filters" role="group" aria-label="${esc(P.title)}">${P.categories.map((c) => `<button type="button" data-filter="${c.key}" aria-pressed="${state.filter === c.key}">${esc(c.key === 'all' ? U.all : c.label)}</button>`).join('')}</div>
        ${items.length ? `<div class="pcards">${items.map(pcard).join('')}</div>` : `<p class="muted">${esc(P.empty)}</p>`}
      </section>`;
  }

  function project() {
    const T = t(), U = ui(), P = T.projects, p = projBy(state.sub);
    const svc = T.services.items.find((s) => s.icon === CAT_SVC[p.key]);
    const more = P.items.filter((x) => x.key === p.key && x.id !== p.id);
    return `${pageHead(p.title, p.desc, `<a class="link back" href="${href('projects')}">${icon(rtl() ? 'arrow-right' : 'arrow-left')} ${esc(U.projMore)}</a>`)}
      <div class="wrap">
        <figure class="photo wide rise">${img(projImg(p), p.title, true)}</figure>
        <dl class="facts rise"><div><dt>${esc(P.labels.client)}</dt><dd>${esc(p.client)}</dd></div><div><dt>${esc(P.labels.location)}</dt><dd>${esc(p.location)}</dd></div><div><dt>${esc(U.category)}</dt><dd>${esc(catLabel(p))}</dd></div><div><dt>${esc(P.labels.status)}</dt><dd>${esc(p.status)}</dd></div></dl>
      </div>
      <section class="sec wrap">
        <h2 class="h-head rise" style="margin-bottom:28px">${esc(P.labels.scope)}</h2>
        <div class="cards">${(p.scope || []).map((x, j) => `<div class="card ${j % 2 ? 'lav' : 'teal'} rise" style="--d:${j}"><span class="node"></span><h3>${esc(x)}</h3></div>`).join('')}</div>
        ${svc ? `<p style="margin-top:32px"><a class="link" href="${href(`services/${svcOf(svc).slug}`)}">${esc(U.discipline)}: ${esc(svc.title)} ${arrow()}</a></p>` : ''}
      </section>
      ${more.length ? `<section class="sec wrap"><h2 class="h-head rise" style="margin-bottom:28px">${esc(U.more)}</h2><div class="pcards">${more.map(pcard).join('')}</div></section>` : ''}`;
  }

  function fleet() {
    const E = t().equipment;
    return `${pageHead(E.title, E.lead)}
      <section class="sec wrap"><div class="split"><p class="lead rise" style="color:var(--ink)">${esc(E.p1)}</p><div class="card teal rise" style="--d:1"><p style="font-size:var(--fs-body);color:var(--ink)">${esc(E.p2)}</p></div></div>
        <figure class="photo wide rise">${img(src('./assets/photos/equipment-fleet.jpg'), E.title)}</figure></section>
      <section class="sec wrap"><h2 class="h-head rise" style="margin-bottom:28px">${esc(E.categoriesHeading)}</h2><div class="cards">${E.categories.map((c, i) => `<div class="card ${i % 2 ? 'lav' : 'teal'} rise" style="--d:${i % 4}"><span class="node"></span><h3>${esc(c)}</h3></div>`).join('')}</div></section>
      <section class="sec wrap"><h2 class="h-head rise" style="margin-bottom:28px">${esc(E.supportHeading)}</h2><div class="cards">${E.features.map((f, i) => `<div class="card rise" style="--d:${i % 4}"><h3>${esc(f.title)}</h3><p>${esc(f.desc)}</p></div>`).join('')}</div></section>`;
  }

  function approvals() {
    const Cc = t().certifications;
    return `${pageHead(Cc.title, Cc.lead)}
      <section class="sec wrap"><div class="recog lav rise"><div class="txt"><h2 class="h-head">${esc(Cc.isoHeading)}</h2><p>${esc(Cc.commitmentBody)}</p></div>
        <ul class="seals">${Cc.iso.map((i) => `<li class="seal">${seal(i.title.replace(/^ISO\s*/, '').split(':')[0])}<b class="ltr">${esc(i.title)}</b><span>${esc(i.desc)}</span></li>`).join('')}</ul></div></section>
      <section class="sec wrap"><h2 class="h-head rise" style="margin-bottom:28px">${esc(Cc.approvalsHeading)}</h2><div class="cards">${Cc.approvals.map((a, i) => `<div class="card ${i % 2 ? 'lav' : 'teal'} rise" style="--d:${i % 4}"><span class="node"></span><h3>${esc(a)}</h3></div>`).join('')}</div></section>`;
  }

  function field(id, label, control, err, full = false) {
    return `<div class="field${full ? ' full' : ''}"><label for="${id}">${esc(label)}</label>${control}<span class="err" id="${id}-err" hidden>${icon('circle-alert')}<span>${esc(err || '')}</span></span></div>`;
  }

  function contactPage() {
    const T = t(), C = T.contact, U = ui(), pf = state.prefill || {};
    return `${pageHead(C.title, C.lead)}
      <section class="sec wrap form-grid">
        <form id="quote-form" novalidate aria-labelledby="qf-h">
          <h2 class="h-head" id="qf-h" style="margin-bottom:24px">${esc(U.quote)}</h2>
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
          <div><dt>${esc(U.phone)}</dt><dd><a href="${tel(C0.phone)}"><span class="ltr num">${esc(C0.phone)}</span></a></dd></div>
          <div><dt>${esc(U.mobile)}</dt><dd><a href="${tel(C0.mobile)}"><span class="ltr num">${esc(C0.mobile)}</span></a></dd></div>
          <div><dt>${esc(U.email)}</dt><dd><a href="mailto:${C0.email}">${esc(C0.email)}</a></dd></div>
        </dl></aside>
      </section>`;
  }

  function careers() {
    const K = t().careers, U = ui();
    return `${pageHead(K.title, K.lead)}
      <section class="sec wrap"><h2 class="h-head rise" style="margin-bottom:28px">${esc(K.whyTitle)}</h2><div class="cards">${K.why.map((w, i) => `<div class="card ${i % 2 ? 'lav' : 'teal'} rise" style="--d:${i % 4}"><span class="node"></span><h3>${esc(w.title)}</h3><p>${esc(w.desc)}</p></div>`).join('')}</div></section>
      <section class="sec wrap"><h2 class="h-head rise" style="margin-bottom:10px">${esc(K.rolesTitle)}</h2><p class="muted rise" style="margin-bottom:28px">${esc(K.rolesLead)}</p>
        <ul class="roles">${K.roles.map((r) => `<li class="rise"><span class="t">${esc(r.title)}</span><span class="m">${esc(r.dept)} · ${esc(r.location)} · ${esc(r.type)} · ${esc(r.exp)}</span><button class="ghost" type="button" data-role="${r.slug}">${esc(U.apply)}</button></li>`).join('')}</ul></section>
      <section class="sec wrap form-grid" id="apply">
        <form id="apply-form" novalidate aria-labelledby="af-h">
          <h2 class="h-head" id="af-h" style="margin-bottom:8px">${esc(K.applyTitle)}</h2><p class="muted" style="margin-bottom:24px">${esc(K.applyLead)}</p>
          <div class="fields">
            ${field('a-name', K.fields.name, `<input id="a-name" name="name" autocomplete="name" placeholder="${esc(K.placeholders.name)}" aria-describedby="a-name-err">`, K.errors.name)}
            ${field('a-email', K.fields.email, `<input id="a-email" name="email" type="email" autocomplete="email" dir="ltr" placeholder="${esc(K.placeholders.email)}" aria-describedby="a-email-err">`, K.errors.email)}
            ${field('a-phone', K.fields.phone, `<input id="a-phone" name="phone" type="tel" autocomplete="tel" dir="ltr" placeholder="${esc(K.placeholders.phone)}" aria-describedby="a-phone-err">`, K.errors.phone)}
            ${field('a-exp', K.fields.exp, `<input id="a-exp" name="exp" type="number" min="0" max="60" inputmode="numeric" placeholder="${esc(K.placeholders.exp)}" aria-describedby="a-exp-err">`, K.errors.exp)}
            ${field('a-role', K.fields.role, `<select id="a-role" name="role" aria-describedby="a-role-err"><option value="">${esc(K.placeholders.role)}</option>${K.roles.map((r) => `<option value="${r.slug}"${state.role === r.slug ? ' selected' : ''}>${esc(r.title)}</option>`).join('')}<option value="other">${esc(K.otherRole)}</option></select>`, K.errors.role, true)}
            <div class="field full"><span class="label" id="a-cv-l">${esc(K.fields.cv)}</span>
              <label class="visually-hidden" for="a-cv">${esc(K.cvLink)}</label>
              <input id="a-cv" name="cv" type="url" dir="ltr" placeholder="${esc(K.placeholders.cv)}" aria-describedby="a-cv-l a-cv-hint a-cv-err">
              <div class="file-row"><input id="a-file" type="file" accept=".pdf,.doc,.docx" class="visually-hidden"><label class="file-btn" for="a-file">${icon('upload')}${esc(K.cvUploadBtn)}</label><span id="a-file-name" class="hint">${esc(K.cvNone)}</span></div>
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
    if (!state.page) return T.brandLine;
    const map = { company: T.intro.title, contact: T.contact.title, careers: T.careers.title };
    return `${map[state.page] || U.nav[state.page]} | ${T.brandLine}`;
  }

  // ---------- behaviour ----------
  let io, heroIo;
  function observe() {
    document.documentElement.classList.add('js');
    io?.disconnect();
    io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('.rise').forEach((el) => io.observe(el));
  }
  // One quote action on screen at a time: on the home page the bar's copy waits
  // until the hero's own action has scrolled out of view.
  function watchHeroAction() {
    heroIo?.disconnect();
    const b = $('#bar'), a = $('#hero-action');
    b.classList.toggle('quiet', !!a);
    if (!a) return;
    heroIo = new IntersectionObserver(([e]) => b.classList.toggle('quiet', e.isIntersecting), { rootMargin: `-${72}px 0px 0px 0px` });
    heroIo.observe(a);
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
    document.title = title();
    $('.skip').textContent = ui().skip;
    $('#bar').innerHTML = bar();
    $('#main').innerHTML = (page === 'services' && sub) ? service() : (page === 'projects' && sub) ? project() : PAGE_FN[page]();
    $('#foot').innerHTML = foot();
    if (changed || force) scrollTo({ top: 0, behavior: 'auto' });
    observe(); watchHeroAction();
    if (changed && !force) $('#main').focus({ preventScroll: true });
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
      if (open) $('a', d)?.focus();
      return;
    }
    if (el.closest('.drawer')) { $('#drawer').classList.remove('open'); }
    if (el.matches('[role=tab]')) { selectTab(el); return; }
    if (el.dataset.tabOpen) state.tabs.co = el.dataset.tabOpen;
    if (el.dataset.filter) {
      state.filter = el.dataset.filter;
      if (state.page === 'projects') { const y = scrollY; $('#main').innerHTML = projects(); scrollTo(0, y); observe(); $(`[data-filter="${state.filter}"]`)?.focus(); return; }
      $$('#work .filters button').forEach((b) => b.setAttribute('aria-pressed', String(b === el)));
      $$('#work .row').forEach((r) => { r.hidden = state.filter !== 'all' && r.dataset.key !== state.filter; r.classList.add('in'); });
      return;
    }
    if (el.dataset.role) { state.role = el.dataset.role; const s = $('#a-role'); if (s) s.value = state.role; $('#apply').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); setTimeout(() => $('#a-name')?.focus({ preventScroll: true }), 450); return; }
    if (el.hasAttribute('data-quote')) {
      state.prefill = null;
      if (state.page === 'services' && state.sub) { const s = T.services.items[svcIdx(state.sub)]; state.prefill = { type: svcOf(s).type, message: `${T.services.inquireCta} ${s.title}: ` }; }
      else if (state.page === 'projects' && state.sub) { const p = projBy(state.sub); state.prefill = { type: CAT_TYPE[p.key] || 'other', message: `${T.projects.detailsCta}: ${p.title}: ` }; }
      else if (state.page === 'fleet') state.prefill = { type: 'equipment-rental', message: `${T.equipment.cta}: ` };
      else if (state.page === 'approvals') state.prefill = { type: '', message: `${T.certifications.cta}: ` };
      if (state.page === 'contact') { e.preventDefault(); render(true); }
    }
  });

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

  addEventListener('hashchange', () => render());
  render(true);
})();
