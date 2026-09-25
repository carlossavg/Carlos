# Estado del proyecto · Pawlio

- **Tienda:** `vt9vns-xz.myshopify.com` (admin: admin.shopify.com/store/vt9vns-xz)
- **Marca:** Pawlio · producto 1: collar antipulgas y garrapatas (flea & tick collar)
- **Idioma de la tienda:** inglés (EE.UU.). Idioma del dueño: español.
- **Tema:** `pawlio/tema/`, basado en Dawn 16.0.0 (Shopify, Aug 2026) + secciones propias `pw-*`
- **Última entrega:** 2026-09-25 (sesión local), tema **"Pawlio" `#151634804780` subido sin publicar**
  por Admin API (`themeCreate` desde un ZIP en staged upload). 379/379 archivos comprobados.
- **Cuenta:** contact.pawlio@gmail.com. El login de temas del CLI (`theme list/push`) está con
  otra cuenta; todo se hizo con `shopify store auth` + `store execute`, que sí funciona.

## Temas en la tienda (25/09)
| Tema | id | Estado |
|---|---|---|
| **Pawlio** | 151634804780 | Sin publicar. **El bueno.** Vista previa: `https://vt9vns-xz.myshopify.com/?preview_theme_id=151634804780` |
| pawlio-tema | 151634018348 | **Publicado y roto**: le faltan `sections/pw-product.liquid`, `templates/index.json` y `templates/product.json` (ver abajo) |
| Horizon, Helio, Pawlio — Preview | — | Sin publicar, antiguos |

**Por qué se rompió el ZIP:** la etiqueta del ajuste `show_rating` de `pw-product` tenía 72
caracteres (máximo de Shopify: 70). Shopify descarta `pw-product.liquid` entero sin avisar, y
con él las dos plantillas que lo usan. Arreglado en el repo. `theme check` no lo detecta.

## Producto real (leído el 25/09) — `gid://shopify/Product/8549411160108`
- Importado de **CJ Dropshipping** (SKUs `CJYD2382878…`). Handle: `pawlio™-flea-tick-collar-for-dogs`.
- **No es un collar**: es un **clip de silicona** que se engancha al collar del perro, con
  cápsulas de aceite esencial. Fotos del proveedor con marca **Sindax** y "12 MONTH PROTECTION".
- Costo CJ: 1 ud $10.10 · pack de 3 $22.98 (verde $22.48). Sin envío.
- Copia de cómo estaba: `respaldos/producto-antes-2026-09-25.json`. Fotos: `fotos-producto/`.

**Configurado el 25/09:**
- Opciones `Color` (Dark Pink · Black · Green) × `Pack` (1 Collar · 2 Collars · 3 Collars) = 9 variantes.
- Precios $32.95 / $49.95 / $59.95, compare-at vacío, inventario sin seguimiento.
- `1 Collar` y `3 Collars` conservan el SKU de CJ (1 pcs y 3 pcs). **`2 Collars` es nueva y no tiene
  SKU**: hay que mapearla en la app de CJ a 2 × la de 1 pcs. Se borraron las de 5 pcs.
- Foto de color asignada a cada variante. Plantilla: la por defecto (`product.json` = `pw-product`).
- Descripción de CJ sustituida por una corta y sin cifras (clip que se engancha al collar).
- Tema: `pw_featured_product` apunta al producto; nuevo ajuste `swatch_colors` en pw-product.

## Marca: nada de Puerto Rico (decidido 25/09)
Carlos pidió que la tienda **no mencione Puerto Rico** en ningún sitio. Quitado de la
historia (portada y ficha), About (hero y misión), pie de página y `POLITICAS.md`.
La foto de la historia (perro en playa con palmeras) se queda: no dice dónde es.
`ADS.md` aún tiene el ángulo 8 "Born in Puerto Rico" — no usarlo.

## Estilo editorial (25/09)
- `pw-image-text` tiene el ajuste **Estilo → Editorial (premium)**: título a peso 380 y 40 px,
  cursiva a 300 del mismo color (no verde), filetes finos en vez del punto, firma en versalitas,
  foto sin sombra. Activado en "Our story" (portada y ficha) y "Why we exist" (About).
- La fuente Fraunces se cargaba **sin cursiva** (el navegador la inclinaba a la fuerza) y sin
  pesos por debajo de 500. Ahora se carga con `ital` y 300–800: todas las cursivas de los títulos
  de la tienda son reales.

## Pendiente del lado del dueño
- [ ] Revisar la vista previa y **publicar "Pawlio"** (Temas → ⋯ → Publicar). El publicado está roto.
- [ ] Mapear `2 Collars` en la app de CJ (2 × 1 pcs)
- [ ] Decidir los textos: todo el tema habla de un collar que se recorta ("Fit & trim",
      "cut-to-fit", "waterproof"); el producto real es un clip
- [ ] Meses reales de protección (ajuste en 4; la foto del proveedor dice 12)
- [ ] Nombre de la tienda: sigue "My Store" (sale en la pestaña del navegador)
- [ ] Shopify Subscriptions: plan "Subscribe & Save", cada N meses (= duración del collar), 20%
- [ ] Envío gratis ≥ $45, $4.95 por debajo
- [ ] Políticas (POLITICAS.md), páginas About/FAQ/Contact, menú
- [ ] Verificar con el proveedor: ingredientes y estatus EPA (25(b) o registro)
- [ ] Reseñas reales (Judge.me + 10 collares regalados)

## Pendiente para la próxima sesión de Claude
1. Descargar las 10 fotos de Higgsfield, optimizarlas y subirlas a Shopify Files;
   cambiar los `image_url` de las plantillas por `image` (image_picker).
2. Revisar la ficha en móvil (con contraseña no se pudo desde el Chrome de escritorio).

## Decisiones de diseño
- **Paleta:** verde bosque #0E3B2E, verde botón #12833F, crema #FAF6EE, arena #F2EADB,
  menta #E4F3E9, ámbar #F2B33D. Botón de compra verde con brillo animado.
- **Tipografía:** títulos Fraunces (Google Fonts, SOFT 100, peso 650), cuerpo Inter (font_picker).
- **Estructura de venta (producto):** caja de compra → cinta → problema → solución
  → cómo funciona → beneficios → estilo de vida → comparación → aventura
  → suscripción → garantía → galería de perros → reseñas (apagada) → FAQ
  → historia PR → llamado final.
- **Bundles:** variantes de la opción `Pack` como tarjetas; bloque "Tarjeta de bundle"
  por valor. 2 Collars preseleccionado (Most popular). El ahorro se calcula contra
  1 unidad × cantidad (compare-at vacío).
- **Suscripción:** se renderiza desde `selling_plan_groups`; preseleccionada por
  defecto (ajuste `default_purchase`), con aviso de renovación automática bajo el
  botón. Subtítulos distintos en modo suscripción ("Keeps N dogs protected all year").
- **Comodines de texto:** `[months]`, `[months2]`, `[months3]`, `[days]`, `[brand]`
  → snippet `pw-t`. Se cambian en Theme settings → Pawlio · Marca.
- **Reseñas:** sección `pw-reviews` desactivada con 3 bloques de ejemplo. Solo reseñas reales.
- **Imágenes de respaldo:** URLs `_min.webp` de Higgsfield en `image_url` (ajuste de texto);
  el `image_picker` de cada sección tiene prioridad.

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
