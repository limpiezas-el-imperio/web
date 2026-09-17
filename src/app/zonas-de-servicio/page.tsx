import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import CabeceraPagina from "@/componentes/CabeceraPagina";
import Contacto from "@/componentes/Contacto";
import DatosEstructurados from "@/componentes/DatosEstructurados";
import MapaZonas from "@/componentes/MapaZonas";
import {
  areas,
  barriosValencia,
  enlaceWhatsApp,
  negocio,
  zonas,
  zonasPorArea,
} from "@/datos/negocio";
import { metadatosPagina, urlBase } from "@/datos/sitio";
import s from "./zonas.module.css";

export const metadata = metadatosPagina({
  titulo: "Zonas de servicio",
  descripcion: `Limpieza en ${negocio.localidad}, Llíria, L'Eliana, Bétera, Paterna, Valencia y alrededores: todas las zonas donde trabaja ${negocio.nombre}.`,
  ruta: "/zonas-de-servicio",
});

const zonasEstructuradas = {
  "@type": "LocalBusiness",
  name: negocio.nombre,
  url: urlBase,
  areaServed: [...zonas, ...barriosValencia].map((z) => ({ "@type": "Place", name: z })),
};

export default function ZonasDeServicio() {
  return (
    <>
      <DatosEstructurados datos={zonasEstructuradas} />

      <CabeceraPagina
        antetitulo="Zonas de servicio"
        titulo={
          <>
            Dónde <em>trabajamos</em>
          </>
        }
      >
        <p>
          Desde {negocio.localidad}, a todo el Camp de Túria, el
          área metropolitana y la ciudad de Valencia.
        </p>
      </CabeceraPagina>

      <section className="seccion">
        <div className={`contenedor ${s.rejilla}`}>
          <div className={s.areas}>
            {zonasPorArea.map(({ area, localidades }) => (
              <section key={area} className={`tarjeta ${s.area}`} aria-labelledby={`area-${area}`}>
                <h2 id={`area-${area}`} className={s.area__titulo}>
                  <MapPin aria-hidden="true" size={20} />
                  {areas[area]}
                </h2>
                <ul className={s.localidades}>
                  {localidades.map((l) => (
                    <li key={l} className={l === negocio.localidad ? s.base : undefined}>
                      {l}
                    </li>
                  ))}
                </ul>
                {area === "valencia" && (
                  <p className={s.barrios}>
                    También en barrios como {barriosValencia.join(", ")}.
                  </p>
                )}
              </section>
            ))}

            <div className={`tarjeta ${s.pregunta}`}>
              <div>
                <p className={s.pregunta__titulo}>¿No ves tu zona?</p>
                <p>Pregúntanos y te lo decimos.</p>
              </div>
              <a
                className="boton boton--whatsapp"
                href={enlaceWhatsApp("Hola, ¿trabajáis en mi zona? Estoy en ")}
              >
                <MessageCircle aria-hidden="true" size={20} />
                Preguntar
              </a>
            </div>
          </div>

          <div className={`tarjeta ${s.mapa}`}>
            <MapaZonas />
            <a className="enlace-flecha" href={negocio.mapa}>
              Ver {negocio.nombre} en Google Maps
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>
        </div>
      </section>

      <Contacto />
    </>
  );
}
