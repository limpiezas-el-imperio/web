import nodemailer from "nodemailer";
import { type EstadoEnvio, tiempoMinimo } from "@/datos/formularios";
import { negocio } from "@/datos/negocio";

// Lo común de las acciones que mandan un formulario por correo: leer campos,
// antispam, datos de contacto y el envío. Sólo lo importan las acciones
// ("use server"), nunca un componente: aquí se lee la contraseña.
//
// El correo sale del buzón de Hostinger y llega a ese mismo buzón (info@). No
// se guarda nada más: el correo es el único registro. La contraseña va en
// EMAIL_PASSWORD (en Vercel, sin comillas; en local, en .env, fuera de git).
// Si falta o se cambia en Hostinger sin cambiarla en Vercel, el formulario da
// error y ofrece WhatsApp: no se pierde en silencio.

// Una línea: sin saltos, para el asunto y los campos cortos.
export const linea = (datos: FormData, campo: string, maximo: number) =>
  String(datos.get(campo) ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, maximo);

export const texto = (datos: FormData, campo: string, maximo: number) =>
  String(datos.get(campo) ?? "").trim().slice(0, maximo);

export const error = (mensaje: string): EstadoEnvio => ({ estado: "error", mensaje });

// El campo trampa no lo ve una persona: si viene relleno, se hace como que se
// ha enviado. Lo que se tarda en rellenarlo lo mide el navegador.
export function antispam(datos: FormData): EstadoEnvio | null {
  if (linea(datos, "web", 200)) return { estado: "enviado" };
  const tiempo = Number(datos.get("tiempo"));
  if (!Number.isFinite(tiempo) || tiempo < tiempoMinimo) {
    return error("No se ha podido enviar. Espera unos segundos y vuelve a intentarlo.");
  }
  return null;
}

export type Contacto = { nombre: string; telefono: string; correo: string };

export function contacto(datos: FormData): Contacto | EstadoEnvio {
  const nombre = linea(datos, "nombre", 100);
  const telefono = linea(datos, "telefono", 30);
  const correo = linea(datos, "correo", 120);
  if (!nombre) return error("Falta tu nombre.");
  if (telefono.replace(/\D/g, "").length < 9) return error("Revisa tu teléfono.");
  if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return error("Revisa tu correo.");
  }
  if (datos.get("acepto") !== "si") {
    return error("Tienes que aceptar la política de privacidad.");
  }
  return { nombre, telefono, correo };
}

export async function mandarCorreo({
  asunto,
  cuerpo,
  de,
}: {
  asunto: string;
  cuerpo: string;
  de: Contacto;
}): Promise<EstadoEnvio> {
  const contrasena = process.env.EMAIL_PASSWORD;
  if (!contrasena) {
    console.error(`${asunto}: falta EMAIL_PASSWORD`);
    return error("No se ha podido enviar.");
  }

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
      replyTo: de.correo ? { name: de.nombre, address: de.correo } : undefined,
      subject: asunto,
      text: cuerpo,
    });
  } catch (e) {
    console.error(`${asunto}: no se pudo mandar el correo`, e);
    return error("No se ha podido enviar.");
  }

  return { estado: "enviado" };
}
