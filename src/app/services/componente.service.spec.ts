import { TestBed, inject } from '@angular/core/testing';

import { ComponenteService } from './componente.service';

describe('ComponenteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponenteService]
    });
  });

  it('should be created', inject([ComponenteService], (service: ComponenteService) => {
    expect(service).toBeTruthy();
  }));
});
