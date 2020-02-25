import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DoctorModule,
    PatientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
