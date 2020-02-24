import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UsuariosAdminComponent } from './admin/usuarios-admin/usuarios-admin.component';
import { EstadisticasAdminComponent } from './admin/estadisticas-admin/estadisticas-admin.component';



@NgModule({
  declarations: [
    AppComponent,
    UsuariosAdminComponent,
    EstadisticasAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
