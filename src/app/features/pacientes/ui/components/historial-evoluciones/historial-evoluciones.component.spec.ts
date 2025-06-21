import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialEvolucionesComponent } from './historial-evoluciones.component';

describe('PacienteCardComponent', () => {
  let component: HistorialEvolucionesComponent;
  let fixture: ComponentFixture<HistorialEvolucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialEvolucionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialEvolucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
