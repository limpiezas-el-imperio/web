import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  HeartHandshake,
  Leaf,
  Package,
  ShieldCheck,
  Sparkles,
  ThumbsUp,
  Timer,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CabeceraPagina from "@/componentes/CabeceraPagina";
import Contacto from "@/componentes/Contacto";
import DatosEstructurados from "@/componentes/DatosEstructurados";
import { fotos } from "@/datos/fotos";
import { negocio, servicios, valoracion, zonas } from "@/datos/negocio";
import { metadatosPagina, urlBase } from "@/datos/sitio";
import s from "./quienes-somos.module.css";

export const metadata = metadatosPagina({
  titulo: "Quiénes somos",
  descripcion:
    "Limpiezas El Imperio: limpieza de viviendas, comunidades, oficinas y obras desde La Pobla de Vallbona, en el Camp de Túria. Materiales incluidos y 4,9 en Google.",
  ruta: "/quienes-somos",
});

const totalServicios = servicios.reduce((n, g) => n + g.lista.length, 0);

// Cifras reales, sacadas de los datos: nada de «años de experiencia» ni
// «clientes satisfechos» inventados. La experiencia la tiene que decir él.
const cifras = [
  { valor: valoracion.nota, texto: "de nota en Google" },
  { valor: String(valoracion.total), texto: "reseñas en Google" },
  { valor: String(totalServicios), texto: "servicios de limpieza" },
  { valor: String(zonas.length), texto: "zonas donde trabajamos" },
];

// «Por qué elegirnos», de su web. Los títulos son suyos; los textos salen de
// su FAQ y de Google. «Tarifas premium» no va: suena a caro y hay que
// preguntárselo (todo.md).
const motivos = [
  {
    icono: Timer,
    titulo: "Disponibilidad inmediata",
    texto: "Cuéntanos qué necesitas y lo organizamos.",
  },
  {
    icono: BadgeCheck,
    titulo: "Calidad garantizada",
    texto: "Cuidamos los detalles para que todo quede impecable.",
  },
  {
    icono: CalendarClock,
    titulo: "Rápidos y puntuales",
    texto: "Lo dicen nuestros clientes en sus reseñas de Google.",
  },
  {
    icono: Package,
    titulo: "Materiales incluidos",
    texto: "Llevamos los materiales y los productos de limpieza.",
  },
  {
    icono: HeartHandshake,
    titulo: "Atención personalizada",
    texto: "Una vez o con la frecuencia que elijas, como te venga mejor.",
  },
  {
    icono: ThumbsUp,
    titulo: "Garantía de satisfacción",
    texto: `${valoracion.nota} de 5 en Google, con ${valoracion.total} reseñas.`,
  },
];

// Los tres valores de su web, que allí iban como imágenes con el texto dentro.
// Visión y misión no van (decisión en docs/sitio-actual.md).
const valores = [
  {
    icono: Sparkles,
    titulo: "Calidad",
    texto:
      "Servicios de limpieza de la más alta calidad, para que quedes satisfecho con cada trabajo.",
  },
  {
    icono: ShieldCheck,
    titulo: "Confianza",
    texto:
      "Relaciones duraderas basadas en la honestidad, la transparencia y el respeto mutuo.",
  },
  {
    icono: Leaf,
    titulo: "Sostenibilidad",
    texto:
      "Productos y métodos respetuosos con el medio ambiente, como los productos ecológicos de Ecojim.",
  },
];

const sobreNosotros = {
  "@type": "AboutPage",
  url: `${urlBase}/quienes-somos`,
  mainEntity: {
    "@type": "LocalBusiness",
    name: negocio.nombre,
    url: urlBase,
    slogan: negocio.lema,
    address: {
      "@type": "PostalAddress",
      addressLocality: negocio.localidad,
      postalCode: negocio.codigoPostal,
      addressRegion: negocio.provincia,
      addressCountry: "ES",
    },
  },
};

export default function QuienesSomos() {
  return (
    <>
      <DatosEstructurados datos={sobreNosotros} />

      <CabeceraPagina
        antetitulo="Quiénes somos"
        titulo={
          <>
            Limpieza de confianza en el <em>Camp de Túria</em>
          </>
        }
      >
        <p>
          Somos {negocio.nombre}, de {negocio.localidad}. Limpiamos viviendas,
          comunidades, oficinas, locales y obras.
        </p>
      </CabeceraPagina>

      {/* ——— Presentación ——— */}
      <section className="seccion">
        <div className={`contenedor ${s.presentacion}`}>
          <div className={s.presentacion__texto}>
            <p className="antetitulo">Dónde estamos</p>
            <h2 className="seccion__titulo">De La Pobla de Vallbona a toda la comarca</h2>
            <p>
              Estamos en {negocio.localidad}, en el Camp de Túria, y desde aquí
              trabajamos en la comarca, en Valencia y alrededores: de Llíria y
              Benaguasil a Paterna, Campanar o Torrent.
            </p>
            <p>
              Limpiamos pisos, casas y chalets, alquileres vacacionales,
              comunidades de vecinos, oficinas, locales y obras. Sobre todo cada
              semana o cada quince días, pero también una sola vez, y siempre con
              nuestros materiales y productos.
            </p>
            <p>
              No trabajamos solos: somos un equipo, y cada limpieza la hacen
              personas que viven en la zona.
            </p>
            <blockquote className={s.lema}>
              <p>«{negocio.lema}».</p>
              <footer>Nuestro lema</footer>
            </blockquote>
          </div>

          <div className={s.foto}>
            <Image
              src={fotos.cocina.src}
              alt={fotos.cocina.alt}
              fill
              sizes="(max-width: 40rem) calc(100vw - 2rem), (max-width: 56rem) calc(100vw - 4rem), 32rem"
              placeholder="blur"
            />
          </div>
        </div>

        <div className="contenedor">
          <ul className={s.cifras}>
            {cifras.map((c) => (
              <li key={c.texto} className="tarjeta">
                <strong>{c.valor}</strong>
                <span>{c.texto}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ——— Por qué elegirnos ——— */}
      <section className={`seccion ${s.motivos}`}>
        <div className="contenedor">
          <header className="seccion__cabecera">
            <p className="antetitulo">Por qué elegirnos</p>
            <h2 className="seccion__titulo">Somos tu mejor opción</h2>
          </header>

          <ul className={s.rejilla}>
            {motivos.map(({ icono: Icono, titulo, texto }) => (
              <li key={titulo} className={`tarjeta ${s.motivo}`}>
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
        </div>
      </section>

      {/* ——— Valores ——— */}
      <section className="seccion">
        <div className="contenedor">
          <header className="seccion__cabecera">
            <p className="antetitulo">Nuestros valores</p>
            <h2 className="seccion__titulo">Lo que nos mueve</h2>
          </header>

          <ol className={s.valores}>
            {valores.map(({ icono: Icono, titulo, texto }, i) => (
              <li key={titulo} className={`tarjeta ${s.valor}`}>
                <div className={s.valor__cabecera}>
                  <span className="numero" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icono aria-hidden="true" size={22} className={s.valor__icono} />
                </div>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </li>
            ))}
          </ol>

          <div className={`tarjeta ${s.empleo}`}>
            <p>¿Quieres trabajar con nosotros?</p>
            <Link className="enlace-flecha" href="/trabaja-con-nosotros">
              Mándanos tus datos
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Contacto />
    </>
  );
}
