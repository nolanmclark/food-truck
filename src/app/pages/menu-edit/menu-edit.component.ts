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
  menu: any;
  categories: any;
  items: any[];

  constructor(public http: Http, public authService: AuthService) { }

  ngOnInit() {
    function checkDuplicateInObject(propertyName, inputArray) {
      var seenDuplicate = false,
          testObject = {};
    
      inputArray.map(function(item) {
        var itemPropertyName = item[propertyName];    
        if (itemPropertyName in testObject) {
          testObject[itemPropertyName].duplicate = true;
          item.duplicate = true;
          seenDuplicate = true;
        }
        else {
          testObject[itemPropertyName] = item;
          delete item.duplicate;
        }
      });
      return seenDuplicate;
    }

    if(this.authService.isLoggedIn()) {
        let id = localStorage.getItem("truck_id");
        this.http.get(`${this.apiRoot}/location/${id}`).subscribe(res => {
          let response = res.json();
          this.truckData = response;
          this.http.get(`${this.apiRoot}/menus/${id}`).subscribe(res => {
            let response = res.json();
            this.menu = Object.keys(response).map(i => response[i]);
            let cat = [];
            for(let i = 0; i < this.menu.length; i++) {
              cat.push(this.menu[i][0].category);
            }
            this.categories = cat;
            this.items = this.menu;
            console.log(this.categories);
            console.log(this.menu[0]);
          });
        });
      }
  }
}