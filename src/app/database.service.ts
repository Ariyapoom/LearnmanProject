import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private http :HttpClient) {
    
  }
  private url = "https://quiet-dawn-42537.herokuapp.com";
  private urllocal = "http://localhost:5000"
  private urlcheckresult = "https://enigmatic-island-26001.herokuapp.com/checkresult/";
  getdata() : Observable<any> {
    return this.http.get(this.urllocal+"/allstudent");
  }
  postnewdstudent(student) : Observable<any> {
    return this.http.post(this.urllocal+"/student", student);
  }
  getblocklytool(problemid) : Observable<any>{
    console.log("here")
    return this.http.get(this.urllocal+"/getblockly/"+problemid);
  }
  studentinfo(email): Observable<any>{
    console.log(email)
    return this.http.get(this.urllocal+"/student/"+email);
  }
  testcode(answerdata) : Observable<any>{
    return this.http.post(this.urllocal+"/bocklyDB/answer", answerdata);
  }
  getallproblem(): Observable<any>{
    return this.http.get(this.urllocal+'/bocklyDB/problem');
  }
  getlesson(): Observable<any>{
    return this.http.get(this.urllocal+"/lesson");
  }
  getlearning(lessonID): Observable<any>{
    return this.http.get(this.urllocal+"/learning/"+lessonID);
  }
  checklesson(email,lesson,status): Observable<any>{
    return this.http.put(this.urllocal+"/checklearning/"+email,{lesson:lesson,status:status});
  }
  checkresult(problemid,ans): Observable<any>{
    return this.http.post(this.urlcheckresult,{problem_id : problemid,content :ans});
  }
  getallgroup():Observable<any>{
    return this.http.get(this.urllocal+"/getgroup");
  }
  checkproblem(email,problemid,status): Observable<any>{
    return this.http.put(this.urllocal+"/checkproblem/"+ email,{problemid:problemid,status:status});
  }
  
}