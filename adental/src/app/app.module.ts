import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { RouterModule, Routes } from '@angular/router';
import { NuevoPacienteComponent } from './doctor/nuevo-paciente/nuevo-paciente.component';
import { ProfileComponentDoctor } from './doctor/profile_doctor/profile.component';
import { EnviarMensajeComponent } from './doctor/enviar-mensaje/enviar-mensaje.component';
import { AppointmentsComponent } from './patient/appointments/appointments.component';
import { BillsComponent } from './patient/bills/bills.component';
import { PaymentComponent } from './patient/payment/payment.component';
import { ProfileComponent } from './patient/profile/profile.component';


const rutas: Routes = [
  {path: 'nuevo-paciente', component: NuevoPacienteComponent},
  {path: 'perfil-doctor', component: ProfileComponentDoctor},
  {path: 'enviar-mensaje', component: EnviarMensajeComponent},
  {path: 'citas', component:AppointmentsComponent},
  {path: 'consultas', component:BillsComponent},
  {path: 'pagos', component:PaymentComponent},
  {path: 'perfil-paciente', component:ProfileComponent}
]

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DoctorModule,
    PatientModule,
    RouterModule.forRoot(rutas) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
