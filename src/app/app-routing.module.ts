import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientHomeComponent } from './pages/client-home/client-home.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './pages/map/map.component';
import { SearchComponent } from './pages/search/search.component';

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
    path: 'client-home',
    component: ClientHomeComponent,
    children: [
      {path: '', redirectTo: 'map', pathMatch: 'full'},
      {path: 'map', component: MapComponent},
      {path: 'search', component: SearchComponent},
      {path: '**', component: MapComponent},
    ]},
    {
      path: 'about',
      component: AboutComponent
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
