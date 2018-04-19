import { Component, OnInit } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent implements OnInit {

  apiRoot: string = 'https://vs-genius.ddns.net/api/foodtruck';
  menu: any = {};
  initialMenu: any = {};
  categories: any = [];
  items: any = [];
  tid: any = '';

  constructor(public http: Http, public authService: AuthService) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.tid = localStorage.getItem("truck_id");
      this.http.get(`${this.apiRoot}/menu/${this.tid}`).subscribe(res => {
        let response = res.json();
        this.menu = response;
        this.initialMenu = this.menu;
        this.categories = Object.keys(this.menu);
        this.items = this.menu;
      });
    }
  }

  updateMenu() {
    console.log(this.menu);
    this.http.post(`${this.apiRoot}/menus/update/${this.tid}`, this.menu).subscribe(res => {
      let response = res.json();
      if(response.status === 'success'){
        alert('success');
      }
    });
  }

  onChange(value, category, index, field) {
    this.menu[category][index][field] = value;
  }
}
