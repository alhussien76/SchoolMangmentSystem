import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit , OnDestroy {
  studentInfo!:Student |null;
  subscription!:Subscription
  studID!:number
  paramsFound:boolean=false
  error!:any

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private http:HttpClient) { }

  ngOnInit(): void {
   this.subscription= this.route.queryParams.subscribe(params =>{
     if(params['currendID']){
       this.paramsFound=true
       this.subscription = this.http.get<{data:Student}>('https://reqres.in/api/users/'+ params['currendID'])
        .subscribe(res =>{
          this.studentInfo=res.data
        })
     }
    })
  }
  onShowDetail(){
    if(this.studID)
    this.subscription = this.http.get<{data:Student}>('https://reqres.in/api/users/'+this.studID)
        .subscribe(res =>{
          this.studentInfo=res.data
          this.error=null
        },error=>{
          this.studentInfo=null
          this.error=error
        })
  }
  onClose(){
    this.studentInfo=null
    this.error=null
    if(this.paramsFound)
    this.router.navigate(['/students']);
  }
  ngOnDestroy(){
    if(this.subscription)
    this.subscription.unsubscribe()
    this.paramsFound=false
  }
}
