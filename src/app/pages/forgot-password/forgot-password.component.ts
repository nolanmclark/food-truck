import { Component, OnInit, ViewChild } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  id: string;
  oldpw: string;
  oldpw_conf: string;
  newpw: string;
  newpw_conf: string;

  apiRoot: string = 'https://vs-genius.ddns.net/api/foodtruck';

  constructor(private http: Http, private router: Router, private authService: AuthService) {
    this.id = '';
    this.oldpw = '';
    this.oldpw_conf = '';
    this.newpw = '';
    this.newpw_conf = '';
   }

  ngOnInit() {
    if(!this.authService.isLoggedIn()) {
      alert('Must be logged in to change password.')
      this.router.navigateByUrl('/login');
    } else {
      this.id = this.authService.getSession();
    }
  }

  reset() {
    if(this.oldpw === '' || this.oldpw !== this.oldpw_conf){
      alert('Old password does not match.')
    }
    else if(this.newpw === '' || this.newpw !== this.newpw_conf){
      alert('New password does not match.')
    }
    else {
      this.http.post(`${this.apiRoot}/password/reset`, {"id": this.id, "old_pw": this.oldpw, "new_pw": this.newpw}).subscribe((res) => {
        if(res.status === 200) {
          let body = JSON.parse(res['_body']);
          let stat = body.status;
            if(stat === 'success'){
              console.log('success');
              this.router.navigateByUrl('/login');
            } else if(stat === 'error'){
              let err = body.error;
              console.log(err);
              alert(err);
            }
        } else {
          alert('Error.');
        }
      });
    }
  }
}
