import { Component, OnInit } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent implements OnInit {

  truckData: any;
  apiRoot: string = 'https://vs-genius.ddns.net/api/foodtruck';

  constructor(public http: Http, public authService: AuthService) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
        let id = localStorage.getItem("truck_id");
        this.http.get(`${this.apiRoot}/location/${id}`).subscribe(res => {
          let response = res.json();
          this.truckData = response;
        });
    }
  }
}