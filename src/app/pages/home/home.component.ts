import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location/location.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedin: any = false;
  truckData: any = {};
  apiRoot: string = 'https://vs-genius.ddns.net/api/foodtruck';
  photoUrl: any;

  constructor(private http: Http, private authService: AuthService, private locService: LocationService, private router: Router) {
    this.getPosition();
  }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.loggedin = true;
      let id = localStorage.getItem("truck_id");
      this.http.get(`${this.apiRoot}/location/${id}`).subscribe(res => {
        let response = res.json();
        this.truckData = response;
        this.photoUrl = `/assets/images/truckPhotos/${this.truckData.tid}.jpg`;
      });
    } else {
      this.loggedin = false;
    }
  }

  logout() {
    if(this.locService.searching === true){
      this.locService.stopSendingLoc();
    }
    this.authService.logout();
    this.router.navigateByUrl('/home');
    location.reload();
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
