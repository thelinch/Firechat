import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametroMapeoComponent } from './parametro-mapeo.component';

describe('ParametroMapeoComponent', () => {
  let component: ParametroMapeoComponent;
  let fixture: ComponentFixture<ParametroMapeoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametroMapeoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametroMapeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
