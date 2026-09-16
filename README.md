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
cuenta de Vercel: una sola cosa que mantener y que él ya conoce. La web es
estática (todas las páginas se generan al compilar) y en el plan gratuito
sobra.

## Decisiones que ya están tomadas, y por qué

- **Un repositorio público.** En el plan gratuito de Vercel, un repositorio
  privado bloquea los despliegues de commits que no son del dueño de la
  cuenta. Público, cada push despliega solo. A cambio, nada privado entra en
  git (ver `CLAUDE.md`).
- **Sin formularios.** El contacto es WhatsApp, teléfono y correo, que es como
  trabaja él. Un formulario pide servicio de correo, antispam y
  consentimiento, y los de su web vieja pedían DNI sin nada de eso. Para pedir
  presupuesto o mandar una candidatura hay pasos guiados que sólo escriben el
  mensaje y abren WhatsApp o el correo: no mandan nada a ningún servidor.
- **Sin redirecciones.** Las rutas buenas de la web vieja se conservan y las
  malas se renombran (`docs/sitio-actual.md`, *Decisión por página*). Quien
  llegue con una dirección vieja ve una 404 que se lo explica.
- **Diseño con color y elevación.** Se hizo primero una versión editorial y
  sobria; a Frank le pareció plana y sin color, y se rehízo con los colores de
  su logo, tarjetas con sombra, titulares en sans-serif gruesa y botones verdes
  de WhatsApp, sin pasarse. Frank la validó. Todo va en un sistema común
  (`CLAUDE.md`, *Sistema de diseño*).
- **Fotos reales como prueba.** Las de su web vieja eran generadas con IA. Las
  reales van en una galería, no emparejadas a la fuerza con cada servicio. La
  única que no es suya es la de la portada, de Unsplash y acreditada, porque la
  suya no le gustó.
- **Opiniones de Google, no inventadas ni retocadas.** Extractos literales,
  sin los nombres de su personal.
- **Una portada distinta en el móvil.** Allí la barra fija de WhatsApp y
  Llamar ya es la llamada a la acción, así que la portada abre con la foto y
  la valoración de Google en vez de repetir botones.
- **Sin cookies, analítica ni seguimiento.** Tipografías e imágenes se sirven
  desde la propia web, así que no hace falta aviso de cookies.

## El dominio

Ver `docs/dominio.md`. El correo `info@` vive en Webador y se perdería si se
borra la cuenta: la cuenta se queda.

## Contenido

Todo el contenido sale de él, de su web vieja o de su ficha de Google. Donde
su web vieja se contradecía o no se correspondía con cómo trabaja de verdad
(zonas, servicios, forma de cobro), decidió Kevin con lo que enseña su
contabilidad, que se lee para entender el negocio y nunca entra en este
repositorio. Las descripciones de los servicios son un borrador nuestro,
pendiente de que Frank las revise.
