# Limpiezas El Imperio — web

Web pública de Limpiezas El Imperio, empresa de limpieza de La Pobla de
Vallbona (Valencia). Sustituye a **limpiezaselimperio.net**, hecha en Webador.

Este archivo explica **por qué** cada cosa es como es. `CLAUDE.md` es la guía
operativa y `todo.md` lo que falta.

## Por qué se rehace

La web actual cumple, pero se le notan los límites de la herramienta y del
tiempo (inventario completo en `docs/sitio-actual.md`):

- **La portada no dice nada.** Una imagen y el bloque de contacto: ni qué hace,
  ni dónde, ni cómo pedirlo.
- **Plan básico de Webador**: su marca en el pie y una tienda activada sin
  productos (carrito y lista de deseos en el menú).
- **Diez entradas de menú sin agrupar**, con páginas duplicadas.
- **Formularios que espantan**: el presupuesto pide DNI y «firma»; la
  facturación, escalera y letra, todo obligatorio. Ninguno pide aceptar la
  política de privacidad.
- **Textos legales copiados de otras empresas**, con sus nombres dentro.
- **SEO casi nulo**: el título de casi todas las páginas es sólo el nombre, sin
  servicio ni localidad, y ninguna imagen tiene texto alternativo.

## Por qué Next.js y Vercel

Es la misma pila que su contabilidad (`limpiezas-imperio.vercel.app`) y la misma
cuenta de Vercel: una sola cosa que mantener y que él ya conoce. La web es casi
toda estática y en el plan gratuito sobra.

## El dominio

Ver `docs/dominio.md`.

## Contenido

Todo el contenido sale de él o de su web actual. Nada inventado: donde la web
actual se contradice, se le pregunta.
