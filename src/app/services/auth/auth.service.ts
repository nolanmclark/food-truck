import { Injectable } from '@angular/core';
import {AuthUser} from '../../models/AuthUser';
import {Http, Headers,  Response, RequestOptions, RequestMethod} from '@angular/http';
import * as moment from "moment";

@Injectable()
export class AuthService {

  apiRoot="https://vs-genius.ddns.net/api/foodtruck";
  private userToken: any;

  constructor(private http: Http) {

   }

   login(email, password) {
      return new Promise((resolve, err) => {
        let head = new Headers({ 'Content-Type': 'application/json' });
        this.http.post(`${this.apiRoot}/auth`, JSON.stringify({email: email, pw: password}), { headers: head})
          .subscribe((res: Response) => {
            if(res.status === 200) {
              let body = JSON.parse(res['_body']);
              let token = body.access_token;
              this.userToken = token;
              this.setSession(token);
              resolve('success');
            } else if(res.status === 401) {
              alert("Invalid Credentials");
            } else if(res.status === 500) {
              alert("Invalid Credentials");
            } else {
              alert("Error, contact administrators.")
            }
         });
      }).catch((err) => {
        console.log(err);
      });
    }

   getUserToken() {
     return this.userToken;
   }

  test(token) {
     let url = `${this.apiRoot}/protected`;
     let headers = new Headers();
     headers.append('Access-Control-Allow-Origin', '*');
     headers.append('Authorization', "JWT " + token);
     let ops = new RequestOptions();
     ops.headers = headers;
     this.http.get(url, ops).subscribe((res) => {
       console.log(res);
     });
   }

   private setSession(token) {
       localStorage.setItem('id_token', token);
   }

   logout() {
       localStorage.removeItem("id_token");
       localStorage.removeItem("expires_at");
   }

   isLoggedIn() {
    if (localStorage.getItem("id_token") === null) {
      return false;
    } else {
      return true;
    }
   }

   isLoggedOut() {
       return !this.isLoggedIn();
   }
}
