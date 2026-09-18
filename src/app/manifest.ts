import type { MetadataRoute } from "next";

import { negocio } from "@/datos/negocio";

// Lo que usa Android (y Chrome en el ordenador) al añadir la web a la pantalla
// de inicio o crear un acceso directo: el logo como icono. El iPhone usa
// `apple-icon.png`, y la pestaña del navegador sigue con `icon.svg`, porque el
// logo entero no se lee a 16 px.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: negocio.nombre,
    short_name: "El Imperio",
    description: "Limpieza en La Pobla de Vallbona y Valencia.",
    lang: "es",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#0c2d5c",
    icons: [
      { src: "/icono-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icono-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
