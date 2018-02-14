import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  //TODO: Pull list of available and open trucks from DB,
  // create markers for trucks on map, bind custom markers.

}
