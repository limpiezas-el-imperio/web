# Pendiente

Actualizado el **16 de septiembre de 2026**, al cerrar la segunda sesión.

## Por dónde seguir

1. **Diseño validado por Frank** (16 sept 2026): le gusta mucho. Queda
   hacerle las preguntas de *Preguntas para Frank*: varias páginas y el
   dominio dependen de sus respuestas.
2. **Pedirle una foto suya para la portada.** Va una provisional de Unsplash
   (`fotoPortada` en `src/app/page.tsx`). Horizontal, luminosa, a ser posible
   un trabajo terminado, sin personas que no sean ellos. Sin EXIF ni GPS.
3. **Si sigue pidiendo «más funciones»**: presupuesto guiado que abre
   WhatsApp con el mensaje escrito (servicio, zona, habitaciones, baños,
   frecuencia, fecha). Sin formulario ni servidor. Se hizo una versión en la
   segunda sesión y se borró con `/propuesta`; se rehace en la portada.
4. Mientras tanto, la página que no depende de él: `/quienes-somos` (con lo
   que ya hay; ver `docs/sitio-actual.md`). `/contacto` ya está hecha.
5. `sitemap.ts` y `robots.ts`, y una página 404 propia.

## Plan de trabajo (acordado el 16 sept 2026)

Paso a paso, sin prisa. Cada paso se cierra antes de abrir el siguiente.

1. [x] **Decidir qué contenido de la web vieja se queda**, página a página
       (`docs/sitio-actual.md`, *Decisión por página*)
2. [ ] **Integrarlo** en la web nueva (sin redirecciones), página a página
3. [ ] **Iterar**: mejorar, optimizar
4. [ ] **Mirar `../limpiezas-imperio-software/`** para entender mejor el
       negocio. Proyecto aparte e independiente: se lee para entender, **nada
       de sus datos entra aquí** (este repositorio es público)

## Páginas

Menú acordado: Inicio · Servicios · Zonas · Quiénes somos · Preguntas
frecuentes · Contacto. Trabaja con nosotros y los legales, en el pie.
Opiniones se queda como sección de la portada.

- [x] `/` — portada
- [x] `/nuestros-servicios`
- [x] `/preguntas-frecuentes`
- [x] `/contacto` — canales, horario, zonas, redes y qué contarnos para el
      presupuesto (WhatsApp con las preguntas ya escritas). El menú y la FAQ
      enlazan aquí
- [ ] `/quienes-somos` — dónde está, por qué elegirle, los tres valores como
      texto. Se puede empezar; la experiencia («desde cuándo») la tiene que
      decir él
- [ ] `/trabaja-con-nosotros` — sin formulario. Espera a saber si sigue
      buscando gente así
- [ ] `/zonas-de-servicio` — espera la lista buena de zonas
- [ ] `/aviso-legal`, `/politica-de-privacidad`, `/politica-de-cookies` —
      rehechos de cero; esperan su NIF
- [ ] Menú: añadir Quiénes somos cuando exista; Zonas pasa de `/#zonas` a su
      página cuando exista
- [ ] Pie: enlaces a Trabaja con nosotros y a los legales cuando existan

## Preguntas para Frank

**Antes de nada**

- [x] **¿Le gusta?** La primera versión no (16 sept 2026): «demasiado
      plana», «sin color», «no parece de limpieza», «pocas funciones».
      Rehecha con color y elevación
- [x] **¿Y la nueva?** Sí: le gusta mucho, diseño validado (16 sept 2026)
- [x] **Foto de la portada**: la de él aspirando no le gustó. Va una
      provisional de Unsplash hasta que mande una suya
- [ ] **NIF**: lo exige el aviso legal. Va a `docs/privado/` hasta que lo
      publique él
- [ ] **Dominio**: ¿deja el panel de Webador editar el A y el CNAME del `.net`
      sin cambiar los nameservers? (`docs/dominio.md`)
- [ ] **Webador**: ¿el buzón `info@` sigue funcionando si se da de baja la web?
      Preguntarlo **antes** de cancelar nada. Es también el correo de su
      cuenta de Vercel

**Contenido**

- [ ] **Descripciones de los servicios** (`src/datos/negocio.ts`): son un
      borrador nuestro. Que las lea y corrija; sobre todo «Cuidado de
      propiedades», «Fachadas» y «Reparaciones eléctricas»
- [ ] **Servicios**: ¿siguen los 26? ¿Le vale la agrupación en seis áreas?
      ¿Reparaciones eléctricas sigue siendo cosa suya?
- [ ] **Zonas**: su web tiene dos listas distintas, ¿cuál es la buena? Hoy
      salen las 11 que están en las dos
- [ ] **Opiniones**: ¿le parece bien que salgan las de Google en su web? ¿Y
      los nombres de su equipo (Michel, Maribel, Viviana…)? Hoy van cortados
- [ ] **Experiencia**: su web dice «2 años» (texto de 2024). ¿Desde cuándo?
      Vuelve como pregunta en la FAQ y en Quiénes somos
- [ ] **Urgencias**: «siempre que el cliente asuma el coste». ¿Cuesta más que
      un servicio normal?
- [ ] **Cobro**: su hoja de servicio dice mínimo de 4 horas, desplazamiento y
      vaporeta aparte. ¿Se puede decir algo de eso en la web?
- [ ] **Dirección**: hoy sólo sale «La Pobla de Vallbona (Valencia)», no la
      calle, porque es su casa. ¿La quiere completa?
- [ ] **Trabaja con nosotros**: ¿sigue buscando gente por la web?
- [ ] **Redes**: LinkedIn apunta a un enlace roto; ¿cuáles están vivas? Hoy
      salen Facebook, Instagram, TikTok, YouTube y X

**Material**

- [ ] **Más fotos**, sobre todo de comunidades, oficinas, obras y cristales.
      Comprobar EXIF y GPS antes de subirlas (ver `CLAUDE.md`)
- [ ] **Logo vectorial** (SVG o PDF), si lo tiene. El de ahora es un JPG de
      2000 px

**Ya respondido**

- [x] El `.net` está registrado en Webador, y el buzón `info@` también es de
      Webador (MX `mail.webador.com`)
- [x] Las reseñas de su web vieja eran de Google: 4,9 con 68 (16 sept 2026)
- [x] Formularios: ninguno por ahora
- [x] Blog: fuera
- [x] Logo sin teléfono en alta y 8 fotos reales

## Técnico

- [ ] `src/app/sitemap.ts` y `src/app/robots.ts`
- [ ] Página 404 propia (`not-found.tsx`) con la cabecera, el pie y enlaces
- [ ] Textos legales para este negocio. **Banner de cookies sólo si hace
      falta**: hoy la web no pone cookies ni analítica. Si se añade analítica,
      que sea sin cookies (Vercel Web Analytics) y se revisa
- [ ] Revisión en un **iPhone real con Safari** (él usa el móvil): menú, barra
      de contacto, carruseles, portada del móvil
- [ ] Rendimiento y accesibilidad: Lighthouse en móvil, contraste, orden de
      tabulación
- [ ] Presupuesto guiado por WhatsApp: ver *Por dónde seguir*, punto 3
- [ ] **Mantenimiento**: la nota y el total de Google (`valoracion` en
      `negocio.ts`) van escritos a mano; revisarlos de vez en cuando

## Lanzamiento

- [ ] Registros DNS del `.net` hacia Vercel **sin tocar el MX ni el SPF**
      (`docs/dominio.md`)
- [ ] Comprobar con `curl` que el dominio sirve esta web y **entonces**
      cambiar `dominioPublico` en `src/datos/sitio.ts`
- [ ] Mandar un correo de prueba a `info@` y ver que llega
- [ ] Actualizar el enlace de la web en su ficha de Google y en sus redes
- [ ] Dar de baja la web de Webador **sólo** después de saber qué pasa con el
      correo

## Hecho en la primera sesión (16 sept 2026)

- Contexto del proyecto, inventario de la web vieja y decisión página a página
- Repositorio público y despliegue automático en su Vercel con cada push
- Portada: rediseño editorial con fotos reales; portada propia para el móvil;
  galería; mapa de zonas; opiniones de Google en carrusel
- `/nuestros-servicios` y `/preguntas-frecuentes`
- Menú de tablet y móvil a pantalla completa, barra de contacto en el móvil
- Sistema de diseño común (ver `CLAUDE.md`). Primero sobrio (Newsreader y
  Geist, sin dorado); a Frank no le gustó y se rehízo el mismo día con color,
  tarjetas con sombra, Montserrat y Nunito Sans, y WhatsApp en verde
- Metadatos por página, imagen para compartir, iconos, datos estructurados
  (`LocalBusiness`, `FAQPage`, servicios)

## Hecho en la segunda sesión (16 sept 2026)

- Frank vio la primera versión y no le gustó. Se rehízo el sistema de diseño
  entero sin tocar la estructura: colores del logo (cielo, marino, oro),
  tarjetas con sombra, esquinas redondeadas, Montserrat y Nunito Sans, y
  WhatsApp en verde. `CLAUDE.md` y `README.md` recogen la dirección nueva
- Portada con foto provisional de Unsplash, enlazada y no descargada
  (`images.unsplash.com` permitido en `next.config.ts`)
- Se probó una página `/propuesta` aparte y se descartó: los cambios de
  diseño se hacen directamente en la web
- Frank valida el diseño nuevo
- `/contacto`: WhatsApp destacado, teléfono y correo en tarjetas; horario,
  zonas y redes; «Qué contarnos» con un WhatsApp con las preguntas escritas.
  El menú, la FAQ y el cierre de contacto de cada página enlazan aquí
