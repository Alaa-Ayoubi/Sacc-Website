// Loads this design system into the template. In a consuming project, point
// base at the bound DS folder relative to this file (e.g. '_ds/<folder>' at
// the project root, '../_ds/<folder>' one level down) — one line to edit.
(() => {
  const base = '_ds/sacc-design-system-90d3977d-426b-4a50-bdf7-eb86d5718d2b';
  for (const p of ["styles.css"]) {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = base + '/' + p;
    document.head.appendChild(l);
  }
  // Lucide is SACC's only icon set; the Icon component reads window.lucide.
  const icons = document.createElement('script');
  icons.src = 'https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js';
  document.head.appendChild(icons);
  const s = document.createElement('script');
  s.src = base + '/_ds_bundle.js';
  s.onerror = () => console.error('ds-base.js: failed to load ' + s.src + ' — if this is a consuming project, point the base line in ds-base.js at the bound _ds/<folder> tree relative to this page (e.g. _ds/<folder> at the project root, ../_ds/<folder> one level down); in a fresh design system this can just mean the bundle is not compiled yet');
  // The compiled bundle reads React's internals as it evaluates, so it must not
  // run before the host's React is on the window.
  const mountBundle = () => document.head.appendChild(s);
  if (window.React && window.React.version) mountBundle();
  else {
    let waited = 0;
    const t = setInterval(() => {
      waited += 30;
      if ((window.React && window.React.version) || waited > 5000) { clearInterval(t); mountBundle(); }
    }, 30);
  }
})();
