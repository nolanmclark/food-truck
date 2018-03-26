import { Component, OnInit, ViewChild } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {

    @ViewChild('style') public contentModal;

    fname: string = "";
    email: string = "";
    lname: string = "";
    tname: string = "";
    //pass: string = "";
    apiRoot: string = 'https://vs-genius.ddns.net/api/foodtruck';

  constructor(public http: Http, private router: Router) {

  }

  sendRegistrationEmail() {
    if(this.email === '') {
      alert("Email field left empty, it is required.");
    } else if(this.fname === '') {
      alert("First Name field left empty, it is required.");
    } else if(this.lname === '') {
      alert("Last Name field left empty, it is required.");
    } else if(this.tname === '') {
      alert("Truck Name field left empty, it is required.");
    } else {
      // success
      this.http.post(`${this.apiRoot}/register/truck`, {"email": this.email, "name": `${this.fname} ${this.lname}`, "truck_name": this.tname})
      .subscribe(res => {
        if(res.status === 200) {
          this.contentModal.show();
        } else {
          alert("Error sending message");
        }
      })
    }
  }

  go() {
    this.contentModal.hide();
    this.router.navigateByUrl('/client-home');
  }
}
