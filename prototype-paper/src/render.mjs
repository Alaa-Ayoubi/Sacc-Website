/* Renders every page of the site, in both languages, as static HTML.
 * Nothing here needs scripting in the browser: pages switch with :target,
 * the project filter and the tabs are radio inputs, the phone menu is a page. */
import { CAT_SVC, NAV, UI, isDone, projSlug, svcOf } from '../../frontend/src/lib/site.js';
import { drawing } from './drawing.mjs';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ICON = {
  left: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  right: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  upLeft: '<path d="M7 17V7h10"/><path d="M17 17 7 7"/>',
  upRight: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  menu: '<path d="M4 8h16"/><path d="M4 16h16"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
};
const icon = (name, cls = '') => `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]}</svg>`;

// Interface strings the prototype needs beyond the site's own.
const EXTRA = {
  ar: { preview: 'معاينة فقط: الإرسال يعمل في الموقع الفعلي.', careers: 'الوظائف', address: 'العنوان', short: 'سنا الأوائل للمقاولات' },
  en: { preview: 'Preview only: sending works on the live site.', careers: 'Careers', address: 'Address', short: 'Sana Al-Awael Contracting' },
};
const JOINERS = new Set(['&', 'و', 'في', 'in', 'of', 'for', 'to', 'the', 'إلى', 'من']);

export function renderAll(site) {
  const pages = [];
  for (const lang of ['en', 'ar']) pages.push(...renderLang(site, lang));
  // The Arabic home page goes last: it shows whenever no other page is targeted.
  const home = pages.findIndex((p) => p.id === 'ar');
  const [last] = pages.splice(home, 1);
  return [...pages, last].map((p) => p.html).join('\n');
}

function renderLang(site, lang) {
  const t = site[lang];
  const ui = { ...UI[lang], ...EXTRA[lang] };
  const { company, images } = site;
  const other = lang === 'ar' ? 'en' : 'ar';
  const rtl = lang === 'ar';
  const P = t.projects, S = t.services, Cc = t.certifications, L = t.leadership, C = t.contact, K = t.careers, E = t.equipment, J = t.journey, I = t.intro;

  const id = (path = '', l = lang) => (path ? `${l}-${path.replace(/\//g, '-')}` : l);
  const href = (path = '', l = lang) => `#${id(path, l)}`;
  const fwd = rtl ? 'left' : 'right';
  const back = rtl ? 'right' : 'left';
  const up = rtl ? 'upLeft' : 'upRight';
  const tel = (n) => `tel:${n.replace(/\s/g, '')}`;
  const ltr = (s) => `<span class="ltr num">${esc(s)}</span>`;

  const photoVar = (u) => {
    const m = /assets\/photos\/([a-z-]+)\.jpg$/.exec(u || '');
    return m ? `var(--ph-${m[1]})` : `url('${u}')`;
  };
  const ph = (u, alt) => `<span class="ph"${alt ? ` role="img" aria-label="${esc(alt)}"` : ' aria-hidden="true"'} style="--p:${photoVar(u)}"></span>`;

  /** A heading in two tones: the first part in ink, the rest muted. */
  const tone = (title) => {
    const w = String(title).trim().split(/\s+/);
    if (w.length < 2) return esc(title);
    let k = w.length <= 3 ? w.length - 1 : Math.ceil(w.length / 2);
    if (title === ui.officeH) k = rtl ? 1 : 2;
    while (k > 1 && JOINERS.has(w[k - 1].toLowerCase())) k -= 1;
    return `${esc(w.slice(0, k).join(' '))} <span class="tone">${esc(w.slice(k).join(' '))}</span>`;
  };

  const secHead = (title, lead, { tag = 'h2', cls = 'h-sec', hid, extra = '', label = '' } = {}) => `
    <div class="sec-head">
      <div class="rise">${label ? `<p class="label">${esc(label)}</p>` : ''}<${tag} class="${cls}"${hid ? ` id="${hid}"` : ''}>${tone(title)}</${tag}></div>
      <div class="side rise">${lead ? `<p class="lead">${esc(lead)}</p>` : ''}${extra}</div>
    </div>`;

  const link = (path, label, dir = fwd) => `<a class="link" href="${href(path)}">${dir === back ? icon(back) : ''}<span>${esc(label)}</span>${dir === back ? '' : icon(fwd)}</a>`;

  const catLabel = (p) => P.categories.find((c) => c.key === p.key)?.label || p.category;
  const pcard = (p, tag = 'h3') => `
    <a class="pcard on-dark" data-key="${p.key}" href="${href(`projects/${projSlug(site, p.id)}`)}">
      ${ph(p.image)}
      <span class="top"><span>${esc(p.client)}</span><span class="st${isDone(p) ? '' : ' live'}">${esc(p.status)}</span></span>
      <${tag} class="pt">${esc(p.title)}</${tag}>
    </a>`;
  const pgrid = (items, tag) => `<div class="pgrid">${items.map((p) => pcard(p, tag)).join('')}</div>`;
  const filtered = (page, tag) => `
    <div class="filters">
      ${P.categories.map((c, i) => `<input type="radio" name="pf-${id(page)}" id="pf-${id(page)}-${c.key}" class="f-${c.key}"${i ? '' : ' checked'}><label for="pf-${id(page)}-${c.key}">${esc(c.key === 'all' ? ui.all : c.label)}</label>`).join('')}
      ${pgrid(P.items, tag)}
    </div>`;

  const isoTiles = () => `
    <div class="tiles">
      ${Cc.iso.map((x) => {
        const [, n] = /^ISO\s*(.+)$/.exec(x.title) || [null, x.title];
        return `<div class="tile rise"><div class="plate"><small class="ltr">ISO</small><b class="ltr num">${esc(n)}</b></div><h3>${esc(x.desc)}</h3></div>`;
      }).join('')}
    </div>`;

  const plainCards = (items, four = true, tag = 'h3') => `<div class="cards${four ? ' four' : ''}">${items.map((x) => `<div class="card plain rise"><${tag} class="h3">${esc(typeof x === 'string' ? x : x.title)}</${tag}>${x.desc ? `<p>${esc(x.desc)}</p>` : ''}</div>`).join('')}</div>`;

  const officeRows = (withCr = true) => `
    <div><dt>${esc(ui.address)}</dt><dd>${esc(C.address)}</dd></div>
    <div><dt>${esc(C.hoursHeading)}</dt><dd>${C.hours.map((h) => `<span class="num" style="display:block">${esc(h)}</span>`).join('')}</dd></div>
    <div><dt>${esc(ui.phone)}</dt><dd><a href="${tel(company.phone)}">${ltr(company.phone)}</a></dd></div>
    <div><dt>${esc(ui.mobile)}</dt><dd><a href="${tel(company.mobile)}">${ltr(company.mobile)}</a></dd></div>
    <div><dt>${esc(ui.email)}</dt><dd><a href="mailto:${company.email}">${esc(company.email)}</a></dd></div>
    ${withCr ? `<div><dt>${esc(ui.cr)}</dt><dd class="num">${esc(company.cr)}</dd></div>` : ''}`;

  // ---------- frame ----------
  const frame = (path, body, { home = false, hero = '', current = '' } = {}) => {
    const pid = id(path);
    const nav = (cls) => `<nav class="${cls}" aria-label="${esc(ui.menu)}">${NAV.map((n) => `<a href="${href(n)}"${current === n ? ' aria-current="page"' : ''}>${esc(ui.nav[n])}</a>`).join('')}</nav>`;
    const action = (cls) => (current === 'contact' ? '' : `<a class="action ${cls}" href="${href('contact')}">${esc(t.navCta)}</a>`);
    const langLink = `<a class="lang" href="${href(path, other)}" lang="${other}">${esc(ui.langName)}</a>`;
    const brand = `<a class="brand" href="${href('')}"><span class="mark" aria-hidden="true"></span><span class="name">${esc(ui.short)}</span></a>`;
    const lockup = `<a class="brand" href="${href('')}" aria-label="${esc(t.brandLine)}"><span class="logo"></span></a>`;
    const page = `
<div class="page${home ? ' home' : ''}" id="${pid}" lang="${lang}" dir="${rtl ? 'rtl' : 'ltr'}">
  <header class="bar"><div class="wrap bar-in">
    ${brand}${nav('main-nav')}${langLink}${action('bar-action')}
    <a class="icon-btn menu-btn" href="#menu-${pid}" aria-label="${esc(ui.menu)}">${icon('menu')}</a>
  </div></header>
  ${hero}
  <main class="sheet-body">${body}</main>
  <footer class="foot on-dark"><div class="wrap foot-in">
    ${lockup}<span class="rights">${esc(t.footer.rights)}</span>
    <a href="${href('careers')}">${esc(ui.careers)}</a>
    <a href="${href(path, other)}" lang="${other}">${esc(ui.langName)}</a>
  </div></footer>
</div>`;
    const drawer = `
<div class="page drawer" id="menu-${pid}" lang="${lang}" dir="${rtl ? 'rtl' : 'ltr'}">
  <div class="drawer-top">${brand}<a class="icon-btn" href="#${pid}" aria-label="${esc(ui.close)}">${icon('x')}</a></div>
  ${nav('drawer-nav')}
  <div class="drawer-foot">${langLink}${action('')}</div>
</div>`;
    return [{ id: `menu-${pid}`, html: drawer }, { id: pid, html: page }];
  };

  const pageHead = (title, lead, backLink = '') => `
    <div class="wrap page-head">${backLink ? `<p class="back">${backLink}</p>` : ''}${secHead(title, lead, { tag: 'h1', cls: 'h-page' })}</div>`;
  const h2 = (text) => `<h2 class="h-sec rise" style="margin-bottom:28px">${esc(text)}</h2>`;

  const out = [];

  // ---------- home ----------
  {
    const [chair, gm] = L.leaders;
    const hero = `
  <section class="hero on-dark" aria-labelledby="${id('')}-h1">
    ${ph(images.hero)}
    <div class="wrap hero-mid">
      <h1 class="h-hero" id="${id('')}-h1">${esc(t.brandLine)}</h1>
      <p class="lead">${esc(t.hero.lead)}</p>
      <span class="cta"><a class="action light" href="${href('contact')}"><span class="ic">${icon('phone')}</span>${esc(t.navCta)}</a></span>
    </div>
    <div class="wrap"><dl class="creds" aria-label="${esc(ui.figuresLabel)}">
      ${t.stats.map((s) => `<div><dt>${esc(s.label)}</dt><dd class="num ltr">${esc(s.value)}</dd></div>`).join('')}
    </dl></div>
  </section>`;
    const body = `
    <section class="sec wrap">
      ${secHead(S.title, S.lead, { label: S.eyebrow })}
      <div class="cards">
        ${S.items.map((s) => `<a class="card rise" href="${href(`services/${svcOf(s).slug}`)}"><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p><span class="gap"></span><p class="caps">${esc(s.capabilities.join(' · '))}</p>${icon(up, 'go')}</a>`).join('')}
      </div>
    </section>

    <section class="sec wrap">
      ${secHead(P.title, P.lead, { label: P.eyebrow })}
      ${filtered('')}
      <p class="sec-foot">${link('projects', ui.projMore)}</p>
    </section>

    <section class="sec">
      <div class="wrap">${secHead(Cc.title, Cc.lead, { label: Cc.eyebrow, extra: link('approvals', ui.apprMore) })}</div>
      <div class="band"><div class="wrap band-in">
        <div class="rise"><h3>${esc(Cc.approvalsHeading)}</h3>
          <ol class="rows">${Cc.approvals.map((a, i) => `<li><span>${esc(a)}</span><span class="n num ltr" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span></li>`).join('')}</ol>
        </div>
        <div class="drawing rise" aria-hidden="true">${drawing()}</div>
      </div></div>
      <div class="wrap" style="margin-top:clamp(48px,6vw,88px)">
        <h3 class="sub-h rise">${esc(Cc.isoHeading)}</h3>
        ${isoTiles()}
      </div>
    </section>

    <section class="sec wrap">
      ${secHead(L.title, L.lead, { label: L.eyebrow })}
      <div class="panel rise">
        ${ph(images.water)}
        <figure class="float chair">
          ${ph(images.chairman, chair.name)}
          <div><blockquote>${esc(L.quote.replace(/^["«]|["»]$/g, ''))}</blockquote>
          <figcaption class="sig"><b>${esc(chair.name)}</b><span>${esc(chair.title)}</span></figcaption></div>
        </figure>
        <a class="float gm" href="${href('company-people')}">
          ${ph(images.gm, gm.name)}
          <span class="txt"><b>${esc(gm.name)}</b><span>${esc(gm.title)}</span><span class="more">${esc(ui.tabs.people)}</span></span>
        </a>
      </div>
    </section>

    <section class="sec wrap">
      <div class="close rise">
        <h2 class="h-sec">${esc(ui.officeH)}</h2>
        <dl class="float facts">${officeRows()}</dl>
      </div>
    </section>`;
    out.push(...frame('', body, { home: true, hero }));
  }

  // ---------- company (and the same page opened on its leadership tab) ----------
  for (const [path, open] of [['company', 1], ['company-people', 4]]) {
    const photos = [images.chairman, images.gm];
    const tabs = [
      [ui.tabs.about, `
        <div class="split">
          <div class="prose"><p class="lead" style="color:var(--ink);max-width:none">${esc(I.p2)}</p><p class="muted">${esc(I.p3)}</p></div>
          <div class="card plain"><h2 class="h3">${esc(t.why.title)}</h2><ul class="ticks">${t.why.items.slice(4).map((w) => `<li><span>${esc(w)}</span></li>`).join('')}</ul></div>
        </div>`],
      [ui.tabs.journey, `<ol class="years">${J.milestones.map((m) => `<li><span class="y num">${esc(m.year)}</span><div class="t"><b>${esc(m.title)}</b><span class="muted">${esc(m.desc)}</span></div></li>`).join('')}</ol>`],
      [ui.tabs.values, plainCards(J.values, true, 'h2')],
      [ui.tabs.people, `<div class="people">${L.leaders.map((p, i) => `
        <article class="person">${ph(photos[i], p.name)}
          <div><h2 class="pn">${esc(p.name)}</h2><p class="role">${esc(p.title)}</p><p class="muted">${esc(p.bio)}</p>
          <p class="tags">${(p.expertise || []).map((x) => `<span>${esc(x)}</span>`).join('')}</p></div>
        </article>`).join('')}</div>`],
    ];
    const body = `
    ${pageHead(I.title, I.p1)}
    <section class="sec wrap">
      <div class="filters tabs">
        ${tabs.map(([label], i) => `<input type="radio" name="tab-${id(path)}" id="tab-${id(path)}-${i + 1}" class="t${i + 1}"${i + 1 === open ? ' checked' : ''}><label for="tab-${id(path)}-${i + 1}">${esc(label)}</label>`).join('')}
        <div class="panels">${tabs.map(([, html], i) => `<div class="tabpanel p${i + 1}">${html}</div>`).join('')}</div>
      </div>
    </section>`;
    out.push(...frame(path, body, { current: 'company' }));
  }

  // ---------- services ----------
  out.push(...frame('services', `
    ${pageHead(S.title, S.lead)}
    <section class="sec wrap">
      <div class="list">
        ${S.items.map((s) => `<a class="row rise" href="${href(`services/${svcOf(s).slug}`)}"><b>${esc(s.title)}</b><span class="muted">${esc(s.desc)}</span>${icon(fwd, 'go')}</a>`).join('')}
      </div>
    </section>`, { current: 'services' }));

  S.items.forEach((s, i) => {
    const rel = P.items.filter((p) => svcOf(s).cat.includes(p.key));
    const prev = S.items[(i + S.items.length - 1) % S.items.length], next = S.items[(i + 1) % S.items.length];
    out.push(...frame(`services/${svcOf(s).slug}`, `
    ${pageHead(s.title, s.desc, link('services', ui.allDisc, back))}
    <section class="sec wrap">${h2(ui.scope)}${plainCards(s.capabilities)}</section>
    <section class="sec wrap">
      ${h2(ui.delivered)}
      ${rel.length ? pgrid(rel) : `<p class="muted">${esc(ui.noProj)}</p>`}
      <nav class="pager" aria-label="${esc(ui.allDisc)}">
        <a href="${href(`services/${svcOf(prev).slug}`)}" rel="prev"><span>${esc(ui.prev)}</span><b style="font-weight:400">${esc(prev.title)}</b></a>
        <a href="${href(`services/${svcOf(next).slug}`)}" rel="next"><span>${esc(ui.next)}</span><b style="font-weight:400">${esc(next.title)}</b></a>
      </nav>
    </section>`, { current: 'services' }));
  });

  // ---------- projects ----------
  out.push(...frame('projects', `
    ${pageHead(P.title, P.lead)}
    <section class="sec wrap">${filtered('projects', 'h2')}</section>`, { current: 'projects' }));

  P.items.forEach((p) => {
    const svc = S.items.find((s) => s.icon === CAT_SVC[p.key]);
    const more = P.items.filter((x) => x.key === p.key && x.id !== p.id);
    out.push(...frame(`projects/${projSlug(site, p.id)}`, `
    ${pageHead(p.title, p.desc, link('projects', ui.projMore, back))}
    <div class="wrap">
      <div class="panel sharp record rise">
        ${ph(p.image, p.title)}
        <dl class="float facts">
          <div><dt>${esc(P.labels.client)}</dt><dd>${esc(p.client)}</dd></div>
          <div><dt>${esc(P.labels.location)}</dt><dd>${esc(p.location)}</dd></div>
          <div><dt>${esc(ui.category)}</dt><dd>${esc(catLabel(p))}</dd></div>
          <div><dt>${esc(P.labels.status)}</dt><dd>${esc(p.status)}</dd></div>
        </dl>
      </div>
    </div>
    <section class="sec wrap">
      ${h2(P.labels.scope)}${plainCards(p.scope || [])}
      ${svc ? `<p style="margin-top:28px">${link(`services/${svcOf(svc).slug}`, `${ui.discipline}: ${svc.title}`)}</p>` : ''}
    </section>
    ${more.length ? `<section class="sec wrap">${h2(ui.more)}${pgrid(more)}</section>` : ''}`, { current: 'projects' }));
  });

  // ---------- fleet ----------
  out.push(...frame('fleet', `
    ${pageHead(E.title, E.lead)}
    <section class="sec wrap">
      <div class="split"><p class="lead rise" style="color:var(--ink);max-width:none">${esc(E.p1)}</p><p class="muted rise">${esc(E.p2)}</p></div>
      <figure class="photo rise" style="margin-top:clamp(32px,5vw,64px)">${ph(images.equipment, E.title)}</figure>
    </section>
    <section class="sec wrap">${h2(E.categoriesHeading)}${plainCards(E.categories, false)}</section>
    <section class="sec wrap">${h2(E.supportHeading)}
      <div class="points">${E.features.map((f) => `<div class="rise"><h3>${esc(f.title)}</h3><p class="muted">${esc(f.desc)}</p></div>`).join('')}</div>
    </section>`, { current: 'fleet' }));

  // ---------- approvals ----------
  out.push(...frame('approvals', `
    ${pageHead(Cc.title, Cc.lead)}
    <section class="sec wrap">
      ${secHead(Cc.isoHeading, Cc.commitmentBody)}
      ${isoTiles()}
    </section>
    <section class="sec wrap">${h2(Cc.approvalsHeading)}${plainCards(Cc.approvals)}</section>`, { current: 'approvals' }));

  // ---------- contact ----------
  {
    const f = (k) => `${id('contact')}-${k}`;
    out.push(...frame('contact', `
    ${pageHead(C.title, C.lead)}
    <section class="sec wrap form-grid">
      <form aria-labelledby="${f('h')}" action="#${id('contact')}">
        <h2 class="h-sec" id="${f('h')}" style="margin-bottom:24px">${esc(ui.formH)}</h2>
        <div class="fields">
          <div class="field"><label for="${f('name')}">${esc(C.fields.name)}</label><input type="text" id="${f('name')}" autocomplete="name" placeholder="${esc(C.placeholders.name)}"></div>
          <div class="field"><label for="${f('email')}">${esc(C.fields.email)}</label><input type="email" id="${f('email')}" dir="ltr" autocomplete="email" placeholder="${esc(C.placeholders.email)}"></div>
          <div class="field full"><label for="${f('company')}">${esc(C.fields.company)}</label><input type="text" id="${f('company')}" autocomplete="organization" placeholder="${esc(C.placeholders.company)}"></div>
          <div class="field full"><label for="${f('message')}">${esc(C.fields.message)}</label><textarea id="${f('message')}" placeholder="${esc(C.placeholders.message)}"></textarea></div>
        </div>
        <div class="form-foot"><button class="action" type="button">${esc(C.submit)}</button><span class="hint">${esc(ui.preview)}</span></div>
      </form>
      <aside aria-label="${esc(C.officeHeading)}"><dl class="aside-list">${officeRows(false)}</dl></aside>
    </section>`, { current: 'contact' }));
  }

  // ---------- careers ----------
  {
    const f = (k) => `${id('careers')}-${k}`;
    const inp = (k, type, extra = '') => `<div class="field"><label for="${f(k)}">${esc(K.fields[k])}</label><input type="${type}" id="${f(k)}" placeholder="${esc(K.placeholders[k])}"${extra}></div>`;
    out.push(...frame('careers', `
    ${pageHead(K.title, K.lead)}
    <section class="sec wrap">${h2(K.whyTitle)}
      <div class="points">${K.why.map((w) => `<div class="rise"><h3>${esc(w.title)}</h3><p class="muted">${esc(w.desc)}</p></div>`).join('')}</div>
    </section>
    <section class="sec wrap">
      ${secHead(K.rolesTitle, K.rolesLead)}
      <ul class="list roles">${K.roles.map((r) => `<li class="row rise"><b>${esc(r.title)}</b><span class="muted">${esc([r.dept, r.location, r.type, r.exp].join(' · '))}</span></li>`).join('')}</ul>
    </section>
    <section class="sec wrap form-grid solo">
      <form aria-labelledby="${f('h')}" action="#${id('careers')}">
        <h2 class="h-sec" id="${f('h')}" style="margin-bottom:8px">${esc(K.applyTitle)}</h2>
        <p class="muted" style="margin-bottom:24px">${esc(K.applyLead)}</p>
        <div class="fields">
          ${inp('name', 'text', ' autocomplete="name"')}${inp('email', 'email', ' dir="ltr" autocomplete="email"')}
          ${inp('phone', 'tel', ' dir="ltr" autocomplete="tel"')}${inp('exp', 'number', ' min="0" max="60" inputmode="numeric"')}
          <div class="field full"><label for="${f('role')}">${esc(K.fields.role)}</label>
            <select id="${f('role')}"><option value="">${esc(K.placeholders.role)}</option>${K.roles.map((r) => `<option>${esc(r.title)}</option>`).join('')}<option>${esc(K.otherRole)}</option></select></div>
          <div class="field full"><label for="${f('cv')}">${esc(K.fields.cv)}</label>
            <input type="url" id="${f('cv')}" dir="ltr" placeholder="${esc(K.placeholders.cv)}" aria-describedby="${f('cvh')}">
            <div class="file-row"><input type="file" id="${f('file')}" class="vh" accept=".pdf,.doc,.docx"><label class="file-btn" for="${f('file')}">${esc(K.cvUploadBtn)}</label></div>
            <span class="hint" id="${f('cvh')}">${esc(K.cvHint)}</span></div>
          <div class="field full"><label for="${f('note')}">${esc(K.fields.note)}</label><textarea id="${f('note')}" placeholder="${esc(K.placeholders.note)}"></textarea></div>
        </div>
        <div class="form-foot"><button class="action" type="button">${esc(K.submit)}</button><span class="hint">${esc(ui.preview)}</span></div>
      </form>
    </section>`, { current: 'careers' }));
  }

  return out;
}
