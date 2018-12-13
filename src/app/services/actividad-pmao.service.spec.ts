import { TestBed, inject } from '@angular/core/testing';

import { ActividadPmaoService } from './actividad-pmao.service';

describe('ActividadPmaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActividadPmaoService]
    });
  });

  it('should be created', inject([ActividadPmaoService], (service: ActividadPmaoService) => {
    expect(service).toBeTruthy();
  }));
});
