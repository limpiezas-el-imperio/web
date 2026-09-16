# Pendiente

Actualizado el **16 de septiembre de 2026**, al cerrar la segunda sesión.

## Por dónde seguir

**La web está completa**: todas las páginas hechas y el diseño validado por
Frank. Lo que queda depende de él:

1. **Mandarle las preguntas de abajo**, de una vez. Las que más pesan: el
   dominio, las descripciones de los servicios y el horario.
2. **Con sus respuestas, retocar el contenido** (sobre todo `src/datos/`).
3. **Lanzar** con el dominio, cuando conteste lo del panel de Webador.

## Preguntas para Frank

**Para lanzar**

- [ ] **Dominio**: ¿deja el panel de Webador editar el registro A y el CNAME
      del `.net` sin cambiar los nameservers? (`docs/dominio.md`)

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
      preguntas?
- [ ] **Opiniones**: ¿le parece bien que salgan las de Google? Van cortadas
      para no nombrar a su equipo
- [ ] **Redes**: ¿cuáles están vivas? Hoy salen Facebook, Instagram, TikTok,
      YouTube y X (LinkedIn se quitó: enlace roto)
- [ ] **Trabaja con nosotros**: ¿sigue buscando gente? ¿Candidaturas por
      WhatsApp o sólo por correo? Si no busca, se quitan la página y sus
      enlaces (pie, menú del móvil y Quiénes somos)

**Lo que no está en la web hasta que lo diga**

- [ ] **Experiencia**: su web vieja decía «2 años» (texto de 2024). ¿Desde
      cuándo? Iría en Quiénes somos y en la FAQ
- [ ] **«Tarifas premium»**: estaba en su «Por qué elegirnos». ¿Qué quería
      decir? No se puso porque suena a caro
- [ ] **Dirección**: fuera del aviso legal sólo sale la localidad, porque es su
      casa. ¿La quiere completa?

## Lanzamiento

- [ ] Registros DNS del `.net` hacia Vercel **sin tocar el MX ni el SPF**
      (`docs/dominio.md`)
- [ ] Comprobar con `curl` que el dominio sirve esta web y **entonces**
      cambiar `dominioPublico` en `src/datos/sitio.ts`
- [ ] Mandar un correo de prueba a `info@` y ver que llega
- [ ] Actualizar el enlace de la web en su ficha de Google y en sus redes
- [ ] **No borrar la cuenta de Webador**: con ella se iría el correo `info@`,
      que es también el de su cuenta de Vercel. Si algún día se deja Webador,
      antes se mueve el buzón a otro proveedor

## Ya decidido (no volver a preguntar)

- **Diseño**: validado por Frank. Foto de portada de Unsplash, acreditada
- **Zonas**: 18 localidades por áreas (Kevin, con sus dos listas y dónde
  trabaja de verdad)
- **Correo**: `info@` muere si se borra la cuenta de Webador → no se borra
- **NIF**: no se pone (Kevin)
- **Logo**: se queda el actual, sin versión vectorial. **Fotos**: no hay más
  por ahora
- **Nota de Google**: 4,9 con 68, revisada por Kevin el 16 sept 2026. Va a
  mano: mirarla de vez en cuando
- **Fuera**: formularios, blog, redirecciones desde la web vieja, Google
  Search Console, revisión en un iPhone real y revisión de accesibilidad a
  fondo (Lighthouse ya da 100)

## Hecho (16 sept 2026, dos sesiones)

- Inventario de la web vieja y decisión página a página
- Repositorio público con despliegue automático en su Vercel
- Primer diseño sobrio; Frank no lo quiso y se rehízo con color, tarjetas y
  WhatsApp en verde. Validado
- Páginas: portada, servicios, zonas, quiénes somos, preguntas, contacto,
  trabaja con nosotros, legales y 404; sitemap y robots
- Presupuesto y candidatura guiados por WhatsApp o correo, sin formularios
- Menú del móvil a pantalla completa que cabe sin desplazarse; barra de
  contacto en el móvil; navegación sin animación
- Lighthouse en móvil: accesibilidad 100, rendimiento 96–99. Imágenes AVIF
- Sin cookies, analítica ni peticiones a terceros (comprobado)
- Lectura de su contabilidad (`docs/privado/negocio.md`) y contenido alineado
  con cómo trabaja
