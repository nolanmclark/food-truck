import { Component, OnInit } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
