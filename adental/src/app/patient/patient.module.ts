import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { BillsComponent } from './bills/bills.component';



@NgModule({
  declarations: [SidebarComponent, ProfileComponent, AppointmentsComponent, BillsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ProfileComponent,
    SidebarComponent,
    AppointmentsComponent,
    BillsComponent
  ]
})
export class PatientModule { }
