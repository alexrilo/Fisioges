import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolucionFormComponent } from './evolucion-form.component';

describe('EvolucionFormComponent', () => {
  let component: EvolucionFormComponent;
  let fixture: ComponentFixture<EvolucionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolucionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolucionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
