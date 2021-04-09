
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { authService } from './authentication/auth.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {
 

  constructor(
    private authservice:authService){}

  ngOnInit(){
    this.authservice.autoLogin()

  }
}
