import { Injectable } from '@angular/core';
import {Http, Headers,  Response, RequestOptions, RequestMethod} from '@angular/http';
import * as moment from "moment";

@Injectable()
export class ContactService {

  apiRoot="https://vs-genius.ddns.net/api/foodtruck";
  //private userToken: any;

  constructor(private http: Http) {

   }

   contact(name, email, subj, message, tid) {
      return new Promise((resolve, err) => {
        let head = new Headers({ 'Content-Type': 'application/json' });
        this.http.post(`${this.apiRoot}/contact`, {"name": name, "email": email, "subj": subj, "message": message, "tid": tid})
          .subscribe((res: Response) => {
            if(res.status === 200) {
              let body = JSON.parse(res['_body']);
              let stat = body.status;
              if(stat === 'success'){
                resolve('success');
              }
            } else {
              alert("Error, contact administrators.")
            }
         });
      }).catch((err) => {
        console.log(err);
      });
    }
}
