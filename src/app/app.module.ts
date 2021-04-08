import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { HeaderComponent } from './header/header.component';
import { StudentsComponent } from './students/students.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentInfoComponent } from './students/student-info/student-info.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app_routing';
import { AuthenticationComponent } from './authentication/authentication.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentsComponent,
    StudentInfoComponent,
    NotFoundComponent,
    AuthenticationComponent
  ],
  imports: [
    ReactiveFormsModule,                        
    FormsModule,
    HttpClientModule ,
    BrowserModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
