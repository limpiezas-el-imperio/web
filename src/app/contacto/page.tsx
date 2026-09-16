import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone, Share2 } from "lucide-react";
import CabeceraPagina from "@/componentes/CabeceraPagina";
import DatosEstructurados from "@/componentes/DatosEstructurados";
import {
  enlaceWhatsApp,
  horario,
  negocio,
  redes,
  valoracion,
  zonas,
} from "@/datos/negocio";
import { metadatosPagina, urlBase } from "@/datos/sitio";
import s from "./contacto.module.css";

export const metadata = metadatosPagina({
  titulo: "Contacto",
  descripcion:
    "Pide presupuesto por WhatsApp, teléfono o correo. Limpiezas El Imperio, en La Pobla de Vallbona: lunes a viernes de 6:00 a 18:00.",
  ruta: "/contacto",
});

// Lo que pedían los formularios de su web vieja (tipo de vivienda,
// habitaciones, baños, fecha) y lo que dice su FAQ: «qué hay que limpiar,
// dónde y cuándo». Sin formulario: va escrito en el mensaje de WhatsApp.
const datosPresupuesto = [
  {
    titulo: "Qué hay que limpiar",
    texto: "Un piso, una casa, una oficina, una comunidad, una obra…",
  },
  { titulo: "Dónde", texto: "La localidad o el barrio." },
  {
    titulo: "Cuándo y cada cuánto",
    texto: "Una sola vez, o cada semana, quincena o mes.",
  },
  { titulo: "Cómo es", texto: "Si es una vivienda, cuántas habitaciones y baños tiene." },
];

const mensajePresupuesto = [
  "Hola, quería pedir presupuesto.",
  "• Qué hay que limpiar: ",
  "• Dónde: ",
  "• Cuándo y cada cuánto: ",
  "• Habitaciones y baños: ",
].join("\n");

const paginaContacto = {
  "@type": "ContactPage",
  url: `${urlBase}/contacto`,
  mainEntity: {
    "@type": "LocalBusiness",
    name: negocio.nombre,
    url: urlBase,
    telephone: negocio.telefono,
    email: negocio.correo,
    address: {
      "@type": "PostalAddress",
      addressLocality: negocio.localidad,
      postalCode: negocio.codigoPostal,
      addressRegion: negocio.provincia,
      addressCountry: "ES",
    },
  },
};

// La página de contacto no acaba con <Contacto />, como las demás: sería
// repetir lo mismo dos veces seguidas.
export default function PaginaContacto() {
  return (
    <>
      <DatosEstructurados datos={paginaContacto} />

      <CabeceraPagina
        antetitulo="Contacto"
        titulo={
          <>
            Hablemos de tu <em>limpieza</em>
          </>
        }
      >
        <p>
          Escríbenos por WhatsApp, llámanos o mándanos un correo, y te damos
          presupuesto.
        </p>
      </CabeceraPagina>

      <section id="contacto" className="seccion">
        <div className={`contenedor ${s.rejilla}`}>
          {/* ——— Canales ——— */}
          <ul className={s.canales}>
            <li className={`tarjeta ${s.canal} ${s.canal_principal}`}>
              <span className={`icono-circulo ${s.icono_verde}`}>
                <MessageCircle aria-hidden="true" size={22} />
              </span>
              <div className={s.canal__texto}>
                <h2>WhatsApp</h2>
                <p>Cuéntanos qué necesitas y te respondemos con tu presupuesto.</p>
                <p className={s.canal__dato}>{negocio.telefonoVisible}</p>
              </div>
              <a className="boton boton--whatsapp boton--grande" href={enlaceWhatsApp()}>
                <MessageCircle aria-hidden="true" size={20} />
                Escribir por WhatsApp
              </a>
            </li>

            <li className={`tarjeta ${s.canal}`}>
              <span className="icono-circulo">
                <Phone aria-hidden="true" size={22} />
              </span>
              <div className={s.canal__texto}>
                <h2>Teléfono</h2>
                <p>{horario.semana}.</p>
                <p className={s.canal__dato}>{negocio.telefonoVisible}</p>
              </div>
              <a className="boton boton--claro" href={`tel:${negocio.telefono}`}>
                <Phone aria-hidden="true" size={20} />
                Llamar
              </a>
            </li>

            <li className={`tarjeta ${s.canal}`}>
              <span className="icono-circulo">
                <Mail aria-hidden="true" size={22} />
              </span>
              <div className={s.canal__texto}>
                <h2>Correo</h2>
                <p>Si prefieres escribirnos con calma.</p>
                <p className={`${s.canal__dato} ${s.canal__correo}`}>{negocio.correo}</p>
              </div>
              <a className="boton boton--claro" href={`mailto:${negocio.correo}`}>
                <Mail aria-hidden="true" size={20} />
                Escribir
              </a>
            </li>
          </ul>

          {/* ——— Horario, zona y redes ——— */}
          <aside className={s.lateral}>
            <div className={`tarjeta ${s.bloque}`}>
              <h2 className={s.bloque__titulo}>
                <Clock aria-hidden="true" size={20} />
                Horario
              </h2>
              <p>{horario.semana}</p>
              <p>{horario.finDeSemana}</p>
            </div>

            <div className={`tarjeta ${s.bloque}`}>
              <h2 className={s.bloque__titulo}>
                <MapPin aria-hidden="true" size={20} />
                Dónde trabajamos
              </h2>
              <p>
                Salimos desde {negocio.localidad} y trabajamos en el Camp de Túria,
                Valencia y alrededores.
              </p>
              <ul className={s.zonas}>
                {zonas.map((z) => (
                  <li key={z}>{z}</li>
                ))}
              </ul>
              <a className="enlace-flecha" href={negocio.mapa}>
                Ver en Google Maps
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </div>

            <div className={`tarjeta ${s.bloque}`}>
              <h2 className={s.bloque__titulo}>
                <Share2 aria-hidden="true" size={20} />
                Síguenos
              </h2>
              <ul className={s.redes}>
                {redes.map((r) => (
                  <li key={r.nombre}>
                    <a href={r.url} rel="me noopener">
                      {r.nombre}
                    </a>
                  </li>
                ))}
              </ul>
              <a className="enlace-flecha" href={negocio.mapa}>
                {valoracion.nota} de 5 en Google, con {valoracion.total} reseñas
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ——— Qué contarnos ——— */}
      <section className={`seccion ${s.presupuesto}`}>
        <div className="contenedor">
          <header className="seccion__cabecera">
            <p className="antetitulo">Para darte presupuesto</p>
            <h2 className="seccion__titulo">Qué contarnos</h2>
            <p className="seccion__entradilla">
              Con estos datos es más fácil darte presupuesto. El mensaje de
              WhatsApp ya lleva las preguntas: sólo tienes que rellenarlo.
            </p>
          </header>

          <ol className={s.pasos}>
            {datosPresupuesto.map((d, i) => (
              <li key={d.titulo} className="tarjeta">
                <span className="numero" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{d.titulo}</h3>
                <p>{d.texto}</p>
              </li>
            ))}
          </ol>

          <a
            className={`boton boton--whatsapp boton--grande ${s.presupuesto__boton}`}
            href={enlaceWhatsApp(mensajePresupuesto)}
          >
            <MessageCircle aria-hidden="true" size={20} />
            Pedir presupuesto por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
