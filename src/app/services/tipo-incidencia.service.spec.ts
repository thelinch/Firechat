import { TestBed, inject } from '@angular/core/testing';

import { TipoIncidenciaService } from './tipo-incidencia.service';

describe('TipoIncidenciaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoIncidenciaService]
    });
  });

  it('should be created', inject([TipoIncidenciaService], (service: TipoIncidenciaService) => {
    expect(service).toBeTruthy();
  }));
});
