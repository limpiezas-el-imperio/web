import { Clock, MapPin, MessageCircle, Package } from "lucide-react";
import Link from "next/link";
import Candidatura from "@/componentes/Candidatura";
import CabeceraPagina from "@/componentes/CabeceraPagina";
import { horario, negocio } from "@/datos/negocio";
import { metadatosPagina } from "@/datos/sitio";
import s from "./trabaja.module.css";

export const metadata = metadatosPagina({
  titulo: "Trabaja con nosotros",
  descripcion: `¿Te interesa trabajar en limpieza en el Camp de Túria o en Valencia? Manda tu candidatura a ${negocio.nombre}.`,
  ruta: "/trabaja-con-nosotros",
});

// La candidatura es un formulario que llega por correo a info@ (Candidatura.tsx
// y acciones.ts), con WhatsApp como segunda vía. El texto no dice que esté contratando ahora ni promete condiciones:
// no lo sabemos (pregunta pendiente en todo.md). Sólo datos que ya son suyos.
// No acaba con <Contacto />: ese cierre es para clientes.
const datos = [
  {
    icono: MapPin,
    titulo: "Dónde",
    texto: `Viviendas, comunidades, oficinas y obras en ${negocio.localidad}, el Camp de Túria y Valencia.`,
  },
  {
    icono: Clock,
    titulo: "Horario",
    texto: `${horario.semana}. ${horario.finDeSemana}.`,
  },
  {
    icono: Package,
    titulo: "Material",
    texto: "Los materiales y los productos de limpieza los ponemos nosotros.",
  },
];

export default function TrabajaConNosotros() {
  return (
    <>
      <CabeceraPagina
        antetitulo="Empleo"
        titulo={
          <>
            Trabaja con <em>nosotros</em>
          </>
        }
      >
        <p>
          ¿Te interesa trabajar en limpieza con {negocio.nombre}? Mándanos tus datos
          y te tendremos en cuenta.
        </p>
      </CabeceraPagina>

      <section className="seccion">
        <div className={`contenedor ${s.rejilla}`}>
          <div className={s.lateral}>
            <p className="antetitulo">Cómo es el trabajo</p>
            <h2 className="seccion__titulo">Limpieza de todo tipo</h2>
            <ul className={s.datos}>
              {datos.map(({ icono: Icono, titulo, texto }) => (
                <li key={titulo} className="tarjeta">
                  <span className="icono-circulo">
                    <Icono aria-hidden="true" size={22} />
                  </span>
                  <div>
                    <h3>{titulo}</h3>
                    <p>{texto}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className={s.nota}>
              <MessageCircle aria-hidden="true" size={18} />
              <span>
                Rellena el formulario y nos llega directamente. Usamos tus datos sólo
                para valorar tu candidatura (
                <Link className="enlace" href="/politica-de-privacidad">
                  privacidad
                </Link>
                ).
              </span>
            </p>
          </div>

          <Candidatura />
        </div>
      </section>
    </>
  );
}
