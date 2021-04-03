import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxBlocklyConfig, NgxBlocklyGeneratorConfig } from "ngx-blockly"
import { AuthenticationService } from '../authentication.service';
import { DatabaseService } from '../database.service';
@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})
export class BlocklyComponent implements OnInit {
  constructor(private databaseservice: DatabaseService,private router: Router,private route: ActivatedRoute,private authserver : AuthenticationService) { }
  configtool = '';
  public config: NgxBlocklyConfig = {};
  public generatorConfig: NgxBlocklyGeneratorConfig = {};
  public codexml : string = "";
  public codejs : string = "";
  public problem : any;
  public id:any;
  private sub : any;
  private user :any;
  public istest = false;
  public sendteststatus = ""
  public send = false
  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((params)=>{
      this.id = params.data;
      console.log(this.id)
    })
    this.generatorConfig = {
      dart: true,
      javascript: true,
      lua: true,
      php: true,
      python: true,
      xml: true
  };

    this.databaseservice.getblocklytool(this.id).subscribe((data)=>{
      this.problem = data.data
      this.configtool = data.data.tools
      console.log(this.problem)
      this.config = {
        toolbox: this.configtool,
        scrollbars: true,
        trashcan: true,
        search: {
          enabled: true
        }
      };
    })
  }

  
  onCodexml(code: string) {
    this.codexml = code.replace(/(?:\r\n|\r|\n)/g, ' ').trim();
    console.log(this.codexml);
}
  onCodejs(code : string){
    this.codejs = code;
  }

  runcode(){
    eval(this.codejs);
  }

  back(){
    this.router.navigate(['problem'])
  }

  sendtest(){
    console.log(this.codexml)
    console.log(this.problem)
    this.send = true
    this.sendteststatus = "กำลังตรวจสอบความถูกต้อง"
    this.databaseservice.checkresult(this.problem.problem_id,this.codexml).subscribe((data)=>{
      this.istest = data.data
      if(this.istest == true){
        this.sendteststatus = "คำตอบถูกต้อง"    
      }
      else{
        this.sendteststatus = "คำตอบผิด"
      }
    })
  }

  commit(){
    let isconfirm = confirm("ยืนยันการส่งคำตอบ")
    if(isconfirm == true){
      this.user = this.authserver.currentUser
        console.log(this.user)
        let answerdata = {
          student_id : this.user.email,
          lesson_id : this.problem.lesson_id,
          problem_id : this.problem.problem_id,
          content : this.codexml
        }
        this.databaseservice.checkproblem(this.user.email,this.problem.problem_id,true).subscribe((data)=>{
          console.log("GOGOGO")
        })
        this.databaseservice.testcode(answerdata).subscribe((data)=>{
          this.router.navigate(['problem'])
        })
    }
  }

}
