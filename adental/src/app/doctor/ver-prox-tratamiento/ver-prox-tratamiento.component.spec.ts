import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProxTratamientoComponent } from './ver-prox-tratamiento.component';

describe('VerProxTratamientoComponent', () => {
  let component: VerProxTratamientoComponent;
  let fixture: ComponentFixture<VerProxTratamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerProxTratamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerProxTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
