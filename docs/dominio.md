# Dominio

**Estado (16 sept 2026): sin decidir.**

Hoy: `limpiezaselimperio.net` sirve la web de Webador, y **el dominio está
registrado y alojado en Webador** (confirmado con Kevin). No hay registrador
aparte.

## Opción A — comprar `limpiezaselimperio.com` en Vercel (la preferida)

Él lo compra desde su cuenta de Vercel y queda asignado al proyecto sin tocar
DNS. El `.net` sigue en Webador mientras tanto, así que **no hay corte**: la web
nueva vive en el `.com` desde el primer día.

Queda pendiente qué hacer luego con el `.net`:

- Redirigirlo al `.com` (lo ideal: no se pierden enlaces ni posicionamiento).
  Depende de lo que permita Webador o de dónde esté registrado.
- Dejarlo caducar. Se pierde lo indexado y cualquier tarjeta, furgoneta o perfil
  que lo lleve impreso.

Antes de comprar, comprobar que el `.com` está libre.

## Opción B — apuntar el `.net` a Vercel

Si no compra el `.com`. Hay que cambiar los DNS del `.net` hacia Vercel. Como
está registrado en Webador, queda por comprobar en su panel (sin verificar):

- si Webador deja editar registros DNS sueltos (A / CNAME hacia Vercel), o
- si da el código de autorización para transferir el dominio fuera.

## Lo que no se puede olvidar en cualquiera de las dos

- **El correo `info@limpiezaselimperio.net`.** Si ese buzón lo da Webador o el
  registrador, cambiar los DNS a lo loco (sobre todo los MX, o los
  nameservers enteros) **le corta el correo**. Averiguar dónde vive el buzón
  antes de tocar nada.
- Actualizar el enlace en Google Business Profile y en las redes.
