import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Student } from '../student.model';
import * as AppState from '../../store/app.reducer'
import * as fromStudents from '../store/students.actions'
@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit , OnDestroy {
  studentInfo!:Student |null;
  routeSubscription!:Subscription
  stateSubscription!:Subscription
  studID!:number
  paramsFound:boolean=false
  error!:any

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private http:HttpClient,
    private store: Store<AppState.AppState>
   ) { }

  ngOnInit(): void {
    
    this.stateSubscription = this.store.select('students').subscribe(studentState=>{

      if(studentState.student){
        this.error=null
        this.studentInfo = studentState.student
      }
      else if(studentState.error){
        this.error=studentState.error
        this.studentInfo=null
      }
    })
    this.routeSubscription = this.route.queryParams.subscribe(params =>{
      if(params['currendID']){
        this.paramsFound=true
        this.store.dispatch(new fromStudents.FetchStudent(+params['currendID']))
      }
      else{
        this.studentInfo=null
      }
    })
  }
  onShowDetail(){
    if(this.studID){
      this.store.dispatch(new fromStudents.FetchStudent(+this.studID))
    }
  }
  onClose(){
    this.studentInfo=null
    if(this.paramsFound)
    this.router.navigate(['/students']);
  }
  ngOnDestroy(){
    this.store.dispatch(new fromStudents.ResetState())
    if(this.stateSubscription)
    this.stateSubscription.unsubscribe()
    if(this.routeSubscription)
    this.routeSubscription.unsubscribe()
    
  }
}
