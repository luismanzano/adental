import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { SidebarComponent } from './sidebar.component';


@NgModule({
  declarations: [SidebarComponent],
<<<<<<< HEAD
  exports: [SidebarComponent],
  imports: [
    CommonModule,
    SidebarComponent
=======
  imports: [
    CommonModule,
    SidebarRoutingModule
>>>>>>> origin/luisfer
  ]
})
export class SidebarModule { }
