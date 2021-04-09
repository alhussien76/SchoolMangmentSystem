import { Student } from "../student.model";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromStudents from './students.actions'
import { catchError, map, switchMap, tap, } from "rxjs/Operators";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

interface  Response{
    data:Student[];
}
@Injectable()
export class studentsEffects {
    getData=createEffect(
        ()=>this.$actions.pipe(
            ofType(fromStudents.FETCH_DATA),
            switchMap((paramsData:fromStudents.FetchStudents)=>{
                let params = new HttpParams();
                params=params.set('page',paramsData.payload!.page.toString()),
                params=params.set('per_page',paramsData.payload!.per_page.toString())
                return this.http.get<Response>('https://reqres.in/api/users',{
                    params:params
                  })
            }),map(response=>{
                return new fromStudents.SetStudents(response.data)
            })
          )
        )
    getStudentInfo= createEffect(
        ()=>this.$actions.pipe(
            ofType(fromStudents.FETCH_STUDENT),
            switchMap((id:fromStudents.FetchStudent) =>{
             return this.http.get<{data:Student}>('https://reqres.in/api/users/'+id.payload)
             .pipe(
                map(response=>{
                    return new fromStudents.SetStudent(response.data)
                   }),
                   catchError(error=>{
                    return of(new fromStudents.StudenError(error.message))
                 })
             )
            }) 
        )
    )

    constructor(
        private $actions : Actions,
        private http:HttpClient,
        private route:ActivatedRoute,
        ){}
}