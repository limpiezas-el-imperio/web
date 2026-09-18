"use server";

import type { EstadoEnvio } from "@/datos/formularios";
import { antispam, contacto, error, linea, mandarCorreo, texto } from "./correo";

// Los datos de facturación de /datos-de-facturacion, por correo a info@ (ver
// correo.ts). Lo que pedía su web vieja, menos lo que sobraba para una factura.
export async function enviarFacturacion(
  _anterior: EstadoEnvio,
  datos: FormData,
): Promise<EstadoEnvio> {
  const spam = antispam(datos);
  if (spam) return spam;
  const de = contacto(datos);
  if ("estado" in de) return de;
  if (!de.correo) return error("Falta tu correo.");

  const titular = linea(datos, "titular", 150);
  const nif = linea(datos, "nif", 20).toUpperCase();
  const calle = linea(datos, "calle", 150);
  const resto = linea(datos, "resto", 80);
  const codigoPostal = linea(datos, "codigoPostal", 10);
  const localidad = linea(datos, "localidad", 80);
  const provincia = linea(datos, "provincia", 80);
  const pais = linea(datos, "pais", 60) || "España";
  const servicio = texto(datos, "servicio", 2000);

  if (!titular) return error("Falta el nombre o la razón social.");
  if (nif.replace(/[^0-9A-Z]/g, "").length < 8) return error("Revisa el NIF, CIF o DNI.");
  if (!calle) return error("Falta la calle y el número.");
  if (!codigoPostal) return error("Falta el código postal.");
  if (!localidad) return error("Falta la localidad.");
  if (!provincia) return error("Falta la provincia.");
  if (!servicio) return error("Falta decirnos de qué servicio es la factura.");

  return mandarCorreo({
    asunto: `Datos de facturación: ${titular}`,
    de,
    cuerpo: [
      "Datos de facturación desde la web.",
      "",
      `Nombre o razón social: ${titular}`,
      `NIF, CIF o DNI: ${nif}`,
      "",
      "Dirección fiscal:",
      calle,
      ...(resto ? [resto] : []),
      `${codigoPostal} ${localidad} (${provincia})`,
      pais,
      "",
      `Persona de contacto: ${de.nombre}`,
      `Teléfono: ${de.telefono}`,
      `Correo: ${de.correo}`,
      "",
      "Servicio:",
      servicio,
    ].join("\n"),
  });
}
