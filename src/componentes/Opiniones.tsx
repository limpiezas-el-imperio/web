"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { opiniones } from "@/datos/negocio";
import s from "./Opiniones.module.css";

// Una opinión grande cada vez, con flechas para pasar. No pasa sola: un texto
// que cambia mientras lo lees es un texto que no terminas.
export default function Opiniones() {
  const [actual, setActual] = useState(0);
  const total = opiniones.length;
  const ir = (paso: number) => setActual((a) => (a + paso + total) % total);
  const o = opiniones[actual];

  return (
    <div className={s.opiniones}>
      <figure className={s.cita} aria-live="polite" key={actual}>
        <blockquote>
          <p>«{o.texto}»</p>
        </blockquote>
        <figcaption>{o.autor}</figcaption>
      </figure>

      <div className={s.controles}>
        <button type="button" onClick={() => ir(-1)} aria-label="Opinión anterior">
          <ArrowLeft aria-hidden="true" size={20} />
        </button>
        <span className={s.contador}>
          {actual + 1} / {total}
        </span>
        <button type="button" onClick={() => ir(1)} aria-label="Opinión siguiente">
          <ArrowRight aria-hidden="true" size={20} />
        </button>
      </div>
    </div>
  );
}
