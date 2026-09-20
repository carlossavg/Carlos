#!/usr/bin/env node
/* ================================================================
   Mete una copia de los archivos de web/ dentro de EDITOR.html.

   Por qué: el comprador abre EDITOR.html con doble clic. Cuando una
   página se abre así (file://), el navegador no la deja leer los
   archivos que tiene al lado. Sin esta copia, el botón
   "Descargar mi web lista" no podría armar el ZIP.

   Lo llama hacer-zip.sh sobre una copia temporal, así que el
   EDITOR.html del repositorio se queda limpio.

   Uso:  node meter-web-en-editor.js <carpeta-de-la-plantilla>
   ================================================================ */
const fs = require("fs");
const path = require("path");

const ADENTRO = ["index.html", "netlify.toml", "robots.txt"];
const OBLIGATORIOS = ["index.html"];

const carpeta = process.argv[2];
if (!carpeta) { console.error("Dime la carpeta: node meter-web-en-editor.js plantillas/barberia"); process.exit(1); }

const rutaEditor = path.join(carpeta, "EDITOR.html");
let editor = fs.readFileSync(rutaEditor, "utf8");

const mapa = {};
for (const nombre of ADENTRO) {
  const ruta = path.join(carpeta, "web", nombre);
  if (!fs.existsSync(ruta)) {
    if (OBLIGATORIOS.includes(nombre)) { console.error("Falta " + ruta); process.exit(1); }
    continue;
  }
  mapa[nombre] = fs.readFileSync(ruta).toString("base64");
}

/* El JSON va dentro de un <script>, así que "</script>" no puede aparecer
   tal cual. En base64 no aparece nunca, pero lo escapamos por si acaso. */
const json = JSON.stringify(mapa).replace(/<\//g, "<\\/");

const hueco = /(<script id="archivosWeb" type="application\/json">)[\s\S]*?(<\/script>)/;
if (!hueco.test(editor)) { console.error("EDITOR.html no tiene el hueco archivosWeb"); process.exit(1); }
editor = editor.replace(hueco, (_, a, b) => a + json + b);

fs.writeFileSync(rutaEditor, editor);

const kb = n => (Buffer.byteLength(mapa[n], "utf8") / 1024).toFixed(0) + " KB";
console.log("   web metida en EDITOR.html: " + Object.keys(mapa).map(n => n + " (" + kb(n) + ")").join(", "));
