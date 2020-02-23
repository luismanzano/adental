import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { DoctorModule } from './doctor/doctor.module';
<<<<<<< HEAD
=======
import { SidebarModule } from './component/patient/sidebar/sidebar.module';
>>>>>>> origin/luisfer
=======
import { SidebarModule } from './components/patient/sidebar/sidebar.module';
>>>>>>> origin/luisfer

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DoctorModule,
    SidebarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
