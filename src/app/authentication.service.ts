import { Injectable } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState : any = null;

  constructor(private afu : AngularFireAuth, private router : Router,private cookie : CookieService) { 
    this.afu.authState.subscribe((auth =>{
      this.authState = auth;
    }))
    
  }

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }

  get currentUserName(): string {
    return this.authState.email
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

  registerWithEmail(email : string, pass : string){
    return this.afu.createUserWithEmailAndPassword(email,pass).then((user)=>{
      this.authState = user.user;
    }).catch(error=>{
      console.log(error);
      throw error;
    })
  }

  loginWithEmail(email : string, pass : string){
    return this.afu.signInWithEmailAndPassword(email,pass).then((user)=>{
      this.authState = user;
    }).catch(error=>{
      console.log(error);
      throw error;
    })
  }

  signout(): void{
    this.afu.signOut();
    this.cookie.deleteAll()
    this.router.navigate(['/login']);
  }

}
