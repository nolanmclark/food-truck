import { Component, OnInit, NgZone } from '@angular/core';
import {LocationService} from '../../services/location/location.service';
import {AgmMarker, MarkerManager, GoogleMapsAPIWrapper} from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public map: any = { lat: 41.2524, lng: -95.9980};

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

  myLatLng: any;

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

  constructor(private locService: LocationService) {

  }

  ngOnInit() {
    this.createMarkers();
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
          icon: '../../../assets/images/map-marker-icon.png'
        });
    });
  }

  initMap() {
    this.map.lat = this.locService.myLatLng.lat;
    this.map.lng = this.locService.myLatLng.lng;
  }

  clickedMarker(label, idx) {
  
  }

  //TODO: Pull list of available and open trucks from DB,
  // create markers for trucks on map, bind custom markers

}
