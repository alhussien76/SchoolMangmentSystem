import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn:'root'})
export class authService {
isAuthenticated = new BehaviorSubject<boolean>(false);
clearTimeout:any
expirationTime!: Date
constructor(
    private router: Router
){
}
autoLogin(){
   if(JSON.parse(localStorage.getItem('this.expirationTime')!)){
     this.expirationTime = new Date(JSON.parse(localStorage.getItem('this.expirationTime')!))
    }
    if(this.expirationTime){
        const  expirein = new Date(this.expirationTime).getTime() - new Date().getTime()
        this.isAuthenticated.next(true);
        this.autoLogout(expirein);
        return true
    }
    return false
}
autoLogout(expiresin:number){
   this.clearTimeout= setTimeout(() =>{
        this.logout()
    },expiresin)
}
logout(){
    this.isAuthenticated.next(false)
    clearTimeout(this.clearTimeout)
    localStorage.clear()
    if(this.router)
    this.router.navigate(['authentication'])
}
login(){   /// fake the user token with 1 hour 
    this.isAuthenticated.next(true)
    const expirationTime =  new Date(new Date().getTime() + 3600 * 1000)
    this.autoLogout(3600 * 1000)
    localStorage.setItem('this.expirationTime',JSON.stringify(expirationTime) )
    if(this.router)
    this.router.navigate(['students']);
}

}