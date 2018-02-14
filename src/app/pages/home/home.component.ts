import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  constructor(private locService: LocationService, private router: Router) {
    this.getPosition();
  }

  ngOnInit() {

  }

  goToClientHome() {
    console.log("clicked");
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
