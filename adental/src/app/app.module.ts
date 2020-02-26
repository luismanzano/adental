import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AngularFireModule} from '@angular/fire' ;
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireAuthStorage} from '@angular/fire/storage';
import  {environment} from '../environments/environment';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorModule } from './doctor/doctor.module';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DoctorModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireAuthStorage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
