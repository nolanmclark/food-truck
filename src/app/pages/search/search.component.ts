import { Component, OnInit } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

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
    apiRoot: string = 'https://cms-maverick.ddns.net/api/foodtruck'

  constructor(private http: Http) {
    this.getAllTrucks();
  }

  //TODO: Get the list of all current trucks

  getAllTrucks() {
    let url = `${this.apiRoot}/trucks`;
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');

    let ops = new RequestOptions();
    ops.headers = headers;
    this.http.get(url, ops).subscribe((res) => {
      this.truckList = res.json();
      console.log(this.truckList);
    });
  }

  onKey(e) {
    this.query = e.target.value;
  }
}
