import Link from "next/link";
import Destello from "./Destello";

// El nombre escrito, no la imagen del logo: la imagen lleva el teléfono dentro
// y a tamaño de cabecera no se lee.
export default function Marca({ claro = false }: { claro?: boolean }) {
  return (
    <Link href="/" className={claro ? "marca marca--clara" : "marca"}>
      <Destello className="marca__destello" />
      <span className="marca__texto">
        <span className="marca__linea">Limpiezas</span>
        <span className="marca__nombre">El Imperio</span>
      </span>
    </Link>
  );
}
