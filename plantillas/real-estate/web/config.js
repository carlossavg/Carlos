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

const CONFIG = {

  /* Nombre de la plantilla. No lo cambies: es lo que usa el editor
     para reconocer tu trabajo cuando vuelves a abrirlo. */
  plantilla: "real-estate",

  /* ---------- 1. DATOS DEL NEGOCIO — empieza por aquí ---------- */
  negocio: {
    nombre:      "Luxira",
    slogan:      { es: "Casas que se sienten tuyas desde la primera visita.",
                   en: "Homes that feel yours from the first visit." },
    ciudad:      "San Juan",
    region:      "Puerto Rico",
    pais:        "PR",                        // código de país (para Google)
    direccion:   "1502 Ave. Ashford, San Juan, PR 00907",
    telefono:    "+1 787 555 0190",           // como se ve en pantalla
    whatsapp:    "+17875550190",              // con código de país, sin espacios
    email:       "hola@luxirapr.com",
    moneda:      "$",
    sitioWeb:    "https://www.luxirapr.com",

    // Logo. Déjalo vacío ("") y sale la inicial y el nombre en letras.
    // Para poner uno, súbelo desde EDITOR.html como cualquier foto.
    logo:        "",

    // Zona horaria de la OFICINA. Sin esto, el cartel de "Abierto ahora"
    // usaría la hora del visitante y mentiría a quien entre desde otro país.
    zonaHoraria: "America/Puerto_Rico",

    // Coordenadas para Google (opcional, deja null si no las tienes)
    geo:   { lat: 18.4571, lng: -66.0745 }
  },

  /* ---------- 2. HORARIO (24h; null = cerrado) ---------- */
  horario: [
    { clave: "lun", abre: "09:00", cierra: "18:00" },
    { clave: "mar", abre: "09:00", cierra: "18:00" },
    { clave: "mie", abre: "09:00", cierra: "18:00" },
    { clave: "jue", abre: "09:00", cierra: "19:00" },
    { clave: "vie", abre: "09:00", cierra: "19:00" },
    { clave: "sab", abre: "10:00", cierra: "16:00" },
    { clave: "dom", abre: null,    cierra: null    }
  ],

  /* ---------- 3. LAS PROPIEDADES ----------
     tipo:   "venta" o "alquiler"  (si todas son iguales, los filtros se ocultan solos)
     estado: "disponible", "reservada" o "vendida"
     periodo: solo para alquileres. En venta déjalo en null

     Las fotos de ejemplo vienen de internet. Cámbialas por las
     del cliente desde EDITOR.html: "Elegir foto" y ya. */
  propiedades: [
    { nombre: { es: "Villa Altamar",            en: "Altamar Villa" },
      zona: "Ocean Park", tipo: "venta", estado: "disponible",
      precio: 1250000, periodo: null,
      habitaciones: 4, banos: 3, metros: 320,
      foto: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80" }, // [FOTO_PROPIEDAD_1]

    { nombre: { es: "Residencia Miramar",       en: "Miramar Residence" },
      zona: "Miramar", tipo: "venta", estado: "disponible",
      precio: 685000, periodo: null,
      habitaciones: 3, banos: 2, metros: 210,
      foto: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80" }, // [FOTO_PROPIEDAD_2]

    { nombre: { es: "Ático del Condado",        en: "Condado Penthouse" },
      zona: "Condado", tipo: "venta", estado: "reservada",
      precio: 945000, periodo: null,
      habitaciones: 3, banos: 3, metros: 245,
      foto: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=80" }, // [FOTO_PROPIEDAD_3]

    { nombre: { es: "Apartamento Isla Verde",   en: "Isla Verde Apartment" },
      zona: "Isla Verde", tipo: "alquiler", estado: "disponible",
      precio: 2800, periodo: { es: "/mes", en: "/mo" },
      habitaciones: 2, banos: 2, metros: 115,
      foto: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80" }, // [FOTO_PROPIEDAD_4]

    { nombre: { es: "Casa Santurce",            en: "Santurce House" },
      zona: "Santurce", tipo: "venta", estado: "disponible",
      precio: 420000, periodo: null,
      habitaciones: 3, banos: 2, metros: 165,
      foto: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80" }, // [FOTO_PROPIEDAD_5]

    { nombre: { es: "Loft Viejo San Juan",      en: "Old San Juan Loft" },
      zona: "Viejo San Juan", tipo: "alquiler", estado: "disponible",
      precio: 2150, periodo: { es: "/mes", en: "/mo" },
      habitaciones: 1, banos: 1, metros: 78,
      foto: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80" }  // [FOTO_PROPIEDAD_6]
  ],

  /* ---------- 4. LOS AGENTES ---------- */
  agentes: [
    { nombre: "Valeria Nieves",
      rol: { es: "Corredora principal", en: "Lead broker" },
      foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" }, // [FOTO_AGENTE_1]

    { nombre: "Diego Santana",
      rol: { es: "Ventas y tasación", en: "Sales and appraisal" },
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" }, // [FOTO_AGENTE_2]

    { nombre: "Camila Ferrer",
      rol: { es: "Alquileres", en: "Rentals" },
      foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80" }  // [FOTO_AGENTE_3]
  ],

  /* ---------- 5. LA FOTO GRANDE DE ARRIBA ---------- */
  fotoHero: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80", // [FOTO_HERO]

  /* ---------- 6. LA FOTO DE "SOBRE NOSOTROS" ---------- */
  fotoNosotros: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80", // [FOTO_NOSOTROS]

  /* ---------- 7. LOS NÚMEROS QUE FLOTAN SOBRE LA FOTO ---------- */
  datosHero: [
    { numero: "320+",
      texto: { es: "Familias que ya viven donde querían",
               en: "Families already living where they wanted" } },
    { numero: "18 días",
      texto: { es: "Es lo que tardamos de media en cerrar",
               en: "Our average time to close a deal" } }
  ],

  /* ---------- 8. LO QUE DICEN LOS CLIENTES ---------- */
  testimonios: [
    { nombre: "Ana M.", estrellas: 5,
      fecha: { es: "hace 3 semanas", en: "3 weeks ago" },
      texto: { es: "Nos enseñaron seis casas y en la tercera visita ya sabíamos. Nunca nos presionaron y eso se agradece muchísimo.",
               en: "They showed us six homes and by the third visit we knew. They never pushed us once, and that meant a lot." } },

    { nombre: "Roberto G.", estrellas: 5,
      fecha: { es: "hace 1 mes", en: "1 month ago" },
      texto: { es: "Vendí mi apartamento en tres semanas y por encima de lo que esperaba. Me explicaron cada paso del papeleo.",
               en: "Sold my apartment in three weeks and above what I expected. They walked me through every bit of paperwork." } },

    { nombre: "Lourdes S.", estrellas: 5,
      fecha: { es: "hace 2 meses", en: "2 months ago" },
      texto: { es: "Vengo de fuera y me lo resolvieron todo por WhatsApp antes de aterrizar. Llegué y firmé.",
               en: "I was moving from abroad and they handled everything on WhatsApp before I landed. I arrived and signed." } }
  ],

  /* ---------- 9. PREGUNTAS FRECUENTES ---------- */
  faq: [
    { p: { es: "¿Cobran algo por enseñarme una propiedad?",
           en: "Do you charge to show me a property?" },
      r: { es: "No. Las visitas son gratis y sin compromiso. Solo cobramos comisión cuando la operación se cierra, y te decimos el porcentaje exacto desde el primer día.",
           en: "No. Visits are free with no strings attached. We only charge commission when the deal closes, and you know the exact percentage from day one." } },

    { p: { es: "¿Me ayudan con el préstamo del banco?",
           en: "Do you help with the mortgage?" },
      r: { es: "Sí. Trabajamos con varios bancos de la isla y te acompañamos con los papeles hasta la precualificación. No cobramos nada extra por eso.",
           en: "Yes. We work with several banks on the island and walk you through the paperwork up to pre-qualification. No extra charge." } },

    { p: { es: "Quiero vender mi casa, ¿por dónde empiezo?",
           en: "I want to sell my home, where do I start?" },
      r: { es: "Escríbenos por WhatsApp con la dirección y unas fotos. Te damos una tasación orientativa en 48 horas y sin compromiso.",
           en: "Message us on WhatsApp with the address and a few photos. We'll give you a ballpark valuation within 48 hours, no strings attached." } },

    { p: { es: "Vivo fuera de Puerto Rico, ¿puedo comprar desde allá?",
           en: "I live outside Puerto Rico, can I buy from there?" },
      r: { es: "Sí, lo hacemos a menudo. Hacemos videollamada desde la propiedad, te mandamos todo por WhatsApp y el cierre se puede firmar a distancia con poder notarial.",
           en: "Yes, we do it often. We video-call you from the property, send everything on WhatsApp, and closing can be signed remotely with power of attorney." } }
  ],

  /* ---------- 10. POR QUÉ ESCOGERNOS ---------- */
  ventajas: [
    { titulo: { es: "Te acompañamos de verdad",  en: "We actually walk with you" },
      texto:  { es: "Desde la primera visita hasta la firma. Sin desaparecer a mitad de camino.",
                en: "From the first visit to the signing. We don't vanish halfway through." } },
    { titulo: { es: "Conocemos cada barrio",     en: "We know every neighborhood" },
      texto:  { es: "Te decimos lo bueno y lo malo de la zona antes de que firmes nada.",
                en: "We tell you the good and the bad about the area before you sign anything." } },
    { titulo: { es: "Precios sin cuentos",       en: "Honest pricing" },
      texto:  { es: "Si una casa está sobrevalorada, te lo decimos aunque perdamos la venta.",
                en: "If a home is overpriced, we'll say so even if it costs us the sale." } }
  ],

  /* ---------- 11. CON QUIÉN TRABAJAS (deja [] para ocultarlo) ---------- */
  socios: ["Banco Popular", "First Bank", "Oriental"],

  /* ---------- 12. LOS NÚMEROS QUE SE VEN ARRIBA ---------- */
  confianza: {
    desde:        2012,   // año en que abrieron
    anos:         13,     // años de experiencia
    operaciones:  320,    // casas vendidas o alquiladas
    calificacion: 4.9,    // estrellas en Google
    resenas:      214     // cantidad de reseñas
  },

  /* ---------- 13. ENLACES DE GOOGLE ---------- */
  enlaces: {
    googleReviews:    "https://www.google.com/maps/place/?q=place_id:TU_PLACE_ID",
    googleDejarResena:"https://search.google.com/local/writereview?placeid=TU_PLACE_ID",
    googleMaps:      "",   // opcional. Vacío = se genera desde la dirección
    googleMapsEmbed: ""    // opcional. Vacío = se genera desde la dirección
  },

  /* ---------- 14. REDES SOCIALES (deja "" para ocultar) ---------- */
  redes: {
    instagram: "https://instagram.com/luxirapr",
    facebook:  "https://facebook.com/luxirapr",
    linkedin:  "https://linkedin.com/company/luxirapr"
  },

  /* ---------- 15. EL LOOK — color, tema y letra ----------
     Con estas líneas la misma página se ve distinta para cada cliente.
     Cámbialas y refresca: se ve al momento. */
  estilo: {
    // El color de la marca: botones, precios y detalles.
    // Prueba: #b08d57 dorado · #2f5d50 verde bosque · #2c4a7c azul marino · #8c3b3b vino
    acento:      "#b08d57",

    // El MISMO color pero más oscuro. Se usa para el texto sobre fondo claro.
    acentoTexto: "#7d6234",

    // El mismo pero más CLARO. Solo se usa en el tema oscuro.
    acentoClaro: "#d3b177",

    // "claro"  = crema y blanco, elegante (lo normal en bienes raíces)
    // "oscuro" = negro y dorado, para propiedades de lujo
    tema:        "claro",

    // "elegante" = letra con serifa, tipo revista (la de la foto)
    // "clasica"  = serifa más fina y estirada
    // "moderna"  = letra redonda y gruesa, más actual
    fuente:      "elegante"
  },

  /* ---------- 16. QUÉ SECCIONES SE VEN ----------
     Pon false en la que no quieras y desaparece de la página Y del menú.
     Si vacías una lista, esa sección se esconde sola. */
  secciones: {
    nosotros:    true,
    equipo:      true,
    propiedades: true,
    testimonios: true,
    contacto:    true,
    ubicacion:   true,
    faq:         true
  },

  /* ---------- 17. IDIOMA ---------- */
  idioma: {
    porDefecto:   "es",    // "es" o "en": con qué idioma abre la página
    autodetectar: false,   // true = usa el idioma del navegador del visitante
    recordar:     true     // true = recuerda el idioma que eligió el visitante
  },

  /* ---------- 18. TU MARCA EN EL PIE ----------
     Apagado por defecto: tú compraste esta plantilla para vendérsela a tus
     clientes, y en la página de tu cliente debe ir TU marca, no la mía.
     Pon mostrar:true con el nombre de tu agencia para que cada página que
     entregues te traiga tráfico de vuelta. */
  creditos: { mostrar: false, texto: "Tu agencia", url: "" }
};

/* ==================================================================
   TEXTOS DE LA PÁGINA
   ==================================================================
   Normalmente no hace falta tocarlos. Aquí está el titular de arriba
   y todo lo que sale en inglés cuando aprietan el botón EN.
   ================================================================== */
const T = {
  es: {
    nav:{propiedades:"Propiedades",nosotros:"Nosotros",equipo:"Agentes",resenas:"Reseñas",ubicacion:"Oficina",faq:"Preguntas"},
    cta:{verPropiedades:"Ver propiedades",conocenos:"Conócenos",hablarAgente:"Hablar con un agente",
         pedirLista:"Pedir la lista completa",pedirVisita:"Pedir visita",escribirA:"Escribir a",
         whatsapp:"Escríbenos por WhatsApp",llamar:"Llamar ahora",llamarCorto:"Llamar"},
    hero:{desde:"Desde {ano}",
          titulo:"Encuentra la casa en la que te ves viviendo",
          nota:"Te enseñamos solo lo que encaja contigo. Sin perseguirte, sin presión y con todo por escrito.",
          mini:"Casas, apartamentos y terrenos en toda la isla",
          mini2:"Visitas coordinadas por WhatsApp",
          alt:"Propiedad destacada de {nombre}"},
    confianza:{anos:"Años en el mercado",ventas:"Operaciones cerradas",google:"Calificación en Google"},
    nosotros:{etiqueta:"Sobre nosotros",
              titulo:"Comprar casa no tiene que ser un dolor de cabeza",
              sub:"Tu socio para encontrar el sitio correcto",
              texto:"Llevamos más de una década en el mercado de San Juan. Sabemos qué calles se inundan, dónde sube el precio y en qué edificio el mantenimiento se come la hipoteca. Te lo decimos antes de que firmes.",
              socios:"Trabajamos con:",resenas:"Reseñas:",notaLbl:"Valoración de clientes",
              alt:"Oficina de {nombre}"},
    equipo:{titulo:"Conoce a quien te va a atender",
            sub:"Tres personas con licencia, no un centro de llamadas. Siempre hablas con la misma."},
    props:{etiqueta:"Disponibles ahora",titulo:"Encuentra tu próxima casa",
           sub:"Estas son las que tenemos listas para visitar esta semana. Pídenos el resto por WhatsApp.",
           sinResultados:"No hay nada en esa categoría ahora mismo. Escríbenos y te avisamos en cuanto entre algo.",
           hab:"hab",banos:"baños",metros:"m²",
           filtro_todas:"Todas",filtro_venta:"En venta",filtro_alquiler:"En alquiler",
           estado_disponible:"Disponible",estado_reservada:"Reservada",estado_vendida:"Vendida",
           anuncio:"{n} propiedades"},
    resenas:{etiqueta:"Reseñas",titulo:"Lo que dicen quienes ya compraron",
             sub:"{calificacion} estrellas con {resenas} reseñas en Google.",
             ver:"Ver todas en Google",dejar:"Déjanos tu reseña"},
    cita:{etiqueta:"Agenda una visita",titulo:"Ve la casa esta misma semana",
          sub:"Llena estos cuatro campos y te abrimos WhatsApp con el mensaje escrito. Te confirmamos el mismo día.",
          paso1t:"Elige propiedad y día",paso1d:"Sin llamadas ni formularios eternos.",
          paso2t:"Te confirmamos por WhatsApp",paso2d:"Respondemos en horario de oficina, normalmente en minutos.",
          paso3t:"Vamos juntos a verla",paso3d:"Sin compromiso y sin que te cobremos nada."},
    form:{nombre:"Nombre",nombrePh:"Tu nombre",telefono:"Teléfono",telefonoPh:"(787) 000-0000",
          propiedad:"Propiedad de interés",dia:"Día",cualquiera:"Todavía no lo sé",
          enviar:"Pedir la visita por WhatsApp",enviando:"Abriendo WhatsApp",
          exito:"Listo. Te abrimos WhatsApp con la visita escrita: solo dale a enviar.",
          nota:"Al enviar se abre WhatsApp con tu visita ya escrita.",
          err:{nombre:"Escribe tu nombre",nombreCorto:"Escribe tu nombre completo",
               telefono:"Escribe tu teléfono",telefonoCorto:"Ese teléfono está incompleto",
               propiedad:"Elige una propiedad",dia:"Elige el día",diaPasado:"Esa fecha ya pasó"}},
    local:{etiqueta:"Visítanos",titulo:"Pásate por la oficina",comoLlegar:"Cómo llegar",
           abierto:"Abierto ahora",cerrado:"Cerrado ahora",cerradoDia:"Cerrado",hoy:"Hoy",
           cargandoMapa:"Cargando mapa",
           cierraEn:"Cierra a las {hora}",abreEn:"Abre {dia} a las {hora}"},
    dias:{lun:"Lunes",mar:"Martes",mie:"Miércoles",jue:"Jueves",vie:"Viernes",sab:"Sábado",dom:"Domingo"},
    faq:{etiqueta:"Preguntas",titulo:"Lo que todo el mundo pregunta"},
    cierre:{etiqueta:"Da el paso",titulo:"Tu próxima casa está en {ciudad}",
            sub:"Un mensaje y te enseñamos lo que encaja contigo. Sin compromiso."},
    footer:{navegar:"Navegar",contacto:"Contacto",derechos:"Todos los derechos reservados.",hecho:"Diseño y desarrollo"},
    a11y:{saltar:"Saltar al contenido",abrirMenu:"Abrir menú",cerrarMenu:"Cerrar menú",
          idioma:"Cambiar idioma / Change language",anterior:"Foto anterior",
          siguiente:"Foto siguiente",cerrar:"Cerrar",cambiado:"Página en español"},
    visor:{titulo:"Foto ampliada",contador:"Foto {n} de {total}"},
    msg:{general:"Hola {nombre}, estoy buscando propiedad en la zona. ¿Qué tienen disponible?",
         propiedad:"Hola {nombre}, me interesa {propiedad} ({moneda}{precio}). ¿Cuándo la puedo ver?",
         agente:"Hola {nombre}, quisiera hablar con {agente} sobre una propiedad.",
         visita:"Hola {nombre}, quiero agendar una visita.\n\nNombre: {n}\nTeléfono: {t}\nPropiedad: {s}\nDía: {d}"}
  },

  en: {
    nav:{propiedades:"Listings",nosotros:"About",equipo:"Agents",resenas:"Reviews",ubicacion:"Office",faq:"FAQ"},
    cta:{verPropiedades:"See listings",conocenos:"Meet the team",hablarAgente:"Talk to an agent",
         pedirLista:"Ask for the full list",pedirVisita:"Book a viewing",escribirA:"Message",
         whatsapp:"Message us on WhatsApp",llamar:"Call now",llamarCorto:"Call"},
    hero:{desde:"Since {ano}",
          titulo:"Find the home you can picture yourself in",
          nota:"We only show you what actually fits. No chasing, no pressure, everything in writing.",
          mini:"Homes, apartments and land across the island",
          mini2:"Viewings booked on WhatsApp",
          alt:"Featured property at {nombre}"},
    confianza:{anos:"Years in the market",ventas:"Deals closed",google:"Google rating"},
    nosotros:{etiqueta:"About us",
              titulo:"Buying a home shouldn't be a headache",
              sub:"Your partner in finding the right place",
              texto:"We have spent over a decade in the San Juan market. We know which streets flood, where prices are climbing, and which buildings have maintenance fees that eat your mortgage. We tell you before you sign.",
              socios:"We work with:",resenas:"Reviews:",notaLbl:"Customer rating",
              alt:"{nombre} office"},
    equipo:{titulo:"Meet the person who'll take care of you",
            sub:"Three licensed people, not a call center. You always talk to the same one."},
    props:{etiqueta:"Available now",titulo:"Find your next home",
           sub:"These are ready to visit this week. Ask us on WhatsApp for the rest.",
           sinResultados:"Nothing in that category right now. Message us and we'll tell you the moment something comes in.",
           hab:"bd",banos:"ba",metros:"m²",
           filtro_todas:"All",filtro_venta:"For sale",filtro_alquiler:"For rent",
           estado_disponible:"Available",estado_reservada:"Reserved",estado_vendida:"Sold",
           anuncio:"{n} listings"},
    resenas:{etiqueta:"Reviews",titulo:"What buyers say about us",
             sub:"{calificacion} stars across {resenas} Google reviews.",
             ver:"See all on Google",dejar:"Leave us a review"},
    cita:{etiqueta:"Book a viewing",titulo:"See the home this week",
          sub:"Fill in these four fields and we open WhatsApp with the message written. We confirm the same day.",
          paso1t:"Pick a property and a day",paso1d:"No calls, no endless forms.",
          paso2t:"We confirm on WhatsApp",paso2d:"We reply during office hours, usually within minutes.",
          paso3t:"We see it together",paso3d:"No strings attached and no charge to you."},
    form:{nombre:"Name",nombrePh:"Your name",telefono:"Phone",telefonoPh:"(787) 000-0000",
          propiedad:"Property of interest",dia:"Day",cualquiera:"Not sure yet",
          enviar:"Book the viewing on WhatsApp",enviando:"Opening WhatsApp",
          exito:"Done. We opened WhatsApp with your viewing written out: just hit send.",
          nota:"Submitting opens WhatsApp with your viewing already written.",
          err:{nombre:"Enter your name",nombreCorto:"Enter your full name",
               telefono:"Enter your phone number",telefonoCorto:"That phone number looks incomplete",
               propiedad:"Pick a property",dia:"Pick a day",diaPasado:"That date has already passed"}},
    local:{etiqueta:"Visit us",titulo:"Stop by the office",comoLlegar:"Get directions",
           abierto:"Open now",cerrado:"Closed now",cerradoDia:"Closed",hoy:"Today",
           cargandoMapa:"Loading map",
           cierraEn:"Closes at {hora}",abreEn:"Opens {dia} at {hora}"},
    dias:{lun:"Monday",mar:"Tuesday",mie:"Wednesday",jue:"Thursday",vie:"Friday",sab:"Saturday",dom:"Sunday"},
    faq:{etiqueta:"Questions",titulo:"What everyone asks"},
    cierre:{etiqueta:"Take the step",titulo:"Your next home is in {ciudad}",
            sub:"One message and we'll show you what fits. No strings attached."},
    footer:{navegar:"Explore",contacto:"Contact",derechos:"All rights reserved.",hecho:"Design and development"},
    a11y:{saltar:"Skip to content",abrirMenu:"Open menu",cerrarMenu:"Close menu",
          idioma:"Cambiar idioma / Change language",anterior:"Previous photo",
          siguiente:"Next photo",cerrar:"Close",cambiado:"Page in English"},
    visor:{titulo:"Enlarged photo",contador:"Photo {n} of {total}"},
    msg:{general:"Hi {nombre}, I'm looking for a property in the area. What do you have available?",
         propiedad:"Hi {nombre}, I'm interested in {propiedad} ({moneda}{precio}). When can I see it?",
         agente:"Hi {nombre}, I'd like to talk to {agente} about a property.",
         visita:"Hi {nombre}, I'd like to book a viewing.\n\nName: {n}\nPhone: {t}\nProperty: {s}\nDay: {d}"}
  }
};
