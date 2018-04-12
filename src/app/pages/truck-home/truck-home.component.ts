import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { LocationService } from '../../services/location/location.service';

@Component({
  selector: 'app-truck-home',
  templateUrl: './truck-home.component.html',
  styleUrls: ['./truck-home.component.scss']
})
export class TruckHomeComponent implements OnInit {

  truckData: any = {};
  apiRoot: string = 'https://vs-genius.ddns.net/api/foodtruck';
  sharing: boolean;
  curLoc: any = {
    lat: '',
    lng: ''
  };
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

  constructor(public http: Http, public locService: LocationService) {
    this.sharing = this.locService.stillSharing();
    console.log(this.sharing);
   }

  ngOnInit() {
    this.http.get(`${this.apiRoot}/location/192`).subscribe(res => {
      // this.http.get(`${this.apiRoot}/location/${this.truckData.tid}`).subscribe(res => {
      let response = res.json();
      this.truckData = response;
      this.curLoc = {lat: response.lat, lng: response.lng};
      this.photoUrl = `/assets/images/truckPhotos/${this.truckData.tid}.jpg`;
    });
  }

  startSharing(searching: boolean) {
    this.sharing = searching;
    console.log(this.sharing + " sent");
    this.locService.startSendingLocation(searching, this.truckData.tid);
  }
}
