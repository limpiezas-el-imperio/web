"use client";

import { CircleCheck, Download } from "lucide-react";
import { useEffect, useState } from "react";
import s from "./Instalar.module.css";

// El aviso de Chrome para instalar la web. No está en los tipos de TypeScript:
// sólo existe en Chrome, Edge y Samsung Internet.
type EventoInstalar = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

declare global {
  interface Window {
    eventoInstalar?: EventoInstalar;
  }
}

// Chrome puede avisar antes de que React arranque: este script, en el HTML de
// la página, guarda el aviso para cuando el componente lo pida.
export const capturaTemprana = `addEventListener("beforeinstallprompt",function(e){e.preventDefault();window.eventoInstalar=e})`;

type Estado = "esperando" | "lista" | "instalada" | "sin-boton";

// El botón «Instalar» de /instalar. Registra el service worker (sin él, el
// Chrome de los Android antiguos no ofrece instalar) y espera el aviso de
// Chrome. Si a los pocos segundos no ha llegado, el navegador no lo ofrece
// (iPhone, Firefox, la ventana de WhatsApp…) y quedan los pasos a mano.
export default function Instalar() {
  const [estado, setEstado] = useState<Estado>("esperando");
  const [evento, setEvento] = useState<EventoInstalar>();

  useEffect(() => {
    const listo = (e: EventoInstalar) => {
      setEvento(e);
      setEstado("lista");
    };
    const alAvisar = (e: Event) => {
      e.preventDefault();
      listo(e as EventoInstalar);
    };
    const alInstalar = () => setEstado("instalada");

    window.addEventListener("beforeinstallprompt", alAvisar);
    window.addEventListener("appinstalled", alInstalar);
    navigator.serviceWorker?.register("/sw.js").catch(() => {});

    // Dentro de un tick: así no se cambia el estado durante el propio efecto.
    const comprobar = setTimeout(() => {
      if (window.matchMedia("(display-mode: standalone)").matches) alInstalar();
      else if (window.eventoInstalar) listo(window.eventoInstalar);
    }, 0);
    const rendirse = setTimeout(
      () => setEstado((actual) => (actual === "esperando" ? "sin-boton" : actual)),
      5000,
    );

    return () => {
      window.removeEventListener("beforeinstallprompt", alAvisar);
      window.removeEventListener("appinstalled", alInstalar);
      clearTimeout(comprobar);
      clearTimeout(rendirse);
    };
  }, []);

  const instalar = async () => {
    if (!evento) return;
    await evento.prompt();
    const { outcome } = await evento.userChoice;
    // El aviso sólo se puede usar una vez: si lo cancela, Chrome manda otro
    // al recargar la página.
    window.eventoInstalar = undefined;
    setEvento(undefined);
    setEstado(outcome === "accepted" ? "instalada" : "sin-boton");
  };

  return (
    <div className={`tarjeta ${s.instalar}`} aria-live="polite">
      {estado === "instalada" ? (
        <p className={s.hecho}>
          <CircleCheck aria-hidden="true" size={22} />
          <span>
            <strong>Instalada.</strong> Busca el icono de El Imperio en la pantalla de
            inicio.
          </span>
        </p>
      ) : estado === "lista" ? (
        <>
          <button
            type="button"
            className="boton boton--whatsapp boton--grande"
            onClick={instalar}
          >
            <Download aria-hidden="true" size={20} />
            Instalar
          </button>
          <p className={s.ayuda}>Pulsa el botón y luego «Instalar» en el aviso.</p>
        </>
      ) : estado === "esperando" ? (
        <p className={s.ayuda}>Preparando el botón…</p>
      ) : (
        <p className={s.ayuda}>
          Este navegador no muestra el botón. Sigue los pasos de abajo: tardas un
          minuto.
        </p>
      )}
    </div>
  );
}
