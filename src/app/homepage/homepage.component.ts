import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../authentication.service';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private cookie : CookieService,private databaseservice: DatabaseService, private route: ActivatedRoute,private router: Router,private authservice : AuthenticationService) { }
  student:any = {
    Student_ID: "",
    Student_Name: "",
    Student_Email: "",
    Student_Section: "",
    Student_Progess : ""
  };
  email : string ;
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
  logout(){
    this.authservice.signout()
  }
}
