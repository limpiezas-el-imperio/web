import {
  ArrowRight,
  HelpCircle,
  House,
  MessageCircle,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { enlaceWhatsApp } from "@/datos/negocio";
import s from "./no-encontrada.module.css";

// La página 404. Va dentro del layout, con cabecera y pie. Pensada sobre todo
// para quien llegue desde Google con una dirección de la web vieja de Webador
// (/solicitar-presupuesto, /preguntas-frecuentes-blog…): no hay redirecciones
// (decisión de Kevin, docs/sitio-actual.md), así que aquí se le explica y se le
// manda a la página que buscaba. Next le pone noindex y responde con un 404.
const destinos = [
  {
    href: "/nuestros-servicios",
    icono: Sparkles,
    titulo: "Servicios",
    texto: "Todo lo que limpiamos, de la casa a la obra.",
  },
  {
    href: "/contacto",
    icono: MessageCircle,
    titulo: "Pedir presupuesto",
    texto: "Por WhatsApp, teléfono o correo.",
  },
  {
    href: "/preguntas-frecuentes",
    icono: HelpCircle,
    titulo: "Preguntas frecuentes",
    texto: "Precios, productos, zonas y horario.",
  },
  {
    href: "/quienes-somos",
    icono: Users,
    titulo: "Quiénes somos",
    texto: "Dónde estamos y por qué elegirnos.",
  },
];

export default function NoEncontrada() {
  return (
    <section className={s.pagina}>
      <div className="contenedor">
        <header className={s.cabecera}>
          <p className="antetitulo">Error 404</p>
          <h1 className={s.titulo}>
            Esta página <em>no existe</em>
          </h1>
          <p className={s.entradilla}>
            Puede que el enlace esté mal escrito, o que sea de nuestra web anterior:
            la hemos renovado y algunas páginas han cambiado de dirección.
          </p>
          <div className={s.acciones}>
            <Link className="boton boton--claro boton--grande" href="/">
              <House aria-hidden="true" size={20} />
              Ir al inicio
            </Link>
            <a className="boton boton--whatsapp boton--grande" href={enlaceWhatsApp()}>
              <MessageCircle aria-hidden="true" size={20} />
              Escríbenos por WhatsApp
            </a>
          </div>
        </header>

        <ul className={s.destinos}>
          {destinos.map(({ href, icono: Icono, titulo, texto }) => (
            <li key={href}>
              <Link href={href} className={`tarjeta ${s.destino}`}>
                <span className="icono-circulo">
                  <Icono aria-hidden="true" size={22} />
                </span>
                <span className={s.destino__texto}>
                  <strong>{titulo}</strong>
                  {texto}
                </span>
                <ArrowRight aria-hidden="true" size={20} className={s.destino__flecha} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
