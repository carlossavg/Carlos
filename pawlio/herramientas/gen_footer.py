import json
import os
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gen_sections.py')).read().split("# ---------------------------------------------------------------- HERO")[0])

write('pw-footer', r'''
{%- style -%}
  #shopify-section-{{ section.id }} { background: var(--pw-forest); padding-top: {{ section.settings.padding_top | times: 0.7 | round }}px; padding-bottom: 28px; }
  @media screen and (min-width: 750px) { #shopify-section-{{ section.id }} { padding-top: {{ section.settings.padding_top }}px; } }
  #shopify-section-{{ section.id }} .pw-footer { --pw-footer-logo: {{ section.settings.logo_width }}px; }
{%- endstyle -%}
<footer class="pw pw-footer pw-on-forest">
  <div class="pw-container">
    <div class="pw-footer__top">
      <div class="pw-footer__brand">
        <a href="{{ routes.root_url }}" style="text-decoration:none" aria-label="{{ shop.name | escape }}">
          {%- if section.settings.logo != blank -%}
            {{ section.settings.logo | image_url: width: 600 | image_tag: loading: 'lazy', widths: '200, 300, 400, 600', alt: shop.name }}
          {%- else -%}
            {%- render 'pw-logo' -%}
          {%- endif -%}
        </a>
        {%- if section.settings.tagline != blank -%}
          <p>{% render 'pw-t', t: section.settings.tagline %}</p>
        {%- endif -%}
        {%- if section.settings.show_social -%}
          <div class="pw-footer__social">
            {%- if settings.social_instagram_link != blank -%}<a href="{{ settings.social_instagram_link }}" target="_blank" rel="noopener" aria-label="Instagram">{{- 'icon-instagram.svg' | inline_asset_content -}}</a>{%- endif -%}
            {%- if settings.social_tiktok_link != blank -%}<a href="{{ settings.social_tiktok_link }}" target="_blank" rel="noopener" aria-label="TikTok">{{- 'icon-tiktok.svg' | inline_asset_content -}}</a>{%- endif -%}
            {%- if settings.social_facebook_link != blank -%}<a href="{{ settings.social_facebook_link }}" target="_blank" rel="noopener" aria-label="Facebook">{{- 'icon-facebook.svg' | inline_asset_content -}}</a>{%- endif -%}
            {%- if settings.social_youtube_link != blank -%}<a href="{{ settings.social_youtube_link }}" target="_blank" rel="noopener" aria-label="YouTube">{{- 'icon-youtube.svg' | inline_asset_content -}}</a>{%- endif -%}
            {%- if settings.social_pinterest_link != blank -%}<a href="{{ settings.social_pinterest_link }}" target="_blank" rel="noopener" aria-label="Pinterest">{{- 'icon-pinterest.svg' | inline_asset_content -}}</a>{%- endif -%}
          </div>
        {%- endif -%}
      </div>

      {%- for i in (1..2) -%}
        {%- liquid
          if i == 1
            assign menu = section.settings.menu_1
            assign menu_title = section.settings.menu_1_title
          else
            assign menu = section.settings.menu_2
            assign menu_title = section.settings.menu_2_title
          endif
        -%}
        <nav aria-label="{{ menu_title | escape }}">
          <p class="pw-footer__title">{{ menu_title }}</p>
          <ul class="pw-footer__links">
            {%- if menu != blank and menu.links.size > 0 -%}
              {%- for link in menu.links -%}
                <li><a href="{{ link.url }}">{{ link.title }}</a></li>
              {%- endfor -%}
            {%- elsif i == 1 -%}
              <li><a href="{% render 'pw-cta-url' %}">Shop the collar</a></li>
              <li><a href="{{ routes.root_url }}#pw-how">How it works</a></li>
              <li><a href="/pages/about">Our story</a></li>
            {%- else -%}
              <li><a href="/pages/faq">FAQ</a></li>
              <li><a href="/pages/contact">Contact us</a></li>
              <li><a href="{{ routes.account_url }}">Manage subscription</a></li>
              {%- if shop.shipping_policy != blank -%}<li><a href="{{ shop.shipping_policy.url }}">Shipping</a></li>{%- endif -%}
              {%- if shop.refund_policy != blank -%}<li><a href="{{ shop.refund_policy.url }}">Returns &amp; refunds</a></li>{%- endif -%}
            {%- endif -%}
          </ul>
        </nav>
      {%- endfor -%}

      {%- if section.settings.show_newsletter -%}
        <div class="pw-footer__news">
          <p class="pw-footer__title">{{ section.settings.news_title }}</p>
          <p>{% render 'pw-t', t: section.settings.news_text %}</p>
          {%- form 'customer', id: 'PwFooterNewsletter' -%}
            <div class="pw-footer__form">
            <input type="hidden" name="contact[tags]" value="newsletter">
            <label class="visually-hidden" for="PwNewsletterEmail">Email</label>
            <input id="PwNewsletterEmail" type="email" name="contact[email]" autocomplete="email" placeholder="{{ section.settings.news_placeholder | escape }}" required>
            <button type="submit" class="pw-btn pw-btn--primary">{{ section.settings.news_button }}</button>
            {%- if form.posted_successfully? -%}<p class="pw-footer__msg" role="status">{{ section.settings.news_success }}</p>{%- endif -%}
            {%- if form.errors -%}<p class="pw-footer__msg" role="alert">{{ form.errors.translated_fields.email | capitalize }} {{ form.errors.messages.email }}</p>{%- endif -%}
            </div>
          {%- endform -%}
        </div>
      {%- endif -%}
    </div>

    <div class="pw-footer__bottom">
      <div class="pw-footer__legal">
        <span>&copy; {{ 'now' | date: '%Y' }} {{ settings.pw_brand_name | default: shop.name }}</span>
        {%- for policy in shop.policies -%}
          <a href="{{ policy.url }}">{{ policy.title }}</a>
        {%- endfor -%}
      </div>
      {%- if section.settings.show_payment_icons and shop.enabled_payment_types.size > 0 -%}
        <ul class="pw-payments" role="list" aria-label="Payment methods">
          {%- for type in shop.enabled_payment_types -%}<li>{{ type | payment_type_svg_tag: class: 'icon icon--full-color' }}</li>{%- endfor -%}
        </ul>
      {%- endif -%}
    </div>
  </div>
</footer>
''', {
    "name": "Pawlio · Footer",
    "tag": "div",
    "class": "pw-section",
    "enabled_on": {"groups": ["footer"]},
    "settings": [
        {"type": "image_picker", "id": "logo", "label": "Logo (vacío = logo de texto Pawlio)"},
        {"type": "range", "id": "logo_width", "label": "Ancho del logo", "min": 60, "max": 300, "step": 10, "unit": "px", "default": 150},
        {"type": "textarea", "id": "tagline", "label": "Frase de la marca", "default": "Plant-powered flea & tick protection for dogs who live life outside. Born in Puerto Rico."},
        {"type": "checkbox", "id": "show_social", "label": "Mostrar redes sociales", "info": "Los enlaces se ponen en Configuración del tema → Redes sociales.", "default": True},
        {"type": "header", "content": "Menús"},
        {"type": "text", "id": "menu_1_title", "label": "Título menú 1", "default": "Shop"},
        {"type": "link_list", "id": "menu_1", "label": "Menú 1 (vacío = enlaces sugeridos)"},
        {"type": "text", "id": "menu_2_title", "label": "Título menú 2", "default": "Help"},
        {"type": "link_list", "id": "menu_2", "label": "Menú 2 (vacío = enlaces sugeridos)"},
        {"type": "header", "content": "Boletín (emails)"},
        {"type": "checkbox", "id": "show_newsletter", "label": "Mostrar suscripción por email", "default": True},
        {"type": "text", "id": "news_title", "label": "Título", "default": "Join the pack"},
        {"type": "text", "id": "news_text", "label": "Texto", "default": "Flea-season tips, new drops and members-only offers. No spam, ever."},
        {"type": "text", "id": "news_placeholder", "label": "Texto dentro de la caja", "default": "Your email"},
        {"type": "text", "id": "news_button", "label": "Botón", "default": "Join"},
        {"type": "text", "id": "news_success", "label": "Mensaje de éxito", "default": "Welcome to the pack! Check your inbox."},
        {"type": "header", "content": "Diseño"},
        {"type": "checkbox", "id": "show_payment_icons", "label": "Mostrar métodos de pago", "default": True},
        {"type": "range", "id": "padding_top", "label": "Espacio superior", "min": 24, "max": 120, "step": 8, "unit": "px", "default": 72},
    ],
    "presets": [{"name": "Pawlio · Footer"}],
})

write('pw-cart-trust', r'''
{%- render 'pw-section-style' -%}
<section class="pw pw-on-{{ section.settings.bg }}">
  <div class="pw-container pw-container--narrow">
    <ul class="pw-trust" style="--pw-cols: 3">
      {%- for block in section.blocks -%}
        <li class="pw-trust__item" {{ block.shopify_attributes }}>
          <span class="pw-trust__icon">{% render 'pw-icon', icon: block.settings.icon %}</span>
          <span>{% render 'pw-t', t: block.settings.text %}</span>
        </li>
      {%- endfor -%}
    </ul>
  </div>
</section>
''', {
    "name": "Pawlio · Sellos carrito",
    "tag": "div",
    "class": "pw-section",
    "disabled_on": DIS,
    "max_blocks": 3,
    "settings": design("cream", 16, 56, heading=False),
    "blocks": [{"type": "item", "name": "Elemento", "settings": [
        icon_select("icon", "Icono", "shield-check"),
        {"type": "text", "id": "text", "label": "Texto", "default": "[days]-day money-back guarantee"}]}],
    "presets": [{"name": "Pawlio · Sellos carrito", "blocks": [
        {"type": "item", "settings": {"icon": "shield-check", "text": "[days]-day money-back guarantee"}},
        {"type": "item", "settings": {"icon": "lock", "text": "Secure, encrypted checkout"}},
        {"type": "item", "settings": {"icon": "refresh", "text": "Cancel subscriptions anytime"}}]}],
})
print('ok')
