import { Component } from '@angular/core';
import {LocationService} from './services/location/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '🍗🚚\'s';

  constructor(private locService: LocationService) {

  }

  getPosition() {
    if(window.navigator.geolocation){
        window.navigator.geolocation.getCurrentPosition((res) => {
          if(res) {
            this.locService.setLocation(res.coords)
          } else {
            console.log(res);
          }
        });
    };
  }
}
