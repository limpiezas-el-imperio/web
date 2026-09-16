"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { negocio, opiniones, valoracion } from "@/datos/negocio";
import s from "./Opiniones.module.css";

// Carrusel de opiniones de Google. Es un scroll horizontal con puntos de
// anclaje (scroll-snap), no un carrusel hecho a mano: en el móvil se desliza
// con el dedo de forma nativa, y las flechas y los puntos sólo lo mueven.
// No pasa solo: un texto que cambia mientras lo lees es un texto que no
// terminas.
export default function Opiniones() {
  const pista = useRef<HTMLUListElement>(null);
  const [actual, setActual] = useState(0);
  const total = opiniones.length;

  // La opinión «actual» sale de cuánto se ha desplazado la pista, se llegue
  // con las flechas o deslizando. No con IntersectionObserver: en escritorio
  // se ven dos a la vez (una entera y media siguiente) y contaba la segunda.
  // Al final del todo cuenta como la última, aunque no quede alineada a la
  // izquierda: en pantallas anchas la última no puede llegar hasta ahí.
  useEffect(() => {
    const contenedor = pista.current;
    if (!contenedor) return;
    let pendiente = 0;
    const alDesplazar = () => {
      cancelAnimationFrame(pendiente);
      pendiente = requestAnimationFrame(() => {
        const [a, b] = contenedor.children as HTMLCollectionOf<HTMLElement>;
        const paso = b ? b.offsetLeft - a.offsetLeft : contenedor.clientWidth;
        const maximo = contenedor.scrollWidth - contenedor.clientWidth;
        setActual(
          contenedor.scrollLeft >= maximo - 4
            ? total - 1
            : Math.round(contenedor.scrollLeft / paso),
        );
      });
    };
    alDesplazar();
    contenedor.addEventListener("scroll", alDesplazar, { passive: true });
    window.addEventListener("resize", alDesplazar);
    return () => {
      cancelAnimationFrame(pendiente);
      contenedor.removeEventListener("scroll", alDesplazar);
      window.removeEventListener("resize", alDesplazar);
    };
  }, [total]);

  const ir = (i: number) => {
    const contenedor = pista.current;
    const destino = contenedor?.children[Math.max(0, Math.min(total - 1, i))] as
      | HTMLElement
      | undefined;
    if (!contenedor || !destino) return;
    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    contenedor.scrollTo({
      left: destino.offsetLeft - contenedor.offsetLeft,
      behavior: sinMovimiento ? "auto" : "smooth",
    });
  };

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
