// Los enlaces de la web, en un solo sitio: los leen la cabecera, el menú del
// móvil y el pie. Cuando exista una página nueva, se añade aquí.
//
// Opiniones va a su sección de la portada: no tiene página. Con "/#…" y no
// "#…", para que funcione desde cualquier página.
//
// `corto`, sólo en la fila de la cabecera de escritorio: con «Clientes» no
// cabía «Preguntas frecuentes» entero. El menú del móvil y el pie lo dicen
// entero.
export const enlaces: readonly { href: string; texto: string; corto?: string }[] = [
  { href: "/nuestros-servicios", texto: "Servicios" },
  { href: "/zonas-de-servicio", texto: "Zonas" },
  { href: "/quienes-somos", texto: "Quiénes somos" },
  { href: "/#opiniones", texto: "Opiniones" },
  { href: "/preguntas-frecuentes", texto: "Preguntas frecuentes", corto: "Preguntas" },
  { href: "/contacto", texto: "Contacto" },
];

// Las páginas para quien ya es cliente. En escritorio van juntas en el
// desplegable «Clientes» de la cabecera (con ocho enlaces sueltos la fila no
// cabía); en el menú del móvil y en el pie, como un enlace más.
export const clientes = [
  { href: "/reserva-de-servicios", texto: "Reserva de servicios" },
  { href: "/datos-de-facturacion", texto: "Datos de facturación" },
] as const;
