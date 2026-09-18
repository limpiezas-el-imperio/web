import type { MetadataRoute } from "next";
import { urlBase } from "@/datos/sitio";

// Las páginas de la web. Cuando se añada una, va aquí también (CLAUDE.md,
// «Cómo se hace una página nueva»). Sin `lastModified`: una fecha que cambia
// en cada despliegue sin que cambie la página no le dice nada a Google.
const paginas: { ruta: string; prioridad: number }[] = [
  { ruta: "/", prioridad: 1 },
  { ruta: "/nuestros-servicios", prioridad: 0.9 },
  { ruta: "/contacto", prioridad: 0.8 },
  { ruta: "/zonas-de-servicio", prioridad: 0.7 },
  { ruta: "/quienes-somos", prioridad: 0.7 },
  { ruta: "/preguntas-frecuentes", prioridad: 0.7 },
  { ruta: "/trabaja-con-nosotros", prioridad: 0.4 },
  { ruta: "/datos-de-facturacion", prioridad: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paginas.map(({ ruta, prioridad }) => ({
    url: `${urlBase}${ruta === "/" ? "" : ruta}`,
    priority: prioridad,
  }));
}
