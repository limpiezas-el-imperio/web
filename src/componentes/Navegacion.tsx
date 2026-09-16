"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { enlaces } from "@/datos/navegacion";

// La navegación de la cabecera. En escritorio, los enlaces en fila; en tablet
// y móvil, un botón «Menú» que despliega la lista. Es componente de cliente
// sólo por dos cosas: abrir y cerrar ese menú, y saber en qué página estás.
export default function Navegacion() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);

  // Cerrar al cambiar de página (se ajusta el estado durante el render, como
  // recomienda React, en vez de hacerlo en un efecto).
  const [rutaAnterior, setRutaAnterior] = useState(ruta);
  if (ruta !== rutaAnterior) {
    setRutaAnterior(ruta);
    setAbierto(false);
  }

  // Cerrar con Escape.
  useEffect(() => {
    if (!abierto) return;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    document.addEventListener("keydown", alPulsar);
    return () => document.removeEventListener("keydown", alPulsar);
  }, [abierto]);

  const lista = (conInicio: boolean) => (
    <ul>
      {conInicio && (
        <li>
          <Link href="/" aria-current={ruta === "/" ? "page" : undefined}>
            Inicio
          </Link>
        </li>
      )}
      {enlaces.map((e) => (
        <li key={e.href}>
          <Link
            href={e.href}
            aria-current={e.href === ruta ? "page" : undefined}
            // Un enlace a una sección de la misma página no cambia la ruta:
            // hay que cerrar el menú a mano.
            onClick={() => setAbierto(false)}
          >
            {e.texto}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <nav aria-label="Principal" className="cabecera__nav">
        {lista(false)}
      </nav>

      <button
        type="button"
        className="menu__boton"
        aria-expanded={abierto}
        aria-controls="menu-movil"
        onClick={() => setAbierto((a) => !a)}
      >
        {abierto ? (
          <X aria-hidden="true" size={22} />
        ) : (
          <Menu aria-hidden="true" size={22} />
        )}
        <span>{abierto ? "Cerrar" : "Menú"}</span>
      </button>

      <nav
        id="menu-movil"
        aria-label="Menú"
        className="menu__panel"
        hidden={!abierto}
      >
        {lista(true)}
      </nav>
    </>
  );
}
