@AGENTS.md

# CLAUDE.md

Web pública de Limpiezas El Imperio (La Pobla de Vallbona, Valencia), que
sustituye a la de Webador (**limpiezaselimperio.net**) y se lanza en
**www.limpiezaselimperio.es**. Next.js en Vercel.
`README.md` explica el porqué de las decisiones; esto es la guía operativa y
`todo.md`, lo pendiente.

| | |
|---|---|
| Repositorio | `limpiezas-el-imperio/web` (**público**, del cliente). `kevjrmy` es colaborador |
| Producción | **https://www.limpiezaselimperio.es** (también en https://limpiezaselimperio.vercel.app) |
| Vercel | proyecto `web` en la cuenta gratuita del cliente, enlazado al repositorio |
| Dominio | **`www.limpiezaselimperio.es`**, de Frank en Hostinger (Kevin con acceso de administrador), DNS en Hostinger. **En marcha desde el 17 sept 2026.** Todo en `docs/dominio.md` |
| Correo | **`info@limpiezaselimperio.es`, en Hostinger**: el que publica la web. El `info@limpiezaselimperio.net` sigue en Webador (es el de su cuenta de Vercel): muere si se borra la cuenta o se cambian los nameservers del `.net`. No se toca |
| Web vieja | https://limpiezaselimperio.net (Webador). Inventario en `docs/sitio-actual.md` |
| Negocio | Cómo trabaja de verdad, en `docs/privado/negocio.md` (fuera de git) |

## Estado (17 sept 2026, cierre de la cuarta sesión)

**Todas las páginas están hechas** y publicadas en **`www.limpiezaselimperio.es`**:

| Ruta | Qué lleva |
|---|---|
| `/` | Foto de portada, servicios, presupuesto guiado (por correo o WhatsApp), galería, cómo trabajamos, zonas con mapa, opiniones de Google |
| `/nuestros-servicios` | 5 áreas y 25 servicios, **con descripciones en borrador** pendientes de Frank |
| `/zonas-de-servicio` | 18 localidades en tres áreas, con el mapa |
| `/quienes-somos` | Dónde estamos, lema, equipo, cifras reales, por qué elegirnos, valores |
| `/preguntas-frecuentes` | La FAQ de su web, corregida |
| `/contacto` | WhatsApp, teléfono y correo; horario, zonas, redes; presupuesto guiado (por correo o WhatsApp) |
| `/trabaja-con-nosotros` | **Formulario de candidatura que llega por correo a `info@`**, y WhatsApp como segunda vía. No dice que esté contratando |
| `/aviso-legal`, `/politica-de-privacidad`, `/politica-de-cookies` | Lo mínimo y en llano, sin NIF (decisión de Kevin) |
| `/instalar` | **Oculta** (sin menú, sitemap ni índice): botón «Instalar» y pasos a mano para poner la web en la pantalla de inicio. Se hizo para Frank (Android antiguo). Sólo ella enlaza el manifiesto instalable (`instalar/app.webmanifest`, `display: standalone`, `id` propio) y registra `public/sw.js`; el resto de la web sigue en `browser`, sin aviso de Chrome |
| 404, `sitemap.xml`, `robots.txt` | La 404 explica que la web es nueva, para quien llegue con una URL de Webador |

- **Diseño validado por Frank** (16 sept 2026). La primera versión, sobria, no
  le gustó; la de ahora sí. **No se replantea** (ver *Estilo*).
- **El contenido se alineó con cómo trabaja de verdad** (decisión de Kevin, con
  `docs/privado/negocio.md`): fuera reparaciones y parkings y naves; dentro
  alquiler vacacional, sofás, mosquiteras, piscinas y escaparates; «por horas o
  con precio cerrado» en vez de «paquete mensual»; el equipo; y las zonas.
- **Dominio**: Vercel no vende `.es`; Frank lo compró en Hostinger. DNS en
  Hostinger (A y CNAME de Vercel, y MX, SPF, DKIM y DMARC del correo), `www`
  como principal. **Al tocar los DNS, no quites los del correo.**
- **Correo y formularios** (17 sept): `info@limpiezaselimperio.es` en
  Hostinger, publicado en la web. El presupuesto (por correo o WhatsApp) y la
  candidatura llegan a ese buzón; **probado de verdad, llegan a la bandeja de
  entrada** (ver *Restricciones*).
- **Galería** con diez fotos: siete en la rejilla, una tarjeta «+3» y un visor
  a pantalla completa (ver *Estilo*).
- **Falta**: que Frank cambie el enlace en Google y en sus redes, y sus
  respuestas (`todo.md`).

**Mismo cliente que `../limpiezas-imperio-software/`** (su contabilidad, en
https://limpiezas-imperio.vercel.app). Proyectos separados: esta web no lee ni
escribe en esa base de datos.

## Git y despliegue

- **Siempre sobre `main`, sin ramas**: commit directo y push a `origin`
  (`git@github.com:limpiezas-el-imperio/web.git`). **Cada push a `main` es un
  despliegue de producción** en su Vercel, sin entrar en su cuenta.
- **Funciona porque el repositorio es público.** En el plan Hobby, uno privado
  bloquea los despliegues de commits que no firma el dueño, y aquí firma
  `kevjrmy`. **No lo vuelvas privado** sin pasar antes a Pro. **Tampoco firmes
  como él**: sería suplantarle.
- **No hace falta comprobar el despliegue en cada push** (lo dijo Kevin): se
  comprueba en local antes. Cuando sí haga falta, recuerda que un despliegue
  fallido no avisa (se sigue sirviendo el anterior con un 200) y míralo así:

  ```bash
  gh api repos/limpiezas-el-imperio/web/commits/<sha>/status \
    --jq '.statuses[] | "\(.context): \(.state) — \(.description)"'
  ```

- **Variables de entorno**: en el panel de Vercel y **sin comillas**. Hoy sólo
  hay una, **`EMAIL_PASSWORD`** (la del buzón `info@` del `.es`), para el
  presupuesto y la candidatura. En local, en `.env` (fuera de git). **Si se cambia la
  contraseña en Hostinger, hay que cambiarla también en Vercel**: si no, el
  formulario da error (y ofrece WhatsApp).

## Qué se puede publicar y qué no

**Todo lo que entra en git lo puede leer cualquiera, para siempre**: borrarlo
después no sirve, queda en el historial. El listón: **si no está ya publicado
por él, no entra.**

**No entra:**

- **Secretos**: tokens, claves, `.env*` (excluidos en `.gitignore`), IDs o
  capturas de sus cuentas de Vercel, GitHub, Webador o Google.
- **`docs/privado/`**: material suyo que no es para publicar. Ahí está
  `negocio.md`, lo que enseña su contabilidad sobre cómo trabaja (sin nombres
  ni cifras). **Léelo antes de tocar servicios, zonas u horario.**
- **Nada de la contabilidad**: ni nombres de clientes o colaboradores, ni
  cifras, ni de dónde son sus clientes. Sirve para entender el negocio, no
  como fuente de contenido. Para ejemplos, los nombres inventados de siempre
  (ELENA PRADOS, BEATRIZ SOLANO, TOMAS RIVAS…).

**Entra, con cuidado:**

- **Fotos sin EXIF ni GPS**: son casas de clientes. Compruébalo antes de
  añadir una (`python3 -c "from PIL import Image; print(dict(Image.open('x.jpg').getexif()))"`).
- **Opiniones de su ficha de Google Maps**, como **extractos literales**: donde
  se corta va «[…]» y no se corrige nada. Autor con nombre e inicial. **Se
  corta para no publicar los nombres de su personal.** Detalles en
  `negocio.ts`.
- **La nota de Google (4,9 · 68) va escrita a mano**, con la fecha en que se
  comprobó. Google Maps no se deja leer con un fetch: hace falta un Chrome sin
  cabeza que rechace las cookies y abra «Reseñas».
- **La calle** sólo en el aviso legal, que la exige y donde ya la publicaba su
  web vieja. En el resto, sólo la localidad.

**Antes de cada commit**, mira `git status` y **añade por nombre** lo tuyo:
Kevin a veces deja archivos en el árbol mientras trabajas (dos fotos entraron
así en un commit ajeno). Luego:

```bash
git diff --cached --name-only | grep -Ei '^docs/privado/|\.env|\.(pem|key|csv|xlsx?|ods)$'
git diff --cached -- src | grep -Ei 'token|secret|password|api[_-]?key|BEGIN .*PRIVATE'
```

Si cualquiera imprime algo, para y míralo.

## Estructura

Next.js 16 (App Router), TypeScript, React Compiler. Rutas en `src/app/`.
**No crees una carpeta `app/` en la raíz**: Next dejaría de ver `src/app`.

```
src/app/          layout.tsx (fuentes, metadatos base, cabecera y pie)
                  globals.css (paleta, sistema de diseño, cabecera, menú, pie)
                  page.tsx + inicio.module.css (portada)
                  nuestros-servicios/ · zonas-de-servicio/ · quienes-somos/
                  preguntas-frecuentes/ · contacto/ · trabaja-con-nosotros/
                  aviso-legal/ · politica-de-privacidad/ · politica-de-cookies/
                  instalar/ (oculta, con su app.webmanifest)
                  not-found.tsx · sitemap.ts · robots.ts · manifest.ts
                  icon.png (pestaña: la casa y la corona) · apple-icon.png (el logo)
src/componentes/  Cabecera · Navegacion (menú del móvil) · Pie · BarraContacto
                  CabeceraPagina (arranque de cada página) · Contacto (cierre)
                  Presupuesto · Candidatura (formularios por correo)
                  PiezasFormulario · Formulario.module.css · useFormularioCorreo
                  Opiniones · Galeria · useCarrusel · MapaZonas
                  TextoLegal · DatosEstructurados (JSON-LD) · Marca
src/datos/        negocio.ts (datos del negocio, servicios, zonas, opiniones)
                  preguntas.ts · fotos.ts · navegacion.ts · sitio.ts
                  formularios.ts (lo que comparten formularios y acciones)
src/acciones/     acciones de servidor: presupuesto · candidatura
                  correo.ts (antispam, contacto y envío por SMTP)
src/imagenes/     fotos (se importan, nunca desde public/)
public/           logo.jpg (sin teléfono) · opengraph-image.jpg · sw.js (sólo /instalar)
                  icono-192.png · icono-512.png (logo, para el manifest)
docs/             sitio-actual.md (la web vieja) · dominio.md
docs/privado/     fuera de git
```

**Todo dato del negocio sale de `src/datos/negocio.ts`**: teléfono, correo,
horario, redes, servicios, zonas y opiniones. Nunca a mano en un componente.

### Página nueva

- **Metadatos con `metadatosPagina()`** de `sitio.ts`, nunca un `openGraph` a
  mano: Next mezcla layout y página sólo en el primer nivel, y la página se
  quedaba sin imagen al compartirla.
- **Empieza con `<CabeceraPagina>` y acaba con `<Contacto />`.** No lo llevan
  `/contacto` (se repetiría), las legales (`TextoLegal`) ni
  `/trabaja-con-nosotros` (es para clientes).
- **JSON-LD con `<DatosEstructurados>`**, que escapa el `<`.
- **Estilos en su `.module.css`**, con las piezas de *Sistema de diseño*. Un
  `@keyframes` de `globals.css` no se puede nombrar desde un módulo.
- **Añádela a `src/app/sitemap.ts`** (lista a mano) y, si va en el menú, a
  `src/datos/navegacion.ts` (cabecera, menú del móvil y pie). Si va en el menú
  del móvil, **mide que sigue cabiendo** (ver *Estilo*).

**La URL base va a mano en `src/datos/sitio.ts`** (`dominioPublico`), y de ella
salen canonical, imagen para compartir, datos estructurados, sitemap y robots.
**No la saques de `VERCEL_PROJECT_PRODUCTION_URL`**: con el `.net` añadido en
Vercel pero aún en Webador, la web mandaba a URLs de Webador que daban 404.
Es `www.limpiezaselimperio.es` desde el 17 sept 2026.

## Comprobar antes de dar nada por bueno

`npm run build` y `npx eslint src` sin errores es lo mínimo, no la prueba.

- **Mirarlo**: `npx next start -p 3100` y Chrome sin cabeza con
  `--remote-debugging-port`, manejado por el protocolo DevTools desde Node
  (capturas, clics, medidas). Los scripts no se guardan en el repositorio: se
  rehacen rápido.
- **Anchos**: 375 y 390 (móvil), 820 (tablet), 1280 (escritorio). Casi todos
  los fallos salían sólo en uno.
- **Alturas de móvil reales**, con las barras de Safari: **375×548** y
  **390×664**, no sólo la pantalla entera. El menú cabía en 375×667 y en un
  iPhone pequeño no.
- **Siempre**: sin desplazamiento horizontal, sin imágenes rotas, y que la
  barra de contacto no tape lo importante.
- **El desplazamiento horizontal se mide sin el `overflow-x: clip` del body**
  (`document.body.style.overflowX = 'visible'` y luego `scrollWidth >
  innerWidth`), **también a 320 px** y con estados abiertos (menú, visor,
  presupuesto por WhatsApp). Ese clip lo tapa en Chrome, pero Safari del iPhone
  lo ignora al arrastrar: a 320 px la página se movía de lado por botones largos
  sin partir. Los botones, a menos de 24rem, llevan menos relleno y pueden
  partirse en dos líneas (`globals.css`).
- **Mira quién escucha en el puerto** (`ss -ltnp`) antes de capturar: un
  `next start` viejo servía HTML nuevo con CSS de otra compilación (la página
  sin estilos). Mata el tuyo por su PID, nunca con `pkill -f` (el patrón
  coincide con tu propia orden). **El `next dev` del puerto 3000 es de Kevin:
  no lo toques.**
- **Formularios**: se prueban con `next start` en local, que lee `.env`. Sin
  mandar correo: rellenando el campo trampa (`web`), que responde «enviado»
  sin tocar el SMTP; o con `EMAIL_PASSWORD=falsa` delante, que debe dar el
  error. **Un envío real, sólo con datos marcados «PRUEBA DE LA WEB»** y
  nombres inventados: llega al buzón de Frank. Prueba siempre **un segundo
  intento tras un error** (así salió el fallo del `<form action>`).
- **Lighthouse en móvil** si tocas colores o fotos
  (`npx lighthouse@12 URL --only-categories=performance,accessibility`). Hoy:
  accesibilidad 100, rendimiento 96–99.

## Lo que sabemos del cliente

- **Decide Frank, y Kevin no discute con clientes.** A Frank le gusta el
  color, las tarjetas, lo que se reconoce (WhatsApp en verde) y ver «muchas
  cosas». **Los cambios se hacen directamente en la web**: nada de páginas de
  propuesta, maquetas ni rondas de capturas (se probó y sale más caro).
- **Usa el móvil**, con Safari. Todo tiene que funcionar primero ahí.
- **Si algo no se ve, para él «no funciona».**
- No es técnico. Todo en español.

## Restricciones

- **Antes de escribir código de Next, lee `node_modules/next/dist/docs/`** (ver
  `AGENTS.md`): esta versión no es la que recuerdas. `src/proxy.ts`, no
  `middleware.ts`, si alguna vez hace falta.
- **No añadas páginas ni formularios** sin hablarlo. **Sin redirecciones 301**
  desde la web vieja (decisión de Kevin).
- **Nada de datos inventados**: ni años de experiencia, ni reseñas, ni zonas,
  ni servicios que no salgan de él, de su web, de su ficha de Google o de lo
  que ha decidido Kevin con su contabilidad. **Excepción consciente: las
  descripciones de los servicios**, borrador nuestro marcado en `negocio.ts`.
- **Sin cookies, analítica ni seguimiento.** Comprobado en la web publicada:
  ninguna cookie y ninguna petición a otro dominio. La política de cookies lo
  dice tal cual: **si añades algo de terceros** (analítica, mapa o vídeo
  incrustado, fuente de Google enlazada), **revísala** y, si hace falta, aviso
  de cookies.
- **Dos formularios que llegan por correo: presupuesto y candidatura**
  (decisión de Kevin, 17 sept 2026). Las acciones de servidor (`src/acciones/`)
  los mandan por SMTP desde el buzón de Hostinger (`smtp.hostinger.com:465`) a
  `info@` mismo, con «Responder a» el correo de quien escribe. **No guardan
  nada.** Llevan antispam (campo trampa y un mínimo de 3 s rellenándolo),
  casilla de consentimiento y su párrafo en la política de privacidad. Se
  envían con `onSubmit` y `startTransition` (`useFormularioCorreo`), **no con
  `<form action>`**: React vaciaba el formulario y el segundo intento se
  bloqueaba sin avisar.
- **El presupuesto tiene dos vías**: por correo (la primera, con nombre,
  teléfono y correo) o por WhatsApp (compone el texto y abre WhatsApp, sin
  pasar por el servidor). Mandan el mismo texto. La candidatura lleva WhatsApp
  como segunda vía. **Otro formulario se habla antes.**
- **Legales: lo mínimo y en llano.** No somos abogados; el titular es él.

## Sistema de diseño

**Coherencia antes que novedad.** Todo vive en `globals.css`: si algo se
parece a una de estas piezas, usa la clase, no copies sus valores.

| Pieza | Clase | Cuándo |
|---|---|---|
| Etiqueta en mayúsculas | `.antetitulo` (+ `--claro` sobre azul) | Encima de un título, títulos del pie. Lleva la raya dorada |
| Número de índice | `.numero` (+ `--claro`) | 01, 02… en un círculo |
| Tarjeta | `.tarjeta` | Bloque blanco con esquina grande y sombra |
| Icono en círculo | `.icono-circulo` | Iconos de hechos y ventajas, con el degradado |
| Enlace en un texto | `.enlace` (+ `--claro`) | Dentro de una frase |
| Enlace de acción | `.enlace-flecha` (+ `--claro`) | «Pedir presupuesto», «Ver todos…» |
| Botón principal | `.boton .boton--whatsapp` | Verde, redondeado, con sombra. También sobre azul |
| Botón secundario | `.boton .boton--claro` | Blanco con borde: «Llamar» |
| Formulario por correo | `PiezasFormulario` + `useFormularioCorreo` | Contacto, trampa, aceptar, error y «enviado». Estilos de campos en `Presupuesto.module.css` |

- **Paleta del logo**: `--marino`/`--marino-hondo` (tinta y fondos oscuros),
  `--azul` (acento sobre claro), `--cielo` (sólo degradados y detalles, no pasa
  AA como texto), `--azul-claro` (acento sobre azul), `--azul-velo`, `--fondo`,
  `--linea`, `--texto-suave`, `--degradado`. **`--oro` sólo en estrellas, rayas
  y puntos**, nunca en texto.
- **Verde WhatsApp `#128740`**, algo más oscuro que el de la marca para que el
  texto blanco pase AA. No lo aclares.
- **Tipografías**: Montserrat en títulos, botones y navegación; Nunito Sans en
  texto (`next/font`, servidas desde la propia web). **Nada de serif.**
- **Pesos**: 400 texto; 600–700 enlaces, botones y titulares; 800 sólo en los
  titulares grandes y en la nota de Google.
- **Flechas**: `ArrowRight` si el enlace se queda en la web, `ArrowUpRight` si
  sale. **Iconos** lucide, trazo 2: 16 px en enlaces, 20–22 px en lo demás.
  Lucide no trae logos de marcas: las redes van como texto.
- **Sombras**: sólo `--sombra` (tarjetas) y `--sombra-grande` (al pasar el
  ratón, acordeón abierto, foto de portada). **Esquinas**: `--radio` (12 px) y
  `--radio-grande` (20 px); botones, pastillas y números, redondos del todo.
- **Sobre azul**, sólo `--blanco`, `--texto-sobre-azul`, `--azul-claro` y
  `--linea-sobre-azul`.
- **Dos franjas de color**: «Cómo trabajamos» y el contacto. El resto, blanco y
  azul muy claro.

## Estilo

- **Todo en español**: interfaz, nombres, comentarios y commits. Única
  excepción: los hooks empiezan por `use`.
- **CSS plano**, sin Tailwind ni SASS. Lo común en `globals.css`; lo de cada
  página, en su módulo. **Media queries con rango cerrado** cuando cambia la
  estructura (con sólo `max-width`, lo de tablet se colaba en el móvil).
- **Dirección: luminosa, con color y elevación**, validada por Frank: colores
  del logo, tarjetas blancas con sombra, titulares sans-serif gruesos con la
  palabra clave en azul. **Sin pasarse** (lo pidió Kevin): nada de destellos
  animados, olas ni degradados por todas partes.
- Móvil primero, foco visible, `prefers-reduced-motion` respetado y texto
  alternativo en todas las fotos.
- **Imágenes en AVIF con WebP de respaldo** (`next.config.ts`), y siempre
  `sizes` con el ancho real en cada tramo.
- **Fotos**: reales, en `src/imagenes/` y descritas en `fotos.ts`. **Única
  excepción, la de la portada**: de Unsplash (guante azul con pulverizador),
  porque a Frank no le gustó la suya aspirando y ésta sí. Se acredita discreto
  en el pie (Towfiqu barbhuiya). Nada de fotos de banco con personas: pasarían
  por su personal. **Salen personas del equipo: no se las nombra en el `alt`.**
- **Sin página de galería**: las fotos van en la portada (rejilla en escritorio,
  fila deslizable en el móvil). No van dentro de cada servicio. En la rejilla
  caben **siete fotos y una tarjeta «+N»** con el resto; cualquiera abre el
  **visor** (`<dialog>` a pantalla completa, con todas). Una foto nueva va a
  `ocultas` en `Galeria.tsx`, y el «+N» se cuenta solo.
- **El logo es `public/logo.jpg`** (sin teléfono), y se queda: no hay versión
  vectorial. Sólo en cabecera y pie (pequeño, con el nombre escrito al lado),
  imagen para compartir, datos estructurados e iconos, sacados de él (lo pidió
  Frank): entero en `apple-icon.png` y los `icono-*.png` del manifest; en la
  pestaña (`icon.png`), sólo la casa y la corona, sin el arco ni el texto,
  porque a 16 px el logo entero no se lee.
- **Contacto primero**: WhatsApp es la acción principal, y en el móvil hay una
  barra fija con WhatsApp y Llamar.
- **Portada en el móvil sin botones**: la barra ya es la llamada a la acción.
  Abre con la foto a sangre, titular y la valoración de Google. La altura de la
  foto sale de la pantalla (`100svh - 27rem`) para que la valoración no quede
  tapada: compruébalo en 375×667 si tocas esa portada.
- **Navegación por páginas**, no una página larga. **Sin desplazamiento
  animado** (nada de `scroll-behavior: smooth`, lo pidió Kevin).
- **Cabecera** opaca y blanca, con sombra. Por debajo de 64rem los enlaces se
  cambian por el botón «Menú».
- **Menú del móvil** (`Navegacion.tsx`), a pantalla completa: los enlaces
  (Inicio, los de la cabecera y «Trabaja con nosotros», igual que los demás),
  y abajo WhatsApp y Llamar lado a lado y el correo.
  - **Tiene que caber sin desplazarse** (lo pidió Kevin). Alturas en `svh`, sin
    el horario, y en horizontal en dos columnas sin el correo. **Va justo**: si
    añades algo, mide el panel abierto (`scrollHeight` frente a
    `clientHeight`) en 375×548, 320×568 y 667×375.
  - Tres detalles que costaron un fallo cada uno: `overflow: hidden` sólo en
    `<html>` (en `<body>` la cabecera sticky se iba); **nada de
    `backdrop-filter` ni `transform` en la cabecera** (encierran el panel
    fijo); y `focus({ preventScroll: true })` al cerrar.
- **Carruseles** (opiniones, galería del móvil y visor): scroll nativo con
  `scroll-snap`, sin librerías. **Nunca pasan solos.** Lógica en `useCarrusel`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
