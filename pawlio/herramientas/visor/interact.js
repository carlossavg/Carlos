const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.on('pageerror', (e) => console.log('PAGE ERROR:', e.message));
  await page.goto('file://' + __dirname + '/out/product.html');
  await page.waitForTimeout(500);
  const state = async (label) => {
    const s = await page.evaluate(() => ({
      id: document.querySelector('form input[name=id]').value,
      plan: document.querySelector('form input[name=selling_plan]').value,
      planDisabled: document.querySelector('form input[name=selling_plan]').disabled,
      atc: document.querySelector('[data-pw-atc]').innerText.replace(/\s+/g, ' ').trim(),
      cards: [...document.querySelectorAll('[data-pw-card]')].map((c) => c.querySelector('.pw-bundle__title').innerText + ' ' + c.querySelector('[data-price]').innerText + ' | ' + c.querySelector('.pw-bundle__sub').innerText + (c.classList.contains('is-selected') ? ' ✔' : '')),
      disclosure: document.querySelector('[data-pw-disclosure]').innerText,
      sticky: document.querySelector('[data-pw-sticky]').classList.contains('is-visible'),
      stickyMeta: document.querySelector('[data-pw-sticky-meta]').innerText,
      price: document.querySelector('[data-pw-price]').innerText,
    }));
    console.log('--', label, JSON.stringify(s, null, 1));
  };
  await state('inicial');
  await page.click('text=3 Collars');
  await state('3 collars');
  await page.click('text=One-time purchase');
  await state('compra unica');
  await page.click('text=1 Collar');
  await page.click('text=Subscribe & Save >> nth=0');
  await state('1 collar + suscripcion');
  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(700);
  await state('scroll abajo');
  await page.screenshot({ path: 'out/sticky.png' });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(700);
  console.log('sticky al volver arriba:', await page.evaluate(() => document.querySelector('[data-pw-sticky]').classList.contains('is-visible')));
  await browser.close();
})();
