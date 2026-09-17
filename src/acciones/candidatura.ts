"use server";

import { disponibilidades, type EstadoEnvio } from "@/datos/formularios";
import { antispam, contacto, linea, mandarCorreo, texto } from "./correo";

// La candidatura de /trabaja-con-nosotros, por correo a info@ (ver correo.ts).
export async function enviarCandidatura(
  _anterior: EstadoEnvio,
  datos: FormData,
): Promise<EstadoEnvio> {
  const spam = antispam(datos);
  if (spam) return spam;
  const de = contacto(datos);
  if ("estado" in de) return de;

  const lugar = linea(datos, "lugar", 120);
  const experiencia = texto(datos, "experiencia", 2000);
  const disponible = datos
    .getAll("disponibilidad")
    .map(String)
    .filter((d) => (disponibilidades as readonly string[]).includes(d));

  return mandarCorreo({
    asunto: `Candidatura: ${de.nombre}`,
    de,
    cuerpo: [
      "Nueva candidatura desde la web (Trabaja con nosotros).",
      "",
      `Nombre: ${de.nombre}`,
      `Teléfono: ${de.telefono}`,
      `Correo: ${de.correo || "no lo ha dejado"}`,
      `Dónde vive: ${lugar || "no lo ha dicho"}`,
      `Disponibilidad: ${disponible.length > 0 ? disponible.join(", ").toLowerCase() : "no la ha dicho"}`,
      "",
      "Experiencia:",
      experiencia || "no la ha contado",
    ].join("\n"),
  });
}
