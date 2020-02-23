import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { AppointmentsComponent } from './appointments/appointments.component';



@NgModule({
  declarations: [SidebarComponent, ProfileComponent, AppointmentsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ProfileComponent,
    SidebarComponent
  ]
})
export class PatientModule { }
