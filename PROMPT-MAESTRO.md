# Prompt maestro — genera el CONFIG de cualquier negocio

Con esto no tienes 10 páginas web. Tienes las que quieras.

Pega este prompt en ChatGPT o Claude, rellena los datos del negocio y te
devuelve el bloque `CONFIG` completo, en español e inglés, listo para pegar
dentro del archivo HTML. Lo que tardabas una hora escribiendo textos, ahora
son dos minutos.

---

## Cómo se usa

1. Copia el prompt de abajo.
2. Rellena los **DATOS DEL NEGOCIO**. Lo que no sepas, déjalo en blanco y se inventa algo coherente que luego confirmas con el cliente.
3. Pega la respuesta en el archivo `index.html`, sustituyendo todo el bloque `const CONFIG = { ... };`.
4. Cambia las fotos y publica.

---

## El prompt

```
Eres un copywriter especializado en conversión para negocios locales.

Voy a darte los datos de un negocio. Tu trabajo es devolverme un objeto
JavaScript llamado CONFIG, completo y listo para pegar en una landing page.

DATOS DEL NEGOCIO
- Tipo de negocio:
- Nombre:
- Ciudad y país:
- Dirección completa:
- Teléfono:
- WhatsApp (con código de país):
- Email:
- Años que lleva abierto:
- Horario:
- Servicios y precios:
- Qué lo hace distinto de la competencia:
- Nombres del equipo (si los sabes):

REGLAS DE ESCRITURA
- Español neutro, válido en Estados Unidos, Latinoamérica y España.
- Directo y humano. Nada de "soluciones integrales", "excelencia" ni
  "líderes en el sector". Escribe como habla la gente.
- Cada texto empuja a reservar. Frases cortas.
- El inglés es una traducción natural, no literal: que suene escrito por
  un nativo, no traducido.
- Los precios van como números, sin símbolo de moneda.
- No inventes datos verificables (calificaciones de Google, número de
  clientes, licencias). Si no te los doy, usa valores prudentes y
  márcalos con el comentario // CONFIRMAR CON EL CLIENTE

QUÉ TIENES QUE DEVOLVER
El objeto CONFIG completo con esta estructura exacta, sin saltarte
ninguna clave:

negocio    → nombre, slogan {es,en}, ciudad, region, pais, direccion,
             telefono, whatsapp, email, moneda, sitioWeb, zonaHoraria,
             geo {lat,lng}, pagos []
confianza  → anos, clientes, calificacion, resenas
enlaces    → googleReviews, googleDejarResena, googleMaps, googleMapsEmbed
redes      → instagram, facebook, tiktok
horario    → 7 entradas {clave, abre, cierra} en formato 24h, null si cierra
servicios  → 6 servicios {nombre{es,en}, desc{es,en}, precio, duracion, destacado}
beneficios → 4 {icono, titulo{es,en}, texto{es,en}}  (icono: reloj|tijera|corona|local)
barberos   → 3 personas {nombre, rol{es,en}, especialidad{es,en}, foto, instagram}
testimonios→ 3 {nombre, estrellas, fecha{es,en}, texto{es,en}}
galeria    → 8 urls de fotos
fotoHero   → 1 url
faq        → 4 {p{es,en}, r{es,en}} sobre: si aceptan sin cita, métodos de
             pago, estacionamiento y política de cancelación
idioma     → porDefecto "es", autodetectar false, recordar true
creditos   → mostrar false, texto "", url ""

DETALLES QUE NO PUEDES FALLAR
- Marca UN servicio con destacado: true. El que más margen deje.
- La zona horaria en formato IANA ("America/Puerto_Rico", "Europe/Madrid").
- El WhatsApp en formato internacional sin espacios: +17875550142
- Las claves del horario son exactamente: lun, mar, mie, jue, vie, sab, dom
- En las fotos deja las urls de ejemplo tal cual y añade al lado el
  comentario del hueco: // [FOTO_HERO], // [FOTO_GALERIA_1], etc.
- Si el negocio no es una barbería, la clave sigue llamándose "barberos"
  pero el contenido es el equipo de ese negocio.

FORMATO DE LA RESPUESTA
Solo el código, empezando por "const CONFIG = {" y terminando en "};".
Sin explicaciones antes ni después.
```

---

## Prompts de apoyo

Úsalos después del maestro, cuando necesites afinar una parte.

### Para subir los precios sin perder al cliente
```
Estos son los servicios y precios de [NEGOCIO]: [PEGA LOS SERVICIOS].
Reescribe las descripciones para que el precio parezca barato al lado de
lo que recibe. No cambies los precios, cambia la percepción. Español neutro,
máximo 2 líneas por servicio.
```

### Para el FAQ que quita el miedo a reservar
```
Eres el dueño de [TIPO DE NEGOCIO] en [CIUDAD]. Dame las 4 dudas reales
que hacen que una persona dude antes de reservar, y responde cada una en
3 líneas, de forma que después de leerla quiera reservar. Nada de
respuestas corporativas.
```

### Para los anuncios de Facebook
```
Escribe 3 anuncios de Facebook para [NEGOCIO], [TIPO] en [CIUDAD].
Objetivo: que reserven por WhatsApp.
Formato: gancho de 1 línea, cuerpo de 3 líneas, llamada a la acción.
Uno con enfoque de dolor, otro de resultado, otro de oferta.
Español neutro, sin emojis en el gancho.
```

### Para el mensaje con el que cierras al dueño
```
Escribe el primer mensaje de Instagram para el dueño de [NEGOCIO] en
[CIUDAD], que tiene una página web mala o no tiene ninguna.
Máximo 4 líneas. Nada de vender en el primer mensaje: el objetivo es que
conteste. Tono de alguien de su misma ciudad, no de vendedor.
```
