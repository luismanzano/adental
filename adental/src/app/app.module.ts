

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
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const rutas: Routes = [
  {path: 'perfil-doctor', component: ProfileComponentDoctor},
  {path: 'enviar-mensaje/:id', component: EnviarMensajeComponent},
  {path: 'citas-doctor', component: AppointmentsDoctorComponent},
  {path:'nuevo-paciente', component:NuevoPacienteComponent},
  {path: 'citas', component:AppointmentsComponent},
  {path: 'mis-pacientes', component:MisPacientesComponent},
  {path: 'facturas', component:BillsComponent},
  {path: 'pagos/:id', component:PaymentComponent},
  {path:'perfil-paciente', component:ProfileComponent},
  {path: 'estadisticas', component: EstadisticasAdminComponent},
  {path: 'nuevo-usuario', component: UsuariosAdminComponent},
  {path: 'usuarios', component: AllUsersComponent},
  {path: 'registrar-consulta/:id', component: RegistrarConsultaComponent},
  {path: 'paciente-perfil/:id', component: PerfilPacienteComponent},
  {path: 'consulta/:id', component: VerConsultaComponent},

];
import { AdminModule2 } from './admin2/admin.module';
import { EstadisticasAdminComponent } from './admin2/estadisticas-admin/estadisticas-admin.component';
import { UsuariosAdminComponent } from './admin2/usuarios-admin/usuarios-admin.component';
import { MisPacientesComponent } from './doctor/mis-pacientes/mis-pacientes.component';
import { RegistrarConsultaComponent } from './doctor/registrar-consulta/registrar-consulta.component';
import { PerfilPacienteComponent } from './doctor/perfil-paciente/perfil-paciente.component';
import {AllUsersComponent} from './admin2/all-users/all-users.component';
import { VerConsultaComponent } from './doctor/ver-consulta/ver-consulta.component';
import {AppointmentsDoctorComponent} from './doctor/appointments-doctor/appointments-doctor.component';

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
    HomeModule,
    AdminModule2,
    AngularFireStorageModule,
    BrowserAnimationsModule
  ],
  providers: [AngularFirestore, AngularFirestoreModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
