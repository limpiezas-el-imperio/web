// Service worker de /instalar. Sólo lo registra esa página: el Chrome de los
// Android antiguos no ofrece instalar la web sin uno que atienda las peticiones.
// No guarda nada en caché: deja pasar cada página y, si no hay conexión,
// responde con un aviso en vez de la pantalla de error del navegador.
const sinConexion = `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sin conexión · Limpiezas El Imperio</title></head>
<body style="margin:0;padding:2rem 1.25rem;font-family:system-ui,sans-serif;color:#0c2d5c">
<h1 style="font-size:1.5rem">Sin conexión</h1>
<p>No hay internet ahora mismo. Vuelve a intentarlo cuando tengas cobertura.</p>
</body></html>`;

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (evento) => evento.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (evento) => {
  if (evento.request.mode !== "navigate") return;
  evento.respondWith(
    fetch(evento.request).catch(
      () =>
        new Response(sinConexion, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }),
    ),
  );
});
