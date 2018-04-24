import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { LocationService } from '../../services/location/location.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {

  loggedin: any;
  truckData: any = {};
  apiRoot: string = 'https://vs-genius.ddns.net/api/foodtruck';
  photoUrl: any;

  constructor(private locService: LocationService, private http: Http, private router: Router, public authService: AuthService) { }

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
  }

  //TODO: Pull list of available and open trucks from DB,
  // create markers for trucks on map, bind custom markers.

}
