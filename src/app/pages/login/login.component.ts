import { Component, OnInit } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: any;
  pass: any;

  constructor(private http: Http, private router: Router, private authService: AuthService) {
    this.email = '';
    this.pass = '';
  }

  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/truck-home');
    } else {
    }
  }

  login() {
    if(this.email !== '' && this.pass !== '') {
      this.authService.login(this.email, this.pass).then((res) => {
        if(res === 'success') {
          console.log('logged in');
          setTimeout(() => {
            this.router.navigateByUrl('/truck-home');
          }, 500);
        } else {
          alert(res);
        }
      }).catch((err) => {
        alert("Caught Error");
      });
    } else {
        alert("Check your credentials");
      }
    }
}
