"use client";

import { useEffect, useRef, useState } from "react";

// Se llama «use…» y no «usar…» porque React sólo reconoce un hook por ese
// prefijo (y el linter lo exige). Es la única excepción al español.
//
// La lógica común de los carruseles (opiniones y galería del móvil): una lista
// con scroll horizontal y anclajes, y saber cuál es el elemento actual para
// pintar los puntos y las flechas.
//
// El actual sale de cuánto se ha desplazado la lista, no de un
// IntersectionObserver: cuando se ven dos a la vez (uno entero y medio
// siguiente) el observador contaba el segundo. Al final del todo cuenta como
// el último aunque no quede alineado a la izquierda: en pantallas anchas el
// último no puede llegar hasta ahí.
export function useCarrusel<T extends HTMLElement>(total: number) {
  const pista = useRef<T>(null);
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const contenedor = pista.current;
    if (!contenedor) return;
    let pendiente = 0;
    const alDesplazar = () => {
      cancelAnimationFrame(pendiente);
      pendiente = requestAnimationFrame(() => {
        const [a, b] = contenedor.children as HTMLCollectionOf<HTMLElement>;
        if (!a) return;
        const paso = b ? b.offsetLeft - a.offsetLeft : contenedor.clientWidth;
        // Sin maquetar (dentro de un <dialog> cerrado) todo mide 0.
        if (paso <= 0) return;
        const maximo = contenedor.scrollWidth - contenedor.clientWidth;
        setActual(
          maximo > 0 && contenedor.scrollLeft >= maximo - 4
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
    const a = contenedor.children[0] as HTMLElement;
    contenedor.scrollTo({
      left: destino.offsetLeft - a.offsetLeft,
      behavior: sinMovimiento ? "auto" : "smooth",
    });
  };

  return { pista, actual, ir };
}
