// Runs inside the rendered page. Makes the DOM converter-friendly without changing what the browser draws.
window.__prep = () => {
  const report = { svgSized: 0, flexReversed: 0, flexSkipped: [], moved: [] };
  const all = [...document.body.querySelectorAll('*')].filter(e => !e.closest('svg'));
  const before = new Map(all.map(e => [e, e.getBoundingClientRect()]));
  // 1) explicit SVG sizes, viewBox cropped to the visible region
  for (const svg of document.querySelectorAll('svg')) {
    if (svg.parentElement.closest('svg')) continue;
    const r = svg.getBoundingClientRect(); if (!r.width || !r.height) continue;
    const vb = svg.viewBox && svg.viewBox.baseVal;
    if (vb && vb.width && vb.height) {
      const par = (svg.getAttribute('preserveAspectRatio') || 'xMidYMid meet').trim();
      const ratioBox = r.width / r.height, ratioVb = vb.width / vb.height;
      if (Math.abs(ratioBox - ratioVb) > 0.002 && par !== 'none') {
        const slice = /slice/.test(par);
        const s = slice ? Math.max(r.width / vb.width, r.height / vb.height) : Math.min(r.width / vb.width, r.height / vb.height);
        const vw = r.width / s, vh = r.height / s;
        const ax = /xMin/.test(par) ? 0 : /xMax/.test(par) ? 1 : 0.5, ay = /YMin/.test(par) ? 0 : /YMax/.test(par) ? 1 : 0.5;
        const x = vb.x + (vb.width - vw) * ax, y = vb.y + (vb.height - vh) * ay;
        svg.setAttribute('viewBox', `${x.toFixed(3)} ${y.toFixed(3)} ${vw.toFixed(3)} ${vh.toFixed(3)}`);
      }
      svg.setAttribute('preserveAspectRatio', 'none');
    }
    svg.setAttribute('width', r.width.toFixed(2)); svg.setAttribute('height', r.height.toFixed(2));
    svg.style.width = r.width.toFixed(2) + 'px'; svg.style.height = r.height.toFixed(2) + 'px';
    report.svgSized++;
  }
  // 2) RTL flex rows -> LTR rows with reversed children (visually identical)
  const targets = []; const wrapTargets = [];
  for (const el of all) {
    const cs = getComputedStyle(el);
    if (!/flex/.test(cs.display) || cs.direction !== 'rtl' || cs.flexDirection !== 'row') continue;
    const items = [...el.children].filter(c => { const k = getComputedStyle(c); return k.display !== 'none' && k.position !== 'absolute' && k.position !== 'fixed'; });
    const textItems = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()).length;
    if (items.length + textItems <= 1) continue;
    if (items.some(c => getComputedStyle(c).order !== '0')) { report.flexSkipped.push('order:' + el.className); continue; }
    if (cs.flexWrap !== 'nowrap' && items.length > 1) {
      const tops = items.map(c => Math.round(c.getBoundingClientRect().top));
      const r0 = items.map(c => c.getBoundingClientRect());
      const oneLine = r0.every(r => r.top < r0[0].bottom && r.bottom > r0[0].top);
      if (!oneLine) { wrapTargets.push([el, cs, items]); continue; }
    }
    el.__own = ['marginLeft','marginRight','paddingLeft','paddingRight','borderLeftWidth','borderRightWidth','borderLeftStyle','borderRightStyle','borderLeftColor','borderRightColor','borderTopLeftRadius','borderTopRightRadius','borderBottomLeftRadius','borderBottomRightRadius'].map(k => [k, cs[k]]);
    targets.push([el, cs.justifyContent, [...el.children].map(c => { const k = getComputedStyle(c); return [c, k.marginLeft, k.marginRight]; })]);
  }
  const flip = { 'normal': 'flex-end', 'flex-start': 'flex-end', 'start': 'flex-end', 'flex-end': 'flex-start', 'end': 'flex-start' };
  const listOf = (el) => [el.parentElement, el, ...el.querySelectorAll('*')].filter(Boolean);
  const snap = (els) => els.map(e => { const r = e.getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; });
  const same = (A, B) => A.length === B.length && A.every((a, i) => a.every((v, j) => Math.abs(v - B[i][j]) < 0.6));
  report.rowReverse = 0; report.leftAsIs = [];
  for (const [el, jc, margins] of targets) {
    const els = listOf(el); const ref = snap(els);
    const saved = { nodes: [...el.childNodes], style: el.getAttribute('style'), kids: [...el.children].map(c => [c, c.getAttribute('style')]) };
    const restore = () => {
      for (const n of [...el.childNodes]) if (n.nodeType === 1 && n.dataset && n.dataset.wrap) { n.replaceWith(...n.childNodes); }
      for (const n of saved.nodes) el.appendChild(n);
      saved.style === null ? el.removeAttribute('style') : el.setAttribute('style', saved.style);
      for (const [c, st] of saved.kids) st === null ? c.removeAttribute('style') : c.setAttribute('style', st);
    };
    const common = () => {
      for (const [c, ml, mr] of margins) { c.style.marginLeft = ml; c.style.marginRight = mr; }
      for (const [k, v] of el.__own) el.style[k] = v;
      for (const n of [...el.childNodes]) if (n.nodeType === 3 && n.textContent.trim()) { const sp = document.createElement('span'); sp.dataset.wrap = '1'; sp.style.direction = 'rtl'; n.replaceWith(sp); sp.appendChild(n); }
      for (const c of el.children) c.style.direction = 'rtl';
      el.style.direction = 'ltr';
    };
    // mode A: physical reorder
    common();
    for (const k of [...el.childNodes].reverse()) el.appendChild(k);
    if (flip[jc]) el.style.justifyContent = flip[jc];
    if (same(ref, snap(els))) { report.flexReversed++; continue; }
    restore();
    // mode B: row-reverse (keeps DOM order, so baselines stay put)
    common();
    el.style.flexDirection = 'row-reverse';
    if (same(ref, snap(els))) { report.rowReverse++; continue; }
    restore();
    // mode C: physical reorder + vertical-align compensation (inline-level boxes whose baseline item changed)
    common();
    for (const k of [...el.childNodes].reverse()) el.appendChild(k);
    if (flip[jc]) el.style.justifyContent = flip[jc];
    let okC = false;
    for (const va of ['top', 'bottom', 'middle', 'text-top', 'text-bottom']) { el.style.verticalAlign = va; if (same(ref, snap(els))) { okC = true; break; } }
    if (okC) { report.valign = (report.valign || 0) + 1; continue; }
    el.style.verticalAlign = '';
    // mode D: accept mode C when the residual is at most 2px
    const tol = (A, B) => A.every((a, i) => a.every((x, j) => Math.abs(x - B[i][j]) <= 2));
    if (tol(ref, snap(els))) { report.approx = (report.approx || 0) + 1; continue; }
    restore();
    report.leftAsIs.push(el.tagName + '.' + el.className);
  }
  // 2b) multi-line wrapping RTL rows: one explicit LTR row per visual line
  for (const [el, cs, items] of wrapTargets) {
    const els = listOf(el); const ref = snap(els);
    const savedNodes = [...el.childNodes], savedStyle = el.getAttribute('style'), savedKidStyles = [...el.children].map(c => [c, c.getAttribute('style')]);
    const lines = [];
    for (const it of items) { const r = it.getBoundingClientRect(); const L = lines.find(l => r.top < l.bottom && r.bottom > l.top); if (L) L.items.push(it); else lines.push({ top: r.top, bottom: r.bottom, items: [it] }); }
    const cg = cs.columnGap === 'normal' ? '0px' : cs.columnGap, rg = cs.rowGap === 'normal' ? '0px' : cs.rowGap;
    const own = ['paddingLeft','paddingRight','marginLeft','marginRight'].map(k => [k, cs[k]]);
    const flipJ = { 'normal': 'flex-end', 'flex-start': 'flex-end', 'start': 'flex-end', 'flex-end': 'flex-start', 'end': 'flex-start' }[cs.justifyContent] || cs.justifyContent;
    el.style.display = cs.display === 'inline-flex' ? 'inline-flex' : 'flex'; el.style.flexDirection = 'column'; el.style.flexWrap = 'nowrap'; el.style.rowGap = rg; el.style.alignItems = 'stretch';
    for (const [k, v] of own) el.style[k] = v;
    for (const L of lines) {
      const row = document.createElement('div');
      const jl = L.items.length === 1 ? ({ 'space-between': 'flex-end', 'space-around': 'center', 'space-evenly': 'center' }[cs.justifyContent] || flipJ) : flipJ;
      row.style.cssText = `display:flex;flex-direction:row;flex-wrap:nowrap;direction:ltr;column-gap:${cg};justify-content:${jl};align-items:${cs.alignItems}`;
      for (const it of [...L.items].reverse()) { const k = getComputedStyle(it); const ml = k.marginLeft, mr = k.marginRight; if (!it.style.direction) it.style.direction = 'rtl'; it.style.marginLeft = ml; it.style.marginRight = mr; row.appendChild(it); }
      el.appendChild(row);
    }
    if (same(ref, snap(els))) { report.wrapRows = (report.wrapRows || 0) + 1; continue; }
    { const now = snap(els); const i = now.findIndex((a, i) => a.some((v, j) => Math.abs(v - ref[i][j]) >= 0.6)); report.wrapWhy = (report.wrapWhy || []).concat([(el.className) + ' #' + i + ' ' + (els[i] && els[i].tagName + '.' + els[i].className) + ' ref=' + ref[i].map(v => v.toFixed(1)) + ' now=' + now[i].map(v => v.toFixed(1)) + ' jc=' + cs.justifyContent + ' ai=' + cs.alignItems]); }
    el.innerHTML = ''; for (const n of savedNodes) el.appendChild(n);
    for (const [c, st] of savedKidStyles) st === null ? c.removeAttribute('style') : c.setAttribute('style', st);
    savedStyle === null ? el.removeAttribute('style') : el.setAttribute('style', savedStyle);
    report.flexSkipped.push('wrap:' + (el.className || el.tagName));
  }
  // 4) converter-friendly paint: SVG computed styles, pattern fills, inset rings, repeating gradients
  report.svgPaint = 0; report.rings = 0; report.dashes = 0; report.patterns = 0; report.hiddenSvg = 0;
  const patBase = (svg, ref) => { const m = /url\(["']?#([^"')]+)["']?\)/.exec(ref); if (!m) return null; const pat = svg.ownerDocument.getElementById(m[1]); if (!pat || pat.tagName.toLowerCase() !== 'pattern') return null; const r = pat.querySelector('rect'); return r ? getComputedStyle(r).fill : null; };
  for (const svg of [...document.querySelectorAll('svg')].filter(s => !s.parentElement.closest('svg'))) {
    const nodes = [svg, ...svg.querySelectorAll('*')].filter(n => !n.closest('defs') && !n.closest('pattern'));
    const plan = nodes.map(n => [n, getComputedStyle(n)]);
    for (const [n, k] of plan) {
      if (n !== svg && (k.display === 'none' || k.visibility === 'hidden' || parseFloat(k.opacity) === 0)) { n.remove(); report.hiddenSvg++; continue; }
      const tag = n.tagName.toLowerCase();
      if (tag === 'g' || tag === 'svg' || ['rect','circle','ellipse','line','path','polygon','polyline','text','tspan'].includes(tag)) {
        for (const [prop, attr] of [['fill','fill'],['stroke','stroke']]) {
          let v = k[prop];
          if (/url\(/.test(v)) { const b = patBase(svg, v); if (b) { v = b; report.patterns++; } else continue; }
          n.setAttribute(attr, v);
        }
        for (const [prop, attr] of [['strokeWidth','stroke-width'],['fillOpacity','fill-opacity'],['strokeOpacity','stroke-opacity'],['strokeLinecap','stroke-linecap'],['strokeLinejoin','stroke-linejoin'],['strokeDasharray','stroke-dasharray']]) {
          const v = k[prop]; if (v && v !== 'none' && v !== 'normal') n.setAttribute(attr, v);
        }
        if (k.opacity !== '1') n.setAttribute('opacity', k.opacity);
        if (tag === 'text' || tag === 'tspan') { n.setAttribute('font-family', k.fontFamily); n.setAttribute('font-size', k.fontSize); n.setAttribute('font-weight', k.fontWeight); }
        report.svgPaint++;
      }
    }
    svg.querySelectorAll('pattern').forEach(pt => pt.remove());
    svg.querySelectorAll('defs').forEach(d => { if (!d.children.length) d.remove(); });
  }
  const ringRe = /^(rgba?\([^)]*\)) 0px 0px 0px (\d+(?:\.\d+)?)px inset$/;
  for (const e of document.body.querySelectorAll('*')) {
    if (e.closest('svg')) continue;
    const k = getComputedStyle(e); const m = ringRe.exec(k.boxShadow); if (!m) continue;
    const w = parseFloat(m[2]);
    const sides = ['Top','Right','Bottom','Left'];
    if (sides.some(sd => parseFloat(k['border' + sd + 'Width']) !== 0)) continue;
    const grp = [e, ...e.querySelectorAll('*')]; const r0 = grp.map(x => { const r = x.getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; });
    const st0 = e.getAttribute('style');
    for (const sd of sides) { e.style['padding' + sd] = Math.max(0, parseFloat(k['padding' + sd]) - w) + 'px'; e.style['border' + sd] = `${w}px solid ${m[1]}`; }
    e.style.boxShadow = 'none';
    const r1 = grp.map(x => { const r = x.getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; });
    if (r0.every((a, i) => a.every((v, j) => Math.abs(v - r1[i][j]) < 0.6))) { report.rings++; continue; }
    st0 === null ? e.removeAttribute('style') : e.setAttribute('style', st0);
    report.ringsKept = (report.ringsKept || []).concat(e.tagName + '.' + e.className);
  }
  const pz = document.createElement('style'); let pzCss = ''; let pzId = 0;
  for (const e of document.body.querySelectorAll('*')) {
    if (e.closest('svg')) continue;
    for (const which of ['::before', '::after']) {
      const k = getComputedStyle(e, which);
      if (k.content === 'none' || !/repeating-linear-gradient\(90deg/.test(k.backgroundImage) || k.position !== 'absolute') continue;
      const stops = [...k.backgroundImage.matchAll(/(rgba?\([^)]*\)) (-?[\d.]+)px/g)].map(x => [x[1], parseFloat(x[2])]);
      const period = stops[stops.length - 1][1]; if (!period) continue;
      const W = parseFloat(k.width), H = parseFloat(k.height); if (!W || !H) continue;
      let rects = '';
      for (let x0 = 0; x0 < W; x0 += period) for (let i = 0; i + 1 < stops.length; i += 2) {
        const [c, a] = stops[i], b = stops[i + 1][1]; if (/rgba\([^)]*,\s*0\)/.test(c)) continue;
        const x = x0 + a, w = Math.min(b - a, W - x); if (w > 0) rects += `<rect x="${x}" y="0" width="${w}" height="${H}" fill="${c}"/>`;
      }
      const host = document.createElement('span'); const id = 'pz' + (pzId++);
      host.setAttribute('aria-hidden', 'true');
      host.style.cssText = `position:absolute;left:${k.left};top:${k.top};width:${W}px;height:${H}px;opacity:${k.opacity};display:block;pointer-events:none`;
      host.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="display:block;width:${W}px;height:${H}px">${rects}</svg>`;
      e.dataset.pz = id; pzCss += `[data-pz="${id}"]${which}{background:none!important}`;
      which === '::before' ? e.prepend(host) : e.append(host); report.dashes++;
    }
  }
  pz.textContent = pzCss; document.head.appendChild(pz);
  // 3) verify geometry unchanged
  for (const e of all) {
    const a = before.get(e), b = e.getBoundingClientRect();
    if (Math.abs(a.x - b.x) > 0.6 || Math.abs(a.y - b.y) > 0.6 || Math.abs(a.width - b.width) > 0.6 || Math.abs(a.height - b.height) > 0.6)
      report.moved.push(`${e.parentElement.tagName}.${e.parentElement.className}>${e.tagName}.${(e.className && e.className.baseVal === undefined ? e.className : '')}`.slice(0, 60) + ` dx=${(b.x - a.x).toFixed(1)} dy=${(b.y - a.y).toFixed(1)} dw=${(b.width - a.width).toFixed(1)} dh=${(b.height - a.height).toFixed(1)}`);
  }
  report.movedCount = report.moved.length; report.moved = report.moved.slice(0, 15);
  return report;
};
