# Pendiente

## Plan de trabajo (acordado el 16 sept 2026)

Paso a paso, sin prisa. Cada paso se cierra antes de abrir el siguiente.

1. [x] **Decidir qué contenido de la web vieja se queda**, página a página
       (`docs/sitio-actual.md`, *Decisión por página*)
2. [ ] **Integrarlo** en la web nueva (sin redirecciones), página a página.
       Menú: Inicio · Servicios · Zonas · Quiénes somos · Preguntas frecuentes ·
       Contacto. Trabaja con nosotros y los legales, en el pie. Opiniones se
       queda como sección de la portada.
   - [x] Menú para tablet y móvil, página actual marcada, enlaces en el pie
   - [ ] `/nuestros-servicios`
   - [ ] `/contacto` (nueva: lo mismo que la sección de contacto, en su página)
   - [x] `/preguntas-frecuentes` (ya es la plantilla de las demás)
   - [ ] `/quienes-somos`
   - [ ] `/trabaja-con-nosotros`
   - [ ] `/zonas-de-servicio` (espera la lista buena)
   - [ ] `/aviso-legal`, `/politica-de-privacidad`, `/politica-de-cookies`
         (esperan su NIF)
3. [ ] **Iterar**: mejorar, optimizar
4. [ ] **Mirar `../limpiezas-imperio-software/`** para entender mejor el
       negocio. Proyecto aparte e independiente: se lee para entender, **nada
       de sus datos entra aquí** (este repositorio es público)

## 0. Contexto

- [x] `CLAUDE.md`, `README.md`, `docs/`, `todo.md`
- [x] Inventario de la web actual → `docs/sitio-actual.md`
- [x] Remoto `origin` → `limpiezas-el-imperio/web`
- [x] Primer commit y push a `main`
- [x] Repositorio público (necesario para desplegar desde Hobby)
- [x] Proyecto en su Vercel enlazado al repo; push → despliegue comprobado
      (https://limpiezaselimperio.vercel.app)

## 1. Preguntas para Frank

- [x] ¿Dónde está registrado el `.net`? En Webador
- [ ] **Dominio**: ¿compra el `.com`? ¿El buzón `info@` lo da Webador?
      (`docs/dominio.md`)
- [ ] **NIF**: falta en el aviso legal y la ley lo exige
- [ ] **Zonas**: la web tiene dos listas distintas, ¿cuál es la buena?
- [ ] **Reseñas**: «más de 60 reseñas y 4,9», ¿de Google? Su ficha:
      https://maps.app.goo.gl/fVZXBH8RQqnJXfyp9 (comprobar ahí la cifra)
- [ ] **Experiencia**: la web dice «2 años» (texto de 2024). ¿Desde cuándo?
      Cuando lo diga, vuelve como pregunta en `src/datos/preguntas.ts`
- [ ] **Urgencias**: «siempre que el cliente asuma el coste». ¿Cuesta más que
      un servicio normal? Para decirlo claro en la FAQ
- [ ] **Servicios**: la lista tiene 26 y un duplicado. ¿Siguen todos? ¿Se
      agrupan? ¿Reparaciones eléctricas sigue siendo cosa suya?
- [x] **Formularios**: ninguno por ahora. Contacto por WhatsApp, teléfono y
      correo
- [x] **Material**: logo en `public/` (ver `docs/sitio-actual.md`, *Imágenes*).
      Las imágenes de su web son todas generadas con IA
- [ ] **Material**: ¿logo vectorial o sin el teléfono dentro?
- [x] **Blog**: fuera (relleno generado)
- [ ] **Trabaja con nosotros**: ¿sigue buscando gente así?
- [ ] **Cobro**: la hoja de servicio dice mínimo de 4 horas, desplazamiento y
      vaporeta aparte. ¿Se puede decir algo de eso en la web?
- [ ] **Logo sin teléfono** en más resolución (el de su web es de 526 px)
- [ ] **Redes**: LinkedIn apunta a un enlace roto; ¿cuáles están vivas?

## 2. Decisiones técnicas

- [x] CSS: plano, como en la contabilidad
- [x] Formularios: ninguno por ahora
- [x] **Despliegue automático**: repositorio público (ver `CLAUDE.md`,
      *Despliegue*)
- [x] Mapa de rutas: `docs/sitio-actual.md`, *Decisión por página*. Sin 301
- [ ] Textos legales rehechos para este negocio (aviso legal, privacidad,
      cookies) y banner de cookies sólo si hay algo que lo exija

## 3. Diseño y construcción

- [x] Dirección visual: paleta del logo, Fraunces + Figtree, la estrella del logo
      como único adorno
- [x] Portada: qué hace, servicios agrupados, cómo trabaja, zonas, opiniones y
      contacto. Metadatos, iconos, Open Graph y `LocalBusiness`
- [ ] Que él vea la portada: agrupación de servicios, zonas (sólo las que están
      en las dos listas), las tres opiniones elegidas
- [ ] Pie: enlaces a aviso legal, privacidad y cookies cuando existan
- [ ] Servicios, zonas, quiénes somos, opiniones, contacto/presupuesto
- [ ] SEO: títulos y descripciones por página, `sitemap`, `robots`, datos
      estructurados `LocalBusiness`, Open Graph
- [ ] Revisión en móvil real (Safari)

## 4. Lanzamiento

- [ ] Dominio conectado y HTTPS
- [ ] Correo `info@` comprobado después del cambio
- [ ] Actualizar Google Business Profile y redes
