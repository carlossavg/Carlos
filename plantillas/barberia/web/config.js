/* ==================================================================
   CONFIG.JS — LOS DATOS DE LA PAGINA
   ==================================================================

   NO HACE FALTA ABRIR ESTE ARCHIVO.

   Todo esto se cambia solo, desde EDITOR.html. Dale doble clic al
   EDITOR, llena las cajas y dale a "Descargar mi web lista".

   Si de todas formas quieres mirarlo por dentro: lo que esta entre
   comillas "asi" es texto; lo que lleva // delante son notas.
   No borres las comas ni las llaves { }.

   Si lo editas a mano y se rompe, la pagina te lo dice en pantalla
   al abrirla. Entonces vuelve al EDITOR y descarga otra vez.
   ================================================================== */

/* ================================================================
   ====  CONFIG — TODO EL NEGOCIO SE EDITA AQUÍ  ==================
   ================================================================
   Cambia solo este bloque para personalizar la página completa.
   Los textos con { es, en } aparecen en los dos idiomas.
   ================================================================ */
const CONFIG = {

  /* Nombre de la plantilla. No lo cambies: es lo que usa el editor
     para reconocer tu trabajo cuando vuelves a abrirlo. */
  plantilla: "barberia",

  /* ---------- 1. DATOS DEL NEGOCIO — empieza por aquí ---------- */
  negocio: {
    nombre:      "Barbería Ejemplo",
    slogan:      { es: "Cortes clásicos con precisión moderna.",
                   en: "Classic cuts with modern precision." },
    ciudad:      "San Juan",
    region:      "Puerto Rico",
    pais:        "PR",                       // código de país ISO (para el schema SEO)
    direccion:   "1250 Ave. Ponce de León, San Juan, PR 00907",
    telefono:    "+1 787 555 0142",          // como se muestra en pantalla
    whatsapp:    "+17875550142",             // formato internacional, sin espacios
    email:       "hola@barberiaejemplo.com",
    moneda:      "$",
    sitioWeb:    "https://www.barberiaejemplo.com",

    // Logo del negocio. Déjalo vacío ("") y sale el nombre en letras.
    // Si tienes el logo: mételo en la carpeta img y pon aquí "img/logo.png"
    logo:        "",

    // Zona horaria del LOCAL. Sin esto, el cartel de "Abierto ahora" usaría
    // la hora del visitante y mentiría a quien entre desde otro país.
    // Lista: https://es.wikipedia.org/wiki/Anexo:Zonas_horarias_de_la_base_de_datos_tz
    zonaHoraria: "America/Puerto_Rico",

    // Coordenadas para el SEO local (opcional, deja null si no las tienes)
    geo:   { lat: 18.4496, lng: -66.0654 },

    // Métodos de pago (salen en el schema de Google)
    pagos: ["Efectivo", "Tarjeta de crédito", "Tarjeta de débito", "ATH Móvil"]
  },

  /* ---------- 2. HORARIO ---------- */
  horario: [
    { clave: "lun", abre: "09:00", cierra: "19:00" },
    { clave: "mar", abre: "09:00", cierra: "19:00" },
    { clave: "mie", abre: "09:00", cierra: "19:00" },
    { clave: "jue", abre: "09:00", cierra: "20:00" },
    { clave: "vie", abre: "09:00", cierra: "20:00" },
    { clave: "sab", abre: "08:00", cierra: "18:00" },
    { clave: "dom", abre: null,    cierra: null    }
  ],

  /* ---------- 3. SERVICIOS Y PRECIOS ---------- */
  servicios: [
    { nombre: { es: "Corte clásico",        en: "Classic cut" },
      desc:   { es: "Consulta, lavado, corte a tijera y máquina, y peinado final.",
                en: "Consultation, wash, scissor and clipper cut, and final styling." },
      precio: 25, duracion: 30, destacado: false },

    { nombre: { es: "Corte + barba",        en: "Cut + beard" },
      desc:   { es: "El combo completo: corte a tu medida y barba perfilada con toalla caliente.",
                en: "The full combo: a cut made for you plus a hot-towel beard shape-up." },
      precio: 40, duracion: 55, destacado: true },

    { nombre: { es: "Fade premium",         en: "Premium fade" },
      desc:   { es: "Degradado limpio de piel a punta, trabajado línea por línea.",
                en: "Clean skin-to-top fade, worked line by line." },
      precio: 30, duracion: 40, destacado: false },

    { nombre: { es: "Afeitado clásico",     en: "Classic shave" },
      desc:   { es: "Navaja, toalla caliente y aceites. La experiencia de barbería de siempre.",
                en: "Straight razor, hot towel and oils. The old-school barbershop experience." },
      precio: 28, duracion: 35, destacado: false },

    { nombre: { es: "Arreglo de barba",     en: "Beard trim" },
      desc:   { es: "Perfilado, definición de líneas y acondicionado.",
                en: "Shaping, clean line-up and conditioning." },
      precio: 18, duracion: 25, destacado: false },

    { nombre: { es: "Corte para niños",     en: "Kids cut" },
      desc:   { es: "Menores de 12 años. Con paciencia, calma y buen resultado.",
                en: "Under 12. Patient, calm, and a great result." },
      precio: 20, duracion: 30, destacado: false }
  ],

  /* ---------- 4. EL EQUIPO ---------- */
  barberos: [
    { nombre: "Héctor Rivera",
      rol:          { es: "Barbero principal", en: "Master barber" },
      especialidad: { es: "Fades de piel y diseños a navaja.",
                      en: "Skin fades and razor designs." },
      foto: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80", // [FOTO_BARBERO_1]
      instagram: "https://instagram.com/barberiaejemplo" },

    { nombre: "Luis Ortiz",
      rol:          { es: "Barbero senior",    en: "Senior barber" },
      especialidad: { es: "Barbería clásica y afeitado con navaja.",
                      en: "Classic barbering and straight-razor shaves." },
      foto: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&w=800&q=80", // [FOTO_BARBERO_2]
      instagram: "https://instagram.com/barberiaejemplo" },

    { nombre: "Jean Carlos Méndez",
      rol:          { es: "Barbero",           en: "Barber" },
      especialidad: { es: "Cortes modernos, texturizado y color.",
                      en: "Modern cuts, texturing and color." },
      foto: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80", // [FOTO_BARBERO_3]
      instagram: "https://instagram.com/barberiaejemplo" }
  ],

  /* ---------- 5. LA FOTO GRANDE DE ARRIBA ---------- */
  fotoHero: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1920&q=80", // [FOTO_HERO]

  /* ---------- 6. LAS FOTOS DE LA GALERÍA ----------
     PARA USAR LAS FOTOS DE TU CLIENTE:
     1. Haz una carpeta llamada  img  al lado de este archivo
     2. Mete ahí las fotos: foto-1.jpg, foto-2.jpg...
     3. Cambia el link largo por el nombre corto:
            "https://images.unsplash.com/..."   ->   "img/foto-1.jpg"
     Nombres en minúsculas, sin espacios, sin acentos y sin ñ. */
  galeria: [
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80", // [FOTO_GALERIA_1]
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80",  // [FOTO_GALERIA_2]
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80",  // [FOTO_GALERIA_3]
    "https://images.unsplash.com/photo-1596728325488-58c87691e9af?auto=format&fit=crop&w=800&q=80",  // [FOTO_GALERIA_4]
    "https://images.unsplash.com/photo-1587909209111-5097ee578ec3?auto=format&fit=crop&w=800&q=80",  // [FOTO_GALERIA_5]
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1000&q=80", // [FOTO_GALERIA_6]
    "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=800&q=80",  // [FOTO_GALERIA_7]
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"      // [FOTO_GALERIA_8]
  ],

  /* ---------- 7. LO QUE DICEN LOS CLIENTES ---------- */
  testimonios: [
    { nombre: "Ángel R.", estrellas: 5,
      fecha: { es: "hace 2 semanas", en: "2 weeks ago" },
      texto: { es: "Llevo dos años viniendo y nunca he salido mal. Reservas por WhatsApp y te atienden a la hora exacta.",
               en: "Two years coming here and never a bad cut. You book on WhatsApp and they take you right on time." } },

    { nombre: "Michael T.", estrellas: 5,
      fecha: { es: "hace 1 mes", en: "1 month ago" },
      texto: { es: "El mejor fade que me han hecho en San Juan. Se toman el tiempo y te explican qué te queda bien.",
               en: "Best fade I have had in San Juan. They take their time and tell you what actually suits you." } },

    { nombre: "Carlos V.", estrellas: 5,
      fecha: { es: "hace 3 semanas", en: "3 weeks ago" },
      texto: { es: "Ambiente brutal, música buena y trato de primera. Ahora vengo con mi hijo también.",
               en: "Great vibe, good music and first-class service. Now I bring my son too." } }
  ],

  /* ---------- 8. PREGUNTAS FRECUENTES ---------- */
  faq: [
    { p: { es: "¿Aceptan walk-ins o solo con cita?",
           en: "Do you take walk-ins or appointments only?" },
      r: { es: "Aceptamos walk-ins siempre que haya espacio, pero con cita entras a tu hora y sin esperar. Reserva por WhatsApp y te confirmamos en minutos.",
           en: "We take walk-ins whenever there is room, but with an appointment you are seen on time and skip the wait. Book on WhatsApp and we confirm within minutes." } },

    { p: { es: "¿Qué métodos de pago aceptan?",
           en: "What payment methods do you accept?" },
      r: { es: "Efectivo, tarjetas de débito y crédito, ATH Móvil y pagos móviles. No cobramos cargo extra por pagar con tarjeta.",
           en: "Cash, debit and credit cards, ATH Móvil and mobile payments. No extra fee for paying by card." } },

    { p: { es: "¿Hay estacionamiento?",
           en: "Is there parking?" },
      r: { es: "Sí. Tenemos estacionamiento gratuito al frente del local y estacionamiento de calle en la misma cuadra.",
           en: "Yes. Free parking right in front of the shop plus street parking on the same block." } },

    { p: { es: "¿Cómo funcionan las cancelaciones?",
           en: "What is the cancellation policy?" },
      r: { es: "Puedes cancelar o mover tu cita gratis avisando con 2 horas de anticipación por WhatsApp. Si no avisas dos veces seguidas, la próxima cita se confirma con depósito.",
           en: "Cancel or move your appointment free of charge with 2 hours notice on WhatsApp. After two no-shows in a row, the next booking requires a deposit." } }
  ],

  /* ---------- 9. POR QUÉ ESCOGERNOS ---------- */
  beneficios: [
    { icono: "reloj",
      titulo: { es: "Sin esperas",            en: "No waiting" },
      texto:  { es: "Reservas por WhatsApp y entras a tu hora. Tu tiempo también vale.",
                en: "Book on WhatsApp and walk in on time. Your time matters too." } },
    { icono: "tijera",
      titulo: { es: "Barberos certificados",  en: "Licensed barbers" },
      texto:  { es: "Equipo con licencia y años de experiencia en fades y barbería clásica.",
                en: "A licensed team with years of experience in fades and classic barbering." } },
    { icono: "corona",
      titulo: { es: "Producto premium",       en: "Premium products" },
      texto:  { es: "Trabajamos con marcas profesionales, no con lo más barato del mercado.",
                en: "We use professional brands, not the cheapest thing on the shelf." } },
    { icono: "local",
      titulo: { es: "Ambiente de verdad",     en: "A real atmosphere" },
      texto:  { es: "Música, café y un sitio donde da gusto pasar el rato.",
                en: "Music, coffee, and a place you actually enjoy hanging out in." } }
  ],

  /* ---------- 10. LOS NÚMEROS QUE SE VEN ARRIBA ---------- */
  confianza: {
    anos:         12,        // años de experiencia
    clientes:     8400,      // clientes atendidos
    calificacion: 4.9,       // estrellas en Google
    resenas:      327        // cantidad de reseñas
  },

  /* ---------- 11. ENLACES DE GOOGLE ---------- */
  enlaces: {
    googleReviews:   "https://www.google.com/maps/place/?q=place_id:TU_PLACE_ID",           // ver todas las reseñas
    googleDejarResena:"https://search.google.com/local/writereview?placeid=TU_PLACE_ID",   // dejar reseña nueva
    googleMaps:      "",   // opcional: link directo. Si lo dejas vacío se genera desde la dirección
    googleMapsEmbed: ""    // opcional: iframe propio. Si lo dejas vacío se genera desde la dirección
  },

  /* ---------- 12. REDES SOCIALES ---------- */
  redes: {
    instagram: "https://instagram.com/barberiaejemplo",
    facebook:  "https://facebook.com/barberiaejemplo",
    tiktok:    "https://tiktok.com/@barberiaejemplo"
  },

  /* ---------- 13. EL LOOK — color, tema y letra ----------
     Con estas 3 líneas la misma página se ve distinta para cada cliente.
     Cámbialas y recarga: se ve al momento. */
  estilo: {
    // El color de la marca: botones, precios y detalles.
    // Prueba: #d9b25e dorado · #c0392b rojo · #2c7be5 azul · #27ae60 verde · #8e44ad morado
    acento:      "#d9b25e",

    // El MISMO color pero más oscuro. Solo se usa en el tema claro,
    // para que el texto se lea bien sobre fondo blanco.
    acentoTexto: "#7a5c1f",

    // "oscuro" = negro elegante (barbería, gym, tatuajes, taller)
    // "claro"  = blanco limpio (spa, uñas, dentista, veterinario)
    tema:        "oscuro",

    // "clasica"  = letras anchas en mayúscula. Barbería, gym, taller
    // "elegante" = letra con serifa. Spa, uñas, estética, restaurante
    // "moderna"  = letra redonda y gruesa. Dentista, inmobiliaria, veterinario
    fuente:      "clasica"
  },

  /* ---------- 14. QUÉ SECCIONES SE VEN ----------
     Pon false en la que no quieras y desaparece de la página Y del menú.

     No hace falta tocarlo casi nunca: si vacías una lista (por ejemplo
     borras todos los barberos), esa sección se esconde sola. */
  secciones: {
    porque:      true,   // Por qué escogernos
    galeria:     true,   // Galería de fotos
    equipo:      true,   // Los barberos
    testimonios: true,   // Reseñas
    cita:        true,   // Formulario para pedir cita
    ubicacion:   true,   // Horario y mapa
    faq:         true    // Preguntas frecuentes
  },

  /* ---------- 15. IDIOMA ---------- */
  idioma: {
    porDefecto:  "es",     // "es" o "en": con qué idioma abre la página
    autodetectar: false,   // true = usa el idioma del navegador del visitante
    recordar:     true     // true = recuerda el idioma que eligió el visitante
  },

  /* ---------- 16. TU MARCA EN EL PIE ----------
     Apagado por defecto: tú compraste este template para venderlo a tus
     clientes, y en la página de tu cliente debe ir TU marca, no la mía.
     Pon mostrar:true con el nombre y el enlace de tu agencia para que cada
     página que entregues te traiga tráfico de vuelta. */
  creditos: { mostrar: false, texto: "Tu agencia", url: "" }
};

/* ================================================================
   ====  TEXTOS DE LA INTERFAZ (ES / EN)  =========================
   ================================================================ */
const T = {
  es: {
    nav:{servicios:"Servicios",galeria:"Galería",equipo:"Equipo",resenas:"Reseñas",ubicacion:"Ubicación",faq:"FAQ"},
    cta:{reservar:"Reservar",reservarCita:"Reservar mi cita",whatsapp:"Reserva por WhatsApp",
         verServicios:"Ver servicios",llamar:"Llamar ahora",llamarCorto:"Llamar",
         reservarServicio:"Reservar",reservarCon:"Reservar con"},
    hero:{eyebrow:"Barbería premium",
          titulo:"Cortes de precisión en {ciudad}",
          sub:"Reserva por WhatsApp en 30 segundos. Sin filas, sin esperas y sin cortes que después tengas que arreglar.",
          scroll:"Desliza",
          prueba:"{calificacion} en Google · {resenas} reseñas"},
    confianza:{anos:"Años cortando",clientes:"Clientes atendidos",google:"Calificación en Google"},
    servicios:{eyebrow:"01 — Servicios",titulo:"Precios claros, sin sorpresas",
               sub:"Lo que ves es lo que pagas. Elige tu servicio y reserva directo por WhatsApp.",
               min:"min",popular:"Más pedido"},
    porque:{eyebrow:"02 — Por qué escogernos",titulo:"No es solo un corte",
            sub:"Es salir del local sintiéndote mejor de como entraste."},
    galeria:{eyebrow:"03 — Galería",titulo:"Trabajo reciente",
             sub:"Fades, barbas y cortes hechos en esta silla.",pie:"Toca una foto para ampliarla",
             alt:"Corte de pelo en {nombre}"},
    equipo:{eyebrow:"04 — Equipo",titulo:"Las manos detrás del corte",
            sub:"Barberos con licencia, no aprendices practicando en tu cabeza."},
    resenas:{eyebrow:"05 — Reseñas",titulo:"Lo que dicen nuestros clientes",
             sub:"{calificacion} estrellas con {resenas} reseñas en Google.",
             ver:"Ver todas en Google",dejar:"Déjanos tu reseña"},
    cita:{eyebrow:"06 — Reservar",titulo:"Agenda en 30 segundos",
          sub:"Llena estos cuatro campos y te abrimos WhatsApp con el mensaje ya escrito. Confirmamos tu cita el mismo día.",
          paso1t:"Elige servicio y día",paso1d:"Sin llamadas ni formularios eternos.",
          paso2t:"Te confirmamos por WhatsApp",paso2d:"Respondemos en horario de tienda, normalmente en minutos.",
          paso3t:"Entras a tu hora",paso3d:"Llega 5 minutos antes y listo."},
    form:{nombre:"Nombre",nombrePh:"Tu nombre",telefono:"Teléfono",telefonoPh:"(787) 000-0000",
          servicio:"Servicio",dia:"Día",enviar:"Confirmar por WhatsApp",
          enviando:"Abriendo WhatsApp",
          exito:"Listo. Te abrimos WhatsApp con la cita escrita: solo dale a enviar.",
          nota:"Al enviar se abre WhatsApp con tu cita ya escrita.",
          err:{nombre:"Escribe tu nombre",
               nombreCorto:"Escribe tu nombre completo",
               telefono:"Escribe tu teléfono",
               telefonoCorto:"Ese teléfono está incompleto",
               servicio:"Elige un servicio",
               dia:"Elige el día",
               diaPasado:"Esa fecha ya pasó"}},
    a11y:{saltar:"Saltar al contenido",abrirMenu:"Abrir menú",cerrarMenu:"Cerrar menú",
          idioma:"Cambiar idioma / Change language",anterior:"Foto anterior",
          siguiente:"Foto siguiente",cerrar:"Cerrar",cambiado:"Página en español"},
    visor:{titulo:"Foto ampliada",contador:"Foto {n} de {total}"},
    local:{eyebrow:"07 — Visítanos",titulo:"Horario y ubicación",comoLlegar:"Cómo llegar",
           abierto:"Abierto ahora",cerrado:"Cerrado ahora",cerradoDia:"Cerrado",hoy:"Hoy",
           cargandoMapa:"Cargando mapa",
           cierraEn:"Cierra a las {hora}",abreEn:"Abre {dia} a las {hora}"},
    dias:{lun:"Lunes",mar:"Martes",mie:"Miércoles",jue:"Jueves",vie:"Viernes",sab:"Sábado",dom:"Domingo"},
    faq:{eyebrow:"08 — Preguntas",titulo:"Antes de venir"},
    ctaFinal:{eyebrow:"Tu turno",titulo:"Reserva tu silla en {nombre}",
              sub:"Un mensaje y queda hecho. Te confirmamos el mismo día."},
    footer:{navegar:"Navegar",contacto:"Contacto",derechos:"Todos los derechos reservados.",hecho:"Diseño y desarrollo"},
    msg:{general:"Hola {nombre}, quiero reservar una cita. ¿Qué disponibilidad tienen?",
         servicio:"Hola {nombre}, quiero reservar: {servicio} ({moneda}{precio}). ¿Qué disponibilidad tienen?",
         barbero:"Hola {nombre}, quiero reservar con {barbero}. ¿Qué disponibilidad tiene?",
         cita:"Hola {nombre}, quiero reservar una cita.\n\nNombre: {n}\nTeléfono: {t}\nServicio: {s}\nDía: {d}"}
  },

  en: {
    nav:{servicios:"Services",galeria:"Gallery",equipo:"Team",resenas:"Reviews",ubicacion:"Location",faq:"FAQ"},
    cta:{reservar:"Book now",reservarCita:"Book my appointment",whatsapp:"Book on WhatsApp",
         verServicios:"See services",llamar:"Call now",llamarCorto:"Call",
         reservarServicio:"Book",reservarCon:"Book with"},
    hero:{eyebrow:"Premium barbershop",
          titulo:"Precision cuts in {ciudad}",
          sub:"Book on WhatsApp in 30 seconds. No lines, no waiting, and no haircut you have to fix later.",
          scroll:"Scroll",
          prueba:"{calificacion} on Google · {resenas} reviews"},
    confianza:{anos:"Years cutting",clientes:"Clients served",google:"Google rating"},
    servicios:{eyebrow:"01 — Services",titulo:"Clear prices, no surprises",
               sub:"What you see is what you pay. Pick your service and book straight on WhatsApp.",
               min:"min",popular:"Most booked"},
    porque:{eyebrow:"02 — Why us",titulo:"More than a haircut",
            sub:"It is walking out feeling better than when you walked in."},
    galeria:{eyebrow:"03 — Gallery",titulo:"Recent work",
             sub:"Fades, beards and cuts done in this chair.",pie:"Tap a photo to enlarge",
             alt:"Haircut at {nombre}"},
    equipo:{eyebrow:"04 — Team",titulo:"The hands behind the cut",
            sub:"Licensed barbers, not trainees practicing on your head."},
    resenas:{eyebrow:"05 — Reviews",titulo:"What our clients say",
             sub:"{calificacion} stars across {resenas} Google reviews.",
             ver:"See all on Google",dejar:"Leave us a review"},
    cita:{eyebrow:"06 — Book",titulo:"Book in 30 seconds",
          sub:"Fill in these four fields and we open WhatsApp with the message already written. We confirm the same day.",
          paso1t:"Pick a service and a day",paso1d:"No calls, no endless forms.",
          paso2t:"We confirm on WhatsApp",paso2d:"We reply during shop hours, usually within minutes.",
          paso3t:"Walk in on time",paso3d:"Show up 5 minutes early and you are set."},
    form:{nombre:"Name",nombrePh:"Your name",telefono:"Phone",telefonoPh:"(787) 000-0000",
          servicio:"Service",dia:"Day",enviar:"Confirm on WhatsApp",
          enviando:"Opening WhatsApp",
          exito:"Done. We opened WhatsApp with your booking written out: just hit send.",
          nota:"Submitting opens WhatsApp with your booking already written.",
          err:{nombre:"Enter your name",
               nombreCorto:"Enter your full name",
               telefono:"Enter your phone number",
               telefonoCorto:"That phone number looks incomplete",
               servicio:"Pick a service",
               dia:"Pick a day",
               diaPasado:"That date has already passed"}},
    a11y:{saltar:"Skip to content",abrirMenu:"Open menu",cerrarMenu:"Close menu",
          idioma:"Cambiar idioma / Change language",anterior:"Previous photo",
          siguiente:"Next photo",cerrar:"Close",cambiado:"Page in English"},
    visor:{titulo:"Enlarged photo",contador:"Photo {n} of {total}"},
    local:{eyebrow:"07 — Visit us",titulo:"Hours and location",comoLlegar:"Get directions",
           abierto:"Open now",cerrado:"Closed now",cerradoDia:"Closed",hoy:"Today",
           cargandoMapa:"Loading map",
           cierraEn:"Closes at {hora}",abreEn:"Opens {dia} at {hora}"},
    dias:{lun:"Monday",mar:"Tuesday",mie:"Wednesday",jue:"Thursday",vie:"Friday",sab:"Saturday",dom:"Sunday"},
    faq:{eyebrow:"08 — Questions",titulo:"Before you come"},
    ctaFinal:{eyebrow:"Your turn",titulo:"Book your chair at {nombre}",
              sub:"One message and it is done. We confirm the same day."},
    footer:{navegar:"Explore",contacto:"Contact",derechos:"All rights reserved.",hecho:"Design and development"},
    msg:{general:"Hi {nombre}, I would like to book an appointment. What do you have available?",
         servicio:"Hi {nombre}, I would like to book: {servicio} ({moneda}{precio}). What do you have available?",
         barbero:"Hi {nombre}, I would like to book with {barbero}. What is their availability?",
         cita:"Hi {nombre}, I would like to book an appointment.\n\nName: {n}\nPhone: {t}\nService: {s}\nDay: {d}"}
  }
};
