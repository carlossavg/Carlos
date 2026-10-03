# Tu primera campaña en 3 días

Infoproducto de GrowthOS: una guía paso a paso para que un negocio o un
principiante monte y publique su primera campaña en Facebook e Instagram en
3 días, y entienda lo que está pasando.

## Lo que hay aquí

| Archivo | Qué es |
|---|---|
| `Tu-primera-campana-en-3-dias.pdf` | **La guía**, lista para entregar. 76 páginas. |
| `extras/Hoja-de-resultados.xlsx` | La hoja que va con la guía: calcula la línea roja y dice qué anuncio apagar. |
| `VENDER-GUIA.md` | Precio, entrega, página de venta y cómo lanzarla. |
| `VENDER-EN-X.md` | Cómo venderla en X: 10 ángulos con el post listo, un hilo, el plan de 2 semanas, y cuándo usar videos o anuncios. |
| `VIDEOS.md` | Los 8 videos que conviene grabar después, con su guion. |
| `CAPTURAS.md` | Las 11 capturas reales que puedes poner en lugar de las ilustraciones. |
| `guia/secciones/*.html` | El texto de la guía, una parte por archivo. |
| `guia/estilos.css` | El diseño: carta, papel crema, Fraunces para los títulos e Instrument Sans para leer, columna de notas al margen. |
| `guia/capturas/` | Donde van tus capturas reales. |
| `hacer-pdf.js` | Arma el PDF. |
| `guia/fonts/hacer-fuentes.py` | Saca las versiones fijas de las fuentes (`guia/fonts/fijas/`). Solo hace falta si cambias de fuente. |
| `extras/hacer-hoja.py` | Arma la hoja de Excel. |

## Antes de venderla

- [ ] Confirma que `contact@growthoss.co` recibe correo. Sale en la bienvenida
      (para dudas, “te contestamos en menos de un día laborable”) y en el cierre.
      Si cambias el email, búscalo en `02-bienvenida.html` y `60-cierre.html` y
      vuelve a armar el PDF (abajo).
- [ ] Léela entera una vez en el celular.
- [ ] Opcional: pon tus capturas reales (`CAPTURAS.md`).

## Cómo se vuelve a armar el PDF

Cada vez que cambies un texto o pongas una captura:

```bash
cd guia-anuncios-3-dias
node hacer-pdf.js
```

Necesita Node y Chrome (o Chromium). Imprime dos veces: la primera para
saber en qué página cae cada capítulo y la segunda con el índice lleno.

Si no quieres tocar la terminal, pídele a Claude: *"cambia tal cosa en la
guía y vuelve a armar el PDF"*.

La hoja de Excel se rehace con `python3 extras/hacer-hoja.py` (necesita
`openpyxl`).

## Cómo está escrita

- Como le hablarías a un amigo con negocio: de tú, frases cortas, palabras
  de todos los días y una comparación de la vida diaria para cada palabra
  técnica (el taxi para el objetivo, el GPS para Advantage+, la cámara en la
  puerta para el píxel).
- Dos ejemplos inventados que se siguen de principio a fin: **Luis**, barbero
  en Caguas (WhatsApp), y **María**, que sella techos en Bayamón (formulario).
- En el 4.6 cuento que trabajo contestando mensajes de clientes en una
  tienda de muebles. Si no quieres que salga, cámbialo en
  `guia/secciones/40-despues.html`.
- Cada paso dice dónde tocar, con el nombre del botón tal como sale en
  pantalla.
- Para que la termine de verdad: una **hoja de trabajo** para llenar al final
  del Día 2, la **receta** del Día 3 (cada ajuste, para Luis y para María,
  en una página), qué hacer si solo tienes celular o te vas a mitad, y qué
  es normal la primera semana.
- Categorías especiales: vivienda es vender o alquilar casas, hipotecas,
  tasaciones y seguros de casa. Arreglar casas (techos, plomería, aire,
  placas) **no** entra: María no la declara. Si Meta rechaza un anuncio
  por vivienda, ahí se declara (fuente: "About ads for housing" de Meta).
- Al día a **octubre de 2026**: el flujo único de creación de campañas con
  Advantage+ encendido (febrero de 2026), la segmentación detallada recortada
  y sin exclusiones, la atribución de 7 días después del clic y 1 después de
  ver (enero de 2026), y los tipos de formulario "Más volumen" y "Mayor
  intención".
- Meta cambia botones varias veces al año. Revisa la guía cada 3 o 4 meses
  y cambia la fecha de la edición en `00-portada.html`.
