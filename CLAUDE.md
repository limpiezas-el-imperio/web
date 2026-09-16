@AGENTS.md

# CLAUDE.md

Web pública de Limpiezas El Imperio (La Pobla de Vallbona, Valencia). Sustituye
a la que hoy está en Webador, **limpiezaselimperio.net**. De momento es un
rediseño: el mismo negocio y la misma información, con un diseño de 2026, hecho
en Next.js y alojado en Vercel. `README.md` explica el porqué de cada decisión;
esto es la guía operativa.

| | |
|---|---|
| Repositorio | `limpiezas-el-imperio/web` (privado, del cliente). `kevjrmy` es colaborador |
| Vercel | cuenta gratuita del cliente. Aún sin proyecto ni despliegue |
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

**Ojo con el plan Hobby y los repositorios privados.** Hobby no admite
colaboración: en un repositorio privado, un commit cuyo autor no es el dueño
de la cuenta de Vercel se **bloquea** en vez de desplegarse, y los commits de
aquí los firma `kevjrmy`. Arreglos, de mejor a peor:

1. **Hacer público el repositorio**, que es lo que se hizo con la
   contabilidad. Aquí no hay nada que esconder: es una web pública y los datos
   del cliente no entran en git.
2. Pasar la cuenta de Vercel a Pro. Cuesta dinero cada mes.

**No lo arregles firmando los commits como él**: sería suplantarle.

## Qué se puede publicar y qué no

La web es pública, así que casi todo su contenido ya lo es: nombre del titular,
dirección, teléfono y correo están hoy en su propia web y en el aviso legal.

Lo que **no** entra en git:

- **`docs/privado/`**: material que él nos pase y no sea para publicar (fotos
  sin elegir, documentos con su NIF, capturas de sus cuentas, facturas del
  dominio).
- **Nada de la contabilidad.** Ni nombres de clientes o colaboradores, ni
  cifras. Si hace falta un ejemplo, se usan los nombres inventados de siempre
  (ELENA PRADOS, BEATRIZ SOLANO, TOMAS RIVAS…).
- **Las reseñas se publican tal y como estén en su fuente pública**, con el
  nombre que la persona puso allí, y nunca se inventan ni se retocan.

## Estructura

Next.js 16 (App Router), TypeScript, React Compiler activado
(`next.config.ts`). Las rutas van en `src/app/`. **No crees una carpeta `app/` en
la raíz**: Next la tomaría como directorio de rutas y dejaría de ver `src/app`
(pasó en la contabilidad).

```
src/app/        rutas (aún la plantilla de create-next-app)
public/         estáticos (aún los SVG de la plantilla)
docs/           contexto del proyecto (en git)
docs/privado/   material del cliente no publicable (fuera de git)
todo.md         lo pendiente, por fases
```

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
- **CSS plano. Nada de Tailwind ni SASS**, como en la contabilidad.
- **Sin formularios por ahora.** El contacto es WhatsApp, teléfono y correo. Un
  formulario pide servicio de correo, antispam y casilla de privacidad: no se
  añade sin que él lo pida.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
