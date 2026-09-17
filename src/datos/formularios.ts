// Lo que comparten los formularios que llegan por correo (presupuesto y
// candidatura) en el navegador y en el servidor (src/acciones/).

export type EstadoEnvio =
  | { estado: "inicial" }
  | { estado: "enviado" }
  | { estado: "error"; mensaje: string };

// Por debajo de esto, quien lo rellena es un programa.
export const tiempoMinimo = 3000;

// Candidatura
export const disponibilidades = ["Mañanas", "Tardes", "Fines de semana"] as const;
