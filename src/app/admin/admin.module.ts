import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';



@NgModule({
  declarations: [ SidebarAdminComponent ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarAdminComponent
  ]

})
export class AdminModule { }
