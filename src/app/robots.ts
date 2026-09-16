import type { MetadataRoute } from "next";
import { urlBase } from "@/datos/sitio";

// Todo se puede rastrear. La URL del sitemap sale de urlBase, así que cambia
// sola el día que se cambie `dominioPublico` en sitio.ts.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${urlBase}/sitemap.xml`,
  };
}
