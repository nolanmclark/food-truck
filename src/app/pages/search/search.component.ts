import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

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

  ngOnInit() {

  }

  //TODO: Get the list of all current trucks

  getAllTrucks() {

  }

  onKey(e) {
    console.log(e);
  }
}
