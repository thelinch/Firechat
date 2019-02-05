import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadIAComponent } from './atividad-ia.component';

describe('AtividadIAComponent', () => {
  let component: AtividadIAComponent;
  let fixture: ComponentFixture<AtividadIAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtividadIAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
