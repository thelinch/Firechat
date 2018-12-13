import { TestBed, inject } from '@angular/core/testing';

import { IncidenciaService } from './incidencia.service';

describe('IncidenciaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncidenciaService]
    });
  });

  it('should be created', inject([IncidenciaService], (service: IncidenciaService) => {
    expect(service).toBeTruthy();
  }));
});
