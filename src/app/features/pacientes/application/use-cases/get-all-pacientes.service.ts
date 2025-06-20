import { Inject, Injectable } from '@angular/core';
import { PACIENTE_REPOSITORY } from '../../infrastructure/tokens/paciente-injection.token';
import { PacienteRepository } from '../../domain/repositories/PacienteRepository';

@Injectable({
  providedIn: 'root'
})
export class GetAllPacientesService {

  constructor(@Inject(PACIENTE_REPOSITORY) private repo: PacienteRepository) { }

  execute() {
    return this.repo.getAll();
  }
}
