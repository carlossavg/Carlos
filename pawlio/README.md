# Pawlio · tienda Shopify

Marca de productos para perros. Producto 1: collar antipulgas y garrapatas.

| Archivo | Para qué |
|---|---|
| [`LANZAMIENTO.md`](LANZAMIENTO.md) | **Empieza aquí.** Pasos en Shopify: subir el tema, variantes, suscripción, envíos, políticas, pixel |
| [`ADS.md`](ADS.md) | 8 ángulos de anuncios con copies en inglés, prompts para ChatGPT, guiones de video y cómo lanzar |
| [`POLITICAS.md`](POLITICAS.md) | Textos de Refund, Shipping, Subscription y Contact para pegar en Shopify |
| [`ESTADO.md`](ESTADO.md) | Estado del proyecto y decisiones (para retomar en otra sesión) |
| `tema/` | El tema de Shopify (Dawn 16 + secciones `pw-*`). Se sube como ZIP |
| `herramientas/` | Generadores de secciones/plantillas, validador y visor local |

## Armar el ZIP del tema

```bash
cd pawlio/tema && zip -qr ../pawlio-tema.zip assets config layout locales sections snippets templates LICENSE-DAWN.md
```

## Antes de subir cambios

```bash
shopify theme check --path pawlio/tema     # 0 errores
python3 pawlio/herramientas/validate.py    # "ALL GOOD" (el aviso "unknown sections" viene de Dawn)
```

`herramientas/gen_*.py` escriben `tema/sections/pw-*.liquid` (menos `pw-product`)
y las plantillas JSON. **Si el dueño ya editó la tienda desde el editor de
Shopify, primero haz `shopify theme pull`**: regenerar pisaría sus cambios.

`herramientas/visor/` renderiza las páginas con LiquidJS y datos de prueba y
toma capturas con Playwright (`npm i liquidjs@10`, luego `node render.js` y
`node shot.js product.html pm 390 1100`).
