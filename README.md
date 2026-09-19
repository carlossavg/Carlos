# Landing Page Premium para Barbería — Template

Landing de una sola página, oscura y premium, hecha para **convertir visitas en citas por WhatsApp**.
Un solo archivo (`index.html`). Sin frameworks, sin build, sin dependencias.

---

## Personalizar en 10 minutos

Todo el negocio se edita en el objeto **`CONFIG`**, al inicio del `<script>` (busca `const CONFIG`).
No hace falta tocar nada más abajo.

| # | Bloque en CONFIG | Qué cambias |
|---|---|---|
| 1 | `negocio` | Nombre, slogan, ciudad, dirección, teléfono, WhatsApp, email, moneda |
| 2 | `confianza` | Años, clientes, calificación y número de reseñas |
| 3 | `enlaces` | Google Reviews, dejar reseña, Maps (opcionales) |
| 4 | `redes` | Instagram, Facebook, TikTok (deja `""` para ocultar) |
| 5 | `horario` | Horas de cada día en formato 24h. `null` = cerrado |
| 6 | `servicios` | Nombre, descripción, precio y duración |
| 7 | `beneficios` | Los 4 motivos para escogerlos |
| 8 | `barberos` | Foto, nombre, rol, especialidad, Instagram |
| 9 | `testimonios` | 3 reseñas con estrellas |
| 10 | `galeria` | 6 a 9 fotos de cortes |
| 11 | `fotoHero` | Foto principal |
| 12 | `faq` | Preguntas frecuentes |
| 13 | `idioma` | Idioma inicial y autodetección |
| 14 | `creditos` | Crédito del footer |

### Los tres campos que más se olvidan

1. **`negocio.zonaHoraria`** — el cartel de *Abierto ahora / Cerrado* se calcula con la hora
   del **local**, no con la del visitante. Sin esto, alguien que entre desde España vería
   "abierto" a las 3 de la mañana. Pon la zona del cliente (`America/Puerto_Rico`,
   `America/Mexico_City`, `Europe/Madrid`…).
2. **`negocio.whatsapp`** — formato internacional con código de país y sin espacios:
   `+17875550142`. Si está mal, el botón no abre ningún chat.
3. **El `<link rel="preload">` del `<head>`** — debe llevar la misma URL que `CONFIG.fotoHero`.
   Si no coinciden, la foto principal se descarga dos veces.

**La consola te avisa.** Abre el inspector (F12) y busca el grupo **"Barbería · revisa CONFIG"**:
lista todo lo que quedó sin personalizar antes de que lo vea el cliente.

**Importante:** edita también el `<head>` (`<title>`, `description` y Open Graph). El JS los actualiza
en el navegador, pero los buscadores y WhatsApp leen el HTML tal cual.

### El look: 3 líneas en `CONFIG.estilo`

```js
estilo: {
  acento:      "#d9b25e",   // color de marca: botones, precios, detalles
  acentoTexto: "#7a5c1f",   // el mismo pero más oscuro (solo para tema claro)
  tema:        "oscuro",    // "oscuro" | "claro"
  fuente:      "clasica"    // "clasica" | "elegante" | "moderna"
}
```

Con esas líneas la misma página se ve distinta para cada cliente, que es lo que evita
que dos clientes tuyos tengan la web idéntica.

| Fuente | Tipografía | Para |
|---|---|---|
| `clasica` | Bebas Neue / Manrope | Barbería, gym, taller, tatuajes |
| `elegante` | Playfair Display / Lato | Spa, uñas, estética, restaurante |
| `moderna` | Outfit / Manrope | Dentista, inmobiliaria, veterinario |

**El texto de los botones se calcula solo.** Pon el acento que quieras: el código mide
si el color es claro u oscuro y pone el texto en negro o en blanco, el que se lea mejor.
Verificado en las cuatro combinaciones, todas por encima de 4.5:1.

Los colores base siguen en `:root`, al inicio del `<style>`, por si quieres afinar más.

---

## Fotos

Las de ejemplo vienen de Unsplash y están marcadas: `[FOTO_HERO]`, `[FOTO_GALERIA_1]`…`[FOTO_GALERIA_8]`,
`[FOTO_BARBERO_1]`…`[FOTO_BARBERO_3]`.

**Cámbialas siempre por fotos reales del local.** Las fotos del cliente convierten mucho más que
cualquier banco de imágenes, y además evitan que dos clientes tuyos tengan la misma página.

Si una foto no carga, el espacio muestra un degradado oscuro con dorado y la etiqueta del hueco,
así la página nunca se rompe y sabes cuál falta.

### Usar las fotos del cliente

1. Haz una carpeta `img` al lado del `index.html`
2. Mete ahí las fotos: `hero.jpg`, `foto-1.jpg`, `barbero-1.jpg`
3. En CONFIG cambia el link largo por el corto: `"img/foto-1.jpg"`
4. Sube la carpeta **completa** a Netlify, no solo el HTML

**Nombres en minúscula, sin espacios, sin acentos y sin ñ.** `Foto Barbería 1.JPG` no
carga y no avisa por qué. La consola te marca las que estén mal escritas.

**Bájales el peso antes de meterlas.** Una foto de celular pesa 5 MB y hunde la página.
Pásalas por squoosh.app o tinypng.com hasta dejarlas por debajo de 300 KB.

| Foto | Tamaño | Peso máximo |
|---|---|---|
| Hero | 1920×1080 | 400 KB |
| Galería | 800×800 | 250 KB |
| Equipo | 800×1000 | 250 KB |
| Logo | ~400 de ancho | 100 KB |

### Logo

`CONFIG.negocio.logo` vacío = sale el nombre en letras. Con el logo: mételo en `img/logo.png`
y pon `logo: "img/logo.png"`. Que sea PNG con fondo transparente.

---

## Enlaces de Google

1. Busca el negocio en Google Maps.
2. Consigue el **Place ID** en <https://developers.google.com/maps/documentation/places/web-service/place-id>.
3. Sustituye `TU_PLACE_ID` en `CONFIG.enlaces`:
   - `googleReviews` → ver todas las reseñas
   - `googleDejarResena` → deja la reseña con las estrellas ya abiertas

El mapa y el botón "Cómo llegar" se generan solos desde `negocio.direccion`, no necesitan API key.
Si quieres un mapa concreto, pega tu propio enlace en `googleMapsEmbed`.

---

## Publicar

**Netlify (recomendado, gratis):**
1. Entra a <https://app.netlify.com/drop>
2. Arrastra la carpeta con `index.html`
3. Listo. Conecta el dominio del cliente desde *Domain settings*

El formulario ya trae `data-netlify="true"`, así que **cada cita queda guardada en Netlify Forms**
además de abrir WhatsApp. Las ves en *Forms → cita*. Actívalas en *Site settings → Forms*.

También funciona en Vercel, GitHub Pages, Hostinger o cualquier hosting: es un HTML estático.

---

## Qué trae para convertir

- Botón flotante de WhatsApp siempre visible
- Barra fija en móvil con **Llamar** y **WhatsApp**
- Botón de reservar cada 1–2 secciones
- Cada servicio manda un mensaje de WhatsApp con el servicio y el precio ya escritos
- Cada barbero tiene su propio botón de reserva
- El formulario arma el mensaje completo (nombre, teléfono, servicio y día) y abre WhatsApp

## Técnico

**Idioma**
- Botón **ES / EN** que cambia todos los textos sin recargar
- Al cambiar de idioma no se pierde lo que el visitante ya escribió en el formulario,
  ni la pregunta que tenía abierta, ni se vuelve a cargar el mapa

**SEO**
- Title, meta description, Open Graph y Twitter Card, todos con nombre y ciudad
- Schema `BarberShop` generado desde CONFIG: horario, servicios con precio, reseñas
  individuales, barberos, coordenadas, métodos de pago y enlace al mapa

**Rendimiento**
- El mapa de Google (lo más pesado de la página) solo se carga cuando el visitante se acerca
- `preload` de la foto principal para mejorar el LCP
- Las secciones de abajo no se pintan hasta que hacen falta (`content-visibility`)
- Scroll y barra de progreso en un solo ciclo de pintado (`requestAnimationFrame`)

**Accesibilidad**
- Enlace "saltar al contenido" como primer tabulador
- La galería son botones reales: se recorre con el tabulador y se abre con Enter
- El visor se maneja con flechas y Escape, atrapa el foco mientras está abierto
  y lo devuelve a la foto de origen al cerrar
- Contraste verificado (AA) en todos los textos, incluidos los grises
- Toque mínimo de 44px, foco siempre visible, `aria-live` para anunciar los cambios

**Formulario**
- Validación propia en el idioma activo, con el aviso debajo de cada campo
- Los campos llevan `required` para que sigan protegidos si el JS no carga
- Si el navegador bloquea la ventana emergente, la página navega a WhatsApp igualmente

**Otros**
- Se imprime en una hoja limpia con los datos del local (`Ctrl+P`)
- Aviso visible si el visitante tiene JavaScript desactivado
- Si una foto no carga, queda un degradado con la etiqueta del hueco
- Respeta `prefers-reduced-motion`
- Sin librerías externas: solo Google Fonts

## Antes de entregar

- [ ] `CONFIG` completo con los datos reales
- [ ] `<head>`: title, description y Open Graph con nombre y ciudad
- [ ] Fotos reales del local
- [ ] Place ID de Google puesto
- [ ] Probado el WhatsApp desde un celular
- [ ] Probado el formulario ya publicado
- [ ] Revisado el botón ES / EN
- [ ] Consola sin avisos de "revisa CONFIG"
- [ ] `negocio.zonaHoraria` puesta a la zona del cliente
