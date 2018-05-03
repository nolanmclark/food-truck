import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule, Router } from '@angular/router';
import { LocationService } from '../../services/location/location.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-truck-client',
  templateUrl: './truck-client.component.html',
  styleUrls: ['./truck-client.component.scss']
})
export class TruckClientComponent implements OnInit {

  marker: any = {};
  truckData: any = {};
  photoUrl: any;
  apiRoot: string = 'https://vs-genius.ddns.net/api/foodtruck';


  constructor(private authService: AuthService, private http: Http, private locService: LocationService, private router: Router) { }

  ngOnInit() {
      if(this.authService.isLoggedIn()) {
        let id = localStorage.getItem("truck_id");
        this.http.get(`${this.apiRoot}/location/${id}`).subscribe(res => {
          let response = res.json();
          this.truckData = response;
          this.marker = {
            lat: response.lat,
            lng: response.lng,
            icon: './assets/images/yourlocation.png',
            label: ' ',
          }
          this.photoUrl = `/assets/images/truckPhotos/${this.truckData.tid}.jpg`;
        });
      } else {
        alert('Must be logged in to use this function.')
        this.router.navigateByUrl('/login');
      }
    }

  logout() {
    if(this.locService.searching = true){
      this.locService.stopSendingLoc();
    }
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }
}
