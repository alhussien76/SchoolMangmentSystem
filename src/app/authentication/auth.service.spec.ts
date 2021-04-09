import { fakeAsync, tick } from "@angular/core/testing"
import { Router } from "@angular/router"
import { authService } from "./auth.service"

describe('Service : authService',()=>{
   let service : authService
   let router : Router
   let location: Location
   beforeEach(() => {
       service = new authService(router)       
    })
   it(' login works!',()=>{
       service.login()
       service.isAuthenticated.subscribe(res=>{
        expect(res).toBe(true) 
        })
   })
   it('logout works!',()=>{
       service.logout()
       service.isAuthenticated.subscribe(res=>{
        expect(res).toBe(false) 
        })
   })
   it(' autologout works!',fakeAsync(()=>{
        service.autoLogout(4000)
        tick(4001);
        service.isAuthenticated.subscribe(res=>{
         expect(res).toBe(false) 
        })

   }))
   it('autologin works!',()=>{
         const expirationTime =  new Date(new Date().getTime() + 3600 * 1000)
         localStorage.setItem('this.expirationTime',JSON.stringify(expirationTime) )
         expect(service.autoLogin()).toBe(true)

   })
        it('autologin not works!',()=>{
        localStorage.clear()
        expect(service.autoLogin()).toBe(false)
   })

})