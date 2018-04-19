import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location/location.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedin: any = false;

  constructor(private authService: AuthService, private locService: LocationService, private router: Router) {
    this.getPosition();
  }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.loggedin = true;
    } else {
      this.loggedin = false;
    }
  }

  goToClientHome() {
    console.log("clicked");
  }

  getPosition() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((res) => {
          if(res) {
            this.locService.setLocation(res.coords)
          } else {
            console.log(res);
          }
        });
    };
  }

}
