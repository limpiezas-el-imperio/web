@AGENTS.md

# CLAUDE.md

Web pública de Limpiezas El Imperio (La Pobla de Vallbona, Valencia). Sustituye
a la que hoy está en Webador, **limpiezaselimperio.net**. De momento es un
rediseño: el mismo negocio y la misma información, con un diseño de 2026, hecho
en Next.js y alojado en Vercel. `README.md` explica el porqué de cada decisión;
esto es la guía operativa.

| | |
|---|---|
| Repositorio | `limpiezas-el-imperio/web` (**público**, del cliente). `kevjrmy` es colaborador |
| Producción | https://limpiezaselimperio.vercel.app |
| Vercel | proyecto `web` en la cuenta gratuita del cliente, enlazado al repositorio |
| Dominio | `www.limpiezaselimperio.net` añadido en Vercel, **DNS aún en Webador**: sirve la web vieja. Plan y riesgo del correo en `docs/dominio.md` |
| Web actual | https://limpiezaselimperio.net (Webador). Inventario en `docs/sitio-actual.md` |
| Pendiente | `todo.md` (con *Por dónde seguir* arriba del todo) |

## Estado (16 sept 2026, cierre de la primera sesión)

**En producción** (sólo en el `.vercel.app`, todavía sin dominio):

| Ruta | Estado |
|---|---|
| `/` | Hecha: portada editorial, galería, mapa de zonas, opiniones de Google |
| `/nuestros-servicios` | Hecha, **con descripciones en borrador** pendientes de Frank |
| `/preguntas-frecuentes` | Hecha |
| `/quienes-somos`, `/trabaja-con-nosotros`, `/contacto` | Por hacer |
| `/zonas-de-servicio` | Por hacer; espera a que él diga cuál de sus dos listas vale |
| `/aviso-legal`, `/politica-de-privacidad`, `/politica-de-cookies` | Por hacer; esperan su NIF |

**Frank vio la primera versión (16 sept 2026) y no le gustó el diseño**:
plana, sin color, poco de limpieza. Se rehízo con color y elevación (ver
*Estilo*). Las demás preguntas para él siguen en `todo.md`.

**Mismo cliente que `../limpiezas-imperio-software/`** (la contabilidad, en
https://limpiezas-imperio.vercel.app). Son proyectos separados: esta web no lee
ni escribe en esa base de datos, y no debe hacerlo. Lo que sí vale de allí es lo
aprendido sobre él y sobre su cuenta de Vercel; ver *Lo que ya sabemos del
cliente*.

## Git

**Se trabaja siempre sobre `main`. Sin ramas**: commit directo a `main` y push a
`origin`. Mismo criterio que en la contabilidad.

`origin` es `git@github.com:limpiezas-el-imperio/web.git`, un solo destino de
push. Vercel desplegará desde ahí.

## Despliegue

**Objetivo: `git push` desde aquí y Vercel despliega solo**, sin entrar en su
GitHub ni en su Vercel. Eso es la integración de Git de Vercel: el proyecto de
su cuenta enlazado al repositorio, y cada push a `main` es un despliegue de
producción.

**Funciona porque el repositorio es público.** En el plan Hobby, un
repositorio privado bloquea los despliegues de commits cuyo autor no es el
dueño de la cuenta, y los de aquí los firma `kevjrmy`. Por eso se hizo público
(16 sept 2026), igual que la contabilidad. **No lo vuelvas privado** sin pasar
antes la cuenta a Pro, o los despliegues se quedarán en «Blocked».

**No lo arregles firmando los commits como él**: sería suplantarle.

## Qué se puede publicar y qué no

**El repositorio es público: todo lo que entra en git lo puede leer cualquiera,
para siempre.** Borrarlo en un commit posterior no sirve; queda en el historial.

La web también es pública, así que casi todo su contenido ya lo es: nombre del
titular, dirección, teléfono y correo están hoy en su propia web y en el aviso
legal. Ese es el listón: **si no está ya publicado por él, no entra.**

Lo que **no** entra en git:

- **Secretos**: tokens, claves, `.env*` (el `.gitignore` los excluye), IDs o
  capturas de sus cuentas de Vercel, GitHub, Webador o Google.
- **Su NIF**, aunque haga falta en el aviso legal, hasta que él lo publique en
  la web. Mientras tanto va en `docs/privado/`.
- **`docs/privado/`**: material que él nos pase y no sea para publicar (fotos
  sin elegir, documentos con su NIF, capturas de sus cuentas, facturas del
  dominio).
- **Nada de la contabilidad.** Ni nombres de clientes o colaboradores, ni
  cifras. Sirve para entender el negocio, no como fuente de contenido. Si hace falta un ejemplo, se usan los nombres inventados de siempre
  (ELENA PRADOS, BEATRIZ SOLANO, TOMAS RIVAS…).

Y lo que sí entra, pero con cuidado:

- **Fotos**: sin EXIF ni GPS (ver *Estilo*).
- **Las opiniones salen de su ficha de Google Maps** y se publican como
  **extractos literales**: donde se corta va «[…]», y no se corrige ni se
  reescribe nada. Autor con nombre e inicial. **Se corta sobre todo para no
  publicar los nombres de su personal**, que varias reseñas mencionan: en
  Google ya están, pero en su web nadie les ha preguntado. Cada una enlaza a
  Google para leerla entera. Detalles en `src/datos/negocio.ts`.
- **La nota y el total de Google (4,9 · 68) van escritos a mano** con la fecha
  en que se comprobaron. Cambian: revísalos de vez en cuando. Para leerlos,
  Google Maps no se deja con un fetch (muro de cookies y todo por JavaScript):
  hace falta un Chrome sin cabeza que rechace las cookies y abra la pestaña
  Reseñas. Sin iniciar sesión sólo enseña cinco.

Antes de cualquier commit, mira lo que entra:

```bash
git diff --cached --name-only | grep -Ei '^docs/privado/|\.env|\.(pem|key|csv|xlsx?|ods)$'
git diff --cached | grep -Ei 'token|secret|password|api[_-]?key|BEGIN .*PRIVATE'
```

Si cualquiera de las dos imprime algo, para y míralo.

## Estructura

Next.js 16 (App Router), TypeScript, React Compiler activado
(`next.config.ts`). Las rutas van en `src/app/`. **No crees una carpeta `app/` en
la raíz**: Next la tomaría como directorio de rutas y dejaría de ver `src/app`
(pasó en la contabilidad).

```
src/app/          layout.tsx (fuentes, metadatos base, cabecera y pie)
                  page.tsx + inicio.module.css (la portada)
                  nuestros-servicios/ (page.tsx + servicios.module.css)
                  preguntas-frecuentes/ (page.tsx + su módulo)
                  globals.css (paleta, sistema de diseño, cabecera, menú, pie)
                  icon.svg · apple-icon.png
src/componentes/  Cabecera · Navegacion (enlaces y menú del móvil, cliente)
                  Pie · BarraContacto (sólo móvil)
                  CabeceraPagina (titular con que empieza cada página)
                  Contacto (el cierre de cada página)
                  DatosEstructurados (JSON-LD)
                  Marca (logo + nombre)
                  Opiniones (carrusel de reseñas; cliente)
                  Galeria (fotos: rejilla o fila deslizable; cliente)
                  useCarrusel (lo común de los dos carruseles)
                  MapaZonas (esquema SVG con coordenadas reales)
src/imagenes/     fotos reales de sus trabajos (se importan, no se enlazan)
src/datos/        negocio.ts (datos del negocio) · preguntas.ts (la FAQ)
                  fotos.ts (cada foto con su alt y su pie)
                  navegacion.ts (los enlaces del menú y del pie)
                  sitio.ts (URL base y metadatosPagina)
public/           logo.jpg (sin teléfono) · opengraph-image.jpg (sale del logo)
docs/             contexto del proyecto (en git)
docs/privado/     material del cliente no publicable (fuera de git)
todo.md           lo pendiente, por fases
```

**Todo dato del negocio sale de `src/datos/negocio.ts`**: teléfono, correo,
horario, redes, servicios, zonas y opiniones. La portada, la cabecera, el pie y
los datos estructurados leen de ahí. No escribas un teléfono ni un horario a
mano en un componente: el día que cambie, se quedaría el viejo.

### Cómo se hace una página nueva

Copia `preguntas-frecuentes/` o `nuestros-servicios/`, que son las plantillas
(índice lateral en escritorio, bloques con número y regla):

- **Metadatos con `metadatosPagina()`** de `sitio.ts`, nunca un `openGraph` a
  mano. Next mezcla layout y página sólo en el primer nivel: un `openGraph` en
  la página borra entero el del layout, imagen incluida. Pasó con esta misma
  página y se quedó sin imagen al compartirla. La imagen está en `public/` por
  eso, y no como `opengraph-image.jpg` en `src/app`.
- **Empieza con `<CabeceraPagina>`** y **acaba con `<Contacto />`**. El enlace
  «Contacto» de la cabecera va a `#contacto` de la página en la que estés: si
  una página no lo lleva, ese enlace no hace nada.
- **JSON-LD con `<DatosEstructurados>`**, que escapa el `<`.
- **Usa las piezas del *Sistema de diseño*** (etiqueta, número, enlaces,
  botones) antes de escribir estilos propios.
- **Los estilos de la página en su `.module.css`.** Ojo con `@keyframes` en un
  módulo: Next renombra la animación dentro del módulo, así que una animación
  definida en `globals.css` no se puede nombrar desde un módulo.
- **Añádela a `src/datos/navegacion.ts`**: de ahí salen la cabecera, el menú
  del móvil y el pie. Si sustituye a una sección de la portada (hoy Zonas y
  Opiniones van a `/#zonas` y `/#opiniones`), cambia ese `href` a la ruta
  nueva.

**La URL base va escrita a mano en `src/datos/sitio.ts`** (`dominioPublico`),
y de ella salen el canonical, la imagen para compartir y los datos
estructurados. **No la saques de `VERCEL_PROJECT_PRODUCTION_URL`**: se hizo así
y en cuanto se añadió `www.limpiezaselimperio.net` al proyecto de Vercel —con
los DNS todavía en Webador— la web publicada empezó a mandar a Google y a
WhatsApp a URLs de Webador que daban 404. **Se cambia a mano el día que el
dominio propio sirva esta web**, comprobado con `curl`, y no antes.

## Arrancar en local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # compruébalo antes de dar nada por bueno
```

## Comprobar antes de dar nada por bueno

`npm run build` y `npx eslint src` sin errores es lo mínimo, no la prueba. Lo
que se ha hecho con cada cambio, y conviene seguir haciendo:

- **Mirarlo**, no suponerlo: `npx next start` y capturas con Chrome sin cabeza
  (`google-chrome --headless=new --screenshot=… --window-size=…`). Para probar
  interacción (menú, carruseles, anclas) se abre Chrome con
  `--remote-debugging-port` y se maneja por el protocolo DevTools desde un
  script de Node; `Page.captureScreenshot` con `captureBeyondViewport` saca la
  página entera. Los scripts de la primera sesión no se guardaron: se rehacen
  en diez minutos.
- **Anchos**: 390 (móvil), **375×667** (móvil bajo), 820 (tablet) y 1280
  (escritorio). Casi todos los fallos de esta sesión sólo salían en uno.
- **Siempre**: que la página no se desplace en horizontal
  (`scrollWidth > innerWidth`), que no haya imágenes rotas, y en el móvil que
  la barra de contacto no tape lo importante.
- **Después del push**, que el despliegue quede en `success` (ver abajo) y
  mirar la URL publicada con `curl`.

## Lo que ya sabemos del cliente

Aprendido en la contabilidad, y aplica aquí:

- **Usa el móvil**, y en Safari. Todo tiene que funcionar primero ahí.
- **Si algo no se ve, para él «no funciona».** Un formulario que envía sin
  confirmarlo en pantalla es un formulario roto.
- **En Vercel, un despliegue fallido no avisa**: se sigue sirviendo el anterior
  con un 200. Comprueba que el despliegue quedó en `Ready`. Si el proyecto no es
  alcanzable desde el CLI de aquí, el commit status del repositorio lo dice:

  ```bash
  gh api repos/limpiezas-el-imperio/web/commits/<sha>/status \
    --jq '.statuses[] | "\(.context): \(.state) — \(.description)"'
  ```

- **Variables de entorno en el panel de Vercel, sin comillas.** Un valor pegado
  desde un `.env` con sus comillas deja de coincidir con nada.
- **`src/proxy.ts`, no `middleware.ts`**, si alguna vez hace falta. Next 16
  renombró la convención.

## Restricciones

- **Antes de escribir código de Next, lee la guía en
  `node_modules/next/dist/docs/`** (ver `AGENTS.md`). Esta versión no es la que
  recuerdas.
- **El mapa de la web está decidido** en `docs/sitio-actual.md`, *Decisión por
  página*. Las rutas buenas de la web vieja se conservan y las malas se
  renombran, **sin redirecciones 301**: decisión de Kevin. No añadas páginas ni
  formularios fuera de esa tabla sin hablarlo.
- **Nada de datos inventados.** Ni años de experiencia, ni número de reseñas,
  ni zonas, ni servicios que no salgan de él, de su web o de su ficha de
  Google. Donde su web se contradice (dos listas de zonas) se le pregunta, no
  se elige; mientras, va lo que está en las dos. **Única excepción consciente:
  las descripciones de los servicios**, escritas por nosotros como borrador y
  marcadas como tal en `negocio.ts` y en `todo.md`.

## Sistema de diseño

**Coherencia antes que novedad.** Todo lo de abajo vive en `globals.css`. Si
algo que vas a hacer se parece a una de estas piezas, usa la clase; no copies
sus valores en un módulo. Se hizo una auditoría (sept 2026) porque habían
aparecido seis versiones de la etiqueta en mayúsculas, ocho de enlace y dos de
numeración.

| Pieza | Clase | Cuándo |
|---|---|---|
| Etiqueta en mayúsculas | `.antetitulo` (+ `--claro` sobre azul) | Encima de un título, títulos del pie, «Áreas», «En esta página». Lleva la raya dorada delante |
| Número de índice | `.numero` (+ `--claro`) | 01, 02… en un círculo: servicios, pasos, preguntas |
| Tarjeta | `.tarjeta` | Bloque blanco con esquina grande y sombra |
| Icono en círculo | `.icono-circulo` | Iconos de hechos y ventajas, con el degradado |
| Enlace en un texto | `.enlace` (+ `--claro`) | Dentro de una frase |
| Enlace de acción | `.enlace-flecha` (+ `--claro`) | «Pedir presupuesto», «Ver todos…» |
| Botón principal | `.boton .boton--whatsapp` | Verde WhatsApp, redondeado, con sombra. También sobre azul |
| Botón secundario | `.boton .boton--claro` | Blanco con borde: «Llamar», en la barra y en el menú |

Reglas:

- **Pesos:** 400 para texto; 600–700 para enlaces, navegación, botones,
  nombres y titulares; **800 sólo** en los titulares grandes (portada, cabecera
  de página, contacto) y en la nota de Google.
- **Flechas:** `ArrowRight` (→) si el enlace se queda en la web;
  `ArrowUpRight` (↗) si sale de ella (WhatsApp, Google, llamar).
- **Iconos:** lucide, trazo 2 (lo pone `globals.css`; las estrellas rellenas
  no). 16 px dentro de enlaces, 20–22 px en todo lo demás.
- **Elevación con sombra, no con bordes:** `--sombra` para tarjetas,
  `--sombra-grande` al pasar el ratón, en un acordeón abierto y en la foto de
  la portada. Sólo esas dos: no inventes sombras nuevas.
- **Esquinas:** `--radio` (12 px) en lo pequeño, `--radio-grande` (20 px) en
  tarjetas y fotos; botones, pastillas y números, redondos del todo.
- **Sobre azul**, sólo `--blanco`, `--texto-sobre-azul`, `--azul-claro` y
  `--linea-sobre-azul`.
- **Dos franjas de color, no más:** «Cómo trabajamos» y el contacto, con
  `--degradado`. El resto, blanco y azul muy claro (`--fondo`, `--azul-velo`).

## Estilo

- **Toda la interfaz y todo el código —nombres, comentarios, commits— en
  español.** Única excepción: los hooks empiezan por `use` (`useCarrusel`),
  porque React y su linter sólo los reconocen así.
- **Media queries con rango cerrado** cuando una maquetación cambia de
  estructura (`min-width … and max-width …`). Con sólo `max-width`, las reglas
  de tablet de la galería se colaban en el móvil y la fila deslizable se
  partía en dos líneas.
- **Dirección: luminosa, con color y elevación** (16 sept 2026). La primera
  versión, editorial y sobria (serif, reglas finas, sin sombras, sin dorado),
  **se la enseñamos a Frank y no le gustó**: «demasiado plana», «sin color»,
  «no parece de limpieza», «pocas cosas». Kevin decidió no discutirlo y
  cambiarla directamente. **No vuelvas a la sobria.** Lo que la define:
  - **Los colores de su logo:** azul cielo, marino y el oro de las estrellas.
    Fondos blancos y azul muy claro.
  - **Tarjetas blancas con sombra suave** y esquinas redondeadas; botones y
    pastillas redondos del todo.
  - **Sans-serif gruesa en los titulares**, con la palabra clave en azul vivo.
  - **Sin pasarse** (lo pidió Kevin): nada de destellos animados, olas,
    brillos ni degradados en todas partes. Si dudas, menos.
  - Las fotos reales llevan el peso en la galería. La portada lleva, de
    momento, una foto provisional de Unsplash (ver *Fotos*).
- Responsive con el móvil primero, foco visible, `prefers-reduced-motion`
  respetado (también en los carruseles) y texto alternativo descriptivo en
  todas las fotos (`fotos.ts`).
- **CSS plano. Nada de Tailwind ni SASS**, como en la contabilidad. Lo común
  en `globals.css`; lo de cada página, en su `.module.css`.
- **Paleta del logo.** Variables en `globals.css`: `--marino` y
  `--marino-hondo` para tinta y fondos oscuros, `--azul` de acento sobre claro
  (enlaces, números, iconos), `--cielo` sólo en degradados y detalles (no
  pasa AA como texto), `--azul-claro` de acento sobre azul, `--azul-velo`,
  `--fondo`, `--linea`, `--texto-suave`, y `--degradado` para las franjas y los
  iconos. **`--oro` sólo en estrellas, rayas y puntos**, nunca en texto.
- **El botón principal (WhatsApp) es verde** (`--verde`), el que todo el mundo
  reconoce. Sobre las franjas azules también va en verde.
- **Montserrat para títulos, botones y navegación; Nunito Sans para texto**,
  con `next/font`. **Nada de serif.** Sustituyeron a Newsreader y Geist.
- Iconos de `lucide-react`. Lucide ya no trae logos de marcas: las redes van
  como texto.
- **El logo es su marca y se usa, pero sin abusar**: en la cabecera y en el pie
  (`Marca.tsx`, pequeño y con el nombre escrito al lado, porque sus letras a ese
  tamaño no se leen), en la imagen para compartir y en los datos estructurados.
  En ningún sitio más. Es `public/logo.jpg`, la versión **sin teléfono**; las
  que lo llevaban dentro se borraron.
- **Foto de la portada, provisional de Unsplash** (16 sept 2026): la de Frank
  aspirando no le gustó. Kevin pidió una de Unsplash **enlazada, no
  descargada** (`fotoPortada` en `page.tsx`; `images.unsplash.com` está
  permitido en `next.config.ts`). Es la única excepción a la regla de abajo,
  y se cambia por una suya en cuanto la mande. Sin personas: una foto de banco
  con alguien trabajando pasaría por su personal.
- **Fotos reales, nunca de banco ni generadas.** Van en `src/imagenes/` (no en
  `public/`, para que sólo se sirvan optimizadas) y se describen en
  `src/datos/fotos.ts` con su texto alternativo. **Antes de añadir una foto,
  comprueba que no lleva EXIF ni GPS**: son casas de clientes y el repositorio
  es público. Las primeras ocho venían limpias.
- **No hay página de galería**, decidido: con ocho fotos quedaría vacía. Van en
  la portada, en la sección «Galería» (`Galeria.tsx`: rejilla en escritorio y tablet, fila
  deslizable con puntos en el móvil). **Las fotos no van dentro de cada
  servicio**: no hay una para cada uno y emparejarlas a la fuerza no casaba.
  Los servicios son sólo texto.
- **Contacto primero**: el WhatsApp es la acción principal en toda la web, y en
  el móvil hay una barra fija con WhatsApp y Llamar.
- **En el móvil, la portada no lleva botones**: la barra fija ya es la llamada
  a la acción, y con los del titular había cuatro en la primera pantalla. Abre
  con la foto a sangre, titular corto y la valoración de Google (4,9 ·
  68). La altura de la foto sale de la pantalla (`100svh - 27rem`), no de una
  proporción: con la foto cuadrada, en pantallas bajas la valoración quedaba
  tapada por la barra. Compruébalo en 375×667 si tocas esa portada.
- **Se navega por páginas, no por una sola página larga.** Cada tema importante
  tiene la suya; la portada resume y enlaza. Por debajo de 60rem los enlaces de
  la cabecera se sustituyen por el botón «Menú»: no los escondas sin dejar otra
  forma de navegar, que es como estaba al principio y en el móvil no había
  menú ninguno.
- **El menú del móvil es a pantalla completa** (`Navegacion.tsx`), en azul
  muy claro con la cabecera blanca (en azul resultaba demasiado azul): enlaces grandes y,
  abajo, WhatsApp, teléfono, correo y horario. Mientras está abierto
  lo de detrás queda `inert` y sin scroll, y al cerrarlo el foco vuelve al
  botón. Tres detalles que costaron un fallo cada uno, no los deshagas:
  `overflow: hidden` sólo en `<html>` (en `<body>` la cabecera sticky se iba
  con la página), **nada de `backdrop-filter` ni `transform` en la cabecera**
  (convierten la cabecera en el contenedor del panel fijo y lo encierran) y
  `focus({ preventScroll: true })` (sin él, cerrar el menú desplazaba la página
  hacia arriba).
- **La cabecera es opaca y blanca, con sombra en vez de borde, y el logo va sin
  transparencias ni fundidos.** Lo pidió Kevin.
- **Carruseles** (opiniones y galería del móvil): scroll horizontal nativo con
  anclajes (`scroll-snap`), no librerías. Se deslizan con el dedo; flechas y
  puntos sólo los mueven. **Nunca pasan solos.** La lógica común está en
  `useCarrusel`.
- **Sin formularios por ahora.** El contacto es WhatsApp, teléfono y correo. Un
  formulario pide servicio de correo, antispam y casilla de privacidad: no se
  añade sin que él lo pida.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
