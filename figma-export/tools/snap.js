const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const [src, out, width, ...routes] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: +width, height: 900 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  for (const r of routes) {
    await p.goto('file://' + src + '#/' + r);
    await p.waitForTimeout(400);
    await p.evaluate(() => document.fonts.ready);
    await p.addScriptTag({ path: require('path').join(__dirname, 'prep.js') });
    const rep = await p.evaluate(() => window.__prep());
    console.error(JSON.stringify(rep));
    const html = await p.evaluate(async () => {
      const toData = (url) => new Promise((res) => {
        fetch(url).then(r => r.blob()).then(bl => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(bl); }).catch(() => res(null));
      });
      const ext = [];
      for (const img of document.querySelectorAll('img')) {
        const s = img.getAttribute('src') || '';
        if (s.startsWith('data:')) continue;
        if (/^https?:/.test(s)) { ext.push(s); continue; }
        const d = await toData(img.src); if (d) img.setAttribute('src', d);
        img.removeAttribute('srcset'); img.removeAttribute('loading');
      }
      // inline-style background-image urls
      for (const el of document.querySelectorAll('[style*="url("]')) {
        const m = el.getAttribute('style').match(/url\(["']?([^"')]+)["']?\)/);
        if (m && !m[1].startsWith('data:') && !/^https?:/.test(m[1])) { const d = await toData(new URL(m[1], location.href).href); if (d) el.setAttribute('style', el.getAttribute('style').replace(m[1], d)); }
        else if (m && /^https?:/.test(m[1])) ext.push(m[1]);
      }
      document.querySelectorAll('script').forEach(s => s.remove());
      const W = innerWidth;
      const vw = (t) => t.replace(/(-?\d*\.?\d+)vw\b/g, (_, n) => (parseFloat(n) * W / 100).toFixed(2) + 'px');
      const ser = (rules) => [...rules].map(r => {
        if (r instanceof CSSMediaRule) return matchMedia(r.media.mediaText).matches ? ser(r.cssRules) : '';
        if (r instanceof CSSFontFaceRule) return r.cssText;
        return vw(r.cssText);
      }).join('\n');
      for (const st of document.querySelectorAll('style')) st.textContent = ser(st.sheet.cssRules);
      for (const el of document.querySelectorAll('[style*="vw"]')) el.setAttribute('style', vw(el.getAttribute('style')));
      const fix = document.createElement('style');
      fix.textContent = `html{width:${W}px;min-width:${W}px;max-width:${W}px;overflow-x:hidden}body{width:${W}px;margin:0}`;
      document.head.appendChild(fix);
      const mv = document.querySelector('meta[name=viewport]'); if (mv) mv.setAttribute('content', `width=${W}, initial-scale=1`);
      window.__ext = ext;
      return '<!doctype html>\n' + document.documentElement.outerHTML;
    });
    const ext = await p.evaluate(() => window.__ext);
    const name = (r || 'home').replace(/\//g, '_') + `-${width}.html`;
    fs.writeFileSync(path.join(out, name), html);
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    console.log(name, (html.length/1024|0)+'KB', 'h='+h, 'ext='+ext.length);
  }
  await b.close();
})();
