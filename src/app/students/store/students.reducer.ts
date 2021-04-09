import { Student } from "../student.model"
import * as studentsActions from '../store/students.actions'

export interface State {
    studentsArr: Student[] 
    student : Student | null
    error : string | null
}
const initialState:State = {
    studentsArr : [] ,
    student : null,
    error: null
}

export function studentReducer(state:State =initialState,action:studentsActions.StudentsActions) {
    switch (action.type){
        case studentsActions.SET_STUDENTS:
            return {
                ...state,
                studentsArr:[...action.payload!]
            }
        case studentsActions.SET_STUDENT:
            return {
                ...state,
                student: action.payload,
                error :null
            }
        
        case studentsActions.ERROR:
            return{
                ...state,
                student: null ,
                error:action.payload
            }
        case studentsActions.RESETSTATE:
            return{
                ...state,
                student:null ,
                error :null
            }

        default:
            return state    
    }

}