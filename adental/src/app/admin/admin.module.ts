import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { EstadisticasAdminComponent } from './estadisticas-admin/estadisticas-admin.component';



@NgModule({
  declarations: [SidebarAdminComponent, EstadisticasAdminComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
