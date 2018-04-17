import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class LocationService {

  myLatLng: any = {
    lat: '',
    lng: ''
  };
  go: any;
  tid: any;
  lastCoords: any = {};
  apiRoot: string = 'https://vs-genius.ddns.net/api/foodtruck';
  searching: boolean;

  constructor(public http: Http) { 
    this.searching = false;
    if(this.searching) {

    }
    this.getTruckLocation
  }

  locDNExist() {
    if(this.myLatLng.lat !== '') {
      return true;
    } else {
      return false;
    }
  }

  stillSharing() {
    return this.searching;
  }

  startSendingLocation(search: boolean, tid) {
    this.searching = search;
    console.log("sending location" + search);
    if(!search) {
      this.stopSendingLoc();
    } else {
      this.getTruckLocation(tid);
    }
  }

  isOpen() {
    let url = `${this.apiRoot}/location`;

  }

  getTruckLocation(tid) {
    this.tid = tid;
    this.lastCoords = {
      lat: '',
      lng: ''
    };
    
    this.go = navigator.geolocation.watchPosition((res) => {
      console.log("INSIDE GEOLOCATOR");
        if(res) {
          this.lastCoords = res.coords;
          this.setTruckLocation(res.coords, 1, tid);
          console.log("sent location");
        } else {
          console.log(res);
        }
    });
  }

  stopSendingLoc() {
    this.searching = false;
    navigator.geolocation.clearWatch(this.go);
    console.log("STOP");
    this.setTruckLocation(this.lastCoords, 0, this.tid);
  }

  getLoc(open, tid) {

  }

  setLocation(loc) {
    console.log("SET: " + loc)
    this.myLatLng.lat = loc.latitude;
    this.myLatLng.lng = loc.longitude;
  }

  setTruckLocation(loc, open, tid) {
    // SET LOCATION w TID
    let url = `${this.apiRoot}/location/update`;
    let data = {
      tid: tid,
      lat: loc.latitude,
      lng: loc.longitude,
      open: open
    };
    this.http.post(url, data).subscribe((res) => {
        if(res.status === 200) {
          console.log("set truck location success");
        }
    });
  }
}
