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
| Sitemap con las 12 páginas públicas y robots que lo anuncia | `src/app/sitemap.ts`, `src/app/robots.ts` |
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
no sabemos ni si las 12 páginas están indexadas. No añade cookies, analítica ni
peticiones a terceros: es un panel de Google que lee el sitemap desde fuera, no
un script en la web. **La política de cookies sigue valiendo tal cual.**

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

- **Páginas → indexadas**: deberían acabar siendo las 12 del sitemap.
  `/instalar` no debe salir: va en `noindex` a propósito.
- **Rendimiento → consultas**: con qué palabras le encuentran de verdad. **Es
  lo que decidirá si algún día se escriben las páginas de servicio o localidad
  del §4**, en vez de adivinarlo.
- Si aparece el `.net` compitiendo por las mismas consultas, es el §2.

## 2. El `.net`: que haya una sola web

Hoy `limpiezaselimperio.net` sigue dando **200 con la web vieja entera**
(Webador), y el `.es` da 200 con la nueva. Para Google son dos sitios del mismo
negocio: el viejo tiene el historial y los enlaces, el nuevo no tiene ninguno,
y se reparten lo que haya. Mientras siga así, la web nueva compite con su
propia antecesora.

**Lo que hay que hacer**, y en este orden:

1. **Preguntarle a Frank.** Esto apaga su web vieja. Es suya y la decisión es
   suya (está pendiente en `todo.md`).
2. **En Vercel** (proyecto `web`, *Settings → Domains*, cuenta de Frank):
   añadir `limpiezaselimperio.net` y `www.limpiezaselimperio.net` **como
   redirección al `www` del `.es`**, no como dominio principal. Vercel responde
   un 308 permanente, que es lo que Google necesita para pasar las señales de
   un dominio al otro.
3. **En el DNS del `.net`** (Webador / Openprovider): cambiar **sólo** el `A`
   de `@` y el `CNAME` de `www` a los valores que dé Vercel.

> ⚠️ **Ni nameservers, ni MX, ni SPF.** El `info@limpiezaselimperio.net` vive
> en Webador y es también el correo de la cuenta de Vercel de Frank. Si se
> cambian los nameservers, la zona pasa entera y el correo muere sin avisar.
> Y **la cuenta de Webador no se borra** (ver `dominio.md`).

4. **Con las dos propiedades verificadas en Search Console**, usar
   *Configuración → **Cambio de dirección*** del `.net` al `.es`. Es la forma
   de decirle a Google que se mudó, en vez de esperar a que lo deduzca.
5. **Comprobar después** que un correo escrito a `info@limpiezaselimperio.net`
   sigue llegando. Si no llega, se ha tocado algo que no era.

Si Frank prefiere que su web vieja siga viva, se queda como está y se acepta
que las dos se estorben: es su decisión, no un fallo que arreglar.

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
# la segunda tiene que responder 308 al www del .es
curl -sI https://limpiezaselimperio.es  | head -1
curl -sI https://limpiezaselimperio.net | head -1

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
