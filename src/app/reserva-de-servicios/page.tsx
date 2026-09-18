import { Clock, MessageCircle, Package } from "lucide-react";
import Link from "next/link";
import CabeceraPagina from "@/componentes/CabeceraPagina";
import s from "@/componentes/PaginaFormulario.module.css";
import Reserva from "@/componentes/Reserva";
import { horario, negocio } from "@/datos/negocio";
import { metadatosPagina } from "@/datos/sitio";

export const metadata = metadatosPagina({
  titulo: "Reserva de servicios",
  descripcion: `Reserva una limpieza con ${negocio.nombre}: elige el tipo, el día y la hora.`,
  ruta: "/reserva-de-servicios",
});

// Para reservar día y hora: la tenía su web vieja (misma dirección, su «hoja
// de servicio») y la pidió Frank. Formulario por correo a info@ (Reserva.tsx).
// El PDF de la hoja que se descargaba allí no se publica: es su parte de
// trabajo interno, con precios y el mínimo de horas. En la navegación, dentro
// de «Clientes» (`clientes` en navegacion.ts). No acaba con <Contacto />: ya
// lleva WhatsApp y remite al presupuesto.
const datos = [
  {
    icono: Clock,
    titulo: "Cuándo trabajamos",
    texto: `${horario.semana}. ${horario.finDeSemana}.`,
  },
  {
    icono: MessageCircle,
    titulo: "Te lo confirmamos",
    texto: "Te contestamos para confirmar el día y la hora.",
  },
  {
    icono: Package,
    titulo: "Productos incluidos",
    texto: "Los materiales y los productos de limpieza los ponemos nosotros.",
  },
];

export default function ReservaDeServicios() {
  return (
    <>
      <CabeceraPagina
        antetitulo="Clientes"
        titulo={
          <>
            Reserva tu <em>limpieza</em>
          </>
        }
      >
        <p>Dinos qué hay que limpiar, dónde y cuándo, y te lo confirmamos.</p>
      </CabeceraPagina>

      <section className="seccion">
        <div className={`contenedor ${s.rejilla}`}>
          <div className={s.lateral}>
            <p className="antetitulo">Cómo funciona</p>
            <h2 className="seccion__titulo">Elige el día y la hora</h2>
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
            <p className="seccion__entradilla">
              ¿Aún no sabes cuánto cuesta?{" "}
              <Link className="enlace" href="/contacto">
                Pide presupuesto
              </Link>
              .
            </p>
          </div>

          <Reserva />
        </div>
      </section>
    </>
  );
}
