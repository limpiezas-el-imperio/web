"use client";

import Image from "next/image";
import { type Foto, fotos } from "@/datos/fotos";
import s from "./Galeria.module.css";
import { useCarrusel } from "./useCarrusel";

// La galería de la portada: prueba visual de trabajos reales. Rejilla en
// escritorio y tablet; en el móvil, una fila que se desliza con puntos debajo.
// No va dentro de cada servicio: no hay una foto para cada uno.
//
// `zona` es el sitio de cada foto en la rejilla de escritorio (ver el CSS).
const trabajos: { foto: Foto; zona: string }[] = [
  { foto: fotos.karcher, zona: s.fotoA },
  { foto: fotos.cocina, zona: s.fotoB },
  { foto: fotos.banio, zona: s.fotoC },
  { foto: fotos.grifo, zona: s.fotoD },
  { foto: fotos.suelo, zona: s.fotoE },
  { foto: fotos.ducha, zona: s.fotoF },
  { foto: fotos.sillas, zona: s.fotoG },
];

export default function Galeria() {
  const total = trabajos.length;
  const { pista, actual, ir } = useCarrusel<HTMLUListElement>(total);

  return (
    <div>
      <ul ref={pista} className={s.galeria} aria-label="Fotos de trabajos realizados">
        {trabajos.map(({ foto, zona }, i) => (
          <li key={foto.pie} className={zona}>
            <figure className={s.foto}>
              <div className={s.marco}>
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  sizes="(max-width: 40rem) 80vw, (max-width: 56rem) 50vw, 36rem"
                  placeholder="blur"
                />
              </div>
              <figcaption>
                <span className={s.numero} aria-hidden="true">
                  {i + 1}/{total}
                </span>
                {foto.pie}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {/* Sólo se ven en el móvil (CSS). */}
      <div className={s.puntos}>
        {trabajos.map(({ foto }, i) => (
          <button
            key={foto.pie}
            type="button"
            onClick={() => ir(i)}
            aria-label={`Ver foto ${i + 1} de ${total}: ${foto.pie}`}
            aria-current={i === actual ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
