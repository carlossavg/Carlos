const fs = require('fs'); const path = require('path');
const { engine, settings, shop, routes, product, variants, plan, productImgs, THEME, OUT } = require('./render.js');
(async () => {
  const item = { index: 0, key: 'k1', url: '/products/x', image: { src: productImgs[0], alt: '', aspect_ratio: 1 }, product: product, title: '2 Collars', variant: variants[1], quantity: 1,
    original_price: 3996, final_price: 3996, original_line_price: 3996, final_line_price: 3996, options_with_values: [{ name: 'Pack', value: '2 Collars' }],
    properties: [], selling_plan_allocation: { selling_plan: plan }, line_level_discount_allocations: [], instructions: { can_remove: true, can_update_quantity: true } };
  for (const [name, total] of [['cart-low', 3996], ['cart-free', 5995]]) {
    const cart = { item_count: 1, total_price: total, items: [Object.assign({}, item, { final_line_price: total, original_line_price: total })], cart_level_discount_applications: [], taxes_included: false, duties_included: false };
    const globals = { settings, shop, routes, cart, customer: null, template: { name: 'product' } };
    let html = await engine.parseAndRender("{% render 'cart-drawer' %}", globals, { globals });
    html = html.replace(/loading="lazy"/g, 'loading="eager"');
    const head = (await engine.parseAndRender(fs.readFileSync(path.join(THEME, 'snippets/pw-brand-head.liquid'), 'utf8'), globals, { globals })).replace(/<link[^>]+fonts\.(googleapis|gstatic)\.com[^>]*>/g, '');
    const page = `<!doctype html><html class="js"><head><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="file://${THEME}/assets/base.css"><link rel="stylesheet" href="file://${THEME}/assets/component-cart-drawer.css"><link rel="stylesheet" href="file://${THEME}/assets/component-cart.css"><link rel="stylesheet" href="file://${THEME}/assets/component-cart-items.css"><link rel="stylesheet" href="file://${THEME}/assets/component-totals.css"><link rel="stylesheet" href="file://${THEME}/assets/component-price.css">
<link rel="stylesheet" href="file://${__dirname}/out/fonts/fonts.css">
<style>:root{--font-body-family:Inter,sans-serif;--font-heading-family:Fraunces;--font-body-scale:1.1;--color-foreground:21,35,28;--color-background:255,255,255;--color-button:18,131,63;--color-button-text:255,255,255;--buttons-radius:14px;--drawer-border-width:0px;--drawer-shadow-opacity:.2;--drawer-shadow-blur-radius:40px;--inputs-radius:12px;--inputs-border-width:1px;--inputs-border-opacity:.35}html{font-size:68.75%}body{font-family:Inter;margin:0;background:#888} .drawer{visibility:visible!important} cart-drawer .drawer__inner{transform:none!important}</style>${head}</head>
<body><div class="color-scheme-2">${html.replace('class="drawer', 'class="drawer active')}</div></body></html>`;
    fs.writeFileSync(path.join(OUT, name + '.html'), page);
  }
  console.log('ok');
})();
