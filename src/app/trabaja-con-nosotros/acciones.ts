"use server";

import nodemailer from "nodemailer";
import {
  disponibilidades,
  type EstadoCandidatura,
  tiempoMinimo,
} from "@/datos/candidatura";
import { negocio } from "@/datos/negocio";

// Manda la candidatura por correo a info@, desde el propio buzón de Hostinger.
// No guarda nada: el correo es el único registro.
//
// La contraseña del buzón va en EMAIL_PASSWORD (en Vercel, sin comillas; en
// local, en .env, fuera de git). Si falta o se cambia en Hostinger sin cambiarla en
// Vercel, el formulario da error y ofrece WhatsApp: no se pierde en silencio.

// Una línea: sin saltos, para el asunto y los campos cortos.
const linea = (datos: FormData, campo: string, maximo: number) =>
  String(datos.get(campo) ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, maximo);

const error = (mensaje: string): EstadoCandidatura => ({ estado: "error", mensaje });

export async function enviarCandidatura(
  _anterior: EstadoCandidatura,
  datos: FormData,
): Promise<EstadoCandidatura> {
  // Antispam. El campo trampa no lo ve una persona: si viene relleno, se hace
  // como que se ha enviado. Lo que tarda en rellenarse lo mide el navegador.
  if (linea(datos, "web", 200)) return { estado: "enviada" };
  const tiempo = Number(datos.get("tiempo"));
  if (!Number.isFinite(tiempo) || tiempo < tiempoMinimo) {
    return error("No se ha podido enviar. Espera unos segundos y vuelve a intentarlo.");
  }

  const nombre = linea(datos, "nombre", 100);
  const telefono = linea(datos, "telefono", 30);
  const correo = linea(datos, "correo", 120);
  const lugar = linea(datos, "lugar", 120);
  const experiencia = String(datos.get("experiencia") ?? "").trim().slice(0, 2000);
  const disponible = datos
    .getAll("disponibilidad")
    .map(String)
    .filter((d) => (disponibilidades as readonly string[]).includes(d));

  if (!nombre) return error("Falta tu nombre.");
  if (telefono.replace(/\D/g, "").length < 9) return error("Revisa tu teléfono.");
  if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return error("Revisa tu correo.");
  }
  if (datos.get("acepto") !== "si") {
    return error("Tienes que aceptar la política de privacidad.");
  }

  const contrasena = process.env.EMAIL_PASSWORD;
  if (!contrasena) {
    console.error("Candidatura: falta EMAIL_PASSWORD");
    return error("No se ha podido enviar.");
  }

  const texto = [
    "Nueva candidatura desde la web (Trabaja con nosotros).",
    "",
    `Nombre: ${nombre}`,
    `Teléfono: ${telefono}`,
    `Correo: ${correo || "no lo ha dejado"}`,
    `Dónde vive: ${lugar || "no lo ha dicho"}`,
    `Disponibilidad: ${disponible.length > 0 ? disponible.join(", ").toLowerCase() : "no la ha dicho"}`,
    "",
    "Experiencia:",
    experiencia || "no la ha contado",
  ].join("\n");

  const transporte = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: { user: negocio.correo, pass: contrasena },
  });

  try {
    await transporte.sendMail({
      from: { name: `Web de ${negocio.nombre}`, address: negocio.correo },
      to: negocio.correo,
      // Para contestar directamente con «Responder».
      replyTo: correo ? { name: nombre, address: correo } : undefined,
      subject: `Candidatura: ${nombre}`,
      text: texto,
    });
  } catch (e) {
    console.error("Candidatura: no se pudo mandar el correo", e);
    return error("No se ha podido enviar.");
  }

  return { estado: "enviada" };
}
