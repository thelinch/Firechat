import { TestBed, async, inject } from '@angular/core/testing';

import { PersonaGuard } from './persona.guard';

describe('PersonaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonaGuard]
    });
  });

  it('should ...', inject([PersonaGuard], (guard: PersonaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
