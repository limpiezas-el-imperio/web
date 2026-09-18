"use client";

import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { enviarFacturacion } from "@/acciones/facturacion";
import { enlaceWhatsApp } from "@/datos/negocio";
import { Aceptar, AvisoError, CamposContacto, Enviado, Trampa } from "./PiezasFormulario";
// Mismas piezas que el presupuesto guiado: grupos y campos.
import p from "./Presupuesto.module.css";
import { useFormularioCorreo } from "./useFormularioCorreo";

// Los datos para hacerle la factura a un cliente: llegan por correo a info@
// (src/acciones/facturacion.ts). Es lo que pedía su web vieja, pero sin obligar
// a rellenar escalera, piso, puerta y letra por separado, y sin «envíame una
// copia» (serviría para mandar correos a cualquiera). WhatsApp, segunda vía.

type Clave =
  | "titular"
  | "nif"
  | "calle"
  | "resto"
  | "codigoPostal"
  | "localidad"
  | "provincia"
  | "pais";

type Dato = {
  clave: Clave;
  etiqueta: string;
  autoComplete: string;
  maximo: number;
  obligatorio?: boolean;
  ejemplo?: string;
  numerico?: boolean;
};

const empresa: Dato[] = [
  {
    clave: "titular",
    etiqueta: "Nombre o razón social",
    autoComplete: "organization",
    maximo: 150,
    obligatorio: true,
  },
  {
    clave: "nif",
    etiqueta: "NIF, CIF o DNI",
    autoComplete: "off",
    maximo: 20,
    obligatorio: true,
  },
];

const direccion: Dato[] = [
  {
    clave: "calle",
    etiqueta: "Calle y número",
    autoComplete: "address-line1",
    maximo: 150,
    obligatorio: true,
  },
  {
    clave: "resto",
    etiqueta: "Piso, puerta, escalera (opcional)",
    autoComplete: "address-line2",
    maximo: 80,
    ejemplo: "Esc. 2, 3.º B",
  },
  {
    clave: "codigoPostal",
    etiqueta: "Código postal",
    autoComplete: "postal-code",
    maximo: 10,
    obligatorio: true,
    numerico: true,
  },
  {
    clave: "localidad",
    etiqueta: "Localidad",
    autoComplete: "address-level2",
    maximo: 80,
    obligatorio: true,
  },
  {
    clave: "provincia",
    etiqueta: "Provincia",
    autoComplete: "address-level1",
    maximo: 80,
    obligatorio: true,
  },
  { clave: "pais", etiqueta: "País", autoComplete: "country-name", maximo: 60 },
];

export default function Facturacion() {
  const [valores, setValores] = useState<Record<Clave, string>>({
    titular: "",
    nif: "",
    calle: "",
    resto: "",
    codigoPostal: "",
    localidad: "",
    provincia: "Valencia",
    pais: "España",
  });
  const nombre = useState("");
  const telefono = useState("");
  const correo = useState("");
  const [servicio, setServicio] = useState("");
  const [acepto, setAcepto] = useState(false);
  const { resultado, enviando, formulario } = useFormularioCorreo(enviarFacturacion);

  const v = (clave: Clave) => valores[clave].trim();
  const lugar = [v("codigoPostal"), v("localidad")].filter(Boolean).join(" ");
  const mensaje = [
    "Hola, os mando mis datos para la factura.",
    v("titular") && `• ${v("titular")}`,
    v("nif") && `• NIF: ${v("nif").toUpperCase()}`,
    v("calle") && `• ${[v("calle"), v("resto")].filter(Boolean).join(", ")}`,
    lugar && `• ${lugar}${v("provincia") ? ` (${v("provincia")})` : ""}`,
    servicio.trim() && `• Servicio: ${servicio.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  const campo = ({ clave, etiqueta, autoComplete, maximo, obligatorio, ejemplo, numerico }: Dato) => (
    <label key={clave} className={p.campo}>
      <span>{etiqueta}</span>
      <input
        type="text"
        name={clave}
        value={valores[clave]}
        onChange={(e) => setValores((actual) => ({ ...actual, [clave]: e.target.value }))}
        autoComplete={autoComplete}
        inputMode={numerico ? "numeric" : undefined}
        placeholder={ejemplo}
        maxLength={maximo}
        required={obligatorio}
      />
    </label>
  );

  if (resultado.estado === "enviado") {
    return (
      <Enviado
        titulo="Datos enviados"
        texto="Gracias. Haremos la factura con estos datos."
      />
    );
  }

  return (
    <form className={`tarjeta ${p.presupuesto}`} {...formulario}>
      <fieldset className={p.grupo}>
        <legend>
          <span className="numero" aria-hidden="true">1</span>A nombre de quién
        </legend>
        <div className={p.campos}>{empresa.map(campo)}</div>
      </fieldset>

      <fieldset className={p.grupo}>
        <legend>
          <span className="numero" aria-hidden="true">2</span>
          Dirección fiscal
        </legend>
        <div className={p.campos}>{direccion.map(campo)}</div>
      </fieldset>

      <fieldset className={p.grupo}>
        <legend>
          <span className="numero" aria-hidden="true">3</span>
          Persona de contacto
        </legend>
        <div className={p.campos}>
          <CamposContacto
            nombre={nombre}
            telefono={telefono}
            correo={correo}
            correoObligatorio
          />
        </div>
      </fieldset>

      <fieldset className={p.grupo}>
        <legend>
          <span className="numero" aria-hidden="true">4</span>
          El servicio
        </legend>
        <label className={p.campo}>
          <span>De qué servicio es la factura</span>
          <textarea
            name="servicio"
            rows={3}
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
            placeholder="Por ejemplo: limpieza de fin de obra del 12 de septiembre en Bétera"
            maxLength={2000}
            required
          />
        </label>
      </fieldset>

      <Trampa />
      <Aceptar para="para hacer la factura" marcada={acepto} cambiar={setAcepto} />
      <AvisoError resultado={resultado} />

      <button
        type="submit"
        className={`boton boton--whatsapp boton--grande ${p.enviar}`}
        disabled={enviando}
      >
        <Send aria-hidden="true" size={20} />
        {enviando ? "Enviando…" : "Enviar datos"}
      </button>
      <a className={`boton boton--claro ${p.enviar}`} href={enlaceWhatsApp(mensaje)}>
        <MessageCircle aria-hidden="true" size={20} />
        O mándalos por WhatsApp
      </a>
    </form>
  );
}
