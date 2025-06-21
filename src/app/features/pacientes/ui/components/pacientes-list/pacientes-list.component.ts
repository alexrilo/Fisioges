import { Component, inject, OnInit, signal } from '@angular/core';
import { Paciente } from '../../../domain/models/Paciente';
import { GetAllPacientesService } from '../../../application/use-cases/get-all-pacientes.service';
import { EvolucionFormComponent } from '../evolucion-form/evolucion-form.component';
import { AddEvolucionService } from '../../../application/use-cases/add-evolucion.service';
import { Evolucion } from '../../../domain/models/Evolucion';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { HistorialEvolucionesComponent } from '../historial-evoluciones/historial-evoluciones.component';

@Component({
  selector: 'app-pacientes-list',
  standalone: true,
  imports: [CommonModule, EvolucionFormComponent, HistorialEvolucionesComponent],
  templateUrl: './pacientes-list.component.html',
  styleUrl: './pacientes-list.component.css'
})
export class PacientesListComponent implements OnInit {
  private getAll = inject(GetAllPacientesService);
  private addFormularioEvolucion = inject(AddEvolucionService);
  evolucionSelected: Evolucion | null = null;
  mostrarHistorial = false;
  loading = signal(true);
  pacientes = toSignal(
    this.getAll.execute().pipe(
      tap(() => this.loading.set(false)),
      catchError((err) => {
        console.error('Error al recuperar pacientes', err);
        this.loading.set(false);
        return of([]); // devuelve un array vacío si hay error
      })
    ),
    { initialValue: [] }
  );

  acciones = [
    {
      label: 'Ver historial',
      callback: (paciente: Paciente) => this.openHistorial(paciente),
      disabled: false
    },
    {
      label: 'Añadir evolución',
      callback: (paciente: Paciente) => this.abrirFormularioCrearEvolucion(paciente),
      disabled: false
    },
    {
      label: 'Ver última sesión',
      callback: (paciente: Paciente) => this.verUltimaEvolucion(paciente),
      disabled: false
    }
  ];

  formularioVisible = false;
  pacienteSeleccionado: Paciente | null = null;

  abrirFormularioCrearEvolucion(paciente: Paciente) {
    this.evolucionSelected = null;
    this.formularioVisible = true;
    this.pacienteSeleccionado = paciente;
  }

  verUltimaEvolucion(paciente: Paciente) {
    this.evolucionSelected = paciente.evoluciones[paciente.evoluciones.length - 1];
    if (this.evolucionSelected) {
      this.formularioVisible = true;
      this.pacienteSeleccionado = paciente;
    } else {
      alert('No tiene evoluciones');
    }
  }

  ngOnInit() { }

  onGuardarEvolucion(evolucion: Evolucion, paciente: Paciente) {
    this.loading.set(true);
    this.addFormularioEvolucion.execute(paciente.id, evolucion).pipe(
      finalize(() => this.loading.set(false))
    ).subscribe(() => {
      this.formularioVisible = false;
      this.pacienteSeleccionado = null;
    });
  }

  onCancelarFormulario() {
    this.formularioVisible = false;
    this.pacienteSeleccionado = null;
  }


  openHistorial(paciente: Paciente) {
    this.pacienteSeleccionado = paciente;
    this.mostrarHistorial = true;
  }
}
