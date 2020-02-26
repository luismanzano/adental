import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosAdmin2Component } from './usuarios-admin2.component';

describe('UsuariosAdmin2Component', () => {
  let component: UsuariosAdmin2Component;
  let fixture: ComponentFixture<UsuariosAdmin2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosAdmin2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosAdmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
