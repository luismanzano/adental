import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { EstadisticasAdminComponent } from './estadisticas-admin/estadisticas-admin.component';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';



@NgModule({
  declarations: [SidebarAdminComponent, EstadisticasAdminComponent, UsuariosAdminComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
