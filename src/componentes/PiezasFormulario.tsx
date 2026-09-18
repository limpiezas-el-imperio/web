import { CircleCheck } from "lucide-react";
import Link from "next/link";
import type { EstadoEnvio } from "@/datos/formularios";
import s from "./Formulario.module.css";
import p from "./Presupuesto.module.css";

// Piezas comunes de los formularios que llegan por correo (Presupuesto,
// Candidatura, Facturacion y Reserva). Los campos van con estado en cada
// formulario: así no se vacían si el envío da error, y de ahí sale también el
// mensaje de WhatsApp.

type Campo = [valor: string, cambiar: (v: string) => void];

export function CamposContacto({
  nombre,
  telefono,
  correo,
  correoObligatorio = false,
}: {
  nombre: Campo;
  telefono: Campo;
  correo: Campo;
  correoObligatorio?: boolean;
}) {
  return (
    <>
      <label className={p.campo}>
        <span>Nombre</span>
        <input
          type="text"
          name="nombre"
          value={nombre[0]}
          onChange={(e) => nombre[1](e.target.value)}
          autoComplete="name"
          maxLength={100}
          required
        />
      </label>
      <label className={p.campo}>
        <span>Teléfono</span>
        <input
          type="tel"
          name="telefono"
          value={telefono[0]}
          onChange={(e) => telefono[1](e.target.value)}
          autoComplete="tel"
          maxLength={30}
          required
        />
      </label>
      <label className={p.campo}>
        <span>{correoObligatorio ? "Correo" : "Correo (opcional)"}</span>
        <input
          type="email"
          name="correo"
          value={correo[0]}
          onChange={(e) => correo[1](e.target.value)}
          autoComplete="email"
          maxLength={120}
          required={correoObligatorio}
        />
      </label>
    </>
  );
}

// Trampa para programas: una persona no lo ve ni llega con el tabulador.
export function Trampa() {
  return (
    <label className={s.trampa} aria-hidden="true">
      Web
      <input type="text" name="web" tabIndex={-1} autoComplete="off" />
    </label>
  );
}

export function Aceptar({
  para,
  marcada,
  cambiar,
}: {
  para: string;
  marcada: boolean;
  cambiar: (v: boolean) => void;
}) {
  return (
    <label className={s.acepto}>
      <input
        type="checkbox"
        name="acepto"
        value="si"
        checked={marcada}
        onChange={(e) => cambiar(e.target.checked)}
        required
      />
      <span>
        Acepto que uséis mis datos sólo {para} (
        <Link className="enlace" href="/politica-de-privacidad">
          política de privacidad
        </Link>
        ).
      </span>
    </label>
  );
}

export function AvisoError({ resultado }: { resultado: EstadoEnvio }) {
  if (resultado.estado !== "error") return null;
  return (
    <p className={s.error} role="alert">
      {resultado.mensaje} Si sigue fallando, mándanoslo por WhatsApp.
    </p>
  );
}

export function Enviado({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className={`tarjeta ${p.presupuesto} ${s.enviada}`} role="status">
      <CircleCheck aria-hidden="true" size={48} className={s.enviada__icono} />
      <h3>{titulo}</h3>
      <p>{texto}</p>
    </div>
  );
}
