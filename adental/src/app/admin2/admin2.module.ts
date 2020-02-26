import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarAdmin2Component } from './sidebar-admin2/sidebar-admin2.component';
import { EstadisticasAdmin2Component } from './estadisticas-admin2/estadisticas-admin2.component';
import { UsuariosAdmin2Component } from './usuarios-admin2/usuarios-admin2.component';



@NgModule({
  declarations: [SidebarAdmin2Component, EstadisticasAdmin2Component, UsuariosAdmin2Component],
  imports: [
    CommonModule
  ]
})
export class Admin2Module { }
