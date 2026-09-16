// Los datos del negocio, en un solo sitio. Todo sale de su web actual
// (docs/sitio-actual.md) o de él: nada inventado. Si algo cambia, se cambia
// aquí y lo recogen la página, la cabecera, el pie y los datos estructurados.

export const negocio = {
  nombre: "Limpiezas El Imperio",
  titular: "Frank Elías Cuero Palacios",
  telefono: "+34617545397",
  telefonoVisible: "617 545 397",
  correo: "info@limpiezaselimperio.net",
  localidad: "La Pobla de Vallbona",
  codigoPostal: "46185",
  provincia: "Valencia",
  mapa: "https://maps.app.goo.gl/fVZXBH8RQqnJXfyp9",
  lema: "El servicio al cliente es nuestra mejor carta de presentación",
} as const;

export function enlaceWhatsApp(mensaje?: string) {
  const texto = mensaje ?? "Hola, quería pedir presupuesto para una limpieza.";
  return `https://wa.me/${negocio.telefono.replace("+", "")}?text=${encodeURIComponent(texto)}`;
}

export const horario = {
  semana: "Lunes a viernes, de 6:00 a 18:00",
  finDeSemana: "Sábados y domingos, agenda abierta",
} as const;

// LinkedIn no va: en su web apunta a un enlace roto.
export const redes = [
  { nombre: "Facebook", url: "https://facebook.com/limpiezaselimperio5" },
  { nombre: "Instagram", url: "https://instagram.com/limpiezaselimperio5" },
  { nombre: "TikTok", url: "https://tiktok.com/@limpiezaselimperio" },
  { nombre: "YouTube", url: "https://youtube.com/@frankeliascueropalacios641" },
  { nombre: "X", url: "https://x.com/fecuero5" },
] as const;

export type Categoria =
  | "viviendas"
  | "cristales"
  | "comunidades"
  | "empresas"
  | "obras"
  | "reparaciones";

// Los 26 servicios de su web, agrupados. El reparto en grupos es nuestro y
// está pendiente de que él lo vea; los nombres de cada servicio son los suyos.
export const servicios: {
  categoria: Categoria;
  titulo: string;
  resumen: string;
  lista: string[];
}[] = [
  {
    categoria: "viviendas",
    titulo: "Viviendas",
    resumen: "Pisos, casas y chalets, de una vez o con la frecuencia que elijas.",
    lista: [
      "Limpieza general",
      "Limpieza regular",
      "Limpieza profunda",
      "Post mudanza",
      "Cocinas con vaporeta",
      "Baños con vaporeta",
    ],
  },
  {
    categoria: "cristales",
    titulo: "Cristales y persianas",
    resumen: "Ventanas, cristales y persianas, también con vaporeta.",
    lista: [
      "Limpieza de cristales",
      "Cristales, ventanas y persianas con vaporeta",
      "Limpieza de persianas",
    ],
  },
  {
    categoria: "comunidades",
    titulo: "Comunidades y propiedades",
    resumen: "Zonas comunes, garajes y exteriores, y el cuidado de tu propiedad.",
    lista: [
      "Limpieza de comunidades",
      "Cuidado de propiedades",
      "Garajes",
      "Patios y jardines",
      "Exteriores",
      "Fachadas",
    ],
  },
  {
    categoria: "empresas",
    titulo: "Oficinas y locales",
    resumen: "Oficinas, comercios y espacios después de un evento.",
    lista: ["Limpieza de oficinas", "Limpieza comercial", "Post evento"],
  },
  {
    categoria: "obras",
    titulo: "Obras, parkings y naves",
    resumen: "Durante la obra, al terminarla, y en superficies grandes.",
    lista: [
      "Limpieza de obra",
      "Fin de obra",
      "Aspirado en obras, parkings y naves",
      "Parkings y naves",
      "Aspirado a fondo",
      "Pulido y vitrificado de suelos",
    ],
  },
  {
    categoria: "reparaciones",
    titulo: "Reparaciones",
    resumen: "Pequeños arreglos para que todo quede en orden.",
    lista: ["Reparaciones eléctricas", "Reparación de persianas"],
  },
];

// Su web tiene dos listas de zonas que no coinciden. Aquí van sólo las que
// están en las dos, hasta que él diga cuál es la buena. Los barrios de Valencia
// (Benimàmet, Beniferri, Campanar…) se nombran aparte porque así los buscan.
export const zonas = [
  "La Pobla de Vallbona",
  "Llíria",
  "Benaguasil",
  "L'Eliana",
  "La Canyada",
  "Paterna",
  "Benimàmet",
  "Beniferri",
  "Campanar",
  "Valencia",
  "Torrent",
] as const;

// Literales de los comentarios de su web. Con el nombre que la persona puso.
export const opiniones = [
  {
    autor: "Jorge",
    texto:
      "Contratamos con ellos para la limpieza de nuestra casa después de una reforma. Franc y Luz hicieron muy buen trabajo, cuidando mucho los detalles y dejando la casa impecable. Repetiremos.",
  },
  {
    autor: "Ema",
    texto:
      "Desde que estoy contando con sus servicios no me cambio por nada. Calidad, cumplimiento, se ajustan a mis horarios y lo mejor, respetuosos con el medio ambiente.",
  },
  {
    autor: "Elena Jiménez",
    texto:
      "Prestan un servicio de calidad y totalmente recomendable. Estamos encantados.",
  },
] as const;
