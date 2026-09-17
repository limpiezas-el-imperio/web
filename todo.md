# Pendiente

Actualizado el **17 de septiembre de 2026**, al cerrar la cuarta sesión.

## Por dónde seguir

**La web está completa y se sirve en `www.limpiezaselimperio.es`**, con el
correo `info@limpiezaselimperio.es` en Hostinger.

1. **Lo que queda de *Lanzamiento***: que Frank cambie el enlace en Google y en
   sus redes, y decidir qué hacer con el `.net`.
2. **Mandarle a Frank las preguntas de abajo**, de una vez. Las que más pesan:
   las descripciones de los servicios y el horario.
3. **Con sus respuestas, retocar el contenido** (sobre todo `src/datos/`).

## Preguntas para Frank

**Correo**

- [ ] **Correo nuevo**: la web publica `info@limpiezaselimperio.es`
      (Hostinger), y **ahí le llegan los presupuestos y las candidaturas de
      los formularios**. ¿Sabe entrar a leerlo, o se le reenvía a donde lea el
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

**Lo que no está en la web hasta que lo diga**

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
- [ ] Decidir qué hacer con el `.net` (seguir con la web vieja o apuntarlo a
      la nueva). Si se toca, **sólo A y CNAME, nunca nameservers, MX ni SPF**

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
- **Formularios**: presupuesto (por correo o WhatsApp) y candidatura, que
  llegan por correo (Kevin, 17 sept 2026). Ninguno más sin hablarlo
- **Fuera**: blog, redirecciones desde la web vieja, Google
  Search Console, revisión en un iPhone real y revisión de accesibilidad a
  fondo (Lighthouse ya da 100)

## Hecho (16 y 17 sept 2026, cuatro sesiones)

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
