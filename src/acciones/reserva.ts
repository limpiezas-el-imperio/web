"use server";

import type { EstadoEnvio } from "@/datos/formularios";
import { servicios } from "@/datos/negocio";
import { antispam, contacto, error, linea, mandarCorreo, texto } from "./correo";

// La reserva de /reserva-de-servicios, por correo a info@ (ver correo.ts). Lo
// de su «hoja de servicio» que tiene que dar el cliente.
export async function enviarReserva(
  _anterior: EstadoEnvio,
  datos: FormData,
): Promise<EstadoEnvio> {
  const spam = antispam(datos);
  if (spam) return spam;
  const de = contacto(datos);
  if ("estado" in de) return de;

  const tipo = linea(datos, "tipo", 60);
  const fecha = linea(datos, "fecha", 10);
  const hora = linea(datos, "hora", 5);
  const direccion = linea(datos, "direccion", 150);
  const codigoPostal = linea(datos, "codigoPostal", 10);
  const localidad = linea(datos, "localidad", 80);
  const identificacion = linea(datos, "identificacion", 20).toUpperCase();
  const descripcion = texto(datos, "descripcion", 2000);

  if (!servicios.some((s) => s.titulo === tipo)) return error("Elige el tipo de limpieza.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return error("Falta la fecha.");
  if (!/^\d{2}:\d{2}$/.test(hora)) return error("Falta la hora.");
  if (!direccion) return error("Falta la dirección.");
  if (!codigoPostal) return error("Falta el código postal.");
  if (!localidad) return error("Falta la localidad.");
  if (!descripcion) return error("Cuéntanos qué hay que limpiar.");

  const dia = fecha.split("-").reverse().join("/");

  return mandarCorreo({
    asunto: `Reserva: ${tipo}, ${dia} a las ${hora} (${de.nombre})`,
    de,
    cuerpo: [
      "Nueva reserva desde la web (Reserva de servicios).",
      "",
      `Tipo de limpieza: ${tipo}`,
      `Fecha: ${dia}`,
      `Hora: ${hora}`,
      "",
      "Dirección:",
      direccion,
      `${codigoPostal} ${localidad}`,
      "",
      `Nombre: ${de.nombre}`,
      `DNI, NIE o CIF: ${identificacion || "no lo ha dejado"}`,
      `Teléfono: ${de.telefono}`,
      `Correo: ${de.correo || "no lo ha dejado"}`,
      "",
      "Qué hay que limpiar:",
      descripcion,
    ].join("\n"),
  });
}
