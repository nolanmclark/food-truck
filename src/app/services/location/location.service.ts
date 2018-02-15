import { Injectable } from '@angular/core';

@Injectable()
export class LocationService {

  myLatLng: any = {
    lat: '',
    lng: ''
  };

  constructor() { }

  locDNExist() {
    if(this.myLatLng.lat !== '') {
      return true;
    } else {
      return false;
    }
  }

  setLocation(loc) {
    console.log("SET: " + loc)
    this.myLatLng.lat = loc.latitude;
    this.myLatLng.lng = loc.longitude;
  }


}
