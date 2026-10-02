# Capturas reales

La guía trae **ilustraciones**: pantallas simplificadas que enseñan dónde
está cada botón. Funcionan, pero una captura de tu propio Administrador de
anuncios se ve más real y da más confianza.

No uses capturas sacadas de internet: son de otras personas (tienen
derechos de autor), muchas están viejas y, en un producto que cobras, te
pueden reclamar. Las tuyas son gratis, están al día y son tuyas.

Te toma una hora. Puedes poner todas o solo algunas: las que no pongas
siguen saliendo como ilustración.

## Cómo se ponen

1. Haz la captura (lista de abajo).
2. Tápale los datos privados: el número de la cuenta publicitaria, la
   tarjeta, tu email, nombres de clientes.
3. Encima, pon **los mismos números** que tiene la ilustración (un círculo
   cian con el número), en el mismo sitio. La leyenda de debajo los
   explica. Se hace en Canva o en la app de Fotos.
4. Guárdala en `guia/capturas/` con **el nombre exacto** de la tabla, en
   PNG o JPG.
5. Vuelve a armar el PDF: `node hacer-pdf.js`. Te dice qué capturas usó.

Cuando tengas todas, cambia en `02-bienvenida.html` la frase "Las pantallas
de esta guía son ilustraciones simplificadas" por "Las pantallas son de
octubre de 2026".

## Consejos

- Pantalla grande, navegador a pantalla completa, zoom al 100%.
- Recorta solo la parte que importa. Que no quede más alta que ancha.
- Usa tu propia cuenta. Puedes capturar todo sin publicar nada: deja la
  campaña en borrador y bórrala al final.
- Ancho mínimo: 1600 píxeles, para que se lea al imprimir.

## La lista

| Archivo | Dónde | Qué tiene que salir |
|---|---|---|
| `d1-portfolio.png` | Meta Business Suite → Configuración → Cuentas publicitarias | El menú de la izquierda y el botón **Agregar** abierto, con "Crear una cuenta publicitaria nueva" |
| `d1-cuenta.png` | La ventana de crear cuenta publicitaria | Nombre, zona horaria y moneda llenos |
| `d1-pixel.png` | Administrador de eventos → Conectar orígenes de datos | La ventana con la opción **Web** |
| `d3-crear.png` | Administrador de anuncios, pestaña Campañas | El nombre de la cuenta arriba, las pestañas y el botón verde **+ Crear** |
| `d3-objetivo.png` | Después de tocar Crear | La ventana con los 6 objetivos y Clientes potenciales marcado |
| `d3-campana.png` | Nivel campaña | Nombre, categorías especiales y presupuesto diario |
| `d3-conversion.png` | Nivel conjunto de anuncios | La sección **Conversión** con las ubicaciones de la conversión |
| `d3-publico.png` | Nivel conjunto de anuncios | El público con tu pueblo y el radio, y las ubicaciones Advantage+ |
| `d3-anuncio.png` | Nivel anuncio | Identidad, formato, textos y la vista previa a la derecha |
| `d3-formulario.png` | Destino → Crear formulario | El tipo de formulario y las preguntas, con la vista previa |
| `d4-columnas.png` | Administrador de anuncios, pestaña Anuncios | Tus columnas guardadas con un par de anuncios (tapa los nombres si son de un cliente) |
