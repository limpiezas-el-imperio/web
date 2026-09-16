import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.jpg";

// El logo en pequeño y el nombre escrito al lado: a tamaño de cabecera las
// letras del logo no se leen, y el nombre sí.
export default function Marca({ claro = false }: { claro?: boolean }) {
  return (
    <Link href="/" className={claro ? "marca marca--clara" : "marca"}>
      <Image
        src={logo}
        alt=""
        className="marca__logo"
        sizes="3.5rem"
        // La cabecera se ve al cargar; el pie no.
        {...(!claro && { loading: "eager", fetchPriority: "high" })}
      />
      <span className="marca__texto">
        <span className="marca__linea">Limpiezas</span>
        <span className="marca__nombre">El Imperio</span>
      </span>
    </Link>
  );
}
