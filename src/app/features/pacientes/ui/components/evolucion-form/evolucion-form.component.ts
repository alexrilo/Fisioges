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
  evolucion = input<Evolucion | null>();

  // ✅ Campos del formulario como signals
  fecha = signal('');
  descripcion = signal('');

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      fecha: [null, Validators.required],
      descripcion: ['', Validators.required],
    });
    const evo = this.evolucion();
    if (evo) {
      this.form.setValue({
        fecha: this.toInputDateFormat(evo.fecha),
        descripcion: evo.descripcion
      });
      this.form.disable();
    }
  }

  private toInputDateFormat(date: Date | string): string {
    const d = new Date(date);
    return d.toISOString().substring(0, 10); // yyyy-mm-dd
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

  activarMicrofono() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Tu navegador no soporta reconocimiento de voz.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES'; // Cambia al idioma que necesites
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const descripcionActual = this.form.get('descripcion')?.value || '';
      this.form.get('descripcion')?.setValue(descripcionActual + ' ' + transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Error de reconocimiento:', event.error);
    };

    recognition.start();
  }
}
