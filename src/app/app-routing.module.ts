import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientHomeComponent } from './pages/client-home/client-home.component';
import { HomeComponent } from './pages/home/home.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  { path: 'client-home',
  component: ClientHomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
