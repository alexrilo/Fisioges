import { Inject, Injectable } from "@angular/core";
import { PACIENTE_REPOSITORY } from "../../infrastructure/tokens/paciente-injection.token";
import { PacienteRepository } from "../../domain/repositories/PacienteRepository";
import { Evolucion } from "../../domain/models/Evolucion";

@Injectable({
  providedIn: 'root'
})
export class AddEvolucionService {

  constructor(@Inject(PACIENTE_REPOSITORY) private repo: PacienteRepository) { }

  execute(pacienteId: string, evolucion: Evolucion) {
    return this.repo.addEvolucion(pacienteId, evolucion);
  }
}
