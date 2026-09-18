import { FileText, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";
import CabeceraPagina from "@/componentes/CabeceraPagina";
import Facturacion from "@/componentes/Facturacion";
import { negocio } from "@/datos/negocio";
import { metadatosPagina } from "@/datos/sitio";
import s from "@/componentes/PaginaFormulario.module.css";

export const metadata = metadatosPagina({
  titulo: "Datos de facturación",
  descripcion: `Manda a ${negocio.nombre} los datos para hacer tu factura.`,
  ruta: "/datos-de-facturacion",
});

// Para los clientes que necesitan factura con sus datos: la tenía su web vieja
// (misma dirección) y la pidió Frank. Formulario por correo a info@
// (Facturacion.tsx). No va en el menú, sólo en el pie: Frank manda el enlace a
// quien le pide factura. No acaba con <Contacto />: el que llega ya es cliente.
const datos = [
  {
    icono: FileText,
    titulo: "A tu nombre",
    texto: "El nombre o la razón social y el NIF, CIF o DNI que tienen que salir en la factura.",
  },
  {
    icono: MapPin,
    titulo: "Dirección fiscal",
    texto: "La que va en la factura, que puede no ser la de la casa que limpiamos.",
  },
  {
    icono: ShieldCheck,
    titulo: "Sólo para la factura",
    texto: "No usamos estos datos para nada más.",
  },
];

export default function DatosDeFacturacion() {
  return (
    <>
      <CabeceraPagina
        antetitulo="Clientes"
        titulo={
          <>
            Datos de <em>facturación</em>
          </>
        }
      >
        <p>
          ¿Necesitas factura con tus datos o los de tu empresa? Déjanoslos aquí y la
          hacemos con ellos.
        </p>
      </CabeceraPagina>

      <section className="seccion">
        <div className={`contenedor ${s.rejilla}`}>
          <div className={s.lateral}>
            <p className="antetitulo">Qué necesitamos</p>
            <h2 className="seccion__titulo">Lo que lleva la factura</h2>
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
              Más detalles en la{" "}
              <Link className="enlace" href="/politica-de-privacidad">
                política de privacidad
              </Link>
              .
            </p>
          </div>

          <Facturacion />
        </div>
      </section>
    </>
  );
}
