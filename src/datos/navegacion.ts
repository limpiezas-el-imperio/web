// Los enlaces de la web, en un solo sitio: los leen la cabecera, el menú del
// móvil y el pie. Cuando exista una página nueva, se añade aquí.
//
// Zonas y Opiniones van a su sección de la portada mientras no tengan página.
// Con "/#…" y no "#…", para que funcionen desde cualquier página.
export const enlaces = [
  { href: "/nuestros-servicios", texto: "Servicios" },
  { href: "/#zonas", texto: "Zonas" },
  { href: "/#opiniones", texto: "Opiniones" },
  { href: "/preguntas-frecuentes", texto: "Preguntas frecuentes" },
  { href: "/contacto", texto: "Contacto" },
] as const;
