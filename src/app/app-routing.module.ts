import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientHomeComponent } from './pages/client-home/client-home.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './pages/map/map.component';
import { ContactComponent } from './pages/contact/contact.component';
import {LoginComponent} from './pages/login/login.component';
import {TruckClientComponent} from './pages/truck-client/truck-client.component';
import { RegisterComponent } from './pages/register/register.component';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import { TruckHomeComponent } from './pages/truck-home/truck-home.component';
import { MenuEditComponent } from './pages/menu-edit/menu-edit.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'truck-home',
    component: TruckHomeComponent,
    children: [
      {path: 'menu-edit', component: MenuEditComponent}
    ]
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'client-home',
    component: ClientHomeComponent,
    children: [
      {path: '', redirectTo: 'map', pathMatch: 'full'},
      {path: 'map', component: MapComponent},
      {path: '**', redirectTo: 'home', pathMatch: 'full'},
    ]},
    {
      path: 'about',
      component: AboutComponent
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
