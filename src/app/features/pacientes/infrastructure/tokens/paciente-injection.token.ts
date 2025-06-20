import { InjectionToken } from '@angular/core';
import { PacienteRepository } from '../../domain/repositories/PacienteRepository';

export const PACIENTE_REPOSITORY = new InjectionToken<PacienteRepository>('PacienteRepository');
