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
    pass: string = "";

  constructor(public http: Http) { 

  }

  sendRegistrationEmail() {
    if(this.email === '') {
      alert("Email field left empty, it is required.");
    } else if(this.fname === '') {
      alert("First Name field left empty, it is required.");
    } else if(this.lname === '') {
      alert("Last Name field left empty, it is required.");
    } else if(this.pass === '') {
      alert("Password field left empty, it is required.");
    } else if(this.pass.length < 6) {
      alert("Password is less than 6 characters, please make it greater than 6");
    } else if(this.tname === '') {
      alert("Truck Name field left empty, it is required.");
    } else {
      // success
      this.contentModal.show();
    }
  }
}
