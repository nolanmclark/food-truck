import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  query: any;
  truckList = [
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

  constructor() {

  }

  //TODO: Get the list of all current trucks

  getAllTrucks() {

  }
}
