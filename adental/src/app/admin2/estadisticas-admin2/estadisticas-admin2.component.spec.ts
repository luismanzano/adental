import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasAdmin2Component } from './estadisticas-admin2.component';

describe('EstadisticasAdmin2Component', () => {
  let component: EstadisticasAdmin2Component;
  let fixture: ComponentFixture<EstadisticasAdmin2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasAdmin2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasAdmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
