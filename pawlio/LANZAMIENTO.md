# Pawlio · Guía de lanzamiento (paso a paso)

Todo lo que tienes que hacer en Shopify para que la tienda quede lista para
correr anuncios. Hazlo en orden. Tiempo total: ~1 hora.

> El tema ya viene con todo el diseño, los textos en inglés, los bundles, la
> suscripción, el carrito y el footer. Aquí solo conectas tus datos reales.

---

## 1. Subir el tema (5 min)

1. Descarga `pawlio-tema.zip` (te lo mandé en el chat).
2. Shopify → **Online Store → Themes → Add theme → Upload zip file** → elige el ZIP.
3. Cuando cargue, pulsa **Customize** para verlo. Si te gusta: **⋯ → Publish**.

Todo se edita desde **Customize**, sin código: cada sección que empieza con
**"Pawlio ·"** tiene sus textos, fotos, tamaños, colores y espacios.

---

## 2. Ajustes de marca (2 min) — lo más importante

**Customize → ⚙️ Theme settings → Pawlio · Marca**

| Ajuste | Qué poner |
|---|---|
| **Meses de protección de 1 collar** | Lo que diga la etiqueta de TU proveedor (ej. 4 u 8). Cambia sola la promesa en toda la tienda. |
| **Días de garantía** | 60 (o lo que vayas a cumplir de verdad). |
| **Producto principal** | Tu collar. A este producto llevan los botones de la portada. |
| Colores / letra de títulos | Ya vienen configurados. Solo si quieres cambiarlos. |

Los textos usan comodines: `[months]`, `[months2]`, `[months3]`, `[days]`,
`[brand]`. Si escribes "up to [months] months", sale "up to 4 months".

---

## 3. El producto (15 min)

**Products → tu collar**

### Título y descripción
- **Título:** `Pawlio Flea & Tick Collar`
- **Descripción** (pégala en el cuadro grande; sale en la pestaña "What it is"):

```html
<p><strong>Plant-powered flea &amp; tick protection that lasts for months.</strong></p>
<p>Pawlio's slow-release collar surrounds your dog with a plant-powered formula that helps repel fleas and ticks — day and night, rain or shine. No greasy monthly drops. No pills. Just clip it on.</p>
<ul>
<li>Helps repel fleas &amp; ticks for up to 4 months per collar</li>
<li>Plant-derived essential oils — no harsh chemicals</li>
<li>Waterproof: keeps working through baths, swims and rain</li>
<li>One size fits all breeds — adjustable and cut-to-fit</li>
<li>For dogs 12 weeks and older. Dogs only — never use on cats.</li>
</ul>
```

> Cambia "4 months" y los ingredientes por lo que diga TU proveedor.

### Variantes = bundles (esto crea las tarjetas de 1, 2 y 3)
En **Variants → Add options like size or color**:

- Nombre de la opción: **`Pack`** (exacto)
- Valores: **`1 Collar`**, **`2 Collars`**, **`3 Collars`** (exactos, con esa mayúscula)

Precios recomendados:

| Variante | Precio | Compare-at price | Cómo se ve |
|---|---|---|---|
| 1 Collar | **$32.95** | vacío | — |
| 2 Collars | **$49.95** | vacío | "Save 24%", $24.97/collar, MOST POPULAR |
| 3 Collars | **$59.95** | vacío | "Save 39%", $19.98/collar, BEST VALUE |

Deja **Compare-at price vacío**: el tema calcula solo el ahorro contra
comprar collares sueltos (es un ahorro real, no un precio inflado).

- **Track quantity:** apágalo (dropshipping).
- **Fotos:** sube 4–6 fotos del collar (la primera = la mejor, fondo limpio).

### Dropshipping: mapea las cantidades
En tu app de proveedor (DSers, AutoDS, CJ…): **2 Collars = pedir 2 unidades**
y **3 Collars = pedir 3 unidades**. Si no lo haces, alguien paga 3 y le llega 1.

---

## 4. Suscripción automática (10 min)

1. Shopify App Store → instala **Shopify Subscriptions** (gratis, de Shopify).
2. Dentro de la app → **Create subscription plan**:
   - Title: `Subscribe & Save`
   - Delivery frequency: **cada 4 meses** (= lo que dura un collar. Si el collar
     dura 8 meses, pon 8. **No pongas mensual**: le llegarían collares que no
     usa, y eso trae cancelaciones y disputas de tarjeta).
   - Discount: **20% off**
   - Products: tu collar → **todas las variantes** (1, 2 y 3).
3. **Settings → Customer accounts →** usa las cuentas nuevas (*new customer
   accounts*). Así el cliente cancela solo, sin escribirte.
4. **Settings → Policies → Subscription policy**: pega el texto de
   `POLITICAS.md`. Shopify la exige para vender suscripciones.

Resultado en la página: **Subscribe & Save viene marcada** en los 3 bundles.
Si el cliente no quiere, marca "One-time purchase". Debajo del botón sale el
aviso claro de que se renueva sola. Ese aviso se queda: te protege de
disputas de tarjeta y es lo que exige la ley de renovación automática.

> Si no hay plan creado, la página funciona igual (solo compra única).

---

## 5. Envíos (5 min)

**Settings → Shipping and delivery → United States:**

| Tarifa | Condición | Precio |
|---|---|---|
| Free shipping | Pedido ≥ **$45** | $0 |
| Standard | Pedido < $45 | **$4.95** |

La barra "You're $X away from FREE shipping" del carrito usa $45. Si cambias
el monto, cámbialo también en **Theme settings → Pawlio · Carrito**.

---

## 6. Políticas (5 min)

**Settings → Policies:** pega los textos de `POLITICAS.md` (Refund, Shipping,
Subscription). Privacy y Terms: botón **Create from template**. El footer ya
enlaza todas solo.

---

## 7. Páginas y menú (5 min)

**Online Store → Pages → Add page:**

| Título | Plantilla (Theme template) |
|---|---|
| About | `page.about` |
| FAQ | `page.faq` |
| Contact | `page.contact` |

**Online Store → Navigation → Main menu:** Shop (tu producto) · How it works
(`/#pw-how`) · Our story (`/pages/about`) · FAQ · Contact.

---

## 8. Fotos (opcional)

Las fotos de perros ya van **dentro del tema**, optimizadas para celular. No
tienes que subir nada. Si quieres cambiar una: **Customize** → la sección →
**Imagen → Select image**. La que elijas tiene prioridad sobre la del tema.

| Sección | Foto |
|---|---|
| Portada (hero) | golden retriever corriendo |
| Problema | perro rascándose |
| Less scratching | mujer abrazando al doodle |
| Go explore | pastor australiano en el sendero |
| Our story | perro en la playa |
| Llamado final | beagle sonriendo |
| Galería de perros | lab, chihuahua, pitbull, doodle en el carro |

---

## 9. Reseñas reales con fotos (esta semana)

Las reseñas con foto venden 2–4× más que las de solo texto. Pero **no las
inventes**: la FTC multa hasta ~$51,000 por reseña falsa (incluidas las hechas
con IA) y Meta cierra cuentas de anuncios por eso. La forma rápida y legal:

1. Instala **Judge.me** (plan gratis). Envía email pidiendo reseña con foto a
   los 14 días de la entrega. Pon su bloque de estrellas en la caja de compra
   (**Customize → Pawlio · Caja de compra → Add block → Apps**). Las estrellas
   del título aparecen solas cuando haya reseñas.
2. **Primeras 10 reseñas en 7–10 días:** regala collares a 10 amigos, familia
   o vecinos con perros. Pídeles una foto del perro con el collar y su
   opinión honesta. En la reseña pon "Received a free product" (la FTC lo exige).
   Esas fotos sirven también para tus anuncios (UGC real).
3. Pega las mejores en **Pawlio · Reseñas** (sección apagada que ya está en la
   página): foto del perro, estrellas, nombre y texto. Luego actívala (👁️).

---

## 10. Legal del producto (no te lo saltes)

En EE.UU. un collar antipulgas es un **pesticida regulado por la EPA**. Pídele
al proveedor la etiqueta y la lista de ingredientes:

- **Solo aceites esenciales** de la lista de la EPA (clavo, menta, cedro,
  citronela, geraniol…): es "25(b) minimum risk", se puede vender sin registro
  si la etiqueta lista los ingredientes.
- **Químicos** (deltametrina, propoxur, flumetrina…): necesita **número de
  registro EPA**. Sin él, la multa es de hasta ~$24,000 por venta. No lo vendas.

En textos y anuncios: di "helps repel". **Nunca** digas que previene
enfermedades (Lyme, etc.), "vet approved", "EPA approved" ni "kills 100%".
El tema ya está escrito así.

---

## 11. Pixel de Meta (5 min)

App Store → **Facebook & Instagram** (de Meta) → conecta tu Business Manager,
pixel y catálogo → **Data sharing: Maximum** (activa la Conversions API).
Así Meta ve cada Add to cart y cada Purchase.

---

## 12. Antes de gastar $1 en anuncios

- [ ] Compra de prueba real (1 Collar con suscripción) y cancélala desde la cuenta
- [ ] Revisa el celular: bundles, botón verde, carrito, checkout
- [ ] Quita la contraseña de la tienda (**Online Store → Preferences**)
- [ ] Políticas publicadas y enlazadas en el footer
- [ ] Pixel disparando Purchase (Meta Events Manager → Test events)
- [ ] Meses de protección y garantía iguales a los de tu proveedor

---

## Números: cuánto te deja cada venta

Fees de Shopify Payments ≈ 2.9% + $0.30. Ejemplo con collar a **$6 puesto en
casa** (producto + envío del proveedor):

| Pedido | Cobras | Costo | Fees | Te queda |
|---|---|---|---|---|
| 1 Collar (+$4.95 envío) | $37.90 | $6 | $1.40 | **$30.50** |
| 2 Collars, suscripción | $39.96 | $12 | $1.46 | **$26.50** |
| 2 Collars, compra única | $49.95 | $12 | $1.75 | **$36.20** |
| 3 Collars, suscripción | $47.96 | $18 | $1.69 | **$28.27** |
| 3 Collars, compra única | $59.95 | $18 | $2.04 | **$39.91** |

- **Punto de equilibrio:** mientras cada venta te cueste menos de ~$25 en
  anuncios (CPA), ganas desde la primera compra. Cada renovación de
  suscripción es casi pura ganancia (no pagas anuncio otra vez).
- Si tu costo real es distinto, dímelo y te recalculo precios.

---

## Productos de prueba (para ver la tienda llena)

Archivo: **`productos-prueba.csv`** (6 productos con fotos: cama, arnés, correa,
platos plegables, juguetes y cepillo).

1. Shopify → **Products → Import → Add file** → elige `productos-prueba.csv`.
2. Pulsa **Upload and preview** y luego **Import products**. Las fotos tardan
   1–2 minutos en aparecer.
3. Todos llevan la etiqueta `pawlio-test`: cuando no los quieras, filtra por esa
   etiqueta y bórralos de una vez.

Son de prueba: si vas a venderlos de verdad, cambia fotos, precios y textos por
los de tu proveedor.

## Cómo sabe la página qué es el collar

Las secciones del collar (problema, cómo funciona, comparación, suscripción,
historia…) solo salen en productos cuyo **título, tipo o etiqueta tenga la
palabra `flea`**. Cualquier otro producto (cama, arnés…) sale con la página
general: sus viñetas, envío, garantía, preguntas generales y un bloque que
vende también el collar.

- Tu collar debe llamarse, por ejemplo, **Pawlio Flea & Tick Collar**. Si no,
  ponle la etiqueta `flea`.
- Cada sección tiene el ajuste **Visibilidad → "Mostrar solo en productos con
  esta palabra"**: `flea` = solo el collar, `-flea` = todos menos el collar,
  vacío = todos.
