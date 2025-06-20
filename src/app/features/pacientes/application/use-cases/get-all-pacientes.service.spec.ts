import { TestBed } from '@angular/core/testing';

import { GetAllPacientesService } from './get-all-pacientes.service';

describe('GetAllPacientesService', () => {
  let service: GetAllPacientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllPacientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
