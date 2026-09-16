import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import CabeceraPagina from "@/componentes/CabeceraPagina";
import Contacto from "@/componentes/Contacto";
import DatosEstructurados from "@/componentes/DatosEstructurados";
import { enlaceWhatsApp } from "@/datos/negocio";
import { preguntas } from "@/datos/preguntas";
import { metadatosPagina } from "@/datos/sitio";
import s from "./preguntas.module.css";

export const metadata = metadatosPagina({
  titulo: "Preguntas frecuentes",
  descripcion:
    "Precios, productos, zonas, horario y cómo reservar: lo que más nos preguntan sobre nuestros servicios de limpieza en La Pobla de Vallbona y Valencia.",
  ruta: "/preguntas-frecuentes",
});

// El ancla de cada pregunta, para poder enlazarla: «¿Qué horario tenéis?» →
// «que-horario-teneis».
function ancla(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function PreguntasFrecuentes() {
  return (
    <>
      <DatosEstructurados
        datos={{
          "@type": "FAQPage",
          mainEntity: preguntas.map((p) => ({
            "@type": "Question",
            name: p.pregunta,
            acceptedAnswer: { "@type": "Answer", text: p.respuesta },
          })),
        }}
      />

      <CabeceraPagina
        antetitulo="Preguntas frecuentes"
        titulo={
          <>
            Lo que <em>más nos preguntan</em>
          </>
        }
      >
        <p>
          Precios, productos, zonas y cómo reservar. Si tu duda no está aquí,
          pregúntanos por WhatsApp.
        </p>
      </CabeceraPagina>

      <section className="seccion">
        <div className={`contenedor ${s.rejilla}`}>
          <aside className={s.lateral}>
            <nav aria-label="Preguntas">
              <p className={s.lateral__titulo}>En esta página</p>
              <ol className={s.indice}>
                {preguntas.map((p) => (
                  <li key={p.pregunta}>
                    <a href={`#${ancla(p.pregunta)}`}>{p.pregunta}</a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className={s.ayuda}>
              <p className={s.ayuda__titulo}>¿No encuentras tu respuesta?</p>
              <p>Cuéntanos qué necesitas y te contestamos.</p>
              <a
                className="boton boton--whatsapp"
                href={enlaceWhatsApp("Hola, tengo una pregunta: ")}
              >
                <MessageCircle aria-hidden="true" size={20} />
                Pregúntanos
              </a>
            </div>
          </aside>

          <div className={s.lista}>
            {preguntas.map((p, i) => (
              <article
                key={p.pregunta}
                id={ancla(p.pregunta)}
                className={s.pregunta}
              >
                <span className={s.pregunta__numero} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className={s.pregunta__titulo}>{p.pregunta}</h2>
                  <p className={s.pregunta__respuesta}>{p.respuesta}</p>
                  {p.enlace && (
                    <Link className={s.pregunta__enlace} href={p.enlace.href}>
                      {p.enlace.texto}
                      <ArrowRight aria-hidden="true" size={18} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Contacto />
    </>
  );
}
