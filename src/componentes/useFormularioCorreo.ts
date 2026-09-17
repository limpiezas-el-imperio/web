"use client";

import { type FormEvent, startTransition, useActionState, useRef } from "react";
import type { EstadoEnvio } from "@/datos/formularios";

type Accion = (anterior: EstadoEnvio, datos: FormData) => Promise<EstadoEnvio>;

// Se llama «use…» por React (ver useCarrusel).
//
// Lo común de los formularios que llegan por correo: la acción de servidor,
// su resultado y el antispam del lado del navegador (cuánto se tarda en
// rellenarlo). `completar` añade al envío lo que no son campos del formulario.
//
// Se envía con onSubmit y startTransition, no con <form action>: React vacía el
// formulario tras la acción, y las casillas controladas (la de aceptar)
// quedaban desmarcadas sin que el estado lo supiera; el navegador bloqueaba
// entonces el segundo intento sin decir nada.
export function useFormularioCorreo(accion: Accion, completar?: (datos: FormData) => void) {
  const [resultado, enviar, enviando] = useActionState(accion, { estado: "inicial" });
  const empezado = useRef(0);

  const empezar = () => {
    if (!empezado.current) empezado.current = Date.now();
  };

  const formulario = {
    onSubmit: (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const datos = new FormData(e.currentTarget);
      completar?.(datos);
      datos.set("tiempo", String(empezado.current ? Date.now() - empezado.current : 0));
      startTransition(() => enviar(datos));
    },
    onFocusCapture: empezar,
    onPointerDownCapture: empezar,
    onKeyDownCapture: empezar,
  };

  return { resultado, enviando, formulario };
}
