import { MessageCircle, Phone } from "lucide-react";
import { enlaceWhatsApp, negocio } from "@/datos/negocio";

// Sólo en el móvil: los dos botones que importan, siempre a mano del pulgar.
export default function BarraContacto() {
  return (
    <div className="barra-contacto">
      <a className="boton boton--whatsapp" href={enlaceWhatsApp()}>
        <MessageCircle aria-hidden="true" size={20} />
        WhatsApp
      </a>
      <a className="boton boton--claro" href={`tel:${negocio.telefono}`}>
        <Phone aria-hidden="true" size={20} />
        Llamar
      </a>
    </div>
  );
}
