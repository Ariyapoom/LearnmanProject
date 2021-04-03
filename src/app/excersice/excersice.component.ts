import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../authentication.service';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-excersice',
  templateUrl: './excersice.component.html',
  styleUrls: ['./excersice.component.css']
})
export class ExcersiceComponent implements OnInit {

  constructor(private databaseservice : DatabaseService,private router : Router,private authservice : AuthenticationService,private cookie:CookieService) { }
  public problemsdata : any[];
  student :any;
  problems : any;
  isfinish = false;
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
      this.isfinish = true;
    })
    this.databaseservice.getallproblem().subscribe((data)=>{
      this.problemsdata = data.data;
      console.log(this.problems) 
      
    })
  }
  gotohome(){
    this.router.navigate(['/homepage'])
  }
  gotolesson(){
    this.router.navigate(['lesson'])
  }
  gotoex(){
    this.router.navigate(['problem'])
  }
  gotoproblem(id){
    console.log(id)
    this.router.navigate(['blockly'],{queryParams:  {data:id}})
  }
  logout(){
    this.authservice.signout()
  }
}
