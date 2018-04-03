import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class LocationService {

  myLatLng: any = {
    lat: '',
    lng: ''
  };
  apiRoot: string = 'https://vs-genius.ddns.net/api/foodtruck';
  searching: boolean;

  constructor(public http: Http) { 
    this.searching = false;
  }

  locDNExist() {
    if(this.myLatLng.lat !== '') {
      return true;
    } else {
      return false;
    }
  }

  getTruckLocation(search: boolean, tid) {
    this.searching = search;
    while(this.searching) {
      setTimeout(() => {
        window.navigator.geolocation.getCurrentPosition((res) => {
          if(res) {
            this.setTruckLocation(res.coords, tid)
          } else {
            console.log(res);
          }
        });
      }, 30000);
    }
  }

  setLocation(loc) {
    console.log("SET: " + loc)
    this.myLatLng.lat = loc.latitude;
    this.myLatLng.lng = loc.longitude;
  }

  setTruckLocation(loc, tid) {
    // SET LOCATION w TID
    let url = `${this.apiRoot}/location/update`;
    let data = {
      tid: tid,
      lat: loc.latitude,
      lng: loc.longitude
    };
    this.http.post(url, data).subscribe((res) => {
        if(res.status === 200) {
          let body = JSON.parse(res['_body']);
          let stat = body.status;
          if(stat === 'success'){
            console.log("success");
          }
        }
    });
  }
}
