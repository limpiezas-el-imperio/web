"use client";

import { Mail, MessageCircle, Minus, Plus } from "lucide-react";
import { useId, useState } from "react";
import { enviarPresupuesto } from "@/acciones/presupuesto";
import { enlaceWhatsApp, servicios, zonas } from "@/datos/negocio";
import { Aceptar, AvisoError, CamposContacto, Enviado, Trampa } from "./PiezasFormulario";
import s from "./Presupuesto.module.css";
import { useFormularioCorreo } from "./useFormularioCorreo";

// Presupuesto guiado: se eligen unas opciones y, al final, cómo mandarlo.
// - Por correo (lo primero): un formulario con los datos de contacto que llega
//   a info@ (src/acciones/presupuesto.ts).
// - Por WhatsApp: se abre WhatsApp con el mensaje ya escrito, y lo manda el
//   cliente desde su móvil, si quiere. Eso no pasa por ningún servidor.
// Las dos vías mandan el mismo texto.
//
// Pregunta lo mismo que los formularios de su web vieja (tipo de vivienda,
// habitaciones, baños, fecha) y lo que dice su FAQ: qué, dónde, cuándo y cada
// cuánto (diaria, semanal, quincenal o mensual).

// Primero lo más habitual en su trabajo: cada semana o cada quince días.
const frecuencias = ["Semanal", "Quincenal", "Mensual", "Una sola vez", "Diaria"] as const;
const tiposVivienda = ["Piso", "Casa", "Chalet", "Alquiler vacacional"] as const;
const OTRA_ZONA = "Otra zona";
const vias = ["Por correo", "Por WhatsApp"] as const;
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
  const [via, setVia] = useState<string>(vias[0]);
  const nombre = useState("");
  const telefono = useState("");
  const correo = useState("");
  const [acepto, setAcepto] = useState(false);
  const porCorreo = via === vias[0];

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

  // Al correo va lo que pide, sin el saludo.
  const { resultado, enviando, formulario } = useFormularioCorreo(enviarPresupuesto, (datos) =>
    datos.set("detalles", mensaje.split("\n").slice(1).join("\n")),
  );

  if (resultado.estado === "enviado") {
    return (
      <Enviado
        titulo="Petición enviada"
        texto={`Gracias${nombre[0].trim() ? `, ${nombre[0].trim()}` : ""}. La hemos recibido y te contactamos para darte el presupuesto.`}
      />
    );
  }

  return (
    <form
      className={`tarjeta ${s.presupuesto}`}
      {...formulario}
      // Por WhatsApp no hay nada que enviar: Intro en un campo no hace nada.
      onSubmit={(e) => (porCorreo ? formulario.onSubmit(e) : e.preventDefault())}
    >
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

      <fieldset className={s.grupo}>
        <legend>
          <span className="numero" aria-hidden="true">4</span>
          ¿Cómo nos lo mandas?
        </legend>
        <div className={s.opciones}>
          {vias.map((v) => (
            <label key={v} className={s.opcion}>
              <input
                type="radio"
                name={`${id}-via`}
                checked={via === v}
                onChange={() => setVia(v)}
              />
              <span>{v}</span>
            </label>
          ))}
        </div>
        {porCorreo && (
          <div className={s.campos}>
            <CamposContacto nombre={nombre} telefono={telefono} correo={correo} />
          </div>
        )}
      </fieldset>

      {porCorreo ? (
        <>
          <Trampa />
          <Aceptar para="para darme presupuesto" marcada={acepto} cambiar={setAcepto} />
          <AvisoError resultado={resultado} />
          <button
            type="submit"
            className={`boton boton--whatsapp boton--grande ${s.enviar}`}
            disabled={enviando}
          >
            <Mail aria-hidden="true" size={20} />
            {enviando ? "Enviando…" : "Pedir presupuesto"}
          </button>
        </>
      ) : (
        <>
          <div className={s.vista}>
            <p className={s.vista__titulo}>Tu mensaje de WhatsApp</p>
            <p className={s.burbuja}>{mensaje}</p>
          </div>
          <a
            className={`boton boton--whatsapp boton--grande ${s.enviar}`}
            href={enlaceWhatsApp(mensaje)}
          >
            <MessageCircle aria-hidden="true" size={20} />
            Enviar por WhatsApp
          </a>
          <p className={s.nota}>Se abre WhatsApp con el mensaje escrito. Tú decides si lo envías.</p>
        </>
      )}
    </form>
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
