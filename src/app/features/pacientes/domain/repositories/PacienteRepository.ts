import { Observable } from "rxjs";
import { Paciente } from "../models/Paciente";

export abstract class PacienteRepository {
  abstract getAll(): Observable<Paciente[]>;
  abstract create(paciente: Paciente): Observable<void>;
  abstract addEvolucion(pacienteId: string, evolucion: any): Observable<void>;
  abstract getByDni(dni: string): Observable<Paciente | null>;
}
