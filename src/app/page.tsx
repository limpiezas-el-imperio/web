import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Leaf,
  MessageCircle,
  Package,
  Plus,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Contacto from "@/componentes/Contacto";
import DatosEstructurados from "@/componentes/DatosEstructurados";
import Galeria from "@/componentes/Galeria";
import MapaZonas from "@/componentes/MapaZonas";
import Opiniones from "@/componentes/Opiniones";
import Presupuesto from "@/componentes/Presupuesto";
import { fotoPortada } from "@/datos/fotos";
import {
  enlaceWhatsApp,
  negocio,
  redes,
  servicios,
  valoracion,
  zonas,
} from "@/datos/negocio";
import { metadatosPagina, urlBase } from "@/datos/sitio";
import s from "./inicio.module.css";

export const metadata = metadatosPagina({
  descripcion:
    "Limpieza de viviendas, comunidades, oficinas y obras en La Pobla de Vallbona, el Camp de Túria y Valencia. Materiales y productos incluidos. Pide presupuesto por WhatsApp.",
  ruta: "/",
});

// Lo que dice su web de cómo trabaja: «Por qué elegirnos» y la FAQ.
const hechos = [
  { icono: Package, texto: "Materiales y productos incluidos" },
  { icono: Leaf, texto: "Productos ecológicos" },
  { icono: Clock, texto: "L–V, de 6:00 a 18:00" },
  { icono: MessageCircle, texto: "Presupuesto por WhatsApp" },
];

const pasos = [
  {
    titulo: "Nos cuentas",
    texto: "Por WhatsApp, teléfono o correo: qué hay que limpiar, dónde y cuándo.",
  },
  {
    titulo: "Te damos presupuesto",
    texto: "Por horas o con precio cerrado, según el trabajo.",
  },
  {
    titulo: "Lo dejamos impecable",
    texto: "Una vez, o cada día, semana, quincena o mes: tú eliges.",
  },
];

const negocioEstructurado = {
  "@type": "LocalBusiness",
  name: negocio.nombre,
  description: "Limpieza de viviendas, comunidades, oficinas, locales y obras.",
  image: `${urlBase}/logo.jpg`,
  logo: `${urlBase}/logo.jpg`,
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
  hasMap: negocio.mapa,
  areaServed: zonas.map((z) => ({ "@type": "Place", name: z })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "06:00",
      closes: "18:00",
    },
  ],
  sameAs: redes.map((r) => r.url),
};

export default function Inicio() {
  return (
    <>
      <DatosEstructurados datos={negocioEstructurado} />

      {/* ——— Portada: titular y foto ——— */}
      <section className={s.portada}>
        <div className={`contenedor ${s.portada__rejilla}`}>
          <div className={s.portada__texto}>
            {/* Todo en un span: el antetítulo es flex y se comería los espacios
                entre elementos sueltos. */}
            <p className="antetitulo">
              <span>
                <span>{negocio.localidad}</span>
                <span className={s.solo_ancho}> · Camp de Túria</span> ·{" "}
                <span>Valencia</span>
              </span>
            </p>
            <h1 className={s.portada__titulo}>
              Limpieza que <em>transforma</em>.
            </h1>
            <p className={s.portada__entradilla}>
              Viviendas, comunidades, oficinas, locales y obras.
              <span className={s.solo_ancho}>
                {" "}
                Llevamos los materiales y los productos: tú sólo nos cuentas qué
                necesitas.
              </span>
            </p>
            <div className={s.acciones}>
              <a className="boton boton--whatsapp boton--grande" href={enlaceWhatsApp()}>
                <MessageCircle aria-hidden="true" size={20} />
                Pide presupuesto
              </a>
              <a className="enlace-flecha" href={`tel:${negocio.telefono}`}>
                o llama al {negocio.telefonoVisible}
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </div>
            {/* En el móvil sustituye a los botones: la barra fija de abajo ya
                es la llamada a la acción. En escritorio va debajo de ellos. */}
            <a className={s.valoracion} href="#opiniones">
              <span className={s.valoracion__estrellas} aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <span>
                <strong>{valoracion.nota}</strong> · {valoracion.total} reseñas en Google
              </span>
              <ArrowRight aria-hidden="true" size={16} />
            </a>
          </div>

          <figure className={s.portada__foto}>
            <Image
              src={fotoPortada.src}
              alt={fotoPortada.alt}
              fill
              // Móvil: a sangre. Tablet: el ancho del contenedor. Escritorio: su columna.
              sizes="(max-width: 40rem) 100vw, (max-width: 56rem) calc(100vw - 4rem), 32rem"
              placeholder="blur"
              loading="eager"
              fetchPriority="high"
            />
          </figure>
        </div>

        <ul className={`contenedor ${s.hechos}`}>
          {hechos.map(({ icono: Icono, texto }) => (
            <li key={texto}>
              <span className="icono-circulo">
                <Icono aria-hidden="true" size={22} />
              </span>
              {texto}
            </li>
          ))}
        </ul>
      </section>

      {/* ——— Servicios: índice numerado ——— */}
      <section id="servicios" className={`seccion ${s.servicios}`}>
        <div className={`contenedor ${s.dos_columnas}`}>
          <header className={s.lateral}>
            <p className="antetitulo">Servicios</p>
            <h2 className="seccion__titulo">Servicios de limpieza</h2>
            <p className="seccion__entradilla">
              Para particulares, comunidades y empresas, de forma puntual o
              periódica. Si&nbsp;no encuentras lo que buscas, consúltanos.
            </p>
            <Link className={`enlace-flecha ${s.ver_todos}`} href="/nuestros-servicios">
              Todos los servicios, con detalle
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </header>

          <div className={s.indice}>
            {servicios.map((g, i) => {
              return (
                <details
                  key={g.categoria}
                  name="servicios"
                  className={s.grupo}
                  open={i === 0}
                >
                  <summary>
                    <span className={`numero ${s.grupo__numero}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={s.grupo__titulo}>{g.titulo}</span>
                    <Plus aria-hidden="true" size={20} className={s.grupo__signo} />
                  </summary>
                  <div className={s.grupo__cuerpo}>
                    <p className={s.grupo__resumen}>{g.resumen}</p>
                    <ul className={s.grupo__lista}>
                      {g.lista.map((l) => (
                        <li key={l.nombre}>{l.nombre}</li>
                      ))}
                    </ul>
                    <a
                      className="enlace-flecha"
                      href={enlaceWhatsApp(
                        `Hola, quería pedir presupuesto para ${g.titulo.toLowerCase()}.`,
                      )}
                    >
                      Pedir presupuesto
                      <ArrowUpRight aria-hidden="true" size={16} />
                    </a>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— Presupuesto guiado por WhatsApp (ver Presupuesto.tsx) ——— */}
      <section id="presupuesto" className={`seccion ${s.presupuesto}`}>
        <div className={`contenedor ${s.dos_columnas}`}>
          <header className={s.lateral}>
            <p className="antetitulo">Presupuesto</p>
            <h2 className="seccion__titulo">Cuéntanos qué necesitas</h2>
            <p className="seccion__entradilla">
              Elige unas opciones y te abrimos WhatsApp con el mensaje ya escrito.
              Sin formularios: el mensaje lo envías tú.
            </p>
          </header>
          <Presupuesto />
        </div>
      </section>

      {/* ——— Galería: las fotos como prueba (ver Galeria.tsx) ——— */}
      <section id="trabajos" className={`seccion ${s.trabajos}`}>
        <div className="contenedor">
          <header className="seccion__cabecera">
            <p className="antetitulo">Nuestro trabajo</p>
            <h2 className="seccion__titulo">Galería</h2>
          </header>

          <Galeria />
        </div>
      </section>

      {/* ——— Cómo trabajamos: una franja, no una sección entera ——— */}
      <section id="como-trabajamos" className={s.pasos}>
        <div className="contenedor">
          <h2 className={`antetitulo antetitulo--claro ${s.pasos__titulo}`}>Cómo trabajamos</h2>
          <ol className={s.pasos__lista}>
            {pasos.map((p, i) => (
              <li key={p.titulo}>
                <span className="numero numero--claro" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </li>
            ))}
          </ol>
          <p className={s.pasos__pie}>
            Nuestro consejo: una limpieza profunda al mes. ¿Más dudas?{" "}
            <Link className="enlace enlace--claro" href="/preguntas-frecuentes">
              Preguntas frecuentes
            </Link>
          </p>
        </div>
      </section>

      {/* ——— Zonas: mapa ——— */}
      <section id="zonas" className={`seccion ${s.zonas}`}>
        <div className={`contenedor ${s.dos_columnas}`}>
          <header className={s.lateral}>
            <p className="antetitulo">Zonas</p>
            <h2 className="seccion__titulo">Cerca de ti</h2>
            <p className="seccion__entradilla">
              Desde {negocio.localidad}, a todo el Camp de Túria,
              Valencia y alrededores.
            </p>
            <ul className={s.zonas__lista}>
              {zonas.map((z) => (
                <li key={z}>{z}</li>
              ))}
            </ul>
            <p className={s.zonas__nota}>
              ¿No ves tu zona?{" "}
              <a
                className="enlace"
                href={enlaceWhatsApp("Hola, ¿trabajáis en mi zona? Estoy en ")}
              >
                Pregúntanos
              </a>
            </p>
            <Link className={`enlace-flecha ${s.ver_todos}`} href="/zonas-de-servicio">
              Todas las zonas
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </header>
          <MapaZonas />
        </div>
      </section>

      {/* ——— Opiniones de Google ——— */}
      <section id="opiniones" className={`seccion ${s.opiniones}`}>
        <div className="contenedor">
          <div className={s.opiniones__cabecera}>
            <div>
              <p className="antetitulo">Opiniones</p>
              <h2 className="seccion__titulo">Lo dicen nuestros clientes</h2>
            </div>
            <a className="enlace-flecha" href={negocio.mapa}>
              Todas las reseñas en Google
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>
          <Opiniones />
        </div>
      </section>

      <Contacto />
    </>
  );
}
