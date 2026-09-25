const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const [file, prefix, width, sliceH] = [process.argv[2], process.argv[3], +process.argv[4], +process.argv[5]];
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  page.on('console', (m) => { if (m.type() === 'error') console.log('console error:', m.text().slice(0, 200)); });
  page.on('pageerror', (e) => console.log('page error:', e.message));
  await page.goto('file://' + __dirname + '/out/' + file, { waitUntil: 'load' });
  await page.waitForTimeout(1200);
  await page.addStyleTag({ content: '.pw-reveal{opacity:1!important;transform:none!important} .pw-hero__bg img{animation:none!important}' });
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log('height', h);
  let n = 0;
  for (let y = 0; y < h; y += sliceH) {
    await page.screenshot({ path: `out/${prefix}-${String(n).padStart(2, '0')}.png`, clip: { x: 0, y, width, height: Math.min(sliceH, h - y) }, fullPage: true });
    n++;
  }
  await browser.close();
})();
