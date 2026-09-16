import type { ReactNode } from "react";
import Destello from "./Destello";
import s from "./CabeceraPagina.module.css";

// La banda azul con que empieza cada página que no es la portada.
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
      <Destello className={`adorno ${s.adorno1}`} />
      <Destello className={`adorno ${s.adorno2}`} />
      <div className={`contenedor ${s.contenido}`}>
        <p className="antetitulo antetitulo--claro">{antetitulo}</p>
        <h1 className={s.titulo}>{titulo}</h1>
        {children && <div className={s.entradilla}>{children}</div>}
      </div>
    </section>
  );
}
