import Link from "next/link";
import TextoLegal from "@/componentes/TextoLegal";
import { negocio } from "@/datos/negocio";
import { metadatosPagina } from "@/datos/sitio";

export const metadata = metadatosPagina({
  titulo: "Política de cookies",
  descripcion: `${negocio.nombre} no usa cookies, ni analítica, ni seguimiento.`,
  ruta: "/politica-de-cookies",
});

// Comprobado el 16 sept 2026 en la web publicada, con un navegador limpio: ni
// una cookie, nada en localStorage ni sessionStorage, y ninguna petición a otro
// dominio (las tipografías y las fotos se sirven desde la propia web). Si algún
// día se añade analítica, un mapa de Google o un vídeo incrustado, esta página
// deja de ser cierta y hay que revisarla (y quizá poner aviso de cookies).
export default function PoliticaCookies() {
  return (
    <TextoLegal
      antetitulo="Legal"
      titulo="Política de cookies"
      actualizado="16 de septiembre de 2026"
    >
      <h2>Esta web no usa cookies</h2>
      <p>
        No guardamos cookies en tu navegador, ni propias ni de terceros. Tampoco
        usamos analítica, publicidad ni ninguna herramienta de seguimiento. Las
        tipografías y las fotos se sirven desde la propia web, sin llamar a otros
        servicios.
      </p>
      <p>Por eso no te pedimos que aceptes cookies al entrar.</p>

      <h2>Enlaces a otros servicios</h2>
      <p>
        Cuando pulsas un enlace a WhatsApp, Google Maps o nuestras redes sociales,
        sales de esta web. Esos servicios pueden usar sus propias cookies, según sus
        políticas.
      </p>

      <h2>Si esto cambia</h2>
      <p>
        Si algún día añadimos algo que use cookies, lo diremos aquí y, cuando haga
        falta, te pediremos permiso antes.
      </p>
      <p>
        Cómo tratamos los datos de quien nos contacta está en la{" "}
        <Link className="enlace" href="/politica-de-privacidad">
          política de privacidad
        </Link>
        .
      </p>
    </TextoLegal>
  );
}
