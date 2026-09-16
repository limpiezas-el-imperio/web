import { negocio, zonas } from "@/datos/negocio";
import s from "./MapaZonas.module.css";

// Un mapa esquemático, no un mapa de verdad: cada localidad en su sitio según
// sus coordenadas (aproximadas, del centro del pueblo o barrio) y dos círculos
// de distancia desde La Pobla de Vallbona. Sin Google Maps ni librerías: carga
// al instante y no pide cookies.
//
// Si se añade una zona en negocio.ts, añade aquí sus coordenadas; si no, no
// sale en el mapa (sí en la lista).

type Etiqueta = "izquierda" | "derecha" | "arriba" | "abajo" | "base" | "arriba-derecha";
type Punto = { lat: number; lon: number; etiqueta: Etiqueta };

const coordenadas: Record<string, Punto> = {
  "La Pobla de Vallbona": { lat: 39.588, lon: -0.552, etiqueta: "base" },
  Llíria: { lat: 39.627, lon: -0.596, etiqueta: "derecha" },
  Benaguasil: { lat: 39.593, lon: -0.585, etiqueta: "izquierda" },
  "L'Eliana": { lat: 39.566, lon: -0.528, etiqueta: "derecha" },
  "La Canyada": { lat: 39.535, lon: -0.474, etiqueta: "derecha" },
  Paterna: { lat: 39.502, lon: -0.44, etiqueta: "abajo" },
  // Paterna, Benimàmet, Beniferri y Campanar están a menos de 3 km entre sí:
  // cada etiqueta va a un lado distinto para que no se pisen.
  Benimàmet: { lat: 39.498, lon: -0.423, etiqueta: "arriba-derecha" },
  Beniferri: { lat: 39.49, lon: -0.402, etiqueta: "derecha" },
  Campanar: { lat: 39.482, lon: -0.396, etiqueta: "izquierda" },
  Valencia: { lat: 39.47, lon: -0.376, etiqueta: "abajo" },
  Torrent: { lat: 39.437, lon: -0.465, etiqueta: "derecha" },
};

// Proyección sencilla (equirrectangular) centrada en la zona: a esta escala
// no se nota la diferencia con una de verdad.
const ESCALA = 2500; // px por grado de latitud
const COS_LAT = Math.cos((39.53 * Math.PI) / 180);
const MARGEN = 40;
const OESTE = -0.62;
const NORTE = 39.675; // con aire arriba para que el círculo de 10 km no se corte

const x = (lon: number) => (lon - OESTE) * COS_LAT * ESCALA + MARGEN;
const y = (lat: number) => (NORTE - lat) * ESCALA + MARGEN;
const KM = ESCALA / 111; // px por kilómetro (un grado de latitud ≈ 111 km)

const desplazamiento: Record<Etiqueta, { dx: number; dy: number; anchor: "start" | "middle" | "end" }> = {
  izquierda: { dx: -12, dy: 5, anchor: "end" },
  derecha: { dx: 12, dy: 5, anchor: "start" },
  arriba: { dx: 0, dy: -14, anchor: "middle" },
  abajo: { dx: 0, dy: 24, anchor: "middle" },
  "arriba-derecha": { dx: 8, dy: -12, anchor: "start" },
  base: { dx: 0, dy: 36, anchor: "middle" }, // su punto y su letra son más grandes
};

export default function MapaZonas() {
  const base = coordenadas[negocio.localidad];
  const cx = x(base.lon);
  const cy = y(base.lat);

  return (
    <figure className={s.mapa}>
      <svg
        viewBox="0 0 600 720"
        role="img"
        aria-labelledby="mapa-titulo"
        className={s.svg}
      >
        <title id="mapa-titulo">
          {`Mapa esquemático de las zonas de trabajo alrededor de ${negocio.localidad}: ${zonas.join(", ")}`}
        </title>

        {/* Círculos de distancia desde la base */}
        {[10, 20].map((km) => (
          <g key={km}>
            <circle cx={cx} cy={cy} r={km * KM} className={s.anillo} />
            {/* La etiqueta, abajo del todo de cada círculo */}
            <text x={cx} y={cy + km * KM - 8} textAnchor="middle" className={s.km}>
              {km} km
            </text>
          </g>
        ))}

        {zonas.map((zona) => {
          const p = coordenadas[zona];
          if (!p) return null;
          const esBase = zona === negocio.localidad;
          const d = desplazamiento[p.etiqueta];
          return (
            <g key={zona} className={esBase ? s.base : s.zona}>
              <circle cx={x(p.lon)} cy={y(p.lat)} r={esBase ? 9 : 5.5} />
              <text
                x={x(p.lon) + d.dx}
                y={y(p.lat) + d.dy}
                textAnchor={d.anchor}
              >
                {zona}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className={s.pie}>
        Esquema aproximado. Distancias en línea recta desde {negocio.localidad}.
      </figcaption>
    </figure>
  );
}
