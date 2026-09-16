import type { StaticImageData } from "next/image";
import cocina from "@/imagenes/cocina-limpia.jpg";
import banio from "@/imagenes/cuarto-de-bano-limpio.jpg";
import ducha from "@/imagenes/ducha-limpia.jpg";
import grifo from "@/imagenes/pomulo-ducha-super-brillante.jpg";
import sillas from "@/imagenes/sillas-limpias.jpg";
import suelo from "@/imagenes/suelo-brillante.jpg";
import aspirado from "@/imagenes/frank-aspirado-industrial.jpg";
import karcher from "@/imagenes/frank-limpiando-con-karcher.jpg";
import guante from "@/imagenes/portada-guante-pulverizador.jpg";

// Fotos reales de sus trabajos, que pasó Kevin. Van en src/imagenes y no en
// public/ para que sólo se sirvan optimizadas (next/image), nunca el original.
// Se comprobó que no llevan EXIF ni GPS: son casas de clientes y el repositorio
// es público. Si llegan fotos nuevas, compruébalo antes de añadirlas:
//   python3 -c "from PIL import Image; print(dict(Image.open('x.jpg').getexif()))"
//
// No hay página de galería a propósito: con ocho fotos quedaría vacía. Van en
// la portada, en la sección «Galería» (Galeria.tsx). La de Frank aspirando
// abría la portada, pero no le gustó: ahora no sale en ningún sitio. No van dentro de cada servicio: no las hay para
// todos y emparejarlas a la fuerza no casaba.

export type Foto = { src: StaticImageData; alt: string; pie: string };

// La foto de la portada, la única que no es suya: es de Unsplash (licencia
// libre, la atribución no es obligatoria). La de Frank aspirando no le gustó y
// ésta sí (16 sept 2026). Se le da crédito, discreto, en el pie de la web.
// Sin EXIF ni GPS, comprobado.
export const fotoPortada = {
  src: guante,
  alt: "Mano con guante azul sujetando un pulverizador de limpieza",
  autor: "Towfiqu barbhuiya",
  enlace: "https://unsplash.com/@towfiqu999999",
};

export const fotos = {
  aspirado: {
    src: aspirado,
    alt: "Frank, con uniforme de trabajo, pasando una aspiradora industrial por el suelo de un local con grandes ventanales",
    pie: "Aspirado industrial",
  },
  karcher: {
    src: karcher,
    alt: "Frank limpiando con hidrolimpiadora el suelo de piedra de un patio",
    pie: "Exteriores con hidrolimpiadora",
  },
  cocina: {
    src: cocina,
    alt: "Cocina alargada con encimera blanca, placa de inducción y electrodomésticos, recién limpia",
    pie: "Cocina",
  },
  banio: {
    src: banio,
    alt: "Cuarto de baño limpio con lavabo, inodoro, espejo y plato de ducha",
    pie: "Cuarto de baño",
  },
  ducha: {
    src: ducha,
    alt: "Ducha con azulejos grises y columna de ducha cromada, limpia y brillante",
    pie: "Ducha",
  },
  grifo: {
    src: grifo,
    alt: "Grifo termostático cromado de una ducha, reluciente, sobre azulejos de gresite",
    pie: "Grifería",
  },
  sillas: {
    src: sillas,
    alt: "Taburetes blancos, sillas y mesa de cristal sobre suelo de madera, limpios",
    pie: "Mobiliario",
  },
  suelo: {
    src: suelo,
    alt: "Salón con sofá y suelo de madera brillante recién limpiado",
    pie: "Suelos",
  },
} satisfies Record<string, Foto>;
