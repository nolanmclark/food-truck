import { Component, OnInit, NgZone } from '@angular/core';
import {LocationService} from '../../services/location/location.service';
import {AgmMarker, MarkerManager, GoogleMapsAPIWrapper} from '@agm/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewChecked {

  public map: any = { lat: 41.2524, lng: -95.9980};
  apiRoot: string = 'https://cms-maverick.ddns.net/api/foodtruck'
  public query: any;

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

  myLatLng:any = {lat: '', lng: ''}

  markers: any[];

  truckList: any[] = [
    {
      truckName: 'Localmotive',
      isOpen: true,
      rating: 4.7,
      lat: 41.2593,
      lng: -95.9352
    },
    {
      truckName: 'Taco Truck',
      isOpen: true,
      rating: 4.2,
      lat: 41.2593,
      lng: -95.9342,
    }
  ];

  constructor(private http: Http, private locService: LocationService) {

  }

  ngOnInit() {
    this.locationInit().then(res => {
        this.getAllTrucks();
    });
  }

  async locationInit() {
      if(this.locService.myLatLng.lat === "") {
        console.log("DN Exist")
        return await this.getPosition();
      } else {
        this.myLatLng = this.locService.myLatLng;
        console.log("Exists:" + JSON.stringify(this.locService.myLatLng));
      }
  }

  ngAfterViewChecked() {

  }

  createMarkers() {
    this.markers = [];
    this.markers.push({
      lat: this.locService.myLatLng.lat,
      lng: this.locService.myLatLng.lng,
      label: 'You',
      truckName: 'You'
    });
    this.truckList.forEach((truck) => {
        this.markers.push({
          lat: truck.lat,
          lng: truck.lng,
          truckName: truck.truckName,
          icon: './assets/images/map-marker-icon.png'
        });
    });
  }

  clickedMarker(label, idx) {

  }

  //TODO: Pull list of available and open trucks from DB,
  // create markers for trucks on map, bind custom markers
  getAllTrucks() {
    console.log("trucks GET");
    let url = `${this.apiRoot}/locations`;
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');

    let ops = new RequestOptions();
    ops.headers = headers;
    this.http.get(url, ops).subscribe((res) => {
      this.truckList = res.json();
      if(this.myLatLng !== null) {
        this.createMarkers();
        this.getAllDistances();
      }
    });
  }

  getAllDistances() {
   for(var i = 0; i < this.truckList.length; i++) {
     this.truckList[i].distanceFrom = this.getDistanceBetweenPoints(this.myLatLng, this.truckList[i].lat, this.truckList[i].lng, 'miles').toFixed(2);
   }
 }

 getDistanceBetweenPoints(start, end_lat, end_lng, units){
     let earthRadius = {
         miles: 3958.8,
         km: 6371
     };

     let end:any = {
       lat: '',
       lng: ''
     };
     end.lat = end_lat;
     end.lng = end_lng;

     let R = earthRadius[units || 'miles'];
     let lat1 = start.lat;
     let lon1 = start.lng;
     let lat2 = end.lat;
     let lon2 = end.lng;

     let dLat = this.toRad((lat2 - lat1));
     let dLon = this.toRad((lon2 - lon1));
     let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
     Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
     Math.sin(dLon / 2) *
     Math.sin(dLon / 2);
     let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
     let d = R * c;
     return d;
 }

 toRad(x){
     return x * Math.PI / 180;
 }

 getPosition() {
   return new Promise((resolve) => {
     if(window.navigator.geolocation){
         window.navigator.geolocation.getCurrentPosition((res) => {
           if(res) {
             this.locService.setLocation(res.coords);
             this.myLatLng = this.locService.myLatLng;
             console.log("should exist");
             resolve('success');
           } else {
             console.log(res);
           }
         });
     };
   });
 }

 onKey(e) {
   this.query = e.target.value;
 }
}
