import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { authService } from "../authentication/auth.service";
import {map, take, tap} from "rxjs/Operators";
import { Injectable } from "@angular/core";
@Injectable({providedIn:'root'})
export class StudentResolver implements Resolve<any> {
    constructor(
        private authservice:authService,
        private router:Router){}
    resolve(route :ActivatedRouteSnapshot , state : RouterStateSnapshot){
        return this.authservice.isAuthenticated.pipe(
             take(1),
             map(auth=>{
                 if(auth === false){
                    this.router.navigate(['/authentication'])
                } 
               })
           )        
    }
}