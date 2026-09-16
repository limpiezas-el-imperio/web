import type { ReactNode } from "react";
import s from "./CabeceraPagina.module.css";

// El arranque de cada página que no es la portada: antetítulo, titular grande
// y entradilla, sobre el crema y cerrado con una regla. Como la portada.
export default function CabeceraPagina({
  antetitulo,
  titulo,
  children,
}: {
  antetitulo: string;
  titulo: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className={s.cabecera}>
      <div className={`contenedor ${s.contenido}`}>
        <p className="antetitulo">{antetitulo}</p>
        <h1 className={s.titulo}>{titulo}</h1>
        {children && <div className={s.entradilla}>{children}</div>}
      </div>
    </section>
  );
}
