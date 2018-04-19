import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { LocationService } from '../../services/location/location.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-truck-home',
  templateUrl: './truck-home.component.html',
  styleUrls: ['./truck-home.component.scss']
})
export class TruckHomeComponent implements OnInit {

  truckData: any = {};
  apiRoot: string = 'https://vs-genius.ddns.net/api/foodtruck';
  sharing: boolean;
  marker: any = {};
  youLabel: any = 'You';
  photoUrl: any;
  public style: any = [
    {
        "featureType": "water",
        "stylers": [
            {
                "saturation": 43
            },
            {
                "lightness": -11
            },
            {
                "hue": "#0088ff"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "hue": "#ff0000"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 99
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#808080"
            },
            {
                "lightness": 54
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ece2d9"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ccdca1"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#767676"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#EBE5E0"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    }
];

  constructor(public router: Router, public authService: AuthService, public http: Http, public locService: LocationService) {
    this.sharing = this.locService.stillSharing();
    console.log(this.sharing);
   }

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

  startSharing(searching: boolean) {
    this.sharing = searching;
    console.log(this.sharing + " sent");
    this.locService.startSendingLocation(searching, this.truckData.tid);
  }

  logout() {
    if(this.sharing = true){
      this.locService.stopSendingLoc();
    }
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }
}
