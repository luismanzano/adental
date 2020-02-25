import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { BillsComponent } from './bills/bills.component';
import { PaymentComponent } from './payment/payment.component';



@NgModule({
  declarations: [SidebarComponent, ProfileComponent, AppointmentsComponent, BillsComponent, PaymentComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ProfileComponent,
    SidebarComponent,
    AppointmentsComponent,
    BillsComponent,
    PaymentComponent
  ]
})
export class PatientModule { }
