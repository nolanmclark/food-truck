import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { ClientHomeComponent } from './pages/client-home/client-home.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { AboutComponent } from './pages/about/about.component';
import { MapComponent } from './pages/map/map.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { ContactComponent } from './pages/contact/contact.component';
import { LocationService} from './services/location/location.service';
import { AuthService } from './services/auth/auth.service';
import { ContactService} from './services/contact/contact.service';
import { HttpModule} from '@angular/http';
import { LoginComponent } from './pages/login/login.component';
import { NgModel } from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { TruckClientComponent } from './pages/truck-client/truck-client.component';
import { KeysPipe } from './keys.pipe';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { TruckHomeComponent } from './pages/truck-home/truck-home.component';
import { MenuEditComponent } from './pages/menu-edit/menu-edit.component';
import { SettingsComponent } from './pages/settings/settings.component';

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
    TruckClientComponent,
    KeysPipe,
    RegisterComponent,
    ForgotPasswordComponent,
    TruckHomeComponent,
    MenuEditComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqMfCGxfUAMshlsF7_D-oUpcuHMje-JIA'
    }),
    AgmDirectionModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [LocationService, AuthService, ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
