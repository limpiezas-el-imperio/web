import CabeceraPagina from "@/componentes/CabeceraPagina";
import Instalar, { capturaTemprana } from "@/componentes/Instalar";
import { metadatosPagina } from "@/datos/sitio";
import s from "./instalar.module.css";

// Para poner la web en la pantalla de inicio como una aplicación. Se hizo para
// Frank, con un Android antiguo que no encontraba la opción en el menú. No va
// en el menú, en el pie ni en el sitemap, y no se indexa: se manda el enlace.
//
// Sólo esta página enlaza el manifiesto instalable (app.webmanifest) y
// registra el service worker, así que Chrome ofrece instalar sólo desde aquí.
// No acaba con <Contacto />: no es una página para clientes.
export const metadata = {
  ...metadatosPagina({
    titulo: "Instalar en el móvil",
    descripcion: "Pon la web de Limpiezas El Imperio en la pantalla de inicio del móvil.",
    ruta: "/instalar",
  }),
  manifest: "/instalar/app.webmanifest",
  robots: { index: false },
};

const pasos = [
  {
    titulo: "En Chrome",
    texto: (
      <>
        Pulsa <strong>⋮</strong> arriba a la derecha y luego{" "}
        <strong>«Instalar aplicación»</strong> o{" "}
        <strong>«Añadir a pantalla de inicio»</strong> (a veces hay que bajar un
        poco en el menú).
      </>
    ),
  },
  {
    titulo: "En Samsung Internet",
    texto: (
      <>
        Pulsa <strong>☰</strong> abajo a la derecha, luego{" "}
        <strong>«Añadir página a»</strong> y <strong>«Pantalla de inicio»</strong>.
      </>
    ),
  },
  {
    titulo: "En el iPhone",
    texto: (
      <>
        En Safari, pulsa el botón de compartir (un cuadrado con una flecha), baja y
        elige <strong>«Añadir a pantalla de inicio»</strong>.
      </>
    ),
  },
  {
    titulo: "Si nada de esto funciona",
    texto: (
      <>
        Guarda esta página en <strong>marcadores</strong> (la estrella). Luego mantén
        pulsado un hueco de la pantalla de inicio, entra en{" "}
        <strong>«Widgets»</strong>, arrastra el <strong>«Marcador»</strong> de
        Chrome y elige la página.
      </>
    ),
  },
];

export default function PaginaInstalar() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: capturaTemprana }} />
      <CabeceraPagina
        antetitulo="En tu móvil"
        titulo={
          <>
            La web en tu <em>pantalla de inicio</em>
          </>
        }
      >
        <p>Con un icono, como una aplicación: un toque y la tienes abierta.</p>
      </CabeceraPagina>

      <section className={`seccion ${s.cuerpo}`}>
        <div className="contenedor">
          <Instalar />

          <div className={s.aviso}>
            <h2 className="seccion__titulo">¿No sale el botón?</h2>
            <p>
              Si has abierto el enlace desde WhatsApp, ábrelo antes en el navegador:
              pulsa <strong>⋮</strong> arriba a la derecha y{" "}
              <strong>«Abrir en Chrome»</strong>. Si aun así no sale, hazlo a mano:
            </p>
          </div>

          <ul className={s.pasos}>
            {pasos.map(({ titulo, texto }) => (
              <li key={titulo} className={`tarjeta ${s.paso}`}>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
