// Screenshots the live prototype and each snapshot at the same width, for verify.py.
// Usage: node verify.js <prototype index.html> <snapshots dir> <screenshots out dir>
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const [src, snaps, shots] = process.argv.slice(2);
  fs.mkdirSync(shots, { recursive: true });
  const P = ['', 'about', 'services', 'projects', 'equipment', 'certifications', 'journey', 'leadership', 'contact', 'careers'];
  const b = await chromium.launch();
  for (const [lang, w] of [['ar', 1440], ['ar', 390], ['en', 1440], ['en', 390]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    for (const pg of P) {
      const route = lang === 'en' ? ('en' + (pg ? '/' + pg : '')) : pg;
      const name = (route || 'home').replace(/\//g, '_') + '-' + w;
      const file = path.join(snaps, `${lang}-${w}`, name + '.html');
      if (!fs.existsSync(file)) continue;
      for (const [url, tag] of [['file://' + src + '#/' + route, 'a'], ['file://' + file, 'b']]) {
        const p = await ctx.newPage(); await p.goto(url); await p.waitForTimeout(400);
        await p.evaluate(() => document.fonts.ready);
        await p.screenshot({ path: path.join(shots, `${name}-${tag}.png`), fullPage: true }); await p.close();
      }
    }
    await ctx.close();
  }
  await b.close();
})();
