import { Component, OnInit } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  apiRoot="https://vs-genius.ddns.net/api/foodtruck/auth"
  email: string;
  pass: string;

  constructor(private http: Http) { }

  ngOnInit() {

  }

  login() {
    if(this.email === '') {
      alert('Email is invalid');
      return;
    } else if(this.pass === '') {
      alert('Password is invalid');
      return;
    }
    // authorization:jwt
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');

    let ops = new RequestOptions();
    ops.headers = headers;

    let token = this.http.post(this.apiRoot, {email: this.email, pass: this.pass})
    .subscribe(res => {
          console.log(res);
    });
    // .then(res => {
    //   let token = res;
    //   console.log(token);
    // }).catch((err)=> {
    //   console.log(err);
    // });
  }

}
