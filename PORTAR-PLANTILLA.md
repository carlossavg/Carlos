# Cómo se mete una plantilla nueva en el sistema

Esto es la receta que siguieron car wash y landscaping. Si una
plantilla nueva pasa por aquí, sale igual que las demás: mismo
editor, mismo botón verde, mismo guardado.

Al final se comprueba con `node revisar-plantillas.js`, que no deja
pasar una plantilla que no encaje.

---

## La forma que tienen que tener todas

```
plantillas/<nombre>/
  LEEME-PRIMERO.txt      idéntico en todas
  EDITOR.html            idéntico en todas
  web/
    index.html           la página entera: HTML + CSS + JS dentro
    config.js            lo único propio de cada una
    netlify.toml         idéntico en todas
    robots.txt           idéntico en todas
```

Ni un archivo más. Sin `style.css`, sin `app.js`, sin `assets/`.
Si están sueltos, el botón "Descargar mi web lista" no los mete en
el ZIP y el comprador publica una página rota.

---

## Los pasos

### 1. Ordenar el config en secciones

Una lista plana de 25 claves sale en el editor como 25 cajas
seguidas en un solo bloque. Las secciones son lo que hace el
formulario legible. Reparte los datos así:

```js
const CONFIG = {
  plantilla: "<nombre-de-la-carpeta>",   // tiene que coincidir
  negocio:   { nombre, logo, whatsapp, mensaje, ciudad, direccion, horario },
  portada:   { etiqueta, titulo, descripcion, boton, fotoHero, altHero },
  servicios: [ { ... } ],                // listas = se añade y se quita
  pasos:     [ { ... } ],
  textos:    { ... },                    // los títulos de cada sección
  enlaces:   { mapa, instagram, email },
  estilo:    { acento, ... }             // los colores van AQUÍ
};

const T = { ... };   // los textos fijos, iguales para todos los clientes
```

Reglas que no se saltan:

- **`plantilla`** tiene que ser igual que el nombre de la carpeta.
  Es lo que usa el editor para reconocer el trabajo guardado.
- **Los colores van dentro de `estilo`.** Ese bloque está oculto en
  el editor a propósito: el comprador no los toca.
- **Las fotos**: la clave empieza por `foto` o `logo`, y el valor es
  una imagen metida dentro (`data:image/...`). Nada de `assets/`.
- **El texto que describe una foto** se llama `altHero`,
  `altNosotros`... Si lo llamas `fotoHeroAlt` el editor lo confunde
  con una foto y le pone un botón de "Elegir foto".
- Lo que no deba tocar el comprador va en `T`, no en `CONFIG`.

### 2. Meter el CSS y el JS dentro del index.html

Todo va en un `<style>` y un `<script>` dentro del propio
`index.html`. Lo único que se carga aparte es `config.js`, y va en
el `<head>`:

```html
<script src="config.js"></script>
```

### 3. Que la página se pueda repintar

El JS no puede pintar una sola vez al cargar. Tiene que estar dentro
de una función `pintar()` que se pueda repetir sin duplicar nada —
si no, la vista en vivo no refresca.

- Vaciar las listas antes de rellenarlas: `contenedor.replaceChildren()`
- Los botones fijos se enganchan **una vez**, fuera de `pintar()`
- Esconder y mostrar con `hidden = !hayDatos`, en los dos sentidos
- Si se cambia la marca por un logo, guardar el HTML original para
  poder devolverlo

### 4. Copiar los cuatro trozos comunes

Del final del `index.html` de cualquier plantilla ya hecha:

- El cartel de **config.js roto** (`avisoConfigRoto`)
- El bloque de **vista previa en vivo** (el que manda `gws:"listo"`)

Y tal cual, sin tocar:

```bash
cp plantillas/barberia/EDITOR.html        plantillas/<nombre>/
cp plantillas/barberia/LEEME-PRIMERO.txt  plantillas/<nombre>/
cp plantillas/barberia/web/netlify.toml   plantillas/<nombre>/web/
cp plantillas/barberia/web/robots.txt     plantillas/<nombre>/web/
```

### 5. Ponerle nombre a las secciones en el editor

En `EDITOR.html`, si la plantilla trae secciones o campos nuevos,
añadirlos a los diccionarios `SECCIONES` y `CAMPOS`. Sin eso salen
con el nombre técnico ("tituloServicios" en vez de "Título de los
servicios").

El `EDITOR.html` es **el mismo archivo en todas**: se edita uno y se
copia a las demás.

### 6. Quitar las trampas

Si la plantilla trae un `avisoDemo`, `demoNotice` o parecido:
**fuera**. Si al comprador se le olvida cambiarlo, la web de su
cliente sale publicada con un cartel de "demostración" encima. La
barra de abajo del editor ya avisa de lo que falta.

Si viene en inglés, se traduce entera, incluidos los textos que
estén escritos dentro del HTML.

### 7. Comprobar

```bash
node revisar-plantillas.js    # la estructura y que todo se edite
./hacer-zip.sh <nombre>       # el paquete para vender
```

Y abrirla de verdad en el navegador. El camino que hay que probar
siempre, porque es por donde entra el dinero:

1. Sin WhatsApp puesto: avisa y **no** abre ningún chat
2. Con WhatsApp puesto: abre el chat correcto, con lo que escribió
   el visitante dentro del mensaje
3. Subir una foto pesada y ver que se achica sola y se ve
4. Cerrar la pestaña del editor y volver: tiene que estar todo
