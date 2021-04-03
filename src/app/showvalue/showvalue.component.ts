import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from "@angular/router"
import { promise } from 'protractor';
import { AuthenticationService } from '../authentication.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-showvalue',
  templateUrl: './showvalue.component.html',
  styleUrls: ['./showvalue.component.css']
})
export class ShowvalueComponent implements OnInit {

  constructor(private databaseservice : DatabaseService ,private router : Router,private authservice :AuthenticationService,private cookie :CookieService) { }
  student :any;
  problems : any;
  ngOnInit(): void {
    if(!this.cookie.check("useremail")){
      this.router.navigate(["/login"])
    }
    console.log(this.authservice.currentUser)
    console.log(this.authservice.isUserAnonymousLoggedIn)
    this.databaseservice.studentinfo(this.cookie.get("useremail")).subscribe((data)=>{
      this.student = data.data
      console.log(this.student)
      this.problems = Object.keys(this.student.Student_Progess.exercise)
    })
  }
  gotoex(){
    this.router.navigate(['/problem'])
  }
  gotolesson(){
    this.router.navigate(['/lesson'])
  }
  gotohome(){
    this.router.navigate(['homepage'])
  }
  
}
