import type { Metadata, Viewport } from "next";
import { Geist, Newsreader } from "next/font/google";
import Cabecera from "@/componentes/Cabecera";
import Pie from "@/componentes/Pie";
import BarraContacto from "@/componentes/BarraContacto";
import { negocio } from "@/datos/negocio";
import { urlBase } from "@/datos/sitio";
import "./globals.css";

// Sobrias y poco invasivas: Newsreader, una serif de lectura con tamaños
// ópticos, para titulares en peso normal; Geist, una sans neutra, para el
// texto. Sustituyen a Fraunces y Figtree, que tenían demasiada personalidad.
const texto = Geist({
  variable: "--fuente-texto",
  subsets: ["latin"],
});

const titulos = Newsreader({
  variable: "--fuente-titulos",
  subsets: ["latin"],
  axes: ["opsz"],
});


const descripcion =
  "Limpieza de viviendas, comunidades, oficinas y obras en La Pobla de Vallbona, el Camp de Túria y Valencia. Materiales y productos incluidos. Pide presupuesto por WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(urlBase),
  title: {
    default: `${negocio.nombre} · Limpieza en La Pobla de Vallbona y Valencia`,
    template: `%s · ${negocio.nombre}`,
  },
  description: descripcion,
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: negocio.nombre,
    description: descripcion,
  },
};

export const viewport: Viewport = {
  themeColor: "#14305a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${texto.variable} ${titulos.variable}`}>
      <body>
        <a className="saltar" href="#contenido">
          Saltar al contenido
        </a>
        <Cabecera />
        <main id="contenido">{children}</main>
        <Pie />
        <BarraContacto />
      </body>
    </html>
  );
}
