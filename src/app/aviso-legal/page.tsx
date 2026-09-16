import Link from "next/link";
import TextoLegal from "@/componentes/TextoLegal";
import { fotoPortada } from "@/datos/fotos";
import { negocio } from "@/datos/negocio";
import { metadatosPagina } from "@/datos/sitio";

export const metadata = metadatosPagina({
  titulo: "Aviso legal",
  descripcion: `Datos del titular de ${negocio.nombre} y condiciones de uso de esta web.`,
  ruta: "/aviso-legal",
});

// ⚠️ Falta el NIF, que la LSSI (art. 10) exige. Tampoco estaba en su web vieja.
// No entra en git hasta que él lo publique (CLAUDE.md): cuando lo dé, se añade
// a negocio.ts y aquí, en «Datos del titular».
export default function AvisoLegal() {
  return (
    <TextoLegal antetitulo="Legal" titulo="Aviso legal" actualizado="16 de septiembre de 2026">
      <h2>Datos del titular</h2>
      <p>
        En cumplimiento de la Ley 34/2002, de servicios de la sociedad de la
        información y de comercio electrónico (LSSI-CE), estos son los datos del
        titular de esta web:
      </p>
      <dl>
        <dt>Titular</dt>
        <dd>{negocio.titular}, autónomo</dd>
        <dt>Nombre comercial</dt>
        <dd>{negocio.nombre}</dd>
        <dt>Domicilio</dt>
        <dd>
          {negocio.direccion}, {negocio.codigoPostal} {negocio.localidad} ({negocio.provincia})
        </dd>
        <dt>Teléfono</dt>
        <dd>
          <a className="enlace" href={`tel:${negocio.telefono}`}>
            {negocio.telefonoVisible}
          </a>
        </dd>
        <dt>Correo</dt>
        <dd>
          <a className="enlace" href={`mailto:${negocio.correo}`}>
            {negocio.correo}
          </a>
        </dd>
      </dl>

      <h2>Para qué es esta web</h2>
      <p>
        Esta web da a conocer los servicios de limpieza de {negocio.nombre} y las
        formas de contactar para pedir presupuesto. En ella no se contrata ni se
        paga nada: los presupuestos y los servicios se acuerdan directamente por
        WhatsApp, teléfono o correo.
      </p>

      <h2>Uso de la web</h2>
      <p>
        Quien la visita se compromete a usarla de forma lícita y a no hacer nada
        que pueda dañarla o impedir su funcionamiento.
      </p>
      <p>
        La información de la web (servicios, zonas, horarios) es orientativa y puede
        cambiar. Las condiciones y el precio de cada servicio son los del
        presupuesto que se acuerde en cada caso.
      </p>

      <h2>Propiedad intelectual</h2>
      <p>
        Los textos, el logotipo y las fotos de trabajos de esta web son de{" "}
        {negocio.nombre}. No se pueden copiar ni usar sin su permiso. La foto de la
        portada es de{" "}
        <a className="enlace" href={fotoPortada.enlace} rel="noopener">
          {fotoPortada.autor}
        </a>{" "}
        y se usa con la licencia de Unsplash.
      </p>

      <h2>Enlaces a otras webs</h2>
      <p>
        La web enlaza a servicios de terceros, como WhatsApp, Google Maps o redes
        sociales. {negocio.nombre} no es responsable de su contenido ni de cómo
        tratan los datos: cada uno tiene sus propias condiciones.
      </p>

      <h2>Privacidad y cookies</h2>
      <p>
        Cómo se tratan los datos de quien nos contacta está en la{" "}
        <Link className="enlace" href="/politica-de-privacidad">
          política de privacidad
        </Link>
        . Esta web no usa cookies: lo explicamos en la{" "}
        <Link className="enlace" href="/politica-de-cookies">
          política de cookies
        </Link>
        .
      </p>

      <h2>Legislación aplicable</h2>
      <p>Este aviso legal se rige por la legislación española.</p>
    </TextoLegal>
  );
}
