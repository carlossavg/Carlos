# Plantillas web para negocios locales — GrowthOS

Landings de una sola página hechas para **convertir visitas en citas por WhatsApp**.
Sin frameworks, sin build, sin dependencias.

## Cómo está montado el repo

```
plantillas/<nicho>/
├── LEEME-PRIMERO.txt      la guía que lee el comprador  · igual en todas
├── EDITOR.html            el editor visual              · igual en todas
└── web/                   lo que se sube a Netlify
    ├── index.html         la página entera: HTML, CSS y JS dentro
    ├── config.js          lo único propio de cada plantilla
    ├── netlify.toml       cabeceras de caché y seguridad · igual en todas
    └── robots.txt                                       · igual en todas
```

Ni un archivo más. Las fotos van metidas dentro de `config.js` como
`data:image/...`, no en una carpeta aparte: así el botón "Descargar mi web
lista" puede armar el ZIP entero desde el navegador.

### Las herramientas

| Comando | Qué hace |
|---|---|
| `node revisar-plantillas.js` | Comprueba que todas tienen la misma forma y que **cada dato del config sale como una caja** en el editor |
| `./hacer-zip.sh <nicho>` | Arma el ZIP para vender. Valida el `config.js` y mete una copia de `web/` dentro del `EDITOR.html` |

Para añadir una plantilla nueva: **[PORTAR-PLANTILLA.md](PORTAR-PLANTILLA.md)**.

### Cómo lo vive el comprador

1. Doble clic a `EDITOR.html` → llena cajas normales, arrastra fotos
2. "Ver en vivo" → la página al lado, cambiando mientras escribe
3. "Descargar mi web lista" → **un** ZIP que arrastra a Netlify

Se guarda solo mientras escribe (IndexedDB, por carpeta), así que cerrar la
pestaña no le borra el trabajo.

---

## Lo que hay dentro del config

El comprador no abre esto: lo llena desde `EDITOR.html`. La tabla es para ti,
cuando montes una plantilla nueva.

Esta es la forma de **barbería**; cada nicho tiene la suya, pero las reglas
comunes (`plantilla`, `negocio`, `estilo`, las fotos) son iguales en todas.

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
3. **`plantilla`** — tiene que ser igual que el nombre de la carpeta. Es lo que usa
   el editor para reconocer el trabajo guardado de cada plantilla.

**La consola te avisa.** Abre el inspector (F12) y busca el grupo **"Barbería · revisa CONFIG"**:
lista todo lo que quedó sin personalizar antes de que lo vea el cliente.

**Importante:** edita también el `<head>` del `index.html` (`<title>`, `description` y Open Graph).
El JS los actualiza en el navegador, pero los buscadores y WhatsApp leen el HTML tal cual.
Es lo único fuera de `config.js` que hay que tocar.

La precarga de la foto principal se genera sola desde `CONFIG.fotoHero`.

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

### Las fotos del cliente

El comprador no hace nada de esto a mano. En `EDITOR.html` le da a
**"Elegir foto"** (o la arrastra encima) y el editor se encarga:

- La achica y la comprime hasta dejarla por debajo de 260 KB. Si la foto es
  muy detallada y con bajar la calidad no basta, además le reduce el ancho.
  Una de 2400×1600 y 1.2 MB acaba en 973×649 y 183 KB.
- La mete **dentro** del `config.js` como `data:image/...`.

Por eso no hay carpeta `img`, no hay nombres que cuadrar y no hay nada que
renombrar. Las del celular valen tal cual, con acentos y espacios incluidos.

**Las de ejemplo hay que cambiarlas siempre.** La barra de abajo del editor
las cuenta y no deja publicar tranquilo hasta que se cambien: compara cada
foto con el config original, así que detecta igual las de Unsplash que las
que vienen metidas dentro del archivo.

Si aun así una foto no carga, el hueco muestra un degradado con la etiqueta,
y en local además dice **qué archivo estaba buscando**. La página nunca se
rompe del todo.

### Logo

`CONFIG.negocio.logo` vacío = sale el nombre en letras. Con logo, el editor
lo trata como cualquier otra foto. Que sea PNG con fondo transparente.

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
2. Arrastra la carpeta `web` **completa** (no solo el HTML, o no se ven las fotos)
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
