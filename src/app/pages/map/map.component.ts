import { Component, OnInit } from '@angular/core';
import {LocationService} from '../../services/location/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public map: any = { lat: 41.2524, lng: -95.9980};
  
  myLatLng: any;

  truckList: any[] = [
    {
      truckName: 'Localmotive',
      isOpen: true,
      rating: 4.7
    },
    {
      truckName: 'Taco Truck',
      isOpen: true,
      rating: 4.2
    }
  ];

  constructor(private locService: LocationService) {

  }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    this.map.lat = this.locService.myLatLng.lat;
    this.map.lng = this.locService.myLatLng.lng;
  }

  //TODO: Pull list of available and open trucks from DB,
  // create markers for trucks on map, bind custom markers

}
