# Dominio

**Estado (16 sept 2026, noche): la web se lanza con `limpiezaselimperio.es`,
comprado por Frank en Hostinger. Todo configurado; falta que el registro de
`.es` publique el dominio.** El `.net` se queda en Webador con la web vieja y
el correo.

## `limpiezaselimperio.es` (el nuevo)

- **Registrador: Hostinger**, cuenta de Frank (entra con Google). Kevin tiene
  acceso de administrador desde su propia cuenta de Hostinger.
- Hostinger lo marca **«Actif»**, caduca el **11 sept 2029**, con renovación
  automática.
- **Vercel no lo vende**: `.es` no está entre sus dominios
  (`vercel domains price` responde «TLD not supported»). Por eso Hostinger.
- **Sin correo**: ni buzón ni MX. El correo sigue siendo `info@` del `.net`.

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

Se dejaron los DNS en Hostinger y no se pasaron a Vercel para que Kevin pueda
editarlos con su acceso, sin entrar en la cuenta de Vercel de Frank.

### Por qué aún no funciona

El 16 sept por la noche, **los servidores de `.es` responden NXDOMAIN**: el
registro todavía no lo ha publicado, aunque Hostinger diga «Actif». El
navegador da `DNS_PROBE_POSSIBLE` (o `ERR_SOCKS_CONNECTION_FAILED` con un
proxy): es lo esperado.

```bash
dig +norec NS limpiezaselimperio.es @a.nic.es   # NXDOMAIN = aún no publicado
dig +short A limpiezaselimperio.es @8.8.8.8     # 216.198.79.1 cuando esté
curl -sI https://www.limpiezaselimperio.es      # 200 servido por Vercel
```

- La zona `.es` se actualiza varias veces al día; lo normal son **unas horas**.
- Los resolutores recuerdan el «no existe» **hasta 1 hora** (SOA de `.es`).
- **Si 24 h después de la compra sigue en NXDOMAIN**, no es espera: hablar con
  el soporte de Hostinger (activo en su panel pero sin publicar en el
  registro; suele ser por los datos del titular).

### Cuando responda

1. Vercel marca los dos dominios como válidos y emite el certificado (botón
   *Refresh* si tarda).
2. Comprobar con `dig` y `curl` que `www.limpiezaselimperio.es` sirve esta web
   y que `limpiezaselimperio.es` redirige.
3. **Entonces** cambiar `dominioPublico` en `src/datos/sitio.ts` a
   `www.limpiezaselimperio.es` y actualizar `CLAUDE.md`. Push.
4. Frank cambia el enlace de la web en su ficha de Google y en sus redes.

## `limpiezaselimperio.net` (el viejo)

Sigue en **Webador**, con la web vieja. **Ya no está añadido en Vercel.**

| Registro | Valor | Qué es |
|---|---|---|
| NS | `ns1.openprovider.nl` · `ns2.openprovider.be` · `ns3.openprovider.eu` | Openprovider, el registrador de Webador |
| A `@` | `35.204.150.5` | Webador |
| `www` | CNAME `website-rendering.webador.com` | Webador |
| **MX** | **`0 mail.webador.com`** | **El correo lo da Webador** |
| TXT | `v=spf1 include:_spf.webador.com ~all` | SPF del correo |

### ⚠️ El correo `info@` no se puede romper

`info@limpiezaselimperio.net` vive en Webador y **es también el correo de su
cuenta de Vercel**. Se rompe sin avisar si:

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
Frank con el rebote como prueba. Otra razón para llevar algún día el buzón a
otro proveedor.

### Si algún día el `.net` apunta a la web nueva

No está decidido (hoy la web nueva no redirige nada desde la vieja). Si se
hace, **sin tocar los nameservers**: en el DNS de
Webador cambiar sólo el A de `@` y el CNAME de `www` a los valores que dé
Vercel al añadirlo, y dejar MX y TXT como están. Probar después que un correo
a `info@` llega.
