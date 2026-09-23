# Pendiente

Actualizado el **23 de septiembre de 2026**, al cerrar la sexta sesión.

## Por dónde seguir

**La web está completa y se sirve en `www.limpiezaselimperio.es`**, con el
correo `info@limpiezaselimperio.es` en Hostinger.

1. **SEO** (lo pidió Frank el 23 sept): los tres pasos de *SEO*, abajo. Todo
   el razonamiento está en `docs/seo.md`. El código ya está hecho; lo que
   queda son pasos en paneles, y el primero es de Frank.
2. **Lo que queda de *Lanzamiento***: que Frank cambie el enlace en Google y en
   sus redes, y decidir qué hacer con el `.net`.
3. **Mandarle a Frank las preguntas de abajo**, de una vez. Las que más pesan:
   el enlace de su ficha de Google, las descripciones de los servicios y el
   horario.
4. **Con sus respuestas, retocar el contenido** (sobre todo `src/datos/`).

## SEO

Los tres frentes que se abrieron el 23 sept 2026, por orden de lo que pesa.
El detalle, los valores y el porqué de cada uno, en **`docs/seo.md`**.

- [ ] **Su ficha de Google, lo primero** (es de Frank, y pesa más que la web
      entera para el cliente local): el enlace a `.es`, la categoría, los
      servicios, las zonas y las fotos. Está abajo, en las preguntas
- [ ] **Search Console** (Kevin): propiedad **de dominio** para
      `limpiezaselimperio.es`, verificada con un **TXT en Hostinger** —sin
      tocar MX, SPF, DKIM ni DMARC— y enviar el sitemap (9 URLs). Sin cookies
      ni analítica: no rompe la política. Luego, una mirada al mes a qué
      páginas están indexadas y con qué palabras le buscan.
      **⏳ Esperando a que Frank diga con qué cuenta de Google gestiona su
      ficha** (23 sept), para no crear la propiedad dos veces
- [ ] **Una sola web: el `.net` redirige al `.es`** — **decidido el 23 sept
      (Kevin)**, ya no se pregunta. El runbook entero, con el orden y las
      trampas, en `docs/seo.md` §2. En resumen: verificar el `.net` en Search
      Console **antes** de tocar nada, añadirlo en Vercel **como redirección**
      al `www` del `.es`, cambiar en el DNS del `.net` **sólo** el A de `@` y
      el CNAME de `www`, y luego el «Cambio de dirección».
      **Ni nameservers, ni MX, ni SPF**: ahí vive su `info@` del `.net`, y hay
      que comprobar después que sigue llegando.
      **Hace falta entrar en la cuenta de Webador de Frank** (el DNS del
      `.net`) **y en su Vercel**: si no hay acceso, los da él

## Preguntas para Frank

**Correo**

- [ ] **Correo nuevo**: la web publica `info@limpiezaselimperio.es`
      (Hostinger), y **ahí le llegan los presupuestos, las reservas, los datos
      de facturación y las candidaturas de los formularios**. ¿Sabe entrar a leerlo, o se le reenvía a donde lea el
      correo? Si no lo mira, se pierden
- [ ] **Webador rechaza correo de Gmail** (lista negra 0spam; rebotó uno de
      Kevin el 16 sept). Ya no afecta a la web, pero sí a quien escriba al
      `.net`. ¿Pide a Webador que lo arreglen, con el rebote como prueba?
      (`docs/dominio.md`)

**Contenido publicado que conviene que confirme**

- [ ] **Descripciones de los servicios** (`src/datos/negocio.ts`): son un
      borrador nuestro. Que las lea y corrija, sobre todo «Cuidado de
      propiedades» y «Fachadas»
- [ ] **Servicios**: ¿le valen los 25 y las cinco áreas? Se quitaron
      reparaciones y parkings y naves, y se añadieron alquiler vacacional,
      sofás y colchones, mosquiteras, piscinas y escaparates. Si hace algo de
      lo quitado, vuelve
- [ ] **Horario**: la web dice lunes a viernes de 6:00 a 18:00 y fines de
      semana con agenda abierta. ¿Sigue así?
- [ ] **Urgencias**: la FAQ dice que sí, «siempre que el cliente asuma el
      coste». ¿Las sigue haciendo? ¿Cuestan más?
- [ ] **Cobro**: la web dice «por horas o con precio cerrado, según el
      trabajo». ¿Quiere decir algo más (mínimo de horas, desplazamiento,
      vaporeta y Kärcher aparte)?
- [ ] **Presupuesto guiado** (portada y `/contacto`): ¿le faltan o le sobran
      preguntas? Ahora le llega por correo a `info@` o por WhatsApp
- [ ] **Opiniones**: ¿le parece bien que salgan las de Google? Van cortadas
      para no nombrar a su equipo
- [ ] **Redes**: ¿cuáles están vivas? Hoy salen Facebook, Instagram, TikTok,
      YouTube y X (LinkedIn se quitó: enlace roto)
- [ ] **Trabaja con nosotros**: ¿sigue buscando gente? Las candidaturas le
      llegan ahora a `info@` desde un formulario. Si no busca, se quitan la
      página y sus enlaces (pie, menú del móvil y Quiénes somos)

- [ ] **Reserva de servicios**: el DNI y el correo son opcionales (en su web
      vieja, todo era obligatorio) y pide la localidad en vez de la
      provincia. Al enviar dice «te contestamos para confirmar el día y la
      hora»: ¿es así como lo hace? ¿Le vale?
- [ ] **Datos de facturación**: escalera, piso, puerta y letra van en un
      solo campo opcional, y no está «envíame una copia». ¿Le vale?
- [ ] **Cabecera**: la reserva y la facturación van en un desplegable
      «Clientes», y para que cupiera, «Preguntas frecuentes» se lee
      «Preguntas» en la cabecera de escritorio (en el menú y el pie, entero).
      ¿Le vale?
- [ ] **Borrar las dos pruebas** del buzón (18 sept, «PRUEBA DE LA WEB»:
      TOMAS RIVAS y BEATRIZ SOLANO)

**Su ficha de Google y sus redes** (esto es lo que más le va a mover, 23 sept)

- [ ] **El enlace de la web en su ficha de Google**: hoy lleva al `.net`
      (la web vieja). Que lo cambie a `https://www.limpiezaselimperio.es`.
      Lo mismo en la bio de Facebook, Instagram, TikTok, YouTube y X
- [ ] **Con qué cuenta de Google gestiona su ficha**: hace falta para Search
      Console (23 sept). No es para entrar en su cuenta, es para que la ficha y
      Search Console no acaben en cuentas distintas
- [ ] **Su web vieja**: se apaga y el `.net` lleva a la nueva (decidido el
      23 sept). Hay que **decírselo**, y pedirle acceso al DNS del `.net` en
      Webador —o que lo cambie él— y a su Vercel. Su `info@…net` **no se
      toca** y seguirá funcionando (`docs/seo.md`, §2)
- [ ] **En la ficha**: categoría «Servicio de limpieza», los servicios y las
      zonas que ya están en la web, y fotos. ¿Las sube él o le pasamos las
      diez de la galería?
- [ ] **Reseñas**: que siga pidiéndolas. El 4,9 con 68 es suyo y es lo que
      más convence

**Lo que no está en la web hasta que lo diga**

- [ ] **El PDF de la hoja de servicio** que se descargaba en su reserva vieja:
      no se ha puesto porque es su parte interno, con precios, el mínimo de 4
      horas y el correo del `.net`. ¿Lo quiere en la web? Habría que
      actualizarlo

- [ ] **Experiencia**: su web vieja decía «2 años» (texto de 2024). ¿Desde
      cuándo? Iría en Quiénes somos y en la FAQ
- [ ] **«Tarifas premium»**: estaba en su «Por qué elegirnos». ¿Qué quería
      decir? No se puso porque suena a caro
- [ ] **Dirección**: fuera del aviso legal sólo sale la localidad, porque es su
      casa. ¿La quiere completa?

## Lanzamiento

- [ ] Frank actualiza el enlace de la web en su ficha de Google y en sus redes
- [ ] **Recibir desde fuera**: que un correo escrito a mano desde Gmail (no
      desde la web) llegue a `info@` y que una respuesta desde el buzón no caiga
      en spam. Lo de los formularios ya está probado
- [x] Decidir qué hacer con el `.net`: **redirige al `.es`** (Kevin, 23 sept).
      Ejecutarlo es el tercer punto de *SEO*, arriba. Al tocarlo, **sólo A y
      CNAME, nunca nameservers, MX ni SPF**

## Ya decidido (no volver a preguntar)

- **Diseño**: validado por Frank. Foto de portada de Unsplash, acreditada
- **Zonas**: 18 localidades por áreas (Kevin, con sus dos listas y dónde
  trabaja de verdad)
- **Dominio**: `www.limpiezaselimperio.es` (principal; el sin `www` redirige),
  comprado por Frank en Hostinger porque Vercel no vende `.es`. DNS en
  Hostinger, no en Vercel
- **Correo**: la web publica `info@limpiezaselimperio.es`, en Hostinger. El
  `info@` del `.net` sigue en Webador (es el de su cuenta de Vercel): muere si
  se borra la cuenta o se cambian los nameservers del `.net` → ni una cosa ni
  la otra
- **NIF**: no se pone (Kevin)
- **Logo**: se queda el actual, sin versión vectorial. **Fotos**: diez en la
  galería (tres nuevas el 17 sept 2026); las que lleguen, detrás del «+N»
- **Nota de Google**: 4,9 con 68, revisada por Kevin el 16 sept 2026. Va a
  mano: mirarla de vez en cuando
- **Formularios**: presupuesto (por correo o WhatsApp) y candidatura (Kevin,
  17 sept 2026), y reserva y datos de facturación (los pidió Frank, 18 sept).
  Llegan por correo. Ninguno más sin hablarlo
- **Móvil de Frank**: un Android antiguo, no un iPhone. La web instalada en
  su pantalla de inicio desde `/instalar` (18 sept)
- **Fuera**: blog, redirecciones desde la web vieja, analítica (rompería el
  «sin cookies»), meta `keywords`, comprar enlaces, revisión en un iPhone real
  y revisión de accesibilidad a fondo (Lighthouse ya da 100)
- **El `.net` redirige al `.es`** (Kevin, 23 sept): la web vieja de Webador se
  apaga y el dominio viejo manda un 308 al `www` del `.es`, para que Google no
  tenga dos webs del mismo negocio. **Sin mapear ruta por ruta**: las URLs
  viejas caen en la 404, que explica que la web es nueva. La cuenta de Webador
  **no se borra** y su `info@…net` no se toca
- **SEO, decidido el 23 sept** (`docs/seo.md`): **Search Console sí** (ya no
  está «fuera»: no añade cookies y es la única forma de saber si Google indexa
  la web). **`aggregateRating` no**: sus reseñas son de su ficha de Google y
  Google no admite marcarlas como propias. **Páginas por servicio o por
  localidad, aparcadas**: se deciden con lo que diga Search Console y cuando
  Frank haya revisado las descripciones, no a ojo

## Hecho (16 a 23 sept 2026, seis sesiones)

- Inventario de la web vieja y decisión página a página
- Repositorio público con despliegue automático en su Vercel
- Primer diseño sobrio; Frank no lo quiso y se rehízo con color, tarjetas y
  WhatsApp en verde. Validado
- Páginas: portada, servicios, zonas, quiénes somos, preguntas, contacto,
  trabaja con nosotros, legales y 404; sitemap y robots
- Menú del móvil a pantalla completa que cabe sin desplazarse; barra de
  contacto en el móvil; navegación sin animación
- Lighthouse en móvil: accesibilidad 100, rendimiento 96–99. Imágenes AVIF
- Sin cookies, analítica ni peticiones a terceros (comprobado)
- Lectura de su contabilidad (`docs/privado/negocio.md`) y contenido alineado
  con cómo trabaja
- **Lanzamiento (17 sept)**: dominio `.es` en Hostinger, publicado y servido
  por Vercel (`dominioPublico` al día); correo `info@` del `.es` en Hostinger
  con MX, SPF, DKIM y DMARC
- **Formularios (17 sept)**: presupuesto (por correo o WhatsApp) y candidatura
  llegan a `info@` por el SMTP de Hostinger (`EMAIL_PASSWORD` en Vercel), con
  antispam, consentimiento y privacidad al día. Probados: llegan a la bandeja
  de entrada
- **Galería (17 sept)**: tres fotos nuevas, tarjeta «+N» y visor a pantalla
  completa
- Retoques de texto (17 sept): titular «Limpieza que transforma», «Servicios
  de limpieza» y «Desde La Pobla de Vallbona, a todo el Camp de Túria…»
- **Quinta sesión (18 sept)**: `/instalar` (oculta, con el manifiesto
  instalable y un service worker sólo ahí; a Frank le funcionó en su
  Android), `/datos-de-facturacion` y `/reserva-de-servicios` (formularios por
  correo con WhatsApp de segunda vía, en el sitemap y la política de
  privacidad; probados con un envío real, llegan a la bandeja de entrada).
  Navegación: desplegable «Clientes» en la cabecera, que ahora sale desde
  1200 px (entre 1025 y 1200 los enlaces se partían en dos líneas), y diez
  filas en el menú del móvil, que sigue cabiendo sin desplazarse
- **Sexta sesión (23 sept), SEO**: repaso de lo que ya había (bien: metadatos,
  canonical, sitemap, robots, JSON-LD, un `<h1>`, `alt`, AVIF, Lighthouse).
  Arreglado lo que no: cinco páginas describían el negocio con cinco nodos
  `LocalBusiness` distintos e incompletos y ninguno decía que fuera el mismo;
  ahora el nodo vive entero en `src/datos/estructurados.ts` con un `@id` común.
  Y `docs/seo.md`, con los tres frentes, quién hace cada paso y lo que no se
  hace y por qué
