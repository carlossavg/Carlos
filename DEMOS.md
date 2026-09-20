# Las demos publicadas

Las seis páginas funcionando. Son los links que van en los
*"Míralo funcionando"* de Notion, y los que se ponen en los tweets.

| Plantilla | Se ve como | Dirección |
|---|---|---|
| Barbería | Barbería Ejemplo | https://superb-croissant-c02202.netlify.app |
| Bienes raíces | Luxira | https://gleeful-basbousa-d75c6a.netlify.app |
| Car wash | OBSIDIAN | https://gleeful-selkie-096b34.netlify.app |
| Landscaping | VERDANT | https://moonlit-pudding-b340cc.netlify.app |
| Paneles solares | solara | https://friendly-conkies-4bfa8b.netlify.app |
| Plomería | Clearflow | https://delicate-gecko-57fab2.netlify.app |

## Cómo se rehace una demo

Los ZIP de Notion **no sirven** para Netlify: el `index.html` va
dentro de la carpeta `web`, así que Netlify no lo encuentra y saca
"Page not found".

El que se arrastra a Netlify se hace así:

```bash
cd plantillas/<nicho>/web
zip -r ../../../DEMO-<Nicho>.zip index.html config.js netlify.toml robots.txt
```

O igual de fácil: abres `EDITOR.html` y le das al botón verde
**Descargar mi web lista**. Ese es exactamente el mismo archivo.

## Si quieres cambiar una demo

Entras a app.netlify.com, abres ese sitio, *Deploys*, y arrastras
el `.zip` nuevo encima. La dirección no cambia, así que no hay que
tocar Notion ni los tweets.
