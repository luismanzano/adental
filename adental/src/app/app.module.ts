

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AngularFireModule} from '@angular/fire' ;
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import  {environment} from '../environments/environment';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponentDoctor } from './doctor/profile_doctor/profile.component';
import { EnviarMensajeComponent } from './doctor/enviar-mensaje/enviar-mensaje.component';
import { NuevoPacienteComponent } from './doctor/nuevo-paciente/nuevo-paciente.component';
import { AppointmentsComponent } from './patient/appointments/appointments.component';
import { BillsComponent } from './patient/bills/bills.component';
import { PaymentComponent } from './patient/payment/payment.component';
import { ProfileComponent } from './patient/profile/profile.component';
import {HomeModule} from './component/home/home.module';
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";

const rutas: Routes = [
  {path: 'perfil-doctor', component:ProfileComponentDoctor},
  {path: 'enviar-mensaje', component:EnviarMensajeComponent},
  {path:'nuevo-paciente', component:NuevoPacienteComponent},
  {path: 'citas', component:AppointmentsComponent},
  {path: 'consultas', component:BillsComponent},
  {path: 'pagos', component:PaymentComponent},
  {path:'perfil-paciente', component:ProfileComponent}


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
    RouterModule.forRoot(rutas),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    HomeModule
  ],
  providers: [AngularFirestore, AngularFirestoreModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
