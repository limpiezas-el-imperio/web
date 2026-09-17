# Dominio

**Estado (17 sept 2026): la web se sirve en `www.limpiezaselimperio.es`**,
comprado por Frank en Hostinger, **con el correo `info@limpiezaselimperio.es`
también en Hostinger**. El `.net` se queda en Webador con la web vieja y su
correo.

## `limpiezaselimperio.es` (el nuevo)

- **Registrador: Hostinger**, cuenta de Frank (entra con Google). Kevin tiene
  acceso de administrador desde su propia cuenta de Hostinger.
- Hostinger lo marca **«Actif»**, caduca el **11 sept 2029**, con renovación
  automática.
- **Vercel no lo vende**: `.es` no está entre sus dominios
  (`vercel domains price` responde «TLD not supported»). Por eso Hostinger.
- **Correo en Hostinger**: `info@limpiezaselimperio.es`, configurado por Kevin
  el 17 sept 2026. Es el que publica la web.

### Configurado

**En Vercel** (proyecto `web`, *Settings → Domains*, cuenta de Frank; la CLI de
Kevin está en su propia cuenta y no llega):

| Dominio | Papel |
|---|---|
| `www.limpiezaselimperio.es` | **Principal** (Production) |
| `limpiezaselimperio.es` | Redirige con un 308 al `www` |

**En Hostinger** (*DNS / Serveurs de noms*), con los nameservers de Hostinger y
sin sus registros de aparcamiento:

| Tipo | Nombre | Valor |
|---|---|---|
| A | `@` | `216.198.79.1` |
| CNAME | `www` | el que da Vercel para `www` (un `…vercel-dns-017.com`); copiarlo de su panel |
| MX | `@` | `5 mx1.hostinger.com` · `10 mx2.hostinger.com` |
| TXT | `@` | `v=spf1 include:_spf.mail.hostinger.com ~all` |
| CNAME | `hostingermail-a/b/c._domainkey` | `hostingermail-a/b/c.dkim.mail.hostinger.com` (DKIM) |
| TXT | `_dmarc` | `v=DMARC1; p=none` |
| CNAME | `autodiscover` | `autodiscover.mail.hostinger.com` |

**No quites MX, SPF, DKIM ni DMARC** al tocar los registros de la web: el
correo de la web depende de ellos.

Se dejaron los DNS en Hostinger y no se pasaron a Vercel para que Kevin pueda
editarlos con su acceso, sin entrar en la cuenta de Vercel de Frank.

### Lanzamiento (17 sept 2026)

El 16 sept por la noche el registro de `.es` aún respondía NXDOMAIN; al día
siguiente ya publicaba el dominio. Comprobado el 17 sept:

```bash
dig +norec NS limpiezaselimperio.es @a.nic.es   # los NS de Hostinger
dig +short A limpiezaselimperio.es @8.8.8.8     # 216.198.79.1
curl -sI https://www.limpiezaselimperio.es      # 200 servido por Vercel
curl -sI https://limpiezaselimperio.es          # 308 al www
```

Con eso, `dominioPublico` en `src/datos/sitio.ts` pasó a
`www.limpiezaselimperio.es`. Falta que Frank cambie el enlace de la web en su
ficha de Google y en sus redes.

## `limpiezaselimperio.net` (el viejo)

Sigue en **Webador**, con la web vieja. **Ya no está añadido en Vercel.** Su
correo ya no sale en la web nueva, pero sigue vivo.

| Registro | Valor | Qué es |
|---|---|---|
| NS | `ns1.openprovider.nl` · `ns2.openprovider.be` · `ns3.openprovider.eu` | Openprovider, el registrador de Webador |
| A `@` | `35.204.150.5` | Webador |
| `www` | CNAME `website-rendering.webador.com` | Webador |
| **MX** | **`0 mail.webador.com`** | **El correo lo da Webador** |
| TXT | `v=spf1 include:_spf.webador.com ~all` | SPF del correo |

### ⚠️ El correo `info@` no se puede romper

`info@limpiezaselimperio.net` vive en Webador y **es también el correo de su
cuenta de Vercel** (y lo tendrán clientes antiguos). Se rompe sin avisar si:

1. **Se borra la cuenta de Webador** (confirmado). No se borra.
2. **Se cambian los nameservers del `.net`** (por ejemplo a Vercel): la zona
   pasa entera y se pierden MX y SPF.

### Webador rechaza correo de Gmail

El 16 sept 2026 un correo de Kevin desde Gmail a `info@` rebotó:
`550 5.7.1 … blocked using rbl.0spam.org`. El servidor de Webador consulta la
lista negra 0spam, que tenía fichado un servidor compartido de Google (lo
había usado otro remitente para spam). **Clientes o candidatos que escriban
desde Gmail pueden estar rebotando**, y Frank no se entera: el aviso le llega
al remitente. Sólo lo arregla Webador (dejar de usar 0spam), a petición de
Frank con el rebote como prueba. La web nueva ya publica el correo del `.es`,
en Hostinger.

### Si algún día el `.net` apunta a la web nueva

No está decidido (hoy la web nueva no redirige nada desde la vieja). Si se
hace, **sin tocar los nameservers**: en el DNS de
Webador cambiar sólo el A de `@` y el CNAME de `www` a los valores que dé
Vercel al añadirlo, y dejar MX y TXT como están. Probar después que un correo
a `info@` llega.
