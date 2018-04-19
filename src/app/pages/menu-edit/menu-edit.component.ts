import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, Headers } from '@angular/http';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent implements OnInit {

  apiRoot: string = 'https://vs-genius.ddns.net/api/foodtruck';
  menu: any = {};
  changed: any = [];
  categories: any = [];
  tid: any = '';
  loggedin: boolean = false;

  constructor(public http: Http, public authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.loggedin = true;
      this.tid = localStorage.getItem("truck_id");
      this.http.get(`${this.apiRoot}/menu/${this.tid}`).subscribe(res => {
        let response = res.json();
        this.menu = response;
        this.categories = Object.keys(this.menu);
      });
    }
  }

  updateMenu() {
    if(this.changed.length === 0){
      alert('No changes.');
      return;
    }

    let data = {tid: this.tid, items: []};
    for(let cat of this.categories){
      for(let item of this.menu[cat]){
        if(this.changed.indexOf(item.iid) !== -1){
          data.items.push(item);
        }
      }
    }

    let headers = new Headers();
    let token = this.authService.getUserToken();
    headers.append('Authorization', `JWT ${token}`);
    this.http.post(`${this.apiRoot}/menus/update/${this.tid}`, data, {headers: headers }).subscribe(res => {
      if(res.status === 401){
        alert('Must be logged in to use this feature.');
        this.router.navigateByUrl('/login');
      }
      else{
        let response = res.json();
        if(response.status === 'success'){
          alert('success');
          setTimeout(() => {
            this.router.navigateByUrl('/truck-client');
          }, 500);
        }
        else{
          alert('something went wrong');
        }
      }
    });
  }

  onChange(value, category, index, field) {
    this.menu[category][index][field] = value;
    if(this.changed.indexOf(this.menu[category][index].iid) === -1){
      this.changed.push(this.menu[category][index].iid);
    }
  }
}
