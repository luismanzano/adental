import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxTratamientosComponent } from './prox-tratamientos.component';

describe('ProxTratamientosComponent', () => {
  let component: ProxTratamientosComponent;
  let fixture: ComponentFixture<ProxTratamientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProxTratamientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxTratamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
