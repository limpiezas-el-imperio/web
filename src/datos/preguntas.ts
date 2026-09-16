// Las preguntas frecuentes de su web (docs/sitio-actual.md), corregidas y
// tuteando como el resto de la web. Lo que se quitó y por qué:
// - «¿Qué experiencia tenéis?»: decía «2 años» y es un texto de 2024. Vuelve
//   cuando él diga desde cuándo.
// - «¿Por dónde nos encontráis?»: una lista de 13 canales sin enlaces. Las
//   redes que funcionan ya están en el pie.
// - «A través del sitio web» como forma de reservar: ya no hay formularios.
//
// `respuesta` es texto plano porque también va en los datos estructurados.

import { horario, negocio, zonas } from "./negocio";

export type Pregunta = {
  pregunta: string;
  respuesta: string;
  enlace?: { href: string; texto: string };
};

export const preguntas: Pregunta[] = [
  {
    pregunta: "¿Qué servicios ofrecéis?",
    respuesta:
      "Limpiamos pisos, casas y chalets, comunidades, oficinas, locales comerciales, obras y parkings. Hacemos limpieza general, regular y profunda, de cristales, ventanas y persianas, y también pequeñas reparaciones.",
    enlace: { href: "/nuestros-servicios", texto: "Ver todos los servicios" },
  },
  {
    pregunta: "¿Cuánto cuesta una limpieza?",
    respuesta:
      "Depende del trabajo que haya que hacer y de cómo lo contrates: por hora, por servicio o con un paquete mensual. Cuéntanos qué necesitas y te damos presupuesto.",
  },
  {
    pregunta: "¿Qué productos utilizáis?",
    respuesta:
      "Productos para todo tipo de superficies: suelos, encimeras, aseos… También usamos los productos ecológicos de Ecojim. Los materiales y los productos van incluidos en el servicio.",
  },
  {
    pregunta: "¿Cada cuánto conviene hacer una limpieza?",
    respuesta:
      "Lo decides tú, según lo que necesites: a diario, cada semana, cada quince días o cada mes. Lo importante es que cada mes se haga una limpieza profunda.",
  },
  {
    pregunta: "¿Hacéis limpiezas de urgencia?",
    respuesta:
      "Sí, tenemos servicio de limpieza de urgencia, siempre que el cliente asuma el coste del servicio.",
  },
  {
    pregunta: "¿Cómo reservo una limpieza?",
    respuesta:
      "Escríbenos por WhatsApp, llámanos o mándanos un correo. Dinos qué hay que limpiar, dónde y cuándo, y lo organizamos.",
    enlace: { href: "/contacto", texto: "Ver formas de contacto" },
  },
  {
    pregunta: "¿En qué zonas trabajáis?",
    respuesta: `Salimos desde ${negocio.localidad} y trabajamos en el Camp de Túria, Valencia y alrededores: ${zonas.filter((z) => z !== negocio.localidad).join(", ")}. Si no ves tu zona, pregúntanos.`,
  },
  {
    pregunta: "¿Qué horario tenéis?",
    respuesta: `${horario.semana}. ${horario.finDeSemana}.`,
  },
];
