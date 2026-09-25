# Estado del proyecto · Pawlio

- **Tienda:** `vt9vns-xz.myshopify.com` (admin: admin.shopify.com/store/vt9vns-xz)
- **Marca:** Pawlio · producto 1: collar antipulgas y garrapatas (flea & tick collar)
- **Idioma de la tienda:** inglés (EE.UU.). Idioma del dueño: español.
- **Tema:** `pawlio/tema/`, basado en Dawn 16.0.0 (Shopify, Aug 2026) + secciones propias `pw-*`
- **Última entrega:** 2026-09-25, ZIP para subir a mano (Online Store → Themes → Upload zip)

## Pendiente del lado del dueño
- [ ] Subir el ZIP y publicar el tema
- [ ] Variantes `Pack` = `1 Collar` / `2 Collars` / `3 Collars` ($32.95 / $49.95 / $59.95)
- [ ] Shopify Subscriptions: plan "Subscribe & Save", cada N meses (= duración del collar), 20%
- [ ] Meses reales de protección y días de garantía en Theme settings → Pawlio · Marca
- [ ] Envío gratis ≥ $45, $4.95 por debajo
- [ ] Políticas (POLITICAS.md), páginas About/FAQ/Contact, menú
- [ ] Verificar con el proveedor: ingredientes y estatus EPA (25(b) o registro)
- [ ] Costo por collar (para recalcular precios)
- [ ] Reseñas reales (Judge.me + 10 collares regalados)

## Pendiente para la próxima sesión de Claude
La sesión del 25/09 no tenía red hacia `*.shopify.com`, `*.myshopify.com` ni el
CDN de Higgsfield (`d8j0ntlcm91z4.cloudfront.net`). En una sesión nueva con
esos dominios permitidos:
1. `shopify theme push --unpublished` (login con código de dispositivo).
2. Leer el producto real (título, fotos, variantes, costo) y ajustar el copy/precios.
3. Descargar las 10 fotos de Higgsfield, optimizarlas y subirlas a Shopify Files;
   cambiar los `image_url` de las plantillas por `image` (image_picker).
4. `shopify store auth` usa callback a 127.0.0.1: desde la nube hay que pegar
   la URL de retorno a mano, o pedir al dueño que haga los pasos del panel.

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
