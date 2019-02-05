import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadIAComponent } from './actividad-ia.component';

describe('AtividadIAComponent', () => {
  let component: ActividadIAComponent;
  let fixture: ComponentFixture<ActividadIAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadIAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
