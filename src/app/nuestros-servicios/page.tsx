import { ArrowRight, ArrowUpRight, Clock, Leaf, Package, Users } from "lucide-react";
import Link from "next/link";
import CabeceraPagina from "@/componentes/CabeceraPagina";
import Contacto from "@/componentes/Contacto";
import DatosEstructurados from "@/componentes/DatosEstructurados";
import { enlaceWhatsApp, negocio, servicios, zonas } from "@/datos/negocio";
import { metadatosPagina, urlBase } from "@/datos/sitio";
import s from "./servicios.module.css";

export const metadata = metadatosPagina({
  titulo: "Servicios de limpieza",
  descripcion:
    "Limpieza de viviendas y alquileres vacacionales, cristales y persianas, comunidades, jardines y piscinas, oficinas, locales y obras. En La Pobla de Vallbona, el Camp de Túria y Valencia.",
  ruta: "/nuestros-servicios",
});

const total = servicios.reduce((n, g) => n + g.lista.length, 0);

// Lo que vale para todos los servicios. Sale de su web: «Por qué elegirnos» y
// las preguntas frecuentes.
const incluido = [
  {
    icono: Package,
    titulo: "Materiales incluidos",
    texto: "Llevamos los materiales y los productos de limpieza.",
  },
  {
    icono: Leaf,
    titulo: "Para cada superficie",
    texto: "Productos para suelos, encimeras y aseos, también ecológicos.",
  },
  {
    icono: Clock,
    titulo: "Como te venga mejor",
    texto: "Por horas o con precio cerrado, según el trabajo.",
  },
  {
    icono: Users,
    titulo: "Un equipo cerca",
    texto: "Trabajamos con un equipo de personas que viven en la zona.",
  },
];

const catalogo = {
  "@type": "ItemList",
  name: `Servicios de ${negocio.nombre}`,
  itemListElement: servicios.flatMap((g) =>
    g.lista.map((l) => ({
      "@type": "Service",
      name: l.nombre,
      description: l.descripcion,
      category: g.titulo,
      provider: { "@type": "LocalBusiness", name: negocio.nombre, url: urlBase },
      areaServed: zonas.map((z) => ({ "@type": "Place", name: z })),
    })),
  ),
};

export default function NuestrosServicios() {
  return (
    <>
      <DatosEstructurados datos={catalogo} />

      <CabeceraPagina
        antetitulo="Servicios"
        titulo={
          <>
            Todo lo que <em>limpiamos</em>
          </>
        }
      >
        <p>
          {servicios.length} áreas y {total} servicios, de la casa a la obra. Si no
          ves lo que necesitas, pregúntanos.
        </p>
      </CabeceraPagina>

      <section className="seccion">
        <div className={`contenedor ${s.rejilla}`}>
          {/* Índice: lateral fijo en escritorio, fila deslizable en el móvil */}
          <nav className={s.indice} aria-label="Áreas de servicio">
            <p className="antetitulo">Áreas</p>
            <ol>
              {servicios.map((g, i) => (
                <li key={g.categoria}>
                  <a href={`#${g.categoria}`}>
                    <span className="numero" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {g.titulo}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className={s.grupos}>
            {servicios.map((g, i) => (
              <section
                key={g.categoria}
                id={g.categoria}
                className={s.grupo}
                aria-labelledby={`titulo-${g.categoria}`}
              >
                <header className={s.grupo__cabecera}>
                  <span className={`numero ${s.grupo__numero}`} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 id={`titulo-${g.categoria}`} className={s.grupo__titulo}>
                      {g.titulo}
                    </h2>
                    <p className={s.grupo__resumen}>{g.resumen}</p>
                  </div>
                </header>

                <dl className={s.lista}>
                  {g.lista.map((l) => (
                    <div key={l.nombre} className={s.servicio}>
                      <dt>{l.nombre}</dt>
                      <dd>{l.descripcion}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  className="enlace-flecha"
                  href={enlaceWhatsApp(
                    `Hola, quería pedir presupuesto para ${g.titulo.toLowerCase()}.`,
                  )}
                >
                  Pedir presupuesto
                  <ArrowUpRight aria-hidden="true" size={16} />
                </a>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Lo que incluyen todos ——— */}
      <section className={s.incluido}>
        <div className="contenedor">
          <h2 className={`antetitulo ${s.incluido__titulo}`}>En todos los servicios</h2>
          <ul className={s.incluido__lista}>
            {incluido.map(({ icono: Icono, titulo, texto }) => (
              <li key={titulo}>
                <span className="icono-circulo">
                  <Icono aria-hidden="true" size={22} />
                </span>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </li>
            ))}
          </ul>
          <p className={s.incluido__pie}>
            ¿Precios, frecuencias, zonas?{" "}
            <Link className="enlace-flecha" href="/preguntas-frecuentes">
              Preguntas frecuentes
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </p>
        </div>
      </section>

      <Contacto />
    </>
  );
}
