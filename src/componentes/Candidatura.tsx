"use client";

import { Mail, Send } from "lucide-react";
import { useId, useState } from "react";
import { enlaceWhatsApp, negocio } from "@/datos/negocio";
// Mismas piezas que el presupuesto guiado: opciones, campos y vista previa.
import s from "./Presupuesto.module.css";

// Candidatura para trabajar con él. Igual que el presupuesto: compone el
// mensaje y abre WhatsApp (o el correo) con él escrito. No manda nada a ningún
// servidor. Pide lo mismo que el formulario de empleo de su web vieja (nombre,
// ciudad y barrio, disponibilidad, comentario); el teléfono y el correo ya van
// en el propio WhatsApp o correo.

const disponibilidades = ["Mañanas", "Tardes", "Fines de semana"] as const;

export default function Candidatura() {
  const id = useId();
  const [nombre, setNombre] = useState("");
  const [lugar, setLugar] = useState("");
  const [disponible, setDisponible] = useState<string[]>([]);
  const [experiencia, setExperiencia] = useState("");

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

  const correo = `mailto:${negocio.correo}?subject=${encodeURIComponent(
    "Trabaja con nosotros",
  )}&body=${encodeURIComponent(mensaje)}`;

  return (
    <div className={`tarjeta ${s.presupuesto}`}>
      <fieldset className={s.grupo}>
        <legend>
          <span className="numero" aria-hidden="true">1</span>
          Sobre ti
        </legend>
        <div className={s.campos}>
          <label className={s.campo}>
            <span>Nombre</span>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              autoComplete="name"
            />
          </label>
          <label className={s.campo}>
            <span>Dónde vives</span>
            <input
              type="text"
              value={lugar}
              onChange={(e) => setLugar(e.target.value)}
              placeholder="Localidad y barrio"
              autoComplete="address-level2"
            />
          </label>
        </div>
      </fieldset>

      <fieldset className={s.grupo}>
        <legend>
          <span className="numero" aria-hidden="true">2</span>
          ¿Cuándo puedes trabajar?
        </legend>
        <div className={s.opciones}>
          {disponibilidades.map((d) => (
            <label key={d} className={s.opcion}>
              <input
                type="checkbox"
                name={`${id}-disponibilidad`}
                checked={disponible.includes(d)}
                onChange={() => alternar(d)}
              />
              <span>{d}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className={s.grupo}>
        <legend>
          <span className="numero" aria-hidden="true">3</span>
          Tu experiencia
        </legend>
        <label className={s.campo}>
          <span>Cuéntanos dónde has trabajado (opcional)</span>
          <textarea
            rows={3}
            value={experiencia}
            onChange={(e) => setExperiencia(e.target.value)}
            placeholder="Por ejemplo: dos años limpiando casas y oficinas, tengo carnet de conducir…"
          />
        </label>
      </fieldset>

      <div className={s.vista}>
        <p className={s.vista__titulo}>Tu mensaje</p>
        <p className={s.burbuja}>{mensaje}</p>
      </div>

      <a className={`boton boton--whatsapp boton--grande ${s.enviar}`} href={enlaceWhatsApp(mensaje)}>
        <Send aria-hidden="true" size={20} />
        Enviar por WhatsApp
      </a>
      <a className={`boton boton--claro ${s.enviar}`} href={correo}>
        <Mail aria-hidden="true" size={20} />
        O mandarlo por correo
      </a>
      <p className={s.nota}>
        Se abre WhatsApp o tu correo con el mensaje escrito. Tú decides si lo envías.
      </p>
    </div>
  );
}
