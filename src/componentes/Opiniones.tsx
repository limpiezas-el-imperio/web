"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { negocio, opiniones, valoracion } from "@/datos/negocio";
import s from "./Opiniones.module.css";
import { useCarrusel } from "./useCarrusel";

// Carrusel de opiniones de Google. Es un scroll horizontal con puntos de
// anclaje (scroll-snap), no un carrusel hecho a mano: en el móvil se desliza
// con el dedo de forma nativa, y las flechas y los puntos sólo lo mueven.
// No pasa solo: un texto que cambia mientras lo lees es un texto que no
// terminas.
export default function Opiniones() {
  const total = opiniones.length;
  const { pista, actual, ir } = useCarrusel<HTMLUListElement>(total);

  return (
    <div className={s.opiniones}>
      <div className={s.resumen}>
        <p className={s.nota}>{valoracion.nota}</p>
        <div>
          <Estrellas />
          <p className={s.total}>
            {valoracion.total} reseñas en Google
          </p>
        </div>
      </div>

      <ul
        ref={pista}
        className={s.pista}
        aria-roledescription="carrusel"
        aria-label="Opiniones de clientes en Google"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            ir(actual + 1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            ir(actual - 1);
          }
        }}
      >
        {opiniones.map((o, i) => (
          <li
            key={o.autor}
            className={s.diapositiva}
            aria-roledescription="opinión"
            aria-label={`${i + 1} de ${total}`}
          >
            <figure>
              <Estrellas />
              <blockquote className={s.cita}>
                <p>«{o.extracto}»</p>
              </blockquote>
              <figcaption className={s.autor}>
                <span>{o.autor}</span>
                <a href={negocio.mapa} className={s.fuente}>
                  Leer en Google
                  <ArrowUpRight aria-hidden="true" size={16} />
                </a>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className={s.controles}>
        <button
          type="button"
          onClick={() => ir(actual - 1)}
          disabled={actual === 0}
          aria-label="Opinión anterior"
        >
          <ArrowLeft aria-hidden="true" size={20} />
        </button>
        <div className={s.puntos}>
          {opiniones.map((o, i) => (
            <button
              key={o.autor}
              type="button"
              onClick={() => ir(i)}
              aria-label={`Ir a la opinión ${i + 1} de ${total}`}
              aria-current={i === actual ? "true" : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => ir(actual + 1)}
          disabled={actual === total - 1}
          aria-label="Opinión siguiente"
        >
          <ArrowRight aria-hidden="true" size={20} />
        </button>
      </div>
    </div>
  );
}

function Estrellas() {
  return (
    <span className={s.estrellas} role="img" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden="true" size={18} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}
