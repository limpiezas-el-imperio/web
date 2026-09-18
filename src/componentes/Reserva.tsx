"use client";

import { CalendarCheck, MessageCircle } from "lucide-react";
import { useState } from "react";
import { enviarReserva } from "@/acciones/reserva";
import { enlaceWhatsApp, servicios } from "@/datos/negocio";
import { Aceptar, AvisoError, CamposContacto, Enviado, Trampa } from "./PiezasFormulario";
// Mismas piezas que el presupuesto guiado: grupos y campos.
import p from "./Presupuesto.module.css";
import { useFormularioCorreo } from "./useFormularioCorreo";

// Reservar un servicio con día y hora: llega por correo a info@
// (src/acciones/reserva.ts). Es la «hoja de servicio» de su web vieja: lo que
// tiene que darle el cliente. El DNI pasa a ser opcional (para la factura está
// /datos-de-facturacion) y el correo también, como en el presupuesto. En vez
// de la provincia, la localidad. WhatsApp, segunda vía.

export default function Reserva() {
  const [tipo, setTipo] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [direccion, setDireccion] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const nombre = useState("");
  const telefono = useState("");
  const correo = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [acepto, setAcepto] = useState(false);
  const { resultado, enviando, formulario } = useFormularioCorreo(enviarReserva);

  const lugar = [direccion.trim(), [codigoPostal.trim(), localidad.trim()].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");
  const mensaje = [
    "Hola, quería reservar un servicio.",
    tipo && `• ${tipo}`,
    fecha && `• El ${fecha.split("-").reverse().join("/")}${hora ? ` a las ${hora}` : ""}`,
    lugar && `• En ${lugar}`,
    descripcion.trim() && `• ${descripcion.trim()}`,
    nombre[0].trim() && `• Me llamo ${nombre[0].trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  if (resultado.estado === "enviado") {
    return (
      <Enviado
        titulo="Reserva enviada"
        texto={`Gracias${nombre[0].trim() ? `, ${nombre[0].trim()}` : ""}. Te contestamos para confirmar el día y la hora.`}
      />
    );
  }

  return (
    <form className={`tarjeta ${p.presupuesto}`} {...formulario}>
      <fieldset className={p.grupo}>
        <legend>
          <span className="numero" aria-hidden="true">1</span>
          Qué y cuándo
        </legend>
        <div className={p.campos}>
          <label className={p.campo}>
            <span>Tipo de limpieza</span>
            <select name="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} required>
              <option value="">Elige uno</option>
              {servicios.map((s) => (
                <option key={s.titulo}>{s.titulo}</option>
              ))}
            </select>
          </label>
          <label className={p.campo}>
            <span>Fecha</span>
            <input
              type="date"
              name="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </label>
          <label className={p.campo}>
            <span>Hora</span>
            <input
              type="time"
              name="hora"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              step={900}
              required
            />
          </label>
        </div>
        <label className={p.campo}>
          <span>Qué hay que limpiar</span>
          <textarea
            name="descripcion"
            rows={3}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Por ejemplo: piso de 3 habitaciones y 2 baños, limpieza a fondo con cristales"
            maxLength={2000}
            required
          />
        </label>
      </fieldset>

      <fieldset className={p.grupo}>
        <legend>
          <span className="numero" aria-hidden="true">2</span>
          Dónde
        </legend>
        <div className={p.campos}>
          <label className={p.campo}>
            <span>Calle, número, piso y puerta</span>
            <input
              type="text"
              name="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              autoComplete="street-address"
              maxLength={150}
              required
            />
          </label>
          <label className={p.campo}>
            <span>Código postal</span>
            <input
              type="text"
              name="codigoPostal"
              value={codigoPostal}
              onChange={(e) => setCodigoPostal(e.target.value)}
              autoComplete="postal-code"
              inputMode="numeric"
              maxLength={10}
              required
            />
          </label>
          <label className={p.campo}>
            <span>Localidad</span>
            <input
              type="text"
              name="localidad"
              value={localidad}
              onChange={(e) => setLocalidad(e.target.value)}
              autoComplete="address-level2"
              maxLength={80}
              required
            />
          </label>
        </div>
      </fieldset>

      <fieldset className={p.grupo}>
        <legend>
          <span className="numero" aria-hidden="true">3</span>
          Tus datos
        </legend>
        <div className={p.campos}>
          <CamposContacto nombre={nombre} telefono={telefono} correo={correo} />
          <label className={p.campo}>
            <span>DNI, NIE o CIF (opcional)</span>
            <input
              type="text"
              name="identificacion"
              value={identificacion}
              onChange={(e) => setIdentificacion(e.target.value)}
              autoComplete="off"
              maxLength={20}
            />
          </label>
        </div>
      </fieldset>

      <Trampa />
      <Aceptar para="para organizar el servicio" marcada={acepto} cambiar={setAcepto} />
      <AvisoError resultado={resultado} />

      <button
        type="submit"
        className={`boton boton--whatsapp boton--grande ${p.enviar}`}
        disabled={enviando}
      >
        <CalendarCheck aria-hidden="true" size={20} />
        {enviando ? "Enviando…" : "Enviar reserva"}
      </button>
      <a className={`boton boton--claro ${p.enviar}`} href={enlaceWhatsApp(mensaje)}>
        <MessageCircle aria-hidden="true" size={20} />
        O resérvalo por WhatsApp
      </a>
    </form>
  );
}
