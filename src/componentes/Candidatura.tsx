"use client";

import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { enviarCandidatura } from "@/acciones/candidatura";
import { disponibilidades } from "@/datos/formularios";
import { enlaceWhatsApp } from "@/datos/negocio";
import { Aceptar, AvisoError, CamposContacto, Enviado, Trampa } from "./PiezasFormulario";
// Mismas piezas que el presupuesto guiado: opciones y campos.
import p from "./Presupuesto.module.css";
import { useFormularioCorreo } from "./useFormularioCorreo";

// Candidatura para trabajar con él: un formulario que llega por correo a info@
// (src/acciones/candidatura.ts). Pide lo mismo que el formulario de empleo de
// su web vieja (nombre, ciudad y barrio, disponibilidad, comentario) más el
// teléfono, para poder llamar. Nombre completo, dirección, barrio y ciudad,
// obligatorios y por separado, los pidió Frank (19 nov 2026): con un solo
// «Dónde vives» ponían «Valencia». WhatsApp queda como segunda vía, con el
// mensaje ya escrito.

export default function Candidatura() {
  const nombre = useState("");
  const telefono = useState("");
  const correo = useState("");
  const [direccion, setDireccion] = useState("");
  const [barrio, setBarrio] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [disponible, setDisponible] = useState<string[]>([]);
  const [experiencia, setExperiencia] = useState("");
  const [acepto, setAcepto] = useState(false);
  const { resultado, enviando, formulario } = useFormularioCorreo(enviarCandidatura);

  const alternar = (d: string) =>
    setDisponible((actual) =>
      actual.includes(d)
        ? actual.filter((x) => x !== d)
        : disponibilidades.filter((x) => x === d || actual.includes(x)),
    );

  const mensaje = [
    "Hola, me interesa trabajar con vosotros.",
    nombre[0].trim() && `• Me llamo ${nombre[0].trim()}`,
    direccion.trim() && `• Mi dirección: ${direccion.trim()}`,
    barrio.trim() && `• Barrio: ${barrio.trim()}`,
    ciudad.trim() && `• Ciudad: ${ciudad.trim()}`,
    disponible.length > 0 && `• Disponibilidad: ${disponible.join(", ").toLowerCase()}`,
    experiencia.trim() && `• ${experiencia.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  if (resultado.estado === "enviado") {
    return (
      <Enviado
        titulo="Candidatura enviada"
        texto={`Gracias${nombre[0].trim() ? `, ${nombre[0].trim()}` : ""}. La hemos recibido y la tendremos en cuenta.`}
      />
    );
  }

  return (
    <form className={`tarjeta ${p.presupuesto}`} {...formulario}>
      <fieldset className={p.grupo}>
        <legend>
          <span className="numero" aria-hidden="true">1</span>
          Sobre ti
        </legend>
        <div className={p.campos}>
          <CamposContacto
            nombre={nombre}
            telefono={telefono}
            correo={correo}
            etiquetaNombre="Nombre completo"
          />
        </div>
      </fieldset>

      <fieldset className={p.grupo}>
        <legend>
          <span className="numero" aria-hidden="true">2</span>
          Dónde vives
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
            <span>Barrio</span>
            <input
              type="text"
              name="barrio"
              value={barrio}
              onChange={(e) => setBarrio(e.target.value)}
              placeholder="Por ejemplo: Campanar"
              autoComplete="address-level3"
              maxLength={80}
              required
            />
          </label>
          <label className={p.campo}>
            <span>Ciudad</span>
            <input
              type="text"
              name="ciudad"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
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
          ¿Cuándo puedes trabajar?
        </legend>
        <div className={p.opciones}>
          {disponibilidades.map((d) => (
            <label key={d} className={p.opcion}>
              <input
                type="checkbox"
                name="disponibilidad"
                value={d}
                checked={disponible.includes(d)}
                onChange={() => alternar(d)}
              />
              <span>{d}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={p.grupo}>
        <legend>
          <span className="numero" aria-hidden="true">4</span>
          Tu experiencia
        </legend>
        <label className={p.campo}>
          <span>Cuéntanos dónde has trabajado (opcional)</span>
          <textarea
            name="experiencia"
            rows={3}
            value={experiencia}
            onChange={(e) => setExperiencia(e.target.value)}
            placeholder="Por ejemplo: dos años limpiando casas y oficinas, tengo carnet de conducir…"
            maxLength={2000}
          />
        </label>
      </fieldset>

      <Trampa />
      <Aceptar para="para valorar mi candidatura" marcada={acepto} cambiar={setAcepto} />
      <AvisoError resultado={resultado} />

      <button
        type="submit"
        className={`boton boton--whatsapp boton--grande ${p.enviar}`}
        disabled={enviando}
      >
        <Send aria-hidden="true" size={20} />
        {enviando ? "Enviando…" : "Enviar candidatura"}
      </button>
      <a className={`boton boton--claro ${p.enviar}`} href={enlaceWhatsApp(mensaje)}>
        <MessageCircle aria-hidden="true" size={20} />
        O mándala por WhatsApp
      </a>
    </form>
  );
}
