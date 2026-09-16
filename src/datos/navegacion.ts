// Los enlaces de la web, en un solo sitio: los leen la cabecera, el menú del
// móvil y el pie. Cuando exista una página nueva, se añade aquí.
//
// Opiniones va a su sección de la portada: no tiene página. Con "/#…" y no
// "#…", para que funcione desde cualquier página.
export const enlaces = [
  { href: "/nuestros-servicios", texto: "Servicios" },
  { href: "/zonas-de-servicio", texto: "Zonas" },
  { href: "/quienes-somos", texto: "Quiénes somos" },
  { href: "/#opiniones", texto: "Opiniones" },
  { href: "/preguntas-frecuentes", texto: "Preguntas frecuentes" },
  { href: "/contacto", texto: "Contacto" },
] as const;
