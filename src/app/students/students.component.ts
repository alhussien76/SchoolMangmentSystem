import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Student } from './student.model';
import * as AppState from '../store/app.reducer'
import * as fromStudents from './store/students.actions'

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit  , OnDestroy{
  ListOfStudents!:Student[]
  pageNumber:number=1
  studentPerPage:number=6
  subscription!:Subscription
  studentID!:number

  constructor( 
    private http:HttpClient,
    private router:Router,
    private route :ActivatedRoute ,
    private store:Store<AppState.AppState>) { }

  ngOnInit(): void {
   this.subscription= this.store.select('students').subscribe(state=>{
      if(state.studentsArr){
        this.ListOfStudents=state.studentsArr
      }
    })
   this.onShow()
  }
  onShow(){
    this.store.dispatch(new fromStudents.FetchStudents({
      page:this.pageNumber ,
      per_page:this.studentPerPage
    }))
  }
  onViewMore(i:number)
  {
    if(this.ListOfStudents![i]){
      this.studentID=this.ListOfStudents![i].id
      this.router.navigate([i],{relativeTo:this.route,queryParams:{'currendID':this.studentID}})
    }
  }
  ngOnDestroy(){
    if(this.subscription)
    this.subscription.unsubscribe()
  }

}
