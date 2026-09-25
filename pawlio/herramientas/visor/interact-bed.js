const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch(); const page = await b.newPage({ viewport: { width: 390, height: 844 } });
  page.on('pageerror', (e) => console.log('PAGE ERROR:', e.message));
  await page.goto('file://' + __dirname + '/out/bed.html'); await page.waitForTimeout(400);
  const st = async (l) => console.log(l, JSON.stringify(await page.evaluate(() => ({
    id: document.querySelector('form input[name=id]').value,
    planDisabled: document.querySelector('form input[name=selling_plan]').disabled,
    atc: document.querySelector('[data-pw-atc]').innerText.replace(/\s+/g, ' ').trim(),
    purchaseBoxHidden: !document.querySelector('[data-pw-purchase-box]') || document.querySelector('[data-pw-purchase-box]').hidden,
    sticky: document.querySelector('[data-pw-sticky-meta]').innerText }))));
  await st('inicial');
  await page.click('text=Large (up to 80 lb)'); await page.click('text=Sage'); await st('large+sage');
  await b.close();
})();
