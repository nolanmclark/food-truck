import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {

  loggedin: any;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.loggedin = true;
    } else {
      this.loggedin = false;
    }
  }

  //TODO: Pull list of available and open trucks from DB,
  // create markers for trucks on map, bind custom markers.

}
