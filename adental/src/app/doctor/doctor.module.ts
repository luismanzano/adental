import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponentDoctor } from './profile_doctor/profile.component';
import { SidebarDoctorComponent } from './sidebar-doctor/sidebar-doctor.component';
import { NuevoPacienteComponent } from './nuevo-paciente/nuevo-paciente.component';
import { EnviarMensajeComponent } from './enviar-mensaje/enviar-mensaje.component';
import { MisPacientesComponent } from './mis-pacientes/mis-pacientes.component';





@NgModule({
  declarations: [ProfileComponentDoctor, SidebarDoctorComponent, NuevoPacienteComponent, EnviarMensajeComponent, MisPacientesComponent],
  imports: [
    CommonModule
  ],
  exports:[
    ProfileComponentDoctor,
    SidebarDoctorComponent,
    NuevoPacienteComponent,
    EnviarMensajeComponent,
    MisPacientesComponent,
  ]
})
export class DoctorModule { }
