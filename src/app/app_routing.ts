import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { StudentInfoComponent } from "./students/student-info/student-info.component";
import { StudentsComponent } from "./students/students.component";
import { StudentResolver } from "./students/students.resolver";

const routes:Routes =[
    {path:'', redirectTo:'/students',pathMatch:'full'},
    {path:'authentication',component:AuthenticationComponent,  },
    {path:'students', component:StudentsComponent,resolve:[StudentResolver], children:[
        {path:':id', component:StudentInfoComponent}
    ]},
    {path:'student-detail',component:StudentInfoComponent,resolve:[StudentResolver]},
    {path:'**',component:NotFoundComponent}
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes,{useHash:true})
    ],
    exports:[RouterModule]
})
export class AppRoutingModule {}