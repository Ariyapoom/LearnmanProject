import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthenticationService } from '../authentication.service';
import { DatabaseService } from '../database.service';
import { Student } from "../studen"
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private databaseservice: DatabaseService, private authservice: AuthenticationService) { }
  user: any;
  errorMessage = '';
  error: { name: string, message: string } = { name: "", message: "" };
  groups = [];
  ngOnInit(): void {
    this.databaseservice.getallgroup().subscribe((data)=>{
      this.groups = data.data
    })
  }
  student : Student;


  tologin() {
    this.router.navigate(['/login'])
  }
  toresgis() {
    this.router.navigate(['/register'])
  }

  register(name, email, id, pass, group) {
    this.clearErrorMessage();
    console.log(group)
    this.student = new Student(id , name , email, group)
    if (name.length === 0 || id.length === 0 ) {
      alert("Please Enter Your Detail")
    }
    else if (this.validateForm(email, pass)) {
      this.authservice.registerWithEmail(email, pass)
        .then(() => {
          console.log(this.authservice.currentUserId)
          this.databaseservice.postnewdstudent(this.student.getData()).subscribe((data) => {
            console.log("ok")
          })
          alert("Register Success You Can Go to Login")
          this.router.navigate(['/login'])
        }).catch(_error => {
          this.error = _error
          this.router.navigate(['/register'])
        })
        
    }

  }

  validateForm(email, pass) {
    if (email.length === 0) {
      this.errorMessage = "Please Enter Your E-mail"
      return false;
    }
    if (pass.length === 0) {
      this.errorMessage = "Please Enter Your Password"
      return false;
    }
    if (pass.length < 3) {
      this.errorMessage = "Password should be at least 6 char"
      return false;
    }
    this.errorMessage = ""
    return true;
  }

  clearErrorMessage() {
    this.errorMessage = ""
    this.error = { name: " ", message: "" }
  }

}
