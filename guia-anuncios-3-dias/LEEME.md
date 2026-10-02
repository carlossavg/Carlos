# Tu primera campaña en 3 días

Infoproducto de GrowthOS: una guía paso a paso para que un negocio o un
principiante monte y publique su primera campaña en Facebook e Instagram en
3 días, y entienda lo que está pasando.

## Lo que hay aquí

| Archivo | Qué es |
|---|---|
| `Tu-primera-campana-en-3-dias.pdf` | **La guía**, lista para entregar. 60 páginas. |
| `extras/Hoja-de-resultados.xlsx` | La hoja que va con la guía: calcula la línea roja y dice qué anuncio apagar. |
| `VENDER-GUIA.md` | Precio, entrega, página de venta y cómo lanzarla. |
| `VIDEOS.md` | Los 8 videos que conviene grabar después, con su guion. |
| `CAPTURAS.md` | Las 11 capturas reales que puedes poner en lugar de las ilustraciones. |
| `guia/secciones/*.html` | El texto de la guía, una parte por archivo. |
| `guia/estilos.css` | El diseño. |
| `guia/capturas/` | Donde van tus capturas reales. |
| `hacer-pdf.js` | Arma el PDF. |
| `extras/hacer-hoja.py` | Arma la hoja de Excel. |

## Antes de venderla

- [ ] Pon tu número de WhatsApp en `guia/secciones/60-cierre.html`, donde dice `[TU NÚMERO]`.
- [ ] Vuelve a armar el PDF (abajo).
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

- Español neutro con ejemplos de Puerto Rico, de tú, frases cortas.
- Cada paso dice dónde tocar, con el nombre del botón tal como sale en
  pantalla.
- Al día a **octubre de 2026**: el flujo único de creación de campañas con
  Advantage+ encendido (febrero de 2026), la segmentación detallada recortada
  y sin exclusiones, la atribución de 7 días después del clic y 1 después de
  ver (enero de 2026), y los tipos de formulario "Más volumen" y "Mayor
  intención".
- Meta cambia botones varias veces al año. Revisa la guía cada 3 o 4 meses
  y cambia la fecha de la edición en `00-portada.html`.
