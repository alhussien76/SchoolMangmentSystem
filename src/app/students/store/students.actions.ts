import { Action } from "@ngrx/store";
import { Student } from "../student.model";

export const SET_STUDENTS:string = '[students] Set Students'
export const FETCH_DATA:string = '[students] Fetch Students'
export const SET_STUDENT:string = '[student] Set Student'
export const FETCH_STUDENT:string = '[student] Fetch Student'
export const ERROR:string ='[student] Error'
export const RESETSTATE:string='[student] ResetState'


export class SetStudents implements Action  {
   readonly type: string =SET_STUDENTS;
   constructor(public payload?:Student[]){}
}
export class SetStudent implements Action{
    readonly type :string = SET_STUDENT
    constructor(public payload?:any){}
}
export class FetchStudent implements Action{
    readonly type= FETCH_STUDENT
    constructor(public payload?:number){}
}
export class FetchStudents implements Action {
    readonly type: string=FETCH_DATA
    constructor(public payload?:{
        page:number
        per_page:number
    }){}
}
export class StudenError implements Action {
    readonly type:string=ERROR
    constructor(public payload?:string){}
}
export class ResetState implements Action {
    readonly type:string=RESETSTATE
}

export type StudentsActions  =  SetStudents | SetStudent