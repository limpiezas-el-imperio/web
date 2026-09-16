import { MessageCircle } from "lucide-react";
import Marca from "./Marca";
import { enlaceWhatsApp } from "@/datos/negocio";

// Los enlaces van a "/#…" y no a "#…" para que sigan funcionando el día que
// haya más páginas.
const enlaces = [
  { href: "/#servicios", texto: "Servicios" },
  { href: "/#como-trabajamos", texto: "Cómo trabajamos" },
  { href: "/#zonas", texto: "Zonas" },
  { href: "/#opiniones", texto: "Opiniones" },
  { href: "/#contacto", texto: "Contacto" },
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
                <a href={e.href}>{e.texto}</a>
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
