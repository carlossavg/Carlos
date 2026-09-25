const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  for (const n of ['cart-low', 'cart-free']) { await p.goto('file://' + __dirname + '/out/' + n + '.html'); await p.waitForTimeout(400); await p.screenshot({ path: 'out/' + n + '.png' }); }
  await b.close(); })();
