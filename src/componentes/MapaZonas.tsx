import { negocio, zonas } from "@/datos/negocio";
import s from "./MapaZonas.module.css";

// Un mapa esquemático, no un mapa de verdad: cada localidad en su sitio según
// sus coordenadas (aproximadas, del centro del pueblo) y dos círculos de
// distancia desde La Pobla de Vallbona. Sin Google Maps ni librerías: carga al
// instante y no pide cookies.
//
// Si se añade una zona en negocio.ts, añade aquí sus coordenadas; si no, no
// sale en el mapa (sí en la lista). Las etiquetas están colocadas a mano para
// que no se pisen: si añades una, mira el mapa en escritorio.

type Etiqueta = "izquierda" | "derecha" | "arriba" | "abajo" | "arriba-derecha";
type Punto = { lat: number; lon: number; etiqueta: Etiqueta; corto?: string };

const coordenadas: Record<string, Punto> = {
  "La Pobla de Vallbona": { lat: 39.588, lon: -0.552, etiqueta: "izquierda" },
  Llíria: { lat: 39.627, lon: -0.596, etiqueta: "izquierda" },
  Benaguasil: { lat: 39.593, lon: -0.585, etiqueta: "izquierda" },
  Benisanó: { lat: 39.616, lon: -0.574, etiqueta: "derecha" },
  Olocau: { lat: 39.699, lon: -0.53, etiqueta: "derecha" },
  "L'Eliana": { lat: 39.566, lon: -0.528, etiqueta: "derecha" },
  "Riba-roja de Túria": { lat: 39.547, lon: -0.566, etiqueta: "abajo", corto: "Riba-roja" },
  Bétera: { lat: 39.591, lon: -0.462, etiqueta: "derecha" },
  "La Canyada": { lat: 39.535, lon: -0.474, etiqueta: "derecha" },
  Paterna: { lat: 39.502, lon: -0.44, etiqueta: "izquierda" },
  Godella: { lat: 39.52, lon: -0.411, etiqueta: "derecha" },
  Moncada: { lat: 39.545, lon: -0.395, etiqueta: "derecha" },
  Puçol: { lat: 39.617, lon: -0.305, etiqueta: "derecha" },
  Mislata: { lat: 39.475, lon: -0.418, etiqueta: "arriba-derecha" },
  Xirivella: { lat: 39.463, lon: -0.428, etiqueta: "abajo" },
  Aldaia: { lat: 39.466, lon: -0.462, etiqueta: "izquierda" },
  Torrent: { lat: 39.437, lon: -0.465, etiqueta: "abajo" },
  Valencia: { lat: 39.47, lon: -0.376, etiqueta: "derecha" },
};

// Proyección sencilla (equirrectangular): a esta escala no se nota la
// diferencia con una de verdad. El encuadre va de Olocau a Torrent y de Llíria
// a Puçol, con aire a la izquierda para las etiquetas.
const ANCHO = 660;
const ALTO = 640;
const ESCALA = 1950; // px por grado de latitud
const COS_LAT = Math.cos((39.57 * Math.PI) / 180);
const OESTE = -0.669;
const NORTE = 39.725;

const x = (lon: number) => (lon - OESTE) * COS_LAT * ESCALA;
const y = (lat: number) => (NORTE - lat) * ESCALA;
const KM = ESCALA / 111; // px por kilómetro (un grado de latitud ≈ 111 km)

const desplazamiento: Record<Etiqueta, { dx: number; dy: number; anchor: "start" | "middle" | "end" }> = {
  izquierda: { dx: -12, dy: 5, anchor: "end" },
  derecha: { dx: 12, dy: 5, anchor: "start" },
  arriba: { dx: 0, dy: -14, anchor: "middle" },
  abajo: { dx: 0, dy: 24, anchor: "middle" },
  "arriba-derecha": { dx: 8, dy: -12, anchor: "start" },
};

export default function MapaZonas() {
  const base = coordenadas[negocio.localidad];
  const cx = x(base.lon);
  const cy = y(base.lat);

  return (
    <figure className={s.mapa}>
      <svg viewBox={`0 0 ${ANCHO} ${ALTO}`} role="img" aria-labelledby="mapa-titulo" className={s.svg}>
        <title id="mapa-titulo">
          {`Mapa esquemático de las zonas de trabajo alrededor de ${negocio.localidad}: ${zonas.join(", ")}`}
        </title>

        {/* Círculos de distancia desde la base */}
        {[10, 20].map((km) => (
          <g key={km}>
            <circle cx={cx} cy={cy} r={km * KM} className={s.anillo} />
            <text x={cx} y={cy + km * KM - 8} textAnchor="middle" className={s.km}>
              {km} km
            </text>
          </g>
        ))}

        {zonas.map((zona) => {
          const p = coordenadas[zona];
          if (!p) return null;
          const esBase = zona === negocio.localidad;
          const px = x(p.lon);
          const py = y(p.lat);

          // La base lleva el nombre en dos líneas, a su izquierda y un poco
          // abajo: a su derecha están L'Eliana y Bétera.
          if (esBase) {
            return (
              <g key={zona} className={s.base}>
                <circle cx={px} cy={py} r={9} />
                <text x={px - 14} y={py + 26} textAnchor="end">
                  <tspan x={px - 14}>La Pobla</tspan>
                  <tspan x={px - 14} dy={22}>
                    de Vallbona
                  </tspan>
                </text>
              </g>
            );
          }

          const d = desplazamiento[p.etiqueta];
          return (
            <g key={zona} className={s.zona}>
              <circle cx={px} cy={py} r={5.5} />
              <text x={px + d.dx} y={py + d.dy} textAnchor={d.anchor}>
                {p.corto ?? zona}
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
