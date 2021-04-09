import { ActionReducerMap } from '@ngrx/store'
import * as fromStudents from '../students/store/students.reducer'
export interface AppState {
    students : fromStudents.State 
}

export const appReducer : ActionReducerMap<AppState> ={
    students : fromStudents.studentReducer
}