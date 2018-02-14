import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public map: any = { lat: 41.2524, lng: -95.9980};

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

  constructor() { }

  ngOnInit() {

  }

  //TODO: Pull list of available and open trucks from DB,
  // create markers for trucks on map, bind custom markers.


}
