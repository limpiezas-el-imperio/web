import type { ReactNode } from "react";
import CabeceraPagina from "./CabeceraPagina";
import s from "./TextoLegal.module.css";

// Las páginas legales: aviso legal, privacidad y cookies. Lo mínimo y en
// lenguaje llano, mejorando lo que tenía su web vieja. No son asesoría
// jurídica: el titular es él (lo dijo Kevin). No acaban con <Contacto />.
export default function TextoLegal({
  antetitulo,
  titulo,
  actualizado,
  children,
}: {
  antetitulo: string;
  titulo: ReactNode;
  actualizado: string;
  children: ReactNode;
}) {
  return (
    <>
      <CabeceraPagina antetitulo={antetitulo} titulo={titulo}>
        <p>Última actualización: {actualizado}.</p>
      </CabeceraPagina>

      <section className="seccion">
        <div className="contenedor">
          <div className={`tarjeta ${s.texto}`}>{children}</div>
        </div>
      </section>
    </>
  );
}
