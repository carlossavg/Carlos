// Quita Puerto Rico de la tienda y pone la historia en estilo editorial.
import { readFileSync, writeFileSync } from 'node:fs';
const body = '<p>[brand] began with a simple belief: keeping your dog protected shouldn\'t mean greasy monthly drops, forgotten doses or a cabinet full of products.</p><p>So we made one quiet, everyday piece of protection — designed to be worn, not remembered. Less to think about, and more time for the walks, the naps and everything in between.</p>';
const editorial = { style: 'editorial', text: body, signature: 'The [brand] team', image_alt: 'Happy dog sitting on a sunny beach', heading_size: 40, body_size: 16 };
const edit = (file, fn) => { const p = 'templates/' + file; const j = JSON.parse(readFileSync(p, 'utf8')); fn(j.sections); writeFileSync(p, JSON.stringify(j, null, 2) + '\n'); };
for (const f of ['index.json', 'product.json']) edit(f, s => Object.assign(s.story.settings, editorial, { heading: 'Made for the life <em>you share with them.</em>' }));
edit('page.about.json', s => {
  Object.assign(s.hero.settings, { heading: 'Made for the life <em>you share with them.</em>', text: '[brand] started with one simple idea: protecting your dog should be easy, long-lasting and kind.' });
  Object.assign(s.mission.settings, editorial, { image_alt: 'Happy dog cuddling at home' });
});
const fg = 'sections/footer-group.json';
writeFileSync(fg, readFileSync(fg, 'utf8').replace(' Born in Puerto Rico.', ''));
const pf = 'sections/pw-footer.liquid';
writeFileSync(pf, readFileSync(pf, 'utf8').replace(' Born in Puerto Rico.', ''));
