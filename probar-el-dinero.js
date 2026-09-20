#!/usr/bin/env node
/* ================================================================
   PROBAR EL CAMINO DEL DINERO

   Lo que de verdad importa de estas páginas: que el visitante pueda
   escribirle al negocio. Se comprueba en las seis:
     · sin WhatsApp puesto no abre ningún chat y avisa en pantalla
     · con WhatsApp abre el chat al número correcto
     · y el mensaje lleva lo que escribió el visitante

   Uso:  node probar-el-dinero.js
   ================================================================ */
const { chromium } = require('playwright');
const path = require('path');
/* Por defecto prueba las plantillas del repositorio. Con CARPETA=<ruta>
   se le puede apuntar a unos ZIP ya descomprimidos. */
const BASE = process.env.CARPETA || path.join(__dirname, 'plantillas');
const ok=(c,m)=>{console.log((c?'  PASA  ':'  FALLA ')+m); return c?0:1;};
let fallos = 0;

const CASOS = [
  {n:'barberia',    porBotones:true},
  {n:'real-estate', porBotones:true},
  {n:'car-wash',    abrir:'[data-book]', form:'#booking-form', estado:'#booking-status',
   campos:{'#vehicle':'Toyota Corolla 2022'}, buscar:'Toyota Corolla'},
  {n:'landscaping', abrir:'[data-contact]', form:'#quote-form', estado:'#status',
   campos:{'#place':'Bayamón','#details':'Patio de atras'}, buscar:'Bayamón'},
  {n:'solar',       abrir:null, form:'#quoteForm', estado:'#formStatus',
   campos:{'[name=name]':'Carlos Vargas','[name=phone]':'7875551234','[name=city]':'Bayamón'},
   marcar:'.consent input[type=checkbox]', buscar:'Carlos Vargas'},
  {n:'plomeria',    abrir:null, form:'#request-form', estado:'#form-status',
   campos:{'[name=name]':'Carlos Vargas','[name=phone]':'7875551234'},
   elegir:['[name=service]', 1], buscar:'Carlos Vargas'},
];

(async () => {
  const b = await chromium.launch();
  for (const c of CASOS) {
    console.log('=== ' + c.n + ' ===');
    const p = await b.newPage({viewport:{width:1280,height:900}});
    const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.route('**/*', r => r.request().url().startsWith('file:') ? r.continue() : r.abort());
    await p.goto('file://' + path.join(BASE, c.n, 'web', 'index.html'), {waitUntil:'load'});
    await p.waitForTimeout(500);

    if (c.porBotones) {
      /* Estas dos reciben por los botones de WhatsApp repartidos por la
         pagina, y ademas guardan el formulario en Netlify. */
      const d = await p.evaluate(() => {
        const wa = [...document.querySelectorAll('a[href*="wa.me"]')];
        return { botones: wa.length,
                 numeros: [...new Set(wa.map(a => (a.href.match(/wa\.me\/(\d+)/)||[])[1]))],
                 conMensaje: wa.filter(a => a.href.includes('text=')).length,
                 form: !!document.querySelector('form[data-netlify]') };
      });
      console.log('    ' + d.botones + ' botones de WhatsApp al ' + d.numeros.join(', '));
      fallos += ok(d.botones >= 3, 'botones de WhatsApp por toda la pagina');
      fallos += ok(d.numeros.length === 1, 'todos al mismo numero, el del config');
      fallos += ok(d.conMensaje === d.botones, 'todos con el mensaje ya escrito');
      fallos += ok(d.form, 'y el formulario ademas guarda en Netlify');
      fallos += ok(errs.length === 0, 'sin errores JS' + (errs.length ? ': ' + errs[0] : ''));
      await p.close();
      continue;
    }
    if (c.abrir) { await p.locator(c.abrir).first().click(); await p.waitForTimeout(250); }
    for (const [sel, val] of Object.entries(c.campos)) await p.fill(sel, val);
    if (c.marcar) await p.check(c.marcar);
    if (c.elegir) await p.selectOption(c.elegir[0], {index: c.elegir[1]});

    // 1. Sin WhatsApp: avisa y no manda nada
    let fue = null;
    await p.route('https://wa.me/**', r => { fue = r.request().url(); r.abort(); });
    await p.evaluate(s => document.querySelector(s).requestSubmit(), c.form);
    await p.waitForTimeout(400);
    fallos += ok(!fue, 'sin WhatsApp no abre ningun chat');
    if (c.estado) {
      const txt = await p.evaluate(s => (document.querySelector(s)||{}).textContent || '', c.estado);
      fallos += ok(/EDITOR\.html|WhatsApp/i.test(txt), 'y avisa en pantalla');
    }

    // 2. Con WhatsApp: abre el chat correcto
    await p.evaluate(() => { CONFIG.negocio.whatsapp = '+17875550142'; });
    await p.evaluate(s => document.querySelector(s).requestSubmit(), c.form);
    await p.waitForTimeout(600);
    fallos += ok(!!fue && /wa\.me\/17875550142/.test(fue), 'con WhatsApp abre el chat al numero correcto');
    if (fue) {
      const msg = decodeURIComponent((fue.split('text=')[1] || ''));
      fallos += ok(msg.includes(c.buscar), 'con lo que escribio el visitante dentro');
      console.log('    ' + JSON.stringify(msg.replace(/\n/g,' | ').slice(0, 95)));
    }
    fallos += ok(errs.length === 0, 'sin errores JS' + (errs.length ? ': ' + errs[0] : ''));
    await p.close();
  }
  await b.close();
  console.log(fallos ? '\n>>> ' + fallos + ' FALLOS' : '\n>>> TODO PASA');
  process.exit(fallos ? 1 : 0);
})();
