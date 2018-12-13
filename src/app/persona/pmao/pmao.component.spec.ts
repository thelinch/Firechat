import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmaoComponent } from './pmao.component';

describe('PmaoComponent', () => {
  let component: PmaoComponent;
  let fixture: ComponentFixture<PmaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
