import { Injectable } from '@angular/core';
import {AuthUser} from '../../models/AuthUser';
import {Http, Headers,  Response, RequestOptions, RequestMethod} from '@angular/http';
import * as moment from "moment";

@Injectable()
export class AuthService {

  apiRoot="https://vs-genius.ddns.net/api/foodtruck"
  private userToken: any;

  constructor(private http: Http) {

   }

   login(email:string, password:string) {
        let head = new Headers({ 'Content-Type': 'application/json' });
       return this.http.post(`${this.apiRoot}/auth`, JSON.stringify({email: email, pw: password}), { headers: head})
         .subscribe((res: Response) => {
           let body = JSON.parse(res['_body']);
           let token = body.access_token;
           this.userToken = token;
           this.test(token);
         });
   }

   getUserToken() {
     return this.userToken;
   }

  test(token) {
     let url = `${this.apiRoot}/locations`;
     let headers = new Headers();
     headers.append('Access-Control-Allow-Origin', '*');
     headers.append('authorization', token);
     let ops = new RequestOptions();
     ops.headers = headers;
     this.http.get(url, ops).subscribe((res) => {
       console.log(res);
     });
   }

   private setSession(authResult) {
       const expiresAt = moment().add(authResult.expiresIn,'second');
       localStorage.setItem('id_token', authResult.idToken);
       localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
   }

   logout() {
       localStorage.removeItem("id_token");
       localStorage.removeItem("expires_at");
   }

   isLoggedIn() {
       return moment().isBefore(this.getExpiration());
   }

   isLoggedOut() {
       return !this.isLoggedIn();
   }

   getExpiration() {
       const expiration = localStorage.getItem("expires_at");
       const expiresAt = JSON.parse(expiration);
       return moment(expiresAt);
   }
}
