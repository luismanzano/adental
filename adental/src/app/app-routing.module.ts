import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientModule } from './patient/patient.module';


const routes: Routes = [{ path: 'home', loadChildren: () => import('./component/home/home.module').then(m => m.HomeModule) }, { path: 'sidebar', loadChildren: () => import('./component/patient/sidebar/sidebar.module').then(m => m.SidebarModule) }, { path: 'profile', loadChildren: () => import('./component/patient/profile/profile.module').then(m => m.ProfileModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes), PatientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
