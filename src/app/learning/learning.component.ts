import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxBlocklyConfig, NgxBlocklyGeneratorConfig } from 'ngx-blockly';
import { AuthenticationService } from '../authentication.service';
import { DatabaseService } from '../database.service';
import { description } from '../description'
@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})
export class LearningComponent implements OnInit {

  constructor(private router : Router, private route : ActivatedRoute,private databaseservice : DatabaseService,private authservice: AuthenticationService) { 
    this.route.queryParams.subscribe((params)=>{
      this.lesson = params.lesson;
      this.databaseservice.getlearning(this.lesson).subscribe((data)=>{
        this.learnings = data.data;
        console.log(this.learnings)
      })
    }) }
  public generatorConfig: NgxBlocklyGeneratorConfig = {};
  public config: NgxBlocklyConfig = {};
  public codejs : string;
  public hidedescription = false;
  public learnings :any = {
    "lessonID" : "",
    "Name" : "",
    "description" : "",
    "learning" : [ 
        {
            "id" : 0,
            "title" : "",
            "description" : "",
            "configtool" : "",
            "checkresult" : false
        }, 
        {
            "id" : 0,
            "title" : "",
            "description" : "",
            "configtool" : "",
            "checkresult" : false
        }
    ]
};
  public current = 0;
  public lesson : any;
  public exercise = false;
  public codexml = ""
  ngOnInit(): void {
   
    this.generatorConfig = {
      dart: true,
      javascript: true,
      lua: true,
      php: true,
      python: true,
      xml: true
    };
    this.config = {
      toolbox: '<xml id="toolbox" style="display: none">' +
                    '<block type="controls_if"></block>' +
                    '<block type="controls_repeat_ext"></block>' +
                    '<block type="logic_compare"></block>' +
                    '<block type="math_number"></block>' +
                    '<block type="math_arithmetic"></block>' +
                    '<block type="text"></block>' +
                    '<block type="text_print"></block>' +
                 '</xml>',
        scrollbars: false,
        trashcan: true
    }
  }

  onCodejs(code : string){
    this.codejs = code;
  }

  runcode(){
    eval(this.codejs);
  }

  back(){
    this.router.navigate(['lesson'])
  }

  onCodexml(code: string) {
    this.codexml = code.replace(/(?:\r\n|\r|\n)/g, ' ').trim();
    console.log(this.codexml);
}

  choose(index){
    this.current = this.learnings.learning.indexOf(index);
    console.log(this.current)
    if(this.current ==  this.learnings.learning.length-1){
      console.log("end")
      this.exercise = true
    }
  }

  check( ){
    this.databaseservice.checklesson(this.authservice.currentUser.email,this.lesson,true).subscribe(()=>{
      this.router.navigate(['lesson'])
    })
  }

  hide(){
    this.hidedescription = !this.hidedescription
  }
}
