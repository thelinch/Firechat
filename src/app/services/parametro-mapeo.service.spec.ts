import { TestBed, inject } from '@angular/core/testing';

import { ParametroMapeoService } from './parametro-mapeo.service';

describe('ParametroMapeoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParametroMapeoService]
    });
  });

  it('should be created', inject([ParametroMapeoService], (service: ParametroMapeoService) => {
    expect(service).toBeTruthy();
  }));
});
