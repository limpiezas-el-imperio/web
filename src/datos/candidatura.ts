// Lo que comparten el formulario de candidatura (cliente) y la acción que la
// manda por correo (servidor).

export const disponibilidades = ["Mañanas", "Tardes", "Fines de semana"] as const;

export type EstadoCandidatura =
  | { estado: "inicial" }
  | { estado: "enviada" }
  | { estado: "error"; mensaje: string };

// Por debajo de esto, quien lo rellena es un programa.
export const tiempoMinimo = 3000;
