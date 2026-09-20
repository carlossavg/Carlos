#!/usr/bin/env node
/* ================================================================
   REVISAR TODAS LAS PLANTILLAS

   Comprueba que las plantillas son de verdad la misma cosa por
   dentro: misma carpeta, mismos archivos compartidos, y — lo más
   importante — que TODO dato del config sale como una caja en el
   editor. Si un dato no sale, el comprador no lo puede cambiar.

   Úsalo cada vez que añadas una plantilla nueva:
       node revisar-plantillas.js
   ================================================================ */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { chromium } = require("playwright");

const RAIZ = path.join(__dirname, "plantillas");
const ARCHIVOS = ["LEEME-PRIMERO.txt", "EDITOR.html",
                  "web/index.html", "web/config.js", "web/netlify.toml", "web/robots.txt"];
/* Estos tienen que ser idéntitos en todas: son la regla común. */
const IGUALES  = ["LEEME-PRIMERO.txt", "EDITOR.html", "web/netlify.toml", "web/robots.txt"];

let fallos = 0;
const ok = (c, m) => { console.log((c ? "  ok    " : "  FALLA ") + m); if(!c) fallos++; return c; };
const suma = f => crypto.createHash("md5").update(fs.readFileSync(f)).digest("hex").slice(0, 8);

(async () => {
const plantillas = fs.readdirSync(RAIZ).filter(d => fs.statSync(path.join(RAIZ, d)).isDirectory()).sort();
console.log("Plantillas encontradas: " + plantillas.join(", ") + "\n");

/* ---------- 1. La misma carpeta, ni un archivo de más ---------- */
console.log("=== 1. LA CARPETA ===");
plantillas.forEach(p => {
  const base = path.join(RAIZ, p);
  const faltan = ARCHIVOS.filter(f => !fs.existsSync(path.join(base, f)));
  ok(faltan.length === 0, p + ": están los 6 archivos" + (faltan.length ? " — faltan " + faltan.join(", ") : ""));
  const sobran = [];
  (function mirar(dir, rel){
    fs.readdirSync(dir).forEach(n => {
      const completo = path.join(dir, n), corto = rel ? rel + "/" + n : n;
      if(fs.statSync(completo).isDirectory()){ mirar(completo, corto); return; }
      if(!ARCHIVOS.includes(corto)) sobran.push(corto);
    });
  })(base, "");
  ok(sobran.length === 0, p + ": no sobra ningún archivo" + (sobran.length ? " — sobran " + sobran.join(", ") : ""));
});

/* ---------- 2. Los archivos compartidos son el mismo ---------- */
console.log("\n=== 2. LO QUE TIENE QUE SER IGUAL EN TODAS ===");
IGUALES.forEach(f => {
  const sumas = plantillas.map(p => suma(path.join(RAIZ, p, f)));
  ok(new Set(sumas).size === 1, f + " es el mismo archivo en las " + plantillas.length +
     (new Set(sumas).size === 1 ? " (" + sumas[0] + ")" : " — hay " + new Set(sumas).size + " versiones distintas"));
});

/* ---------- 3. El config ---------- */
console.log("\n=== 3. EL CONFIG ===");
plantillas.forEach(p => {
  const txt = fs.readFileSync(path.join(RAIZ, p, "web/config.js"), "utf8");
  let CONFIG, T;
  try { ({CONFIG, T} = new Function(txt + "; return {CONFIG, T};")()); }
  catch(e){ ok(false, p + ": el config.js no se puede leer — " + e.message); return; }
  ok(!!CONFIG && !!T, p + ": tiene CONFIG y T");
  ok(CONFIG && CONFIG.plantilla === p, p + ": se identifica como \"" + (CONFIG||{}).plantilla + "\"");
  ok(!!(CONFIG && CONFIG.negocio && CONFIG.negocio.nombre), p + ": tiene negocio.nombre");
  ok(!!(CONFIG && CONFIG.estilo), p + ": los colores están en estilo (para que no salgan en el editor)");
});

/* ---------- 4. La página ---------- */
console.log("\n=== 4. LA PÁGINA ===");
plantillas.forEach(p => {
  const h = fs.readFileSync(path.join(RAIZ, p, "web/index.html"), "utf8");
  const fuera = [...h.matchAll(/<script[^>]*\ssrc=["']([^"']+)/g)].map(m => m[1])
    .concat([...h.matchAll(/<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)/g)].map(m => m[1]))
    .filter(u => u !== "config.js");
  ok(fuera.length === 0, p + ": no depende de archivos sueltos" + (fuera.length ? " — pide " + fuera.join(", ") : ""));
  ok(/typeof CONFIG === "undefined"/.test(h), p + ": avisa en pantalla si el config se rompe");
  ok(/gws *: *"listo"/.test(h), p + ": habla con la vista previa del editor");
});

/* ---------- 5. Todo se puede editar ---------- */
console.log("\n=== 5. ¿SE PUEDE EDITAR TODO? ===");
const b = await chromium.launch();
for (const p of plantillas) {
  const pg = await b.newPage();
  const errs = [];
  pg.on("pageerror", e => errs.push(e.message));
  await pg.route("**/*", r => r.request().url().startsWith("file:") ? r.continue() : r.abort());
  await pg.goto("file://" + path.join(RAIZ, p, "EDITOR.html"));
  await pg.waitForSelector(".grupo");
  await pg.waitForTimeout(400);

  const r = await pg.evaluate(() => {
    /* Todas las hojas del config que el comprador debería poder tocar */
    const hojas = [];
    (function andar(o, ruta){
      Object.keys(o).forEach(k => {
        if(!ruta.length && OCULTAS.includes(k)) return;   // estilo, idioma, plantilla...
        const v = o[k], r2 = ruta.concat(k);
        if(v !== null && typeof v === "object") andar(v, r2);
        else hojas.push(r2.join("."));
      });
    })(CONFIG, []);

    /* Lo que el editor dibuja de verdad */
    const cajas = new Set();
    document.querySelectorAll("[data-ruta]").forEach(e => cajas.add(e.dataset.ruta));

    /* Un campo bilingüe sale como dos cajas (.es y .en), y una lista
       de textos sale como una caja por posición: las dos cuentan.

       Lo único que a propósito NO se edita es la clave del día
       ("lun", "mar"...). El comprador cambia las horas de cada día;
       el nombre interno lo usa el código y si lo tocara se rompería.
       El día sale escrito como etiqueta, así que lo ve igual. */
    const aPosta = h => /^horario\.\d+\.clave$/.test(h);
    const sinCaja = hojas.filter(h => !cajas.has(h) && !aPosta(h));
    return { total: hojas.length, cajas: cajas.size, sinCaja, grupos: document.querySelectorAll("details.grupo").length };
  });

  ok(r.sinCaja.length === 0,
     p + ": los " + r.total + " datos tienen su caja (" + r.grupos + " secciones)" +
     (r.sinCaja.length ? " — sin caja: " + r.sinCaja.slice(0,6).join(", ") + (r.sinCaja.length>6?" y "+(r.sinCaja.length-6)+" más":"") : ""));
  ok(errs.length === 0, p + ": el editor abre sin errores" + (errs.length ? " — " + errs[0] : ""));
  await pg.close();
}
await b.close();

console.log("\n" + (fallos ? ">>> " + fallos + " FALLOS" : ">>> TODO EN ORDEN — las " + plantillas.length + " plantillas son la misma cosa por dentro"));
process.exit(fallos ? 1 : 0);
})();
