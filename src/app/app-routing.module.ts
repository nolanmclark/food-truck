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
    path: 'truck-client',
    component: TruckClientComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
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
