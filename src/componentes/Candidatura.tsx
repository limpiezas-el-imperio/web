"use client";

import { CircleCheck, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import { startTransition, useActionState, useRef, useState } from "react";
import { enviarCandidatura } from "@/app/trabaja-con-nosotros/acciones";
import { disponibilidades, type EstadoCandidatura } from "@/datos/candidatura";
import { enlaceWhatsApp } from "@/datos/negocio";
import s from "./Candidatura.module.css";
// Mismas piezas que el presupuesto guiado: opciones y campos.
import p from "./Presupuesto.module.css";

// Candidatura para trabajar con él: un formulario que manda un correo a info@
// (acciones.ts). Pide lo mismo que el formulario de empleo de su web vieja
// (nombre, ciudad y barrio, disponibilidad, comentario) más el teléfono, para
// poder llamar. WhatsApp queda como segunda vía, con el mensaje ya escrito.
//
// Los campos van con estado: así no se vacían si el envío da error, y de ahí
// sale también el mensaje de WhatsApp. Se envía con onSubmit y no con
// <form action>: React vacía el formulario tras la acción, y la casilla de
// aceptar quedaba desmarcada sin que el estado lo supiera; el navegador
// bloqueaba entonces el segundo intento sin decir nada.

const inicial: EstadoCandidatura = { estado: "inicial" };

export default function Candidatura() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [lugar, setLugar] = useState("");
  const [disponible, setDisponible] = useState<string[]>([]);
  const [experiencia, setExperiencia] = useState("");
  const [acepto, setAcepto] = useState(false);
  const [resultado, enviar, enviando] = useActionState(enviarCandidatura, inicial);
  // Cuándo empezó a rellenarlo (antispam, ver acciones.ts).
  const empezado = useRef(0);

  const empezar = () => {
    if (!empezado.current) empezado.current = Date.now();
  };

  const alternar = (d: string) =>
    setDisponible((actual) =>
      actual.includes(d)
        ? actual.filter((x) => x !== d)
        : disponibilidades.filter((x) => x === d || actual.includes(x)),
    );

  const mensaje = [
    "Hola, me interesa trabajar con vosotros.",
    nombre.trim() && `• Me llamo ${nombre.trim()}`,
    lugar.trim() && `• Vivo en ${lugar.trim()}`,
    disponible.length > 0 && `• Disponibilidad: ${disponible.join(", ").toLowerCase()}`,
    experiencia.trim() && `• ${experiencia.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  if (resultado.estado === "enviada") {
    return (
      <div className={`tarjeta ${p.presupuesto} ${s.enviada}`} role="status">
        <CircleCheck aria-hidden="true" size={48} className={s.enviada__icono} />
        <h2>Candidatura enviada</h2>
        <p>Gracias{nombre.trim() ? `, ${nombre.trim()}` : ""}. La hemos recibido y la tendremos en cuenta.</p>
      </div>
    );
  }

  return (
    <form
      className={`tarjeta ${p.presupuesto}`}
      onSubmit={(e) => {
        e.preventDefault();
        const datos = new FormData(e.currentTarget);
        datos.set("tiempo", String(empezado.current ? Date.now() - empezado.current : 0));
        startTransition(() => enviar(datos));
      }}
      onFocusCapture={empezar}
      onPointerDownCapture={empezar}
      onKeyDownCapture={empezar}
    >
      <fieldset className={p.grupo}>
        <legend>
          <span className="numero" aria-hidden="true">1</span>
          Sobre ti
        </legend>
        <div className={p.campos}>
          <label className={p.campo}>
            <span>Nombre</span>
            <input
              type="text"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              autoComplete="name"
              maxLength={100}
              required
            />
          </label>
          <label className={p.campo}>
            <span>Teléfono</span>
            <input
              type="tel"
              name="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              autoComplete="tel"
              maxLength={30}
              required
            />
          </label>
          <label className={p.campo}>
            <span>Correo (opcional)</span>
            <input
              type="email"
              name="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              autoComplete="email"
              maxLength={120}
            />
          </label>
          <label className={p.campo}>
            <span>Dónde vives</span>
            <input
              type="text"
              name="lugar"
              value={lugar}
              onChange={(e) => setLugar(e.target.value)}
              placeholder="Localidad y barrio"
              autoComplete="address-level2"
              maxLength={120}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className={p.grupo}>
        <legend>
          <span className="numero" aria-hidden="true">2</span>
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
          <span className="numero" aria-hidden="true">3</span>
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

      {/* Trampa para programas: una persona no lo ve ni llega con el tabulador. */}
      <label className={s.trampa} aria-hidden="true">
        Web
        <input type="text" name="web" tabIndex={-1} autoComplete="off" />
      </label>

      <label className={s.acepto}>
        <input
          type="checkbox"
          name="acepto"
          value="si"
          checked={acepto}
          onChange={(e) => setAcepto(e.target.checked)}
          required
        />
        <span>
          Acepto que uséis mis datos sólo para valorar mi candidatura (
          <Link className="enlace" href="/politica-de-privacidad">
            política de privacidad
          </Link>
          ).
        </span>
      </label>

      {resultado.estado === "error" && (
        <p className={s.error} role="alert">
          {resultado.mensaje} Si sigue fallando, mándanosla por WhatsApp.
        </p>
      )}

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
