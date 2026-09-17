import type { Metadata } from "next";

// El dominio por el que se sirve la web DE VERDAD. Va escrito a mano y no sale
// de VERCEL_PROJECT_PRODUCTION_URL: esa variable dice el dominio asignado en
// Vercel, aunque sus DNS sigan apuntando a otro sitio. Pasó: con el .net
// añadido en Vercel pero aún en Webador, el canonical y la imagen para
// compartir apuntaban a páginas que daban 404.
//
// Cámbialo el día que el dominio propio sirva esta web, y no antes.
const dominioPublico = "www.limpiezaselimperio.es";

export const urlBase =
  process.env.VERCEL_ENV === "production"
    ? `https://${dominioPublico}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

const nombre = "Limpiezas El Imperio";

// Next mezcla los metadatos de layout y página sólo en el primer nivel: si una
// página define `openGraph`, el del layout desaparece entero. Por eso toda
// página pasa por aquí en vez de escribir el suyo.
export function metadatosPagina({
  titulo,
  descripcion,
  ruta,
}: {
  titulo?: string;
  descripcion: string;
  ruta: string;
}): Metadata {
  return {
    ...(titulo && { title: titulo }),
    description: descripcion,
    alternates: { canonical: ruta },
    openGraph: {
      type: "website",
      locale: "es_ES",
      siteName: nombre,
      url: ruta,
      ...(titulo && { title: `${titulo} · ${nombre}` }),
      description: descripcion,
      // Está en public/ y no como opengraph-image.jpg en src/app: esa
      // convención se pierde en cuanto una página define su `openGraph`.
      images: [
        {
          url: "/opengraph-image.jpg",
          width: 1200,
          height: 630,
          alt: "Logo de Limpiezas El Imperio",
        },
      ],
    },
  };
}
