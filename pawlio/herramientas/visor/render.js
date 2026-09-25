// Visor local del tema Pawlio: renderiza las secciones con datos de prueba.
const { Liquid, Tag, Hash } = require('liquidjs');
const fs = require('fs');
const path = require('path');

const THEME = path.join(__dirname, '..', '..', 'tema');
const OUT = path.join(__dirname, 'out');
fs.mkdirSync(OUT, { recursive: true });

function schemaOf(src) {
  const m = src.match(/\{%-?\s*schema\s*-?%\}([\s\S]*?)\{%-?\s*endschema\s*-?%\}/);
  return m ? JSON.parse(m[1]) : {};
}
function defaults(settings) {
  const o = {};
  for (const s of settings || []) if (s.id) o[s.id] = s.default !== undefined ? s.default : (s.type === 'checkbox' ? false : null);
  return o;
}

// ---------- ajustes globales ----------
const schema = JSON.parse(fs.readFileSync(path.join(THEME, 'config/settings_schema.json'), 'utf8'));
const settings = {};
for (const g of schema) Object.assign(settings, defaults(g.settings));
Object.assign(settings, JSON.parse(fs.readFileSync(path.join(THEME, 'config/settings_data.json'), 'utf8')).current);
settings.type_body_font = { family: 'Inter', fallback_families: 'system-ui, sans-serif' };
settings.type_header_font = { family: 'Inter', fallback_families: 'system-ui, sans-serif' };
settings.pw_featured_product = null;
settings.favicon = null;

// ---------- imágenes de relleno locales ----------
const PH = path.join(OUT, 'ph');
fs.mkdirSync(PH, { recursive: true });
function ph(name, w, h, c1, c2, label) {
  const f = path.join(PH, name + '.svg');
  fs.writeFileSync(f, `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><text x="50%" y="50%" font-family="sans-serif" font-size="${Math.round(w / 18)}" fill="rgba(255,255,255,.85)" text-anchor="middle">${label}</text></svg>`);
  return 'file://' + f;
}
const IMGMAP = {
  '03c42843': ph('hero', 1600, 900, '#c9a15b', '#4f7a3a', 'HERO · golden retriever'),
  'afc09ba9': ph('problem', 900, 1200, '#b9a58c', '#6b5a48', 'PROBLEM · itchy dog'),
  '081c1502': ph('lifestyle', 900, 1120, '#e2cdb0', '#9a7b5c', 'LIFESTYLE · cuddles'),
  '0c639f2e': ph('adventure', 900, 1200, '#6f9b58', '#2f5a36', 'ADVENTURE · trail'),
  'dcf582f5': ph('story', 900, 1120, '#e8c07a', '#2d8aa0', 'STORY · PR beach'),
  'cc7da924': ph('portrait', 900, 1200, '#efe3cf', '#c9b08a', 'PORTRAIT · beagle'),
  '90158d9d': ph('lab', 800, 800, '#8a6a45', '#3b3024', 'Lab'),
  '07c262e2': ph('chi', 800, 800, '#d9c3a5', '#9c7f5f', 'Chihuahua'),
  '41d38098': ph('pit', 800, 800, '#7aa36a', '#46663c', 'Pit bull'),
  '92286780': ph('doodle', 800, 800, '#f0dfc0', '#80b6c9', 'Doodle'),
};
const productImgs = [1, 2, 3, 4].map((i) => ph('product' + i, 1000, 1000, ['#f4efe6', '#e8f3ea', '#efe7da', '#e3efe6'][i - 1], ['#d8cbb3', '#9fd1b0', '#c7b597', '#a6cfb4'][i - 1], 'PRODUCT PHOTO ' + i));

// ---------- producto de prueba ----------
const plan = { id: 9001, name: 'Delivery every 4 months, 20% off', price_adjustments: [{ value_type: 'percentage', value: 20, position: 1 }] };
function variant(id, name, price) {
  return { id, title: name, options: [name], option1: name, available: true, price, compare_at_price: null, featured_media: null,
    selling_plan_allocations: [{ selling_plan: plan, price: Math.round(price * 0.8), compare_at_price: price }] };
}
const variants = [variant(101, '1 Collar', 3295), variant(102, '2 Collars', 4995), variant(103, '3 Collars', 5995)];
const media = productImgs.map((src, i) => ({ id: 500 + i, media_type: 'image', alt: 'Pawlio collar', src, preview_image: { src, alt: '' } }));
const product = {
  id: 1, title: 'Pawlio Flea & Tick Collar', handle: 'pawlio-flea-tick-collar', url: '/products/pawlio-flea-tick-collar',
  description: '<p>A slow-release, plant-powered collar that helps keep fleas and ticks away for months.</p>',
  has_only_default_variant: false, options: ['Pack'],
  options_with_values: [{ name: 'Pack', position: 1, values: variants.map((v) => ({ name: v.title })) }],
  variants, selected_variant: null, selected_or_first_available_variant: variants[0],
  selling_plan_groups: [{ name: 'Subscribe & save', selling_plans: [plan] }], selected_selling_plan: null, requires_selling_plan: false,
  media, featured_media: media[0], featured_image: { src: productImgs[0], alt: '' }, metafields: { reviews: {} },
};

const shop = {
  name: 'Pawlio', email: 'hello@pawlio.com', money_format: '${{amount}}', enabled_payment_types: ['visa', 'master', 'american_express', 'apple_pay', 'google_pay', 'shopify_pay', 'paypal'],
  policies: [{ title: 'Refund policy', url: '/policies/refund-policy' }, { title: 'Privacy policy', url: '/policies/privacy-policy' }, { title: 'Terms of service', url: '/policies/terms-of-service' }, { title: 'Shipping policy', url: '/policies/shipping-policy' }],
  shipping_policy: { url: '/policies/shipping-policy', body: 'x' }, refund_policy: { url: '/policies/refund-policy', body: 'x' },
};
const routes = { root_url: '/', account_url: '/account', all_products_collection_url: '/collections/all', cart_url: '/cart', cart_add_url: '/cart/add' };

// ---------- motor ----------
const engine = new Liquid({ root: [path.join(THEME, 'snippets')], extname: '.liquid', strictFilters: false, strictVariables: false });

class SkipTag extends Tag {
  constructor(token, remain, liquid) { super(token, remain, liquid); while (remain.length) { const t = remain.shift(); if (t.name === 'end' + token.name) break; } }
  * render() {}
}
engine.registerTag('schema', SkipTag);
engine.registerTag('javascript', SkipTag);
engine.registerTag('stylesheet', SkipTag);

class BlockTag extends Tag {
  constructor(token, remain, liquid) {
    super(token, remain, liquid);
    this.args = token.args;
    this.tpls = [];
    const stream = liquid.parser.parseStream(remain).on('tag:end' + token.name, () => stream.stop()).on('template', (t) => this.tpls.push(t)).on('end', () => { throw new Error('tag ' + token.name + ' not closed'); });
    stream.start();
  }
  * render(ctx, emitter) {
    const html = yield this.liquid.renderer.renderTemplates(this.tpls, ctx);
    if (this.name === 'style') emitter.write('<style>' + html + '</style>');
    else {
      const id = (this.args.match(/id:\s*'([^']+)'/) || [])[1] || '';
      emitter.write(`<form method="post" action="/cart/add" data-form-id="${id}">` + html + '</form>');
    }
  }
}
engine.registerTag('style', BlockTag);
engine.registerTag('form', BlockTag);

const kw = (args) => { const o = {}; for (const a of args) if (Array.isArray(a)) o[a[0]] = a[1]; return o; };
const srcOf = (x) => (x && typeof x === 'object' ? x.src || (x.preview_image && x.preview_image.src) || '' : String(x || ''));
engine.registerFilter('asset_url', (n) => 'file://' + path.join(THEME, 'assets', n));
engine.registerFilter('stylesheet_tag', (u) => `<link rel="stylesheet" href="${u}">`);
engine.registerFilter('image_url', (x) => srcOf(x));
engine.registerFilter('image_tag', (src, ...args) => { const o = kw(args); const attrs = Object.entries(o).filter(([k]) => !['widths', 'preload'].includes(k)).map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`).join(' '); return `<img src="${src}" ${attrs}>`; });
engine.registerFilter('placeholder_svg_tag', (n, cls) => `<svg class="${cls || ''}" viewBox="0 0 525 525" preserveAspectRatio="xMidYMid slice"><rect width="525" height="525" fill="#e9e2d3"/></svg>`);
engine.registerFilter('money', (c) => '$' + (Number(c || 0) / 100).toFixed(2));
engine.registerFilter('t', (k) => k);
engine.registerFilter('payment_type_svg_tag', (t) => `<svg viewBox="0 0 38 24" width="38" height="24"><rect width="38" height="24" rx="3" fill="#fff" stroke="#ddd"/><text x="19" y="15" font-size="7" text-anchor="middle" font-family="sans-serif" fill="#333">${t.slice(0, 5)}</text></svg>`);
engine.registerFilter('inline_asset_content', (n) => { try { return fs.readFileSync(path.join(THEME, 'assets', n), 'utf8'); } catch (e) { return ''; } });
engine.registerFilter('standard_event_data', () => '{}');
engine.registerFilter('structured_data', () => '{}');
engine.registerFilter('video_tag', () => '');
engine.registerFilter('external_video_tag', () => '');
engine.registerFilter('payment_button', () => '');
engine.registerFilter('handle', (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
engine.registerFilter('divided_by', (a, b) => (Number.isInteger(Number(a)) && Number.isInteger(Number(b)) ? Math.floor(Number(a) / Number(b)) : Number(a) / Number(b)));
engine.registerFilter('color_brightness', () => 200);

function sectionObj(id, type, data, index) {
  const src = fs.readFileSync(path.join(THEME, 'sections', type + '.liquid'), 'utf8');
  const sc = schemaOf(src);
  const s = Object.assign(defaults(sc.settings), data.settings || {});
  const blocks = (data.block_order || Object.keys(data.blocks || {})).map((bid) => {
    const b = data.blocks[bid];
    const bs = (sc.blocks || []).find((x) => x.type === b.type) || {};
    return { id: bid, type: b.type, settings: Object.assign(defaults(bs.settings), b.settings || {}), shopify_attributes: '' };
  });
  return { src: src.replace(/\{%-?\s*schema\s*-?%\}[\s\S]*?\{%-?\s*endschema\s*-?%\}/, ''), section: { id, settings: s, blocks, index } };
}

async function renderPage(templateFile, templateName, outName) {
  const tpl = JSON.parse(fs.readFileSync(path.join(THEME, 'templates', templateFile), 'utf8'));
  const globals = { settings, shop, routes, template: { name: templateName }, product: templateName === 'product' ? product : null,
    collections: { all: { products: [product] } }, cart: { item_count: 0, total_price: 0, items: [] }, request: { page_type: templateName } };
  let body = '';
  let i = 0;
  for (const id of tpl.order) {
    const d = tpl.sections[id];
    if (d.disabled) continue;
    i++;
    const { src, section } = sectionObj(id, d.type, d, i);
    try {
      const html = await engine.parseAndRender(src, Object.assign({}, globals, { section }), { globals: Object.assign({}, globals, { section }) });
      body += `<div id="shopify-section-${id}" class="shopify-section">${html}</div>\n`;
    } catch (e) {
      body += `<pre style="color:red">${d.type}: ${e.message}</pre>`;
      console.error('ERROR in', d.type, e.message);
    }
  }
  // footer
  const fg = JSON.parse(fs.readFileSync(path.join(THEME, 'sections/footer-group.json'), 'utf8'));
  for (const id of fg.order) {
    const { src, section } = sectionObj(id, fg.sections[id].type, fg.sections[id], 99);
    const html = await engine.parseAndRender(src, Object.assign({}, globals, { section }), { globals: Object.assign({}, globals, { section }) });
    body += `<div id="shopify-section-${id}" class="shopify-section">${html}</div>\n`;
  }
  const head = (await engine.parseAndRender(fs.readFileSync(path.join(THEME, 'snippets/pw-brand-head.liquid'), 'utf8'), globals, { globals })).replace(/<link[^>]+fonts\.(googleapis|gstatic)\.com[^>]*>/g, '');
  const logo = await engine.parseAndRender("{% render 'pw-logo' %}", globals, { globals });
  const html = `<!doctype html><html class="js" lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="file://${THEME}/assets/base.css">
<style>:root{--font-body-family:Inter,system-ui,sans-serif;--font-heading-family:Inter;--font-body-scale:1.1;--color-foreground:21,35,28;--color-background:250,246,238;--page-width:120rem}
body{font-family:Inter,system-ui,sans-serif;background:#FAF6EE;margin:0} html{font-size:68.75%}
.mock-ann{background:#0E3B2E;color:#FAF6EE;text-align:center;font:600 13px/1 Inter;letter-spacing:.04em;padding:11px}
.mock-head{display:flex;justify-content:space-between;align-items:center;padding:12px 20px;background:#FAF6EE;position:sticky;top:0;z-index:10;border-bottom:1px solid rgba(0,0,0,.06)}</style>
<link rel="stylesheet" href="file://${__dirname}/out/fonts/fonts.css">
${head}</head><body>
<div class="mock-ann">FREE shipping on 2+ collars</div><header class="mock-head"><span>☰</span><a href="/" style="text-decoration:none">${logo}</a><span>🛒</span></header>
<main>${body}</main></body></html>`;
  const finalHtml = html.replace(/loading="lazy"/g, "loading=\"eager\"").replace(/https:\/\/d8j0ntlcm91z4\.cloudfront\.net\/[^"'\s)]*?hf_\d+_\d+_([0-9a-f]{8})[^"'\s)]*/g, (m, id) => IMGMAP[id] || m);
  fs.writeFileSync(path.join(OUT, outName), finalHtml);
  console.log('wrote', outName);
}

module.exports = { engine, settings, shop, routes, product, variants, plan, productImgs, THEME, OUT };
if (require.main === module) (async () => {
  await renderPage('product.json', 'product', 'product.html');
  await renderPage('index.json', 'index', 'index.html');
})();
