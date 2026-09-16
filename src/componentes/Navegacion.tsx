"use client";

import { ArrowRight, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { enlaceWhatsApp, negocio } from "@/datos/negocio";
import { enlaces } from "@/datos/navegacion";

// La navegación de la cabecera. En escritorio, los enlaces en fila; en tablet
// y móvil, un botón «Menú» que abre el menú a pantalla completa. Es componente
// de cliente sólo por eso: abrir y cerrar, y saber en qué página estás.
export default function Navegacion() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  // Al cerrar con Escape o con el botón, el foco vuelve al botón. Al cerrar
  // por elegir un enlace, no: el foco tiene que ir a donde lleva el enlace.
  const devolverFoco = useRef(false);

  const cerrar = (conFoco: boolean) => {
    devolverFoco.current = conFoco;
    setAbierto(false);
  };

  // Cerrar al cambiar de página (se ajusta el estado durante el render, como
  // recomienda React, en vez de hacerlo en un efecto).
  const [rutaAnterior, setRutaAnterior] = useState(ruta);
  if (ruta !== rutaAnterior) {
    setRutaAnterior(ruta);
    setAbierto(false);
  }

  useEffect(() => {
    if (!abierto) return;

    // Lo que queda detrás no se desplaza ni se puede tabular: `inert` en todo
    // lo que no es la cabecera. La clase en <html> bloquea el scroll y pone la
    // cabecera en azul.
    const html = document.documentElement;
    const detras = document.querySelectorAll<HTMLElement>(
      "body > :not(.cabecera):not(script)",
    );
    html.classList.add("menu-abierto");
    detras.forEach((el) => (el.inert = true));
    // preventScroll en los dos focus(): el botón vive en una cabecera sticky y,
    // sin él, devolverle el foco hacía que la página se desplazara hacia arriba
    // al cerrar. Te sacaba de donde estabas leyendo.
    panel.current?.querySelector("a")?.focus({ preventScroll: true });

    const botonMenu = boton.current;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar(true);
    };
    // Si se ensancha la ventana hasta escritorio, el menú ya no tiene sentido.
    const escritorio = window.matchMedia("(min-width: 64.0625rem)");
    const alEnsanchar = () => escritorio.matches && cerrar(false);

    document.addEventListener("keydown", alPulsar);
    escritorio.addEventListener("change", alEnsanchar);
    return () => {
      html.classList.remove("menu-abierto");
      detras.forEach((el) => (el.inert = false));
      document.removeEventListener("keydown", alPulsar);
      escritorio.removeEventListener("change", alEnsanchar);
      if (devolverFoco.current) botonMenu?.focus({ preventScroll: true });
      devolverFoco.current = false;
    };
  }, [abierto]);

  const actual = (href: string) => (href === ruta ? "page" : undefined);

  return (
    <>
      <nav aria-label="Principal" className="cabecera__nav">
        <ul>
          {enlaces.map((e) => (
            <li key={e.href}>
              <Link href={e.href} aria-current={actual(e.href)}>
                {e.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        ref={boton}
        type="button"
        className="menu__boton"
        aria-expanded={abierto}
        aria-controls="menu-movil"
        onClick={() => (abierto ? cerrar(true) : setAbierto(true))}
      >
        {abierto ? (
          <X aria-hidden="true" size={20} />
        ) : (
          <Menu aria-hidden="true" size={20} />
        )}
        <span>{abierto ? "Cerrar" : "Menú"}</span>
      </button>

      <nav
        ref={panel}
        id="menu-movil"
        aria-label="Menú"
        className="menu__panel"
        hidden={!abierto}
      >
        <div className="menu__contenido">
          <ul className="menu__lista">
            {[{ href: "/", texto: "Inicio" }, ...enlaces].map((e, i) => (
              <li key={e.href} style={{ "--i": i } as React.CSSProperties}>
                <Link
                  href={e.href}
                  aria-current={actual(e.href)}
                  // Un enlace a una sección de la misma página no cambia la
                  // ruta: hay que cerrar el menú a mano.
                  onClick={() => cerrar(false)}
                >
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>

          <div className="menu__contacto">
            <div className="menu__botones">
              <a className="boton boton--whatsapp" href={enlaceWhatsApp()}>
                <MessageCircle aria-hidden="true" size={20} />
                WhatsApp
              </a>
              <a
                className="boton boton--claro"
                href={`tel:${negocio.telefono}`}
                aria-label={`Llamar al ${negocio.telefonoVisible}`}
              >
                <Phone aria-hidden="true" size={20} />
                Llamar
              </a>
            </div>
            {/* El horario no va: con él el menú no cabía en un móvil sin
                desplazarse. Está en el pie, en el contacto y en /contacto. */}
            <div className="menu__extra">
              <a className="menu__correo" href={`mailto:${negocio.correo}`}>
                <Mail aria-hidden="true" size={20} />
                {negocio.correo}
              </a>
              {/* Secundario: el empleo no es para clientes, pero desde el
                  móvil el pie queda lejos. */}
              <Link
                className="menu__secundario"
                href="/trabaja-con-nosotros"
                aria-current={actual("/trabaja-con-nosotros")}
                onClick={() => cerrar(false)}
              >
                Trabaja con nosotros
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
