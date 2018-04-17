import { Injectable } from '@angular/core';
import {AuthUser} from '../../models/AuthUser';
import {Http, Headers,  Response, RequestOptions, RequestMethod} from '@angular/http';
import * as moment from "moment";

@Injectable()
export class AuthService {

  apiRoot="https://vs-genius.ddns.net/api/foodtruck";
  private userToken: any;
  id: any;

  constructor(private http: Http) {

   }

   login(email, password) {
      return new Promise((resolve, err) => {
        let head = new Headers({ 'Content-Type': 'application/json' });
        this.http.post(`${this.apiRoot}/auth`, {"email": email, "pw": password})
          .subscribe((res: Response) => {
            if(res.status === 200) {
              let body = JSON.parse(res['_body']);
              let token = body.access_token;
              let parse = this.parseJwt(token);
              console.log(parse.identity);
              this.http.get(`${this.apiRoot}/user/${parse.identity}`).subscribe((tid: Response) => {
                if(tid.status === 200) {
                  let getTID = JSON.parse(tid['_body']);
                  this.id = getTID.tid;
                  this.userToken = token;
                  this.setSession(token, this.id);
                }
              });
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

  parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

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

   private setSession(token, truck_id) {
       localStorage.setItem('id_token', token);
       localStorage.setItem('truck_id', truck_id);
   }

   getSession() {
     if(localStorage.getItem("id_token") !== null){
       return localStorage.getItem("id_token");
     } else {
       return null;
     }
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
