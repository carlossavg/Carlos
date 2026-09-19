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

**Importante:** edita también el `<head>` (`<title>`, `description` y Open Graph). El JS los actualiza
en el navegador, pero los buscadores y WhatsApp leen el HTML tal cual.

### Colores y fuentes
Están en `:root`, al inicio del `<style>`:

```css
--oro:#d9b25e;                 /* color de acento */
--negro:#07070a;               /* fondo */
--font-display:'Bebas Neue';   /* títulos */
--font-body:'Manrope';         /* texto */
```

Si cambias de fuente, actualiza también el `<link>` de Google Fonts en el `<head>`.

---

## Fotos

Las de ejemplo vienen de Unsplash y están marcadas: `[FOTO_HERO]`, `[FOTO_GALERIA_1]`…`[FOTO_GALERIA_8]`,
`[FOTO_BARBERO_1]`…`[FOTO_BARBERO_3]`.

**Cámbialas siempre por fotos reales del local.** Las fotos del cliente convierten mucho más que
cualquier banco de imágenes, y además evitan que dos clientes tuyos tengan la misma página.

Si una foto no carga, el espacio muestra un degradado oscuro con dorado y la etiqueta del hueco,
así la página nunca se rompe y sabes cuál falta.

Medidas recomendadas: hero 1920×1080, galería 800×800, barberos 800×1000.

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

- Botón **ES / EN** que cambia todos los textos sin recargar
- SEO: title, meta description, Open Graph, Twitter Card y schema `BarberShop` generado desde CONFIG
- Badge de "Abierto ahora / Cerrado" calculado desde el horario
- Animaciones al hacer scroll, con respeto a `prefers-reduced-motion`
- Accesible: etiquetas reales, `aria-expanded` en el acordeón, foco visible, toque mínimo de 44px
- Sin librerías externas: solo Google Fonts

## Antes de entregar

- [ ] `CONFIG` completo con los datos reales
- [ ] `<head>`: title, description y Open Graph con nombre y ciudad
- [ ] Fotos reales del local
- [ ] Place ID de Google puesto
- [ ] Probado el WhatsApp desde un celular
- [ ] Probado el formulario ya publicado
- [ ] Revisado el botón ES / EN
