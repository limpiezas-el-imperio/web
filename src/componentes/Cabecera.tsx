import { MessageCircle } from "lucide-react";
import Marca from "./Marca";
import Navegacion from "./Navegacion";
import { enlaceWhatsApp } from "@/datos/negocio";

export default function Cabecera() {
  return (
    <header className="cabecera">
      <div className="contenedor cabecera__fila">
        <Marca />
        <Navegacion />
        <a
          className="boton boton--whatsapp boton--pequeno cabecera__whatsapp"
          href={enlaceWhatsApp()}
        >
          <MessageCircle aria-hidden="true" size={18} />
          <span>WhatsApp</span>
        </a>
      </div>
    </header>
  );
}
