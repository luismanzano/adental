import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { EstadisticasAdminComponent } from './estadisticas-admin/estadisticas-admin.component';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { FormsModule} from '@angular/forms';
import { AllUsersComponent } from './all-users/all-users.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [SidebarAdminComponent, EstadisticasAdminComponent, UsuariosAdminComponent, AllUsersComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    SidebarAdminComponent,
    EstadisticasAdminComponent,
    UsuariosAdminComponent,
    AllUsersComponent
  ]
})
export class AdminModule2 { }
