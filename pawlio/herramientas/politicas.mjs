// Pawlio · escribe las políticas de la tienda (Settings → Policies) por la API.
// Uso: node politicas.mjs  (necesita herramientas/admin/gql.mjs y `shopify store auth` hecho)
import { gql } from './admin/gql.mjs';

const EMAIL = 'contact.pawlio@gmail.com';
const mail = `<a href="mailto:${EMAIL}">${EMAIL}</a>`;

const POLITICAS = {
  REFUND_POLICY: `<h3>The Happy Dog Guarantee — 60 days</h3>
<p>We want you and your dog to love Pawlio. If you're not completely happy, email us at ${mail} within 60 days of delivery and we'll refund your purchase. No need to send the product back.</p>
<h4>How to request a refund</h4>
<ol><li>Email us with your order number.</li><li>Tell us briefly what didn't work for you (it helps us improve).</li><li>We'll process your refund to the original payment method within 5 business days. Your bank may take a few more days to show it.</li></ol>
<h4>Subscriptions</h4>
<p>The guarantee covers your first subscription order. You can cancel future deliveries anytime from your account — see our Subscription Policy.</p>
<h4>Damaged or wrong items</h4>
<p>If your order arrives damaged or incorrect, email us a photo within 14 days of delivery and we'll send a replacement at no cost.</p>`,

  SHIPPING_POLICY: `<p><strong>Processing time:</strong> Orders are processed within 1–2 business days (Monday to Friday, excluding holidays).</p>
<p><strong>Delivery time:</strong> Most orders arrive within 7–12 business days of purchase. You'll receive a tracking link by email as soon as your order ships.</p>
<p><strong>Shipping cost:</strong> Shipping is free on every order to the United States.</p>
<p><strong>Where we ship:</strong> United States.</p>
<p><strong>Lost or delayed packages:</strong> If your tracking hasn't updated in 10 business days, or your package hasn't arrived within 20 business days, email us at ${mail} and we'll make it right with a replacement or a refund.</p>`,

  SUBSCRIPTION_POLICY: `<h4>How Subscribe &amp; Save works</h4>
<p>When you choose Subscribe &amp; Save, you pay the discounted subscription price today and authorize us to charge the same discounted price, plus any applicable taxes, on each future delivery at the frequency shown at checkout (every 4 months). Your subscription renews automatically until you cancel.</p>
<p><strong>Price:</strong> Subscribers save 20% on every delivery. The subscriber price is shown on the product page and at checkout before you pay. If the price ever changes, we'll email you at least 14 days before your next charge.</p>
<h4>Skip, pause or cancel anytime</h4>
<ul><li>Log in to your account (the person icon at the top of our site) → Subscriptions, and manage or cancel your subscription. It takes less than a minute.</li><li>Or email ${mail} and we'll do it for you within 1 business day.</li><li>To avoid your next charge, cancel before the next billing date shown in your account. There are no cancellation fees and no minimum number of orders.</li></ul>
<h4>Refunds on subscriptions</h4>
<p>Your first subscription order is covered by our 60-day Happy Dog Guarantee. Renewal orders can be refunded if you contact us within 14 days of the renewal charge and the product hasn't shipped yet.</p>`,

  CONTACT_INFORMATION: `<p><strong>Pawlio</strong></p>
<p>Email: ${mail}</p>
<p>We aim to reply to every email within 1 business day.</p>`,
};

const M = `mutation($p:ShopPolicyInput!){ shopPolicyUpdate(shopPolicy:$p){ shopPolicy{ type url } userErrors{ field message code } } }`;
for (const [type, body] of Object.entries(POLITICAS)) {
  const r = gql(M, { p: { type, body } }, { mutate: true }).shopPolicyUpdate;
  console.log(type, r.userErrors.length ? JSON.stringify(r.userErrors) : r.shopPolicy.url);
}

// Privacidad: la plantilla de Shopify se generó con el nombre por defecto "My Store"
const actual = gql(`{ shop{ shopPolicies{ type body } } }`).shop.shopPolicies.find(p => p.type === 'PRIVACY_POLICY');
if (actual && actual.body.includes('My Store')) {
  const r = gql(M, { p: { type: 'PRIVACY_POLICY', body: actual.body.replaceAll('My Store', 'Pawlio') } }, { mutate: true }).shopPolicyUpdate;
  console.log('PRIVACY_POLICY', r.userErrors.length ? JSON.stringify(r.userErrors) : r.shopPolicy.url);
}
