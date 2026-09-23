# SEO

**Frank pidió «mejorar el SEO» el 23 sept 2026.** Esto es lo que hay hecho, lo
que falta, de quién es cada paso y lo que se ha decidido no hacer.

El resumen, por si no lees más: **la web ya está bien por dentro**. Lo que
falta está casi todo fuera del código —su ficha de Google, que haya una sola
web y que Google sepa que esta existe—, y eso no se arregla escribiendo CSS.

## Lo que ya hace la web

No hay que volver a tocarlo, y conviene no romperlo:

| Qué | Dónde |
|---|---|
| Título y descripción propios en cada página, canonical y Open Graph | `metadatosPagina()` en `src/datos/sitio.ts` |
| Sitemap con 9 URLs y robots que lo anuncia | `src/app/sitemap.ts`, `src/app/robots.ts` |
| Un `LocalBusiness` con `@id` común, completo en las cinco páginas que hablan del negocio | `src/datos/estructurados.ts` |
| Servicios como `ItemList` de `Service`, y la FAQ como `FAQPage` | `nuestros-servicios`, `preguntas-frecuentes` |
| Un `<h1>` por página, `alt` en todas las fotos, foco visible | `CabeceraPagina`, `src/datos/fotos.ts` |
| AVIF con WebP de respaldo y `sizes` reales | `next.config.ts` |
| Lighthouse en móvil: accesibilidad 100, rendimiento 96–99 | — |
| `/instalar` fuera del índice (`robots: { index: false }`) y del sitemap | `src/app/instalar/page.tsx` |

## Lo que de verdad mueve el posicionamiento local, por orden

Para una empresa de limpieza de La Pobla, el orden es éste y no otro:

1. **Su ficha de Google** (§3). Es donde busca el cliente local, y hoy la ficha
   todavía enlaza a la web vieja.
2. **Que haya una sola web** (§2). Hoy hay dos vivas del mismo negocio,
   compitiendo entre ellas.
3. **Que Google sepa que esta web existe** (§1). Nadie se lo ha dicho.
4. **Contenido por servicio o por localidad**. Aparcado a propósito (§4).

## 1. Search Console (paso de Kevin, en el navegador)

Estaba en «fuera» en `todo.md`; **se reabrió el 23 sept 2026**, porque sin él
no sabemos ni si el sitemap está indexado. No añade cookies, analítica ni
peticiones a terceros: es un panel de Google que lee el sitemap desde fuera, no
un script en la web. **La política de cookies sigue valiendo tal cual.**

**Esperando a Frank desde el 23 sept 2026**: con qué cuenta de Google gestiona
su ficha. La propiedad se crea con la cuenta de **Kevin**, que es quien tiene
el DNS de Hostinger y quien va a mirar el panel, y la de Frank se añade en
*Configuración → Usuarios y permisos* para que no muera con la de Kevin. Saber
cuál es antes evita crear la propiedad dos veces y que la ficha y Search
Console acaben en cuentas distintas.

1. En `search.google.com/search-console`, crear una **propiedad de dominio**
   (no «prefijo de URL») para `limpiezaselimperio.es`. La de dominio cubre el
   `www` y el sin `www`, y http y https, de una vez.
2. Google da un **TXT** para el `@` del dominio. Añadirlo en **Hostinger**
   (*DNS*), **sin tocar MX, SPF, DKIM ni DMARC** (ver `dominio.md`). Puede
   convivir con el TXT del SPF: son dos registros TXT distintos en el mismo
   `@`, y eso es normal.
3. Verificar en Search Console (el TXT puede tardar un rato en propagarse) y
   **enviar el sitemap**: `https://www.limpiezaselimperio.es/sitemap.xml`.
4. Anotar aquí la fecha de verificación y el TXT no hace falta guardarlo.

Qué mirar después, sin obsesionarse (una vez al mes vale):

- **Páginas → indexadas**: el sitemap manda **9 URLs**, no las 12 públicas.
  Las tres legales (aviso legal, privacidad, cookies) se dejaron fuera a
  propósito en `sitemap.ts`, pero se enlazan desde el pie, así que Google
  puede indexarlas igual: **entre 9 y 12 es lo normal**, y no es un fallo.
  `/instalar` no debe salir: va en `noindex` a propósito.
- **Rendimiento → consultas**: con qué palabras le encuentran de verdad. **Es
  lo que decidirá si algún día se escriben las páginas de servicio o localidad
  del §4**, en vez de adivinarlo.
- Si aparece el `.net` compitiendo por las mismas consultas, es el §2 (que ya
  está decidido: redirige).

## 2. El `.net` redirige al `.es` (decidido el 23 sept 2026, Kevin)

Hoy `limpiezaselimperio.net` sigue dando **200 con la web vieja entera**
(Webador) y el `.es` da 200 con la nueva. Para Google son dos sitios del mismo
negocio: el viejo tiene el historial y los enlaces, el nuevo no tiene ninguno,
y se reparten lo que haya. **Se consolida: el `.net` pasa a redirigir al
`www` del `.es`**, y la web vieja deja de servirse.

**Ojo con el reparto**: la web nueva **no está en Hostinger**, está en
**Vercel**. Hostinger tiene el dominio `.es` y el buzón. El redirect lo hace
Vercel, y los valores de DNS que hay que poner en el `.net` son los que dé el
panel de Vercel.

**Lo que hace falta antes de empezar** (los dos cuellos de botella):

- **Entrar en el DNS del `.net`**: la zona está en Openprovider, el registrador
  de Webador, y se edita desde la cuenta de **Webador de Frank**. Si no hay
  acceso, este paso lo tiene que dar él.
- **Entrar en Vercel**: el proyecto está en la **cuenta de Frank**; la CLI de
  Kevin va por su propia cuenta y no llega (`dominio.md`).

**El orden, y es importante:**

1. **Verificar `limpiezaselimperio.net` en Search Console** (propiedad de
   dominio, TXT en la zona del `.net`) **antes de tocar el DNS de la web**. Se
   necesita luego para el «Cambio de dirección», y con la web vieja apagada ya
   no valen los métodos que piden servir un fichero o una etiqueta: por DNS
   funciona siempre, pero es más fácil dejarlo hecho mientras está en pie.
2. **En Vercel** (proyecto `web`, *Settings → Domains*): añadir
   `limpiezaselimperio.net` y `www.limpiezaselimperio.net` y ponerlos a
   **redirigir a `www.limpiezaselimperio.es`**, no como dominio principal.
   Vercel responde un **308 permanente**, que es lo que Google necesita para
   pasar las señales de un dominio al otro. Copiar de ahí el `A` del apex y el
   `CNAME` del `www`, que son los que toca poner en el paso 3.
3. **En el DNS del `.net`**: cambiar **sólo** el `A` de `@` y el `CNAME` de
   `www` a esos valores. El apex pide un `A` (el `216.198.79.1` de siempre) y
   el `www`, un `CNAME` (el `…vercel-dns-0NN.com`).

> ⚠️ **El `www` del `.net` es el que más importa, y es fácil olvidarlo.** La
> web vieja se sirve en `www.limpiezaselimperio.net` —el apex ya redirige al
> `www` en Webador— y es esa URL con `www` la que Google tiene indexada. Si
> sólo se consolida el apex, la que sale en las búsquedas sigue sirviendo la
> web vieja. **Los dos, y los dos con 308 al `www` del `.es`.**

> ⚠️ **En Vercel, pestaña `DNS Records`, nunca `Vercel DNS`.** La segunda se
> trae la zona entera a Vercel cambiando los nameservers, que es justo lo que
> mata el `info@limpiezaselimperio.net`. Los valores que dé `DNS Records` se
> copian **a mano en Webador**.

> ⚠️ **Ni nameservers, ni MX, ni SPF.** El `info@limpiezaselimperio.net` vive
> en Webador y es también el correo de la cuenta de Vercel de Frank. El correo
> va por los MX, no por el `A`, así que cambiando sólo `A` y `CNAME` sigue
> funcionando; si se cambian los nameservers, la zona pasa entera y el correo
> muere sin avisar. Y **la cuenta de Webador no se borra** (ver `dominio.md`).

4. **Esperar la propagación y el certificado**: Vercel emite el SSL del `.net`
   solo, cuando el DNS ya apunta a él. En ese rato, entrar por `https` al
   `.net` puede dar error de certificado. Es normal y se pasa.
5. **Comprobar** (abajo, *Comprobar*): que el `.net` responde 308 al `.es`, que
   los MX siguen siendo los de Webador y **que un correo a
   `info@limpiezaselimperio.net` sigue llegando**. Si no llega, se ha tocado
   algo que no era.
6. **Search Console → *Configuración → Cambio de dirección***, del `.net` al
   `.es`, con las dos propiedades verificadas. Es decirle a Google que se
   mudó, en vez de esperar a que lo deduzca.
7. **Aunque redirija, Frank cambia el enlace de su ficha y sus redes** (§3). Un
   redirect no sustituye al enlace bueno: es una red de seguridad para quien
   llegue por el viejo.

**Las URLs viejas que ya no existen dan la 404, y está bien así.** Vercel
conserva la ruta al redirigir, así que algo como `/laboncler` acaba en la 404
de la web nueva, que explica justo eso: que la web es nueva. No se mapea ruta
por ruta (decisión de Kevin, ya tomada). Si algún día se quisiera que **todo**
cayera en la portada, no se hace con un dominio de redirección: habría que
añadir el `.net` como dominio normal y una regla por `host`, y eso es más
complicado de lo que vale.

**Si no hay manera de editar el DNS del `.net`**, Webador tiene su propia
opción de reenviar el dominio. Es peor —no se controla el código de estado ni
se ve en Vercel—, pero consolida casi igual. Antes de usarla, comprobar con
`curl -sI` que responde un 301 o un 308 de verdad y no un marco o un `<meta
refresh>`, que para Google no valen lo mismo.

## 3. Lo que tiene que hacer Frank (y no podemos hacer nosotros)

Su ficha de Google Business Profile pesa más que la web para el cliente que
busca «limpieza en La Pobla». Va en `todo.md` como preguntas, en llano:

- **El enlace de la web**, a `https://www.limpiezaselimperio.es` (hoy apunta al
  `.net`). Es el paso más importante de toda esta lista.
- **Categoría principal**: «Servicio de limpieza». Las secundarias, las que
  haga de verdad.
- **Servicios y zonas** en la ficha, los mismos que la web: se copian de
  `/nuestros-servicios` y `/zonas-de-servicio`.
- **Fotos**: las mismas diez de la galería valen, y las nuevas que vaya
  haciendo.
- **Seguir pidiendo reseñas** a quien queda contento. El 4,9 con 68 es su mejor
  activo, y es suyo, no de la web.
- **Sus redes**: que el enlace de la bio apunte al `.es` (Facebook, Instagram,
  TikTok, YouTube y X; están en `negocio.ts`).

## 4. Lo que no se hace, y por qué

- **`aggregateRating` en los datos estructurados** (el 4,9 · 68 marcado para
  que salgan estrellas en Google): **no**. Las reseñas son de su ficha de
  Google, y Google no admite marcar como propias las de un tercero; arriesga
  una penalización manual. La nota sigue a la vista como texto, que es donde
  convence al que la lee.
- **`priceRange`**: no hay precios públicos y no se inventan.
- **Páginas por servicio o por localidad**: aparcadas el 23 sept 2026 (Kevin).
  Serían el siguiente paso de contenido —hoy 25 servicios viven en una URL y 18
  localidades en otra—, pero las descripciones de los servicios siguen siendo
  un borrador nuestro pendiente de Frank, y escribir 18 páginas de localidad
  sin nada propio que contar de cada una sale peor que no tenerlas. **Se
  deciden con los datos de Search Console** (§1), no a ojo.
- **Analítica** (Google Analytics y parecidos): no, mientras la web presuma de
  no tener cookies ni seguimiento. Search Console da lo que hace falta sin
  tocar la web.
- **Meta `keywords`**: no existe para Google desde hace años.
- **Comprar enlaces o darse de alta en cien directorios**: no. Si se hace algo
  de esto, que sean pocos y de verdad (su gremio, su ayuntamiento), y **siempre
  con el mismo nombre, teléfono y dirección que la ficha de Google**.

## Comprobar

```bash
# Las dos webs: hoy las dos dan 200; cuando el .net esté consolidado,
# las dos últimas tienen que responder 308 al www del .es
curl -sI https://limpiezaselimperio.es      | head -1
curl -sI https://limpiezaselimperio.net     | head -1
curl -sI https://www.limpiezaselimperio.net | head -1

# Que el redirect del .net lleve donde debe, y en un solo salto
curl -sIL https://limpiezaselimperio.net | grep -i '^HTTP/\|^location:'

# Que el correo del .net NO se haya tocado: los MX siguen en Webador
dig +short MX limpiezaselimperio.net @8.8.8.8
dig +short A  limpiezaselimperio.net @8.8.8.8   # el de Vercel, tras el cambio

# El sitemap y el robots que se envían a Search Console
curl -s https://www.limpiezaselimperio.es/sitemap.xml | head -5
curl -s https://www.limpiezaselimperio.es/robots.txt

# El TXT de verificación, una vez añadido en Hostinger (junto al del SPF)
dig +short TXT limpiezaselimperio.es @8.8.8.8

# Los datos estructurados de una página, para leerlos a ojo
curl -s https://www.limpiezaselimperio.es/ \
  | grep -o '<script type="application/ld+json">.*</script>'
```

Para validar el JSON-LD, el probador de resultados enriquecidos de Google
(`search.google.com/test/rich-results`). Ojo: dirá que `LocalBusiness` no
genera resultado enriquecido **sin `aggregateRating`**, y eso es correcto y
está decidido (§4).
