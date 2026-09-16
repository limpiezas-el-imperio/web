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
| Dominio | Ver `docs/dominio.md`. Sin decidir: `.com` comprado en Vercel, o apuntar el `.net` actual |
| Web actual | https://limpiezaselimperio.net (Webador). Inventario en `docs/sitio-actual.md` |
| Pendiente | `todo.md` |

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
  cifras. Si hace falta un ejemplo, se usan los nombres inventados de siempre
  (ELENA PRADOS, BEATRIZ SOLANO, TOMAS RIVAS…).
- **Las reseñas se publican tal y como estén en su fuente pública**, con el
  nombre que la persona puso allí, y nunca se inventan ni se retocan.

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
src/app/          layout.tsx (fuentes, metadatos, cabecera y pie)
                  page.tsx + inicio.module.css (la portada)
                  globals.css (paleta, botones, cabecera, pie)
                  icon.svg · apple-icon.png · opengraph-image.jpg
src/componentes/  Cabecera · Pie · BarraContacto (sólo móvil)
                  Marca (el nombre escrito) · Destello (la estrella del logo)
src/datos/        negocio.ts (todos los datos del negocio) · sitio.ts (URL base)
public/           el logo, tal cual venía de su web
docs/             contexto del proyecto (en git)
docs/privado/     material del cliente no publicable (fuera de git)
todo.md           lo pendiente, por fases
```

**Todo dato del negocio sale de `src/datos/negocio.ts`**: teléfono, correo,
horario, redes, servicios, zonas y opiniones. La portada, la cabecera, el pie y
los datos estructurados leen de ahí. No escribas un teléfono ni un horario a
mano en un componente: el día que cambie, se quedaría el viejo.

**La URL base sale de `VERCEL_PROJECT_PRODUCTION_URL`** (`src/datos/sitio.ts`),
que Vercel pone solo. Hoy es el `.vercel.app`; el día que se conecte el dominio
propio, el canonical y las imágenes de Open Graph cambian sin tocar código.

## Arrancar en local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # compruébalo antes de dar nada por bueno
```

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
- **Las URLs actuales no se pueden perder sin más.** La web de Webador tiene
  páginas indexadas (`/nuestros-servicios`, `/solicitar-presupuesto`,
  `/zonas-de-servicio`…). Si una página desaparece o cambia de ruta, lleva su
  redirección permanente. La lista está en `docs/sitio-actual.md`.
- **Nada de datos inventados.** Ni años de experiencia, ni número de reseñas,
  ni zonas, ni servicios que no salgan de él o de su web. La web actual se
  contradice en varias cosas (dos listas de zonas, 4,9 frente a 4,78); se le
  pregunta, no se elige.

## Estilo

- **Toda la interfaz y todo el código —nombres, comentarios, commits— en
  español.**
- Responsive con el móvil primero, foco visible, `prefers-reduced-motion`
  respetado, textos alternativos en todas las imágenes (hoy no hay ni uno).
- **CSS plano. Nada de Tailwind ni SASS**, como en la contabilidad. Lo común
  en `globals.css`; lo de cada página, en su `.module.css`.
- **Paleta del logo**: azul marino, azul vivo y dorado, en variables de
  `globals.css`. El dorado de texto sobre fondo claro es `--oro-texto`, no
  `--oro`: el otro no llega al contraste AA.
- Fraunces para títulos, Figtree para texto, con `next/font`.
- Iconos de `lucide-react`. Lucide ya no trae logos de marcas: las redes van
  como texto.
- **El logo no va en la cabecera**: lleva el teléfono dentro y a ese tamaño no
  se lee. La marca va escrita (`Marca.tsx`) y el logo se usa como imagen para
  compartir.
- **Contacto primero**: el WhatsApp es la acción principal en toda la web, y en
  el móvil hay una barra fija con WhatsApp y Llamar.
- **Sin formularios por ahora.** El contacto es WhatsApp, teléfono y correo. Un
  formulario pide servicio de correo, antispam y casilla de privacidad: no se
  añade sin que él lo pida.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
