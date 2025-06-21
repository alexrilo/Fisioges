import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { Paciente } from '../../../domain/models/Paciente';
import { Evolucion } from '../../../domain/models/Evolucion';
import { CommonModule } from '@angular/common';
import { EvolucionFormComponent } from '../evolucion-form/evolucion-form.component';

@Component({
  selector: 'app-historial-evoluciones',
  standalone: true,
  imports: [CommonModule, EvolucionFormComponent],
  templateUrl: './historial-evoluciones.component.html',
  styleUrl: './historial-evoluciones.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HistorialEvolucionesComponent {
  paciente = input<Paciente>();
  evoluciones = input<Evolucion[]>();
  cerrarHistorial = output<void>();

  evolucionSelected: Evolucion | null = null;

  selectEvolucion(evolucion: Evolucion) {
    this.evolucionSelected = evolucion;
  }

  cerrar() {
    this.cerrarHistorial.emit();
  }
}
