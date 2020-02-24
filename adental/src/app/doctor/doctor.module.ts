import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile_doctor/profile.component';
import { SidebarDoctorComponent } from './sidebar-doctor/sidebar-doctor.component';
import { NuevoPacienteComponent } from './nuevo-paciente/nuevo-paciente.component';



@NgModule({
  declarations: [ProfileComponent, SidebarDoctorComponent, NuevoPacienteComponent],
  imports: [
    CommonModule
  ],
  exports:[
    ProfileComponent,
    SidebarDoctorComponent,
    NuevoPacienteComponent
  ]
})
export class DoctorModule { }
