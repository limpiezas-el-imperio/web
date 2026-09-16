"use client";

import { Minus, Plus, Send } from "lucide-react";
import { useId, useState } from "react";
import { enlaceWhatsApp, servicios, zonas } from "@/datos/negocio";
import s from "./Presupuesto.module.css";

// Presupuesto guiado: se eligen unas opciones y se abre WhatsApp con el
// mensaje ya escrito. No es un formulario: no se envía nada a ningún servidor,
// así que no hace falta servicio de correo, antispam ni casilla de privacidad
// (CLAUDE.md, «Sin formularios»). El mensaje lo manda el cliente desde su
// WhatsApp, si quiere.
//
// Pregunta lo mismo que los formularios de su web vieja (tipo de vivienda,
// habitaciones, baños, fecha) y lo que dice su FAQ: qué, dónde, cuándo y cada
// cuánto (diaria, semanal, quincenal o mensual).

const frecuencias = ["Una sola vez", "Diaria", "Semanal", "Quincenal", "Mensual"] as const;
const tiposVivienda = ["Piso", "Casa", "Chalet"] as const;
const OTRA_ZONA = "Otra zona";
const MAX_HABITACIONES = 6;
const MAX_BANOS = 4;

// «2 habitaciones», «1 baño», «6 o más habitaciones».
function cantidad(n: number, maximo: number, singular: string, plural: string) {
  return `${n}${n === maximo ? " o más" : ""} ${n === 1 ? singular : plural}`;
}

export default function Presupuesto() {
  const id = useId();
  const [servicio, setServicio] = useState<string>(servicios[0].titulo);
  const [vivienda, setVivienda] = useState<string>(tiposVivienda[0]);
  const [habitaciones, setHabitaciones] = useState(2);
  const [banos, setBanos] = useState(1);
  const [frecuencia, setFrecuencia] = useState<string>(frecuencias[0]);
  const [zona, setZona] = useState("");
  const [otraZona, setOtraZona] = useState("");
  const [fecha, setFecha] = useState("");
  const [comentario, setComentario] = useState("");

  const esVivienda = servicio === servicios[0].titulo;
  const lugar = zona === OTRA_ZONA ? otraZona.trim() : zona;

  const mensaje = [
    "Hola, quería pedir presupuesto.",
    `• Servicio: ${servicio}`,
    esVivienda &&
      `• ${vivienda}: ${cantidad(habitaciones, MAX_HABITACIONES, "habitación", "habitaciones")}, ${cantidad(banos, MAX_BANOS, "baño", "baños")}`,
    `• Frecuencia: ${frecuencia}`,
    lugar && `• Zona: ${lugar}`,
    fecha && `• Para el ${fecha.split("-").reverse().join("/")}`,
    comentario.trim() && `• ${comentario.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className={`tarjeta ${s.presupuesto}`}>
      <fieldset className={s.grupo}>
        <legend>
          <span className="numero" aria-hidden="true">1</span>
          ¿Qué hay que limpiar?
        </legend>
        <div className={s.opciones}>
          {servicios.map((g) => (
            <label key={g.categoria} className={s.opcion}>
              <input
                type="radio"
                name={`${id}-servicio`}
                checked={servicio === g.titulo}
                onChange={() => setServicio(g.titulo)}
              />
              <span>{g.titulo}</span>
            </label>
          ))}
        </div>

        {esVivienda && (
          <div className={s.vivienda}>
            <div className={s.opciones} role="radiogroup" aria-label="Tipo de vivienda">
              {tiposVivienda.map((t) => (
                <label key={t} className={s.opcion}>
                  <input
                    type="radio"
                    name={`${id}-vivienda`}
                    checked={vivienda === t}
                    onChange={() => setVivienda(t)}
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>
            <div className={s.contadores}>
              <Contador
                etiqueta="Habitaciones"
                menos="Una habitación menos"
                mas="Una habitación más"
                valor={habitaciones}
                cambiar={setHabitaciones}
                maximo={MAX_HABITACIONES}
              />
              <Contador
                etiqueta="Baños"
                menos="Un baño menos"
                mas="Un baño más"
                valor={banos}
                cambiar={setBanos}
                maximo={MAX_BANOS}
              />
            </div>
          </div>
        )}
      </fieldset>

      <fieldset className={s.grupo}>
        <legend>
          <span className="numero" aria-hidden="true">2</span>
          ¿Cada cuánto?
        </legend>
        <div className={s.opciones}>
          {frecuencias.map((f) => (
            <label key={f} className={s.opcion}>
              <input
                type="radio"
                name={`${id}-frecuencia`}
                checked={frecuencia === f}
                onChange={() => setFrecuencia(f)}
              />
              <span>{f}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={s.grupo}>
        <legend>
          <span className="numero" aria-hidden="true">3</span>
          ¿Dónde y cuándo?
        </legend>
        <div className={s.campos}>
          <label className={s.campo}>
            <span>Zona</span>
            <select value={zona} onChange={(e) => setZona(e.target.value)}>
              <option value="">Elige tu zona</option>
              {zonas.map((z) => (
                <option key={z}>{z}</option>
              ))}
              <option>{OTRA_ZONA}</option>
            </select>
          </label>
          {zona === OTRA_ZONA && (
            <label className={s.campo}>
              <span>¿Cuál?</span>
              <input
                type="text"
                value={otraZona}
                onChange={(e) => setOtraZona(e.target.value)}
                placeholder="Localidad o barrio"
                autoComplete="address-level2"
              />
            </label>
          )}
          <label className={s.campo}>
            <span>Fecha (si ya la sabes)</span>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </label>
        </div>
        <label className={s.campo}>
          <span>¿Algo más? (opcional)</span>
          <textarea
            rows={2}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Por ejemplo: es después de una reforma, hay terraza…"
          />
        </label>
      </fieldset>

      <div className={s.vista}>
        <p className={s.vista__titulo}>Tu mensaje de WhatsApp</p>
        <p className={s.burbuja}>{mensaje}</p>
      </div>

      <a className={`boton boton--whatsapp boton--grande ${s.enviar}`} href={enlaceWhatsApp(mensaje)}>
        <Send aria-hidden="true" size={20} />
        Enviar por WhatsApp
      </a>
      <p className={s.nota}>Se abre WhatsApp con el mensaje escrito. Tú decides si lo envías.</p>
    </div>
  );
}

function Contador({
  etiqueta,
  menos,
  mas,
  valor,
  cambiar,
  maximo,
}: {
  etiqueta: string;
  menos: string;
  mas: string;
  valor: number;
  cambiar: (n: number) => void;
  maximo: number;
}) {
  return (
    <div className={s.contador} role="group" aria-label={etiqueta}>
      <span className={s.contador__etiqueta}>{etiqueta}</span>
      <div className={s.contador__controles}>
        <button
          type="button"
          onClick={() => cambiar(valor - 1)}
          disabled={valor <= 1}
          aria-label={menos}
        >
          <Minus aria-hidden="true" size={18} />
        </button>
        <output aria-live="polite">
          {valor}
          {valor === maximo && "+"}
        </output>
        <button
          type="button"
          onClick={() => cambiar(valor + 1)}
          disabled={valor >= maximo}
          aria-label={mas}
        >
          <Plus aria-hidden="true" size={18} />
        </button>
      </div>
    </div>
  );
}
