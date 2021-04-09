import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authService } from './auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
 @ViewChild('myform')myform!:NgForm
 signUp!:boolean;
  constructor(
    private authservice:authService
    ) { }

  ngOnInit(): void {
  }
  onSignUp(){
    this.signUp=!this.signUp;
  }
  onSubmit(){
    
    if(this.myform.value.Email==="huss@gmail.com" &&
       this.myform.value.Password==="123456"      
    ){
      this.authservice.login()
    }
    else{
      alert("Please Enter The Correct Info To Login")
    }

  }

}
