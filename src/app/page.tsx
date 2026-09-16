import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Blinds,
  Building2,
  Check,
  Clock,
  HardHat,
  House,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Store,
  Wrench,
} from "lucide-react";
import Destello from "@/componentes/Destello";
import {
  type Categoria,
  enlaceWhatsApp,
  horario,
  negocio,
  opiniones,
  redes,
  servicios,
  zonas,
} from "@/datos/negocio";
import { urlBase } from "@/datos/sitio";
import s from "./inicio.module.css";

const iconos: Record<Categoria, LucideIcon> = {
  viviendas: House,
  cristales: Blinds,
  comunidades: Building2,
  empresas: Store,
  obras: HardHat,
  reparaciones: Wrench,
};

// Lo que dice su web de cómo trabaja: «Por qué elegirnos» y las preguntas
// frecuentes. «Tarifas premium» no se usa: suena a caro, no a bueno.
const incluye = [
  "Materiales y productos de limpieza incluidos",
  "Productos para cada superficie, también ecológicos",
  "Servicio rápido y puntual",
  "Atención personalizada y garantía de satisfacción",
];

const pasos = [
  {
    titulo: "Cuéntanos qué necesitas",
    texto:
      "Escríbenos por WhatsApp, llámanos o mándanos un correo. Dinos qué hay que limpiar, dónde y cuándo.",
  },
  {
    titulo: "Te damos presupuesto",
    texto:
      "Por hora, por servicio o con un paquete mensual, según el trabajo.",
  },
  {
    titulo: "Lo dejamos impecable",
    texto:
      "Vamos con todo lo necesario. Una vez, o cada día, semana, quincena o mes: tú eliges la frecuencia.",
  },
];

function datosEstructurados() {
  const datos = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: negocio.nombre,
    description:
      "Limpieza de viviendas, comunidades, oficinas, locales y obras.",
    image: `${urlBase}/limpiezaselimperio.webp`,
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
  return JSON.stringify(datos).replace(/</g, "\\u003c");
}

export default function Inicio() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: datosEstructurados() }}
      />

      {/* ——— Portada ——— */}
      <section className={s.portada}>
        <Destello className={`${s.destello} ${s.destello1}`} />
        <Destello className={`${s.destello} ${s.destello2}`} />
        <Destello className={`${s.destello} ${s.destello3}`} />

        <div className={`contenedor ${s.portada__rejilla}`}>
          <div className={s.portada__texto}>
            <p className="antetitulo">
              <span>{negocio.localidad}</span> · <span>Camp de Túria</span> ·{" "}
              <span>Valencia</span>
            </p>
            <h1 className={s.portada__titulo}>
              Limpieza que <em>se nota</em>.
            </h1>
            <p className={s.portada__entradilla}>
              Limpiamos viviendas, comunidades, oficinas, locales y obras.
              Llevamos los materiales y los productos: tú sólo nos cuentas qué
              necesitas.
            </p>
            <div className={s.acciones}>
              <a className="boton boton--whatsapp boton--grande" href={enlaceWhatsApp()}>
                <MessageCircle aria-hidden="true" size={22} />
                Pide presupuesto por WhatsApp
              </a>
              <a
                className="boton boton--contorno boton--grande"
                href={`tel:${negocio.telefono}`}
              >
                <Phone aria-hidden="true" size={20} />
                {negocio.telefonoVisible}
              </a>
            </div>
          </div>

          <aside className={s.tarjeta} aria-label="Qué incluye cada servicio">
            <p className={s.tarjeta__titulo}>
              <Destello className={s.tarjeta__destello} />
              Cada servicio incluye
            </p>
            <ul className={s.tarjeta__lista}>
              {incluye.map((i) => (
                <li key={i}>
                  <Check aria-hidden="true" size={18} strokeWidth={2.5} />
                  {i}
                </li>
              ))}
            </ul>
            <div className={s.tarjeta__horario}>
              <Clock aria-hidden="true" size={18} />
              <p>
                {horario.semana}
                <br />
                <span>{horario.finDeSemana}</span>
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ——— Servicios ——— */}
      <section id="servicios" className={`seccion ${s.servicios}`}>
        <div className="contenedor">
          <header className="seccion__cabecera">
            <p className="antetitulo">Servicios</p>
            <h2 className="seccion__titulo">De la casa a la obra</h2>
            <p className="seccion__entradilla">
              Si hay que limpiarlo, seguramente lo hacemos. Y si no ves lo que
              buscas, pregúntanos.
            </p>
          </header>

          <ul className={s.servicios__rejilla}>
            {servicios.map((g) => {
              const Icono = iconos[g.categoria];
              return (
                <li key={g.categoria} className={s.servicio}>
                  <span className={s.servicio__icono}>
                    <Icono aria-hidden="true" size={24} />
                  </span>
                  <h3 className={s.servicio__titulo}>{g.titulo}</h3>
                  <p className={s.servicio__resumen}>{g.resumen}</p>
                  <ul className={s.servicio__lista}>
                    {g.lista.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                  <a
                    className={s.servicio__enlace}
                    href={enlaceWhatsApp(
                      `Hola, quería pedir presupuesto para ${g.titulo.toLowerCase()}.`,
                    )}
                  >
                    Pedir presupuesto
                    <ArrowUpRight aria-hidden="true" size={18} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ——— Cómo trabajamos ——— */}
      <section id="como-trabajamos" className={`seccion ${s.pasos}`}>
        <div className="contenedor">
          <header className="seccion__cabecera">
            <p className="antetitulo">Cómo trabajamos</p>
            <h2 className="seccion__titulo">Tres pasos y listo</h2>
          </header>
          <ol className={s.pasos__lista}>
            {pasos.map((p, i) => (
              <li key={p.titulo} className={s.paso}>
                <span className={s.paso__numero} aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className={s.paso__titulo}>{p.titulo}</h3>
                <p>{p.texto}</p>
              </li>
            ))}
          </ol>
          <p className={s.pasos__consejo}>
            <Destello className={s.pasos__destello} />
            Nuestro consejo: una limpieza profunda al mes.
          </p>
        </div>
      </section>

      {/* ——— Zonas ——— */}
      <section id="zonas" className={`seccion ${s.zonas}`}>
        <div className={`contenedor ${s.zonas__rejilla}`}>
          <header>
            <p className="antetitulo">Zonas</p>
            <h2 className="seccion__titulo">Cerca de ti</h2>
            <p className="seccion__entradilla">
              Salimos desde {negocio.localidad} y trabajamos en el Camp de Túria,
              Valencia y alrededores.
            </p>
            <a className={s.zonas__mapa} href={negocio.mapa}>
              <MapPin aria-hidden="true" size={18} />
              Ver en Google Maps
            </a>
          </header>
          <div>
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
              .
            </p>
          </div>
        </div>
      </section>

      {/* ——— Opiniones ——— */}
      <section id="opiniones" className={`seccion ${s.opiniones}`}>
        <div className="contenedor">
          <header className="seccion__cabecera">
            <p className="antetitulo">Opiniones</p>
            <h2 className="seccion__titulo">Lo que dicen de nosotros</h2>
            <p className="seccion__entradilla">{negocio.lema}.</p>
          </header>
          <ul className={s.opiniones__rejilla}>
            {opiniones.map((o) => (
              <li key={o.autor}>
                <figure className={s.opinion}>
                  <blockquote>
                    <p>«{o.texto}»</p>
                  </blockquote>
                  <figcaption>{o.autor}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className={s.opiniones__mas}>
            <a href={negocio.mapa}>
              Lee más opiniones en Google
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          </p>
        </div>
      </section>

      {/* ——— Contacto ——— */}
      <section id="contacto" className={`seccion ${s.contacto}`}>
        <Destello className={`${s.destello} ${s.destello4}`} />
        <div className={`contenedor ${s.contacto__rejilla}`}>
          <header>
            <p className="antetitulo antetitulo--claro">Contacto</p>
            <h2 className="seccion__titulo">¿Hablamos?</h2>
            <p className="seccion__entradilla">
              Cuéntanos qué necesitas y te respondemos con tu presupuesto.
            </p>
            <a
              className="boton boton--whatsapp boton--grande"
              href={enlaceWhatsApp()}
            >
              <MessageCircle aria-hidden="true" size={22} />
              Escríbenos por WhatsApp
            </a>
          </header>

          <ul className={s.contacto__lista}>
            <li>
              <Phone aria-hidden="true" size={20} />
              <div>
                <span>Teléfono</span>
                <a href={`tel:${negocio.telefono}`}>{negocio.telefonoVisible}</a>
              </div>
            </li>
            <li>
              <Mail aria-hidden="true" size={20} />
              <div>
                <span>Correo</span>
                <a href={`mailto:${negocio.correo}`}>{negocio.correo}</a>
              </div>
            </li>
            <li>
              <Clock aria-hidden="true" size={20} />
              <div>
                <span>Horario</span>
                <p>
                  {horario.semana}
                  <br />
                  {horario.finDeSemana}
                </p>
              </div>
            </li>
            <li>
              <MapPin aria-hidden="true" size={20} />
              <div>
                <span>Dónde estamos</span>
                <a href={negocio.mapa}>
                  {negocio.localidad} ({negocio.provincia})
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
