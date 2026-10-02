#!/usr/bin/env node
// Arma la guía y la imprime a PDF.
//
//   node hacer-pdf.js
//
// 1. Junta guia/secciones/*.html en orden, con los estilos y las fuentes dentro.
// 2. Si en guia/capturas/ hay una foto con el nombre de una figura
//    (por ejemplo d3-objetivo.png), la pone en lugar de la ilustración.
// 3. Imprime una vez para saber en qué página cae cada capítulo,
//    llena el índice con esos números e imprime la versión final.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const RAIZ = __dirname;
const GUIA = path.join(RAIZ, 'guia');
const SECCIONES = path.join(GUIA, 'secciones');
const CAPTURAS = path.join(GUIA, 'capturas');
const HTML = path.join(GUIA, 'guia-completa.html');
const PDF = path.join(RAIZ, 'Tu-primera-campana-en-3-dias.pdf');

const CHROME = [
  process.env.CHROME,
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  '/usr/bin/chromium',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].find(p => p && fs.existsSync(p));

if (!CHROME) {
  console.error('No encuentro Chrome. Pon la ruta en la variable CHROME.');
  process.exit(1);
}

function armar(paginas = {}) {
  // Cada archivo va dentro de su capítulo: así cada página lleva arriba
  // el nombre del capítulo en el que está (ver @page en estilos.css).
  const capitulos = { '01': 'indice', '02': 'intro', '03': 'intro', '10': 'dia1', '20': 'dia2',
    '30': 'dia3', '40': 'despues', '50': 'anexos', '60': 'cierre' };
  const partes = fs.readdirSync(SECCIONES)
    .filter(f => f.endsWith('.html'))
    .sort()
    .map(f => {
      const html = fs.readFileSync(path.join(SECCIONES, f), 'utf8');
      const cap = capitulos[f.slice(0, 2)];
      return cap ? `<div class="cap-${cap}">\n${html}</div>` : html;
    });

  let cuerpo = partes.join('\n');

  // Capturas reales: si existe guia/capturas/<id>.png, sustituye a la ilustración.
  const usadas = [];
  cuerpo = cuerpo.replace(/<figure class="figura" data-captura="([\w-]+)">/g, (todo, id) => {
    const archivo = ['png', 'jpg', 'jpeg', 'webp']
      .map(ext => `${id}.${ext}`)
      .find(n => fs.existsSync(path.join(CAPTURAS, n)));
    if (!archivo) return todo;
    usadas.push(archivo);
    return `<figure class="figura con-captura" data-captura="${id}"><img class="real" src="capturas/${archivo}" alt="">`;
  });

  // Números de página del índice.
  cuerpo = cuerpo.replace(/<span class="pag" data-busca="([^"]+)"><\/span>/g, (todo, busca) =>
    `<span class="pag" data-busca="${busca}">${paginas[busca] || ''}</span>`);

  const estilos = fs.readFileSync(path.join(GUIA, 'fonts', 'fuentes.css'), 'utf8') +
    fs.readFileSync(path.join(GUIA, 'estilos.css'), 'utf8');

  fs.writeFileSync(HTML, `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Tu primera campaña en 3 días</title>
<style>
${estilos}
</style>
</head>
<body>
${cuerpo}
</body>
</html>
`);
  return usadas;
}

function imprimir() {
  execFileSync(CHROME, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--run-all-compositor-stages-before-draw',
    `--print-to-pdf=${PDF}`,
    'file://' + HTML,
  ], { stdio: 'pipe', timeout: 120000 });
}

function paginasDelPdf() {
  const texto = execFileSync('pdftotext', ['-layout', PDF, '-'], { encoding: 'utf8' });
  return texto.split('\f').map(p => p.replace(/\s+/g, ' '));
}

function buscarPaginas() {
  const html = fs.readFileSync(HTML, 'utf8');
  const busquedas = [...html.matchAll(/data-busca="([^"]+)"/g)].map(m => m[1]);
  let paginas;
  try {
    paginas = paginasDelPdf();
  } catch (e) {
    console.warn('Sin pdftotext: el índice sale sin números de página.');
    return {};
  }
  // Se compara sin espacios: pdftotext no siempre separa el número del título.
  const limpia = s => s.replace(/&amp;/g, '&').replace(/\s+/g, '');
  // El índice puede ocupar más de una página: se busca a partir de la
  // primera página de contenido ("PARA EMPEZAR", en mayúsculas).
  const inicioIndice = paginas.findIndex(p => p.includes('Lo que hay dentro'));
  const contenido = paginas.findIndex((p, n) => n > inicioIndice && p.includes('PARA EMPEZAR'));
  const indice = (contenido > 0 ? contenido : inicioIndice + 1) - 1;
  const resultado = {};
  // Las aperturas de cada día repiten los títulos de sus pasos: para los
  // pasos numerados ("1.1 …") se saltan esas páginas.
  const esApertura = p => limpia(p).includes('LOQUEVASAHACER');
  for (const b of busquedas) {
    const t = limpia(b);
    const numerado = /^\d/.test(b);
    const i = paginas.findIndex((p, n) => n > indice && !(numerado && esApertura(p)) && limpia(p).includes(t));
    if (i >= 0) resultado[b] = i + 1;
    else console.warn('No encontré en el PDF:', t);
  }
  return resultado;
}

armar();
imprimir();
const usadas = armar(buscarPaginas());
imprimir();

let total = '?';
try {
  total = execFileSync('pdfinfo', [PDF], { encoding: 'utf8' }).match(/Pages:\s+(\d+)/)[1];
} catch (e) { /* sin pdfinfo */ }

console.log(`Listo: ${path.relative(process.cwd(), PDF)} · ${total} páginas`);
console.log(usadas.length
  ? `Capturas reales usadas: ${usadas.join(', ')}`
  : 'Sin capturas reales todavía: salen las ilustraciones.');
