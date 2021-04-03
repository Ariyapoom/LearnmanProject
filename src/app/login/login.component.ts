import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../authentication.service';
import { DatabaseService } from '../database.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router,private databaseservice :DatabaseService,private authservice : AuthenticationService,private cookie : CookieService) { }
  data : any
  errorMessage = '';
  error: { name: string, message: string } = { name: "", message: "" };
  ngOnInit(): void {
    if(this.cookie.check("useremail")){
      this.router.navigate(["/homepage"])
    }
  }
  routetoregis(){
      this.router.navigate(['/register'])   
  }
  showstudent(){
    this.databaseservice.getdata().subscribe((data)=>{
        this.data = data.data
        console.log(this.data)
      })
  }
  routetoshow(){
    this.router.navigate(['/login'])
  }
  test(){
    this.router.navigate(['/homepage'])
  }

  login(email ,pass ,textu,textp){
    if (this.validateForm(email, pass)){
      this.authservice.loginWithEmail(email,pass).then(()=>{
        this.cookie.set("useremail",this.authservice.currentUser.user.email)
        this.router.navigate(['/homepage'])
      }).catch(
        _error => {
          this.error = _error
          this.router.navigate(['/login'])
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