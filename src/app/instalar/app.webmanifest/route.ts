import manifest from "@/app/manifest";

// El manifiesto que hace la web instalable, enlazado sólo desde /instalar. El
// de todas las páginas (src/app/manifest.ts) se queda en «browser» para que
// Chrome no ofrezca instalarla por su cuenta en el resto de la web.
//
// Lleva un `id` distinto del otro (que por defecto es "/"): Chrome actualiza la
// app instalada con el manifiesto de las páginas que abre, y si coincidiera el
// id, el «browser» de las demás la devolvería a una pestaña normal.
export const dynamic = "force-static";

export function GET() {
  return Response.json(
    { ...manifest(), id: "/app", display: "standalone", scope: "/" },
    { headers: { "Content-Type": "application/manifest+json" } },
  );
}
