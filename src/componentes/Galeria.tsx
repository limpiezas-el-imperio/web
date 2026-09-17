"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useImperativeHandle, useRef, useState } from "react";
import { type Foto, fotos } from "@/datos/fotos";
import s from "./Galeria.module.css";
import { useCarrusel } from "./useCarrusel";

// La galería de la portada: prueba visual de trabajos reales. Rejilla en
// escritorio y tablet; en el móvil, una fila que se desliza con puntos debajo.
// No va dentro de cada servicio: no hay una foto para cada uno.
//
// En la rejilla caben siete fotos y una tarjeta «+N» con las que no caben.
// Cualquiera de las dos abre el visor, con todas las fotos.
//
// `zona` es el sitio de cada foto en la rejilla de escritorio (ver el CSS).
const visibles: { foto: Foto; zona: string }[] = [
  { foto: fotos.karcher, zona: s.fotoA },
  { foto: fotos.cocina, zona: s.fotoB },
  { foto: fotos.banio, zona: s.fotoC },
  { foto: fotos.grifo, zona: s.fotoD },
  { foto: fotos.suelo, zona: s.fotoE },
  { foto: fotos.ducha, zona: s.fotoF },
  { foto: fotos.sillas, zona: s.fotoG },
];

// Las que sólo salen en el visor, detrás de la tarjeta «+N».
const ocultas: Foto[] = [fotos.persianas, fotos.parterre, fotos.jardin];

const todas = [...visibles.map((v) => v.foto), ...ocultas];

export default function Galeria() {
  // En la fila del móvil, la tarjeta cuenta como una más.
  const enFila = visibles.length + (ocultas.length > 0 ? 1 : 0);
  const { pista, actual, ir } = useCarrusel<HTMLUListElement>(enFila);
  const visor = useRef<Visor>(null);

  return (
    <div>
      <ul ref={pista} className={s.galeria} aria-label="Fotos de trabajos realizados">
        {visibles.map(({ foto, zona }, i) => (
          <li key={foto.pie} className={zona}>
            <figure className={s.foto}>
              <div className={s.marco}>
                <button
                  type="button"
                  className={s.abrir}
                  onClick={(e) => visor.current?.abrir(i, e.currentTarget)}
                  aria-label={`Ampliar foto: ${foto.pie}`}
                >
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    sizes="(max-width: 40rem) 80vw, (max-width: 56rem) 50vw, 36rem"
                    placeholder="blur"
                  />
                </button>
              </div>
              <figcaption>
                <span className={s.numero} aria-hidden="true">
                  {i + 1}/{todas.length}
                </span>
                {foto.pie}
              </figcaption>
            </figure>
          </li>
        ))}

        {ocultas.length > 0 && (
          <li className={s.fotoH}>
            <figure className={s.foto}>
              <div className={s.marco}>
                <button
                  type="button"
                  className={`${s.abrir} ${s.mas}`}
                  onClick={(e) => visor.current?.abrir(visibles.length, e.currentTarget)}
                  aria-label={`Ver ${ocultas.length} fotos más`}
                >
                  <Image
                    src={ocultas[0].src}
                    alt=""
                    fill
                    sizes="(max-width: 40rem) 80vw, (max-width: 56rem) 50vw, 18rem"
                    placeholder="blur"
                  />
                  <span className={s.mas__numero} aria-hidden="true">
                    +{ocultas.length}
                  </span>
                </button>
              </div>
              <figcaption>Más fotos</figcaption>
            </figure>
          </li>
        )}
      </ul>

      {/* Sólo se ven en el móvil (CSS). */}
      <div className={s.puntos}>
        {Array.from({ length: enFila }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => ir(i)}
            aria-label={
              i < visibles.length
                ? `Ver foto ${i + 1} de ${enFila}: ${visibles[i].foto.pie}`
                : `Ver la tarjeta de ${ocultas.length} fotos más`
            }
            aria-current={i === actual ? "true" : undefined}
          />
        ))}
      </div>

      <VisorFotos ref={visor} />
    </div>
  );
}

type Visor = { abrir: (indice: number, origen: HTMLElement) => void };

// Todas las fotos a pantalla completa, en un <dialog> modal: Escape lo cierra y
// el foco no se escapa. Se desliza con el dedo (scroll-snap, como los demás
// carruseles), con las flechas en pantalla o con las del teclado.
function VisorFotos({ ref }: { ref: React.Ref<Visor> }) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const origen = useRef<HTMLElement | null>(null);
  const { pista, actual, ir } = useCarrusel<HTMLUListElement>(todas.length);
  const [abierto, setAbierto] = useState(false);

  const abrir = (indice: number, desde: HTMLElement) => {
    const d = dialogo.current;
    const lista = pista.current;
    if (!d || !lista) return;
    origen.current = desde;
    // overflow sólo en <html>: en <body> la cabecera sticky se iba.
    document.documentElement.style.overflow = "hidden";
    setAbierto(true);
    d.showModal();
    // Directo a la foto pulsada, sin animación.
    lista.scrollTo({ left: lista.clientWidth * indice, behavior: "instant" });
  };

  useImperativeHandle(ref, () => ({ abrir }));

  const alCerrar = () => {
    document.documentElement.style.overflow = "";
    setAbierto(false);
    origen.current?.focus({ preventScroll: true });
  };

  const alTeclear = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") ir(actual - 1);
    else if (e.key === "ArrowRight") ir(actual + 1);
  };

  return (
    <dialog
      ref={dialogo}
      className={s.visor}
      aria-label="Galería de fotos"
      onClose={alCerrar}
      onKeyDown={alTeclear}
    >
      <div className={s.visor__barra}>
        <p className={s.visor__pie} aria-live="polite">
          <span className={s.visor__numero}>
            {actual + 1}/{todas.length}
          </span>
          {todas[actual].pie}
        </p>
        <button
          type="button"
          className={s.visor__boton}
          onClick={() => dialogo.current?.close()}
          aria-label="Cerrar"
        >
          <X aria-hidden="true" size={22} />
        </button>
      </div>

      <ul ref={pista} className={s.visor__pista}>
        {todas.map((foto) => (
          <li key={foto.pie}>
            {/* Sólo se cargan con el visor abierto. */}
            {abierto && (
              <Image src={foto.src} alt={foto.alt} fill sizes="100vw" />
            )}
          </li>
        ))}
      </ul>

      <div className={s.visor__controles}>
        <button
          type="button"
          className={s.visor__boton}
          onClick={() => ir(actual - 1)}
          disabled={actual === 0}
          aria-label="Foto anterior"
        >
          <ArrowLeft aria-hidden="true" size={22} />
        </button>
        <button
          type="button"
          className={s.visor__boton}
          onClick={() => ir(actual + 1)}
          disabled={actual === todas.length - 1}
          aria-label="Foto siguiente"
        >
          <ArrowRight aria-hidden="true" size={22} />
        </button>
      </div>
    </dialog>
  );
}
