import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { authService } from '../authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {
  isAuthenticated!: boolean
  subscription!:Subscription

  constructor(
    private authservice:authService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.authservice.isAuthenticated.subscribe(res=>{
    this.isAuthenticated = res
    })
  }
  onLogut(){
   this.authservice.logout()
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
