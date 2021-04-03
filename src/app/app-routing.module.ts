import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlocklyComponent } from './blockly/blockly.component';
import { ExcersiceComponent } from './excersice/excersice.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LearningComponent } from './learning/learning.component';
import { LessionComponent } from './lession/lession.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShowvalueComponent } from './showvalue/showvalue.component';
import { TestloginComponent } from './testlogin/testlogin.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'showvalue', component: ShowvalueComponent },
  { path: 'blockly', component: BlocklyComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'problem', component: ExcersiceComponent },
  { path: 'testlogin', component: TestloginComponent },
  { path: 'learning', component: LearningComponent },
  { path: 'lesson', component: LessionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
