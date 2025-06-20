import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Evolucion } from '../../../domain/models/Evolucion';
import { CommonModule } from '@angular/common';
import { Paciente } from '../../../domain/models/Paciente';

@Component({
  selector: 'app-evolucion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './evolucion-form.component.html',
  styleUrl: './evolucion-form.component.css'
})
export class EvolucionFormComponent implements OnInit {
  form!: FormGroup;
    // ✅ Input como signal
  paciente = input<Paciente>();
  guardarEvolucion = output<Evolucion>();
  cancelarFormulario = output<void>();

  // ✅ Campos del formulario como signals
  fecha = signal('');
  descripcion = signal('');

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      fecha: [null, Validators.required],
      descripcion: ['', Validators.required],
    });
  }


  onSubmit() {
    if (this.form.valid) {
      const nuevaEvolucion: Evolucion = {
        id: crypto.randomUUID(),
        fecha: new Date(this.form.value.fecha),
        descripcion: this.form.value.descripcion,
      };

      this.guardarEvolucion.emit(nuevaEvolucion);
      this.form.reset();
    }
  }

  cancelar() {
    this.form.reset();
    this.cancelarFormulario.emit();
  }
}
