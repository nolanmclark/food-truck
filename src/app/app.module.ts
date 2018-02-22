import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { ClientHomeComponent } from './pages/client-home/client-home.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { AboutComponent } from './pages/about/about.component';
import { MapComponent } from './pages/map/map.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { ContactComponent } from './pages/contact/contact.component';
import { LocationService} from './services/location/location.service';
import {HttpModule} from '@angular/http';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientHomeComponent,
    HomeComponent,
    AboutComponent,
    MapComponent,
    SearchFilterPipe,
    ContactComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqMfCGxfUAMshlsF7_D-oUpcuHMje-JIA'
    })
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
