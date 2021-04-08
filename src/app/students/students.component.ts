import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from './student.model';

interface  Response{
  data:Student[]
}
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
    private route :ActivatedRoute) { }

  ngOnInit(): void {
    
   this.onShow()
  }
  onShow(){
    let params = new HttpParams();
    params=params.set('page',this.pageNumber.toString()),
    params=params.set('per_page',this.studentPerPage.toString())
    this.subscription=this.http.get<Response>('https://reqres.in/api/users',{
      params:params
    })
    .subscribe(response =>{
      this.ListOfStudents=response.data
    })
  }
  onViewMore(i:number)
  {
   this.studentID=this.ListOfStudents[i].id
   this.router.navigate([i],{relativeTo:this.route,queryParams:{'currendID':this.studentID}})
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
