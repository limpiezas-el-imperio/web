// JSON-LD para buscadores. El `<` se escapa para que un texto no pueda cerrar
// la etiqueta <script> (así lo recomienda la guía de Next).
export default function DatosEstructurados({ datos }: { datos: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", ...datos }).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  );
}
