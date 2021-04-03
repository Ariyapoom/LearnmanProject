import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../authentication.service';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-lession',
  templateUrl: './lession.component.html',
  styleUrls: ['./lession.component.css']
})
export class LessionComponent implements OnInit {
  public lessons : any;

  constructor(private router : Router,private authservice : AuthenticationService,private databaseservice : DatabaseService,private cookie :CookieService) { }
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
    this.databaseservice.getlesson().subscribe((data)=>{
      console.log(data.data)
      this.lessons = data.data
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

  gotolearning(id){
    console.log(id)
    this.router.navigate(['/learning'], {queryParams :{lesson : id}})
  }

  logout(){
    this.authservice.signout()
  }

}
