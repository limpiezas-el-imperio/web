import type { Metadata } from "next";

// En Vercel sale el dominio de producción (el .vercel.app hoy, el propio el día
// que se conecte). En local no existe y basta con localhost.
const dominio = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const urlBase = dominio ? `https://${dominio}` : "http://localhost:3000";

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
          alt: "Logo de Limpiezas El Imperio, con su teléfono +34 617 545 397",
        },
      ],
    },
  };
}
