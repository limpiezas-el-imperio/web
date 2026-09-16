import { MessageCircle } from "lucide-react";
import Link from "next/link";
import Marca from "./Marca";
import { enlaceWhatsApp } from "@/datos/negocio";

// Mientras no existan sus páginas, Servicios, Zonas y Opiniones van a su
// sección de la portada. Con "/#…" y no "#…", para que funcionen desde
// cualquier página.
const enlaces = [
  { href: "/#servicios", texto: "Servicios" },
  { href: "/#zonas", texto: "Zonas" },
  { href: "/#opiniones", texto: "Opiniones" },
  { href: "/preguntas-frecuentes", texto: "Preguntas" },
  { href: "#contacto", texto: "Contacto" },
];

export default function Cabecera() {
  return (
    <header className="cabecera">
      <div className="contenedor cabecera__fila">
        <Marca />
        <nav aria-label="Principal" className="cabecera__nav">
          <ul>
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link href={e.href}>{e.texto}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <a className="boton boton--whatsapp boton--pequeno" href={enlaceWhatsApp()}>
          <MessageCircle aria-hidden="true" size={18} />
          <span>WhatsApp</span>
        </a>
      </div>
    </header>
  );
}
