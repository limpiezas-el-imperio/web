import { ArrowRight, ArrowUpRight, Clock, Leaf, MessageCircle, Package, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Contacto from "@/componentes/Contacto";
import DatosEstructurados from "@/componentes/DatosEstructurados";
import MapaZonas from "@/componentes/MapaZonas";
import Opiniones from "@/componentes/Opiniones";
import { type Foto, fotos } from "@/datos/fotos";
import {
  enlaceWhatsApp,
  negocio,
  redes,
  servicios,
  zonas,
} from "@/datos/negocio";
import { metadatosPagina, urlBase } from "@/datos/sitio";
import s from "./inicio.module.css";

export const metadata = metadatosPagina({
  descripcion:
    "Limpieza de viviendas, comunidades, oficinas y obras en La Pobla de Vallbona, el Camp de Túria y Valencia. Materiales y productos incluidos. Pide presupuesto por WhatsApp.",
  ruta: "/",
});

// Las fotos de «Nuestro trabajo». Van aparte y no dentro de cada servicio: no
// hay foto para todos y emparejarlas a la fuerza enseñaba, por ejemplo, un
// salón en «Obras». Aquí son lo que son: prueba de trabajos reales.
// `zona` es el sitio de cada una en la rejilla de escritorio (ver el CSS).
const trabajos: { foto: Foto; zona: string }[] = [
  { foto: fotos.karcher, zona: s.fotoA },
  { foto: fotos.cocina, zona: s.fotoB },
  { foto: fotos.banio, zona: s.fotoC },
  { foto: fotos.grifo, zona: s.fotoD },
  { foto: fotos.suelo, zona: s.fotoE },
  { foto: fotos.ducha, zona: s.fotoF },
  { foto: fotos.sillas, zona: s.fotoG },
];

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
    texto: "Por hora, por servicio o con un paquete mensual, según el trabajo.",
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
            <p className="antetitulo">
              <span>{negocio.localidad}</span> · <span>Camp de Túria</span> ·{" "}
              <span>Valencia</span>
            </p>
            <h1 className={s.portada__titulo}>
              Limpieza que <em>se&nbsp;nota</em>.
            </h1>
            <p className={s.portada__entradilla}>
              Viviendas, comunidades, oficinas, locales y obras. Llevamos los
              materiales y los productos: tú sólo nos cuentas qué necesitas.
            </p>
            <div className={s.acciones}>
              <a className="boton boton--whatsapp boton--grande" href={enlaceWhatsApp()}>
                <MessageCircle aria-hidden="true" size={22} />
                Pide presupuesto
              </a>
              <a className={s.telefono} href={`tel:${negocio.telefono}`}>
                o llama al {negocio.telefonoVisible}
                <ArrowRight aria-hidden="true" size={18} />
              </a>
            </div>
          </div>

          <figure className={s.portada__foto}>
            <Image
              src={fotos.aspirado.src}
              alt={fotos.aspirado.alt}
              fill
              sizes="(max-width: 56rem) 100vw, 32rem"
              placeholder="blur"
              loading="eager"
              fetchPriority="high"
            />
            <figcaption>Frank, en pleno trabajo</figcaption>
          </figure>
        </div>

        <ul className={`contenedor ${s.hechos}`}>
          {hechos.map(({ icono: Icono, texto }) => (
            <li key={texto}>
              <Icono aria-hidden="true" size={20} />
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
            <h2 className="seccion__titulo">De la casa a la obra</h2>
            <p className="seccion__entradilla">
              Si hay que limpiarlo, seguramente lo hacemos. Y si no ves lo que
              buscas, pregúntanos.
            </p>
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
                    <span className={s.grupo__numero}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={s.grupo__titulo}>{g.titulo}</span>
                    <Plus aria-hidden="true" size={22} className={s.grupo__signo} />
                  </summary>
                  <div className={s.grupo__cuerpo}>
                    <p className={s.grupo__resumen}>{g.resumen}</p>
                    <ul className={s.grupo__lista}>
                      {g.lista.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                    <a
                      className="enlace-flecha"
                      href={enlaceWhatsApp(
                        `Hola, quería pedir presupuesto para ${g.titulo.toLowerCase()}.`,
                      )}
                    >
                      Pedir presupuesto
                      <ArrowUpRight aria-hidden="true" size={18} />
                    </a>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— Nuestro trabajo: las fotos como prueba ——— */}
      <section id="trabajos" className={`seccion ${s.trabajos}`}>
        <div className="contenedor">
          <header className={s.trabajos__cabecera}>
            <div>
              <p className="antetitulo">Nuestro trabajo</p>
              <h2 className="seccion__titulo">Resultados reales</h2>
            </div>
            <p className="seccion__entradilla">
              Fotos de nuestros propios trabajos. Nada de bancos de imágenes.
            </p>
          </header>

          <ul className={s.galeria} aria-label="Fotos de trabajos realizados">
            {trabajos.map(({ foto, zona }) => (
              <li key={foto.pie} className={zona}>
                <figure className={s.foto}>
                  <div className={s.foto__marco}>
                    <Image
                      src={foto.src}
                      alt={foto.alt}
                      fill
                      sizes="(max-width: 40rem) 80vw, (max-width: 56rem) 50vw, 36rem"
                      placeholder="blur"
                    />
                  </div>
                  <figcaption>{foto.pie}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className={s.galeria__pista} aria-hidden="true">
            {trabajos.length} fotos · desliza para verlas
          </p>
        </div>
      </section>

      {/* ——— Cómo trabajamos: una franja, no una sección entera ——— */}
      <section id="como-trabajamos" className={s.pasos}>
        <div className="contenedor">
          <h2 className={s.pasos__titulo}>Cómo trabajamos</h2>
          <ol className={s.pasos__lista}>
            {pasos.map((p, i) => (
              <li key={p.titulo}>
                <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </li>
            ))}
          </ol>
          <p className={s.pasos__pie}>
            Nuestro consejo: una limpieza profunda al mes. ¿Más dudas?{" "}
            <Link href="/preguntas-frecuentes">Preguntas frecuentes</Link>
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
              Salimos desde {negocio.localidad} y trabajamos en el Camp de Túria,
              Valencia y alrededores.
            </p>
            <ul className={s.zonas__lista}>
              {zonas.map((z) => (
                <li key={z}>{z}</li>
              ))}
            </ul>
            <p className={s.zonas__nota}>
              ¿No ves tu zona?{" "}
              <a href={enlaceWhatsApp("Hola, ¿trabajáis en mi zona? Estoy en ")}>
                Pregúntanos
              </a>
              {" · "}
              <a href={negocio.mapa}>Ver en Google Maps</a>
            </p>
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
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </div>
          <Opiniones />
        </div>
      </section>

      <Contacto />
    </>
  );
}
