import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {

  public map: any = { lat: 41.2524, lng: -95.9980};

  constructor() { }

  ngOnInit() {

  }

  //TODO: Pull list of available and open trucks from DB,
  // create markers for trucks on map, bind custom markers.

}
