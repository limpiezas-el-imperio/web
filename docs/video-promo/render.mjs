// Pinta la entrada, el cierre y los rótulos del vídeo (ver montar.py) como PNG
// de 1080×1920, con Chrome sin cabeza en el puerto 9334. Los rótulos salen con
// fondo transparente para ponerlos encima de cada plano.
//   node docs/video-promo/render.mjs docs/video-promo <carpeta de salida>
import fs from "node:fs";
import path from "node:path";

const [origen, destino] = process.argv.slice(2).map((p) => path.resolve(p));
fs.mkdirSync(destino, { recursive: true });

const titular = "Así dejamos<br>las casas";
// Uno por plano de montar.py, en el mismo orden.
const rotulos = ["Salones", "Cocinas", "Baños", "Duchas", "Dormitorios", "Comedores", "Habitaciones", "Terrazas"];

const trabajos = [
  ["intro.png", "intro.html"],
  ["final.png", "final.html"],
  ...rotulos.map((c, i) => [
    `r${i + 1}.png`,
    `rotulo.html?c=${encodeURIComponent(c)}${i === 0 ? `&t=${encodeURIComponent(titular)}` : ""}`,
  ]),
];

const t = await (await fetch("http://127.0.0.1:9334/json/new?about:blank", { method: "PUT" })).json();
const ws = new WebSocket(t.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const pendientes = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pendientes.has(m.id)) {
    pendientes.get(m.id)(m);
    pendientes.delete(m.id);
  }
});
const cmd = (method, params = {}) =>
  new Promise((r) => {
    const i = ++id;
    pendientes.set(i, r);
    ws.send(JSON.stringify({ id: i, method, params }));
  });

await cmd("Page.enable");
await cmd("Emulation.setDeviceMetricsOverride", { width: 1080, height: 1920, deviceScaleFactor: 1, mobile: false });
await cmd("Emulation.setDefaultBackgroundColorOverride", { color: { r: 0, g: 0, b: 0, a: 0 } });
for (const [salida, url] of trabajos) {
  await cmd("Page.navigate", { url: `file://${origen}/${url}` });
  await new Promise((r) => setTimeout(r, 1200));
  await cmd("Runtime.evaluate", { expression: "document.fonts.ready", awaitPromise: true });
  const s = await cmd("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(destino, salida), Buffer.from(s.result.data, "base64"));
}
console.log(`${trabajos.length} imágenes en ${destino}`);
ws.close();
process.exit(0);
