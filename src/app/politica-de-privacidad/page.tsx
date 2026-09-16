import Link from "next/link";
import TextoLegal from "@/componentes/TextoLegal";
import { negocio } from "@/datos/negocio";
import { metadatosPagina } from "@/datos/sitio";

export const metadata = metadatosPagina({
  titulo: "Política de privacidad",
  descripcion: `Qué datos trata ${negocio.nombre} cuando nos contactas, para qué y cuáles son tus derechos.`,
  ruta: "/politica-de-privacidad",
});

// Lo mínimo, y fiel a lo que hace la web de verdad: sin formularios, sin
// cuentas, sin cookies ni analítica. Sustituye a la de su web vieja, que era
// la plantilla de otra empresa sin limpiar (docs/sitio-actual.md).
export default function PoliticaPrivacidad() {
  return (
    <TextoLegal
      antetitulo="Legal"
      titulo="Política de privacidad"
      actualizado="16 de septiembre de 2026"
    >
      <h2>Quién es el responsable</h2>
      <p>
        {negocio.titular} ({negocio.nombre}), con domicilio en {negocio.direccion},{" "}
        {negocio.codigoPostal} {negocio.localidad} ({negocio.provincia}). Puedes
        escribirnos a{" "}
        <a className="enlace" href={`mailto:${negocio.correo}`}>
          {negocio.correo}
        </a>{" "}
        o llamarnos al {negocio.telefonoVisible}.
      </p>

      <h2>Qué datos tratamos</h2>
      <p>
        <strong>Esta web no recoge datos personales.</strong> No tiene formularios,
        ni registro, ni cookies, ni analítica. El presupuesto guiado solo prepara el
        texto en tu navegador: no se envía a ningún sitio hasta que tú lo mandas
        desde tu WhatsApp.
      </p>
      <p>
        Sí tratamos los datos que tú nos das cuando nos escribes por WhatsApp, nos
        llamas o nos mandas un correo: normalmente tu nombre, tu teléfono o correo,
        la dirección donde hay que limpiar y lo que nos cuentes del servicio.
      </p>

      <h2>Para qué los usamos</h2>
      <ul>
        <li>Para responderte y prepararte un presupuesto.</li>
        <li>Para organizar y prestar el servicio si lo contratas.</li>
        <li>Para hacer las facturas y cumplir con nuestras obligaciones fiscales.</li>
      </ul>
      <p>
        La base legal es tu petición de presupuesto y, si lo contratas, el propio
        servicio (art. 6.1.b del Reglamento General de Protección de Datos), además
        de las obligaciones legales de facturación (art. 6.1.c). No usamos tus datos
        para publicidad.
      </p>

      <h2>Cuánto tiempo los guardamos</h2>
      <p>
        Mientras hablamos del presupuesto o te prestamos el servicio y, después,
        durante los plazos que exige la ley, por ejemplo los fiscales.
      </p>

      <h2>Con quién los compartimos</h2>
      <p>
        No cedemos tus datos a nadie, salvo cuando lo exige la ley (por ejemplo, a
        la Agencia Tributaria).
      </p>
      <p>
        Si nos escribes por WhatsApp, ese mensaje pasa por WhatsApp, que es de Meta
        y tiene su propia política de privacidad. La web está alojada en Vercel,
        que puede registrar datos técnicos de la conexión, como la dirección IP,
        para servir la web y protegerla.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes pedirnos acceder a tus datos, corregirlos, borrarlos, oponerte a que
        los usemos, limitar su uso o recibirlos para llevarlos a otro sitio.
        Escríbenos a{" "}
        <a className="enlace" href={`mailto:${negocio.correo}`}>
          {negocio.correo}
        </a>
        .
      </p>
      <p>
        Si crees que no hemos tratado bien tus datos, puedes reclamar ante la
        Agencia Española de Protección de Datos (
        <a className="enlace" href="https://www.aepd.es" rel="noopener">
          aepd.es
        </a>
        ).
      </p>

      <h2>Cookies</h2>
      <p>
        Esta web no usa cookies. Más detalles en la{" "}
        <Link className="enlace" href="/politica-de-cookies">
          política de cookies
        </Link>
        .
      </p>
    </TextoLegal>
  );
}
