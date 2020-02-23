import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SidebarDoctorComponent } from './sidebar-doctor/sidebar-doctor.component';



@NgModule({
  declarations: [ProfileComponent, SidebarDoctorComponent],
  imports: [
    CommonModule
  ],
  exports:[
    ProfileComponent,
    SidebarDoctorComponent
  ]
})
export class DoctorModule { }
