// Los datos del negocio, en un solo sitio. Todo sale de su web actual
// (docs/sitio-actual.md) o de él: nada inventado. Si algo cambia, se cambia
// aquí y lo recogen la página, la cabecera, el pie y los datos estructurados.

export const negocio = {
  nombre: "Limpiezas El Imperio",
  titular: "Frank Elías Cuero Palacios",
  telefono: "+34617545397",
  telefonoVisible: "617 545 397",
  correo: "info@limpiezaselimperio.net",
  // La calle sólo sale en el aviso legal, que la exige (LSSI) y donde ya la
  // publicaba su web vieja. En el resto de la web va sólo la localidad: es su
  // casa (pregunta pendiente en todo.md).
  direccion: "Calle El Trinquete 49, piso 3, puerta 6",
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
  | "obras";

// Los servicios de su web, agrupados. El reparto en grupos es nuestro y los
// nombres de cada servicio son los suyos, con un ajuste de Kevin (16 sept
// 2026) para que se parezcan a lo que hace de verdad (docs/privado/negocio.md,
// fuera de git): fuera las reparaciones y los parkings y naves; dentro alquiler
// vacacional, sofás y colchones, mosquiteras, piscinas y escaparates.
//
// ⚠️ Las `descripcion` son un BORRADOR nuestro, pendiente de que Frank las
// revise: su web sólo tenía los nombres. Están escritas para no prometer nada
// que no haya dicho él (ni precios, ni plazos, ni «por dentro y por fuera»).
// Lo que sí sale de él va anotado: frecuencias y limpieza profunda mensual
// (su FAQ), hidrolimpiadora y aspiradora industrial (sus fotos y su hoja de
// servicio), hojas del jardín (una reseña de Google).
export type Servicio = { nombre: string; descripcion: string };

export const servicios: {
  categoria: Categoria;
  titulo: string;
  resumen: string;
  lista: Servicio[];
}[] = [
  {
    categoria: "viviendas",
    titulo: "Viviendas",
    resumen: "Pisos, casas y chalets: cada semana, cada quince días o una sola vez.",
    lista: [
      {
        nombre: "Limpieza general",
        descripcion: "La limpieza de toda la vivienda: suelos, polvo, cocina y baños.",
      },
      {
        nombre: "Limpieza regular",
        descripcion:
          "La limpieza de tu casa cada semana o cada quince días, o con la frecuencia que elijas.",
      },
      {
        nombre: "Limpieza profunda",
        descripcion:
          "A fondo, también los rincones que no se tocan a diario. Nuestro consejo: una al mes.",
      },
      {
        nombre: "Post mudanza",
        descripcion: "Para entrar a vivir en una casa limpia, o para entregarla limpia al irte.",
      },
      {
        nombre: "Cocinas con vaporeta",
        descripcion: "La cocina limpiada con vapor: azulejos, juntas, encimeras y grasa.",
      },
      {
        nombre: "Baños con vaporeta",
        descripcion: "El baño limpiado con vapor: azulejos, juntas, mampara y grifería.",
      },
      {
        nombre: "Alquiler vacacional",
        descripcion: "Pisos y casas de alquiler vacacional, listos para los siguientes huéspedes.",
      },
      {
        nombre: "Sofás y colchones",
        descripcion: "Limpieza de sofás y colchones, en tu casa.",
      },
    ],
  },
  {
    categoria: "cristales",
    titulo: "Cristales y persianas",
    resumen: "Ventanas, cristales, persianas y mosquiteras, también con vaporeta.",
    lista: [
      {
        nombre: "Limpieza de cristales",
        descripcion: "Ventanas, ventanales y cristaleras de casas, oficinas y locales.",
      },
      {
        nombre: "Cristales, ventanas y persianas con vaporeta",
        descripcion: "Cristales, marcos, guías y persianas limpiados con vapor.",
      },
      {
        nombre: "Persianas y mosquiteras",
        descripcion: "Lamas, guías y mosquiteras, que son las que más polvo acumulan.",
      },
    ],
  },
  {
    categoria: "comunidades",
    titulo: "Comunidades y propiedades",
    resumen: "Zonas comunes, garajes, jardines y piscinas, y el cuidado de tu propiedad.",
    lista: [
      {
        nombre: "Limpieza de comunidades",
        descripcion: "Portales, escaleras, rellanos, ascensores y zonas comunes.",
      },
      {
        nombre: "Cuidado de propiedades",
        descripcion:
          "Mantener limpia una vivienda vacía, de alquiler o una segunda residencia.",
      },
      {
        nombre: "Garajes",
        descripcion: "Plazas, rampas y zonas comunes del garaje.",
      },
      {
        nombre: "Patios, jardines y piscinas",
        descripcion: "Patios y terrazas limpios, el jardín sin hojas y la zona de la piscina limpia.",
      },
      {
        nombre: "Exteriores",
        descripcion: "Suelos exteriores, terrazas y muros, también con hidrolimpiadora.",
      },
      {
        nombre: "Fachadas",
        descripcion: "La fachada de la vivienda, el local o el edificio.",
      },
    ],
  },
  {
    categoria: "empresas",
    titulo: "Oficinas y locales",
    resumen: "Oficinas, comercios y escaparates, y espacios después de un evento.",
    lista: [
      {
        nombre: "Limpieza de oficinas",
        descripcion:
          "Despachos, puestos de trabajo, zonas comunes y aseos, con la frecuencia que necesites.",
      },
      {
        nombre: "Limpieza comercial",
        descripcion: "Tiendas y locales abiertos al público, listos para abrir.",
      },
      {
        nombre: "Escaparates",
        descripcion: "Escaparates de tiendas y locales, una vez o cada quince días.",
      },
      {
        nombre: "Post evento",
        descripcion: "Después de una celebración o un evento, el espacio como estaba.",
      },
    ],
  },
  {
    categoria: "obras",
    titulo: "Obras y fin de obra",
    resumen: "Durante la obra, al terminarla, y el aspirado a fondo.",
    lista: [
      {
        nombre: "Limpieza de obra",
        descripcion: "Durante la obra, para retirar polvo y restos y poder seguir trabajando.",
      },
      {
        nombre: "Fin de obra",
        descripcion: "Al acabar la obra o la reforma, para dejarlo todo listo para usar.",
      },
      {
        nombre: "Aspirado a fondo",
        descripcion: "Con aspiradora industrial: el polvo de obra, suelos y alfombras.",
      },
      {
        nombre: "Pulido y vitrificado de suelos",
        descripcion: "Para devolver el brillo al suelo y protegerlo.",
      },
    ],
  },
];

// Zonas (16 sept 2026). Su web vieja tenía dos listas que no coincidían; se
// quedan las localidades que estaban en las dos, más las que se ha visto que
// trabaja de verdad (docs/privado/negocio.md, fuera de git), y fuera las que
// sólo salían en una lista y nada indica que haga. Por localidades, no por
// urbanizaciones; de Valencia se nombran los barrios que traían sus dos listas,
// porque así los busca la gente.
export type Area = "camp" | "metropolitana" | "valencia";

export const areas: Record<Area, string> = {
  camp: "Camp de Túria",
  metropolitana: "Área metropolitana",
  valencia: "Valencia ciudad",
};

export const zonasPorArea: { area: Area; localidades: string[] }[] = [
  {
    area: "camp",
    localidades: [
      "La Pobla de Vallbona",
      "Llíria",
      "Benaguasil",
      "Benisanó",
      "Olocau",
      "L'Eliana",
      "Riba-roja de Túria",
      "Bétera",
    ],
  },
  {
    area: "metropolitana",
    localidades: [
      "La Canyada",
      "Paterna",
      "Godella",
      "Moncada",
      "Puçol",
      "Mislata",
      "Xirivella",
      "Aldaia",
      "Torrent",
    ],
  },
  { area: "valencia", localidades: ["Valencia"] },
];

export const barriosValencia = ["Benimàmet", "Beniferri", "Campanar"];

// La lista plana, en el orden de arriba: la usan el presupuesto, la FAQ, los
// datos estructurados y las pastillas de zonas.
export const zonas: string[] = zonasPorArea.flatMap((a) => a.localidades);

// Opiniones de su ficha de Google Maps, leídas el 16 sept 2026 (las cinco que
// Google enseña sin iniciar sesión; todas de 5 estrellas y de los últimos seis
// meses). Las de su web vieja se quitaron: eran de hace más de dos años.
//
// Cómo se publican, y por qué:
// - `extracto` es literal. Donde se corta hay «[…]». No se corrige ni se
//   reescribe nada de lo que escribió el cliente.
// - Se corta, sobre todo, para no publicar los nombres de su personal
//   (varias reseñas nombran a las chicas que fueron). En Google ya están, pero
//   ponerlos en su web es otra cosa y nadie les ha preguntado.
// - El autor va con nombre e inicial, no con el nombre completo.
// - La reseña entera se lee en Google: cada una enlaza a su ficha.
export const valoracion = {
  nota: "4,9",
  total: 68,
  comprobado: "16 de septiembre de 2026", // cambia con el tiempo: revísalo
} as const;

export const opiniones = [
  {
    autor: "Cristina R.",
    extracto:
      "Estamos encantados con la limpieza a fondo que han hecho en nuestra nueva casa. Les avisé con muy poca antelación […] y lo organizaron todo muy rápido.",
  },
  {
    autor: "Li T.",
    extracto:
      "Tengo muchos ventanales y todos los cristales quedaron perfectamente limpios. […] Se nota que tienen experiencia y que trabajan con mucha dedicación.",
  },
  {
    autor: "Marie C.",
    extracto:
      "Nos hemos comprado un chalet y estaba fatal. […] Estoy super contenta con el resultado. Además super atentas, puntuales, cuidadosas haciendo un gran trabajo.",
  },
  {
    autor: "María G.",
    extracto:
      "He quedado encantada con la rapidez y calidad del servicio. […] Sin duda repetiré. Los recomiendo 100%.",
  },
  {
    autor: "Vir M.",
    extracto:
      "Servicio excelente y muy profesional. […] Dejó todo impecable. Repetiré sin duda. ¡100% recomendables!",
  },
] as const;
