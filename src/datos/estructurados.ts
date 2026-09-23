import { barriosValencia, negocio, redes, zonas } from "@/datos/negocio";
import { urlBase } from "@/datos/sitio";

// El negocio en JSON-LD, en un solo sitio.
//
// Cinco páginas describían el mismo negocio con cinco nodos distintos e
// incompletos (la de zonas, sin teléfono ni dirección; la de contacto, sin
// horario ni redes) y ninguno decía que fuera el mismo. Con un `@id` común y
// el nodo entero en todas, un buscador ve UN negocio descrito en varias
// páginas, y no cinco parecidos.
//
// Lo que NO lleva, a propósito:
// - `streetAddress` ni `geo`: la calle es su casa y sólo se publica en el
//   aviso legal (CLAUDE.md). La localidad y el código postal sí.
// - `aggregateRating`: sus reseñas son de su ficha de Google, y Google no
//   admite marcar como propias las de un tercero. La nota (4,9) sigue a la
//   vista como texto, que es donde vale.
// - `priceRange`: no hay precios públicos y no se inventan.
const idNegocio = `${urlBase}/#negocio`;

export const negocioEstructurado = {
  "@type": "LocalBusiness",
  "@id": idNegocio,
  name: negocio.nombre,
  description: "Limpieza de viviendas, comunidades, oficinas, locales y obras.",
  image: `${urlBase}/logo.jpg`,
  logo: `${urlBase}/logo.jpg`,
  url: urlBase,
  telephone: negocio.telefono,
  email: negocio.correo,
  slogan: negocio.lema,
  address: {
    "@type": "PostalAddress",
    addressLocality: negocio.localidad,
    postalCode: negocio.codigoPostal,
    addressRegion: negocio.provincia,
    addressCountry: "ES",
  },
  hasMap: negocio.mapa,
  areaServed: [...zonas, ...barriosValencia].map((z) => ({
    "@type": "Place",
    name: z,
  })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "06:00",
      closes: "18:00",
    },
  ],
  sameAs: redes.map((r) => r.url),
};

// Para las páginas que hablan del negocio dentro de otro nodo (`mainEntity`,
// `provider`): el mismo `@id`, sin repetir los datos ahí dentro.
export const referenciaNegocio = { "@id": idNegocio };
