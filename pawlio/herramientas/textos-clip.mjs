// Pawlio · adapta los textos del tema al producto real (clip que se engancha al collar).
// Solo afirma lo que dice el proveedor: clip, cápsula de aceite esencial, "water resistant",
// "suitable for all breeds". Envío gratis en todos los pedidos (tarifa de CJ).
//
// Busca cada frase por su CONTENIDO, no por el id del bloque: sirve igual después de regenerar
// las plantillas con gen_templates.py (que cambia los ids). Uso: node textos-clip.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const TEMA = new URL('../tema/', import.meta.url);
const leer = (f) => JSON.parse(readFileSync(new URL(f, TEMA), 'utf8').replace(/^\/\*[\s\S]*?\*\/\s*/, ''));
const guardar = (f, j) => writeFileSync(new URL(f, TEMA), JSON.stringify(j, null, 2) + '\n');

// Frase antigua exacta → frase nueva
const EXACTAS = {
  // Portada
  'Plant-powered flea & tick collar': 'Plant-powered flea & tick protection',
  'One clip-on collar helps keep fleas and ticks away for up to [months] months. No greasy drops, no pills, no reminders.':
    'One little clip on their collar helps keep fleas and ticks away — for months. No greasy drops, no pills, no reminders.',
  '[days]-day money-back guarantee\nFree shipping on 2+ collars\nCancel subscriptions anytime':
    '[days]-day money-back guarantee\nFree US shipping\nCancel subscriptions anytime',

  // Envío: es gratis siempre
  'Free shipping on 2+ collars': 'Free US shipping on every order',
  'Free shipping on orders over $45': 'Free US shipping on every order',
  'FREE shipping on orders over $45': 'Free US shipping on every order',
  'Free shipping over $45': 'Free US shipping',
  'Free shipping on 2+\nCancel anytime': 'Free US shipping\nCancel anytime',
  '<p>Yes — shipping is free on every order over $45. Orders under $45 ship for a flat $4.95.</p>':
    '<p>Yes — shipping is free on every US order.</p>',

  // Caja de compra: viñetas
  'Helps repel fleas & ticks for up to [months] months': 'Helps repel fleas & ticks, day and night',
  'Plant-powered formula — no harsh chemicals': 'Essential-oil formula — no drops, no sprays, no pills',
  'Waterproof: keeps working through baths, swims & rain': 'Water-resistant: rain and splashes are no problem',
  'One size fits all breeds — adjustable & cut-to-fit': 'Clips onto the collar your dog already wears',

  // Caja de compra: pestañas
  '<p>A slow-release, plant-powered collar that helps keep fleas and ticks away from your dog for up to [months] months. Waterproof, adjustable and made for everyday wear.</p>':
    '<p>A soft clip that slides onto your dog\'s everyday collar and holds a slow-release essential-oil capsule that helps repel fleas and ticks. Water-resistant, suitable for all breeds and made for everyday wear.</p><p>We recommend a fresh Pawlio every [months] months for steady protection.</p>',
  '<ol><li>Open the pouch and gently stretch the collar to activate it.</li><li>Fasten it around your dog\'s neck — two fingers should slide underneath.</li><li>Trim the extra length and throw the scraps away, out of reach of pets and kids.</li><li>Replace it every [months] months (subscribers get the next one automatically).</li></ol>':
    '<ol><li>Open the tin and take out your Pawlio clip.</li><li>Check that the essential-oil capsule sits inside the clip.</li><li>Slide the clip onto your dog\'s collar so it sits snugly.</li><li>Replace it every [months] months (subscribers get the next one automatically).</li></ol>',
  '<p>Orders are processed in 1–2 business days and usually arrive in 7–12 business days, with tracking. Free shipping on orders over $45.</p><p>Every order is covered by our [days]-day Happy Dog Guarantee — email us and we\'ll make it right.</p>':
    '<p>Orders are processed in 1–2 business days and usually arrive within 7–12 business days, with tracking. Shipping is free on every US order.</p><p>Every order is covered by our [days]-day Happy Dog Guarantee — email us and we\'ll make it right.</p>',
  '<p>Orders are processed in 1–2 business days and usually arrive in 7–12 business days, with tracking. Free shipping on orders of 2+ collars.</p><p>Every order is covered by our [days]-day Happy Dog Guarantee — email us and we\'ll make it right.</p>':
    '<p>Orders are processed in 1–2 business days and usually arrive within 7–12 business days, with tracking. Shipping is free on every US order.</p><p>Every order is covered by our [days]-day Happy Dog Guarantee — email us and we\'ll make it right.</p>',

  // Cinta
  'Plant-powered\nUp to [months] months per collar\nWaterproof\nFits every breed\nNo monthly drops\nNo pills\nNo prescription needed':
    'Plant-powered\nA fresh one every [months] months\nWater-resistant\nFits every breed\nNo monthly drops\nNo pills\nNo prescription needed',

  // Cómo funciona
  'Unpack & stretch': 'Open the tin',
  'Take the collar out of the pouch and give it a gentle stretch to activate the plant-oil blend.':
    'Take out your Pawlio clip — the essential-oil capsule sits right inside it.',
  'Fit & trim': 'Clip it on',
  'Buckle it on so two fingers slide underneath, then snip off the extra length.':
    'Slide it onto the collar your dog already wears. No buckles, no trimming.',
  'Your dog is covered for up to [months] months. Subscribers get the next collar right on time.':
    'Swap in a fresh one every [months] months. Subscribers get the next one right on time.',

  // Beneficios
  'Made with plant-derived essential oils instead of harsh synthetic chemicals.': 'Made with essential oils — no drops, no sprays, no pills.',
  'Up to [months] months per collar — far fewer things to remember than monthly drops.':
    'One fresh Pawlio every [months] months — far less to remember than monthly drops.',
  'Waterproof': 'Water-resistant',
  'Baths, beach days and rainy walks don\'t slow it down.': 'Rainy walks and splashes are no problem.',
  'Adjustable and cut-to-fit, from chihuahuas to great danes.': 'Clips onto the collar they already wear — from chihuahuas to huskies.',
  'Light, fresh scent': 'Clips on in seconds',
  'A gentle plant scent — not a chemical cloud.': 'No buckles, no trimming. Slide it on and you\'re done.',
  'No greasy residue on fur, furniture or hands.': 'It sits on the collar, so nothing greasy touches fur, furniture or hands.',

  // Comparación
  'Plant-powered formula': 'Essential-oil based',

  // Imagen y texto
  'One collar. <em>Months of peace of mind.</em>': 'One little clip. <em>Months of peace of mind.</em>',
  '<p>Pawlio\'s slow-release collar surrounds your dog with plant-powered protection that helps keep fleas and ticks away — day and night, rain or shine. No greasy drops to remember. No pills to hide in their food.</p>':
    '<p>Pawlio slides onto the collar your dog already wears. Inside, a slow-release essential-oil capsule helps keep fleas and ticks away — day and night. No greasy drops to remember. No pills to hide in their food.</p>',
  'Clips on in 10 seconds\nWorks around the clock, rain or shine\nNo prescription needed': 'Clips on in seconds\nWorks around the clock\nNo prescription needed',
  'of protection per collar': 'of protection per clip',
  'Pawlio flea & tick collar': 'Pawlio flea & tick clip',
  'Cuddle-friendly — no greasy residue\nLight, fresh plant scent\nComfortable for all-day, all-night wear':
    'Cuddle-friendly — nothing greasy on their fur\nSits on the collar, not on the skin\nComfortable for all-day, all-night wear',
  'Waterproof for swims and rainy walks\nLightweight and flexible\nOne size fits all breeds':
    'Water-resistant for rainy walks and splashes\nLightweight and flexible\nSuitable for all breeds',
  'Plant-powered protection\nMonths per collar, not weeks\nReal humans behind every order':
    'Plant-powered protection\nMonths of protection, not weeks\nReal humans behind every order',

  // FAQ
  'How long does one collar last?': 'How long does one Pawlio last?',
  '<p>Each collar provides up to [months] months of protection. For nonstop coverage, replace it every [months] months — or keep Subscribe &amp; Save on and we\'ll send the next one automatically.</p>':
    '<p>The tin says up to 12 months, but essential oils fade faster with baths, rain and heat. For steady protection we recommend a fresh Pawlio every [months] months — or keep Subscribe &amp; Save on and we\'ll send the next one automatically.</p>',
  '<p>Pawlio is made with plant-derived essential oils and designed for everyday wear on dogs 12 weeks and older. Watch your dog for the first 48 hours and remove the collar if you notice any irritation. If your dog is pregnant, nursing, elderly or on medication, check with your vet first. <strong>For dogs only — never use on cats.</strong></p>':
    '<p>Pawlio is made with essential oils and sits on your dog\'s collar, not on the skin. It\'s designed for everyday wear on dogs 12 weeks and older. Watch your dog for the first 48 hours and remove the clip if you notice any irritation. If your dog is pregnant, nursing, elderly or on medication, check with your vet first. <strong>For dogs only — never use on cats.</strong></p>',
  '<p>Yes. It\'s one size, adjustable and cut-to-fit for every breed. Fasten it so two fingers slide underneath, then trim the excess.</p>':
    '<p>Yes. Pawlio clips onto most everyday collars and is suitable for dogs of every size — from chihuahuas to huskies. No trimming needed.</p>',
  '<p>Absolutely. Pawlio is waterproof, so baths, swims and rainy walks are no problem.</p>':
    '<p>Yes. Pawlio is water-resistant, so rainy walks and bath time are fine. Frequent swimming can make the essential oils fade sooner — another reason we recommend a fresh one every [months] months.</p>',

  // Llamado final
  'Plant-powered. Waterproof. Backed by our [days]-day guarantee.': 'Plant-powered. Water-resistant. Backed by our [days]-day guarantee.',
  'Pair it with the [brand] flea & tick collar — plant-powered, waterproof and backed by our [days]-day guarantee.':
    'Pair it with the [brand] flea & tick clip — plant-powered, water-resistant and backed by our [days]-day guarantee.',

  // Barra de anuncios
  'Subscribe & save — skip or cancel anytime': 'Subscribe & save 20% — skip or cancel anytime',
};

// Iconos que acompañan a una frase nueva
const ICONOS = {
  'Clips onto the collar your dog already wears': 'paw',
  'Open the tin': 'box',
  'Clip it on': 'paw',
  'Clips on in seconds': 'bolt',
};

// Ventajas de las tarjetas de pack (por valor de la opción)
const PERKS = { '2 Collars': '', '3 Collars': 'Lowest price per collar' };

let cambios = 0;
const repasar = (settings) => {
  if (!settings) return;
  for (const [k, v] of Object.entries(settings)) {
    if (typeof v === 'string' && Object.hasOwn(EXACTAS, v)) {
      settings[k] = EXACTAS[v];
      cambios++;
      if (ICONOS[settings[k]] && 'icon' in settings) settings.icon = ICONOS[settings[k]];
    }
  }
};

for (const f of ['templates/index.json', 'templates/product.json', 'templates/page.about.json', 'templates/page.faq.json', 'sections/header-group.json', 'sections/footer-group.json']) {
  const j = leer(f);
  for (const s of Object.values(j.sections)) {
    repasar(s.settings);
    for (const b of Object.values(s.blocks || {})) {
      repasar(b.settings);
      if (b.type === 'bundle' && Object.hasOwn(PERKS, b.settings.option_value) && b.settings.perks !== PERKS[b.settings.option_value]) {
        b.settings.perks = PERKS[b.settings.option_value];
        cambios++;
      }
    }
  }
  guardar(f, j);
}

// Carrito: el envío es gratis siempre → la barra sale ya completa con el mensaje de éxito
const sd = leer('config/settings_data.json');
sd.current.pw_free_shipping_threshold = 1;
sd.current.pw_ship_success = 'Free US shipping is included';
guardar('config/settings_data.json', sd);

console.log(`textos actualizados: ${cambios} cambios`);
