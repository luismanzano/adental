import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


<<<<<<< HEAD
const routes: Routes = [{ path: 'home', loadChildren: () => import('./component/home/home.module').then(m => m.HomeModule) }, { path: 'sidebar', loadChildren: () => import('./component/patient/sidebar/sidebar.module').then(m => m.SidebarModule) }, { path: 'profile', loadChildren: () => import('./component/patient/profile/profile.module').then(m => m.ProfileModule) }];
=======
const routes: Routes = [{ path: 'home', loadChildren: () => import('./component/home/home.module').then(m => m.HomeModule) }, { path: 'sidebar', loadChildren: () => import('./component/patient/sidebar/sidebar.module').then(m => m.SidebarModule) }];
>>>>>>> origin/luisfer

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
