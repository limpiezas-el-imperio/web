# Dominio

**Estado (16 sept 2026): se va hacia la opción B, apuntar el `.net` a Vercel.**
`www.limpiezaselimperio.net` ya está añadido al proyecto de Vercel, pero sus
DNS siguen en Webador: el dominio todavía sirve la web vieja.

Kevin dejó en `.env` (fuera de git) lo que pide Vercel. No son secretos:

| | |
|---|---|
| Nameservers de Vercel | `ns1.vercel-dns.com` · `ns2.vercel-dns.com` |
| Registro A para `@` | `216.198.79.1` |
| Correo de la cuenta de Vercel | `info@limpiezaselimperio.net` |

## Cómo está hoy (consultado con `dig` el 16 sept 2026)

| Registro | Valor | Qué es |
|---|---|---|
| NS | `ns1.openprovider.nl` · `ns2.openprovider.be` · `ns3.openprovider.eu` | Openprovider, el registrador que usa Webador |
| A `@` | `35.204.150.5` | Webador |
| `www` | CNAME `website-rendering.webador.com` | Webador |
| **MX** | **`0 mail.webador.com`** | **El correo lo da Webador** |
| TXT | `v=spf1 include:_spf.webador.com ~all` | SPF del correo de Webador |

## ⚠️ El correo es lo que no se puede romper

**`info@limpiezaselimperio.net` vive en Webador** (MX a `mail.webador.com`).
Y **ese mismo correo es el de su cuenta de Vercel**: si el correo deja de
llegar, él pierde también la forma de recuperar Vercel, de recibir avisos y de
verificar nada.

Dos maneras de romperlo sin darse cuenta:

1. **Cambiar los nameservers a Vercel.** La zona pasa entera a Vercel y en
   Vercel no hay ningún MX ni SPF: el correo deja de llegar en cuanto el cambio
   se propaga, que puede ser en minutos o en horas. Sin error, simplemente no
   llega nada.
2. **Dar de baja el plan de Webador** con la web ya en Vercel. Sin confirmar si
   el buzón sobrevive sin la web; hay que preguntarlo a Webador **antes**.

## Cómo hacerlo (recomendado)

**No cambiar los nameservers. Cambiar sólo los registros de la web, en el
panel de DNS de Webador**, y dejar MX y TXT como están:

| Registro | Antes | Después |
|---|---|---|
| A `@` | `35.204.150.5` | `216.198.79.1` |
| `www` | CNAME Webador | CNAME al valor que dé Vercel en *Settings → Domains* (hoy suele ser `cname.vercel-dns.com`; copiar el de su panel) |
| MX | `mail.webador.com` | **sin tocar** |
| TXT SPF | Webador | **sin tocar** |

Así la web pasa a Vercel y el correo sigue en Webador.

**Falta comprobar** que el panel de Webador deja editar registros sueltos para
un dominio registrado con ellos. Si no deja y **no queda más remedio que
cambiar los nameservers**, antes de cambiarlos:

1. Crear en el DNS de Vercel **el MX** (`0 mail.webador.com`) y **el TXT de
   SPF** tal cual.
2. Preguntar a Webador si hay DKIM u otros registros del correo que no se ven
   con `dig` y copiarlos también.
3. Cambiar los nameservers.
4. Mandar un correo a `info@` desde fuera y comprobar que llega.

## Después del cambio

- `dig +short limpiezaselimperio.net A` → `216.198.79.1`
- `dig +short limpiezaselimperio.net MX` → **sigue** `0 mail.webador.com`
- Vercel marca el dominio como válido y emite el certificado.
- Un correo de prueba a `info@` llega.
- **Cambiar `dominioPublico` en `src/datos/sitio.ts`** a
  `www.limpiezaselimperio.net` (o al que quede como principal), sólo cuando
  `curl` confirme que el dominio sirve esta web. Ver `CLAUDE.md`.
- Las rutas viejas de Webador que no existen aquí darán 404: decidido así, sin
  redirecciones.
- Actualizar el enlace en Google Business Profile y en las redes.

## Opción A — comprar `limpiezaselimperio.com` en Vercel

Queda como alternativa. Se compra desde su cuenta de Vercel y no hay que tocar
DNS de nadie, así que **no pone en riesgo el correo**. El `.net` seguiría en
Webador con la web vieja mientras se decide qué hacer con él. Antes de
comprar, comprobar que el `.com` está libre.
