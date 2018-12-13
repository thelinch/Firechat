import { TestBed, inject } from '@angular/core/testing';

import { IndiceService } from './indice.service';

describe('IndiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndiceService]
    });
  });

  it('should be created', inject([IndiceService], (service: IndiceService) => {
    expect(service).toBeTruthy();
  }));
});
