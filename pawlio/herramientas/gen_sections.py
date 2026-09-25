import json, os

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tema', 'sections')

BG = [
    {"value": "cream", "label": "Crema"},
    {"value": "white", "label": "Blanco"},
    {"value": "sand", "label": "Arena"},
    {"value": "mint", "label": "Menta"},
    {"value": "forest", "label": "Verde bosque (oscuro)"},
]

ICONS = [
    ("check-circle", "Check"), ("shield-check", "Escudo"), ("leaf", "Hoja"), ("drop", "Gota (agua)"),
    ("scissors", "Tijeras (ajustable)"), ("clock", "Reloj"), ("calendar", "Calendario"), ("refresh", "Renovar"),
    ("truck", "Camión"), ("lock", "Candado"), ("return", "Devolución"), ("heart", "Corazón"), ("paw", "Huella"),
    ("sparkle", "Destello"), ("moon", "Luna"), ("sun", "Sol"), ("wind", "Aroma"), ("smile", "Sonrisa"),
    ("ruler", "Regla (talla)"), ("home", "Casa"), ("gift", "Regalo"), ("percent", "Porcentaje"), ("box", "Caja"),
    ("chat", "Chat"), ("bolt", "Rayo"), ("pin", "Ubicación"), ("bug", "Bicho"), ("users", "Personas"),
    ("thermometer", "Termómetro"), ("mail", "Correo"),
]


def icon_select(id_, label, default):
    return {"type": "select", "id": id_, "label": label,
            "options": [{"value": v, "label": l} for v, l in ICONS], "default": default}


def design(bg="cream", pt=80, pb=80, h=48, body=18, align="center", heading=True):
    out = [{"type": "header", "content": "Diseño"},
           {"type": "select", "id": "bg", "label": "Fondo", "options": BG, "default": bg}]
    if heading:
        out += [
            {"type": "select", "id": "text_align", "label": "Alineación del encabezado",
             "options": [{"value": "left", "label": "Izquierda"}, {"value": "center", "label": "Centro"}], "default": align},
            {"type": "range", "id": "heading_size", "label": "Tamaño del título", "min": 24, "max": 84, "step": 2, "unit": "px", "default": h},
            {"type": "range", "id": "body_size", "label": "Tamaño del texto", "min": 14, "max": 24, "step": 1, "unit": "px", "default": body},
        ]
    out += [
        {"type": "range", "id": "padding_top", "label": "Espacio superior", "min": 0, "max": 160, "step": 8, "unit": "px", "default": pt},
        {"type": "range", "id": "padding_bottom", "label": "Espacio inferior", "min": 0, "max": 160, "step": 8, "unit": "px", "default": pb},
    ]
    return out


def head(eyebrow, heading, text=""):
    out = [{"type": "header", "content": "Encabezado"},
           {"type": "paragraph", "content": "Pon palabras en cursiva en el título para resaltarlas. Comodines: [months], [months2], [months3], [days], [brand]."},
           {"type": "text", "id": "eyebrow", "label": "Texto pequeño", "default": eyebrow},
           {"type": "inline_richtext", "id": "heading", "label": "Título", "default": heading}]
    if text is not None:
        t = {"type": "richtext", "id": "text", "label": "Texto"}
        if text:
            t["default"] = text
        out.append(t)
    return out


def image_settings(label="Imagen", pos="50% 50%"):
    return [
        {"type": "header", "content": label},
        {"type": "image_picker", "id": "image", "label": label},
        {"type": "text", "id": "image_url", "label": "Enlace de imagen de respaldo",
         "info": "Se usa si no eliges imagen arriba. Para que cargue más rápido, sube la foto a Shopify y elígela arriba."},
        {"type": "select", "id": "image_position", "label": "Enfoque de la imagen", "options": [
            {"value": "50% 50%", "label": "Centro"}, {"value": "50% 35%", "label": "Centro, un poco arriba"}, {"value": "50% 20%", "label": "Arriba"},
            {"value": "50% 80%", "label": "Abajo"}, {"value": "25% 50%", "label": "Izquierda"}, {"value": "70% 50%", "label": "Derecha"}], "default": pos},
    ]


def write(name, liquid, schema):
    js = json.dumps(schema, indent=2, ensure_ascii=False)
    with open(os.path.join(ROOT, name + '.liquid'), 'w') as f:
        f.write(liquid.strip() + "\n\n{% schema %}\n" + js + "\n{% endschema %}\n")


DIS = {"groups": ["header", "footer"]}

# ---------------------------------------------------------------- HERO
write('pw-hero', r'''
{%- render 'pw-section-style' -%}
{%- style -%}
  #shopify-section-{{ section.id }} .pw-hero {
    --pw-h1-size: {{ section.settings.heading_size }}px;
    --pw-shade: {{ section.settings.shade | divided_by: 100.0 }};
    --pw-hero-h: {{ section.settings.height }}vh;
    --pw-hero-h-m: {{ section.settings.height_mobile }}svh;
  }
  {%- if section.settings.mobile_image != blank or section.settings.mobile_image_url != blank %}
    @media screen and (max-width: 749px) { #shopify-section-{{ section.id }} .pw-hero__img--desktop { display: none; } }
    @media screen and (min-width: 750px) { #shopify-section-{{ section.id }} .pw-hero__img--mobile { display: none; } }
  {%- endif %}
{%- endstyle -%}
{%- liquid
  assign ld = 'lazy'
  if section.index <= 2
    assign ld = 'eager'
  endif
-%}
<section class="pw pw-hero pw-on-forest">
  <div class="pw-hero__bg pw-media">
    {%- render 'pw-image', image: section.settings.image, fallback: section.settings.image_url, class: 'pw-hero__img--desktop', loading: ld, position: section.settings.image_position, alt: section.settings.image_alt -%}
    {%- if section.settings.mobile_image != blank or section.settings.mobile_image_url != blank -%}
      {%- render 'pw-image', image: section.settings.mobile_image, fallback: section.settings.mobile_image_url, class: 'pw-hero__img--mobile', loading: ld, position: section.settings.image_position, alt: section.settings.image_alt, sizes: '100vw' -%}
    {%- endif -%}
  </div>
  <div class="pw-hero__shade" aria-hidden="true"></div>
  <div class="pw-container">
    <div class="pw-hero__inner">
      {%- if section.settings.eyebrow != blank -%}
        <p class="pw-eyebrow pw-reveal">{% render 'pw-t', t: section.settings.eyebrow %}</p>
      {%- endif -%}
      {%- if section.index == 1 -%}
        <h1 class="pw-h1 pw-reveal" style="--pw-d:80ms">{% render 'pw-t', t: section.settings.heading %}</h1>
      {%- else -%}
        <h2 class="pw-h1 pw-reveal" style="--pw-d:80ms">{% render 'pw-t', t: section.settings.heading %}</h2>
      {%- endif -%}
      {%- if section.settings.text != blank -%}
        <p class="pw-lead pw-reveal" style="--pw-d:160ms">{% render 'pw-t', t: section.settings.text %}</p>
      {%- endif -%}
      <div class="pw-actions pw-reveal" style="--pw-d:240ms">
        {%- if section.settings.button_label != blank -%}
          <a class="pw-btn pw-btn--primary pw-btn--shine" href="{% render 'pw-cta-url', link: section.settings.button_link %}">
            {{ section.settings.button_label }} {% render 'pw-icon', icon: 'arrow-right', px: 20, class: 'pw-icon--arrow' %}
          </a>
        {%- endif -%}
        {%- if section.settings.secondary_label != blank -%}
          <a class="pw-btn pw-btn--ghost" href="{{ section.settings.secondary_link | default: '#pw-how' }}">{{ section.settings.secondary_label }}</a>
        {%- endif -%}
      </div>
      {%- assign chips = section.settings.chips | newline_to_br | split: '<br />' -%}
      {%- if section.settings.chips != blank -%}
        <div class="pw-chips pw-reveal" style="--pw-d:320ms">
          {%- for chip in chips -%}
            {%- assign c = chip | strip -%}
            {%- if c != blank -%}
              <span class="pw-chip">{% render 'pw-icon', icon: 'check-circle', px: 17 %}{% render 'pw-t', t: c %}</span>
            {%- endif -%}
          {%- endfor -%}
        </div>
      {%- endif -%}
    </div>
  </div>
</section>
''', {
    "name": "Pawlio · Portada",
    "tag": "div",
    "class": "pw-section",
    "disabled_on": DIS,
    "settings": image_settings("Imagen de fondo", "70% 50%") + [
        {"type": "image_picker", "id": "mobile_image", "label": "Imagen para celular (opcional)"},
        {"type": "text", "id": "mobile_image_url", "label": "Enlace de imagen para celular (opcional)"},
        {"type": "text", "id": "image_alt", "label": "Descripción de la imagen (accesibilidad)", "default": "Happy dog running through a sunny meadow"},
        {"type": "header", "content": "Textos"},
        {"type": "text", "id": "eyebrow", "label": "Texto pequeño", "default": "Plant-powered flea & tick collar"},
        {"type": "inline_richtext", "id": "heading", "label": "Título (cursiva = resaltado)", "default": "Months of protection. <em>Zero monthly hassle.</em>"},
        {"type": "textarea", "id": "text", "label": "Texto", "default": "One clip-on collar helps keep fleas and ticks away for up to [months] months. No greasy drops, no pills, no reminders."},
        {"type": "text", "id": "button_label", "label": "Botón principal", "default": "Protect my dog"},
        {"type": "url", "id": "button_link", "label": "Enlace del botón (vacío = producto principal)"},
        {"type": "text", "id": "secondary_label", "label": "Botón secundario", "default": "How it works"},
        {"type": "url", "id": "secondary_link", "label": "Enlace del botón secundario"},
        {"type": "textarea", "id": "chips", "label": "Sellos de confianza (uno por línea)", "default": "[days]-day money-back guarantee\nFree shipping on 2+ collars\nCancel subscriptions anytime"},
        {"type": "header", "content": "Diseño"},
        {"type": "range", "id": "heading_size", "label": "Tamaño del título (escritorio)", "min": 40, "max": 96, "step": 2, "unit": "px", "default": 78},
        {"type": "range", "id": "shade", "label": "Oscurecer la foto", "min": 0, "max": 90, "step": 5, "unit": "%", "default": 55},
        {"type": "range", "id": "height", "label": "Alto en escritorio", "min": 50, "max": 100, "step": 2, "unit": "vh", "default": 86},
        {"type": "range", "id": "height_mobile", "label": "Alto en celular", "min": 50, "max": 100, "step": 2, "unit": "vh", "default": 88},
        {"type": "select", "id": "text_align", "label": "Alineación", "options": [{"value": "left", "label": "Izquierda"}, {"value": "center", "label": "Centro"}], "default": "left"},
        {"type": "range", "id": "padding_top", "label": "Espacio superior", "min": 0, "max": 160, "step": 8, "unit": "px", "default": 0},
        {"type": "range", "id": "padding_bottom", "label": "Espacio inferior", "min": 0, "max": 160, "step": 8, "unit": "px", "default": 0},
    ],
    "presets": [{"name": "Pawlio · Portada"}],
})

# ---------------------------------------------------------------- TRUST BAR
write('pw-trust-bar', r'''
{%- render 'pw-section-style' -%}
<section class="pw pw-on-{{ section.settings.bg }}">
  <div class="pw-container">
    <ul class="pw-trust" style="--pw-cols: {{ section.blocks.size | at_most: 4 | at_least: 1 }}">
      {%- for block in section.blocks -%}
        <li class="pw-trust__item pw-reveal" style="--pw-d: {{ forloop.index0 | times: 70 }}ms" {{ block.shopify_attributes }}>
          <span class="pw-trust__icon">{% render 'pw-icon', icon: block.settings.icon %}</span>
          <span>{% render 'pw-t', t: block.settings.text %}</span>
        </li>
      {%- endfor -%}
    </ul>
  </div>
</section>
''', {
    "name": "Pawlio · Confianza",
    "tag": "div",
    "class": "pw-section",
    "disabled_on": DIS,
    "max_blocks": 4,
    "settings": design("white", 24, 24, heading=False),
    "blocks": [{"type": "item", "name": "Elemento", "settings": [
        icon_select("icon", "Icono", "truck"),
        {"type": "text", "id": "text", "label": "Texto", "default": "Free shipping on 2+ collars"}]}],
    "presets": [{"name": "Pawlio · Confianza", "blocks": [
        {"type": "item", "settings": {"icon": "truck", "text": "Free shipping on 2+ collars"}},
        {"type": "item", "settings": {"icon": "shield-check", "text": "[days]-day money-back guarantee"}},
        {"type": "item", "settings": {"icon": "refresh", "text": "Skip or cancel anytime"}},
        {"type": "item", "settings": {"icon": "lock", "text": "Secure checkout"}}]}],
})

# ---------------------------------------------------------------- MARQUEE
write('pw-marquee', r'''
{%- render 'pw-section-style' -%}
{%- style -%}
  #shopify-section-{{ section.id }} .pw-marquee { --pw-speed: {{ section.settings.speed }}s; --pw-marquee-size: {{ section.settings.size }}px; }
  @media screen and (max-width: 749px) { #shopify-section-{{ section.id }} .pw-marquee { --pw-marquee-size: {{ section.settings.size | times: 0.8 | round }}px; } }
{%- endstyle -%}
{%- assign items = section.settings.items | newline_to_br | split: '<br />' -%}
<section class="pw pw-on-{{ section.settings.bg }}" aria-label="{{ section.settings.items | strip_newlines | escape }}">
  <div class="pw-marquee">
    {%- for n in (1..2) -%}
      <div class="pw-marquee__track"{% if n == 2 %} aria-hidden="true"{% endif %}>
        {%- for r in (1..2) -%}
          {%- for item in items -%}
            {%- assign t = item | strip -%}
            {%- if t != blank -%}
              <span class="pw-marquee__item">{% render 'pw-t', t: t %}<span class="pw-marquee__sep">{% render 'pw-icon', icon: section.settings.separator, px: 22 %}</span></span>
            {%- endif -%}
          {%- endfor -%}
        {%- endfor -%}
      </div>
    {%- endfor -%}
  </div>
</section>
''', {
    "name": "Pawlio · Cinta animada",
    "tag": "div",
    "class": "pw-section",
    "disabled_on": DIS,
    "settings": [
        {"type": "textarea", "id": "items", "label": "Frases (una por línea)", "default": "Plant-powered\nUp to [months] months per collar\nWaterproof\nOne size fits all breeds\nNo monthly drops\nNo pills\nNo prescription needed"},
        {"type": "select", "id": "separator", "label": "Separador", "options": [
            {"value": "paw-solid", "label": "Huella"}, {"value": "sparkle", "label": "Destello"}, {"value": "leaf", "label": "Hoja"}, {"value": "star", "label": "Estrella"}], "default": "paw-solid"},
        {"type": "range", "id": "speed", "label": "Velocidad (segundos por vuelta, más = más lento)", "min": 10, "max": 90, "step": 2, "unit": "s", "default": 36},
        {"type": "range", "id": "size", "label": "Tamaño de letra", "min": 16, "max": 56, "step": 2, "unit": "px", "default": 28},
    ] + design("sand", 24, 24, heading=False),
    "presets": [{"name": "Pawlio · Cinta animada"}],
})

# ---------------------------------------------------------------- PROBLEM
write('pw-problem', r'''
{%- render 'pw-section-style' -%}
<section class="pw pw-problem pw-problem--image-{{ section.settings.layout }} pw-on-{{ section.settings.bg }}">
  <div class="pw-container pw-problem__grid">
    <div class="pw-problem__media pw-media pw-reveal">
      {%- render 'pw-image', image: section.settings.image, fallback: section.settings.image_url, position: section.settings.image_position, sizes: '(min-width: 990px) 45vw, 100vw', alt: section.settings.image_alt -%}
      {%- if section.settings.tag != blank -%}
        <span class="pw-problem__tag">{% render 'pw-icon', icon: 'bug', px: 20 %}{% render 'pw-t', t: section.settings.tag %}</span>
      {%- endif -%}
    </div>
    <div class="pw-problem__content">
      {%- render 'pw-head' -%}
      {%- if section.blocks.size > 0 -%}
        <div class="pw-stats">
          {%- for block in section.blocks -%}
            <div class="pw-stat pw-card pw-reveal{% if block.settings.wide %} pw-stat--wide{% endif %}" style="--pw-d: {{ forloop.index0 | times: 90 }}ms" {{ block.shopify_attributes }}>
              <p class="pw-stat__num">{{ block.settings.prefix }}<span data-pw-count="{{ block.settings.value }}">{{ block.settings.value }}</span>{{ block.settings.suffix }}</p>
              <p class="pw-stat__label">{% render 'pw-t', t: block.settings.label %}</p>
            </div>
          {%- endfor -%}
        </div>
      {%- endif -%}
      {%- if section.settings.source != blank -%}
        <p class="pw-source">{{ section.settings.source }}</p>
      {%- endif -%}
    </div>
  </div>
</section>
''', {
    "name": "Pawlio · Problema",
    "tag": "div",
    "class": "pw-section",
    "disabled_on": DIS,
    "settings": image_settings("Imagen") + [
        {"type": "text", "id": "image_alt", "label": "Descripción de la imagen", "default": "Dog scratching behind its ear"},
        {"type": "text", "id": "tag", "label": "Etiqueta sobre la imagen", "default": "Sound familiar?"},
        {"type": "select", "id": "layout", "label": "Imagen a la", "options": [{"value": "left", "label": "Izquierda"}, {"value": "right", "label": "Derecha"}], "default": "left"},
    ] + head("The problem", "Fleas don't just bite. <em>They move in.</em>",
             "<p>By the time you spot one flea on your dog, many more are hiding in the carpet, the couch and the bed you share. Every scratch means less sleep, more stress, and a dog who just doesn't feel like themselves.</p>") + [
        {"type": "text", "id": "source", "label": "Fuente de los datos", "default": "Sources: VCA Animal Hospitals and veterinary parasitology references."},
    ] + design("cream", 88, 88, 48, 18, "left"),
    "blocks": [{"type": "stat", "name": "Dato", "settings": [
        {"type": "text", "id": "prefix", "label": "Antes del número"},
        {"type": "text", "id": "value", "label": "Número (se anima)", "default": "50"},
        {"type": "text", "id": "suffix", "label": "Después del número"},
        {"type": "text", "id": "label", "label": "Texto", "default": "eggs a single flea can lay every day"},
        {"type": "checkbox", "id": "wide", "label": "Ocupar todo el ancho", "default": False}]}],
    "presets": [{"name": "Pawlio · Problema", "blocks": [
        {"type": "stat", "settings": {"value": "50", "label": "eggs a single female flea can lay every day"}},
        {"type": "stat", "settings": {"value": "95", "suffix": "%", "label": "of a flea problem hides in your home, not on your dog"}}]}],
})

# ---------------------------------------------------------------- IMAGE + TEXT
write('pw-image-text', r'''
{%- render 'pw-section-style' -%}
{%- style -%}
  #shopify-section-{{ section.id }} .pw-split__media { --pw-ratio: {% case section.settings.ratio %}{% when 'square' %}1 / 1{% when 'landscape' %}4 / 3{% else %}4 / 5{% endcase %}; }
{%- endstyle -%}
{%- liquid
  assign pw_img = section.settings.image
  if pw_img == blank and section.settings.image_url == blank and section.settings.use_product_image
    assign pw_fp = settings.pw_featured_product
    if template.name == 'product' and product != blank
      assign pw_fp = product
    endif
    if pw_fp == blank
      assign pw_fp = collections.all.products.first
    endif
    assign pw_img = pw_fp.featured_image
  endif
-%}
<section class="pw pw-split-section pw-on-{{ section.settings.bg }}"{% if section.settings.anchor != blank %} id="{{ section.settings.anchor | handle }}"{% endif %}>
  <div class="pw-container pw-split pw-split--image-{{ section.settings.layout }}">
    <div class="pw-split__media pw-media pw-reveal">
      {%- render 'pw-image', image: pw_img, fallback: section.settings.image_url, position: section.settings.image_position, sizes: '(min-width: 990px) 50vw, 100vw', alt: section.settings.image_alt -%}
      {%- if section.settings.float_title != blank -%}
        <div class="pw-split__float">
          <strong>{% render 'pw-t', t: section.settings.float_title %}</strong>
          <span>{% render 'pw-t', t: section.settings.float_text %}</span>
        </div>
      {%- endif -%}
    </div>
    <div class="pw-split__content">
      {%- render 'pw-head' -%}
      {%- if section.settings.bullets != blank -%}
        {%- assign bullets = section.settings.bullets | newline_to_br | split: '<br />' -%}
        <ul class="pw-checklist pw-reveal" style="--pw-d:120ms">
          {%- for b in bullets -%}
            {%- assign t = b | strip -%}
            {%- if t != blank -%}
              <li><span class="pw-checklist__icon">{% render 'pw-icon', icon: 'check', px: 15, stroke: 2.6 %}</span><span>{% render 'pw-t', t: t %}</span></li>
            {%- endif -%}
          {%- endfor -%}
        </ul>
      {%- endif -%}
      {%- if section.settings.signature != blank -%}
        <p class="pw-signature pw-reveal">{% render 'pw-t', t: section.settings.signature %}</p>
      {%- endif -%}
      {%- if section.settings.button_label != blank -%}
        <div class="pw-actions pw-reveal" style="--pw-d:200ms">
          <a class="pw-btn pw-btn--{{ section.settings.button_style }}" href="{% render 'pw-cta-url', link: section.settings.button_link %}">
            {{ section.settings.button_label }} {% render 'pw-icon', icon: 'arrow-right', px: 20, class: 'pw-icon--arrow' %}
          </a>
        </div>
      {%- endif -%}
    </div>
  </div>
</section>
''', {
    "name": "Pawlio · Imagen y texto",
    "tag": "div",
    "class": "pw-section",
    "disabled_on": DIS,
    "settings": image_settings("Imagen") + [
        {"type": "checkbox", "id": "use_product_image", "label": "Si no hay imagen, usar la foto del producto", "default": False},
        {"type": "text", "id": "image_alt", "label": "Descripción de la imagen"},
        {"type": "select", "id": "ratio", "label": "Forma de la imagen", "options": [
            {"value": "portrait", "label": "Vertical"}, {"value": "square", "label": "Cuadrada"}, {"value": "landscape", "label": "Horizontal"}], "default": "portrait"},
        {"type": "select", "id": "layout", "label": "Imagen a la", "options": [{"value": "left", "label": "Izquierda"}, {"value": "right", "label": "Derecha"}], "default": "left"},
        {"type": "text", "id": "float_title", "label": "Tarjeta flotante: título (opcional)"},
        {"type": "text", "id": "float_text", "label": "Tarjeta flotante: texto"},
    ] + head("Meet Pawlio", "One collar. <em>Months of peace of mind.</em>",
             "<p>Pawlio's slow-release collar surrounds your dog with plant-powered protection that helps keep fleas and ticks away — day and night, rain or shine.</p>") + [
        {"type": "textarea", "id": "bullets", "label": "Viñetas (una por línea)", "default": "Clips on in 10 seconds\nWorks around the clock, rain or shine\nNothing to remember every month"},
        {"type": "text", "id": "signature", "label": "Firma (opcional)"},
        {"type": "text", "id": "button_label", "label": "Botón", "default": "Protect my dog"},
        {"type": "url", "id": "button_link", "label": "Enlace del botón (vacío = caja de compra / producto)"},
        {"type": "select", "id": "button_style", "label": "Estilo del botón", "options": [
            {"value": "primary", "label": "Verde"}, {"value": "ghost", "label": "Contorno"}, {"value": "light", "label": "Blanco"}], "default": "primary"},
        {"type": "text", "id": "anchor", "label": "ID para enlazar (opcional, ej. how)"},
    ] + design("cream", 88, 88, 48, 18, "left"),
    "presets": [{"name": "Pawlio · Imagen y texto"}],
})

# ---------------------------------------------------------------- STEPS
write('pw-steps', r'''
{%- render 'pw-section-style' -%}
<section class="pw pw-on-{{ section.settings.bg }}" id="pw-how">
  <div class="pw-container">
    {%- render 'pw-head' -%}
    <ol class="pw-steps">
      {%- for block in section.blocks -%}
        <li class="pw-step pw-card pw-reveal" style="--pw-d: {{ forloop.index0 | times: 110 }}ms" {{ block.shopify_attributes }}>
          <span class="pw-step__num" aria-hidden="true">{{ forloop.index }}</span>
          <span class="pw-step__icon">{% render 'pw-icon', icon: block.settings.icon %}</span>
          <span class="pw-step__kicker">{{ section.settings.kicker }} {{ forloop.index }}</span>
          <h3 class="pw-h3">{% render 'pw-t', t: block.settings.title %}</h3>
          <p>{% render 'pw-t', t: block.settings.text %}</p>
        </li>
      {%- endfor -%}
    </ol>
    {%- if section.settings.button_label != blank -%}
      <div class="pw-actions pw-reveal" style="margin-top:36px">
        <a class="pw-btn pw-btn--primary" href="{% render 'pw-cta-url', link: section.settings.button_link %}">
          {{ section.settings.button_label }} {% render 'pw-icon', icon: 'arrow-right', px: 20, class: 'pw-icon--arrow' %}
        </a>
      </div>
    {%- endif -%}
  </div>
</section>
''', {
    "name": "Pawlio · Cómo funciona",
    "tag": "div",
    "class": "pw-section",
    "disabled_on": DIS,
    "max_blocks": 6,
    "settings": head("How it works", "Protection in <em>3 easy steps</em>", None) + [
        {"type": "text", "id": "kicker", "label": "Palabra antes del número", "default": "Step"},
        {"type": "text", "id": "button_label", "label": "Botón (opcional)", "default": "Get started"},
        {"type": "url", "id": "button_link", "label": "Enlace del botón"},
    ] + design("white", 88, 88, 46, 18, "center"),
    "blocks": [{"type": "step", "name": "Paso", "settings": [
        icon_select("icon", "Icono", "sparkle"),
        {"type": "text", "id": "title", "label": "Título", "default": "Unpack & stretch"},
        {"type": "textarea", "id": "text", "label": "Texto", "default": "Take it out of the pouch and give it a gentle stretch to activate it."}]}],
    "presets": [{"name": "Pawlio · Cómo funciona", "blocks": [
        {"type": "step", "settings": {"icon": "sparkle", "title": "Unpack & stretch", "text": "Take the collar out of the pouch and give it a gentle stretch to activate the plant-oil blend."}},
        {"type": "step", "settings": {"icon": "scissors", "title": "Fit & trim", "text": "Buckle it on so two fingers slide underneath, then snip off the extra length."}},
        {"type": "step", "settings": {"icon": "calendar", "title": "Relax for months", "text": "Your dog is covered for up to [months] months. Subscribers get the next collar right on time."}}]}],
})

# ---------------------------------------------------------------- BENEFITS
write('pw-benefits', r'''
{%- render 'pw-section-style' -%}
<section class="pw pw-on-{{ section.settings.bg }}">
  <div class="pw-container">
    {%- render 'pw-head' -%}
    <div class="pw-benefits" style="--pw-cols: {{ section.settings.columns }}">
      {%- for block in section.blocks -%}
        <div class="pw-benefit pw-card pw-reveal" style="--pw-d: {{ forloop.index0 | modulo: 3 | times: 90 }}ms" {{ block.shopify_attributes }}>
          <span class="pw-benefit__icon">{% render 'pw-icon', icon: block.settings.icon %}</span>
          <h3 class="pw-h3">{% render 'pw-t', t: block.settings.title %}</h3>
          <p>{% render 'pw-t', t: block.settings.text %}</p>
        </div>
      {%- endfor -%}
    </div>
  </div>
</section>
''', {
    "name": "Pawlio · Beneficios",
    "tag": "div",
    "class": "pw-section",
    "disabled_on": DIS,
    "max_blocks": 12,
    "settings": head("Why dog parents switch", "Everything they need. <em>Nothing they don't.</em>", None) + [
        {"type": "select", "id": "columns", "label": "Columnas en escritorio", "options": [
            {"value": "2", "label": "2"}, {"value": "3", "label": "3"}, {"value": "4", "label": "4"}], "default": "3"},
    ] + design("cream", 88, 88, 46, 18, "center"),
    "blocks": [{"type": "benefit", "name": "Beneficio", "settings": [
        icon_select("icon", "Icono", "leaf"),
        {"type": "text", "id": "title", "label": "Título", "default": "Plant-powered"},
        {"type": "textarea", "id": "text", "label": "Texto", "default": "Made with plant-derived essential oils instead of harsh synthetic chemicals."}]}],
    "presets": [{"name": "Pawlio · Beneficios", "blocks": [
        {"type": "benefit", "settings": {"icon": "leaf", "title": "Plant-powered", "text": "Made with plant-derived essential oils instead of harsh synthetic chemicals."}},
        {"type": "benefit", "settings": {"icon": "clock", "title": "Lasts for months", "text": "Up to [months] months per collar — far fewer things to remember than monthly drops."}},
        {"type": "benefit", "settings": {"icon": "drop", "title": "Waterproof", "text": "Baths, beach days and rainy walks don't slow it down."}}]}],
})

# ---------------------------------------------------------------- COMPARISON
write('pw-comparison', r'''
{%- render 'pw-section-style' -%}
{%- capture yes_icon -%}<span class="pw-compare__yes" role="img" aria-label="Yes">{% render 'pw-icon', icon: 'check-circle', px: 26, stroke: 2 %}</span>{%- endcapture -%}
{%- capture no_icon -%}<span class="pw-compare__no" role="img" aria-label="No">{% render 'pw-icon', icon: 'x-circle', px: 26, stroke: 2 %}</span>{%- endcapture -%}
<section class="pw pw-on-{{ section.settings.bg }}">
  <div class="pw-container pw-container--narrow">
    {%- render 'pw-head' -%}
    <div class="pw-compare pw-reveal">
      <table class="pw-compare__table">
        <colgroup><col class="pw-compare__feature"><col><col>{% if section.settings.col_3 != blank %}<col>{% endif %}</colgroup>
        <thead>
          <tr>
            <th scope="col"><span class="visually-hidden">Feature</span></th>
            <th scope="col" class="is-brand">{% render 'pw-t', t: section.settings.col_brand %}</th>
            <th scope="col">{{ section.settings.col_2 }}</th>
            {%- if section.settings.col_3 != blank -%}<th scope="col">{{ section.settings.col_3 }}</th>{%- endif -%}
          </tr>
        </thead>
        <tbody>
          {%- for block in section.blocks -%}
            <tr {{ block.shopify_attributes }}>
              <th scope="row">{% render 'pw-t', t: block.settings.feature %}</th>
              {%- assign cells = 'brand,v2,v3' | split: ',' -%}
              {%- for key in cells -%}
                {%- if key == 'v3' and section.settings.col_3 == blank -%}{%- continue -%}{%- endif -%}
                {%- assign val = block.settings[key] | strip -%}
                {%- assign val_d = val | downcase -%}
                <td{% if key == 'brand' %} class="is-brand"{% endif %}>
                  {%- if val_d == 'yes' or val_d == 'si' or val_d == 'sí' -%}{{ yes_icon }}{%- elsif val_d == 'no' -%}{{ no_icon }}{%- else -%}{% render 'pw-t', t: val %}{%- endif -%}
                </td>
              {%- endfor -%}
            </tr>
          {%- endfor -%}
        </tbody>
      </table>
    </div>
    {%- if section.settings.note != blank -%}
      <p class="pw-small pw-compare__hint">{{ section.settings.note }}</p>
    {%- endif -%}
  </div>
</section>
''', {
    "name": "Pawlio · Comparación",
    "tag": "div",
    "class": "pw-section",
    "disabled_on": DIS,
    "max_blocks": 10,
    "settings": head("The smarter way", "Pawlio vs. <em>the usual routine</em>", None) + [
        {"type": "paragraph", "content": "En cada fila escribe 'yes' para ✓, 'no' para ✕ o un texto corto."},
        {"type": "text", "id": "col_brand", "label": "Columna 1 (tu marca)", "default": "[brand]"},
        {"type": "text", "id": "col_2", "label": "Columna 2", "default": "Monthly drops"},
        {"type": "text", "id": "col_3", "label": "Columna 3 (vacío = ocultar)", "default": "Sprays"},
        {"type": "text", "id": "note", "label": "Nota al pie", "default": "Comparison based on typical over-the-counter products. Always follow each product's label."},
    ] + design("white", 88, 88, 46, 18, "center"),
    "blocks": [{"type": "row", "name": "Fila", "settings": [
        {"type": "text", "id": "feature", "label": "Característica", "default": "Lasts for months"},
        {"type": "text", "id": "brand", "label": "Tu marca", "default": "yes"},
        {"type": "text", "id": "v2", "label": "Columna 2", "default": "no"},
        {"type": "text", "id": "v3", "label": "Columna 3", "default": "no"}]}],
    "presets": [{"name": "Pawlio · Comparación", "blocks": [
        {"type": "row", "settings": {"feature": "Protection per application", "brand": "Up to [months] mo", "v2": "~30 days", "v3": "Days"}},
        {"type": "row", "settings": {"feature": "Nothing to remember monthly", "brand": "yes", "v2": "no", "v3": "no"}}]}],
})

# ---------------------------------------------------------------- SUBSCRIBE
write('pw-subscribe', r'''
{%- render 'pw-section-style' -%}
<section class="pw pw-on-{{ section.settings.bg }}">
  <div class="pw-container pw-sub">
    <div class="pw-sub__content">
      {%- render 'pw-head' -%}
      {%- if section.settings.button_label != blank -%}
        <div class="pw-actions pw-reveal">
          <a class="pw-btn pw-btn--{% if section.settings.bg == 'forest' %}light{% else %}primary{% endif %}" href="{% render 'pw-cta-url', link: section.settings.button_link %}">
            {{ section.settings.button_label }} {% render 'pw-icon', icon: 'arrow-right', px: 20, class: 'pw-icon--arrow' %}
          </a>
        </div>
      {%- endif -%}
      {%- if section.settings.fine_print != blank -%}
        <p class="pw-small pw-reveal">{% render 'pw-t', t: section.settings.fine_print %}</p>
      {%- endif -%}
    </div>
    <div class="pw-sub__card pw-card pw-reveal" style="--pw-d:120ms">
      <div class="pw-sub__cycle">
        <div class="pw-sub__tick">{% render 'pw-icon', icon: 'box' %}<span>{% render 'pw-t', t: section.settings.tick_1 %}</span></div>
        <div class="pw-sub__tick">{% render 'pw-icon', icon: 'refresh' %}<span>{% render 'pw-t', t: section.settings.tick_2 %}</span></div>
        <div class="pw-sub__tick">{% render 'pw-icon', icon: 'shield-check' %}<span>{% render 'pw-t', t: section.settings.tick_3 %}</span></div>
      </div>
      <ul class="pw-sub__perks">
        {%- for block in section.blocks -%}
          <li {{ block.shopify_attributes }}>
            <span class="pw-sub__perk-icon">{% render 'pw-icon', icon: block.settings.icon %}</span>
            <span><strong>{% render 'pw-t', t: block.settings.title %}</strong><p>{% render 'pw-t', t: block.settings.text %}</p></span>
          </li>
        {%- endfor -%}
      </ul>
    </div>
  </div>
</section>
''', {
    "name": "Pawlio · Suscripción",
    "tag": "div",
    "class": "pw-section",
    "disabled_on": DIS,
    "max_blocks": 5,
    "settings": head("Subscribe & Save", "Set it. Forget it. <em>Save every time.</em>",
                     "<p>Flea season never really ends. With Subscribe &amp; Save, a fresh collar arrives right before the old one wears off — so your dog is never left unprotected.</p>") + [
        {"type": "text", "id": "tick_1", "label": "Ciclo 1", "default": "Today: your first collar"},
        {"type": "text", "id": "tick_2", "label": "Ciclo 2", "default": "Month [months]: a fresh one arrives"},
        {"type": "text", "id": "tick_3", "label": "Ciclo 3", "default": "Protected all year"},
        {"type": "text", "id": "button_label", "label": "Botón", "default": "Start saving"},
        {"type": "url", "id": "button_link", "label": "Enlace del botón"},
        {"type": "text", "id": "fine_print", "label": "Letra pequeña", "default": "Subscriptions renew automatically at the discounted price until you cancel. Manage, skip or cancel anytime from your account."},
    ] + design("forest", 96, 96, 46, 18, "left"),
    "blocks": [{"type": "perk", "name": "Ventaja", "settings": [
        icon_select("icon", "Icono", "percent"),
        {"type": "text", "id": "title", "label": "Título", "default": "Save on every delivery"},
        {"type": "text", "id": "text", "label": "Texto", "default": "Subscribers always pay less than one-time buyers."}]}],
    "presets": [{"name": "Pawlio · Suscripción", "blocks": [
        {"type": "perk", "settings": {"icon": "percent", "title": "Save on every delivery", "text": "Subscribers always pay less than one-time buyers."}},
        {"type": "perk", "settings": {"icon": "calendar", "title": "Perfectly timed", "text": "A fresh collar every [months] months — right when the old one wears off."}},
        {"type": "perk", "settings": {"icon": "refresh", "title": "Skip, pause or cancel anytime", "text": "No fees, no phone calls. Manage it all from your account in seconds."}}]}],
})

# ---------------------------------------------------------------- GUARANTEE
write('pw-guarantee', r'''
{%- render 'pw-section-style' -%}
{%- capture seal_text -%}{% render 'pw-t', t: section.settings.ring_text %}{%- endcapture -%}
<section class="pw pw-on-{{ section.settings.bg }}">
  <div class="pw-container pw-container--narrow">
    <div class="pw-guarantee pw-reveal">
      <div class="pw-seal" aria-hidden="true">
        <svg class="pw-seal__ring" viewBox="0 0 148 148">
          <defs><path id="pw-ring-{{ section.id }}" d="M74,74 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0"/></defs>
          <text><textPath href="#pw-ring-{{ section.id }}">{{ seal_text | strip | upcase }}</textPath></text>
        </svg>
        <span class="pw-seal__core">
          <span class="pw-seal__num">{% render 'pw-t', t: section.settings.seal_number %}</span>
          <span class="pw-seal__unit">{{ section.settings.seal_unit }}</span>
        </span>
      </div>
      {%- render 'pw-head' -%}
      {%- if section.settings.points != blank -%}
        {%- assign points = section.settings.points | newline_to_br | split: '<br />' -%}
        <div class="pw-guarantee__points">
          {%- for p in points -%}
            {%- assign t = p | strip -%}
            {%- if t != blank -%}<span class="pw-chip">{% render 'pw-icon', icon: 'check-circle', px: 17 %}{% render 'pw-t', t: t %}</span>{%- endif -%}
          {%- endfor -%}
        </div>
      {%- endif -%}
      {%- if section.settings.button_label != blank -%}
        <a class="pw-btn pw-btn--primary" href="{% render 'pw-cta-url', link: section.settings.button_link %}">
          {{ section.settings.button_label }} {% render 'pw-icon', icon: 'arrow-right', px: 20, class: 'pw-icon--arrow' %}
        </a>
      {%- endif -%}
    </div>
  </div>
</section>
''', {
    "name": "Pawlio · Garantía",
    "tag": "div",
    "class": "pw-section",
    "disabled_on": DIS,
    "settings": [
        {"type": "text", "id": "seal_number", "label": "Número del sello", "default": "[days]"},
        {"type": "text", "id": "seal_unit", "label": "Texto bajo el número", "default": "Days"},
        {"type": "text", "id": "ring_text", "label": "Texto que gira", "default": "Money-back guarantee • Happy dog promise • "},
    ] + head("Zero risk", "The <em>Happy Dog</em> Guarantee",
             "<p>Try [brand] for a full [days] days. If you and your pup aren't completely happy, email us and we'll refund your order. That's how sure we are.</p>") + [
        {"type": "textarea", "id": "points", "label": "Puntos (uno por línea)", "default": "Full refund within [days] days\nNo need to send it back\nReal humans answer every email"},
        {"type": "text", "id": "button_label", "label": "Botón", "default": "Try it risk-free"},
        {"type": "url", "id": "button_link", "label": "Enlace del botón"},
    ] + design("cream", 88, 88, 46, 18, "center"),
    "presets": [{"name": "Pawlio · Garantía"}],
})

# ---------------------------------------------------------------- REVIEWS
write('pw-reviews', r'''
{%- render 'pw-section-style' -%}
{%- if section.blocks.size > 0 -%}
<section class="pw pw-on-{{ section.settings.bg }}" id="pw-reviews">
  <div class="pw-container">
    {%- render 'pw-head' -%}
    {%- if section.settings.summary != blank -%}
      <p class="pw-reviews__summary pw-reveal">
        <span class="pw-stars" aria-hidden="true">{% for i in (1..5) %}{% render 'pw-icon', icon: 'star', px: 20 %}{% endfor %}</span>
        <span>{{ section.settings.summary }}</span>
      </p>
    {%- endif -%}
    <div class="pw-reviews">
      {%- for block in section.blocks -%}
        {%- if block.type == '@app' -%}
          <div class="pw-reviews__app" {{ block.shopify_attributes }}>{% render block %}</div>
          {%- continue -%}
        {%- endif -%}
        <article class="pw-review pw-card pw-reveal" style="--pw-d: {{ forloop.index0 | modulo: 3 | times: 90 }}ms" {{ block.shopify_attributes }}>
          {%- if block.settings.image != blank -%}
            <div class="pw-review__media pw-media">
              {{ block.settings.image | image_url: width: 900 | image_tag: loading: 'lazy', sizes: '(min-width: 990px) 30vw, 90vw', widths: '360, 540, 720, 900', alt: block.settings.image.alt }}
            </div>
          {%- endif -%}
          <span class="pw-stars" role="img" aria-label="{{ block.settings.rating }} out of 5 stars">
            {%- for i in (1..5) -%}<span{% if i > block.settings.rating %} style="opacity:.25"{% endif %}>{% render 'pw-icon', icon: 'star', px: 20 %}</span>{%- endfor -%}
          </span>
          {%- if block.settings.title != blank -%}<p class="pw-review__title">{{ block.settings.title }}</p>{%- endif -%}
          <p class="pw-review__quote">{{ block.settings.quote | newline_to_br }}</p>
          <div class="pw-review__who">
            <span class="pw-review__avatar" aria-hidden="true">{{ block.settings.name | slice: 0 }}</span>
            <span>
              <span class="pw-review__name">{{ block.settings.name }}</span><br>
              <span class="pw-review__meta">
                {%- if block.settings.verified -%}{% render 'pw-icon', icon: 'check-circle', px: 15 %}{{ section.settings.verified_label }}{%- endif -%}
                {%- if block.settings.detail != blank -%}{% if block.settings.verified %} · {% endif %}{{ block.settings.detail }}{%- endif -%}
              </span>
            </span>
          </div>
        </article>
      {%- endfor -%}
    </div>
  </div>
</section>
{%- endif -%}
''', {
    "name": "Pawlio · Reseñas",
    "tag": "div",
    "class": "pw-section",
    "disabled_on": DIS,
    "settings": [
        {"type": "paragraph", "content": "Usa solo reseñas REALES de clientes (con su permiso para usar la foto de su perro). Las reseñas inventadas están prohibidas por la FTC. También puedes añadir el bloque de tu app de reseñas (ej. Judge.me)."},
    ] + head("Real dogs. Real parents.", "Loved by <em>happy pups</em>", None) + [
        {"type": "text", "id": "summary", "label": "Resumen (ej. 4.9/5 from 120 reviews) — solo números reales"},
        {"type": "text", "id": "verified_label", "label": "Texto de comprador verificado", "default": "Verified buyer"},
    ] + design("white", 88, 88, 46, 18, "center"),
    "blocks": [
        {"type": "@app"},
        {"type": "review", "name": "Reseña", "settings": [
            {"type": "image_picker", "id": "image", "label": "Foto del perro del cliente"},
            {"type": "range", "id": "rating", "label": "Estrellas", "min": 1, "max": 5, "step": 1, "default": 5},
            {"type": "text", "id": "title", "label": "Título de la reseña"},
            {"type": "textarea", "id": "quote", "label": "Reseña (texto real del cliente)", "default": "Paste a real customer review here."},
            {"type": "text", "id": "name", "label": "Nombre del cliente", "default": "Customer name"},
            {"type": "text", "id": "detail", "label": "Detalle (ej. Golden Retriever owner)"},
            {"type": "checkbox", "id": "verified", "label": "Compra verificada", "default": True}]}],
    "presets": [{"name": "Pawlio · Reseñas"}],
})

# ---------------------------------------------------------------- DOG GALLERY
write('pw-gallery', r'''
{%- render 'pw-section-style' -%}
{%- style -%}
  #shopify-section-{{ section.id }} .pw-dogs { --pw-speed: {{ section.settings.speed }}s; }
{%- endstyle -%}
<section class="pw pw-on-{{ section.settings.bg }}">
  <div class="pw-container">
    {%- render 'pw-head' -%}
  </div>
  {%- if section.blocks.size > 0 -%}
    <div class="pw-dogs pw-reveal">
      {%- for n in (1..2) -%}
        <div class="pw-dogs__track"{% if n == 2 %} aria-hidden="true"{% endif %}>
          {%- for block in section.blocks -%}
            <figure class="pw-dog" {% if n == 1 %}{{ block.shopify_attributes }}{% endif %}>
              <div class="pw-dog__img pw-media">
                {%- render 'pw-image', image: block.settings.image, fallback: block.settings.image_url, sizes: '(min-width: 990px) 22vw, 60vw', alt: block.settings.caption -%}
              </div>
              {%- if block.settings.caption != blank -%}
                <figcaption class="pw-dog__cap">{% render 'pw-icon', icon: 'paw-solid', px: 14 %}{% render 'pw-t', t: block.settings.caption %}</figcaption>
              {%- endif -%}
            </figure>
          {%- endfor -%}
        </div>
      {%- endfor -%}
    </div>
  {%- endif -%}
  {%- if section.settings.button_label != blank -%}
    <div class="pw-container"><div class="pw-actions pw-reveal" style="margin-top:36px">
      <a class="pw-btn pw-btn--primary" href="{% render 'pw-cta-url', link: section.settings.button_link %}">{{ section.settings.button_label }} {% render 'pw-icon', icon: 'arrow-right', px: 20, class: 'pw-icon--arrow' %}</a>
    </div></div>
  {%- endif -%}
</section>
''', {
    "name": "Pawlio · Galería perros",
    "tag": "div",
    "class": "pw-section",
    "disabled_on": DIS,
    "max_blocks": 16,
    "settings": head("#PawlioPack", "Made for <em>every kind of pup</em>", "<p>Big or small, couch potato or trail runner — life's better without the itch.</p>") + [
        {"type": "range", "id": "speed", "label": "Velocidad (segundos por vuelta)", "min": 20, "max": 120, "step": 5, "unit": "s", "default": 60},
        {"type": "text", "id": "button_label", "label": "Botón (opcional)"},
        {"type": "url", "id": "button_link", "label": "Enlace del botón"},
    ] + design("cream", 88, 88, 46, 18, "center"),
    "blocks": [{"type": "photo", "name": "Foto", "settings": [
        {"type": "image_picker", "id": "image", "label": "Foto"},
        {"type": "text", "id": "image_url", "label": "Enlace de imagen de respaldo"},
        {"type": "text", "id": "caption", "label": "Texto (ej. Beach days)", "default": "Beach days"}]}],
    "presets": [{"name": "Pawlio · Galería perros"}],
})

# ---------------------------------------------------------------- FAQ
write('pw-faq', r'''
{%- render 'pw-section-style' -%}
<section class="pw pw-on-{{ section.settings.bg }}" id="faq">
  <div class="pw-container{% unless section.settings.layout == 'split' %} pw-container--narrow{% endunless %}">
    <div class="pw-faq{% if section.settings.layout == 'split' %} pw-faq--split{% endif %}">
      <div>
        {%- render 'pw-head' -%}
        {%- if section.settings.contact_text != blank -%}
          <p class="pw-faq__contact pw-reveal">{% render 'pw-icon', icon: 'chat', px: 22 %}<span>{{ section.settings.contact_text }} <a href="mailto:{{ section.settings.email | default: shop.email }}">{{ section.settings.email | default: shop.email }}</a></span></p>
        {%- endif -%}
      </div>
      <div class="pw-accordion pw-reveal">
        {%- for block in section.blocks -%}
          <details {{ block.shopify_attributes }}{% if forloop.first and section.settings.open_first %} open{% endif %}>
            <summary>
              <span>{% render 'pw-t', t: block.settings.question %}</span>
              <span class="pw-accordion__toggle" aria-hidden="true">{% render 'pw-icon', icon: 'plus', px: 16, stroke: 2.2 %}</span>
            </summary>
            <div class="pw-accordion__content pw-rte">{% render 'pw-t', t: block.settings.answer %}</div>
          </details>
        {%- endfor -%}
      </div>
    </div>
  </div>
  {%- if section.blocks.size > 0 -%}
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {%- for block in section.blocks -%}
            {%- capture q -%}{% render 'pw-t', t: block.settings.question %}{%- endcapture -%}
            {%- capture a -%}{% render 'pw-t', t: block.settings.answer %}{%- endcapture -%}
            { "@type": "Question", "name": {{ q | strip | json }}, "acceptedAnswer": { "@type": "Answer", "text": {{ a | strip_html | strip | json }} } }{% unless forloop.last %},{% endunless %}
          {%- endfor -%}
        ]
      }
    </script>
  {%- endif -%}
</section>
''', {
    "name": "Pawlio · Preguntas (FAQ)",
    "tag": "div",
    "class": "pw-section",
    "disabled_on": DIS,
    "max_blocks": 20,
    "settings": head("FAQ", "Questions? <em>We've got answers.</em>", None) + [
        {"type": "select", "id": "layout", "label": "Diseño", "options": [
            {"value": "split", "label": "Título a un lado"}, {"value": "stacked", "label": "Título arriba"}], "default": "split"},
        {"type": "checkbox", "id": "open_first", "label": "Primera pregunta abierta", "default": True},
        {"type": "text", "id": "contact_text", "label": "Texto de contacto", "default": "Still wondering? Email us:"},
        {"type": "text", "id": "email", "label": "Correo (vacío = correo de la tienda)"},
    ] + design("cream", 88, 88, 44, 18, "left"),
    "blocks": [{"type": "faq", "name": "Pregunta", "settings": [
        {"type": "text", "id": "question", "label": "Pregunta", "default": "How long does one collar last?"},
        {"type": "richtext", "id": "answer", "label": "Respuesta", "default": "<p>Each collar provides up to [months] months of protection.</p>"}]}],
    "presets": [{"name": "Pawlio · Preguntas (FAQ)", "blocks": [
        {"type": "faq", "settings": {"question": "How long does one collar last?", "answer": "<p>Each collar provides up to [months] months of protection.</p>"}}]}],
})

# ---------------------------------------------------------------- FINAL CTA
write('pw-cta', r'''
{%- render 'pw-section-style' -%}
<section class="pw pw-on-{{ section.settings.bg }}">
  <div class="pw-container">
    <div class="pw-cta pw-reveal">
      <div class="pw-cta__content">
        {%- if section.settings.eyebrow != blank -%}<p class="pw-eyebrow">{% render 'pw-t', t: section.settings.eyebrow %}</p>{%- endif -%}
        <h2 class="pw-h2">{% render 'pw-t', t: section.settings.heading %}</h2>
        {%- if section.settings.text != blank -%}<p class="pw-lead">{% render 'pw-t', t: section.settings.text %}</p>{%- endif -%}
        {%- if section.settings.button_label != blank -%}
          <a class="pw-btn pw-btn--primary pw-btn--shine" href="{% render 'pw-cta-url', link: section.settings.button_link %}">
            {{ section.settings.button_label }} {% render 'pw-icon', icon: 'arrow-right', px: 20, class: 'pw-icon--arrow' %}
          </a>
        {%- endif -%}
        {%- if section.settings.chips != blank -%}
          {%- assign chips = section.settings.chips | newline_to_br | split: '<br />' -%}
          <div class="pw-chips" style="--pw-justify:start">
            {%- for chip in chips -%}{%- assign c = chip | strip -%}{%- if c != blank -%}<span class="pw-chip">{% render 'pw-icon', icon: 'check-circle', px: 17 %}{% render 'pw-t', t: c %}</span>{%- endif -%}{%- endfor -%}
          </div>
        {%- endif -%}
      </div>
      <div class="pw-cta__media pw-media">
        {%- render 'pw-image', image: section.settings.image, fallback: section.settings.image_url, position: section.settings.image_position, sizes: '(min-width: 990px) 45vw, 100vw', alt: section.settings.image_alt -%}
      </div>
    </div>
  </div>
</section>
''', {
    "name": "Pawlio · Llamado final",
    "tag": "div",
    "class": "pw-section",
    "disabled_on": DIS,
    "settings": image_settings("Imagen") + [
        {"type": "text", "id": "image_alt", "label": "Descripción de la imagen", "default": "Happy dog smiling at the camera"},
        {"type": "header", "content": "Textos"},
        {"type": "text", "id": "eyebrow", "label": "Texto pequeño", "default": "Ready when you are"},
        {"type": "inline_richtext", "id": "heading", "label": "Título", "default": "Give your dog <em>months</em> of itch-free days."},
        {"type": "text", "id": "text", "label": "Texto", "default": "Plant-powered. Waterproof. Backed by our [days]-day guarantee."},
        {"type": "text", "id": "button_label", "label": "Botón", "default": "Shop Pawlio"},
        {"type": "url", "id": "button_link", "label": "Enlace del botón"},
        {"type": "textarea", "id": "chips", "label": "Sellos (uno por línea)", "default": "Free shipping on 2+\nCancel anytime"},
    ] + design("cream", 40, 96, 46, 18, "left"),
    "presets": [{"name": "Pawlio · Llamado final"}],
})

print('ok')
