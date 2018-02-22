import { Component, OnInit } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { NgModel } from '@angular/forms';
import {AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: any;
  pass: any;

  constructor(private http: Http, private authService: AuthService) {
    this.email = '';
    this.pass = '';
  }

  ngOnInit() {

  }

  login() {
    // authorization:jwt
    console.log(this.email + this.pass)
    if(this.email !== '' && this.pass !== '') {
      this.authService.login(this.email, this.pass);
      } else {
        alert("Invalid credentials");
      }
    }
}
