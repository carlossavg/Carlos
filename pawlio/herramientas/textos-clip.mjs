// Pawlio · adapta los textos del tema al producto real (clip que se engancha al collar).
// Solo afirma lo que dice el proveedor: clip, cápsula de aceite esencial, "water resistant",
// "suitable for all breeds". Envío gratis en todos los pedidos. Uso: node textos-clip.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const TEMA = new URL('../tema/', import.meta.url);
const leer = (f) => JSON.parse(readFileSync(new URL(f, TEMA), 'utf8').replace(/^\/\*[\s\S]*?\*\/\s*/, ''));
const guardar = (f, j) => writeFileSync(new URL(f, TEMA), JSON.stringify(j, null, 2) + '\n');

// Cambios por tipo de sección → ajustes de la sección y de sus bloques (mismos ids en todas las plantillas)
const POR_TIPO = {
  'pw-hero': {
    eyebrow: 'Plant-powered flea & tick protection',
    text: 'One little clip on their collar helps keep fleas and ticks away — for months. No greasy drops, no pills, no reminders.',
    chips: '[days]-day money-back guarantee\nFree US shipping\nCancel subscriptions anytime',
  },
  'pw-trust-bar': { 'tr-1': { text: 'Free US shipping on every order' } },
  'pw-marquee': {
    items: 'Plant-powered\nA fresh one every [months] months\nWater-resistant\nFits every breed\nNo monthly drops\nNo pills\nNo prescription needed',
  },
  'pw-product': {
    'pw-1': { text: 'Helps repel fleas & ticks, day and night' },
    'pw-2': { text: 'Essential-oil formula — no drops, no sprays, no pills' },
    'pw-3': { text: 'Water-resistant: rain and splashes are no problem' },
    'pw-4': { text: 'Clips onto the collar your dog already wears', icon: 'paw' },
    'pw-6': { perks: '' },
    'pw-7': { perks: 'Lowest price per collar' },
    'pw-8': { content: '<p>A soft clip that slides onto your dog\'s everyday collar and holds a slow-release essential-oil capsule that helps repel fleas and ticks. Water-resistant, suitable for all breeds and made for everyday wear.</p><p>We recommend a fresh Pawlio every [months] months for steady protection.</p>' },
    'pw-9': { content: '<ol><li>Open the tin and take out your Pawlio clip.</li><li>Check that the essential-oil capsule sits inside the clip.</li><li>Slide the clip onto your dog\'s collar so it sits snugly.</li><li>Replace it every [months] months (subscribers get the next one automatically).</li></ol>' },
    'pw-11': { content: '<p>Orders are processed in 1–2 business days and usually arrive within 7–12 business days, with tracking. Shipping is free on every US order.</p><p>Every order is covered by our [days]-day Happy Dog Guarantee — email us and we\'ll make it right.</p>' },
    assurance_1: 'Free US shipping',
  },
  'pw-image-text': {
    // solo las secciones que lo necesitan (por id de sección, ver POR_SECCION)
  },
  'pw-steps': {
    'sp-1': { title: 'Open the tin', text: 'Take out your Pawlio clip — the essential-oil capsule sits right inside it.', icon: 'box' },
    'sp-2': { title: 'Clip it on', text: 'Slide it onto the collar your dog already wears. No buckles, no trimming.', icon: 'paw' },
    'sp-3': { title: 'Relax for months', text: 'Swap in a fresh one every [months] months. Subscribers get the next one right on time.' },
  },
  'pw-benefits': {
    'bn-1': { text: 'Made with essential oils — no drops, no sprays, no pills.' },
    'bn-2': { text: 'One fresh Pawlio every [months] months — far less to remember than monthly drops.' },
    'bn-3': { title: 'Water-resistant', text: 'Rainy walks and splashes are no problem.' },
    'bn-4': { text: 'Clips onto the collar they already wear — from chihuahuas to huskies.' },
    'bn-5': { title: 'Clips on in seconds', text: 'No buckles, no trimming. Slide it on and you\'re done.', icon: 'bolt' },
    'bn-6': { text: 'It sits on the collar, so nothing greasy touches fur, furniture or hands.' },
  },
  'pw-comparison': {
    'rw-3': { feature: 'Essential-oil based' },
    'rw-5': { feature: 'Water-resistant' },
  },
  'pw-faq': {
    'fq-1': { question: 'How long does one Pawlio last?', answer: '<p>The tin says up to 12 months, but essential oils fade faster with baths, rain and heat. For steady protection we recommend a fresh Pawlio every [months] months — or keep Subscribe &amp; Save on and we\'ll send the next one automatically.</p>' },
    'fq-2': { answer: '<p>Pawlio is made with essential oils and sits on your dog\'s collar, not on the skin. It\'s designed for everyday wear on dogs 12 weeks and older. Watch your dog for the first 48 hours and remove the clip if you notice any irritation. If your dog is pregnant, nursing, elderly or on medication, check with your vet first. <strong>For dogs only — never use on cats.</strong></p>' },
    'fq-3': { answer: '<p>Yes. Pawlio clips onto most everyday collars and is suitable for dogs of every size — from chihuahuas to huskies. No trimming needed.</p>' },
    'fq-4': { answer: '<p>Yes. Pawlio is water-resistant, so rainy walks and bath time are fine. Frequent swimming can make the essential oils fade sooner — another reason we recommend a fresh one every [months] months.</p>' },
  },
  'pw-cta': {
    text: 'Plant-powered. Water-resistant. Backed by our [days]-day guarantee.',
    chips: 'Free US shipping\nCancel anytime',
  },
};

// Secciones concretas por id
const POR_SECCION = {
  solution: {
    image_alt: 'Pawlio flea & tick clip',
    heading: 'One little clip. <em>Months of peace of mind.</em>',
    text: '<p>Pawlio slides onto the collar your dog already wears. Inside, a slow-release essential-oil capsule helps keep fleas and ticks away — day and night. No greasy drops to remember. No pills to hide in their food.</p>',
    bullets: 'Clips on in seconds\nWorks around the clock\nNo prescription needed',
    float_text: 'of protection per clip',
  },
  lifestyle: {
    bullets: 'Cuddle-friendly — nothing greasy on their fur\nSits on the collar, not on the skin\nComfortable for all-day, all-night wear',
  },
  adventure: {
    bullets: 'Water-resistant for rainy walks and splashes\nLightweight and flexible\nSuitable for all breeds',
  },
  mission: {
    bullets: 'Plant-powered protection\nMonths of protection, not weeks\nReal humans behind every order',
  },
};

const aplicar = (s, cambios) => {
  for (const [k, v] of Object.entries(cambios)) {
    if (v && typeof v === 'object') {
      if (s.blocks && s.blocks[k]) Object.assign(s.blocks[k].settings, v);
    } else if (k in (s.settings || {}) || typeof v === 'string') {
      s.settings[k] = v;
    }
  }
};

for (const f of ['templates/index.json', 'templates/product.json', 'templates/page.about.json', 'templates/page.faq.json']) {
  const j = leer(f);
  for (const [id, s] of Object.entries(j.sections)) {
    if (POR_TIPO[s.type]) aplicar(s, POR_TIPO[s.type]);
    if (POR_SECCION[id]) aplicar(s, POR_SECCION[id]);
    if (s.type === 'pw-hero' && f.endsWith('page.about.json')) s.settings.button_label = 'Shop Pawlio';
  }
  guardar(f, j);
}

// Barra de anuncios
const hg = leer('sections/header-group.json');
const ab = hg.sections['announcement-bar'].blocks;
ab['announcement-1'].settings.text = 'Free US shipping on every order';
ab['announcement-3'].settings.text = 'Subscribe & save 20% — skip or cancel anytime';
guardar('sections/header-group.json', hg);

// Carrito: el envío es gratis siempre → la barra sale ya completa con el mensaje de éxito
const sd = leer('config/settings_data.json');
sd.current.pw_free_shipping_threshold = 1;
sd.current.pw_ship_success = 'Free US shipping is included';
guardar('config/settings_data.json', sd);

console.log('textos actualizados');
