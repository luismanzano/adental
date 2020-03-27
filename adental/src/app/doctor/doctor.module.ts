import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponentDoctor } from './profile_doctor/profile.component';
import { SidebarDoctorComponent } from './sidebar-doctor/sidebar-doctor.component';
import { NuevoPacienteComponent } from './nuevo-paciente/nuevo-paciente.component';
import { EnviarMensajeComponent } from './enviar-mensaje/enviar-mensaje.component';
import { MisPacientesComponent } from './mis-pacientes/mis-pacientes.component';
import { RegistrarConsultaComponent } from './registrar-consulta/registrar-consulta.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { ProxTratamientosComponent } from './prox-tratamientos/prox-tratamientos.component';
import { RecipeComponent } from './recipe/recipe.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PerfilPacienteComponent } from './perfil-paciente/perfil-paciente.component';
import { VerConsultaComponent } from './ver-consulta/ver-consulta.component';
import { AppointmentsDoctorComponent } from './appointments-doctor/appointments-doctor.component';
import { PatientModule } from '../patient/patient.module';








@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [ProfileComponentDoctor, SidebarDoctorComponent, NuevoPacienteComponent, EnviarMensajeComponent, MisPacientesComponent, RegistrarConsultaComponent, TratamientoComponent, ProxTratamientosComponent, RecipeComponent, PerfilPacienteComponent, VerConsultaComponent, AppointmentsDoctorComponent],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PatientModule
  ],
  exports: [
    ProfileComponentDoctor,
    SidebarDoctorComponent,
    NuevoPacienteComponent,
    EnviarMensajeComponent,
    MisPacientesComponent,
    TratamientoComponent,
    RegistrarConsultaComponent,
    ProxTratamientosComponent,
    RecipeComponent,
    PerfilPacienteComponent,
    VerConsultaComponent,
    AppointmentsDoctorComponent
  ]
})
export class DoctorModule { }
