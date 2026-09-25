# Estado del proyecto · Pawlio

- **Tienda:** `vt9vns-xz.myshopify.com` (admin: admin.shopify.com/store/vt9vns-xz)
- **Marca:** Pawlio · producto 1: collar antipulgas y garrapatas (flea & tick collar)
- **Idioma de la tienda:** inglés (EE.UU.). Idioma del dueño: español.
- **Tema:** `pawlio/tema/`, basado en Dawn 16.0.0 (Shopify, Aug 2026) + secciones propias `pw-*`
- **Última entrega:** 2026-09-25 (sesión local), tema **"Pawlio" `#151634804780` subido sin publicar**
  por Admin API (`themeCreate` desde un ZIP en staged upload). 379/379 archivos comprobados.
- **v3 (sesión en la nube, 25/09, unida con la local):** página general para cualquier producto
  (cama, arnés…), fotos dentro del tema, productos de prueba (`productos-prueba.csv`), carrito sin
  `$NaN`. **Subida el 25/09 como tema "Pawlio v3" `#151636148268`, sin publicar** (404/404
  archivos, plantillas comparadas ajuste a ajuste). **Es el que hay que publicar.**
- **Después de regenerar plantillas** con `gen_templates.py`: correr `node herramientas/textos-clip.mjs`
  (busca las frases por contenido, no por id) o vuelven "cut-to-fit", "waterproof" y "$45".
- **Cuenta:** contact.pawlio@gmail.com. El login de temas del CLI (`theme list/push`) está con
  otra cuenta; todo se hizo con `shopify store auth` + `store execute`, que sí funciona.

## Temas en la tienda (25/09)
| Tema | id | Estado |
|---|---|---|
| **Pawlio v3** | 151636148268 | Sin publicar. **El bueno.** Vista previa: `https://vt9vns-xz.myshopify.com/?preview_theme_id=151636148268` |
| Pawlio | 151634804780 | Sin publicar. Versión anterior (sin la v3); queda de respaldo |
| pawlio-tema | 151634018348 | **Publicado y roto**: le faltan `sections/pw-product.liquid`, `templates/index.json` y `templates/product.json` (ver abajo) |
| Horizon, Helio, Pawlio — Preview | — | Sin publicar, antiguos |

**Por qué se rompió el ZIP:** la etiqueta del ajuste `show_rating` de `pw-product` tenía 72
caracteres (máximo de Shopify: 70). Shopify descarta `pw-product.liquid` entero sin avisar, y
con él las dos plantillas que lo usan. Arreglado en el repo. `theme check` no lo detecta.

## Producto real (leído el 25/09) — `gid://shopify/Product/8549411160108`
- Importado de **CJ Dropshipping** (SKUs `CJYD2382878…`). Handle: **`pawlio-flea-tick-collar`**
  (antes `pawlio™-flea-tick-collar-for-dogs`, que redirige al nuevo).
- **No es un collar**: es un **clip de silicona** que se engancha al collar del perro, con
  cápsulas de aceite esencial. Fotos del proveedor con marca **Sindax** y "12 MONTH PROTECTION".
- Costo CJ: 1 ud $10.10 · pack de 3 $22.98 (verde $22.48). Sin envío.
- Copia de cómo estaba: `respaldos/producto-antes-2026-09-25.json`. Fotos: `fotos-producto/`.

**Configurado el 25/09:**
- Opciones `Color` (Dark Pink · Black · Green) × `Pack` (1 Collar · 2 Collars · 3 Collars) = 9 variantes.
- Precios $32.95 / $49.95 / $59.95, compare-at vacío, inventario sin seguimiento.
- `1 Collar` y `3 Collars` conservan el SKU de CJ (1 pcs y 3 pcs). **`2 Collars` es nueva**, con
  SKU propio `PAWLIO-2PK-PINK/BLACK/GREEN`: hay que mapearla en la app de CJ a 2 × la de 1 pcs.
  Se borraron las de 5 pcs.
- **Las 9 variantes están en el almacén `cjdropshipping`** y en la tarifa de CJ (envío gratis).
  Las de 2 nacieron en "Shop location" y salían AGOTADAS al moverlas a la tarifa de CJ (esa tarifa
  no cubre el almacén propio). CJ no deja activar una variante sin SKU; por eso los SKU propios.
- Foto de color asignada a cada variante. Plantilla: la por defecto (`product.json` = `pw-product`).
- Descripción de CJ sustituida por una corta y sin cifras (clip que se engancha al collar).
- Tema: `pw_featured_product` apunta al producto; nuevo ajuste `swatch_colors` en pw-product.

## Marca: nada de Puerto Rico (decidido 25/09)
Carlos pidió que la tienda **no mencione Puerto Rico** en ningún sitio. Quitado de la
historia (portada y ficha), About (hero y misión), pie de página y `POLITICAS.md`.
La foto de la historia (perro en playa con palmeras) se queda: no dice dónde es.
`ADS.md`: el ángulo 8 y el guion del fundador ya no mencionan Puerto Rico.

## Estilo editorial (25/09)
- `pw-image-text` tiene el ajuste **Estilo → Editorial (premium)**: título a peso 380 y 40 px,
  cursiva a 300 del mismo color (no verde), filetes finos en vez del punto, firma en versalitas,
  foto sin sombra. Activado en "Our story" (portada y ficha) y "Why we exist" (About).
- La fuente Fraunces se cargaba **sin cursiva** (el navegador la inclinaba a la fuerza) y sin
  pesos por debajo de 500. Ahora se carga con `ital` y 300–800: todas las cursivas de los títulos
  de la tienda son reales.

## Auditoría antes de anuncios (25/09, por API y escaparate)
- Publicado: todavía `pawlio-tema` (roto). Contraseña: puesta.
- **Pagos: la tienda no muestra ningún método de pago activo** (`shop.enabled_payment_types` vacío).
- **Píxel de Meta: no conectado** (solo los píxeles propios de Shopify).
- Políticas: solo Privacy (y dice "My Store"). Faltan Refund, Shipping, Terms, Contact.
- Páginas: solo Contact. Menú: Home · Catalog · Contact (el de fábrica).
- Envíos: los 9 packs en la tarifa de CJ "General shipping profile" = **gratis siempre**
  (las de 2 Collars habían caído en la general, $8; movidas el 25/09). El tema dice "free
  shipping on 2+ collars" y el carrito cuenta hasta $45: no coincide, aunque a favor del cliente.
- Suscripción: 0 planes, pero la tienda la anuncia (barra, portada, sección).

## Hecho el 25/09 para poder vender
- **Textos adaptados al clip** (`herramientas/textos-clip.mjs`): fuera "cut-to-fit", "Fit & trim",
  "waterproof" (ahora "water-resistant", como dice el envase), pasos nuevos (abrir la lata, engancharlo
  al collar). Meses: **se quedan en 4** a propósito — por debajo de los 12 del envase; la FAQ explica
  "the tin says up to 12 months… we recommend a fresh Pawlio every 4". Se cambia en Pawlio · Marca.
- **Envío gratis en todo** (es lo que cobra la tarifa de CJ): barra, sellos, carrito
  ("Free US shipping is included", umbral 1 $) y pestaña de envío. Nada de "2+ collars".
- **Suscripción**: app oficial **Shopify Subscriptions** instalada. Plan "Subscribe & Save",
  cada 4 meses, 20 %, en las 9 variantes (grupo del app 66228322305). Página "Subscriptions" en la
  cuenta del cliente (menú de cuenta), botón en pedidos y enlace en la página de gracias.
  Precios con suscripción: $26.36 / $39.96 / $47.96. Probado en el carrito.
- **Políticas** (`herramientas/politicas.mjs`): Refund, Shipping, Subscription, Contact publicadas
  con contact.pawlio@gmail.com. Privacy la gestiona Shopify sola (se regenera al renombrar la tienda).
- **Páginas** About (`page.about`) y FAQ (`page.faq`). **Menú**: Shop · How it works · Our story
  · FAQ · Contact. El pie enlaza todas las políticas + "Your Privacy Choices".
- **Producto**: handle limpio con redirección, título y descripción SEO, fuera de la galería las 3
  fotos "5pcs" y el collage de la picadura (desenlazadas, siguen en Content → Files).

## Pendiente del lado del dueño (en este orden)
- [ ] **Activar pagos** (Settings → Payments → Shopify Payments + banco). Sin esto no cobra, y las
      suscripciones solo funcionan con Shopify Payments.
- [ ] **Nombre de la tienda** → "Pawlio" (Settings → General). Arregla pestaña, checkout, correos y privacidad.
- [ ] **Terms of service** → Settings → Policies → Create from template (después de renombrar).
- [ ] **App de CJ**: mapear `PAWLIO-2PK-PINK/BLACK/GREEN` → 2 × la variante de 1 pcs de su color.
      Y apagar la sincronización de precios de CJ si la tiene, o pisará los precios.
- [ ] **Píxel**: app Facebook & Instagram, Data sharing: Maximum.
- [ ] **Dominio**: comprarlo (Settings → Domains), ponerlo como principal y verificarlo en Meta Business.
- [ ] **Publicar "Pawlio v3"** (Online Store → Themes → Publish). El publicado está roto.
- [ ] **Compra de prueba** real con suscripción: comprobar que CJ recibe el pedido y cancelar
      desde la cuenta (Subscriptions). Luego reembolsar.
- [ ] **Quitar la contraseña** (Online Store → Preferences). Lo último.
- [ ] Pedir a CJ la etiqueta con ingredientes (EPA 25(b)). Las fotos del proveedor llevan marca
      Sindax y "NON-TOXIC": no usarlas en anuncios.
- [ ] Reseñas reales (Judge.me + 10 collares regalados)

## Pendiente para la próxima sesión de Claude
1. Revisar la ficha en móvil (con contraseña no se pudo desde el Chrome de escritorio).
2. Fotos de producto propias (las del proveedor llevan marca Sindax y "NON-TOXIC").
3. Si se sube otra versión del tema: hacerlo como tema NUEVO y sin publicar; el publicado no
   se puede tocar desde Claude (el clasificador bloquea escribir en el tema en vivo).

## Decisiones de diseño
- **Paleta:** verde bosque #0E3B2E, verde botón #12833F, crema #FAF6EE, arena #F2EADB,
  menta #E4F3E9, ámbar #F2B33D. Botón de compra verde con brillo animado.
- **Tipografía:** títulos Fraunces (Google Fonts, SOFT 100, peso 650), cuerpo Inter (font_picker).
- **Estructura de venta (producto):** caja de compra → cinta → problema → solución
  → cómo funciona → beneficios → estilo de vida → comparación → aventura
  → suscripción → garantía → galería de perros → reseñas (apagada) → FAQ
  → historia (editorial) → llamado final.
- **Bundles:** variantes de la opción `Pack` como tarjetas; bloque "Tarjeta de bundle"
  por valor. 2 Collars preseleccionado (Most popular). El ahorro se calcula contra
  1 unidad × cantidad (compare-at vacío).
- **Suscripción:** se renderiza desde `selling_plan_groups`; preseleccionada por
  defecto (ajuste `default_purchase`), con aviso de renovación automática bajo el
  botón. Subtítulos distintos en modo suscripción ("Keeps N dogs protected all year").
- **Comodines de texto:** `[months]`, `[months2]`, `[months3]`, `[days]`, `[brand]`
  → snippet `pw-t`. Se cambian en Theme settings → Pawlio · Marca.
- **Reseñas:** sección `pw-reviews` desactivada con 3 bloques de ejemplo. Solo reseñas reales.
- **Imágenes de respaldo:** fotos dentro del tema (`assets/pw-img-*-800.jpg` y `-1600.jpg`),
  nombradas en `image_url`; el `image_picker` de cada sección tiene prioridad.

## Visibilidad por producto (v3)
- `snippets/pw-match.liquid`: devuelve yes/no según una palabra (`flea`) en título, tipo o etiquetas;
  `-flea` = negación. Cada sección `pw-*` tiene el ajuste `show_for`; bloques de viñetas y pestañas también.
- `templates/product.json`: secciones del collar con `show_for: flea` + secciones generales con `-flea`
  (`trust-other`, `faq-other`, `cta-other` que vende el collar).
- `snippets/pw-star-handle.liquid`: producto estrella para botones de la portada (Producto principal
  o el primero con la palabra `pw_star_keyword`, por defecto `flea`).
- Fotos de estilo de vida dentro del tema: `assets/pw-img-*-800.jpg` y `-1600.jpg` (+ `pw-img-hero-m`
  recorte vertical para celular). `image_url` de las plantillas usa esos nombres.
- `productos-prueba.csv`: 6 productos de prueba (etiqueta `pawlio-test`).

## Secciones creadas (`pawlio/tema/sections/`)
| Archivo | Qué hace |
|---|---|
| `pw-product` | Caja de compra: galería, bundles, suscripción, botón verde, confianza, entrega estimada, garantía, pestañas, barra fija |
| `pw-hero` | Portada con foto de fondo, título, 2 botones y sellos |
| `pw-trust-bar` | 4 íconos de confianza |
| `pw-marquee` | Cinta de frases animada |
| `pw-problem` | Problema con foto y datos animados (50 huevos, 95%) |
| `pw-image-text` | Imagen + texto reutilizable (solución, estilo de vida, aventura, historia) |
| `pw-steps` | Cómo funciona en 3 pasos |
| `pw-benefits` | Cuadrícula de beneficios |
| `pw-comparison` | Tabla Pawlio vs. gotas vs. sprays |
| `pw-subscribe` | Explica Subscribe & Save |
| `pw-guarantee` | Sello giratorio de 60 días |
| `pw-gallery` | Cinta de fotos de perros |
| `pw-reviews` | Reseñas con foto (solo reales) + bloque de app |
| `pw-faq` | Preguntas con datos estructurados para Google |
| `pw-cta` | Llamado final |
| `pw-footer` | Footer de marca con boletín, menús, políticas y pagos |
| `pw-cart-trust` | Sellos de confianza en la página del carrito |

Dawn modificado: `layout/theme.liquid` (render `pw-brand-head`), `sections/header.liquid`
(logo de texto Pawlio, sin h1 duplicado), `snippets/cart-drawer.liquid` y
`sections/main-cart-footer.liquid` (barra de envío gratis, botón verde, confianza).

## Cómo validar antes de subir
- `shopify theme check --path pawlio/tema` → 0 errores (hay avisos conocidos: 55 ajustes
  en pw-product, Google Fonts remoto).
- El script de validación estricta y el visor local (LiquidJS + Playwright) están
  descritos en `pawlio/README.md`.
