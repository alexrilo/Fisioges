import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../../domain/models/Paciente';
import { PacienteRepository } from '../../domain/repositories/PacienteRepository';
import { delay, Observable, of } from 'rxjs';
import { Evolucion } from '../../domain/models/Evolucion';

@Injectable()
export class PacienteApiService implements PacienteRepository {

  private pacientes: Paciente[] = [
    {
      id: '1',
      nombre: 'Ana Torres',
      dni: '12345678A',
      fechaNacimiento: new Date(1985, 5, 12),
      evoluciones: []
    },
    {
      id: '2',
      nombre: 'Luis Ramírez',
      dni: '23456789B',
      fechaNacimiento: new Date(1990, 9, 20),
      evoluciones: []
    },
    {
      id: '3',
      nombre: 'María López',
      dni: '34567890C',
      fechaNacimiento: new Date(1978, 2, 5),
      evoluciones: []
    }
  ];

  constructor(private http: HttpClient) { }

  addEvolucion(pacienteId: string, evolucion: Evolucion): Observable<void> {
    const paciente = this.pacientes.find(p => p.id === pacienteId);
    if (paciente) {
      paciente.evoluciones.push(evolucion);
      return of(void 0).pipe(delay(500));
    }
    return of(void 0).pipe(delay(500));
  }

  getByDni(dni: string): Observable<Paciente | null> {
    const paciente = this.pacientes.find(p => p.dni === dni);
    return of(paciente ?? null).pipe(delay(500));
  }

  getAll() {
    //return this.http.get<Paciente[]>('/api/pacientes');
    return of(this.pacientes).pipe(delay(1000)); // Simula un retraso de 1 segundo
  }

  create(paciente: Paciente): Observable<void> {
    //return this.http.post<void>('/api/pacientes', paciente);
    this.pacientes.push({ ...paciente, id: (this.pacientes.length + 1).toString() });
    return of(void 0).pipe(delay(1000)); // Simula un retraso de 1 segundo
  }
}
