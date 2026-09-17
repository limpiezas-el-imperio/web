"use server";

import type { EstadoEnvio } from "@/datos/formularios";
import { antispam, contacto, error, mandarCorreo, texto } from "./correo";

// La petición de presupuesto (portada y /contacto), por correo a info@ (ver
// correo.ts). Lo que pide llega ya escrito, igual que el mensaje de WhatsApp:
// son opciones y un comentario, y sólo lo lee Frank.
export async function enviarPresupuesto(
  _anterior: EstadoEnvio,
  datos: FormData,
): Promise<EstadoEnvio> {
  const spam = antispam(datos);
  if (spam) return spam;
  const de = contacto(datos);
  if ("estado" in de) return de;

  const detalles = texto(datos, "detalles", 3000);
  if (!detalles) return error("No se ha podido enviar.");

  return mandarCorreo({
    asunto: `Presupuesto: ${de.nombre}`,
    de,
    cuerpo: [
      "Nueva petición de presupuesto desde la web.",
      "",
      `Nombre: ${de.nombre}`,
      `Teléfono: ${de.telefono}`,
      `Correo: ${de.correo || "no lo ha dejado"}`,
      "",
      "Lo que pide:",
      detalles,
    ].join("\n"),
  });
}
