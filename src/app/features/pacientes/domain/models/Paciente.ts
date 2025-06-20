import { Evolucion } from "./Evolucion";

export interface Paciente {
  id: string;
  nombre: string;
  dni: string;
  fechaNacimiento: Date;
  evoluciones: Evolucion[]; // Aquí puedes definir un tipo más específico si lo deseas
}
