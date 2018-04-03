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

  constructor(public http: Http, public locService: LocationService) {
    this.sharing = false;
   }

  ngOnInit() {
    this.http.get(`${this.apiRoot}/truck/192`).subscribe(res => {
      let response = res.json();
      this.truckData = response;
      console.log(this.truckData.name);
    });
  }

  startSharing(searching: boolean) {
    this.locService.getTruckLocation(searching, this.truckData.tid);
  }
}
